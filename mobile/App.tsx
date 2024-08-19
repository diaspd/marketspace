import { StatusBar } from 'react-native';
import { useFonts, Karla_300Light, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';

import { NativeBaseProvider } from 'native-base';

import { THEME } from './src/theme';

import { Loading } from '@components/Loading';
import { Routes } from '@routes/index';
import { AuthContextProvider } from '@contexts/AuthContext';

export default function App() {
  const [isFontsLoaded] = useFonts({Karla_300Light, Karla_400Regular, Karla_700Bold})

  return (
    <NativeBaseProvider theme={THEME}>
        <StatusBar 
          barStyle='dark-content'
          backgroundColor="transparent"
          translucent
        />
        <AuthContextProvider>
          {isFontsLoaded ? <Routes /> : <Loading />}
        </AuthContextProvider>
    </NativeBaseProvider>
  );
}