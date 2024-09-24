import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme } from "native-base";

import { AuthRoutes } from "./auth.routes";
import { StackRoutes } from "./stack.routes";

import { useAuth } from '@hooks/useAuth';
import { Loading } from "@components/Loading";

export function Routes() {
  const { colors } = useTheme();
  const { user, isLoadingUserStorageData  } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[600]

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <NavigationContainer theme={theme}>
      {user.id ? <StackRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}