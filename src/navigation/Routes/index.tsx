import Ionicons from '@expo/vector-icons/build/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, ImageBackground, Text } from 'react-native';
import { View } from 'react-native-animatable';
import iconImage from 'src/assets/image/União.png';
import image from 'src/assets/image/style3.png';

import { styledHeader } from './styles';
import TabLayout from '../tab-navigator';

import { useAuth } from '~/Shared/Auth';
import { TypeUser } from '~/Shared/Enums/typeUser';
import { ComponentLevel } from '~/components/screens/component-level';
import Login from '~/screens/Login/login';
import { CreateQuestion } from '~/screens/Question';
import Modal from '~/screens/Student/Components/modal/modal';
import { ModalQuestion } from '~/screens/Student/Components/modal/modal-question';
import PageTeacher from '~/screens/Teacher';

export type RootStackParamList = {
  DrawerNavigator: undefined;
  Modal: undefined;
  ModalQuestion: undefined;
  TabNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function AppRoutes() {
  const { user, signOut } = useAuth();

  function headerBackground() {
    return <ImageBackground source={image} style={{ flex: 1 }} resizeMode="cover" />;
  }

  function headerBackgroundStudent() {
    return <View style={{ flex: 1, backgroundColor: '#CD4C3E' }} />;
  }

  return (
    <Stack.Navigator
      initialRouteName="DrawerNavigator"
      screenOptions={{
        headerBackground: () =>
          user?.role !== TypeUser.Student ? headerBackground() : headerBackgroundStudent(),
        headerStyle: {
          backgroundColor: '#CD4C3E',
        },
      }}>
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
          <>
            <Stack.Screen
              name="TabNavigator"
              component={TabLayout}
              options={{
                headerShown: true,
                headerTitle: '',
                headerLeft: () => (
                  <TouchableOpacity onPress={signOut} style={styledHeader.container}>
                    <View style={styledHeader.boxIcon}>
                      <Ionicons
                        name="log-out-outline"
                        size={30}
                        color="#FFFF"
                        style={{ paddingRight: 10 }}
                      />
                      <ComponentLevel level="6" img={iconImage} width={40} height={40} />
                      <Text style={styledHeader.text}>Nível</Text>
                    </View>
                    <View>
                      <Text style={styledHeader.text}>Olá {user.name}</Text>
                    </View>
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen name="Modal" component={Modal} options={{ headerTitle: 'Unidade' }} />
            <Stack.Screen
              name="ModalQuestion"
              component={ModalQuestion}
              options={{ headerTitle: 'Unidade' }}
            />
          </>
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
    </Stack.Navigator>
  );
}
