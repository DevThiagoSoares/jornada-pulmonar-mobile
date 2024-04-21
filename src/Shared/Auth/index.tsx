import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, createContext, ReactNode, useState, useEffect } from 'react';

export const isValidateAccount = () => {
  return false;
};

export interface UserProps {
  name: string;
  role: string;
  email?: string;
  password?: string;
  access_token?: string;
  id?: string;
}

type AuthContextProps = {
  user: UserProps | null;
  validateUserAccess: (value: UserProps) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);

  const signOut = async () => {
    await AsyncStorage.clear();
    setUser(null);
  };

  const validateUserAccess = (body: UserProps) => {
    setUser(body);
    const { access_token } = body;

    AsyncStorage.setItem('access_token', JSON.stringify(access_token))
      .then(() => {})
      .catch((error) => {
        console.error('Erro ao armazenar os dados do usuário:', error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, validateUserAccess, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
