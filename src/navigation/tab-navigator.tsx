import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from './Routes';
import { PageStudent } from './Routes/pages';

const Tab = createBottomTabNavigator();

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export default function TabLayout({ navigation }: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#CD4C3E',
        headerShown: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: '#F8E7E3',
        },
      }}>
      {PageStudent.map((item, idx) => (
        <Tab.Screen
          key={idx}
          name={item.route}
          component={item.component}
          options={{
            tabBarLabel: `${item.route}`,
            tabBarLabelPosition: 'beside-icon',
            tabBarIconStyle: {
              width: 30,
            },
            tabBarIcon: ({ color }) => item.icon(color),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
