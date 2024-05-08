import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import img from 'src/assets/image/Grupo-6845.png';
import imgLevel from 'src/assets/image/União4.png';

import { styles } from '../../../Login/styles';
import { Divider } from '../unitCard/divider';
import { UnitCard } from '../unitCard/unit-card';

import { useQuestion } from '~/Shared/hooks/question.context';
import { BackgroundScreen } from '~/components/screens/background-image';

export interface questionEntity {
  id: string;
  title: string;
  audioUrl: any;
  answered: boolean;
  imageBase64: string;
  moduleId: string;
  createdAt: string;
  updatedAt: string;
  responsesId: string;
  alternatives: any;
}

export default function Modal() {
  const { question } = useQuestion();
  const [listQuestion, setListQuestion] = useState<questionEntity[]>([]);

  useEffect(() => {
    handleListQuestion();
  }, []);

  const handleListQuestion = async () => {
    if (question) {
      setListQuestion(question);
    }
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
                finishe={item.answered ? 'Finalizada' : 'Não iniciada'}
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
