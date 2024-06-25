import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

import { ListCard } from './Components/Cards/ListCard';
import { DescriptionCard } from './Components/Cards/descriptionCard';
import { styledHometeacher } from './styles';
import { styles } from '../Login/styles';
import { modulesDto } from '../Student/Home';
import { rankingDto } from '../Student/ranking';

import { TypeUser } from '~/Shared/Enums/typeUser';
import { getModules } from '~/Shared/api/services/modules/modules';
import { Ranking } from '~/Shared/api/services/users';
import { BackgroundScreen } from '~/components/screens/background-image';

const PageTeacher = () => {
  const [listRanking, setListRanking] = useState([]);
  const [module, setModule] = useState([]);
  const [listWinner, setListWinner] = useState<rankingDto[]>([]);

  const getUser = async () => {
    const response = await Ranking();
    const newList = response.data.map((item: any) => {
      if (item.role !== TypeUser.Teacher && item.score > 0) {
        return item;
      }
    });
    const sortedRanking = response.data
      .filter((item: rankingDto) => item.score > 0 && item.role !== 'teacher') // Filtra os itens com score maior que zero
      .sort((a: rankingDto, b: rankingDto) => b.score - a.score); // Ordena pelo score decrescente

    const winners = sortedRanking.slice(0, 3);
    setListWinner(winners);

    setListRanking(newList.filter(Boolean));
  };
  const getModule = async () => {
    const response = await getModules();
    const newList = response.data.filter((item: modulesDto) => item.questionsCount !== 0);
    setModule(newList);
  };
  useFocusEffect(
    useCallback(() => {
      getUser();
      getModule();
      return () => {};
    }, [])
  );

  return (
    <BackgroundScreen
      style={styles.backgroundImage}
      source={require('src/assets/image/image-6845.png')}
      resizeMode="cover">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styledHometeacher.container}>
          <Text style={styledHometeacher.title}>Bem-Vindo !</Text>
          <View style={styledHometeacher.card}>
            <DescriptionCard />
          </View>
          <View style={styledHometeacher.Boxseparator}>
            <View style={styledHometeacher.separator} />
          </View>
          <View style={{ display: 'flex', width: '100%' }}>
            <ListCard module={module} listWinner={listWinner} listRanking={listRanking} />
          </View>
        </View>
      </ScrollView>
    </BackgroundScreen>
  );
};

export default PageTeacher;
