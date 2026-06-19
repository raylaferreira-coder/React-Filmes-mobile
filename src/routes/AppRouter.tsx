import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../@types/Navigation';
import { NavigationContainer } from '@react-navigation/native';

// Ajustado para "Components" com C maiúsculo conforme o seu VS Code
import Header from '../Components/Header/Index';
import Login from '../screens/Login';
import About from '../screens/About';
import Home from '../screens/Home';
import ContactUs from '../screens/ContactUs';
import Feed from '../screens/Feed';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        
        <Stack.Screen 
          name="Login"
          component={Login}
          options={{ headerShown: false }} 
        />

        {/* CORRIGIDO: Propriedade dentro da tag e as telas envelopadas corretamente */}
        <Stack.Group
          screenOptions={{
            headerShown: true,
            header: (props) => <Header {...props} />
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Feed" component={Feed} />
          <Stack.Screen name="ContactUs" component={ContactUs} />
        </Stack.Group>

      </Stack.Navigator>
    </NavigationContainer>
  );
}