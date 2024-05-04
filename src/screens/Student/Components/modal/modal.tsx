import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import img from 'src/assets/image/Grupo-6845.png';
import imgLevel from 'src/assets/image/União4.png';

import { styles } from '../../../Login/styles';
import { Divider } from '../unitCard/divider';
import { UnitCard } from '../unitCard/unit-card';

import { ListQuestionApi } from '~/Shared/api/services/questions';
import { BackgroundScreen } from '~/components/screens/background-image';

export interface questionEntity {
  id: string;
  title: string;
  audioUrl: any;
  imageBase64: string;
  moduleId: string;
  createdAt: string;
  updatedAt: string;
  responsesId: string;
  alternatives: any;
}

export default function Modal() {
  const [listQuestion, setListQuestion] = useState<questionEntity[]>([]);

  useEffect(() => {
    handleListQuestion();
  }, []);

  const handleListQuestion = async () => {
    const resp = await ListQuestionApi();
    if (resp) setListQuestion(resp.data);
  };
  return (
    <BackgroundScreen source={img} style={styles.backgroundImage} resizeMode="cover">
      <ScrollView showsHorizontalScrollIndicator={false} style={{ marginTop: 30 }}>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        {listQuestion.length > 0 &&
          listQuestion.map((item: questionEntity, idx: number) => (
            <View key={idx} style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
              <UnitCard
                question={item.title}
                finishe={item.responsesId ? 'Finalizada' : 'Não iniciada'}
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
