import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.friendzy.app',
  appName: 'Friendzy',
  webDir: '../frontend/dist',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.1.100:5173', // Change to your local IP for development
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#2C3E4E',
      showSpinner: true,
      spinnerColor: '#D4A373',
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#2C3E4E',
    },
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    },
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#F8F6F2',
  },
};

export default config;
