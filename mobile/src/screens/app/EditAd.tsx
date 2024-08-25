import { TouchableOpacity } from "react-native";
import { Image, Heading, HStack, Text, VStack, Button as NativeBaseButton, useTheme, TextArea, Radio, ScrollView, Box, Switch, Checkbox } from "native-base";

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import type { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Plus } from "phosphor-react-native";
import { Input } from "@components/Input";
import { useState } from "react";
import { Button } from "@components/Button";

import { usePriceFormatter } from '@hooks/usePriceFormatter'

export function EditAd() {
  const [isSwitchActive, setIsSwitchActive] = useState(false)

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { colors } = useTheme();

  const { formatPrice } = usePriceFormatter();

  return (
    <ScrollView flex={1} mx="6" mt="16" showsVerticalScrollIndicator={false}>
      <HStack alignItems="center" mb="10">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>

        <Heading ml="24" color="gray.100" fontSize="lg" textAlign="center">Editar anúncio</Heading>
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

        <NativeBaseButton
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
        </NativeBaseButton>
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
          <Radio value="new" size="sm" _checked={{ borderColor: colors.blue[700], color: colors.blue[700] }} icon={<Box w="5" h="5" bg="blue.700" rounded="full" />}>
            Produto novo
          </Radio>
          <Radio value="used" ml="5" size="sm" _checked={{ borderColor: colors.blue[700], color: colors.blue[700] }} icon={<Box w="5" h="5" bg="blue.700" rounded="full" />}>
            Produto usado
          </Radio>
        </HStack>
      </Radio.Group>

      <Heading fontSize="md" color="gray.200" mt="8">Venda</Heading>

      <Input 
        placeholder="Valor do produto" 
        keyboardType="numeric"
        mt="4"
        InputLeftElement={<Text fontSize="md" ml="4">R$</Text>}
      />
      

      <VStack alignItems="start" w="full" mb="3">
        <Text fontWeight="bold" color="gray.200">Aceita troca?</Text>

        <Box bg={isSwitchActive ? "blue.700" : "gray.500"} w="42" h="22" mt="3" rounded="full" alignItems="center" justifyContent="center">
          <Switch 
            isChecked={isSwitchActive}
            ml="-1"
            mr="auto"
            offTrackColor="transparent" onTrackColor="transparent" onThumbColor="gray.700" offThumbColor="gray.700"
            onToggle={() => setIsSwitchActive(prevState => !prevState)}
          />
        </Box>
      </VStack>

      <VStack alignItems="start" w="full" mt="4">
        <Text fontWeight="bold" color="gray.200" mb="3">Meios de pagamento aceitos</Text>

        <VStack space="2">
          <Checkbox 
            value="Boleto" 
            _checked={{ backgroundColor: 'blue.700', borderColor: 'blue.700' }}
            _text={{ color: 'gray.200'}}
          >Boleto
          </Checkbox>
          
          <Checkbox 
            value="Pix" 
            _checked={{ backgroundColor: 'blue.700', borderColor: 'blue.700' }}
            _text={{ color: 'gray.200'}}
          >Pix
          </Checkbox>

          <Checkbox 
            value="Dinheiro" 
            _checked={{ backgroundColor: 'blue.700', borderColor: 'blue.700' }}
            _text={{ color: 'gray.200'}}
          >Dinheiro
          </Checkbox>

          <Checkbox 
            value="Cartão de Crédito" 
            _checked={{ backgroundColor: 'blue.700', borderColor: 'blue.700' }}
            _text={{ color: 'gray.200'}}
          >Cartão de Crédito
          </Checkbox>
          
          <Checkbox 
            value="Depósito Bancário" 
            _checked={{ backgroundColor: 'blue.700', borderColor: 'blue.700' }}
            _text={{ color: 'gray.200'}} 
          >Depósito Bancário
          </Checkbox>
        </VStack>    
      </VStack>

      <HStack flex={1} mb="8" mt="12">
        <Button title="Cancelar" variant="secondary" w="175" onPress={() => navigation.goBack()}/>
        <Button title="Avançar" variant="terciary" w="175" ml="3" onPress={() => navigation.navigate('myads')}/>
      </HStack>
    </ScrollView> 
  )
}