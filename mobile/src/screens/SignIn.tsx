import { Center, Heading, ScrollView, Text } from "native-base";

import LogoSvg from '@assets/logo.svg'

export function SignIn() {
  return (
    <ScrollView flex={1}>
      <Center mt="24">
        <LogoSvg />

        <Heading mt="4" fontSize="2xl">marketspace</Heading>
        <Text color="gray.300" fontFamily="thin" fontSize="sm">Seu espaço de compra e venda</Text>

        <Text color="gray.200" mt="24" fontSize="sm">Acesse sua conta</Text>
      </Center>
    </ScrollView>
  )
}