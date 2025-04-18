"use client";
import { PageTemplateClient } from "@/components/page-template-client";
import { StudyResultProvider } from "@/hooks/editcontext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <StudyResultProvider>
      <PageTemplateClient defaultPage={false}>{children}</PageTemplateClient>
    </StudyResultProvider>
  );
}
