import './global.css';

import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';

import RootStack from './src/navigation';

export default function App() {
  return (
    <PaperProvider>
      <RootStack />
    </PaperProvider>
  );
}
