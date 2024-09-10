import { Center, Icon, Text } from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons'

type Props = {
  description: string;
  hasIcon: boolean;
  iconName: string
}

export function EmptyList({description, hasIcon, iconName}: Props) {
  return (
    <Center mt="12">
      {hasIcon && (
        <Icon 
          as={MaterialCommunityIcons}
          name={iconName}
          color="gray.300"
          size={8}
          mb={2}
        />
      )}

      <Text color="gray.400" textAlign="center" fontSize="md">
        {description}
      </Text>
    </Center>  
  )
}