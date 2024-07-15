import { Center, Heading, ScrollView, Text } from "native-base";

import LogoSvg from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";

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
        
        <Input 
          placeholder="E-mail" 
          keyboardType="email-address"
        />

        <Input 
          placeholder="Senha" 
          secureTextEntry
        />

        <Button title="Entrar" mt="4 "/>

        <Text color="gray.300" mt="32" fontSize="sm">Ainda não tem acesso?</Text>
        <Button title="Criar uma conta" mt="3" variant="secondary"/>
      </Center>
    </ScrollView>
  )
}