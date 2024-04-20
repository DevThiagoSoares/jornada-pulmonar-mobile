import * as Notifications from 'expo-notifications';

export const EnviarNotificacao = async () => {
  // Obter permissão para notificações
  const { status } = await Notifications.requestPermissionsAsync();
  console.log(status);
  if (status !== 'granted') {
    alert('Permissão de notificação não concedida!');
    return;
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  // Cria uma notificação local
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Bem vindo ao Jornada pulmonar',
      sound: '../../../assets/audio/sonsnotificatio.mp3',
    },
    trigger: null,
  });
};
