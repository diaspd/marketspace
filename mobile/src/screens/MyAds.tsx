import { TouchableOpacity } from "react-native";
import { Box, Heading, HStack, ScrollView, Text, useTheme, Menu, VStack } from "native-base";

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { Card } from "@components/Card";
import { useState } from "react";

export function MyAds() {
  const [selectText ,setSelectText] = useState('Todos')
  const [isDropdownOpen ,setIsDropdownOpen] = useState(false)
  const { colors } = useTheme();

  return (
    <ScrollView flex={1}>
        <Box mx="6" mt="16">
          <HStack alignItems="center" mb="10">
            <Heading color="gray.100" fontSize="lg" ml="auto">Meus anúncios</Heading>

            <Box ml="auto">
              <TouchableOpacity>
                <AntDesign name="plus" size={24} color="black" />
              </TouchableOpacity>
            </Box>
          </HStack>

          <Box mb="5" display="flex" alignItems="baseline" justifyContent="space-between" flexDirection="row">
            <Text>9 anúncios</Text>

            <Menu
              w="32"
              placement="bottom right" 
              shouldOverlapWithTrigger={false}
              mt="8"
              onOpen={() => setIsDropdownOpen(true)}
              onClose={() => setIsDropdownOpen(false)}
              trigger={triggerProps => {
                return (
                  <HStack w="32" borderWidth={2} rounded="md" borderColor={colors.gray[500]} >
                    <TouchableOpacity accessibilityLabel="More options menu" {...triggerProps}>
                      <HStack display="flex" justifyContent="space-between" w="full" px="3" py="2">
                        <Text>{selectText}</Text>
                        {isDropdownOpen ? (
                          <Entypo name="chevron-small-down" style={{ transform: [{ rotate: '180deg'}]}} size={24} color={colors.gray[300]} /> 
                        ): (
                          <Entypo name="chevron-small-down" size={24} color={colors.gray[300]} /> 
                        )}
                      </HStack>
                    </TouchableOpacity>
                  </HStack>
                ) 
              }}
            >
              <Menu.Item onPress={() => setSelectText('Todos')}><Text>Todos</Text></Menu.Item>
              <Menu.Item onPress={() => setSelectText('Ativos')}><Text>Ativos</Text></Menu.Item>
              <Menu.Item onPress={() => setSelectText('Inativos')}><Text>Inativos</Text></Menu.Item>
            </Menu>

          </Box>

          <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between" mt="2">
            {Array.from({ length: 5}).map((_, i) => {
              return ( <Card key={i} />)
            })}
          </Box>
        </Box>
    </ScrollView>
  )
}