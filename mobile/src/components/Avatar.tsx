import { Image, IImageProps } from 'native-base';

type Props = IImageProps & {
  size: number;
  borderWidthsize: number;
}

export function Avatar({ size, borderWidthsize, ...rest }: Props) {
  return (
    <Image 
      w={size} 
      h={size} 
      rounded="full" 
      borderWidth={borderWidthsize}
      borderColor="blue.700"
      {...rest} 
    />
  );
}