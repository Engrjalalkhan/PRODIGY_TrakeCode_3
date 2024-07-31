import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ClockScreen from './screens/ClockScreen';
import TimerScreen from './screens/TimerScreen';
import StopwatchScreen from './screens/StopwatchScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screenOptions = {
  headerTitleAlign: 'center', // Aligns the header title to the center
  headerStyle: {
    backgroundColor: 'lightgray', // Optional: Set a background color for the header
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20, // Adjust font size if needed
  },
};

const ClockStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Clock" component={ClockScreen} options={screenOptions} />
  </Stack.Navigator>
);

const TimerStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Timer" component={TimerScreen} options={screenOptions} />
  </Stack.Navigator>
);

const StopwatchStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Stopwatch" component={StopwatchScreen} options={screenOptions} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Clock') {
              iconName = 'time-outline';
            } else if (route.name === 'Timer') {
              iconName = 'timer-outline';
            } else if (route.name === 'Stopwatch') {
              iconName = 'stopwatch-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Clock" component={ClockStack} options={{ headerShown: false }} />
        <Tab.Screen name="Timer" component={TimerStack} options={{ headerShown: false }} />
        <Tab.Screen name="Stopwatch" component={StopwatchStack} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
