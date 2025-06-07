import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  android: {
    allowMixedContent: true,
  },
  appId: 'com.gcc.swapp',
  appName: 'smartWardrobeApp',
  webDir: 'www',
  server: {
    cleartext: true, // permite http
    androidScheme: 'http',
  },
};

export default config;
