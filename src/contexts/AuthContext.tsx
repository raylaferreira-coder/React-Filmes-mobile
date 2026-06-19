import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../data/api';

interface UserData {
  email: string;
}

interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<void>;
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
        const token = await AsyncStorage.getItem('token');

        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
        }
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
    const formattedEmail = email.trim().toLocaleLowerCase()
    
    try {
      
      const response = await api.post('/auth/login', {
        email: email.trim().toLowerCase(),
        senha: senha
      });

     
      const { token, id, email: userEmail } = response.data;

    try {
      
        const response = await api.post('/usuarios/login', {
          email: formattedEmail,
          senha: password
      });
      
      const { token,  email: userEmail } = response.data;
     
      const loggedUser: UserData = {
        email: userEmail || formattedEmail,
      };

      setUser(loggedUser);
      await AsyncStorage.setItem('@cinema_app:user', JSON.stringify(loggedUser));
      await AsyncStorage.setItem('@cinema_app:token', token)

      setIsLoading(false);
      return true;
    }catch (error) {
      console.warn("Falha de autenticação na API", error)
    }

    if (formattedEmail === 'teste@teste.com' && password === '123456') {
      const loggedUser: UserData = {
        email: formattedEmail,
      }  
      try {
        setUser(loggedUser);
        await AsyncStorage.setItem('@cinema_app:user', JSON.stringify(loggedUser));
        setIsLoading(false);
        return true; // login efetuado
      } catch (storageError) {
        console.error('Erro ao guardar sessão do usuario teste:', 'Erro ao guardar sessão do usuário mock:', storageError);
      }
    };

    
      setUser(loggedUser);

    } catch (error) {
   
      throw error;
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
  if (!context) {
    throw new Error
  }
  return context;
};