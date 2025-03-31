import { ComponentProps } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileUp, Info } from "lucide-react";
import Link from "next/link";

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
  return (
    <>
      <Label
        htmlFor="PDF-Upload"
        className="text-sm flex flex-col items-center justify-center 
        bg-white-0 border-2 border-dashed border-gray-900 py-12 cursor-pointer rounded-2xl
        hover:bg-blue-100 transition duration-300 ease-in-out group">
        <span className="bg-blue-100 aspect-square p-7 rounded-2xl group-hover:bg-white-400 transition duration-300 ease-in-out">
          <FileUp className="text-blue-900 aspect-square h-9 w-9" />
        </span>
        <span>
          <span className="text-blue-900">Klicka</span> eller dra och släpp för att ladda upp resultatintyg
        </span>
        <span className="text-gray-600">Format som stöds: PDF</span>
      </Label>
      <Link href={"/"}>
        <Info className="text-gray-600 absolute top-4 right-4 h-6 w-6 aspect-square cursor-pointer" />
      </Link>
      <Input type="file" accept=".pdf" name="PDF-Upload" id="PDF-Upload" className="appearance-none hidden" {...props} />
    </>
  );
}
