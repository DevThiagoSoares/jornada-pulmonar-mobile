import Ionicons from '@expo/vector-icons/build/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { Modal, TouchableOpacity, Image } from 'react-native';

import { PagesTeacher } from './pages';
import DrawerNavigator from '../drawer-navigator';

import { useAuth } from '~/Shared/Auth';
import { TypeUser } from '~/Shared/Enums/typeUser';
import Login from '~/screens/Login/login';

export type RootStackParamList = {
  DrawerNavigator: undefined;
  Modal: undefined;
  TabNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function AppRoutes() {
  const { user, signOut } = useAuth();

  return (
    <Stack.Navigator initialRouteName="DrawerNavigator">
      {user ? (
        user?.role === TypeUser.Teacher ? (
          PagesTeacher.map((item, idx) => (
            <Stack.Screen
              key={idx}
              name="DrawerNavigator"
              component={item.component}
              options={{
                headerShown: true,
                headerTitleAlign: 'left',
                headerTitle: '',
                headerShadowVisible: true,
                headerBackground: () => (
                  <Image
                    source={require('src/assets/image/image-6845.png')}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                ),
                headerLeft: () => (
                  <TouchableOpacity onPress={signOut} style={{ marginLeft: 10 }}>
                    <Ionicons name="log-out-outline" size={30} color="#CD4C3E" />
                  </TouchableOpacity>
                ),
              }}
            />
          ))
        ) : (
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{ headerShown: true }}
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
