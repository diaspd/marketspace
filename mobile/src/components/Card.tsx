import { Box, HStack, Image, Text, Heading, Pressable } from "native-base";
import { Avatar } from "@components/Avatar";

import ShoesImg from '@assets/shoes.png'
import { useNavigation } from "@react-navigation/native";
import type { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Card({data = 'string', hasAvatar = false}) {
  const isNew = false 
  const isAdDisabled = false

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoToAdDetails() {
    navigation.navigate('addetails')
  }

  return (
    <>
    <Pressable mb="6" onPress={handleGoToAdDetails}> 
      <Box w={170} h="24" opacity={isAdDisabled ? '75' : '100'}>
        <Image 
          source={ShoesImg}
          alt=""
          resizeMode='stretch'
          position="absolute"
          rounded="md"
          w="full"
          backgroundColor={isAdDisabled ? 'gray.100': 'gray.500'}
        />

        <HStack alignItems="flex-start" justifyContent="space-between" px="1" mt="1">
          {hasAvatar && (
            <Avatar 
              source={{ uri: 'https://github.com/diaspd.png' }}
              size={8} 
              borderWidthsize={2} 
              borderColor="gray.700"
              alt="" 
            />
          )}

          <Box bg={isNew ? "blue.500" : "gray.200"} rounded="full" px="2" py="0.5" alignItems="center" ml="auto">
            <Text color="gray.600" fontFamily="heading" fontSize="xs">
              {isNew ? "NOVO" : "USADO"}
            </Text>
          </Box>
        </HStack>

        
        {isAdDisabled && (
          <Text mt="auto" color="gray.700" fontWeight="bold" fontSize="xs" px="2">ANÚNCIO DESATIVADO</Text>
        )}
      </Box>

      <Text mt="2" maxW={166} noOfLines={1} color={isAdDisabled ? "gray.400" : "gray.200"}>{data}</Text>
      <Text fontSize="sm" mt="0.5" color={isAdDisabled ? "gray.400" : "gray.100"} maxW={166} noOfLines={1}>
        R$
        <Heading fontSize="lg" color={isAdDisabled ? "gray.400" : "gray.100"}>
          {' '}59,90 
        </Heading>
      </Text> 
    </Pressable>
    </>
  )
}