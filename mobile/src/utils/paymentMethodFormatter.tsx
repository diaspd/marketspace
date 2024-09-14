import { Text, HStack, useTheme } from "native-base";

import {
  Barcode,
  QrCode,
  Bank,
  Money,
  CreditCard,
} from "phosphor-react-native";

export function paymentMethodFormatter(paymentMethod: string[]) {
  const theme = useTheme();

  return (
    <>
      {paymentMethod.includes("boleto") && (
        <HStack alignItems="center" my="0.5">
          <Barcode size={20} color={theme.colors.gray[100]} />
          <Text ml={2} color="gray.300">
            Boleto
          </Text>
        </HStack>
      )}
      {paymentMethod.includes("pix") && (
        <HStack alignItems="center" my="0.5">
          <QrCode size={20} color={theme.colors.gray[100]} />
          <Text ml={2} color="gray.300">
            Pix
          </Text>
        </HStack>
      )}
      {paymentMethod.includes("deposit") && (
        <HStack alignItems="center" my="0.5">
          <Bank size={20} color={theme.colors.gray[100]} />
          <Text ml={2} color="gray.300">
            Depósito Bancário
          </Text>
        </HStack>
      )}
      {paymentMethod.includes("cash") && (
        <HStack alignItems="center" my="0.5">
          <Money size={20} color={theme.colors.gray[100]} />
          <Text ml={2} color="gray.300">
            Dinheiro
          </Text>
        </HStack>
      )}
      {paymentMethod.includes("card") && (
        <HStack alignItems="center" my="0.5">
          <CreditCard size={20} color={theme.colors.gray[100]} />
          <Text ml={2} color="gray.300">
            Cartão de Crédito
          </Text>
        </HStack>
      )}
    </>
  );
};