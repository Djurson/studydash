import { User } from "@supabase/supabase-js";

export type Examination = {
  code: string;
  name: string;
  hp: number;
  grade: number | string;
  date: string;
};

export type Course = {
  code: string;
  name: string;
  hp: number;
  grade: number | string;
  date: string;
  examinations: Map<string, Examination>;
};

export type CourseJSON = {
  name: string;
  course_code: string;
  credits: string;
  VOF: string;
  examinations: ExaminationJSON[];
};

export type ExaminationJSON = {
  code: string;
  name: string;
  credits: string;
  grading: string;
};

export type UserDataTableRow = {
  user_id: string;
  studyinfo: string; // JSON-sträng i databasen
  studyyear: string;
  university: string;
  program: string;
  previousfunds: boolean;
};

export type UserData = Omit<UserDataTableRow, "user_id" | "studyinfo"> & {
  studyinfo: Map<string, Course>; // konverterad version i appen
  sortedDateMap?: Map<number, Examination[]>;
  meritGradeMap?: Map<number, Course[]>;
};

export type WithAuthProps = {
  user: User;
  userData?: UserData;
};

export type CreditsChartObject = {
  date: string;
  name: string;
  credits: number;
};
