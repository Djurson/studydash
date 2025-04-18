import PageTemplate from "@/components/page-template";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  return <PageTemplate defaultPage>{children}</PageTemplate>;
}
