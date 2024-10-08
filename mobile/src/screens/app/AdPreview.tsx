import { useState } from "react";

import { Box, Heading, HStack, ScrollView, Text, useTheme, VStack, useToast } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useForm } from "react-hook-form";

import { ArrowLeft, Tag } from 'phosphor-react-native';

import type { AppStackNavigatorRoutesProps } from "@routes/stack.routes";
import type { AppTabNavigatorRoutesProps } from "@routes/tab.routes";

import { useAuth } from "@hooks/useAuth";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import { paymentMethodFormatter } from "@utils/paymentMethodFormatter";

import { CarouselComponent }  from '@components/Carousel'
import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";

type RouteParams = {
  title: string;
  description: string;
  price: string;
  images: any[];
  paymentMethod: string[];
  isNew: boolean;
  acceptTrade: boolean;
  id: string;
};

export function AdPreview() {
  const [isLoading, setIsLoading] = useState(false);
  
  const { colors } = useTheme();
  const toast = useToast();

  const navigationStack = useNavigation<AppStackNavigatorRoutesProps>();
  const navigationTab = useNavigation<AppTabNavigatorRoutesProps>();
  
  const route = useRoute();

  const { handleSubmit } = useForm<RouteParams>();

  const { user } = useAuth();

  const {
    title,
    description,
    price,
    images,
    paymentMethod,
    isNew,
    acceptTrade,
    id
  } = route.params as RouteParams;

  function handleGoBack() {
    if (id) {
      navigationStack.navigate('editad', {
        title,
        description,
        price,
        images,
        paymentMethod,
        isNew,
        acceptTrade,
        id
      }) 
    } else {
      navigationStack.navigate('createad')
    }
  }

  async function handlePublishAd() {
    setIsLoading(true);

    try {
      const product = await api.post("/products", {
        name: title,
        description,
        price: parseInt(price.replace(/[^0-9]/g, "")),
        payment_methods: paymentMethod,
        is_new: isNew,
        accept_trade: acceptTrade,
      });

      const imageData = new FormData();

      images.forEach((item) => {
        const imageFile = {
          ...item,
          name: user.name + "." + item.name,
        } as any;

        imageData.append("images", imageFile);
      });

      imageData.append("product_id", product.data.id);

      const imagesData = await api.post("/products/images", imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigationTab.navigate("myads");
    } catch (error) {
      console.log("Error details:", error); // Log para mostrar o erro
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível publicar o anúncio. Tente novamente mais tarde!";
    
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  async function handleSaveChanges() {
    setIsLoading(true);
  
    try {
      const product = await api.put(`/products/${id}`, {
        name: title,
        description,
        price: parseInt(price.replace(/[^0-9]/g, "")),
        payment_methods: paymentMethod,
        is_new: isNew,
        accept_trade: acceptTrade,
      });
  
      const imageData = new FormData();

      images.forEach((item) => {
        const imageFile = {
          ...item,
          name: user.name + "." + item.name,
        } as any;

        imageData.append("images", imageFile);
      });
      
      imageData.append("product_id", id);

      try {
        const response = await api.post("/products/images", imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      } catch(err) {
        console.log(err)
      }

      navigationTab.navigate("myads");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível editar o anúncio. Tente novamente mais tarde!";
  
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <VStack bg="blue.700" justifyContent="center" alignItems="center" h="32">
        <Text mt="8" fontSize="md" fontFamily="heading" color="gray.700">Pré visualização do anúncio</Text>
        <Text mt="1" fontSize="sm" color="gray.700">É assim que seu produto vai aparecer!</Text>
      </VStack>

      <CarouselComponent images={images} />

      <ScrollView>
        <VStack flex={1} mx="6" alignItems="flex-start" mb="5">
          <HStack alignItems="center">
            <Avatar 
              source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }} 
              size={8} 
              borderWidthsize={2} 
              alt={user.name}
              mr="2"
            />

            <Text fontSize="md" color="gray.100">{user.name}</Text>
          </HStack>

          <Box bg="gray.500" rounded="full" px="2.5" alignItems="center" mt="6">
            <Text color="gray.200" fontFamily="heading" fontSize="xs">
              {isNew ? "NOVO" : "USADO"}
            </Text> 
          </Box>

          <HStack w="full" mt="3" mb="5">
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
        </VStack>
        </ScrollView>

        <HStack bg={colors.gray[700]} py="5" px="6">
          <Button 
            title="Voltar e editar" 
            variant="secondary" 
            w="175" 
            onPress={handleGoBack} 
            leftIcon={<ArrowLeft size={16} color={colors.gray[100]} style={{ marginTop: 2 }} />} 
          />

        {id ? (
          <Button 
            title="Salvar alterações" 
            variant="primary" 
            w="175" ml="3" 
            onPress={handleSubmit(handleSaveChanges)} leftIcon={<Tag size={16} color={colors.gray[600]} />}
          />
        ): (
          <Button 
            title="Publicar" 
            variant="primary" 
            w="175" ml="3" 
            onPress={handleSubmit(handlePublishAd)} leftIcon={<Tag size={16} color={colors.gray[600]} />}
          />
        )}
      </HStack>
    </VStack>
  )
}

