import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme } from "native-base";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useAuth } from '@hooks/useAuth';

export function Routes() {
  const { colors } = useTheme();
  const { user } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[600]

  return (
    <NavigationContainer theme={theme}>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}