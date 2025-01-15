import { Auth, User } from "@core/auth/types";
import { createContext, useContext } from "react";
import useSupabaseAuth from "./useSupabaseAuth";

type AuthContextType = {
  isLoggedIn: boolean;
  user?: User | null;
  auth: Auth | null;
  refresh: () => Promise<Auth | null>;
  login: (email: string, password: string) => Promise<Auth | null>;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  auth: null,
  refresh: async () => null,
  login: async () => null,
});

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const { isLoggedIn, isInitialized, auth, user, refresh, login } =
    useSupabaseAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        auth,
        refresh,
        login,
      }}
    >
      {isInitialized ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
