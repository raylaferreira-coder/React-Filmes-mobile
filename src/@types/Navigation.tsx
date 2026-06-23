import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// stack
export type RootStackParamList = {
  Login: undefined;
  DrawerNavigator: undefined;
};

// drawer
export type DrawerParamList = {
  Home: undefined;
  Feed: { id?: number } | undefined; //feed buscando tb pelo id
  About: undefined;
  ContactUs: undefined;
};

// suport para nav
export type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  DrawerNavigationProp<DrawerParamList>
>;