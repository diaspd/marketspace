import { TouchableOpacity } from "react-native";
import { Box, Heading, HStack, ScrollView, Text, useTheme, VStack } from "native-base";

import { useNavigation } from "@react-navigation/native";
import type { AppNavigatorRoutesProps } from "@routes/app.routes";

import TagSvg from '@assets/icons/tag.svg';

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { HomeHeader } from "@components/HomeHeader";
import { Input } from "@components/Input";
import { Card } from "@components/Card";

export function Home() {
  const { colors } = useTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoToMyAds() {
    navigation.navigate('myads')
  }

  return (
    <ScrollView flex={1}>
       <HomeHeader />

        <Box mx="6" mt="8">
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
              <Heading color="gray.200">4</Heading>
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
            <HStack justifyContent="space-between" alignItems="center" mr="4" w={"16"}>
              <TouchableOpacity>
                <Feather name="search" size={20} color={colors.gray[200]} />
              </TouchableOpacity>

              <Box h="4" bg="gray.400" w="0.5"/>

              <TouchableOpacity>
                <Feather name="sliders" size={20} color={colors.gray[200]} />
              </TouchableOpacity>
            </HStack>
            }  
          />

          <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between" mt="2 ">
            {Array.from({ length: 4}).map((_, i) => {
              return ( <Card key={i} hasAvatar />)
            })}
          </Box>
        </Box>
    </ScrollView>
  )
}