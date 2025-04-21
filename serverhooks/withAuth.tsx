import { UserData, WithAuthProps } from "@/utils/types";
import { getUserCache, getUserRowCache } from "./cachehelpers";
import { createClient } from "@/utils/supabase/server";
import { jsonToStudyResults, sortMapAndExtractMerit } from "@/utils/converters";
import { redirect } from "next/navigation";
import AlertPopupWindow from "@/components/main/alert-popup";

export function withAuth<P extends WithAuthProps>(WrappedComponent: React.ComponentType<P>) {
  return async function AuthenticatedComponent(props: Omit<P, keyof WithAuthProps>) {
    const supabase = await createClient();

    // 1) Hämta session (cachad i 30 min)
    const user = await getUserCache(supabase);
    if (!user) {
      redirect("/");
    }

    // 2) Hämta användardata (cachad i 30 min per user.id)
    let row = await getUserRowCache(user.id, supabase);
    if (!row) {
      return (
        <WrappedComponent {...(props as P)} user={user} userData={undefined}>
          <AlertPopupWindow
            open={true}
            defaultOpen
            title="Saknad studieinfo"
            description="Det verkar som att vi saknar din studieinformation. Vänligen fyll i din studieinformation för att kunna använda tjänsten"
            actiontext="Fyll i studieinfo"
            actionlink="/results"
          />
        </WrappedComponent>
      );
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

    console.log(mappedUserData)

    // 4) Rendera WrappedComponent med cachade data
    return <WrappedComponent {...(props as P)} user={user} userData={mappedUserData} />;
  };
}
