import { NavigationContainer } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useAuth } from '@hooks/useAuth';

export function Routes() {
  const { user } = useAuth();
  console.log("Usuário LOGADO ===>", user)
  
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  );
}