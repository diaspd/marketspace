import { Box, HStack, Image, VStack, Text, Heading } from "native-base";
import { Avatar } from "@components/Avatar";

import ShoesImg from '@assets/shoes.png'

export function Card() {
  return (
    <VStack mb="6">
      <Box w='40' h="24">
        <Image 
          source={ShoesImg}
          alt=""
          resizeMode='stretch'
          position="absolute"
          rounded="md"
          w="full"
        />

        <HStack alignItems="flex-start" justifyContent="space-between" px="1" mt="1">
          <Avatar size={8} alt ="" borderWidthsize={2} source={{ uri: 'https://github.com/diaspd.png' }}/>

          <Box bg="gray.200" rounded="full" px="2" py="0.5" alignItems="center">
            <Text color="gray.600" fontFamily="heading" fontSize="sm">USADO</Text>
          </Box>
        </HStack>
      </Box>

      <Text mt="2" color="gray.200">Tênis vermelho</Text>
      <Text fontSize="sm" mt="0.5" color="gray.100">
        R$
        <Heading fontSize="lg">
          {' '}59,90
        </Heading>
      </Text> 
     
    </VStack>
  )
}