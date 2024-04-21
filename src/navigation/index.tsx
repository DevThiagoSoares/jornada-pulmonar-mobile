import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Toast from 'react-native-toast-message';

import { AppRoutes } from './Routes';

import { AuthContextProvider } from '~/Shared/Auth';
import { DataProvider } from '~/Shared/hooks/audio.context';
import { DataQuestions } from '~/Shared/hooks/question.context';

export default function RootStack() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <DataProvider>
          <DataQuestions>
            <AppRoutes />
          </DataQuestions>
        </DataProvider>
        <Toast />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
