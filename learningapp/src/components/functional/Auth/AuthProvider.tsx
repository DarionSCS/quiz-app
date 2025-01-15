import { Auth, User } from "@/src/lib/auth/types";
import { createContext, useContext } from "react";
import useSupabaseAuth from "./useSupabaseAuth";

type AuthContextType = {
  isLoggedIn: boolean;
  user?: User | null;
  auth: Auth | null;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  auth: null,
});

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const { isLoggedIn, isInitialized, auth, user } = useSupabaseAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        auth,
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
