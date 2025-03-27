"use server";

import { PdfReader } from "pdfreader";
import fs from "fs";
import { encodedRedirect } from "@/utils/utils";

export const PDFReadAction = async (formData: FormData) => {
  const PDFfile = formData.get("PDF-Upload");

  if (!PDFfile) {
    return encodedRedirect("error", "/sign-up", "Ingen fil!");
  }

  console.log(PDFfile);
};
