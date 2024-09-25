import { useEffect, useState } from "react";
import { Box, HStack, Image, Text, Heading, Pressable, IStackProps } from "native-base";

import { useNavigation } from "@react-navigation/native";
import type { AppStackNavigatorRoutesProps } from "@routes/stack.routes";

import { api } from "@services/api";

import type { ProductDTO } from "@dtos/ProductDTO";
import { AppError } from "@utils/AppError";
import { usePriceFormatter } from "@hooks/usePriceFormatter";

type Props = IStackProps & {
  title: string;
  price: string;
  used: boolean;
  active: boolean;
  image: string;
  id: string;
  showProfileImg?: boolean;
  profileImage?: string;
};

export function Card({
  title,
  price,
  used,
  active = true,
  image,
  profileImage,
  id
  }: Props) {
  const [product, setProduct] = useState({} as ProductDTO);

  const { formatPrice } = usePriceFormatter();
  const formattedPrice = formatPrice(price);

  const navigation = useNavigation<AppStackNavigatorRoutesProps>();

  function handleGoToAdDetails() {
    navigation.navigate("addetails", { id });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const productData = await api.get(`products/${id}`);
        setProduct(productData.data);
      } catch (error) {
        const isAppError = error instanceof AppError;
        const title = isAppError
          ? error.message
          : "Não foi possível receber os dados do anúncio. Tente Novamente!";

        if (isAppError) {
          console.log('erro =>', title);
        }
      }
    };

    loadData();
  }, []);

  return (
    <>
    <Pressable mb="6" onPress={handleGoToAdDetails}> 
      <Box w={170} h="24" opacity={active ? '100' : '75'}>

      <HStack alignItems="flex-start" justifyContent="space-between" mt="1">
        {profileImage && (
            <Image
              h={8}
              w={8}
              source={{
                uri: profileImage,
              }}
              alt={title}
              borderRadius="full"
              position="absolute"
              zIndex={100}
              left={1}
              top={1}
              borderWidth={1}
              borderColor="gray.300"
            />
          )}
          <Image
            h="24"
            w="lg"
            source={{
              uri: image,
            }}
            alt={title}
            resizeMode="cover"
            borderRadius={10}
            blurRadius={active ? 0 : 10}
            borderWidth={1}
            borderColor="gray.500"
          />

          <Box bg={used ? "gray.200" : "blue.500"} rounded="full" mt="2" mr="1" px="2" py="0.5" alignItems="center" ml="auto">
            <Text color="gray.600" fontFamily="heading" fontSize="xs">
              {used ? "USADO" : "NOVO"}
            </Text>
          </Box>
        </HStack>

        
        {!active && (
          <Text mt="auto" color="gray.700" fontWeight="bold" fontSize="xs" px="2">ANÚNCIO DESATIVADO</Text>
        )}
      </Box>

      <Text mt="2" maxW={166} noOfLines={1} color={active ? "gray.200" : "gray.400"}>{product.name}</Text>
      <Text fontSize="sm" mt="0.5" color={active ? "gray.100" : "gray.400"} maxW={166} noOfLines={1}>
        R$
        <Heading fontSize="lg" color={active ? "gray.100" : "gray.400"}>
          {' '}{formattedPrice}
        </Heading>
      </Text> 
    </Pressable>
    </>
  )
}