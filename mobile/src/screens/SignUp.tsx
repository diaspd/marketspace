import { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { Center, Heading, ScrollView, Text, useTheme, Image } from "native-base";
import { Entypo } from '@expo/vector-icons';

import LogoSvg from '@assets/logo.svg'
import defaultUserAvatarImg from '@assets/avatar-fallback.png'; 
import avatarButtonImg from '@assets/avatar-button.png'; 

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Avatar } from "@components/Avatar";

import type { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const theme = useTheme();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();


  function handleGoToSignIn() {
    navigation.navigate('signIn')
  }

  return (
    <ScrollView flex={1}>
      <Center mt="16">
        <LogoSvg width={60} height={40}/>

        <Heading mt="4" fontSize="lg">Boas vindas!</Heading>
        <Text color="gray.300" fontFamily="thin" fontSize="sm" mt="2" textAlign="center" width="72">
          Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
        </Text>
      </Center> 
      <Center mt="12" mx="12">
        <Center mb="4">
          <Avatar 
            size={88} 
            source={defaultUserAvatarImg} 
            borderWidthsize={3} 
            alt="Foto do usuário" 
          />
          <Image source={avatarButtonImg} mt="-8" mr="-12" alt="" />
        </Center>

        <Input placeholder="Nome" />
        
        <Input 
          placeholder="E-mail" 
          keyboardType="email-address"
        />

        <Input 
          placeholder="Telefone" 
          keyboardType="number-pad"
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

        <Input 
          placeholder="Confirmar senha" 
          type={showConfirmPassword ? "text" : "password"}
          InputRightElement={
            showConfirmPassword ? (
              <Center mr="2">
                <Entypo 
                  name="eye" 
                  size={24} 
                  color={theme.colors.gray[300]}
                  onPress={() => setShowConfirmPassword(false)}
                />
              </Center>
              ) : (
              <Center mr="2">
                <Entypo 
                  name="eye-with-line" 
                  size={24} 
                  color={theme.colors.gray[300]}
                  onPress={() => setShowConfirmPassword(true)}
                  mr="2"
                />
              </Center>
            )
          }
        />

        <Button 
          title="Criar" 
          mt="4" 
          variant="terciary" 
        />

        <Text color="gray.300" mt="12" fontSize="sm">Já tem uma conta?</Text>
        <Button 
          title="Ir para o login" 
          variant="secondary" 
          mt="3" 
          onPress={handleGoToSignIn}
        />
      </Center>
    </ScrollView>
  )
}