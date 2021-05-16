import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/App/Home'
import Contact from '../screens/App/Contact'
import NoContactsScreen from '../screens/Contents/NoContacts'

const Stack = createStackNavigator()

const AppRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="NoContacts" component={NoContactsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRoutes;