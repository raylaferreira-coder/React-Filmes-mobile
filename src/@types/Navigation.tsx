import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Rotas primárias do fluxo de pilhas (Stack)
export type RootStackParamList = {
  Login: undefined;
  DrawerNavigator: undefined;
};

// Rotas internas do menu lateral (Drawer)
export type DrawerParamList = {
  Home: undefined;
  // Corrigido: Feed agora aceita um parâmetro id opcional
  Feed: { id?: number } | undefined; 
  About: undefined;
  ContactUs: undefined;
};

// União tipada para dar suporte a ambas as navegações em qualquer tela
export type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  DrawerNavigationProp<DrawerParamList>
>;