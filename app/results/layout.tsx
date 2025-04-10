"use client";
import { PageTemplate } from "@/components/PageTemplate";
import { EditCourseProvider } from "@/hooks/editcontext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageTemplate defaultPage={false}>
      <EditCourseProvider>{children}</EditCourseProvider>
    </PageTemplate>
  );
}
