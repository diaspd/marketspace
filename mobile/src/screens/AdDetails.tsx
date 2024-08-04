import { TouchableOpacity, Dimensions } from "react-native";
import { Box, Heading, HStack, Text, VStack, Image } from "native-base";

import { AntDesign } from '@expo/vector-icons';

import { CarouselComponent }  from '@components/Carousel'
import { Avatar } from "@components/Avatar";

export function AdDetails() {
  const isNew = false 
  const isAdDisabled = false

  return (
    <VStack flex={1}>
      <Box mx="6" mt="16" mb="4">
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      </Box>

      <CarouselComponent />

      <VStack mx="6" alignItems="flex-start" flex={1}>
        <HStack alignItems="center">
          <Avatar 
            source={{ uri: 'https://github.com/diaspd.png'}} 
            size={10} 
            borderWidthsize={2} 
            alt=""
            mr="2"
          />

          <Text fontSize="md" color="gray.100">Pedro Dias</Text>
        </HStack>

        <Box bg="gray.500" rounded="full" px="3" py="0.5" alignItems="center" mt="6">
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
          Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna mattis cursus. 
        </Text>
      </VStack>
    </VStack>
  )
}