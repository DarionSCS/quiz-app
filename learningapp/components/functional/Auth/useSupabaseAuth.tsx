import { useEffect, useState } from "react";
import { AuthChangeEvent } from "@supabase/supabase-js";
import { Auth } from "@/lib/auth/types";
import { API } from "@/lib/networking/supabaseClient";
import { getCurrentSession } from "@/lib/auth/api";

const useSupabaseAuth = () => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [auth, setAuth] = useState<Auth | null>(null);

  // 1. Bij opstarten checken of user is ingelogd?
  useEffect(() => {
    const checkAuth = async () => {
      const auth = await getCurrentSession();
      setAuth(auth);
      setIsInitialized(true);
    };
    checkAuth();
  }, []);

  // 2. Daarna "watchen" -> is user nog steeds ingelogd?
  useEffect(() => {
    API.auth.onAuthStateChange((event: AuthChangeEvent, session) => {
      switch (event) {
        case "SIGNED_IN":
        case "USER_UPDATED":
        case "TOKEN_REFRESHED":
          const fetchSession = async () => {
            try {
              const auth = await getCurrentSession();
              setAuth(auth);
            } catch (error) {
              setAuth(null);
            }
          };
          fetchSession();
          break;

        case "SIGNED_OUT":
          setAuth(null);
          break;
      }
    });
  }, []);

  const isLoggedIn = isInitialized && !!auth;

  return {
    isLoggedIn,
    isInitialized,
    auth,
    user: auth?.user,
  };
};

export default useSupabaseAuth;
