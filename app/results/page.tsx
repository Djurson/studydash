"use client";

import { UploadPDFInput } from "@/components/form/uploadpdf";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeHistory } from "@/components/edit/changehistory";

export default function Page() {
  return (
    <>
      <header>
        <h1 className="text-3xl font-semibold mt-2">
          Redigera kurser och moment.
        </h1>
      </header>
      <main className="w-full h-[28.25rem] grid grid-cols-5 gap-4 mt-6">
        <section className="col-start-1 col-span-3">
          <div className="flex flex-col flex-1 gap-4">
            <Select disabled>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Linköpings universitet"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Universitet</SelectLabel>
                  <SelectItem value="Linköpings universitet">
                    Linköpings universitet
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex w-full gap-4">
              <Select disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Civilingenjör i medieteknik"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Program/utbildning</SelectLabel>
                    <SelectItem value="Civilingenjör i medieteknik">
                      Civilingenjör i medieteknik
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="HT 2022"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Antagningstillfälle</SelectLabel>
                    <SelectItem value="HT 2022">HT 2022</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="h-[100rem]"></div>
          </div>
        </section>
        <section className="col-start-4 col-span-2 ">
          <div className="sticky top-[4.688rem] flex flex-col w-full h-[88.5vh] gap-4">
            <div>
              <UploadPDFInput />
            </div>

            <div>
              <ChangeHistory />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
