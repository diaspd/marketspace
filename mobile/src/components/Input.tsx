import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base'

type Props = IInputProps & {
  errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput 
        bg="gray.700"
        borderRadius="md"
        px={4}
        borderWidth={1}
        borderColor="gray.700"
        fontSize="md"
        color="gray.200"
        fontFamily="body"
        placeholderTextColor="gray.400"
        isInvalid={invalid}
        _invalid={{
          borderColor: 'red.600'
        }}
        _focus={{
          bg: 'gray.700',
          borderColor: 'gray.300'
        }}
        {...rest}
      />
    
      <FormControl.ErrorMessage _text={{ color: "red.600" }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}