import { TouchableOpacity } from "react-native";
import { Image, Heading, HStack, Text, VStack, Button, useTheme, TextArea, Radio } from "native-base";

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import type { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Plus } from "phosphor-react-native";
import { Input } from "@components/Input";

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
          mb="6"
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

      <Heading fontSize="md" color="gray.200">Sobre o produto</Heading>

      <Input mt="4" placeholder="Título do anúncio"/>

      <TextArea 
        placeholder="Descrição do produto" 
        autoCompleteType="none" 
        fontSize="md" 
        h="32"
        color={colors.gray[200]}
        variant="unstyled"
        borderWidth={1}
        borderColor={colors.gray[700]}
        _focus={{ borderColor: 'gray.100'}}
        backgroundColor={colors.gray[700]}
      />

          <Radio.Group name="myRadioGroup" accessibilityLabel="Selecione o estado do seu produto">
            <HStack mt="4">
              <Radio value="new" _checked={{ borderColor: colors.blue[700], color: colors.blue[700] }}>
                Produto novo
              </Radio>
              <Radio value="used" ml="5" _checked={{ borderColor: colors.blue[700], color: colors.blue[700] }}>
                Produto usado
              </Radio>
            </HStack>
          </Radio.Group>
     
    </VStack> 
  )
}