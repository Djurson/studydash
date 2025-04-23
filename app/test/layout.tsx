import PageTemplate from "@/components/page-template";
import { ReactNode } from "react";

export default function TestLayout({ children }: { children: ReactNode }) {
  return <PageTemplate defaultPage>{children}</PageTemplate>;
}
