import { useState } from "react";

import { Box, Heading, HStack, ScrollView, Text, useTheme, VStack } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ArrowLeft, Tag } from 'phosphor-react-native';

import type { AppNavigatorRoutesProps } from "@routes/app.routes";

import { useAuth } from "@hooks/useAuth";

import { CarouselComponent }  from '@components/Carousel'
import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import { paymentMethodFormatter } from "@utils/paymentMethodFormatter";

type RouteParams = {
  title: string;
  description: string;
  price: string;
  images: any[];
  paymentMethod: string[];
  isNew: boolean;
  acceptTrade: boolean;
};

export function AdPreview() {
  const [isAdDisabled, setIsAdDisabled] = useState(false);
  const { colors } = useTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { user } = useAuth();
  const route = useRoute();

  const {
    title,
    description,
    price,
    images,
    paymentMethod,
    isNew,
    acceptTrade,
  } = route.params as RouteParams;

  function handleGoToCreateAd() {
    navigation.navigate('createad')
  }

  function handleGoToMyAds() {
    navigation.navigate('myads')
  }

  return (
    <VStack flex={1}>
      <VStack bg="blue.700" justifyContent="center" alignItems="center" h="32">
        <Text mt="8" fontSize="md" fontFamily="heading" color="gray.700">Pré visualização do anúncio</Text>
        <Text mt="1" fontSize="sm" color="gray.700">É assim que seu produto vai aparecer!</Text>
      </VStack>

      <CarouselComponent isAdDisabled={isAdDisabled} />

      <ScrollView>
        <VStack flex={1} mx="6" alignItems="flex-start" mb="5">
          <HStack alignItems="center">
            <Avatar 
              source={{ uri: 'https://github.com/diaspd.png'}} 
              size={8} 
              borderWidthsize={2} 
              alt=""
              mr="2"
            />

            <Text fontSize="md" color="gray.100">{user.name}</Text>
          </HStack>

          <Box bg="gray.500" rounded="full" px="2.5" alignItems="center" mt="6">
            <Text color="gray.200" fontFamily="heading" fontSize="xs">
              {isNew ? "NOVO" : "USADO"}
            </Text> 
          </Box>

          <HStack w="full" mt="3">
            <Heading numberOfLines={1} maxW={240} fontSize="lg" color="gray.100">{title}</Heading>

            <Box ml="auto">
              <Heading fontSize="lg" color="blue.700">
                <Text fontSize="sm">
                  R${' '}
                </Text>
                {price}
              </Heading>
            </Box>
          </HStack>

          <Text fontSize="sm" color="gray.200" mt="2" numberOfLines={4}>
            {description}
          </Text>

          <HStack w="full" mt="3" alignItems="baseline">
            <Heading fontSize="sm" color="gray.200">Aceita troca?</Heading>

            <Text fontSize="sm" ml="1">
              {acceptTrade ? "Sim" : "Não"}
            </Text>
          </HStack>

          <VStack w="full" mt="4">
            <Heading fontSize="sm" color="gray.200" mb="2">Meios de pagamento:</Heading>

            {paymentMethodFormatter(paymentMethod)} 
          </VStack>

          <HStack mt="10" mb="4">
            <Button title="Voltar e editar" variant="secondary" w="175" onPress={handleGoToCreateAd} leftIcon={<ArrowLeft size={16} color={colors.gray[100]} />} />
            <Button title="Publicar" variant="primary" w="175" ml="3" onPress={handleGoToMyAds} leftIcon={<Tag size={16} color={colors.gray[600]} />}/>
          </HStack>
      </VStack>
      </ScrollView>
    </VStack>
  )
}