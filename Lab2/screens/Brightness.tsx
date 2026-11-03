import React, { useEffect, useState } from 'react';
import { BatteryModule, BrightnessModule } from '../NativeModules';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';
export default function Brightness() {
  const [brightness, setBrightness] = useState(0.5);

  useEffect(() => {
    BrightnessModule.getBrightness().then(setBrightness).catch(console.warn);

    const emitter = new NativeEventEmitter(NativeModules.BrightnessModule);
    const sub = emitter.addListener('onBrightnessChanged', v =>
      setBrightness(Number(v)),
    );
    return () => sub.remove();
  }, []);

  const onSlide = (v: number) => {
    setBrightness(v);
    BrightnessModule.setBrightness(v).catch(console.warn); // đổi độ sáng ngay khi kéo
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Brightness: {Math.round(brightness * 100)}%
        </Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0.01}
          maximumValue={1}
          value={brightness}
          onValueChange={onSlide}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: { fontSize: 18, marginBottom: 10 },
  big: { fontSize: 48, fontWeight: 'bold' },
});
