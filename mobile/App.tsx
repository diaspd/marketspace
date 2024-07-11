import {  Text, View } from 'react-native';
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';

export default function App() {
  const [isFontsLoaded] = useFonts({Karla_400Regular, Karla_700Bold})

  return (
    <View>
      {isFontsLoaded ? <Text>Loaded</Text> : <Text>Not loaded</Text>}
    </View>
  );
}