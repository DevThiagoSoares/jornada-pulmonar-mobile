import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './Routes';

import { AuthContextProvider } from '~/Shared/Auth';

export default function RootStack() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
