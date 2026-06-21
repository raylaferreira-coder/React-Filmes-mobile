import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../data/api';

interface UserData {
  email: string;
  name: string; // Armazena o nome extraído do email
}

interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkActiveSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@cinema_app:user');
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkActiveSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const formattedEmail = email.trim().toLowerCase();
    
    // Método split: isola a parte antes do '@' e capitaliza a primeira letra
    const rawName = formattedEmail.split('@')[0];
    const extractedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

    try {
      const response = await api.post('/auth/login', {
        email: formattedEmail,
        senha: password
      });
      
      const loggedUser: UserData = { email: formattedEmail, name: extractedName };
      setUser(loggedUser);
      
      await AsyncStorage.setItem('@cinema_app:user', JSON.stringify(loggedUser));
      if (response.data?.token) {
        await AsyncStorage.setItem('token', response.data.token);
      }
      return true;
    } catch (error) {
      // Fallback para o usuário de teste obrigatório do layout
      if (formattedEmail === 'teste@teste.com' && password === '123456') {
        const loggedUser: UserData = { email: formattedEmail, name: 'Teste' };
        setUser(loggedUser);
        await AsyncStorage.setItem('@cinema_app:user', JSON.stringify(loggedUser));
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('@cinema_app:user');
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Erro ao efetuar logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return context;
};