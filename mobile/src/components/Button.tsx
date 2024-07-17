import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base'

type ButtonProps = IButtonProps & {
  title: string;
  variant?: "primary" | "secondary" | "terciary"
  size?: string;
}

export function Button({title, size = "full", variant = "primary", ...rest}: ButtonProps) {
  return (
    <NativeBaseButton 
      width={size}
      bg={variant === "primary" ? "blue.700" : variant === "secondary" ? "gray.500" : "gray.100"}
      borderWidth={1}
      borderColor="transparent"
      rounded="md"
      _pressed={{ 
        bg: variant === "primary" ? "blue.500" : variant === "secondary" ? "warmGray.200" : "gray.200"
      }}
      {...rest}
    >
      <Text 
        color={variant === "secondary" ? "gray.200" : "gray.700"} 
        fontFamily="heading" 
        fontSize="sm"
      >
        {title}
      </Text>
    </NativeBaseButton>
  )
}