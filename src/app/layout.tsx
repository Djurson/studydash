import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";

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
    <html lang="sv">
      <body className={`flex flex-col items-center w-full min-h-svh bg-white-400 ${inter.className}`}>
        <div className="flex flex-col w-11/12 py-8">
          {children}
        </div>
      </body>
    </html >
  );
}
