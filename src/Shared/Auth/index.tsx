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
}

type AuthContextProps = {
  user: UserProps | null;
  validateUserAccess: (value: UserProps) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    loadingUser();
  }, [setUser]);

  async function loadingUser() {
    const response = await AsyncStorage.getItem('userData');
    if (response) {
      const data = JSON.parse(response);
      setUser(data);
    }
  }

  const signOut = async () => {
    await AsyncStorage.clear();
    setUser(null);
  };

  const validateUserAccess = (body: UserProps) => {
    setUser(body);
    const { name, role } = body;
    AsyncStorage.setItem('userData', JSON.stringify({ name, role }))
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
