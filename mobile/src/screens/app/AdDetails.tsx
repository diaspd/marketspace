import { useState } from "react";
import { TouchableOpacity } from "react-native";

import { Box, Heading, HStack, ScrollView, Text, useTheme, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { ArrowLeft, PencilLine, WhatsappLogo } from 'phosphor-react-native';

import { CarouselComponent }  from '@components/Carousel'
import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import type { AppNavigatorRoutesProps } from "@routes/app.routes";

export function AdDetails() {
  const isNew = false 
  const [isAdDisabled, setIsAdDisabled] = useState(false)

  const isAdMine = false

  const { colors } = useTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoToEditAd() {
    navigation.navigate('editad')
  }

  function handleSwitchAdAvailabilityToAvailable() {
    setIsAdDisabled(false)
  }

  function handleSwitchAdAvailabilityToDisabled() {
    setIsAdDisabled(true)
  }

  return (
    <VStack flex={1}>
      <HStack mx="6" mt="16" mb="4" justifyContent="space-between">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.gray[100]} />
        </TouchableOpacity>

        {isAdMine && (
         <TouchableOpacity onPress={handleGoToEditAd}>
          <PencilLine size={24} color={colors.gray[100]} />
         </TouchableOpacity>
        )}
      </HStack>

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

          {isAdMine ? (
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
    
              <Button title="Excluir anúncio" variant="secondary" mt="2" leftIcon={<Feather name="trash" size={16} color={colors.gray[300]} />}/>
            </>
          ): (
              <HStack alignItems="center" justifyContent="space-between" w="full">
                <Box>
                  <Heading fontSize="lg" color="blue.700">
                    <Text fontSize="sm">
                      R${' '}
                    </Text>
                    120,00
                  </Heading>
                </Box>

                <Box>
                  <Button title="Entrar em contato" variant="primary" w="170" leftIcon={<WhatsappLogo size={16} color={colors.gray[700]} weight="fill"/>}/>
                </Box>
              </HStack>
          )}

  
      </VStack>
      </ScrollView>
    </VStack>
  )
}