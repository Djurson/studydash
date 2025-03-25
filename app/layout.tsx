import DeployButton from "@/components/supabase-template/deploy-button";
import { EnvVarWarning } from "@/components/supabase-template/env-var-warning";
import HeaderAuth from "@/components/supabase-template/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Metadata } from "next";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudyDash",
  description: "Effektivisera din studiegång",
};

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      className={`scroll-smooth ${inter.className}`}
      suppressHydrationWarning>
      <body className="bg-background text-foreground flex flex-col items-center w-full min-h-svh">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {/* <nav className="w-full flex justify-end border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-end items-center p-3 px-5 text-sm">
              {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
            </div>
          </nav>
  */}
          <div className="flex flex-col w-full">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
