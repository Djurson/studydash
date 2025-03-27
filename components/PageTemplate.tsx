import { ReactNode } from "react";
import { TopNavBar } from "./navigation/topnavbar";
import { ClientSidebar } from "./navigation/clientsidebar";

type PageProps = {
  children: ReactNode;
  defaultPage: boolean;
};

export function PageTemplate({ children, defaultPage }: PageProps) {
  return (
    <div className="max-w-screen min-h-screen bg-green-400 flex">
      <TopNavBar defaultPage={defaultPage} backLink="/dashboard" />
      {defaultPage && <ClientSidebar />}
      <div className="flex justify-center bg-white-400 w-full">
        <main className="flex p-4 w-full justify-center mt-[3.688rem] max-w-[82.2vw]">
          <div className="w-full h-fit gap-4">
            <section>{children}</section>
          </div>
        </main>
      </div>
    </div>
  );
}
