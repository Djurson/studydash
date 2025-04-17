import { createClient } from "@/utils/supabase/client";
import { cache } from "react";

// 1. Memoisera Supabase‑session‑hämtningen
export const getSession = cache(async () => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
});

// 2. Memoisera databas‑hämtning per userId
export const getUserRow = cache(async (userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("user-datatable").select("*").eq("user_id", userId).single();

  if (error) {
    console.error("Supabase error:", error);
    return null;
  }
  return data;
});
