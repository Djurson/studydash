"use client";

import { ChangeEvent, ComponentProps, DragEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileUp, Info } from "lucide-react";
import Link from "next/link";
import { HandleFileUpload } from "@/app/results/actions";

/**
 * A file upload input for uploading PDF documents.
 *
 * @remarks
 * This component renders a styled label with an icon that acts as a file upload area. Users can either click to select a file or drag and drop a file into the area.
 * The input accepts only PDF files.
 * An info icon is also provided for additional instructions or information.
 *
 * @param {ComponentProps<typeof Input> & ComponentProps<typeof Label>} props - The input and label component props to customize the file input behavior and appearance.
 *
 * @returns A file upload input with a custom label, drag-and-drop area, and a hidden file input field.
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
      preventDefault: () => { },
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
  });
}
