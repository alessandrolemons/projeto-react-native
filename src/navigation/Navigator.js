import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import SignIn from '../screens/SignIn';
import Preload from '../screens/Preload';
import ForgotPass from '../screens/ForgotPass';
import SignUp from '../screens/SignUp';
import {StatusBar} from 'react-native';
import {useTheme} from '@rneui/themed';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const {theme} = useTheme();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={theme.colors.primaryDark} />
      <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
          headerShown: true,
          headerTitleStyle: { color: '#fff' },
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}>
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
