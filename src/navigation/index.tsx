import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './Routes';

import { AuthContextProvider } from '~/Shared/Auth';
export type RootStackParamList = {
  DrawerNavigator: undefined;
  Modal: undefined;
  TabNavigator: undefined;
};

export default function RootStack() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
