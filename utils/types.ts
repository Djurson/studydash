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
