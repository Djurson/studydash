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

export default function Page() {

  const currentYear = new Date().getMonth() < 8 ? new Date().getFullYear() - 1 : new Date().getFullYear();
  const startYear = currentYear - 8;

  return (
    <>
      <header>
        <h1 className="text-3xl font-semibold">Redigera kurser och moment.</h1>
      </header>
      <main className="w-full mt-4">
        <form className="flex w-full gap-12 mt-4">
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
              <Select name="studyYear" required>
                <SelectTrigger className="w-full text-gray-900 bg-white-0">
                  <SelectValue placeholder="När påbörjade du dina studier?" className="text-gray-900"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>När påbörjade du dina studier?</SelectLabel>
                    {Array.from({ length: currentYear - startYear + 1 }, (_, index) => {
                      const year = startYear + index;
                      return (
                        <SelectItem key={year} value={year.toString()}>
                          HT {year}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select name="prev-funds" required>
                <SelectTrigger className="w-full text-gray-900 bg-white-0">
                  <SelectValue placeholder="Har du sökt CSN tidigare?" className="text-gray-900"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Har du sökt CSN tidigare?</SelectLabel>
                    <SelectItem value={"yes"}>Ja</SelectItem>
                    <SelectItem value={"no"}>Nej</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <h2 className="text-2xl font-semibold">Meritvärde</h2>
          </div>

          <div className="sticky flex-1 w-full">
            <UploadPDFInput />
          </div>
        </form>
      </main>
    </>
  );
}
