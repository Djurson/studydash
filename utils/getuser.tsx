import { User } from "@supabase/supabase-js";
import { cache } from "react";

type GetUserReturn = {
  user: User;
  userData?: { studyinfo: string; studyyear: string; university: string; program: string; previousfunds: boolean };
};

export const GetUser = cache(async function (): Promise<GetUserReturn | undefined> {
  return;
});
