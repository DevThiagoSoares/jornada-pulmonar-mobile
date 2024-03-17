import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import img from 'src/assets/image/Grupo-6845.png';
import imgEnfer2 from 'src/assets/image/Grupo7222.png';
import imgEnfer1 from 'src/assets/image/GrupoEnfer.png';

import { CardTemplate } from './Components/cards/card';

import { BackgroundScreen } from '~/components/screens/background-image';

const HomeStudent = () => {
  return (
    <BackgroundScreen
      resizeMode="cover"
      source={img}
      style={[styles.backgroundImage, { backgroundColor: 'rgba(250, 206, 202, 1)' }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          <CardTemplate
            title="Enfermaria"
            totalQuest={10}
            totalFinishe={1}
            progress={0.1}
            img={imgEnfer1}
          />
          <CardTemplate
            title="UPA"
            totalQuest={8}
            totalFinishe={3}
            progress={0.3}
            img={imgEnfer2}
          />
        </View>
      </ScrollView>
    </BackgroundScreen>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'row', // Altera a direção para horizontal
    justifyContent: 'center',
    alignItems: 'center',
    top: 40,
  },
});

export default HomeStudent;
