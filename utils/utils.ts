import { redirect } from "next/navigation";
import { Course, CourseJSON, Examination, ExaminationJSON } from "./types";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(type: "error" | "success", path: string, message: string) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

/**
 * @description
 * Returnerar en ny Map där en specifik examination i en kurs uppdaterats.
 *
 * @param map - kurs hashmap:en som innehåller kursen & examinationen
 * @param courseJSON - kursen som innehåller examinationen som ska uppdateras (Samma struktur som i JSON filen)
 * @param examJSON - examinationen som ska uppdateras (Samma struktur som i JSON filen)
 * @param updates - uppdateringarna som ska göras
 *
 * @returns En ny uppdaterad hashmap med ny examinations information
 */
export function UpdateExamResult(map: Map<string, Course>, courseJSON: CourseJSON, examJSON: ExaminationJSON, updates: Partial<Examination>): Map<string, Course> {
  // Skapa en ny kopia av map för att undvika mutationer
  const newCourseMap = new Map(map);

  // Hämta kursen om den finns
  let course = newCourseMap.get(courseJSON.course_code);
  // Om kursen inte finns, skapa en basic kurs
  if (!course) {
    course = CreateCourse(courseJSON.name, courseJSON.course_code, Number.parseFloat(courseJSON.credits.replace("hp", "").trim().replace(",", ".")));
    newCourseMap.set(courseJSON.course_code, course);
  }

  // Skapa ny kopia av examinations map
  const newExaminations = new Map<string, Examination>(course.examinations);

  // Hämta examination om den finns
  let exam = newExaminations.get(examJSON.code);
  // Om examination inte finns, skapa en basic examination
  if (!exam) {
    exam = CreateExamination(examJSON.name, examJSON.code, Number.parseFloat(courseJSON.credits.replace("hp", "").trim().replace(",", ".")));
  }

  newExaminations.set(examJSON.code, { ...exam, ...updates });

  newCourseMap.set(courseJSON.course_code, {
    ...course,
    examinations: newExaminations,
  });

  return newCourseMap;
}

export function ValidateGrade(grade: string, exam: ExaminationJSON): string | null {
  //if (!grade) return "Betyg krävs";

  // Normalize grades by removing any "LiU," prefix and splitting by commas
  const gradingString = exam.grading.replace(/^LiU,\s*/, "");
  // tar bort första betyget, hoppas detinte leder till buggar om json formatet skiljer sig
  const allowedGrades = gradingString
    .slice(2)
    .split(/\s*,\s*/)
    .map((g) => g.trim());

  if (!allowedGrades.includes(grade.toUpperCase()) && grade.length == 1) {
    return `Ange giltigt betyg (${allowedGrades.join(", ")})`;
  }

  return null;
}

export function ValidateDate(date: string, programStartDate: string, todayFormatted: string): string | null {
  if (date.length !== 8 && date.length >= 1) return "Ange giltigt datum (YYYY-MM-DD)";
  if (!/^\d+$/.test(date) && date.length >= 1) return "Endast siffror tillåtna";

  if (date < programStartDate && date.length >= 1) return "Datum kan inte vara före programmets startdatum";
  if (date > todayFormatted && date.length >= 1) return "Datum kan inte vara efter dagens datum";

  const year = Number.parseInt(date.slice(0, 4)); // År om vi behöver göra någon extra koll?
  const month = Number.parseInt(date.slice(4, 6));
  const day = Number.parseInt(date.slice(6, 8));
  if (month > 12) return "Ange en giltig månad";

  // Dagar per månad, standard (Februari justeras sen)
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Skottårskoll
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  if (isLeapYear && month === 2) {
    daysInMonth[1] = 29; // Februari får 29 dagar
  }

  if (day < 1 || day > daysInMonth[month - 1]) {
    return `Måste vara en giltig dag för månad ${month}`;
  }

  return null;
}

export function CreateEmptyCourse(): Course {
  return { code: "", name: "", date: "", examinations: new Map<string, Examination>(), hp: 0, grade: "" };
}

export function CreateEmptyExamination(): Examination {
  return { code: "", name: "", date: "", hp: 0, grade: "" };
}

export function CreateExamination(inputName: string, inputCode: string, inputHP: number, inputDate?: string, inputGrade?: string | number): Examination {
  return { code: inputCode, name: inputName, hp: inputHP, date: inputDate ?? "", grade: inputGrade ?? "" };
}

export function CreateCourse(inputName: string, inputCode: string, inputHP: number, inputDate?: string, inputGrade?: string | number, inputExaminations?: Map<string, Examination>): Course {
  return { code: inputCode, name: inputName, hp: inputHP, date: inputDate ?? "", grade: inputGrade ?? "", examinations: inputExaminations ?? new Map<string, Examination>() };
}
