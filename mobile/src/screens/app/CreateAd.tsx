import { TouchableOpacity } from "react-native";
import { Image, Heading, HStack, Text, VStack, Button, useTheme } from "native-base";

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import type { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Plus } from "phosphor-react-native";

export function CreateAd() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { colors } = useTheme();

  return (
    <VStack flex={1}  mx="6" mt="16">
      <HStack alignItems="center" mb="10">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>

        <Heading ml="24" color="gray.100" fontSize="lg" textAlign="center">Criar anúncio</Heading>
      </HStack>

      <Heading fontSize="md" color="gray.200">Imagens</Heading>
      <Text mt="1" color="gray.300">Escolha até 3 imagens para mostrar o quando o seu produto é incrível!</Text>

      <HStack my={5}>
        <Image
          w={88}
          h={88}
          mr={2}
          source={{
            uri: 'https://github.com/diaspd.png',
          }}
          alt="Imagem do anúncio"
          resizeMode="cover"
          borderRadius={8}
        />

        <Button
          bg="gray.500"
          w={88}
          h={88}
          ml={2}
          _pressed={{
            borderWidth: 1,
            bg: "gray.500",
            borderColor: "gray.400",
          }}
          onPress={() => console.log('foto adicionada')}
        >
          <Plus color={colors.gray[400]} />
        </Button>
      </HStack>
    </VStack> 
  )
}