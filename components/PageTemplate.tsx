import { ReactNode } from "react";
import { TopNavBar } from "./navigation/topnavbar";
import { ClientSidebar } from "./navigation/clientsidebar";


type PageProps = {
  children: ReactNode;
  defaultPage: boolean;
};


/**
 * Page template for the main pages
 * 
 * @remarks
 * This component must take in the default page boolean
 * 
 * @param children - Children components and tags, could be html tags <div>, <p>, etc or components
 * 
 * @param defaultPage - Determines the page layout, either true or false, check figma design for layouts
 * 
 * @returns Returns the page layout with sidenavigation and top navigation
 * 
*/
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
