import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vaccines.pk',
  appName: 'VaccineAdmin',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
