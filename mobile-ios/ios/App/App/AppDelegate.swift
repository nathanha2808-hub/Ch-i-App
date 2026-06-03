import UIKit
import Capacitor
import UserNotifications
import FirebaseCore
import FirebaseMessaging
import WebKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, MessagingDelegate {

    var window: UIWindow?
    private var fcmToken: String?
    private var retryTimer: Timer?
    private var retryCount = 0

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        FirebaseApp.configure()
        Messaging.messaging().delegate = self
        requestPushPermission(application)
        return true
    }

    // MARK: - Push Permission
    private func requestPushPermission(_ application: UIApplication) {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .badge, .sound]) { granted, error in
            print("[Push] Permission granted: \(granted), error: \(error?.localizedDescription ?? "none")")
            if granted {
                DispatchQueue.main.async {
                    application.registerForRemoteNotifications()
                }
            }
        }
    }

    // MARK: - APNs Token
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        Messaging.messaging().apnsToken = deviceToken
        NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)
        print("[Push] APNs token set")
    }

    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        print("[Push] APNs failed: \(error.localizedDescription)")
        NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
    }

    // MARK: - FCM Token
    func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) {
        guard let token = fcmToken else { return }
        self.fcmToken = token
        UserDefaults.standard.set(token, forKey: "chioi_fcm_token")
        print("[Push] FCM Token: \(token.prefix(30))...")
        
        // Start trying to register with backend
        retryCount = 0
        startTokenRegistration()
    }

    // MARK: - Register Token with Backend (native HTTP)
    private func startTokenRegistration() {
        retryTimer?.invalidate()
        retryTimer = Timer.scheduledTimer(withTimeInterval: 8.0, repeats: true) { [weak self] timer in
            self?.attemptTokenRegistration()
        }
        // Also try immediately after a delay
        DispatchQueue.main.asyncAfter(deadline: .now() + 5) { [weak self] in
            self?.attemptTokenRegistration()
        }
    }

    private func attemptTokenRegistration() {
        guard let token = self.fcmToken else { return }
        retryCount += 1
        
        if retryCount > 60 { // Stop after ~8 minutes
            retryTimer?.invalidate()
            print("[Push] Gave up registering token after 60 retries")
            return
        }
        
        print("[Push] Registration attempt \(retryCount)...")
        
        // Find WebView and read auth token from localStorage
        guard let rootVC = self.window?.rootViewController,
              let webView = findWKWebView(in: rootVC.view) else {
            print("[Push] WebView not found yet")
            return
        }
        
        webView.evaluateJavaScript("localStorage.getItem('chioi_token')") { [weak self] result, error in
            if let error = error {
                print("[Push] JS eval error: \(error.localizedDescription)")
                return
            }
            guard let authToken = result as? String, !authToken.isEmpty else {
                print("[Push] No auth token in localStorage yet")
                return
            }
            
            print("[Push] Got auth token, sending FCM token to backend...")
            self?.sendTokenToBackend(fcmToken: token, authToken: authToken)
        }
    }

    private func sendTokenToBackend(fcmToken: String, authToken: String) {
        guard let url = URL(string: "https://app.chioi.vn/api/push/register-device") else { return }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer \(authToken)", forHTTPHeaderField: "Authorization")
        
        let body: [String: Any] = ["token": fcmToken, "platform": "ios"]
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)
        
        URLSession.shared.dataTask(with: request) { [weak self] data, response, error in
            if let error = error {
                print("[Push] Backend error: \(error.localizedDescription)")
                return
            }
            if let httpResponse = response as? HTTPURLResponse {
                print("[Push] Backend response: \(httpResponse.statusCode)")
                if httpResponse.statusCode == 200 || httpResponse.statusCode == 201 {
                    print("[Push] ✅ FCM token registered successfully!")
                    self?.retryTimer?.invalidate()
                }
            }
        }.resume()
    }

    // MARK: - Find WKWebView
    private func findWKWebView(in view: UIView) -> WKWebView? {
        if let webView = view as? WKWebView { return webView }
        for subview in view.subviews {
            if let found = findWKWebView(in: subview) { return found }
        }
        return nil
    }

    // MARK: - App Lifecycle
    func applicationWillResignActive(_ application: UIApplication) {}
    func applicationDidEnterBackground(_ application: UIApplication) {}
    func applicationWillEnterForeground(_ application: UIApplication) {
        // Retry when app comes back to foreground
        if let token = fcmToken, UserDefaults.standard.string(forKey: "chioi_fcm_registered") != token {
            retryCount = 0
            startTokenRegistration()
        }
    }
    func applicationDidBecomeActive(_ application: UIApplication) {}
    func applicationWillTerminate(_ application: UIApplication) {}

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }
}
