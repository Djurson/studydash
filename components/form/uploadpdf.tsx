"use client";

import { ChangeEvent, ComponentProps, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileUp, Info } from "lucide-react";
import Link from "next/link";
import FormButton from "./formbutton";
import { tryCatch } from "../utils/trycatch";
import { HandleFileUpload } from "@/app/results/actions";

export function UploadPDFInput({ ...props }: ComponentProps<typeof Input> & ComponentProps<typeof Label>) {
  return (
    <>
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
      {/* <FormButton>Ladda upp</FormButton> */}
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
    console.log(res)
  });
}
