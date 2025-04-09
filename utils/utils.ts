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

export function UpdateMap<K, V>(map: Map<K, V>, key: K, value: V): Map<K, V> {
  const copy = new Map(map);
  copy.set(key, value);
  return copy;
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
    course = {
      code: courseJSON.course_code,
      name: courseJSON.name,
      hp: Number.parseFloat(courseJSON.credits.replace("hp", "").trim().replace(",", ".")),
      grade: "",
      date: "",
      examinations: new Map(),
    };
    newCourseMap.set(courseJSON.course_code, course);
  }

  // Skapa ny kopia av examinations map
  const newExaminations = new Map(course.examinations);

  // Hämta examination om den finns
  let exam = newExaminations.get(examJSON.code);
  // Om examination inte finns, skapa en basic examination
  if (!exam) {
    exam = {
      code: examJSON.code,
      name: examJSON.name,
      hp: Number.parseFloat(courseJSON.credits.replace("hp", "").trim().replace(",", ".")),
      grade: "",
      date: "",
    };
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

  return null;
}
