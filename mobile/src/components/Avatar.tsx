import { Image, IImageProps } from 'native-base';

type Props = IImageProps & {
  size: number;
  borderWidthsize: number;
  borderColor?: string;
}

export function Avatar({ size, borderWidthsize, borderColor = "blue.700", ...rest }: Props) {
  return (
    <Image 
      w={size} 
      h={size} 
      rounded="full" 
      borderWidth={borderWidthsize}
      borderColor={borderColor}
      {...rest} 
    />
  );
}