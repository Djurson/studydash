"use server";

import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";

export async function HandleFileUpload(file: File) {
  let fileName = uuidv4();
  let parsedText = "";

  const tempFilePath = `/tmp/${fileName}.pdf`;

  const fileBuffer = Buffer.from(await file.arrayBuffer());

  await fs.writeFile(tempFilePath, fileBuffer);
  const pdfParser = new (PDFParser as any)(null, 1);

  pdfParser.on("pdfParser_dataError", (errData: any) => console.log(errData.parserError));

  pdfParser.on("pdfParser_dataReady", () => {
    console.log((pdfParser as any).getRawTextContent());
    parsedText = (pdfParser as any).getRawTextContent();
  });

  await new Promise((resolve, reject) => {
    pdfParser.loadPDF(tempFilePath);
    pdfParser.on("pdfParser_dataReady", resolve);
    pdfParser.on("pdfParser_dataError", reject);
  });
}
