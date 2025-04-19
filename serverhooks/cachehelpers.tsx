import { SupabaseClient, User } from "@supabase/supabase-js";

// Cache-implementation med TTL (10 minuter)
type CacheEntry<T> = {
  value: T;
  timestamp: number;
};

type CacheStore = {
  users: Record<string, CacheEntry<User | null>>;
  userRows: Record<string, CacheEntry<any>>;
};

// Cache-store på server-side
const cacheStore: CacheStore = {
  users: {},
  userRows: {},
};

// TTL i millisekunder (30 minuter)
const CACHE_TTL = 30 * 60 * 1000;

// Hjälpfunktion för att kontrollera om cache-entry är giltig
const isCacheValid = <T,>(entry?: CacheEntry<T>): boolean => {
  if (!entry) return false;
  const now = Date.now();
  return now - entry.timestamp < CACHE_TTL;
};

// 1. Hämta user med cache (30 min TTL)
export const getUserCache = async (supabase: SupabaseClient): Promise<User | null> => {
  // Skapa en unik cache-nyckel (vi använder bara en för alla user-requests)
  const cacheKey = "auth_user";

  // Kolla om vi har en giltig cache entry
  const cachedUser = cacheStore.users[cacheKey];
  if (isCacheValid(cachedUser)) {
    console.log("🔵 getUserCache hämtas FRÅN CACHE");
    return cachedUser.value;
  }

  // Om ingen cache, utför faktisk hämtning
  console.log("🔄 getUserCache körs - inte från cache");
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    return null;
  }

  // Spara i cache
  cacheStore.users[cacheKey] = {
    value: data.user,
    timestamp: Date.now(),
  };

  return data.user;
};

// 2. Hämta användardata med cache (10 min TTL)
export const getUserRowCache = async (userId: string, supabase: SupabaseClient) => {
  // Kolla om vi har en giltig cache entry för denna user_id
  const cachedUserRow = cacheStore.userRows[userId];
  if (isCacheValid(cachedUserRow)) {
    console.log(`🔵 getUserRowCache för user_id: ${userId} hämtas FRÅN CACHE`);
    return cachedUserRow.value;
  }

  // Om ingen cache, utför faktisk hämtning
  console.log(`🔄 getUserRowCache körs för user_id: ${userId} - inte från cache`);
  const { data, error } = await supabase.from("user-datatable").select("*").eq("user_id", userId).single();

  if (error) {
    console.error("Supabase error:", error);
    return null;
  }

  // Spara i cache
  cacheStore.userRows[userId] = {
    value: data,
    timestamp: Date.now(),
  };

  return data;
};

// 3. Metod för att manuellt rensa cachen om det behövs
export const clearUserCache = (userId?: string) => {
  if (userId) {
    // Rensa för specifik användare
    delete cacheStore.userRows[userId];
    console.log(`🧹 Cache rensad för user_id: ${userId}`);
  } else {
    // Rensa all cache
    cacheStore.users = {};
    cacheStore.userRows = {};
    console.log("🧹 All cache rensad");
  }
};
