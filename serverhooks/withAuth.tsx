import { cache } from "react";
import { UserData, WithAuthProps } from "@/utils/types";
import { getUserCache, getUserRowCache } from "./cachehelpers";
import { createClient } from "@/utils/supabase/server";
import { jsonToStudyResults } from "@/utils/converters";

export const withAuth = cache(function withAuth<P extends WithAuthProps>(WrappedComponent: React.ComponentType<P>) {
  return async function AuthenticatedComponent(props: Omit<P, keyof WithAuthProps>) {
    const supabase = await createClient();
    // 1) Hämta session (cachad)
    const user = await getUserCache(supabase);

    // 2) Hämta användardata (cachad per user.id)
    let row;
    if (user) {
      row = await getUserRowCache(user?.id, supabase);
    }

    // 3) Mappa till props‑form
    let mappedUserData: UserData | undefined;
    if (row) {
      const { user_id, studyinfo, ...restProps } = row;

      // Konvertera studyinfo från JSON-sträng till Map
      const studyinfoMap = studyinfo ? jsonToStudyResults(studyinfo) : new Map();

      mappedUserData = {
        ...restProps,
        studyinfo: studyinfoMap,
      };
    }

    // 4) Rendera WrappedComponent med cachade data
    return <WrappedComponent {...(props as P)} user={user} userData={mappedUserData} />;
  };
});
