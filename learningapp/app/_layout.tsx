import React, { useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import { supabase } from "@/lib/supabaseClient";
import { Session } from "@supabase/supabase-js";

export default function RootLayout() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session:", session);
      setSession(session);
      setLoading(false);

      if (session) {
        router.replace("/");
      } else {
        router.replace("/auth/LoginScreen");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (session) {
        router.replace("/");
      } else {
        router.replace("/auth/LoginScreen");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);
  
  if (loading) {
    return null;
  }

  return <Slot />;
}
