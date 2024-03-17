import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import { RootStackParamList } from './Routes';
import One from '../screens/Student/one';
import Two from '../screens/Student/two';

const Tab = createBottomTabNavigator();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={styles.tabBarIcon} {...props} />;
}

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export default function TabLayout({ navigation }: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#CD4C3E',

        headerShown: false,
      }}>
      <Tab.Screen
        name="One"
        component={One}
        options={{
          title: 'Home',

          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Two"
        component={Two}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="head-question" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tree"
        component={Two}
        options={{
          title: 'Ranking',
          tabBarIcon: ({ color }) => <MaterialIcons name="stars" size={30} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
});
