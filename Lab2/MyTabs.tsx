import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Battery from './screens/Battery';
import Brightness from './screens/Brightness';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Battery"
        component={Battery}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'battery-charging' : 'battery-full'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Brightness"
        component={Brightness}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'sunny' : 'sunny-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
