import { createContext, type ReactNode } from "react";

import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO;
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps)  {
  return (
    <AuthContext.Provider value={{
      user: {
        id: '10',
        name: 'Pedro Dias',
        email: 'pedro@email.com',
        avatar: 'diaspd.png',
        tel: '5191919110'
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}