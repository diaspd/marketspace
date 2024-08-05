import { TouchableOpacity } from "react-native";
import { Box, Heading, HStack, Text, VStack } from "native-base";

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import type { AppNavigatorRoutesProps } from "@routes/app.routes";

export function CreateAd() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  return (
    <VStack flex={1}>
      <Box mx="6" mt="16" flex={1}>
        <HStack alignItems="center" mb="10">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>

          <Heading ml="24" color="gray.100" fontSize="lg" textAlign="center">Criar anúncio</Heading>
        </HStack>

      </Box>
    </VStack> 
  )
}