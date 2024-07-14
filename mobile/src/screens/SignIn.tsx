import { Center, Heading, ScrollView, Text } from "native-base";

import LogoSvg from '@assets/logo.svg'
import { Input } from "@components/Input";

export function SignIn() {
  return (
    <ScrollView flex={1}>
      <Center mt="24">
        <LogoSvg />

        <Heading mt="4" fontSize="2xl">marketspace</Heading>
        <Text color="gray.300" fontFamily="thin" fontSize="sm">Seu espaço de compra e venda</Text>
      </Center>

      <Center mt="24" mx="12">
        <Text color="gray.200"fontSize="sm" mb="4">Acesse sua conta</Text>
        <Input placeholder="E-mail"/>
        <Input 
          placeholder="Senha" 
          secureTextEntry
        />
      </Center>
    </ScrollView>
  )
}