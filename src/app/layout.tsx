import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { auth } from "../../firebase/client";
import { AuthProvider } from "@/components/firebase/authcontext";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "StudyDash",
  description: "Effektivisera din studiegång",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="scroll-smooth">
      <body className={`flex flex-col items-center w-full min-h-svh bg-white-400 ${inter.className}`}>
        <div className="flex flex-col w-11/12">
          <AuthProvider>
            {children}
          </AuthProvider>
        </div>
      </body>
    </html >
  );
}
