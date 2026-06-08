import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'vn.chioi.tasker',
  appName: 'Chị Ơi Tasker',
  webDir: 'www',

  // Load từ www/ local (bundled) — không cần VPS cho giao diện
  // API calls vẫn gọi tới app.chioi.vn
  server: {
    allowNavigation: [
      'app.chioi.vn',
      'api.chioi.vn',
      '*.chioi.vn',
    ],
  },

  ios: {
    contentInset: 'always',
    scheme: 'chioi',
    limitsNavigationsToAppBoundDomains: true,
    backgroundColor: '#a04100',
  },

  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#a04100',
      showSpinner: true,
      spinnerColor: '#ffffff',
      androidScaleType: 'CENTER_CROP',
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
