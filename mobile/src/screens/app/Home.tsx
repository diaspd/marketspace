import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Heading, HStack, Text, useTheme, VStack, Actionsheet, useDisclose, Checkbox, Switch, FlatList, useToast, Skeleton, ScrollView, Pressable, Radio } from "native-base";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { AppNavigatorRoutesProps } from "@routes/app.routes";

import { useForm } from "react-hook-form";

import TagSvg from '@assets/icons/tag.svg';

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import type { ProductDTO } from "@dtos/ProductDTO";

import { HomeHeader } from "@components/HomeHeader";
import { Input } from "@components/Input";
import { Card } from "@components/Card";
import { Button } from "@components/Button";
import { EmptyList } from "@components/EmptyList";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNew, setIsNew] = useState(true);
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<string[]>([
    "pix",
    "boleto",
    "cash",
    "deposit",
    "card",
  ]);
  const [product, setProduct] = useState<ProductDTO[]>([]);
  const [availableAds, setAvailableAds] = useState(0);
  
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  const {
    handleSubmit,
  } = useForm();

  const { colors } = useTheme();
  const toast = useToast();
  
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoToMyAds() {
    navigation.navigate('myads')
  }

  async function handleApllyFilters(search: any) {
    try {
      let paymentMethodsQuery = "";

      paymentMethods.forEach((item) => {
        paymentMethodsQuery = paymentMethodsQuery + `&payment_methods=${item}`;
      });

      setIsLoading(true);
      const productsData = await api.get(
        `/products/?is_new=${isNew}&accept_trade=${acceptTrade}${paymentMethodsQuery}${
          search.length > 0 && `&query=${search}`
        }`
      );

      if (productsData.data == 0) {
        toast.show({
          title: 'Não foi encontrado nenhum produto com essas especificações.',
          _title: { textAlign: 'center'},
          placement: "top",
          bgColor: "yellow.500",
        });
      }

      setProduct(productsData.data);
      onClose()
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível filtrar os produtos. Tente Novamente!";

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

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      const loadData = async () => {
        try {
          const fetchProducts = await api.get(`/products`);
          const myProductsData = await api.get(`/users/products`);

          setProduct(fetchProducts.data);
          setAvailableAds(myProductsData.data.length);
        } catch (error) {
          const isAppError = error instanceof AppError;
          const title = isAppError
            ? error.message
            : "Não foi possível encontrar seus anúncios, tente novamente mais tarde!";

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
      };

      loadData();
    }, [])
  );

  return (
    <VStack  flex={1}>
       <HomeHeader />

        <Box mx="6" mt="8" flex={1}>
        <Text color="gray.300">Seus produtos anunciados para venda</Text>

          <HStack 
            mt="3" 
            justifyContent="space-between" 
            bg="rgba(100, 122, 199, 0.1)" 
            rounded="md" 
            py={3} 
            px={5} 
            alignItems="center"
          >
          <HStack alignItems="center">
            <TagSvg fill={colors.blue[500]} width={24} height={24} />

            <VStack ml="4">
              <Heading color="gray.200">{availableAds}</Heading>
              <Text color="gray.200" fontSize="sm">anúncios ativos</Text>
            </VStack>       
          </HStack>

          <TouchableOpacity onPress={handleGoToMyAds}> 
            <HStack alignItems="center">
              <Text color={colors.blue[500]} mr="2" fontFamily="heading">
                Meus anúncios
              </Text>

              <AntDesign name="arrowright" size={16} color={colors.blue[500]} mt="1" />  
            </HStack>
          </TouchableOpacity>
          </HStack>
          
          <Text color="gray.300" mt="8">Compre produtos variados</Text>

          <Input 
            placeholder="Buscar anúncio" 
            mt="12" 
            rightElement={
            <HStack justifyContent="space-between" alignItems="center" mr="4" w="16">
              <TouchableOpacity>
                <Feather name="search" size={20} color={colors.gray[200]} />
              </TouchableOpacity>

              <Box h="4" bg="gray.400" w="0.5"/>
              
              <TouchableOpacity onPress={onOpen}>
                <Feather name="sliders" size={20} color={colors.gray[200]} />
              </TouchableOpacity>

              <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content _dragIndicator={{ backgroundColor: 'gray.500' }} px="6" pb="8">
                  <HStack w="100%" my="7" justifyContent="space-between" alignItems="center">
                    <Heading fontSize="lg" color="gray.100">
                      Filtrar anúncios
                    </Heading>

                    <TouchableOpacity onPress={onClose}>
                      <Feather name="x" size={20} color={colors.gray[400]} />
                    </TouchableOpacity>  
                  </HStack>

                  <VStack alignItems="start" w="full" mb="3">
                    <Text fontWeight="bold" color="gray.200" mb="3">Condição</Text>

                    <Radio.Group
                      name="productCondition"
                      value={isNew ? "new" : "used"}
                      onChange={(nextValue) => {
                        setIsNew(nextValue === "new" ? true : false);
                      }}
                    >              
                      <HStack mr="auto">
                        <Pressable onPress={() => setIsNew(true)}>
                          <Box flexDir="row" bg={isNew ? "blue.700" : "gray.500"} rounded="full" px="2" py="2" alignItems="center" ml="auto" mr="2">
                            <Text color={isNew ? "gray.700" : "gray.300"} fontFamily="heading" fontSize="xs" mr="2" ml="2">
                              NOVO 
                            </Text>

                            {isNew && (
                              <Octicons name="x-circle-fill" size={14} color="white" onPress={() => setIsNew(false)}/>
                            )}
                          </Box>
                        </Pressable>

                        <Pressable onPress={() => setIsNew(false)}>
                          <Box flexDir="row" bg={!isNew ? "blue.700" : "gray.500"} rounded="full" px="1.5" py="2" alignItems="center" ml="auto">
                            <Text color={!isNew ? "gray.700" : "gray.300"} fontFamily="heading" fontSize="xs" mr="2" ml="2">
                              USADO
                            </Text>

                            {!isNew && (
                              <Octicons name="x-circle-fill" size={14} color="white" onPress={() => setIsNew(true)}/>
                            )}
                          </Box>
                        </Pressable>
                      </HStack>
                    </Radio.Group>
                  </VStack>

                  <VStack alignItems="start" w="full" mb="3">
                    <Text fontWeight="bold" color="gray.200">Aceita troca?</Text>

                    <Box bg={acceptTrade ? "blue.700" : "gray.500"} w="42" h="22" mt="3" rounded="full" alignItems="center" justifyContent="center">
                      <Switch 
                        isChecked={acceptTrade}
                        onToggle={(value) => setAcceptTrade(value)}
                        value={acceptTrade}
                        ml="-1"
                        mr="auto"
                        offTrackColor="transparent" onTrackColor="transparent" onThumbColor="gray.700" 
                      />
                    </Box>
                  </VStack>

                  <VStack alignItems="start" w="full">
                    <Text fontWeight="bold" color="gray.200" mb="3">Meios de pagamento aceitos</Text>

                    {[
                      { value: "boleto", label: "Boleto" },
                      { value: "pix", label: "Pix" },
                      { value: "cash", label: "Dinheiro" },
                      { value: "card", label: "Cartão de Crédito" },
                      { value: "deposit", label: "Depósito Bancário" }
                    ].map((method) => (
                      <Checkbox
                        key={method.value}
                        value={method.value}
                        isChecked={paymentMethods.includes(method.value)}
                        onChange={() => {
                          if (paymentMethods.includes(method.value)) {
                            setPaymentMethods((prev) => prev.filter((item) => item !== method.value));
                          } else {
                            setPaymentMethods((prev) => [...prev, method.value]);
                          }
                        }}
                        _checked={{ backgroundColor: 'blue.700', borderColor: 'blue.700' }}
                        _text={{ color: 'gray.200' }}
                      >
                        {method.label} 
                      </Checkbox>
                    ))}
                  </VStack>

                  <HStack justifyContent="space-between" w="full" mt="16" space={3}>
                    <Button title="Resetar filtros" variant="secondary" size="176" />
                    <Button 
                      title="Aplicar filtros" 
                      variant="terciary" 
                      size="176" 
                      onPress={handleSubmit(handleApllyFilters)}
                    />
                  </HStack>
                </Actionsheet.Content>
              </Actionsheet>
            </HStack>
            }  
          />

          {isLoading ? (
            <Box 
              flex={1} 
              mt="5"
              display="flex"
              flexDir="row"
              flexWrap="wrap"
              justifyContent="space-between"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton 
                  key={i}
                  w="48%"
                  h="24"
                  rounded="md"
                  mb="2"
                  startColor="gray.500"
                  endColor="coolGray.300"
                />
              ))}
            </Box>
          ) : (
            <FlatList 
              data={product}
              keyExtractor={(item) => item.id}
              columnWrapperStyle={{ flex: 1, justifyContent: 'space-between'}}
              renderItem={({item}) => (
                <Card 
                  title={item.name}
                  image={`${api.defaults.baseURL}/images/${item.product_images[0].path}`}
                  active={item.is_active}
                  used={!item.is_new}
                  price={item.price.toString()}
                  id={item.id}
                  profileImage={`${api.defaults.baseURL}/images/${item.user?.avatar}`} 
                />
              )}
              numColumns={2}
              mt="5"
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <EmptyList description="Ainda não foi cadastrado nenhum produto." hasIcon iconName="warehouse" />
              }
            />
          )}

         
        </Box>
    </VStack>
  )
}