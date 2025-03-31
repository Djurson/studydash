import { Course, Examination } from "./types";

export async function ParseCourses(data: string): Promise<Array<Object>> {
  const splitCourses = SplitText(data);

  return splitCourses;
}

async function SplitText(text: string): Promise<Array<Object>> {
  const normalizedText = text.replace(/\r\n|\r/g, "\n");

  // Dela upp texten i rader
  const lines = normalizedText.split("\n");

  const courseRegex = /^[A-Z]{3}\d{3}/; // Matchar kurskod (3 bokstäver + 3 siffror)
  const examRegex = /^[A-Z]{3}\d{1}/;

  let currentCourse: Course = CreateEmptyCourse();
  let courses: Course[] = [];

  for (let line of lines) {
    if (!courseRegex.test(line) || !examRegex.test(line)) {
      if (currentCourse.code !== "") {
        courses.push(currentCourse);
      }

      continue;
    }

    line = line.slice(0, -1).trim();

    if (courseRegex.test(line)) {
      currentCourse = CourseParsing(line);
    }

    if (examRegex.test(line)) {
      currentCourse.examinations.push(CourseParsing(line));
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

function CourseParsing(line: string): Course {
  let currentCourse: Course = CreateEmptyCourse();

  currentCourse.code = line.slice(0, 6);
  line = line.slice(6).trim();

  currentCourse.date = line.slice(-10);
  line = line.slice(0, -10).trim();

  currentCourse.grade = ParseGrade(line);
  line = line.slice(0, -1).trim();

  currentCourse.hp = ParseHP(line);
  line = line.replace(/(\d+,\d+)hp/, "").trim();

  currentCourse.name = line;

  return currentCourse;
}

function ExaminationParsing(line: string): Examination {
  let exam: Examination = CreateEmptyExamination();

  exam.code = line.slice(0, 4);
  line = line.slice(4).trim();

  exam.date = line.slice(-10);
  line = line.slice(0, -10).trim();

  exam.grade = ParseGrade(line);
  line = line.slice(0, -1).trim();

  exam.hp = ParseHP(line);
  line = line.replace(/(\d+,\d+)hp/, "").trim();

  exam.name = line;

  return exam;
}
