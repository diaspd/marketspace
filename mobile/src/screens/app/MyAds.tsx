import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Heading, HStack, FlatList, Text, useTheme, Menu, VStack, useToast } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Card } from "@components/Card";
import type { ProductDTO } from "@dtos/ProductDTO";
import type { AppNavigatorRoutesProps } from "@routes/app.routes";

export function MyAds() {
  const [isLoading, setIsLoading] = useState(true);
  const [myProduct, setMyProduct] = useState<ProductDTO[]>([]);
  const [selectText, setSelectText] = useState('Todos');
  const [adType, setAdType] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { colors } = useTheme();
  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const filter = adType === "active" ? true : false;

  const productsFiltered = myProduct.filter((product) => {
    if (adType === "all") {
      return true;
    }
    return product.is_active === filter;
  });

  function handleGoToCreateAd() {
    navigation.navigate('createad');
  }

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const response = await api.get('/users/products');
          setMyProduct(response.data);
        } catch (error) {
          const isAppError = error instanceof AppError;
          const title = isAppError
            ? error.message
            : "Não foi possível receber seus anúncios. Tente Novamente!";

          toast.show({
            title,
            placement: "top",
            bgColor: "red.500",
          });
        } finally {
          setIsLoading(false);
        }
      };

      loadData();
    }, [])
  );

  return (
    <VStack flex={1}>
      <Box mx="6" mt="16" flex={1}>
        <HStack alignItems="center" mb="10">
          <Heading color="gray.100" fontSize="lg" ml="auto">Meus anúncios</Heading>
          <Box ml="auto">
            <TouchableOpacity onPress={handleGoToCreateAd}>
              <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
          </Box>
        </HStack>

        <Box mb="5" display="flex" alignItems="baseline" justifyContent="space-between" flexDirection="row">
          <Text>{myProduct.length} anúncios</Text>
          <Menu
            w="32"
            placement="bottom right"
            shouldOverlapWithTrigger={false}
            mt="8"
            onOpen={() => setIsDropdownOpen(true)}
            onClose={() => setIsDropdownOpen(false)}
            trigger={triggerProps => {
              return (
                <HStack w="32" borderWidth={2} rounded="md" borderColor={colors.gray[500]}>
                  <TouchableOpacity accessibilityLabel="More options menu" {...triggerProps}>
                    <HStack display="flex" justifyContent="space-between" w="full" px="3" py="2">
                      <Text>{selectText}</Text>
                      {isDropdownOpen ? (
                        <Entypo name="chevron-small-down" style={{ transform: [{ rotate: '180deg' }] }} size={24} color={colors.gray[300]} />
                      ) : (
                        <Entypo name="chevron-small-down" size={24} color={colors.gray[300]} />
                      )}
                    </HStack>
                  </TouchableOpacity>
                </HStack>
              )
            }}
          >
            <Menu.Item onPress={() => { setSelectText('Todos'); setAdType('all'); }}><Text>Todos</Text></Menu.Item>
            <Menu.Item onPress={() => { setSelectText('Ativos'); setAdType('active'); }}><Text>Ativos</Text></Menu.Item>
            <Menu.Item onPress={() => { setSelectText('Inativos'); setAdType('inactive'); }}><Text>Inativos</Text></Menu.Item>
          </Menu>
        </Box>

        <FlatList
          data={productsFiltered}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <Card
              title={item.name}
              image={`${api.defaults.baseURL}/images/${item.product_images[0].path}`}
              active={item.is_active}
              used={!item.is_new}
              price={item.price.toString()}
              id={item.id}
            />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </VStack>
  )
}