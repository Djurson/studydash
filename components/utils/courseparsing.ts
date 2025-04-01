import { Course, Examination } from "./types";

export async function ParseCourses(data: string): Promise<Array<Object>> {
  return await ExtractCourses(data);
}

async function ExtractCourses(text: string): Promise<Array<Object>> {
  let currentCourse: Course = CreateEmptyCourse();
  let courses: Course[] = [];

  const textSplit = text.split(/\r?\n/);

  const courseRegex = /^[A-Z]{3}\d{3}/; // Example: "TNA001"
  const examinationRegex = /^[A-Z]{3}\d{1}/; // Example: "TEN1"

  let notNormalFormatting = false;
  let unfinishedCourses = false;
  for (let line of textSplit) {
    if (line === "Delar i ej avslutade kurser") {
      unfinishedCourses = true;
      continue;
    }
    if (!notNormalFormatting && !courseRegex.test(line) && !examinationRegex.test(line)) continue;

    if (courseRegex.test(line)) {
      PassedCourseParsing(line, notNormalFormatting);
      continue;
    }

    if (examinationRegex.test(line)) {
      PassedExaminationParsing(line, notNormalFormatting);
    }

    if (!unfinishedCourses) continue;
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

  const pattern = /([A-Z]{3}\d{3})(.+?)(\d+,\d+)hp(\d)(\d{4}-\d{2}-\d{2})(\d)/;

  const match = line.match(pattern);
  if (match) {
    currentCourse.code = match[1];
    currentCourse.name = match[2].trim();
    currentCourse.hp = parseFloat(match[3].replace(",", ".")); // Byter , till . och gör om till number
    currentCourse.grade = /^\d$/.test(match[4]) ? parseInt(match[4], 10) : match[4];
    currentCourse.date = match[5];
  }
  return currentCourse;
}

function PassedExaminationParsing(line: string, notNormalFormatting: boolean): Examination {
  let exam: Examination = CreateEmptyExamination();

  return exam;
}
