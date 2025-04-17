import { SupabaseClient, User } from "@supabase/supabase-js";
import { cache } from "react";

// 1. Memoisera Supabase‑session‑hämtningen
export const getUserCache = cache(async (supabase: SupabaseClient): Promise<User | null> => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error(error);
    return null;
  }
  return data.user;
});

// 2. Memoisera databas‑hämtning per userId
export const getUserRowCache = cache(async (userId: string, supabase: SupabaseClient) => {
  const { data, error } = await supabase.from("user-datatable").select("*").eq("user_id", userId).single();
  if (error) {
    console.error("Supabase error:", error);
    return null;
  }
  return data;
});
