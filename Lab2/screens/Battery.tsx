import { useEffect, useState } from 'react';
import { BatteryModule, BrightnessModule } from '../NativeModules';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
export default function Battery() {
  const [battery, setBattery] = useState<number | null>(null);
  const [brightness, setBrightness] = useState(0.5);

  useEffect(() => {
    const load = () =>
      BatteryModule.getBatteryLevel().then(setBattery).catch(console.warn);
    load();
    const t = setInterval(load, 5000); // cập nhật pin mỗi 5 giây
    BrightnessModule.getBrightness().then(setBrightness).catch(console.warn);
    return () => clearInterval(t);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Battery Level</Text>
        <Text style={styles.big}>
          {battery === null ? '...' : `${battery}%`}
        </Text>
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
