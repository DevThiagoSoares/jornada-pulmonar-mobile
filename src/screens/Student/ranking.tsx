import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import img from 'src/assets/image/Grupo-6845.png';
import goldCrown from 'src/assets/image/Grupo-7091.png';
import bronzeCrown from 'src/assets/image/bronze.png';
import silverCrown from 'src/assets/image/prata.png';

import { styles } from '../Login/styles';
import { AvatarGroup } from '../Teacher/Components/Avatar/avatarGroup';
import { styledCard } from '../Teacher/Components/Cards/styles';
import { ListInfo } from '../Teacher/Components/List-Info/List-item-info';

import { Ranking } from '~/Shared/api/services/users';
import { BackgroundScreen } from '~/components/screens/background-image';

interface rankingDto {
  name: string;
  score: number;
  imgNameUrl: string;
}

export default function TabRanking() {
  const [listRanking, setListRanking] = useState<rankingDto[]>([]);
  const [listWinner, setListWinner] = useState<rankingDto[]>([]);
  useEffect(() => {
    handleListRanking();
  }, []);
  const handleListRanking = async () => {
    const response = await Ranking();
    const sortedRanking = response.data
      .filter((item: rankingDto) => item.score > 0) // Filtra os itens com score maior que zero
      .sort((a: rankingDto, b: rankingDto) => b.score - a.score); // Ordena pelo score decrescente

    const winners = sortedRanking.slice(0, 3); // Pega os três primeiros vencedores

    setListWinner(winners);
    const newList = response.data.map((item: rankingDto) => {
      return {
        name: item.name,
        imgNameUrl: item.imgNameUrl,
        score: item.score,
      };
    });
    setListRanking(newList);
  };
  const getCrownImage = (index: number) => {
    switch (index) {
      case 0:
        return goldCrown;
      case 1:
        return silverCrown;
      case 2:
        return bronzeCrown;
      default:
        return null;
    }
  };
  return (
    <BackgroundScreen
      resizeMode="cover"
      source={img}
      style={[styles.backgroundImage, { backgroundColor: 'rgba(250, 206, 202, 1)' }]}>
      <ScrollView showsHorizontalScrollIndicator>
        <View style={{ display: 'flex', padding: 25, top: 20 }}>
          {listWinner.length > 0 ? (
            <View style={styledCard.listContainer}>
              {listWinner.map((winner, index) => (
                <AvatarGroup
                  key={index}
                  name={winner.name}
                  photo={winner.imgNameUrl}
                  points={winner.score}
                  sizePhoto={54}
                  crown={getCrownImage(index)}
                />
              ))}
            </View>
          ) : (
            <View style={{ display: 'flex', alignItems: 'center', paddingBottom: 20 }}>
              <Text style={{ color: 'rgba(205, 76, 62, 0.7)', fontSize: 20, fontWeight: '800' }}>
                Ainda não há pontuações
              </Text>
            </View>
          )}
          <View>
            {listRanking.length > 0 ? (
              listRanking.map((item: rankingDto, idx) => (
                <ListInfo key={idx} name={item.name} points={item.score} position={idx + 1} />
              ))
            ) : (
              <></>
            )}
          </View>
        </View>
      </ScrollView>
    </BackgroundScreen>
  );
}
