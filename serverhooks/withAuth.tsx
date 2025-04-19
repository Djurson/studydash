import { UserData, WithAuthProps } from "@/utils/types";
import { getUserCache, getUserRowCache } from "./cachehelpers";
import { createClient } from "@/utils/supabase/server";
import { jsonToStudyResults, sortMapAndExtractMerit } from "@/utils/converters";

export function withAuth<P extends WithAuthProps>(WrappedComponent: React.ComponentType<P>) {
  return async function AuthenticatedComponent(props: Omit<P, keyof WithAuthProps>) {
    const supabase = await createClient();

    // 1) Hämta session (cachad i 10 min)
    const user = await getUserCache(supabase);

    // 2) Hämta användardata (cachad i 10 min per user.id)
    let row;
    if (user) {
      row = await getUserRowCache(user?.id, supabase);
    }

    // 3) Mappa till props-form
    let mappedUserData: UserData | undefined;
    if (row) {
      const { user_id, studyinfo, ...restProps } = row;

      // Konvertera studyinfo från JSON-sträng till Map
      const studyinfoMap = studyinfo ? jsonToStudyResults(studyinfo) : new Map();
      const { sortedDateMap, meritGradeMap } = sortMapAndExtractMerit(studyinfoMap);

      mappedUserData = {
        ...restProps,
        studyinfo: studyinfoMap,
        sortedDateMap: sortedDateMap,
        meritGradeMap: meritGradeMap,
      };
    }

    // 4) Rendera WrappedComponent med cachade data
    return <WrappedComponent {...(props as P)} user={user} userData={mappedUserData} />;
  };
}
