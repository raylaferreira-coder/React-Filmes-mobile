import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types/Navigation';
import { NavigationContainer } from '@react-navigation/native';

import Header from '../Components/Header';
import Login from '../screens/Login';
import About from '../screens/About';
import Home from '../screens/Home';
import ContactUs from '../screens/ContactUs';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppRouter() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
                <Stack.Screen 
                    name="Login"
                    component={Login}
                    options={{headerShown: false}} 
                />

            <Stack.Group>
                screenOptions={{
                    headerShown: true,
                    header: (props) => <Header {...props} />
                }}
            </Stack.Group>

            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="ContactUs" component={ContactUs} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}