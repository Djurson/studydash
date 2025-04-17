import { redirect } from "next/navigation";
import { cache } from "react";
import AlertPopupWindow from "../main/alert-popup";
import { UserData, WithAuthProps } from "@/utils/types";
import { getSession, getUserRow } from "./cachehelpers";

export const withAuth = cache(function withAuth<P extends WithAuthProps>(WrappedComponent: React.ComponentType<P>) {
  return async function AuthenticatedComponent(props: Omit<P, keyof WithAuthProps>) {
    // 1) Hämta session (cachad)
    const session = await getSession(); // getSession är cachad :contentReference[oaicite:5]{index=5}
    const user = session?.user;

    console.log(user);

    // 2) Hämta användardata (cachad per user.id)
    let row;
    if (user) {
      row = await getUserRow(user?.id); // getUserRow är cachad :contentReference[oaicite:6]{index=6}
    }

    // 3) Mappa till props‑form
    let mappedUserData: UserData | undefined;
    if (row) {
      const { user_id, ...rest } = row; // ta bort user_id :contentReference[oaicite:7]{index=7}
      mappedUserData = rest;
    }

    // 4) Visa popup om ingen data finns
    if (!mappedUserData) {
      return (
        <AlertPopupWindow
          open
          title="Saknad studieinfo"
          description="Det verkar som att vi saknar din studieinformation. Vänligen fyll i din studieinformation för att kunna använda tjänsten"
          actiontext="Fyll i studieinfo"
          actionlink="/results"
        />
      );
    }

    // 5) Rendera WrappedComponent med cachade data
    return <WrappedComponent {...(props as P)} user={user} userData={mappedUserData} />;
  };
});
