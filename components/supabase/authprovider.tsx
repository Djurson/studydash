"use client";
import { createClient } from "@/utils/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState, useMemo } from "react";
import AlertPopupWindow from "../main/alert-popup";
import { UserData } from "@/utils/types";
import { jsonToStudyResults } from "@/utils/utils";

// 1) Context-typ med userData
type AuthContextType = {
  session: Session | null;
  user: User | null;
  userData: UserData | null;
  signOut: () => Promise<void>;
  popup: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  userData: null,
  signOut: async () => {},
  popup: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 2) Skapa supabase-client bara en gång
  const supabaseClient = useMemo(() => createClient(), []);

  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const { data: sessData, error: sessErr } = await supabaseClient.auth.getSession();
      if (sessErr) console.error("Error fetching session:", sessErr);

      const sess = sessData.session;
      setSession(sess);
      setUser(sess?.user ?? null);

      if (sess?.user?.id) {
        const { data: row, error: rowErr } = await supabaseClient.from("user-datatable").select("*").eq("user_id", sess.user.id).single();

        if (rowErr) console.error("Error fetching user data:", rowErr);

        if (row) {
          const { user_id, studyinfo, ...rest } = row;
          const mappedStudyinfo = typeof studyinfo === "string" ? jsonToStudyResults(studyinfo) : new Map();

          setUserData({
            ...rest,
            studyinfo: mappedStudyinfo,
          });

          setPopup(false);
        } else {
          setUserData(null);
          setPopup(true);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    };

    initAuth();
  }, [supabaseClient]);

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    router.push("/sign-in");
  };

  if (loading) return null;

  console.log(userData);

  return (
    <AuthContext.Provider value={{ session, user, userData, signOut, popup }}>
      <AlertPopupWindow
        //open={popup}
        title="Saknad studieinfo"
        description="Det verkar som att vi saknar din studieinformation. Vänligen fyll i din studieinformation för att kunna använda tjänsten"
        actiontext="Fyll i studieinfo"
        actionlink="/results"
      />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
