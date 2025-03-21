import { ReactNode } from "react";
import { TopNavBar } from "@/components/navigation/topnavbar";
import { ClientSidebar } from "@/components/navigation/clientsidebar";

type PageProps = {
  children: ReactNode;
};

export function PageTemplate({ children }: PageProps) {
  return (
    <>
      <div className="max-w-screen min-h-screen h-[300vh] bg-green-400 flex">
        <TopNavBar />
        <ClientSidebar />
        <div className="flex justify-end bg-white-400 w-screen">
          <main className="flex p-4 w-full justify-center mt-[3.688rem]">
            <div className="w-full bg-amber-500 h-[788px]">
              <header className="w-full p-10 bg-purple-200"></header>
              <section>{children}</section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
