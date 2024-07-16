import { Image, IImageProps } from 'native-base';

type Props = IImageProps & {
  size: number;
}

export function Avatar({ size, ...rest }: Props) {
  return (
    <Image 
      w={size} 
      h={size} 
      rounded="full" 
      borderWidth={3}
      borderColor="blue.700"
      {...rest} 
    />
  );
}