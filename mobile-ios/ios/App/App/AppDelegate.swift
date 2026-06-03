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
    private var tokenInjected = false

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // 1. Configure Firebase (reads GoogleService-Info.plist)
        FirebaseApp.configure()
        
        // 2. Set FCM delegate
        Messaging.messaging().delegate = self
        
        // 3. Request push notification permission
        requestPushPermission(application)
        
        return true
    }

    // MARK: - Push Notification Permission
    private func requestPushPermission(_ application: UIApplication) {
        let center = UNUserNotificationCenter.current()
        center.requestAuthorization(options: [.alert, .badge, .sound]) { granted, error in
            if let error = error {
                print("[Push] Permission error: \(error.localizedDescription)")
                return
            }
            print("[Push] Permission granted: \(granted)")
            if granted {
                DispatchQueue.main.async {
                    application.registerForRemoteNotifications()
                }
            }
        }
    }

    // MARK: - APNs Token → Forward to Capacitor
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        let token = deviceToken.map { String(format: "%02.2hhx", $0) }.joined()
        print("[Push] APNs Token: \(token)")
        
        // Forward to Firebase for APNs → FCM conversion
        Messaging.messaging().apnsToken = deviceToken
        
        // Forward to Capacitor plugin
        NotificationCenter.default.post(
            name: .capacitorDidRegisterForRemoteNotifications,
            object: deviceToken
        )
    }

    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        print("[Push] Failed to register APNs: \(error.localizedDescription)")
        NotificationCenter.default.post(
            name: .capacitorDidFailToRegisterForRemoteNotifications,
            object: error
        )
    }

    // MARK: - Firebase MessagingDelegate — FCM Token
    func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) {
        guard let token = fcmToken else { return }
        self.fcmToken = token
        print("[Push] FCM Token received: \(token.prefix(20))...")
        
        // Store in UserDefaults
        UserDefaults.standard.set(token, forKey: "chioi_fcm_token")
        
        // Inject token into WebView (retry until success)
        injectTokenIntoWebView()
    }

    // MARK: - Inject FCM Token into WebView
    private func injectTokenIntoWebView() {
        guard let token = self.fcmToken, !tokenInjected else { return }
        
        // Try to find WKWebView and inject
        DispatchQueue.main.asyncAfter(deadline: .now() + 5) { [weak self] in
            guard let self = self else { return }
            guard let rootVC = self.window?.rootViewController else {
                // Retry later
                self.scheduleTokenInjection()
                return
            }
            
            if let webView = self.findWKWebView(in: rootVC.view) {
                let js = """
                window.__CHIOI_FCM_TOKEN = '\(token)';
                console.log('[Push Native] FCM token injected');
                if (window.__onFcmToken) { window.__onFcmToken('\(token)'); }
                """
                webView.evaluateJavaScript(js) { _, error in
                    if let error = error {
                        print("[Push] JS injection error: \(error.localizedDescription)")
                        self.scheduleTokenInjection()
                    } else {
                        print("[Push] FCM token injected into WebView OK")
                        self.tokenInjected = true
                    }
                }
            } else {
                self.scheduleTokenInjection()
            }
        }
    }
    
    private func scheduleTokenInjection() {
        // Retry every 10 seconds
        DispatchQueue.main.asyncAfter(deadline: .now() + 10) { [weak self] in
            self?.tokenInjected = false
            self?.injectTokenIntoWebView()
        }
    }

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
    func applicationWillEnterForeground(_ application: UIApplication) {}
    func applicationDidBecomeActive(_ application: UIApplication) {}
    func applicationWillTerminate(_ application: UIApplication) {}

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }
}
