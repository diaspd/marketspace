import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";

import { Text, Box, Heading, VStack, HStack } from "native-base";

export function HomeHeader() {
  return (
    <Box px="6" mt="16">
    <HStack>
      <Avatar size={45} alt="" borderWidthsize={2} source={{ uri: 'https://github.com/diaspd.png' }}/>

      <VStack ml="2" mt="0.5">
        <Text fontSize="sm">Boas vindas,</Text>
        <Heading fontSize="sm">Pedro!</Heading>
      </VStack>

      <Box ml="auto">
        <Button 
          title="Criar anúncio" 
          variant="terciary"
          size="140"
        />
      </Box>
    </HStack>
  </Box>
  )
}