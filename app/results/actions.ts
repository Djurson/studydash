"use server";

import { promises as fs, writeFile } from "fs";
import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";
import path from "path";
import os from "os";
import { tryCatch } from "@/components/utils/trycatch";
import { ParseCourses } from "@/components/utils/courseparsing";

export async function HandleFileUpload(file: File) {
  let fileName = uuidv4();

  // Use the OS temp directory instead of hardcoded path
  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, `${fileName}.pdf`);

  const { data, error } = await tryCatch(ReadWritePDF(tempFilePath, file));

  if (error) {
    await fs.unlink(tempFilePath).catch(() => {});
    console.error("Error processing PDF:", error);
  }

  if (!data) {
    await fs.unlink(tempFilePath).catch(() => {});
    console.error("Error when reading file!");
    return;
  }

  const parsed = await ParseCourses(data);

  return parsed;
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

async function saveToFile(filename: string, text: string) {
  fs.writeFile(filename, text, "utf8");
  console.log(`Fil sparad som: ${filename}`);
}
