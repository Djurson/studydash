import PageTemplate from "@/components/page-template";
// import { SmoothScrollProvider } from "@/components/navigation/smooth.scroll-provider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageTemplate defaultPage={true}>{children}</PageTemplate>
    // <SmoothScrollProvider>
    //   <PageTemplate defaultPage={true}>{children}</PageTemplate>
    // </SmoothScrollProvider>
  );
}
