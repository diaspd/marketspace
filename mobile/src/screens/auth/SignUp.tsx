import { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'

import { Center, Heading, ScrollView, Text, useTheme, Image, useToast } from "native-base";
import { Entypo } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import LogoSvg from '@assets/logo.svg'
import defaultUserAvatarImg from '@assets/avatar-fallback.png'; 
import avatarButtonImg from '@assets/avatar-button.png'; 

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Avatar } from "@components/Avatar";

import type { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { api } from "@services/api";
import { TouchableOpacity } from "react-native";
import { AppError } from "@utils/AppError";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

type FormDataProps = {
  name: string;
  email: string;
  tel: string;
  password: string;
  password_confirm: string;
}

const signUpSchema = y.object({
  name: y.string().required('Informe o nome.'),
  email: y.string().required('Informe o e-mail.').email('E-mail inválido.'),
  tel: y.string().required().matches(phoneRegExp, 'Número de telefone inválido.'),
  password: y.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  password_confirm: y.string().required('Confirme a senha.').oneOf([y.ref('password')], 'A confirmação da senha não confere.')
})

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const theme = useTheme();
  const toast = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  const navigation = useNavigation<AuthNavigatorRoutesProps>();


  function handleGoToSignIn() {
    navigation.navigate('signIn')
  }

  async function handleSignUp({ name, email, password, tel }: FormDataProps) {
    try {
      setIsLoading(true)

      const response = await api.post('/users', { name, email, password, tel, userPhoto});

      console.log(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde';

      toast.show({
        title: title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUserPhotoSelected(){
    setIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      });
  
      if (photoSelected.canceled) {
        return;
      }
  
      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
        
        if(photoInfo.exists && (photoInfo.size  / 1024 / 1024 ) > 5){
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
            placement: 'top',
            bgColor: 'red.500',
            mt: 4
          })
        }

        setUserPhoto(photoSelected.assets[0].uri)

        return toast.show({
          title: 'Imagem atualizada com sucesso.',
          placement: 'top',
          bgColor: 'green.500',
          mt: 4
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
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

      <Center mt="12" mx="12" mb="12">
        <Center mb="4">
          <TouchableOpacity onPress={handleUserPhotoSelected}>
            <Avatar 
              source={
                userPhoto  
                ? { uri: userPhoto } 
                : defaultUserAvatarImg
              }
              borderWidthsize={3} 
              alt="Foto do usuário"
              size={88}
            />    
          </TouchableOpacity>
  
          <Image source={avatarButtonImg} mt="-8" mr="-12" alt="" />
        </Center>

        <Controller 
          control={control}
          name='name'
          render={({ field: { onChange, value }}) => (
           <Input 
             placeholder='Nome'
             onChangeText={onChange}
             value={value}
             errorMessage={errors.name?.message}
           />
          )}
        />

        <Controller 
          control={control}
          name='email'
          render={({ field: { onChange, value }}) => (
            <Input 
              placeholder='E-mail'
              keyboardType='email-address'
              autoCapitalize='none'
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller 
          control={control}
          name='tel'
          render={({ field: { onChange, value }}) => (
           <Input 
            placeholder="Telefone" 
            keyboardType="number-pad"
            onChangeText={onChange}
            value={value}
            errorMessage={errors.tel?.message}
          />
          )}
        />

        <Controller 
          control={control}
          name='password'
          render={({ field: { onChange, value }}) => (
            <Input 
              placeholder='Senha'
              type={showPassword ? "text" : "password"}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
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

        <Controller 
          control={control}
          name='password_confirm'
          render={({ field: { onChange, value }}) => (
            <Input 
              placeholder='Confirmar a senha'
              type={showConfirmPassword ? "text" : "password"}
              onChangeText={onChange}
              value={value}
              onSubmitEditing={handleSubmit(handleSignUp)}
              returnKeyType='send'
              errorMessage={errors.password_confirm?.message}
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
          )}
        />

        <Button 
          title="Criar" 
          mt="4" 
          variant="terciary" 
          onPress={handleSubmit(handleSignUp)}  
          disabled={isLoading}
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