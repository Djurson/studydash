"use client";

import { ChangeEvent, ComponentProps, Dispatch, SetStateAction, DragEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileText, FileUp, Info, X } from "lucide-react";
import Link from "next/link";
import { HandleFileUpload } from "@/app/results/actions";
import { Course } from "@/utils/types";
import { useStudyResults } from "@/hooks/editcontext";
import { toast } from "sonner";

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
  const [error, setError] = useState<string | undefined>(undefined);
  const [fileToUpload, setFileToUpload] = useState<File | undefined>();
  const { updateMap } = useStudyResults();

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file || !file.name.toLowerCase().endsWith(".pdf")) return;

    setFileToUpload(file);

    HandleFileInput(file, setError, updateMap);
  };

  async function UploadFile(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file || !file.name.toLowerCase().endsWith(".pdf")) return;

    setFileToUpload(file);

    HandleFileInput(file, setError, updateMap);
  }

  if (error) {
    toast(
      <div className="flex gap-4 items-center">
        <Info className="stroke-red-900" /> <p className="text-red-900">{error}</p>
      </div>
    );
  }

  return (
    <>
      {!fileToUpload ? (
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
          border-foreground border-dashed cursor-pointer rounded-2xl group shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full
          ${isDragging ? "bg-highlight" : "hover:bg-highlight bg-accent"}`}>
            <span
              className={`transition duration-300 ease-in-out aspect-square p-4 rounded-2xl
            ${isDragging ? "bg-background" : "bg-highlight group-hover:bg-background"}`}>
              <FileUp className="text-blue-900 dark:text-secondary-foreground aspect-square h-8.5 w-8.5" />
            </span>
            <span>
              <span className="text-blue-900 dark:group-hover:text-blue-100 transition duration-300 ease-in-out">Klicka</span> eller dra & släpp för att ladda upp resultatintyg
            </span>
            <span className="text-xs font-light text-gray-600">Format som stöds: PDF</span>
          </Label>
          <Link href={"/"}>
            <Info className="absolute w-6 h-6 text-gray-600 cursor-pointer top-4 right-4 aspect-square" />
          </Link>
          <Input type="file" accept=".pdf" name="PDF-Upload" id="PDF-Upload" className="hidden appearance-none" {...props} onChange={UploadFile} />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center p-4 text-sm transition duration-300 ease-in-out border-1 gap-2 border-foreground border-dashed rounded-2xl group shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full bg-accent">
            <div className="bg-background flex gap-2 w-2/3 items-center px-4 rounded-md shadow-background shadow-md">
              <span className="transition duration-300 ease-in-out aspect-square p-4 rounded-2xl">
                <FileText className="stroke-blue-900 aspect-square h-8.5 w-8.5" />
              </span>
              <div className="flex flex-col gap-2 justify-between w-full">
                <div className="flex justify-between items-center">
                  <p className="w-fit">{fileToUpload.name}</p>
                  <p className="text-xs text-accent-foreground bg-accent px-2 py-0.5 rounded-xs">{(fileToUpload.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <div className="flex gap-1 justify-between items-center">
                  <p className="text-xs text-accent-foreground">{fileToUpload.type}</p>
                  <p className="text-xs text-accent-foreground bg-accent px-2 py-0.5 rounded-xs">{new Date(fileToUpload.lastModified).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <X className="absolute w-6 h-6 text-red-900 cursor-pointer top-4 right-4 aspect-square" onClick={() => setFileToUpload(undefined)} />
          </div>
        </>
      )}
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

async function HandleFileInput(file: File, setError: Dispatch<SetStateAction<string | undefined>>, updateMap: (inputMap: Map<string, Course>) => void) {
  try {
    const response = await HandleFileUpload(file);

    if (typeof response === "string") {
      setError(response);
      return;
    }

    // Skapa en ny Map för att säkerställa att React upptäcker förändringen
    updateMap(response);
  } catch (error) {
    setError(`Ett fel uppstod vid filuppladdning: ${error}`);
  }
}
