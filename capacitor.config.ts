import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'idc.demo.app',
  appName: 'idc-demo-app',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
