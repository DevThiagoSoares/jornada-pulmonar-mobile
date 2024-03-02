import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
import { Pressable } from 'react-native';

import { RootStackParamList } from '.';
import TabNavigator from './tab-navigator';
import Home from '../screens/Teacher/index';

type Props = StackScreenProps<RootStackParamList, 'DrawerNavigator'>;

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ navigation }: Props) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('DrawerNavigator')}>
              {({ pressed }) => (
                <FontAwesome
                  name="sign-out"
                  size={25}
                  color="gray"
                  style={[
                    {
                      marginRight: 16,
                      opacity: pressed ? 0.5 : 1,
                    },
                  ]}
                />
              )}
            </Pressable>
          ),
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="border-bottom" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
