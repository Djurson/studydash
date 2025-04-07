import { PageTemplate } from "@/components/PageTemplate";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-up')
  }

  return (
    <PageTemplate defaultPage={true}>{children}</PageTemplate>
  );
}
