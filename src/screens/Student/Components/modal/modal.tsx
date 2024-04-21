import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import img from 'src/assets/image/Grupo-6845.png';
import imgLevel from 'src/assets/image/União4.png';

import { styles } from '../../../Login/styles';
import { modulesDto } from '../../Home';
import { Divider } from '../unitCard/divider';
import { UnitCard } from '../unitCard/unit-card';

import { ListQuestionApi } from '~/Shared/api/services/questions';
import { BackgroundScreen } from '~/components/screens/background-image';

export default function Modal() {
  const [listQuestion, setListQuestion] = useState<modulesDto[]>([]);

  useEffect(() => {
    handleListQuestion();
  }, []);

  const handleListQuestion = async () => {
    const resp = await ListQuestionApi();
    console.log(resp?.data);
    if (resp) setListQuestion(resp.data);
  };
  return (
    <BackgroundScreen source={img} style={styles.backgroundImage} resizeMode="cover">
      <ScrollView showsHorizontalScrollIndicator={false}>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        {listQuestion.length > 0 &&
          listQuestion.map((item: modulesDto, idx: number) => (
            <View key={idx} style={{ display: 'flex', flexDirection: 'column', margin: 30 }}>
              <UnitCard
                key={idx}
                question={item.title}
                finishe="Não iniciada"
                level={String(idx + 1)}
                imgLevel={imgLevel}
                data={item}
              />
              <Divider key={idx} />
            </View>
          ))}
      </ScrollView>
    </BackgroundScreen>
  );
}
