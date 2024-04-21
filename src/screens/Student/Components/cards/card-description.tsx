import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import img from 'src/assets/image/level.png';

import { questionsDto } from './card';
import { ComponentLevel } from '../unitCard/component-level';

import { useQuestion } from '~/Shared/hooks/question.context';

export function CardDescription() {
  const { question } = useQuestion();
  const [ListQuestion, setListQuestion] = useState<questionsDto | null>(null);
  useEffect(() => {
    handleListQuestion();
  }, []);
  const handleListQuestion = () => {
    setListQuestion(question);
  };
  return (
    <Card>
      <Card.Title title="Título da Unidade" />
      <Card.Cover source={{ uri: ListQuestion?.imgNameUrl }} />
      <Card.Content
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View style={{ display: 'flex', position: 'absolute', top: -30 }}>
          <ComponentLevel
            height={82}
            width={74}
            img={img}
            level={String(ListQuestion?.level) ?? '0'}
          />
        </View>
        <Text variant="bodyMedium" style={{ display: 'flex', marginTop: 60 }}>
          {ListQuestion?.title}
        </Text>
      </Card.Content>
    </Card>
  );
}
