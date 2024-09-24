import { useState } from "react";
import { TouchableOpacity } from "react-native";

import { Image, Heading, HStack, Text, VStack, Button as NativeBaseButton, useTheme, TextArea, Radio, ScrollView, Box, Switch, Checkbox, useToast, Icon } from "native-base";

import { useNavigation } from "@react-navigation/native";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as y from 'yup'

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { AntDesign } from '@expo/vector-icons';
import { Plus, XCircle } from "phosphor-react-native";

import type { AppStackNavigatorRoutesProps } from "@routes/stack.routes";

import { AppError } from "@utils/AppError";
import { usePriceFormatter } from "@hooks/usePriceFormatter";

import { Input } from "@components/Input";
import { Button } from "@components/Button";


type FormDataProps = {
  title: string;
  description: string;
  acceptTrade: boolean;
  price: string;
}

const signInSchema = y.object({
  title: y.string().required('Informe o título do anúncio.'),
  description: y.string().required('Informe a descrição do anúncio.'),
  acceptTrade: y.boolean().required(''),
  price: y.string().required('Informe o valor do produto.'),
})

export function CreateAd() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string[]>([]);
  const [isNew, setIsNew] = useState(true);
  const [images, setImages] = useState<any[]>([]);

  const { formatPrice } = usePriceFormatter();

  const navigation = useNavigation<AppStackNavigatorRoutesProps>();
  const { colors } = useTheme();
  
  const toast = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
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

  async function handleGoToAdPreview({ title, description, acceptTrade, price }: FormDataProps){
    try {  
      if (paymentMethod.length === 0) {
        return toast.show({
          title: "Selecione ao menos um meio de pagamento!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (images.length === 0) {
        return toast.show({
          title: "Selecione ao menos uma imagem!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      navigation.navigate("adpreview", {
        title,
        description,
        price,
        paymentMethod,
        isNew,
        images,
        acceptTrade
      });
    } catch (error) {
      console.log(error)
      
      setIsLoading(false)
    }
  }

  async function handleAdPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (images.length > 2) {
        throw new AppError("Só pode selecionar 3 fotos!");
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma de até 5MB.",
            placement: "top",
            bgColor: "red.500",
          });
        }

        const fileExtension = photoSelected.assets[0].uri.split(".").pop();

        const photoFile = {
          name: `${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        setImages((images) => {
          return [...images, photoFile];
        });

        toast.show({
          title: "Foto selecionada!",
          placement: "top",
          bgColor: "green.500",
        });
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível selecionar a imagem. Tente novamente!";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleRemoveImage(imageIndex: number) {
    const updatedImages = [...images];

    updatedImages.splice(imageIndex, 1);
    setImages(updatedImages);
  };

  return (
    <ScrollView flex={1} mx="6" mt="16" showsVerticalScrollIndicator={false}>
      <HStack alignItems="center" mb="10">
        <TouchableOpacity onPress={() => navigation.navigate('hometab')}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>

        <Heading ml="24" color="gray.100" fontSize="lg" textAlign="center">Criar anúncio</Heading>
      </HStack>

      <Heading fontSize="md" color="gray.200">Imagens</Heading>
      <Text mt="1" color="gray.300">Escolha até 3 imagens para mostrar o quando o seu produto é incrível!</Text>

      <HStack my={5}>
        {images.length > 0 &&
          images
          .map((imageData, index) => (
            <>
              <Image
                w={88}
                h={88}
                mr={2}
                source={{
                  uri: imageData.uri,
                }}
                alt="Imagem do anúncio"
                resizeMode="cover"
                borderRadius={8}
                key={imageData.id}
              />
              <TouchableOpacity onPress={() => handleRemoveImage(index)} key={index}>
                <XCircle size={22} color={colors.red[600]} weight="bold" style={{ position: "absolute", top: 5, right: 10 }} />
              </TouchableOpacity>
            </>
        ))}

        {images.length < 3 && (
          <NativeBaseButton
            bg="gray.500"
            w={88}
            h={88}
            ml={2}
            _pressed={{
              borderWidth: 1,
              bg: "gray.500",
              borderColor: "gray.400",
            }}
            onPress={handleAdPhotoSelect}
          >
            <Plus color={colors.gray[400]} />
          </NativeBaseButton>
        )}
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

        <Radio.Group
          name="myRadioGroup"
          accessibilityLabel="Selecione o estado do seu produto"
          value={isNew ? "new" : "used"}
          onChange={(nextValue) => {
            setIsNew(nextValue === "new" ? true : false);
          }}
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
          onPress={handleSubmit(handleGoToAdPreview)} 
          isLoading={isLoading} 
        />
      </HStack>
    </ScrollView> 
  )
}