import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, Slot } from "expo-router";

export default function TabsLayout() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
      } else {
        router.replace("/auth/LoginScreen"); // Redirect if no session
      }
      setLoading(false);
    };

    checkAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.replace("/auth/LoginScreen");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  if (loading || !isAuthenticated) {
    return null;
  }

  return <Slot />;
}
