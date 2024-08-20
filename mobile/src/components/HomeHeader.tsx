import { Text, Box, Heading, VStack, HStack } from "native-base";

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import type { AppNavigatorRoutesProps } from "@routes/app.routes";

import { useAuth } from "@hooks/useAuth";

import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";

export function HomeHeader() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { user } = useAuth()

  function handleGoToCreateAd() {
    navigation.navigate('createad')
  }

  return (
    <Box px="6" mt="16">
    <HStack>
      <Avatar size={45} alt="" borderWidthsize={2} source={{ uri: 'https://github.com/diaspd.png' }}/>

      <VStack ml="2" mt="0.5">
        <Text fontSize="sm">Boas vindas,</Text>
        <Heading fontSize="sm" maxW={150} numberOfLines={1}>{user.name}!</Heading>
      </VStack>

      <Button 
        title="Criar anúncio" 
        variant="terciary"
        size="140"
        ml="auto"
        leftIcon={
          <AntDesign name="plus" size={16} color="white" />
        }
        onPress={handleGoToCreateAd}
      />
    </HStack>
  </Box>
  )
}