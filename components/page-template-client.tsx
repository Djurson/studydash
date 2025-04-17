"use client";

import { ReactNode } from "react";
import { TopNavBar } from "./navigation/topnavbar";

type PageProps = {
  children: ReactNode;
  defaultPage: boolean;
};

export function PageTemplateClient({ ...props }: PageProps) {
  return (
    <div className="max-w-screen min-h-screen bg-green-400 flex">
      <TopNavBar defaultPage={props.defaultPage} />
      <div className="flex justify-center bg-background w-full">
        <main className="flex p-4 w-full justify-center mt-[3.688rem] max-w-[82.2vw]">
          <div className="w-full h-fit gap-4">
            <section>{props.children}</section>
          </div>
        </main>
      </div>
    </div>
  );
}
