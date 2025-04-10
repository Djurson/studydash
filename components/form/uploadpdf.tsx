"use client";

import { ChangeEvent, ComponentProps, Dispatch, SetStateAction, DragEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileUp, Info } from "lucide-react";
import Link from "next/link";
import { HandleFileUpload } from "@/app/results/actions";
import { Course } from "@/utils/types";
import { useStudyResult } from "@/hooks/editcontext";

/**
 * En komponent för att ladda upp PDF-dokument.
 *
 * @param courseResults - Kursresultat
 * @param setCourseResults - SetStateAction för att sätta kursresultat
 *
 * @returns En filuppladdningskomponent med en anpassad label, stöd för drag-and-drop och en dold input-fält för val av fil.
 */
export function UploadPDFInput({ ...props }: ComponentProps<typeof Input> & ComponentProps<typeof Label>) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>("");
  const { studyResults, setStudyResults } = useStudyResult();

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

    HandleFileInput(file, setError, setStudyResults);
  };

  async function UploadFile(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const file = e.target.files?.[0];
    const fileName = file?.name;

    if (!file) return;
    if (!fileName?.toLowerCase().endsWith(".pdf")) return;

    HandleFileInput(file, setError, setStudyResults);
  }

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
          className={`flex flex-col items-center justify-center p-4 text-sm transition duration-300 ease-in-out border-1 
          border-gray-900 border-dashed cursor-pointer rounded-2xl group shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full
          ${isDragging ? "bg-blue-100" : "hover:bg-blue-100 bg-white-0"}`}>
          <span
            className={`transition duration-300 ease-in-out aspect-square p-4 rounded-2xl
            ${isDragging ? "bg-white-400" : "bg-blue-100 group-hover:bg-white-400"}`}>
            <FileUp className="text-blue-900 aspect-square h-8.5 w-8.5" />
          </span>
          <span>
            <span className="text-blue-900">Klicka</span> eller dra & släpp för att ladda upp resultatintyg
          </span>
          <span className="text-xs font-light text-gray-600">Format som stöds: PDF</span>
          <span className="text-red-900 text-sm">{error}</span>
        </Label>
        <Link href={"/"}>
          <Info className="absolute w-6 h-6 text-gray-600 cursor-pointer top-4 right-4 aspect-square" />
        </Link>
        <Input type="file" accept=".pdf" name="PDF-Upload" id="PDF-Upload" className="hidden appearance-none" {...props} onChange={UploadFile} />
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
 * @returns {Promise<void>} Returnerar inget värde, men kör asynkrona åtgärder för filuppladdning.
 */

async function HandleFileInput(file: File, setError: Dispatch<SetStateAction<string>>, setStudyResults: Dispatch<SetStateAction<Map<string, Course>>>) {
  try {
    const response = await HandleFileUpload(file);

    if (typeof response === "string") {
      setError(response);
      return;
    }

    // Skapa en ny Map för att säkerställa att React upptäcker förändringen
    setStudyResults(new Map(response));
  } catch (error) {
    console.error("Fel vid filuppladdning:", error);
    setError(`Ett fel uppstod vid filuppladdning: ${error}`);
  }
}
