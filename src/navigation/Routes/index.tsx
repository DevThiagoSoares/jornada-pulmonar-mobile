import Ionicons from '@expo/vector-icons/build/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { Modal, TouchableOpacity, ImageBackground } from 'react-native';
import image from 'src/assets/image/style3.png';

import DrawerNavigator from '../drawer-navigator';

import { useAuth } from '~/Shared/Auth';
import { TypeUser } from '~/Shared/Enums/typeUser';
import Login from '~/screens/Login/login';
import { CreateQuestion } from '~/screens/Question';
import PageTeacher from '~/screens/Teacher';

export type RootStackParamList = {
  DrawerNavigator: undefined;
  Modal: undefined;
  TabNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function AppRoutes() {
  const { user, signOut } = useAuth();

  function headerBackground() {
    return <ImageBackground source={image} style={{ flex: 1 }} resizeMode="cover" />;
  }

  return (
    <Stack.Navigator
      initialRouteName="DrawerNavigator"
      screenOptions={{ headerBackground: () => headerBackground() }}>
      {user ? (
        user?.role === TypeUser.Teacher ? (
          <>
            <Stack.Screen
              name="DrawerNavigator"
              component={PageTeacher}
              options={{
                headerShown: true,
                headerTitleAlign: 'left',
                headerTitle: '',
                headerShadowVisible: true,
                headerLeft: () => (
                  <TouchableOpacity onPress={signOut} style={{ marginLeft: 10 }}>
                    <Ionicons name="log-out-outline" size={30} color="#CD4C3E" />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen
              name="TabNavigator"
              component={CreateQuestion}
              options={{
                headerTitle: '',
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{
              headerShown: true,
              headerLeft: () => (
                <TouchableOpacity onPress={signOut} style={{ marginLeft: 10 }}>
                  <Ionicons name="log-out-outline" size={30} color="#CD4C3E" />
                </TouchableOpacity>
              ),
            }}
          />
        )
      ) : (
        <Stack.Screen
          name="DrawerNavigator"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      )}
      <Stack.Screen
        name="Modal"
        component={Modal}
        options={{ presentation: 'modal', headerLeft: () => null }}
      />
    </Stack.Navigator>
  );
}
