import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './MyTabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
