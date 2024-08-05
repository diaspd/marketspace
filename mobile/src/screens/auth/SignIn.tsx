import { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { Center, Heading, ScrollView, Text, useTheme } from "native-base";
import { Entypo } from '@expo/vector-icons';

import LogoSvg from '@assets/logo.svg'

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import type { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  
  const theme = useTheme();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();


  function handleGoToSignUp() {
    navigation.navigate('signUp')
  }

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
          type={showPassword ? "text" : "password"}
          InputRightElement={
            showPassword ? (
              <Center mr="2">
                <Entypo 
                  name="eye" 
                  size={24} 
                  color={theme.colors.gray[300]}
                  onPress={() => setShowPassword(false)}
                />
              </Center>
              ) : (
              <Center mr="2">
                <Entypo 
                  name="eye-with-line" 
                  size={24} 
                  color={theme.colors.gray[300]}
                  onPress={() => setShowPassword(true)}
                  mr="2"
                />
              </Center>
            )
          }
        />

        <Button title="Entrar" mt="4" />

        <Text color="gray.300" mt="32" fontSize="sm">Ainda não tem acesso?</Text>
        <Button 
          title="Criar uma conta" 
          variant="secondary"
          mt="3" 
          onPress={handleGoToSignUp}
        />
      </Center>
    </ScrollView>
  )
}