import PageTemplate from "@/components/page-template";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <PageTemplate defaultPage={true}>{children}</PageTemplate>;
}
