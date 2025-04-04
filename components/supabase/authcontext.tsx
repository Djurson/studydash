"use server";

import { SignOutAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

/* Implementera auth context */
type AuthContextType = {
  user: User | null;
  SignOut: () => Promise<void>;
};

type AuthProviderProps = { children: React.ReactNode };

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = async ({ children }: AuthProviderProps) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  function SignOut() {
    return SignOutAction();
  }

  return <AuthContext.Provider value={{ user, SignOut }}> {children} </AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
