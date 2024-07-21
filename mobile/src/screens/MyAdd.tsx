import { TouchableOpacity } from "react-native";
import { Box, Heading, HStack, ScrollView, Text, useTheme, Menu, VStack } from "native-base";

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { Card } from "@components/Card";

export function MyAdd() {
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
              trigger={triggerProps => {
                return (
                  <HStack w="32" borderWidth={2} rounded="md" borderColor={colors.gray[500]}>
                    <TouchableOpacity accessibilityLabel="More options menu" {...triggerProps}>
                      <HStack display="flex" justifyContent="space-between" w="full" px="3" py="2">
                        <Text>Todos</Text>
                        <Entypo name="chevron-small-down" size={24} color="black" /> 
                      </HStack>
                    </TouchableOpacity>
                  </HStack>
                )
              }}
            >
              <Menu.Item><Text>Todos</Text></Menu.Item>
              <Menu.Item><Text>Ativos</Text></Menu.Item>
              <Menu.Item><Text>Inativos</Text></Menu.Item>
            </Menu>

          </Box>

          <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between" mt="2 ">
            {Array.from({ length: 5}).map((_, i) => {
              return ( <Card key={i} />)
            })}
          </Box>
        </Box>
    </ScrollView>
  )
}