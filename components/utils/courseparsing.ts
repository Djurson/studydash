import { Course, Examination } from "./types";

export async function ParseCourses(data: string): Promise<Array<Object>> {
  return await ExtractCourses(data);
}

async function ExtractCourses(text: string): Promise<Array<Object>> {
  let currentCourse: Course = CreateEmptyCourse();
  let courses: Course[] = [];

  const textSplit = text.split(/\r?\n/);

  const courseRegex = /^[A-Z]{3}\d{3}/; // Example: "TNA001"
  const examinationReger = /^[A-Z]{3}\d{1}[A-Z]{1}/; // Example: "TEN1S"

  let notNormalFormatting = false;
  let unfinishedCourses = false;
  for (let line of textSplit) {
    if (line === "Delar i ej avslutade kurser") {
      unfinishedCourses = true;
      continue;
    }
    if (!notNormalFormatting && !courseRegex.test(line) && !examinationReger.test(line)) continue;

    if (courseRegex.test(line)) {
      PassedCourseParsing(line, notNormalFormatting);
    }
  }

  return courses;
}

function CreateEmptyCourse(): Course {
  return { code: "", name: "", date: "", examinations: [], hp: 0, grade: 0 };
}

function CreateEmptyExamination(): Examination {
  return { code: "", name: "", date: "", hp: 0, grade: 0 };
}

function ParseGrade(line: string): number | string {
  const grade = line.slice(-1);
  return isNaN(Number(grade)) ? grade : Number(grade);
}

function ParseHP(line: string): number {
  const match = line.match(/(\d+,\d+)hp/);
  return match ? parseFloat(match[1].replace(",", ".")) : 0;
}

function PassedCourseParsing(line: string, notNormalFormatting: boolean): Course {
  let currentCourse: Course = CreateEmptyCourse();

  currentCourse.code = line.slice(0, 6).trim();
  line = line.slice(6);

  const numberRegex = /\d/;

  if (!numberRegex.test(line)) {
    currentCourse.name = line;
    notNormalFormatting = true;
    return currentCourse;
  }

  return currentCourse;
}

function PassedExaminationParsing(line: string): Examination {
  let exam: Examination = CreateEmptyExamination();

  return exam;
}
