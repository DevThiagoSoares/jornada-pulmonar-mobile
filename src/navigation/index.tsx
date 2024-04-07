import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './Routes';

import { AuthContextProvider } from '~/Shared/Auth';
import { DataProvider } from '~/Shared/hooks/audio.context';

export default function RootStack() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      </NavigationContainer>
    </AuthContextProvider>
  );
}
