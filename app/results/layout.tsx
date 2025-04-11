"use client";

import { PageTemplate } from "@/components/PageTemplate";
import { EditCourseContext } from "@/hooks/editcontext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <EditCourseContext>
      <PageTemplate defaultPage={false}>{children}</PageTemplate>
    </EditCourseContext>
  );
}
