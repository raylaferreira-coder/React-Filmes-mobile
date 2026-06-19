import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  ContactUs: undefined;
  About: undefined;
  PostFeed: undefined; 
  Feed: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;