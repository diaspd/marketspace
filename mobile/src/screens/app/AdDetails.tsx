import { useCallback, useEffect, useState } from "react";
import { Linking, TouchableOpacity } from "react-native";

import { Box, Heading, HStack, ScrollView, Skeleton, Text, useTheme, useToast, VStack } from "native-base";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";

import Feather from '@expo/vector-icons/Feather';
import { ArrowLeft, PencilLine, WhatsappLogo } from 'phosphor-react-native';

import type { AppNavigatorRoutesProps } from "@routes/app.routes";

import type { ProductDTO } from "@dtos/ProductDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { paymentMethodFormatter } from "@utils/paymentMethodFormatter";

import { useAuth } from "@hooks/useAuth";
import { usePriceFormatter } from "@hooks/usePriceFormatter";

import { CarouselComponent } from '@components/Carousel';
import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";

type RouteParams = {
  id: string;
};

export function AdDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);
  const [isProductMine, setIsProductMine] = useState<boolean>(false);
  const [isAdDisabled, setIsAdDisabled] = useState(false);
  
  const { colors } = useTheme();
  const { user } = useAuth();
  
  const route = useRoute();
  const toast = useToast();
  
  const { id } = route.params as RouteParams;
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  
  const { formatPrice } = usePriceFormatter()
  
  const formattedPrice = product.price !== undefined ? formatPrice(product.price) : "N/A";

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          setIsLoading(true)
          const productData = await api.get(`/products/${id}`);
          const userProductData = await api.get('/users/products');
          
          setProduct(productData.data);

          if (userProductData.data[0].user_id === productData.data.user_id) {
            setIsProductMine(true)
          } else {
            setIsProductMine(false)
          }

          setIsAdDisabled(!productData.data.is_active);
        } catch (error) {
          const isAppError = error instanceof AppError;
          const title = isAppError
            ? error.message
            : "Não foi possível receber os dados do anúncio. Tente novamente!";

          toast.show({
            title,
            placement: "top",
            bgColor: "red.500",
          });
        } finally {
          setIsLoading(false)
        }
      };

      loadData();
  }, [id])
  )

  const handleGoToEditAd = () => navigation.navigate('editad', {
    title: product.name,
    description: product.description,
    price: product.price.toString(),
    images: product.product_images,
    paymentMethod: Array.isArray(product.payment_methods) ? 
    product.payment_methods.map((item) => item.key)
    : [],
    isNew: product.is_new,
    acceptTrade: product.accept_trade,
    id: product.id,
  });

  async function handleGoBack() {
    if (isProductMine) {
      navigation.navigate('myads') 
    } else {
      navigation.navigate('home')
    }
  }

  async function handleSwitchAdAvailabilityToAvailable() {
    try {
      await api.patch(`/products/${id}`, { is_active: true });
      setIsAdDisabled(false);
    } catch (error) {
      toast.show({
        title: "Não foi possível reativar o anúncio.",
        placement: "top",
        bgColor: "red.500",
      });
    }
  };

  async function handleSwitchAdAvailabilityToDisabled() {
    try {
      await api.patch(`/products/${id}`, { is_active: false });
      setIsAdDisabled(true);
    } catch (error) {
      toast.show({
        title: "Não foi possível desativar o anúncio.",
        placement: "top",
        bgColor: "red.500",
      });
    }
  };

  async function handleDeleteAd() {
    try {
      setIsLoading(true);
      await api.delete(`products/${id}`);

      navigation.navigate("myads");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível deletar seu produto. Tente Novamente!";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
    }
  };

  async function handleSendMessageOnWhatsapp() {
    try {
      await Linking.openURL
        (`whatsapp://send?text="Olá, vi seu anúncio no marketspace e fiquei interessado sobre o produto: ${product.name}"&phone=${user.tel}`);
    } catch {
      await Linking.openURL
        (`https://wa.me/${user.tel}?text="Olá, vi seu anúncio no marketspace e fiquei interessado sobre o produto: ${product.name}"`)
    }
  }

  return (
    <VStack flex={1}>
      {isLoading ? <Loading /> : (
        <>
        <HStack mx="6" mt="16" mb="4" justifyContent="space-between">
        <TouchableOpacity onPress={handleGoBack}>
          <ArrowLeft size={24} color={colors.gray[100]} />
        </TouchableOpacity>

        {isProductMine && (
         <TouchableOpacity onPress={handleGoToEditAd}>
          <PencilLine size={24} color={colors.gray[100]} />
         </TouchableOpacity>
        )}
      </HStack>

      {product.product_images ? (
         <CarouselComponent isAdDisabled={isAdDisabled} images={product.product_images} />
      ) : (
        <Skeleton 
          w="full"
          h="72"
          mb="5"
          startColor="gray.500"
          endColor="coolGray.300"
        />  
      )}

      <ScrollView>
        <VStack flex={1} mx="6" alignItems="flex-start" mb="5">
          <HStack alignItems="center">
            <Avatar 
              source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}`}}
              size={8} 
              borderWidthsize={2} 
              alt={user.name}
              mr="2"
            />

            <Text fontSize="md" color="gray.100">{user.name}</Text>
          </HStack>

          <Box bg="gray.500" rounded="full" px="2.5" alignItems="center" mt="6">
            <Text color="gray.200" fontFamily="heading" fontSize="xs">
              {product.is_new ? "NOVO" : "USADO"}
            </Text> 
          </Box>

          <HStack w="full" mt="3">
            <Heading numberOfLines={1} maxW={240} fontSize="lg" color="gray.100">{product.name}</Heading>

            <Box ml="auto">
              <Heading fontSize="lg" color="blue.700">
                <Text fontSize="sm">
                  R${' '}
                </Text>
                {formattedPrice}
              </Heading>
            </Box>
          </HStack>

          <Text fontSize="sm" color="gray.200" mt="2" numberOfLines={4}>
          {product.description}
          </Text>

          <HStack w="full" mt="3" alignItems="baseline">
            <Heading fontSize="sm" color="gray.200">Aceita troca?</Heading>

            <Text fontSize="sm" ml="1">
              {product.accept_trade ? 'Sim' : 'Não'}
            </Text>
          </HStack>

          <VStack w="full" mt="4" mb="8">
            <Heading fontSize="sm" color="gray.200" mb="2">Meios de pagamento:</Heading>

            {paymentMethodFormatter(Array.isArray(product.payment_methods) 
              ? product.payment_methods.map((item) => item.key)
              : []
            )} 
          </VStack>

          {isProductMine ? (
            <>
              {isAdDisabled ? (
                <Button 
                  title="Reativar anúncio" 
                  variant="primary" 
                  leftIcon={<Feather name="power" size={16} color={colors.gray[600]} />}
                  onPress={handleSwitchAdAvailabilityToAvailable} 
                />
              ) : (
                <Button 
                  title="Desativar anúncio" 
                  variant="terciary" 
                  leftIcon={<Feather name="power" size={16} color={colors.gray[600]} />}
                  onPress={handleSwitchAdAvailabilityToDisabled}  
                />
              )}
    
              <Button 
                title="Excluir anúncio" 
                variant="secondary" 
                mt="2" 
                leftIcon={<Feather name="trash" size={16} color={colors.gray[300]} />}
                onPress={handleDeleteAd}
                isLoading={isLoading}  
              />
            </>
          ): (
              <HStack alignItems="center" justifyContent="space-between" w="full">
                <Box>
                  <Heading fontSize="lg" color="blue.700">
                    <Text fontSize="sm">
                      R${' '}
                    </Text>
                    {formattedPrice}
                  </Heading>
                </Box>

                <Box>
                  <Button 
                    title="Entrar em contato" 
                    variant="primary" w="170" 
                    leftIcon={<WhatsappLogo size={16} color={colors.gray[700]} weight="fill"/>}
                    onPress={handleSendMessageOnWhatsapp}  
                  />
                </Box>
              </HStack>
          )}
      </VStack>
      </ScrollView>
      </>
      )}
    </VStack>
  )
}