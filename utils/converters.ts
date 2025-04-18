import { Course, Examination } from "./types";

export const jsonToStudyResults = (json: string): Map<string, Course> => {
  const parsed = JSON.parse(json);

  return new Map(
    Object.entries(parsed).map(([key, courseObj]: [string, any]) => [
      key,
      {
        ...courseObj,
        examinations: new Map<string, Examination>(Object.entries(courseObj.examinations)),
      },
    ])
  );
};
