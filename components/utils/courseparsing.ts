import { Course, Examination } from "./types";

export async function ParseCourses(data: string): Promise<Array<Object>> {
  return await ExtractCourses(data);
}

async function ExtractCourses(text: string): Promise<Array<Object>> {
  let currentCourse: Course = CreateEmptyCourse();
  let courses: Course[] = [];

  const textSplit = text.split(/\r?\n/);

  const courseRegex = /^[A-Z]{3,4}\d{2,3}/; // Exempel TNA001, TFYA65
  const examinationRegex = /^[A-Z]{3}\d{1}/; // Example: "TEN1"

  let boolObj = { formatCourse: false, formatExam: false };
  for (let line of textSplit) {
    if (boolObj.formatCourse) {
    }

    if (boolObj.formatExam) {
      HandleExaminationFormatting(line, boolObj, currentCourse);
    }

    if (courseRegex.test(line)) {
      if (currentCourse.code) {
        courses.push(currentCourse);
        currentCourse = CreateEmptyCourse();
      }
      currentCourse = PassedCourseParsing(line, boolObj);
      continue;
    }

    if (examinationRegex.test(line)) {
      currentCourse.examinations.push(PassedExaminationParsing(line, boolObj));
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

function ParseGrade(grade: string): number | string {
  return isNaN(Number(grade)) ? grade : Number(grade);
}

function ParseHP(line: string): number {
  const match = line.match(/(\d+,\d+)hp/);
  return match ? parseFloat(match[1].replace(",", ".")) : 0;
}

/** Framtida jag kommer hata mig själv, men....:
 * @param line - strängen som ska parsats från pdf filen
 * @param notNormalFormatting - om den inte är normal formatering eller inte
 * @returns - en kurs med alla dess "grund" egenskaper
 */
function PassedCourseParsing(line: string, { formatCourse }: { formatCourse: boolean }): Course {
  let currentCourse: Course = CreateEmptyCourse();
  let unfinishedCourses = false;

  const courseRegex = /^[A-Z]{3,4}\d{2,3}/;
  const match = line.match(courseRegex);
  if (match) {
    currentCourse.code = match[0];
    line = line.replace(currentCourse.code, "");
  }

  if (line.includes("(")) {
    line = line.replace("(", "");
    line = line.replace(")", "");
    currentCourse.grade = "pågående";
    unfinishedCourses = true;
  }

  const indexOfHp = line.indexOf("hp");

  if (indexOfHp === -1) {
    currentCourse.name = line.trim();
    formatCourse = true;
    return currentCourse;
  }
  currentCourse.name = line.slice(0, indexOfHp - 3).trim();
  line = line.replace(currentCourse.name, "");

  currentCourse.hp = ParseHP(line);
  line = line.slice(5);

  if (!unfinishedCourses) {
    currentCourse.grade = ParseGrade(line[0]);
    line = line.slice(1);

    currentCourse.date = line.slice(0, 10);
  }

  return currentCourse;
}

function PassedExaminationParsing(line: string, { formatExam }: { formatExam: boolean }): Examination {
  let exam: Examination = CreateEmptyExamination();

  const pattern = /([A-Z]{3}\d)(.+?)\(\s*(\d+,\d+)hp\s*\)(\d|[A-Za-z])(\d{4}-\d{2}-\d{2})(\d)/;
  const match = line.match(pattern);
  if (match) {
    exam.code = match[1];
    exam.name = match[2].trim();
    exam.hp = parseFloat(match[3].replace(",", ".")); // Byter , till . och gör om till number
    exam.grade = /^\d$/.test(match[4]) ? parseInt(match[4], 10) : match[4];
    exam.date = match[5];
    return exam;
  }
  const courseRegex = /^[A-Z]{3}\d{1}/;
  const match2 = line.match(courseRegex);

  if (match2) {
    exam.code = match2[0];
    line = line.replace(exam.code, "");
  }

  exam.name = line;

  formatExam = true;
  return exam;
}

function HandleExaminationFormatting(line: string, { formatExam }: { formatExam: boolean }, currentExam: Examination): Examination {
  let exam = currentExam;
  let finishedCourse = false;

  const indexOfHp = line.indexOf("hp");

  if (indexOfHp === -1) {
    exam.name += line;
    return exam;
  }

  if (line.includes("(")) {
    line = line.replace("( ", "");
    line = line.replace(" )", "");
    finishedCourse = true;
  }

  exam.hp = ParseHP(line);
  line = line.slice(5);

  exam.grade = ParseGrade(line[0]);
  line = line.slice(1);

  exam.date = line.slice(0, 10);

  formatExam = false;

  return exam;
}
