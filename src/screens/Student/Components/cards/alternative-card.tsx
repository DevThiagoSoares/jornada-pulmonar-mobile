import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

import { styledAlternative, styledCard } from './styles';

import { useAuth } from '~/Shared/Auth';
import { answer, payloadProps } from '~/Shared/api/services/response';
import { useData } from '~/Shared/hooks/audio.context';
import { useQuestion } from '~/Shared/hooks/question.context';
import { Toastfy } from '~/Shared/notification/internal';
import { RootStackParamList } from '~/navigation/Routes';
import { Alternative } from '~/screens/Question/components/alternative-question';

interface alternativaProps {
  options: Alternative[];
}

type Props = StackScreenProps<RootStackParamList, 'DrawerNavigator'>;

export function AlternativaCard(props: alternativaProps) {
  const navigation = useNavigation<Props['navigation']>();
  const [correctAlternative, setCorrectAlternative] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const { question } = useQuestion();
  const { user } = useAuth();
  const { setData } = useData();

  const handleSelectCorrectAlternative = (value: string) => {
    setCorrectAlternative(value);
  };
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isRunning && timer !== 0) {
      clearInterval(interval!);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timer]);
  useEffect(() => {
    setIsRunning(true);
  }, []);

  const handleReset = () => {
    setTimer(0);
    setIsRunning(false);
  };
  const [isLoading, setIsLoading] = useState(false);

  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    const body: payloadProps = {
      optionId: correctAlternative,
      questionId: question.id,
      userId: user?.id ?? '',
      time: timer,
    };
    try {
      const response: any = await answer(body);
      if (response.data.message === 'questão já respondida') {
        setIsLoading(false);
        Toastfy('error', response.data.message);
        return;
      }
      if (response.data.message === 'respota incorreta') {
        Toastfy('error', response.data.message);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      navigation.navigate('ScreenResponse');
      setData({
        isAnswer: true,
        time: formatTime(Number(response.data.time)),
        points: Number(response.data.pontuacao),
      });
      handleReset();
    } catch (error: any) {
      setIsLoading(false);
      if (correctAlternative.length === 0) {
        setIsLoading(false);
        Toastfy('error', 'Selecione uma alternativa antes de enviar!');
        return;
      }
      Toastfy('error', JSON.stringify(error.message));
    }
  };

  return (
    <View style={styledAlternative.container}>
      <Text style={styledAlternative.title}>Qual opção correta?</Text>
      {props.options.map((alt, idx) => (
        <View key={idx}>
          <Text
            onPress={() => handleSelectCorrectAlternative(alt.value)}
            style={
              correctAlternative !== alt.value
                ? styledAlternative.alternative
                : styledAlternative.alternativeCorrect
            }>
            {String.fromCharCode(65 + idx)}) {alt.description}
          </Text>
        </View>
      ))}
      <View style={styledCard.buttonContainer}>
        <Button
          style={styledCard.button}
          textColor="#FFFF"
          labelStyle={{ fontSize: 15 }}
          loading={isLoading}
          onPress={handleSubmit}>
          SALVAR
        </Button>
      </View>
      <View style={styledCard.containerTimer}>
        <Ionicons name="hourglass" size={20} color="#CD4C3E" />
        <Text style={styledCard.timerText}>{formatTime(timer)}</Text>
      </View>
    </View>
  );
}
