// Skapa konto (email) struktur
export type CreateUser = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  repeatpassword: string;
};

// Generell skapa konto info
export type UserInputDB = {
  year: string;
  previous: boolean;
};

// Database struktur
export type UserDB = {
  displayname: string;
  email: string;
  year: string;
  previous: boolean;
};

// Login Struktur
export type UserLogin = {
  email: string;
  password: string;
};

export enum UserTypesEnum {
  NORMAL = "normal",
  PRO = "pro",
}

export type UserType = {
  verified: boolean;
  userRole: UserTypesEnum;
};

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
  examinations: Examination[];
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
