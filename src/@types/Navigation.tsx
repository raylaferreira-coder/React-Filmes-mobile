import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  MainDrawer: undefined;
};

export type DrawerParamList = {
  Home: undefined;
  ContactUs: undefined;
  About: undefined;
  PostFeed: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;