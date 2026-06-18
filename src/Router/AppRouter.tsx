import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { NavigationContainer } from '@react-navigation/native';

import Header from '../Components/Header';
import Login from '../Pages/Login';

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
                    header: (props) => <Header {...props} 
                }}
            </Stack.Group>
        </Stack.Navigator>
    </NavigationContainer>
  );
}