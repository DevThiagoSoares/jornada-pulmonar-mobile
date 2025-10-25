import Ionicons from '@expo/vector-icons/build/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useCallback } from 'react';
import { ImageBackground, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';
import iconImage from 'src/assets/image/União.png';
import image from 'src/assets/image/style3.png';

import TabLayout from '../tab-navigator';
import { styledHeader } from './styles';

import { useAuth } from '~/Shared/Auth';
import { TypeUser } from '~/Shared/Enums/typeUser';
import { validateEmail } from '~/Shared/api/services/users';
import { ComponentLevel } from '~/components/screens/component-level';
import Login from '~/screens/Login/login';
import { CreateQuestion } from '~/screens/Question';
import { ImageStep } from '~/screens/Question/FormSteps/ImageStep';
import Modal from '~/screens/Student/Components/modal/modal';
import { ModalQuestion } from '~/screens/Student/Components/modal/modal-question';
import PageTeacher from '~/screens/Teacher';
import { EditScreenQuestion } from '~/screens/Teacher/Components/screen/edit-screen-question';
import { ScreenResponse } from '~/screens/responseScreen';

export type RootStackParamList = {
  DrawerNavigator: undefined;
  Modal: undefined;
  ModalQuestion: undefined;
  TabNavigator: undefined;
  ImageStepForm: undefined;
  ScreenResponse: undefined;
  EditScreenQuestion: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function AppRoutes() {
  const { user, signOut, setUser } = useAuth();

  // Atualizar pontuação do usuário sempre que a tela receber foco
  useFocusEffect(
    useCallback(() => {
      const updateUserScore = async () => {
        if (user?.email && user?.role === TypeUser.Student) {
          try {
            const userData = await validateEmail(user.email.toLowerCase());
            
            if (userData?.data && userData.data.length > 0) {
              const updatedUser = userData.data[0];
              
              // Atualizar apenas se o score mudou
              if (updatedUser.score !== user.score) {
                setUser({
                  ...user,
                  score: updatedUser.score,
                });
                
                if (__DEV__) {
                  console.log('🔄 Pontuação atualizada:', updatedUser.score);
                }
              }
            }
          } catch (error) {
            if (__DEV__) {
              console.error('Erro ao atualizar pontuação:', error);
            }
          }
        }
      };

      updateUserScore();
      return () => {};
    }, [user?.email, user?.score, user?.role])
  );

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
            <Stack.Screen
              name="ImageStepForm"
              component={ImageStep}
              options={{ headerTitle: '' }}
            />
            <Stack.Screen
              name="EditScreenQuestion"
              component={EditScreenQuestion}
              options={{ headerTitle: '' }}
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
                      <ComponentLevel
                        level={user.score ?? ''}
                        img={iconImage}
                        width={40}
                        height={40}
                      />
                      <Text style={styledHeader.text}>Pontos</Text>
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
            <Stack.Screen
              name="ScreenResponse"
              component={ScreenResponse}
              options={{ headerShown: false }}
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
