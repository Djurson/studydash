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
