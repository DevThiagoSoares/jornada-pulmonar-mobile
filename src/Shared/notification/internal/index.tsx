import Toast from 'react-native-toast-message';

export function Toastfy(type: 'success' | 'error' | 'info', text: string) {
  Toast.show({
    type,
    text1: text,
    visibilityTime: 3000,
  });
}
