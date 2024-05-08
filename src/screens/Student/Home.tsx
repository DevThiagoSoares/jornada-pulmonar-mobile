import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import img from 'src/assets/image/Grupo-6845.png';
import imgEnfer2 from 'src/assets/image/Grupo7222.png';
import imgEnfer1 from 'src/assets/image/GrupoEnfer.png';

import { CardTemplate } from './Components/cards/card';

import { getModules } from '~/Shared/api/services/modules/modules';
import { BackgroundScreen } from '~/components/screens/background-image';

export interface modulesDto {
  id: string;
  questionsCount: number;
  title: string;
  userId: string;
  level?: number;
  responsesId?: string;
}

const HomeStudent = () => {
  const [listModules, setListModules] = useState([]);

  useEffect(() => {
    handleListModules();
  }, []);
  const handleListModules = async () => {
    const res = await getModules();
    const newList = res.data.map((item: modulesDto) => {
      return {
        id: item.id,
        questionsCount: item.questionsCount,
        userId: item.userId,
        title: item.title,
      };
    });
    setListModules(newList);
  };

  const getAvatar = (index: number) => {
    if (index % 2 !== 0) {
      return imgEnfer2;
    } else {
      return imgEnfer1;
    }
  };
  console.log({ listModules });
  return (
    <BackgroundScreen
      resizeMode="cover"
      source={img}
      style={[styles.backgroundImage, { backgroundColor: 'rgba(250, 206, 202, 1)' }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {listModules.length > 0 ? (
            listModules.map((item: modulesDto, idx: number) => (
              <CardTemplate
                key={idx}
                title={item.title}
                totalQuest={item.questionsCount}
                totalFinished={0}
                progress={item.questionsCount > 0 ? 0 / item.questionsCount : 0}
                img={getAvatar(idx)}
                data={[item]}
              />
            ))
          ) : (
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <Text style={{ color: 'rgba(205, 76, 62, 0.7)', fontSize: 20, fontWeight: '800' }}>
                Ainda não há Unidades para você
              </Text>
            </View>
          )}
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
