import { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import * as y from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import { Center, Heading, ScrollView, Text, useTheme, useToast } from "native-base";
import { Entypo } from '@expo/vector-icons';

import LogoSvg from '@assets/logo.svg'

import { Input } from "@components/Input";
import { Button } from "@components/Button";

type FormDataProps = {
  email: string;
  password: string;
}

const signInSchema = y.object({
  email: y.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: y.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
})

import type { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  
  const toast = useToast();
  const theme = useTheme();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  });

  function handleGoToSignUp() {
    navigation.navigate('signUp')
  }

  async function handleSignIn({ email, password }: FormDataProps){
    try {
      setIsLoading(true)

      console.log(email, password);
    } catch (error) {
      console.log(error)
      
      setIsLoading(false)

      toast.show({
        title: 'Algo deu Errado tente novamente',
        placement: 'top',
        bgColor: 'red.500'
      });
    }
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

        <Controller 
          control={control}
          name='email'
          render={({ field: { onChange, value }}) => (
          <Input 
            placeholder="E-mail" 
            keyboardType="email-address"
            autoCapitalize='none'
            onChangeText={onChange}
            value={value}
            errorMessage={errors.email?.message}
          />
          )}
        />

        
        <Controller 
          control={control}
          name='password'
          render={({ field: { onChange, value }}) => (
          <Input 
            placeholder="Senha" 
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password?.message}
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
          )}
        />

        <Button 
          title="Entrar" 
          mt="4" 
          onPress={handleSubmit(handleSignIn)} 
          isLoading={isLoading}  
        />

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