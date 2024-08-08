import { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";

import { Box, Heading, HStack, ScrollView, Text, useTheme, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { ArrowLeft, PencilLine } from 'phosphor-react-native';

import { CarouselComponent }  from '@components/Carousel'
import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import type { AppNavigatorRoutesProps } from "@routes/app.routes";

export function AdPreview() {
  const isNew = false 
  const [isAdDisabled, setIsAdDisabled] = useState(false)

  const { colors } = useTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoToEditAd() {
    navigation.navigate('editad')
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

            <Text fontSize="md" color="gray.100">Pedro Dias</Text>
          </HStack>

          <Box bg="gray.500" rounded="full" px="2.5" alignItems="center" mt="6">
            <Text color="gray.200" fontFamily="heading" fontSize="xs">
              {isNew ? "NOVO" : "USADO"}
            </Text> 
          </Box>

          <HStack w="full" mt="3">
            <Heading numberOfLines={1} maxW={240} fontSize="lg" color="gray.100">Luminária pendente</Heading>

            <Box ml="auto">
              <Heading fontSize="lg" color="blue.700">
                <Text fontSize="sm">
                  R${' '}
                </Text>
                45,00
              </Heading>
            </Box>
          </HStack>

          <Text fontSize="sm" color="gray.200" mt="2" numberOfLines={4}>
            Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna mattis cursus. lorem 
          </Text>

          <HStack w="full" mt="3" alignItems="baseline">
            <Heading fontSize="sm" color="gray.200">Aceita troca?</Heading>

            <Text fontSize="sm" ml="1">
              Não
            </Text>
          </HStack>

          <VStack w="full" mt="4" mb="8">
            <Heading fontSize="sm" color="gray.200">Meios de pagamento:</Heading>

            <HStack alignItems="center" mt="2">
              <MaterialCommunityIcons name="barcode-scan" size={16} color={colors.gray[200]}/>
              <Text fontSize="sm" ml="2" color="gray.200">
                Boleto
              </Text>
            </HStack>

            <HStack alignItems="center" mt="1">
              <MaterialCommunityIcons name="qrcode" size={16} color={colors.gray[200]}/>
              <Text fontSize="sm" ml="2" color="gray.200">
                Pix
              </Text>
            </HStack>

            <HStack alignItems="center" mt="1">
              <MaterialCommunityIcons name="bank" size={16} color={colors.gray[200]} />
              <Text fontSize="sm" ml="2" color="gray.200">
                Depósito Bancário
              </Text>
            </HStack>
          </VStack>

      </VStack>
      </ScrollView>
    </VStack>
  )
}