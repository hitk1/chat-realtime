import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import SignIn from '../screens/Auth/SignIn';

const Stack = createStackNavigator()

const AuthRoutes: React.FC = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SignIn" component={SignIn}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default AuthRoutes;