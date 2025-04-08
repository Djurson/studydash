"use client";

import { ChangeEvent, ComponentProps, DragEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileUp, Info } from "lucide-react";
import Link from "next/link";
import { HandleFileUpload } from "@/app/results/actions";

/**
 * En komponent för att ladda upp PDF-dokument.
 *
 * @param {ComponentProps<typeof Input> & ComponentProps<typeof Label>} props - Egenskaper som skickas vidare till både input- och label-komponenterna, för att anpassa beteendet och utseendet för filuppladdningen.
 *
 * @returns En filuppladdningskomponent med en anpassad label, stöd för drag-and-drop och en dold input-fält för val av fil.
 */

export function UploadPDFInput({ ...props }: ComponentProps<typeof Input> & ComponentProps<typeof Label>) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file || !file.name.toLowerCase().endsWith(".pdf")) return;

    // Skapa en dummy event för att återanvända HandleFileInput
    const fakeEvent = {
      preventDefault: () => {},
      target: { files: [file] },
    } as unknown as ChangeEvent<HTMLInputElement>;

    HandleFileInput(fakeEvent);
  };
  return (
    <>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={handleDrop}>
        <Label
          htmlFor="PDF-Upload"
          className="flex flex-col items-center justify-center px-12 py-12 text-sm transition duration-300 ease-in-out border-2 border-gray-900 border-dashed cursor-pointer bg-white-0 rounded-2xl hover:bg-blue-100 group">
          <span className="transition duration-300 ease-in-out bg-blue-100 aspect-square p-7 rounded-2xl group-hover:bg-white-400">
            <FileUp className="text-blue-900 aspect-square h-9 w-9" />
          </span>
          <span>
            <span className="text-blue-900">Klicka</span> eller dra och släpp för att ladda upp resultatintyg
          </span>
          <span className="text-gray-600">Format som stöds: PDF</span>
        </Label>
        <Link href={"/"}>
          <Info className="absolute w-6 h-6 text-gray-600 cursor-pointer top-4 right-4 aspect-square" />
        </Link>
        <Input type="file" accept=".pdf" name="PDF-Upload" id="PDF-Upload" className="hidden appearance-none" {...props} onChange={HandleFileInput} />
      </div>
    </>
  );
}

/**
 * Hanterar filinmatning från användaren och skickar PDF-filen till servern.
 *
 * @description
 * Funktionen validerar att en fil har valts och att det är en PDF.
 * Om så är fallet paketeras filen i ett `FormData`-objekt och skickas vidare till `HandleFileUpload`.
 * Resultatet loggas i konsolen. Ytterligare felhantering kan läggas till vid behov.
 *
 * @param {ChangeEvent<HTMLInputElement>} e - Händelsen som triggas när användaren väljer en fil via ett input-fält.
 *
 * @returns {Promise<void>} Returnerar inget värde, men kör asynkrona åtgärder för filuppladdning.
 */

async function HandleFileInput(e: ChangeEvent<HTMLInputElement>) {
  e.preventDefault();

  const file = e.target.files?.[0];
  const fileName = file?.name;

  if (!file) return;
  if (!fileName?.toLowerCase().endsWith(".pdf")) return;

  const formData = new FormData();
  formData.append("file", file);

  HandleFileUpload(file).then((res) => {
    console.log(res);
    // TODO:
    // Lägg till ifall res har retunerats som error
  });
}
