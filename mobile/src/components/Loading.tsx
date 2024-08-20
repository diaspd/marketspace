import { Center, Spinner } from 'native-base';

export function Loading() {
  return (
    <Center flex={1} bg="gray.600">
      <Spinner color="blue.500" />
    </Center>
  );
}