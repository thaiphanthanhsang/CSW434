import { NativeModules } from 'react-native';

export const BatteryModule = NativeModules.BatteryModule as {
  getBatteryLevel(): Promise<number>;
};

export const BrightnessModule = NativeModules.BrightnessModule as {
  setBrightness(v: number): Promise<void>;
  getBrightness(): Promise<number>;
};
