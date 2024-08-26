import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image, Heading, HStack, Text, VStack, Button as NativeBaseButton, useTheme, TextArea, Radio, ScrollView, Box, Switch, Checkbox } from "native-base";

import { useNavigation } from "@react-navigation/native";

import { AntDesign } from '@expo/vector-icons';
import { Plus } from "phosphor-react-native";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import type { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import * as y from 'yup'
import { usePriceFormatter } from "@hooks/usePriceFormatter";

type FormDataProps = {
  title: string;
  description: string;
  isNew: string;
  acceptTrade: boolean;
  price: string;
}

const signInSchema = y.object({
  title: y.string().required('Informe o título do anúncio.'),
  description: y.string().required('Informe o descrição do anúncio.'),
  isNew: y.string().required(''),
  acceptTrade: y.boolean().required(''),
  price: y.string().required('Informe o valor do produto.'),
})

export function CreateAd() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string[]>([]);

  const { formatPrice } = usePriceFormatter();

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { colors } = useTheme();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      isNew: 'new',
      acceptTrade: false, 
    }
  });

  function toggleCheckbox (value: string) {
    if (paymentMethod.includes(value)) {
      setPaymentMethod(prev => prev.filter(item => item !== value));
    } else {
      setPaymentMethod(prev => [...prev, value]);
    }
  };

  async function handleCreateAd({ title, description, isNew, acceptTrade, price }: FormDataProps){
    try {
      console.log(title, description, isNew, acceptTrade, price, paymentMethod)
    } catch (error) {
      console.log(error)
      
      setIsLoading(false)
    }
  }

  return (
    <ScrollView flex={1} mx="6" mt="16" showsVerticalScrollIndicator={false}>
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

      <Controller 
        control={control}
        name='title'
        render={({ field: { onChange, value }}) => (
        <Input 
          placeholder="Título do anúncio" 
          mt="4" 
          onChangeText={onChange}
          value={value}
          errorMessage={errors.title?.message}
        />
        )}
      />

      <Controller 
        control={control}
        name='description'
        render={({ field: { onChange, value }}) => (
        <>
          <TextArea 
            placeholder="Descrição do produto" 
            autoCompleteType="none" 
            fontSize="md" 
            h="32"
            mt="4" 
            color={colors.gray[200]}
            variant="unstyled"
            borderWidth={1}
            borderColor={colors.gray[700]}
            _focus={{ borderColor: 'gray.100'}}
            backgroundColor={colors.gray[700]}
            onChangeText={onChange}
            value={value}
          />

          <Text color={colors.red[400]} fontSize="xs">
            {errors.description?.message}
          </Text>
        </>
        )}
      />

      <Controller
        name="isNew"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="Selecione o estado do seu produto"
            value={value || 'new'}
            onChange={onChange}
          >
            <HStack mt="4">
              <Radio
                value="new"
                size="sm"
                _checked={{ borderColor: colors.blue[700], color: colors.blue[700] }} 
                icon={<Box w="5" h="5" bg="blue.700" rounded="full" />}
              >
                Produto novo
              </Radio>
              <Radio
                value="used"
                ml="5"
                size="sm"
                _checked={{ borderColor: colors.blue[700], color: colors.blue[700] }} 
                icon={<Box w="5" h="5" bg="blue.700" rounded="full" />}
              >
                Produto usado
              </Radio>
            </HStack>
          </Radio.Group>

          <Text color={colors.red[400]} fontSize="xs">
            {errors.isNew?.message}
          </Text>
        </>
        )}
      />

      <Heading fontSize="md" color="gray.200" mt="8">Venda</Heading>

      <Controller 
        control={control}
        name="price"
        render={({ field: { onChange, value } }) => {
          const handleChange = (text: string) => {
            const formattedValue = formatPrice(text);
            onChange(formattedValue); 
          };

          return (
            <Input 
              placeholder="Valor do produto" 
              keyboardType="numeric"
              value={value} 
              onChangeText={handleChange} 
              mt="4"
              errorMessage={errors.price?.message}
              InputLeftElement={<Text fontSize="md" ml="4">R$</Text>}
            />
          );
        }}
      />

      <Controller
        name="acceptTrade"
        control={control}
        render={({ field: { onChange, value } }) => (
          <VStack alignItems="start" w="full" mb="3">
            <Text fontWeight="bold" color="gray.200">Aceita troca?</Text>

            <Box
              bg={value ? "blue.700" : "gray.500"}
              w="42"
              h="22"
              mt="3"
              rounded="full"
              alignItems="center"
              justifyContent="center"
            >
              <Switch 
                isChecked={value}
                ml="-1"
                mr="auto"
                offTrackColor="transparent"
                onTrackColor="transparent"
                onThumbColor="gray.700"
                offThumbColor="gray.700"
                onToggle={onChange} 
              />
            </Box>
          </VStack>
        )}
      />

      <VStack alignItems="start" w="full" mt="4">
        <Text fontWeight="bold" color="gray.200" mb="3">Meios de pagamento aceitos</Text>

        <VStack space={4}>
          <Checkbox 
            value="boleto" 
            isChecked={paymentMethod.includes('boleto')}
            onChange={() => toggleCheckbox('boleto')}
            _checked={{ backgroundColor: 'blue.700', borderColor: 'blue.700' }}
            _text={{ color: 'gray.200'}}
          >
            Boleto
          </Checkbox>
          
          <Checkbox 
            value="pix" 
            isChecked={paymentMethod.includes('pix')}
            onChange={() => toggleCheckbox('pix')}
            _checked={{ backgroundColor: 'blue.700', borderColor: 'blue.700' }}
            _text={{ color: 'gray.200'}}
          >
            Pix
          </Checkbox>

          <Checkbox 
            value="cash" 
            isChecked={paymentMethod.includes('cash')}
            onChange={() => toggleCheckbox('cash')}
            _checked={{ backgroundColor: 'blue.700', borderColor: 'blue.700' }}
            _text={{ color: 'gray.200'}}
          >
            Dinheiro
          </Checkbox>

          <Checkbox 
            value="card" 
            isChecked={paymentMethod.includes('card')}
            onChange={() => toggleCheckbox('card')}
            _checked={{ backgroundColor: 'blue.700', borderColor: 'blue.700' }}
            _text={{ color: 'gray.200'}}
          >
            Cartão de Crédito
          </Checkbox>
          
          <Checkbox 
            value="deposit" 
            isChecked={paymentMethod.includes('deposit')}
            onChange={() => toggleCheckbox('deposit')}
            _checked={{ backgroundColor: 'blue.700', borderColor: 'blue.700' }}
            _text={{ color: 'gray.200'}} 
          >
            Depósito Bancário
          </Checkbox>
        </VStack>
      </VStack>

      <HStack flex={1} mb="8" mt="12">
        <Button title="Cancelar" variant="secondary" w="175" onPress={() => navigation.goBack()}/>

        <Button 
          title="Avançar" 
          variant="terciary" w="175" ml="3" 
          onPress={handleSubmit(handleCreateAd)} 
          isLoading={isLoading} 
        />
      </HStack>
    </ScrollView> 
  )
}