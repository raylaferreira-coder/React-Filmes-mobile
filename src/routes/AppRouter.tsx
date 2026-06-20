import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackParamList, DrawerParamList } from '../@types/Navigation';
import { useAuth } from '../contexts/AuthContext';

import Header from '../Components/Header/Index';
import Login from '../screens/Login';
import About from '../screens/About';
import Home from '../screens/Home';
import ContactUs from '../screens/ContactUs';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

function MainDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="ContactUs" component={ContactUs} />
    </Drawer.Navigator>
  );
}

export default function AppRouter() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="MainDrawer"
            component={MainDrawer}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}