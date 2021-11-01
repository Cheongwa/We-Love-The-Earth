import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './store';
import HomeScreen from './src/screens/HomeScreen';
import PloggingScreen from './src/screens/PloggingScreen';
import MySpaceScreen from './src/screens/MySpaceScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EditHistoryScreen from './src/screens/EditHistoryScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import ShowHistoryScreen from './src/screens/ShowHistoryScreen';

export default function App() {
  const Stack = createStackNavigator();
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen
              name='HomeScreen'
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='MySpaceScreen'
              component={MySpaceScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='PloggingScreen'
              component={PloggingScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='EditProfileScreen'
              component={EditProfileScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='ShowHistoryScreen'
              component={ShowHistoryScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='EditHistoryScreen'
              component={EditHistoryScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
