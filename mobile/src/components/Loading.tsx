import { Center, Spinner } from 'native-base';

import LogoSvg from '@assets/logo.svg';

export function Loading() {
  return (
    <Center flex={1} bg="gray.600">
      <Spinner color="blue.500" />
      <LogoSvg />
    </Center>
  );
}