"use client";
import { createClient } from "@/utils/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AlertPopupWindow from "../main/alert-popup";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  signOut: async () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: any) => {
  const supabaseClient = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [alertPopup, setAlertPopup] = useState<boolean>(true);

  useEffect(() => {
    // Hämtar initial session
    const fetchSession = async () => {
      const { data, error } = await supabaseClient.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
      }
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);

      let userId = data.session?.user?.id;

      if (userId) {
        const { data, error } = await supabaseClient.from("usertable").select("*").eq("user-uid", userId);

        if (error) {
          setAlertPopup(true);
        }

        if (!data || data.length === 0) {
          setAlertPopup(true);
          console.log(alertPopup);
        }
      }
    };

    fetchSession();

    // Lyssnar på autentiseringstillståndsändringar
    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabaseClient]);

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    router.push("/sign-in");
  };

  const contextValue: AuthContextType = { session, user, signOut };

  if (loading) {
    return null; // eller t.ex. <div>Laddar...</div>
  }

  return (
    <AuthContext.Provider value={contextValue}>
      <AlertPopupWindow
        defaultOpen={alertPopup}
        title="Saknad studieinfo"
        description={"Det verkar som att vi saknar din studieinformation. Vänligen fyll i din studieinformation för att kunna använda tjänsten"}
        actiontext="Ta mig till informations sidan"
        actionlink="/results"></AlertPopupWindow>
      {children}
    </AuthContext.Provider>
  );
};

// export the useAuth hook
export const useAuth = () => useContext(AuthContext);
