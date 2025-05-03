"use server";

/*

  Filen kan vara "dålig" vet ej?

*/

import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";
import path from "path";
import os from "os";
import { tryCatch } from "@/utils/trycatch";
import { ParseCourses } from "@/utils/courseparsing";
import { Course, UserData } from "@/utils/types";
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { getUserCache, getUserRowCache } from "@/serverhooks/cachehelpers";
import { jsonToStudyResults } from "@/utils/converters";

type ChangeHistoryProps = {
  studyYear: string | undefined;
  studyProgram: string | undefined;
  studyUniversity: string | undefined;
  previousFounds: boolean;
};

/** Funktion för att hantera uppladdning av PDF
 * @param file - Filen som laddats upp
 * @returns Ett objekt med studieinformation
 */
export async function HandleFileUpload(file: File): Promise<Map<string, Course> | string> {
  const fileName = uuidv4();

  // Skapar en filväg till operativsystemets temporära sparnings plats
  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, `${fileName}.pdf`);

  // Försöker läsa PDF:en genom den temporära filen genom operativsystemets temporära plats
  const { data, error } = await tryCatch(ReadWritePDF(tempFilePath, file));

  // Om error, stäng filestream och returnera error.
  if (error) {
    await fs.unlink(tempFilePath).catch(() => {});
    return "Error processing PDF:" + error;
  }

  // Om data inte finns, stäng filestream och returnera error.
  if (!data) {
    await fs.unlink(tempFilePath).catch(() => {});
    return "Error when reading file!";
  }

  // Om det finns data/text i PDF:en skicka in den till ParseCourses funktionen
  const parsed = await ParseCourses(data);

  return parsed;
}

/** Funktion för att läsa in PDF:en
 * @param tempFilePath - Filväg till den temporära filen
 * @param file - Filen som laddats upp
 */
async function ReadWritePDF(tempFilePath: string, file: File): Promise<string> {
  let parsedText = "";
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  // Skriver en ny fil till den temporärara filvägen
  // Returnerar på error
  await fs.writeFile(tempFilePath, fileBuffer).catch((error) => {
    console.error(error);
    return;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfParser = new (PDFParser as any)(null, 1);

  // Om det blir error, skriv ut den och returnera
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pdfParser.on("pdfParser_dataError", (errData: any) => {
    console.error("PDF Parser Error:", errData.parserError);
    return; // This only returns from the event handler, not from the function
  });

  // Extrahera texten från PDF filen
  pdfParser.loadPDF(tempFilePath);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pdfParser.on("pdfParser_dataReady", () => {
    parsedText = (pdfParser as any).getRawTextContent();
  });

  pdfParser.on("pdfParser_dataError", console.error("pdfParser_dataError"));

  // "Rensa" den temporära filen
  await fs.unlink(tempFilePath).catch((err) => console.error("Error deleting temp file:", err));

  return parsedText;
}

/*

async function saveToFile(filename: string, text: string) {
  fs.writeFile(filename, text, "utf8");
  console.log(`Fil sparad som: ${filename}`);
}

*/

export async function WriteToDatabase(studyinfo: string, { studyProgram, studyYear, studyUniversity, previousFounds }: ChangeHistoryProps) {
  const supabase = await createClient();
  const userID = (await supabase.auth.getUser()).data.user?.id;

  // Request att skriva till databasen
  const { error } = await supabase
    .from("user-datatable")
    .upsert({ user_id: userID, studyinfo: studyinfo, studyyear: studyYear, university: studyUniversity, program: studyProgram, previousfunds: previousFounds });

  // Om det blev en error, skicka tillbaka användaren
  if (error) {
    return encodedRedirect("error", "/results", error.message);
  }

  // Om upsert:en lyckades, skicka vidare användaren
  // Implementera logik för att användare inte ska kunna "spam" ladda upp data
  return encodedRedirect("success", "/dashboard", "");
}

export async function GetUserData(): Promise<UserData | undefined> {
  const supabase = await createClient();
  const user = await getUserCache(supabase);
  if (!user) {
    return encodedRedirect("error", "/", "No user");
  }

  const userData = await getUserRowCache(user.id, supabase);

  const { studyinfo, ...restProps } = userData;

  // Konvertera studyinfo från JSON-sträng till Map
  const studyinfoMap = studyinfo ? jsonToStudyResults(studyinfo) : new Map();

  return { ...restProps, studyinfo: studyinfoMap };
}
