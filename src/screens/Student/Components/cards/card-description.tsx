import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import img from 'src/assets/image/level.png';

import { questionEntity } from '../modal/modal';
import { ComponentLevel } from '../unitCard/component-level';

import { useQuestion } from '~/Shared/hooks/question.context';

export function CardDescription() {
  const { question } = useQuestion();
  const defaultUrl = '';
  const [ListQuestion, setListQuestion] = useState<questionEntity | null>(null);
  useEffect(() => {
    handleListQuestion();
  }, []);
  const handleListQuestion = () => {
    setListQuestion(question);
  };
  const image =
    ListQuestion && ListQuestion.imageBase64.length > 0 ? ListQuestion.imageBase64 : defaultUrl;

  return (
    <Card>
      {image.length === 0 && <Card.Title title="" />}
      {image.length > 0 && (
        <Card.Cover
          source={{
            uri: image,
          }}
        />
      )}
      <Card.Content
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View style={{ display: 'flex', position: 'absolute', top: -30 }}>
          <ComponentLevel height={82} width={74} img={img} level={String(question.level) ?? '0'} />
        </View>
        <Text variant="bodyMedium" style={{ display: 'flex', marginTop: 60 }}>
          {ListQuestion?.title}
        </Text>
      </Card.Content>
    </Card>
  );
}
