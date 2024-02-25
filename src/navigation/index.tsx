import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerNavigator from './drawer-navigator';
import Modal from '../screens/modal';

import { isValidateAccount } from '~/Shared/Auth';
import Login from '~/screens/Login/login';

export type RootStackParamList = {
  DrawerNavigator: undefined;
  Modal: undefined;
  TabNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DrawerNavigator">
        {isValidateAccount() ? (
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen name="TabNavigator" component={Login} options={{ headerShown: false }} />
        )}
        <Stack.Screen
          name="Modal"
          component={Modal}
          options={{ presentation: 'modal', headerLeft: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
