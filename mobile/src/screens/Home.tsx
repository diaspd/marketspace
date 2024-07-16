import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import { Center, Text, Box, Flex, Heading, VStack } from "native-base";

export function Home() {
  return (
    <Box px="6" mt="16">
      <Flex flexDirection="row">
        <Avatar size={45} alt="" borderWidthsize={2} />

        <VStack flex={1} ml="2" mt="0.5">
          <Text fontSize="sm">Boas vindas,</Text>
          <Heading fontSize="sm">Maria!</Heading>
        </VStack>

        <Box>
          <Button 
            title="Criar anúncio" 
            variant="terciary"
          />
        </Box>
      </Flex>
    </Box>
  )
}