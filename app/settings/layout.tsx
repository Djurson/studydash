import { PageTemplate } from "@/components/PageTemplate";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageTemplate defaultPage={true}>{children}</PageTemplate>;
}
