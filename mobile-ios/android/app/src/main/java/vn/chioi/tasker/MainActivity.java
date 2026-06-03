package vn.chioi.tasker;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;
import com.google.firebase.messaging.FirebaseMessaging;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class MainActivity extends BridgeActivity {
    private static final String TAG = "ChiOiPush";
    private static final String API_URL = "https://app.chioi.vn/api/push/register-device";
    
    private String fcmToken = null;
    private boolean tokenRegistered = false;
    private int retryCount = 0;
    private Handler retryHandler;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        retryHandler = new Handler(Looper.getMainLooper());
        
        // Get FCM token
        FirebaseMessaging.getInstance().getToken()
            .addOnCompleteListener(task -> {
                if (!task.isSuccessful()) {
                    Log.w(TAG, "FCM token failed", task.getException());
                    return;
                }
                fcmToken = task.getResult();
                Log.d(TAG, "FCM Token: " + fcmToken.substring(0, 30) + "...");
                
                // Start registration attempts
                retryCount = 0;
                tokenRegistered = false;
                scheduleTokenRegistration(5000); // First attempt after 5s
            });
    }

    private void scheduleTokenRegistration(long delayMs) {
        if (tokenRegistered || retryCount > 60) return;
        retryHandler.postDelayed(this::attemptTokenRegistration, delayMs);
    }

    private void attemptTokenRegistration() {
        if (tokenRegistered || fcmToken == null) return;
        retryCount++;
        Log.d(TAG, "Registration attempt " + retryCount);

        // Get WebView and read auth token from localStorage
        WebView webView = getBridge().getWebView();
        if (webView == null) {
            Log.d(TAG, "WebView not ready");
            scheduleTokenRegistration(8000);
            return;
        }

        webView.evaluateJavascript(
            "localStorage.getItem('chioi_token')",
            value -> {
                // value comes wrapped in quotes: "token_string" or "null"
                if (value == null || value.equals("null") || value.equals("\"null\"") || value.isEmpty()) {
                    Log.d(TAG, "No auth token in localStorage yet");
                    scheduleTokenRegistration(8000);
                    return;
                }
                
                // Remove surrounding quotes
                String authToken = value;
                if (authToken.startsWith("\"") && authToken.endsWith("\"")) {
                    authToken = authToken.substring(1, authToken.length() - 1);
                }
                
                Log.d(TAG, "Got auth token, sending FCM token to backend...");
                sendTokenToBackend(fcmToken, authToken);
            }
        );
    }

    private void sendTokenToBackend(String fcmToken, String authToken) {
        new Thread(() -> {
            try {
                URL url = new URL(API_URL);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setRequestProperty("Authorization", "Bearer " + authToken);
                conn.setDoOutput(true);
                conn.setConnectTimeout(10000);
                conn.setReadTimeout(10000);

                String json = "{\"token\":\"" + fcmToken + "\",\"platform\":\"android\"}";
                try (OutputStream os = conn.getOutputStream()) {
                    os.write(json.getBytes(StandardCharsets.UTF_8));
                }

                int responseCode = conn.getResponseCode();
                Log.d(TAG, "Backend response: " + responseCode);
                
                if (responseCode == 200 || responseCode == 201) {
                    tokenRegistered = true;
                    Log.d(TAG, "✅ FCM token registered successfully!");
                } else {
                    Log.w(TAG, "Backend returned " + responseCode);
                    runOnUiThread(() -> scheduleTokenRegistration(8000));
                }
                
                conn.disconnect();
            } catch (Exception e) {
                Log.e(TAG, "Backend error: " + e.getMessage());
                runOnUiThread(() -> scheduleTokenRegistration(8000));
            }
        }).start();
    }

    @Override
    public void onResume() {
        super.onResume();
        // Retry when app comes back to foreground
        if (fcmToken != null && !tokenRegistered) {
            retryCount = 0;
            scheduleTokenRegistration(3000);
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (retryHandler != null) {
            retryHandler.removeCallbacksAndMessages(null);
        }
    }
}
