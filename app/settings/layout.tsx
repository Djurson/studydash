import PageTemplate from "@/components/page-template";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <PageTemplate defaultPage>{children}</PageTemplate>;
}
