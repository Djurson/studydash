"use client";

import { PageTemplate } from "@/components/PageTemplate";
import { Toaster } from "@/components/ui/sonner";
import { StudyResultProvider } from "@/hooks/editcontext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <StudyResultProvider>
      <PageTemplate defaultPage={false}>{children}</PageTemplate>
      <Toaster richColors />
    </StudyResultProvider>
  );
}
