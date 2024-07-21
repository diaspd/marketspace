import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Heading, HStack, ScrollView, Text, useTheme, VStack, Actionsheet, useDisclose, Checkbox, Switch, Pressable } from "native-base";

import { useNavigation } from "@react-navigation/native";
import type { AppNavigatorRoutesProps } from "@routes/app.routes";

import TagSvg from '@assets/icons/tag.svg';

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { HomeHeader } from "@components/HomeHeader";
import { Input } from "@components/Input";
import { Card } from "@components/Card";
import { Button } from "@components/Button";

export function Home() {
  const [isSwitchActive, setIsSwitchActive] = useState(false)

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  
  const { colors } = useTheme();
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoToMyAds() {
    navigation.navigate('myads')
  }

  function handleChangeSwitch() {
    setIsSwitchActive(prevState => !prevState)
  }

  return (
    <ScrollView flex={1}>
       <HomeHeader />

        <Box mx="6" mt="8">
        <Text color="gray.300">Seus produtos anunciados para venda</Text>

          <HStack 
            mt="3" 
            justifyContent="space-between" 
            bg="rgba(100, 122, 199, 0.1)" 
            rounded="md" 
            py={3} 
            px={5} 
            alignItems="center"
          >
          <HStack alignItems="center">
            <TagSvg fill={colors.blue[500]} width={24} height={24} />

            <VStack ml="4">
              <Heading color="gray.200">4</Heading>
              <Text color="gray.200" fontSize="sm">anúncios ativos</Text>
            </VStack> 
          </HStack>

          <TouchableOpacity onPress={handleGoToMyAds}> 
            <HStack alignItems="center">
              <Text color={colors.blue[500]} mr="2" fontFamily="heading">
                Meus anúncios
              </Text>

              <AntDesign name="arrowright" size={16} color={colors.blue[500]} mt="1" />  
            </HStack>
          </TouchableOpacity>
          </HStack>
          
          <Text color="gray.300" mt="8">Compre produtos variados</Text>

          <Input 
            placeholder="Buscar anúncio" 
            mt="12" 
            rightElement={
            <HStack justifyContent="space-between" alignItems="center" mr="4" w={"16"}>
              <TouchableOpacity>
                <Feather name="search" size={20} color={colors.gray[200]} />
              </TouchableOpacity>

              <Box h="4" bg="gray.400" w="0.5"/>
              
              <TouchableOpacity onPress={onOpen}>
                <Feather name="sliders" size={20} color={colors.gray[200]} />
              </TouchableOpacity>

              <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content _dragIndicator={{ backgroundColor: 'gray.500' }} px="6" pb="8">
                  <HStack w="100%" my="7" justifyContent="space-between" alignItems="center">
                    <Heading fontSize="lg" color="gray.100">
                      Filtrar anúncios
                    </Heading>

                    <TouchableOpacity onPress={onClose}>
                      <Feather name="x" size={20} color={colors.gray[400]} />
                    </TouchableOpacity>  
                  </HStack>

                  <VStack alignItems="start" w="full" mb="3">
                    <Text fontWeight="bold" color="gray.200">Aceita troca?</Text>

                    <Box bg={isSwitchActive ? "blue.700" : "gray.500"} w="42" h="22" mt="3" rounded="full" alignItems="center" justifyContent="center">
                      <Switch 
                        isChecked={isSwitchActive}
                        ml="-1"
                        mr="auto"
                        offTrackColor="transparent" onTrackColor="transparent" onThumbColor="gray.700" offThumbColor="gray.700"
                        onToggle={handleChangeSwitch}
                      />
                    </Box>
                  </VStack>

                  <VStack alignItems="start" w="full">
                    <Text fontWeight="bold" color="gray.200" mb="3">Meios de pagamento aceitos</Text>

                    <VStack space="2">
                      <Checkbox 
                        value="Boleto" 
                        _checked={{ backgroundColor: 'blue.700', borderColor: 'blue.700' }}
                        _text={{ color: 'gray.200'}}
                      >Boleto
                      </Checkbox>
                      
                      <Checkbox 
                        value="Pix" 
                        _checked={{ backgroundColor: 'blue.700', borderColor: 'blue.700' }}
                        _text={{ color: 'gray.200'}}
                      >Pix
                      </Checkbox>

                      <Checkbox 
                        value="Dinheiro" 
                        _checked={{ backgroundColor: 'blue.700', borderColor: 'blue.700' }}
                        _text={{ color: 'gray.200'}}
                      >Dinheiro
                      </Checkbox>

                      <Checkbox 
                        value="Cartão de Crédito" 
                        _checked={{ backgroundColor: 'blue.700', borderColor: 'blue.700' }}
                        _text={{ color: 'gray.200'}}
                      >Cartão de Crédito
                      </Checkbox>
                      
                      <Checkbox 
                        value="Depósito Bancário" 
                        _checked={{ backgroundColor: 'blue.700', borderColor: 'blue.700' }}
                        _text={{ color: 'gray.200'}}
                      >Depósito Bancário
                      </Checkbox>
                    </VStack>    
                  </VStack>

                  <HStack justifyContent="space-between" w="full" mt="16" space={3}>
                    <Button title="Resetar filtros" variant="secondary" size="176" />
                    <Button title="Aplicar filtros" variant="terciary" size="176" />
                  </HStack>
                </Actionsheet.Content>
              </Actionsheet>
            </HStack>
            }  
          />

          <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between" mt="2 ">
            {Array.from({ length: 4}).map((_, i) => {
              return ( <Card key={i} hasAvatar />)
            })}
          </Box>
        </Box>
    </ScrollView>
  )
}