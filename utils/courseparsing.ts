import { Course, Examination } from "@/utils/types";
import { tryCatch } from "./trycatch";
import {CreateEmptyExamination, CreateEmptyCourse} from "./utils"

/** Funktion för att parsea studie information från textData
 * @param textData - text data från pdf:en
 * @returns Studieinformation om klarade kurser i en hashmap | Error
 */
export async function ParseCourses(textData: string): Promise<Map<string, Course> | string> {
  const { data, error } = await tryCatch(ExtractCoursesAndExaminations(textData));

  if (error) {
    return error.message;
  }

  return await data;
}

/** Splittar upp text datan i en array och loopar igenom den för att extrahera data
 * @param text - textdatan som extraherats ur PDF filen
 * @returns En hashmap av kurser, där key:n är kurskoden
 */
async function ExtractCoursesAndExaminations(text: string): Promise<Map<string, Course>> {
  let courses: Map<string, Course> = new Map();
  let currentCourse: Course | null = null;
  let unfinishedCourses = false;

  const textSplit = text.split(/\r?\n/);

  // Regex för att identifiera kurser (3-4 bokstäver följt av 2-3 siffror)
  // TNA001, TFYA65
  const courseRegex = /^([A-Z]{3,4}\d{2,3})/;
  // Regex för att identifiera examinationsmoment (3 bokstäver + 1 siffra eller 4 bokstäver)
  // UPG1, UPGA
  const examinationRegex = /^([A-Z]{3}\d{1}|UPG[A-Z0-9])/;

  // Loopar igenom hela text array:en
  for (let i = 0; i < textSplit.length - 2; i++) {
    const line = textSplit[i].trim();

    // Kontrollera om vi har nått "ej avslutade kurser" blocket
    if (line.includes("ej avslutade kurser")) {
      unfinishedCourses = true;
      continue;
    }

    // Kontrollera om raden innehåller en kurs
    const courseMatch = line.match(courseRegex);
    if (courseMatch && !unfinishedCourses) {
      // Om vi redan har en kurs, spara den innan vi skapar en ny
      if (currentCourse) {
        courses.set(currentCourse.code, currentCourse);
      }

      // Skapa ny kurs
      currentCourse = CreateEmptyCourse();

      // Extrahera kurskod
      const courseCode = courseMatch[1];
      currentCourse.code = courseCode;

      // Ta ut resten utav raden
      const restOfLine = line.substring(courseCode.length).trim();

      // Om raden innehåller "hp", är det troligen en kurs med alla detaljer på samma rad
      if (restOfLine.includes("hp")) {
        ParseCourseSingleLine(restOfLine, currentCourse);
        continue;
      }

      // Annars kan det vara en kurs med detaljer på flera rader
      currentCourse.name = restOfLine + " " + textSplit[i + 1].trim();
      const detailsLine = textSplit[i + 2].trim();
      ParseCourseDetailsLine(detailsLine, currentCourse);
      i += 2; // Hoppa över de två raderna vi redan har behandlat

      continue;
    }

    // Kontrollera om raden innehåller ett examinationsmoment och vi har en aktuell kurs
    const examMatch = line.match(examinationRegex);
    if (examMatch && currentCourse && !unfinishedCourses) {
      const exam = CreateEmptyExamination();
      exam.code = examMatch[1];

      // Extrahera resten av raden för att hitta namn, och annan examinations information
      const restOfLine = line.substring(examMatch[1].length).trim();

      // Om raden innehåller "hp", är det troligen ett examinationsmoment med alla detaljer på samma rad
      if (restOfLine.includes("hp")) {
        ParseExaminationSingleLine(restOfLine, exam);
        // Lägg till examinationsmomentet i aktuell kurs
        currentCourse.examinations.set(exam.code, exam);
        continue;
      }

      // Om det är ett examinationsmoment över flera rader tilldelar vi det som finns på resten utav raden
      exam.name = restOfLine;

      // Hoppar till nästa rad
      i++;
      // Tar ut hela raden
      const nextLine = textSplit[i].trim();

      // Kollar om den innehåller "hp"
      if (nextLine.includes("hp")) {
        ParseExaminationDetailsLine(nextLine, exam);
        // Lägg till examinationsmomentet i aktuell kurs
        currentCourse.examinations.set(exam.code, exam);
        continue;
      }

      // Om vi behöver mer rader för att få komplett information
      exam.name += " " + nextLine;

      i++;
      const detailsLine = textSplit[i].trim();
      // Kollar igenom om det finns "hp på denna rad"
      if (detailsLine.includes("hp")) {
        ParseExaminationDetailsLine(detailsLine, exam);
        // Lägg till examinationsmomentet i aktuell kurs
        currentCourse.examinations.set(exam.code, exam);
        continue;
      }
    }

    // Oklarade kurser
    if (courseMatch) {
      // Om vi redan har en kurs, spara den innan vi skapar en ny
      if (currentCourse) {
        courses.set(currentCourse.code, currentCourse);
      }

      // Skapa ny kurs
      currentCourse = CreateEmptyCourse();

      // Parsa kursdata
      const courseCode = courseMatch[1];
      currentCourse.code = courseCode;

      // Extrahera resten av raden för att hitta namn, hp, betyg och datum
      let restOfLine = line.substring(courseCode.length).trim();

      // Om raden innehåller "hp", är det troligen en kurs med alla detaljer på samma rad
      // Rensa upp/formatera datan så vi kan återanvända funktioner vi redan definerat
      if (restOfLine.includes("hp")) {
        restOfLine = restOfLine.replace("(", "");
        restOfLine = restOfLine.replace(")", "");
        ParseCourseSingleLine(restOfLine, currentCourse);
        continue;
      }

      // Annars kan det vara en kurs med detaljer på flera rader
      currentCourse.name = restOfLine + " " + textSplit[i + 1].trim();
      let detailsLine = textSplit[i + 2].trim();

      // Rensa upp/formatera datan så vi kan återanvända funktioner vi redan definerat
      if (detailsLine.includes("(") && detailsLine.includes(")")) {
        detailsLine = detailsLine.replace("(", "");
        detailsLine = detailsLine.replace(")", "");
      }

      ParseCourseDetailsLine(detailsLine, currentCourse);
      i += 2; // Hoppa över de två raderna vi redan har behandlat
      continue;
    }

    if (examMatch && currentCourse) {
      // Skapa en nytt examinationsmoment
      const exam = CreateEmptyExamination();
      exam.code = examMatch[1];

      // Extrahera resten av raden för att hitta namn
      let restOfLine = line.substring(examMatch[1].length).trim();

      // Om raden innehåller "hp", är det troligen ett examinationsmoment med alla detaljer på samma rad
      // Rensa upp/formatera datan så vi kan återanvända funktioner vi redan definerat
      if (restOfLine.includes("hp")) {
        let formattedStr = restOfLine.replace(/(\d+,\d+hp)/, "( $1 )");
        ParseExaminationSingleLine(formattedStr, exam);
        // Lägg till examinationsmomentet i aktuell kurs
        currentCourse.examinations.set(exam.code, exam);
        continue;
      }

      // Om det är ett examinationsmoment över flera rader
      exam.name = restOfLine;

      // Nästa rad kan innehålla resten av informationen
      i++;
      const nextLine = textSplit[i].trim();

      // Rensa upp/formatera datan så vi kan återanvända funktioner vi redan definerat
      if (nextLine.includes("hp")) {
        let formattedStr = restOfLine.replace(/(\d+,\d+hp)/, "( $1 )");
        ParseExaminationDetailsLine(formattedStr, exam);
        // Lägg till examinationsmomentet i aktuell kurs
        currentCourse.examinations.set(exam.code, exam);
        continue;
      }

      // Om vi behöver mer rader för att få komplett information
      exam.name += " " + nextLine;

      i++;
      const detailsLine = textSplit[i].trim();

      // Rensa upp/formatera datan så vi kan återanvända funktioner vi redan definerat
      if (detailsLine.includes("hp")) {
        let formattedStr = restOfLine.replace(/(\d+,\d+hp)/, "( $1 )");
        ParseExaminationDetailsLine(formattedStr, exam);
        // Lägg till examinationsmomentet i aktuell kurs
        currentCourse.examinations.set(exam.code, exam);
        continue;
      }
    }
  }

  // Lägg till den sista kursen om den finns
  if (currentCourse) {
    courses.set(currentCourse.code, currentCourse);
  }

  return courses;
}

function ParseGrade(grade: string): number | string {
  if (grade === "G") return grade;
  if (grade === "D") return grade;
  return isNaN(Number(grade)) ? grade : Number(grade);
}

function ParseHP(hpStr: string): number {
  // Extrahera tal från t.ex. "6,0hp" eller "( 1,5hp )"
  const match = hpStr.match(/(\d+,\d+)hp/);
  return match ? parseFloat(match[1].replace(",", ".")) : 0;
}

function ParseDate(date: string): string {
  date = date.slice(0, 4) + date.slice(5, 7) + date.slice(8, 10);
  return date;
}

function ParseCourseSingleLine(line: string, course: Course): void {
  // Hitta position av "hp" för att extrahera namn och hp
  const hpIndex = line.indexOf("hp");
  if (hpIndex <= 0) {
    return;
  }
  // Extrahera namn - tar allt före hp-delen minus 4 tecken för att ta bort poängen
  const namePart = line.substring(0, hpIndex - 3).trim();
  course.name = namePart;

  // Extrahera hp
  const hpPart = line.substring(namePart.length, hpIndex + 2).trim();
  course.hp = ParseHP(hpPart);

  if (hpIndex + 2 > line.length) {
    return;
  }

  const restOfLine = line.substring(hpIndex + 2).trim();

  if (restOfLine.length <= 1) {
    return;
  }

  // Extrahera betyg och datum - de kommer efter hp
  course.grade = ParseGrade(restOfLine[0]);

  course.date = ParseDate(restOfLine.substring(1, 11).trim());
}

function ParseCourseDetailsLine(line: string, course: Course): void {
  // Hitta position av "hp" för att extrahera hp
  const hpIndex = line.indexOf("hp");
  if (hpIndex <= 0) {
    return;
  }

  // Extrahera hp
  const hpPart = line.substring(0, hpIndex + 2).trim();
  course.hp = ParseHP(hpPart);

  if (hpIndex + 2 > line.length) {
    return;
  }

  // Extrahera betyg och datum - de kommer efter hp
  const restOfLine = line.substring(hpIndex + 2).trim();

  if (restOfLine.length <= 1) {
    return;
  }

  course.grade = ParseGrade(restOfLine[0]);
  course.date = ParseDate(restOfLine.substring(1, 11).trim());
}

function ParseExaminationSingleLine(line: string, exam: Examination): void {
  // Regexp för att matcha olika format av examinationsdetaljer
  const nameHPGradeDateRegExp = /([^(]+)\(\s*(\d+,\d+)hp\s*\)\s*([A-Z\d])\s*(\d{4}-\d{2}-\d{2})/;
  const match = line.match(nameHPGradeDateRegExp);

  if (match) {
    exam.name = match[1].trim();
    exam.hp = parseFloat(match[2].replace(",", "."));
    exam.grade = ParseGrade(match[3]);
    exam.date = ParseDate(match[4]);
    return;
  }

  // Om regexp inte matchar, försök att parsa manuellt
  // Hitta position av "hp" och parenteser för att extrahera namn och hp
  const leftParenIndex = line.indexOf("(");
  const rightParenIndex = line.indexOf(")");
  const hpIndex = line.indexOf("hp");

  if (leftParenIndex <= 0 && rightParenIndex < leftParenIndex && hpIndex <= 0) {
    return;
  }

  // Extrahera namn
  exam.name = line.substring(0, leftParenIndex).trim();

  // Extrahera hp
  const hpPart = line.substring(leftParenIndex, hpIndex + 2);
  exam.hp = ParseHP(hpPart);

  if (rightParenIndex + 1 > line.length) {
    return;
  }

  const restOfLine = line.substring(rightParenIndex + 1).trim();

  if (restOfLine.length <= 1) {
    return;
  }

  // Extrahera betyg och datum - de kommer efter hp och parenteser
  exam.grade = ParseGrade(restOfLine[0]);
  exam.date = ParseDate(restOfLine.substring(1, 11).trim());
}

function ParseExaminationDetailsLine(line: string, exam: Examination): void {
  // Regexp för att matcha olika format av examinationsdetaljer
  const hpGradeDateRegExp = /\(\s*(\d+,\d+)hp\s*\)\s*([A-Z\d])\s*(\d{4}-\d{2}-\d{2})/;
  const match = line.match(hpGradeDateRegExp);

  if (match) {
    exam.hp = parseFloat(match[1].replace(",", "."));
    exam.grade = ParseGrade(match[2]);
    exam.date = ParseDate(match[3]);
    return;
  }

  // Om regexp inte matchar, försök att parsa manuellt
  const leftParenIndex = line.indexOf("(");
  const rightParenIndex = line.indexOf(")");
  const hpIndex = line.indexOf("hp");

  if (leftParenIndex <= 0 && rightParenIndex < leftParenIndex && hpIndex <= 0) {
    return;
  }

  // Extrahera hp
  const hpPart = line.substring(leftParenIndex, hpIndex + 2);
  exam.hp = ParseHP(hpPart);

  if (rightParenIndex + 1 > line.length) {
    return;
  }

  const restOfLine = line.substring(rightParenIndex + 1).trim();

  if (restOfLine.length <= 1) {
    return;
  }

  // Extrahera betyg och datum - de kommer efter hp och parenteser
  exam.grade = ParseGrade(restOfLine[0]);
  exam.date = ParseDate(restOfLine.substring(1, 11).trim());
}
