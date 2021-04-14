import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/App/Home'
import Contacts from '../screens/App/Contacts'
import NoContatcsScreen from '../screens/Contents/NoContacts'

const Stack = createStackNavigator()

const AppRoutes: React.FC = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Contacts" component={Contacts} />
      <Stack.Screen name="NoContacts" component={NoContatcsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default AppRoutes;