import { StatusBar, Text } from 'react-native';
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';

import { NativeBaseProvider } from 'native-base';

import { THEME } from './src/theme';

import { Loading } from '@components/Loading';

export default function App() {
  const [isFontsLoaded] = useFonts({Karla_400Regular, Karla_700Bold})

  return (
    <NativeBaseProvider theme={THEME}>
        <StatusBar 
          barStyle='dark-content'
          backgroundColor="transparent"
          translucent
        />
        
        {isFontsLoaded ? <Text>Loaded</Text> : <Loading />}
    </NativeBaseProvider>
  );
}