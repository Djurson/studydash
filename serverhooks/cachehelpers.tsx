import { SupabaseClient, User } from "@supabase/supabase-js";
import { cache } from 'react';

// TTL i millisekunder (2 timmar)
const CACHE_TTL = 2 * 60 * 60 * 1000;

// 1. Hämta user med React Cache
export const getUserCache = cache(async (supabase: SupabaseClient): Promise<User | null> => {
  console.log("🔄 getUserCache körs");
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    return null;
  }

  return data.user;
});

// 2. Hämta användardata med React Cache
export const getUserRowCache = cache(async (userId: string, supabase: SupabaseClient) => {
  console.log(`🔄 getUserRowCache körs för user_id: ${userId}`);
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

// Om du behöver ett sätt att manuellt revalidera cachen, använd revalidatePath eller revalidateTag
// Exempel på implementering för att rensa cache:
export const clearUserCache = async (userId?: string) => {
  // Denna funktion blir en no-op eftersom React Cache revalideras automatiskt
  // när komponenten renderas om, men du kan använda revalidatePath/revalidateTag här
  console.log(`🧹 Cache revalideras för ${userId || 'alla användare'}`);
};