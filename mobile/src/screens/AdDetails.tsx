import { TouchableOpacity, Dimensions } from "react-native";
import { Box, Heading, HStack, Text, VStack, Image } from "native-base";

import { AntDesign } from '@expo/vector-icons';

import { CarouselComponent }  from '@components/Carousel'

export function AdDetails() {
  return (
    <VStack flex={1}>
        <Box mx="6" mt="16" flex={1}>
          <HStack justifyContent="start" alignItems="center" mb="10">
            <TouchableOpacity>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
          </HStack>

          <CarouselComponent />

          <VStack>
          </VStack>
        </Box>
    </VStack>
  )
}