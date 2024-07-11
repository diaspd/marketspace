import {  Text, StatusBar } from 'react-native';
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';

import { NativeBaseProvider } from 'native-base';

import { Loading } from '@components/Loading';

export default function App() {
  const [isFontsLoaded] = useFonts({Karla_400Regular, Karla_700Bold})

  return (
    <NativeBaseProvider>
        <StatusBar 
          barStyle='dark-content'
          backgroundColor="transparent"
          translucent
        />
        {isFontsLoaded ? <Text>Loaded</Text> : <Loading />}
    </NativeBaseProvider>
  );
}