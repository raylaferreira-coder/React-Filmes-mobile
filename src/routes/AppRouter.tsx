import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';


import Login from '../screens/Login';
import Home from '../screens/Home';
import Feed from '../screens/Feed';
import About from '../screens/About';
import ContactUs from '../screens/ContactUs';
import Header from '../Components/Header/Index';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        header: (props) => <Header {...props} />,
        drawerStyle: { width: 260 }
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={Home} options={{ title: 'Início' }} />
      <Drawer.Screen name="Feed" component={Feed} options={{ title: 'Feed de Críticas' }} />
      <Drawer.Screen name="About" component={About} options={{ title: 'Sobre o Projeto' }} />
      <Drawer.Screen name="ContactUs" component={ContactUs} options={{ title: 'Fale Conosco' }} />
    </Drawer.Navigator>
  );
}

export default function AppRouter() {
  const { currentTheme } = useTheme();

  const navigationTheme = {
    dark: currentTheme === 'dark',
    colors: {
      primary: '#e11d48',
      background: currentTheme === 'dark' ? '#15151a' : '#f3f4f6',
      card: currentTheme === 'dark' ? '#1e1e24' : '#ffffff',
      text: currentTheme === 'dark' ? '#ffffff' : '#111827',
      border: currentTheme === 'dark' ? '#2e2e38' : '#e5e7eb',
      notification: '#ef4444',
    },
    fonts: {
      regular: { fontFamily: 'System', fontWeight: '400' as const },
      medium: { fontFamily: 'System', fontWeight: '500' as const },
      bold: { fontFamily: 'System', fontWeight: '700' as const },
      heavy: { fontFamily: 'System', fontWeight: '800' as const },
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        {/* A tela agora chama-se 'DrawerNavigator' para coincidir com sua chamada de navegação */}
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}