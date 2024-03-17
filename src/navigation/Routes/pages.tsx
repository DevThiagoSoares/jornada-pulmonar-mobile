/* eslint-disable prettier/prettier */

import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import React from 'react';
import { StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import TabHome from '~/screens/Student/Home';
import TabPerfil from '~/screens/Student/perfil';
import TabRanking from '~/screens/Student/ranking';
import PageTeacher from '~/screens/Teacher/index';

export const PagesTeacher = [
  {
    component: PageTeacher,
  },
];

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={styles.tabBarIcon} {...props} />;
}

export const PageStudent = [
  {
    component: TabHome,
    icon: (color: string) => <TabBarIcon name="home" color={color} />,
    route: 'Home',
  },
  {
    component: TabPerfil,
    icon: (color: string) => (
      <MaterialCommunityIcons name="head-question" size={30} color={color} />
    ),
    route: 'Perfil',
  },
  {
    component: TabRanking,
    icon: (color: string) => <MaterialIcons name="stars" size={30} color={color} />,
    route: 'Ranking',
  },
];

export const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
});
