"use server";

import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";
import path from "path";
import os from "os";
import { tryCatch } from "@/components/utils/trycatch";

export async function HandleFileUpload(file: File) {
  let fileName = uuidv4();

  // Use the OS temp directory instead of hardcoded path
  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, `${fileName}.pdf`);

  const { data, error } = await tryCatch(ReadWritePDF(tempFilePath, file));

  if (error) {
    fs.unlink(tempFilePath).catch(() => {});
    console.error("Error processing PDF:", error);
  }

  console.log(tempFilePath);

  console.log(data);

  return data;
}

async function ReadWritePDF(tempFilePath: string, file: File): Promise<string> {
  let parsedText = "";
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  // Make sure directory exists
  await fs.writeFile(tempFilePath, fileBuffer);

  const pdfParser = new (PDFParser as any)(null, 1);

  pdfParser.on("pdfParser_dataError", (errData: any) => {
    console.error("PDF Parser Error:", errData.parserError);
  });

  // Get parsed text
  const result = await new Promise((resolve, reject) => {
    pdfParser.loadPDF(tempFilePath);

    pdfParser.on("pdfParser_dataReady", () => {
      parsedText = (pdfParser as any).getRawTextContent() + " ";
      resolve(parsedText);
    });

    pdfParser.on("pdfParser_dataError", reject);
  });

  // Clean up the temp file after parsing
  await fs.unlink(tempFilePath).catch((err) => console.error("Error deleting temp file:", err));

  return parsedText;
}
