import { Box, Heading, HStack, Link, ScrollView, Text, useTheme, VStack } from "native-base";

import TagSvg from '@assets/icons/tag.svg';

import { HomeHeader } from "@components/HomeHeader";
import { TouchableOpacity } from "react-native";

import { AntDesign } from '@expo/vector-icons';

export function Home() {
  const { colors, opacity } = useTheme();

  return (
    <ScrollView flex={1}>
       <HomeHeader />

      <Box mx="6" mt="8">
       <Text color="gray.300">Seus produtos anunciados para venda</Text>

       <HStack mt="2" justifyContent="space-between" bg="rgba(100, 122, 199, 0.1)" rounded="md" py={3} px={5} alignItems="center">
          <HStack alignItems="center">
            <TagSvg fill={colors.blue[500]} width={24} height={24} />

            <VStack ml="4">
              <Heading color="gray.200">4</Heading>
              <Text color="gray.200" fontSize="sm">anúncios ativos</Text>
            </VStack> 
          </HStack>

          <TouchableOpacity> 
            <HStack alignItems="center">
              <Text color={colors.blue[500]} mr="2" fontFamily="heading">
                Meus anúncios
              </Text>

              <AntDesign name="arrowright" size={16} color={colors.blue[500]} mt="1"/>  
            </HStack>
          </TouchableOpacity>
       </HStack>
      </Box>
    </ScrollView>
  )
}