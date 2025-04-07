import { PageTemplate } from "@/components/PageTemplate";
import { AuthProvider } from "@/components/supabase/authprovider";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <PageTemplate defaultPage={true}>{children}</PageTemplate>
    </AuthProvider>
  );
}
