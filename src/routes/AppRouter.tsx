import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../@types/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

// Ajustado para "Components" com C maiúsculo conforme o seu VS Code
import Header from '../Components/Header/Index';
import Login from '../screens/Login';
import About from '../screens/About';
import Home from '../screens/Home';
import ContactUs from '../screens/ContactUs';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppRouter() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Group
            screenOptions={{
              headerShown: true,
              header: (props) => <Header {...props} />
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="ContactUs" component={ContactUs} />
          </Stack.Group>
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