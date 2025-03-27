import { PageTemplate } from "@/components/PageTemplate";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageTemplate defaultPage={true}>{children}</PageTemplate>;
}
