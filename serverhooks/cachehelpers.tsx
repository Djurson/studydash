import { SupabaseClient, User } from "@supabase/supabase-js";
import { cache } from "react";

// 1. Hämta user med React Cache
export const getUserCache = cache(async (supabase: SupabaseClient): Promise<User | null> => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    return null;
  }

  return data.user;
});

// 2. Hämta användardata med React Cache
export const getUserRowCache = cache(async (userId: string, supabase: SupabaseClient) => {
  const { data, error } = await supabase.from("user-datatable").select("*").eq("user_id", userId).single();

  if (!data) {
    return null;
  }

  if (error) {
    console.error("Supabase error:", error);
    return null;
  }

  return data;
});
