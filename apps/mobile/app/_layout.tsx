import Auth from "@/components/Auth";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (!user || error) {
        setSession(null);
        await supabase.auth.signOut();
      }
    }
    if (session) {
      checkSession();
    }
  }, [session]);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (!session) {
    return <Auth />;
  }

  return <Stack />;
}
