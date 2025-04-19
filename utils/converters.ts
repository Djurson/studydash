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

export const sortMapAndExtractMerit = (map: Map<string, Course>): { sortedDateMap: Map<number, Examination[]>; meritGradeMap: Map<number, Course[]> } => {
  const dateMap = new Map<number, Examination[]>();
  const meritGradeMap = new Map<number, Course[]>();
  [...map.entries()].map(([courseKey, course]) => {
    // Kontrollera om kursen har ett godkänt betyg (3, 4 eller 5)
    if (course.grade && (course.grade === 3 || course.grade === 4 || course.grade === 5)) {
      // Lägg till kursen i meritGradeMap
      if (!meritGradeMap.has(course.grade)) {
        meritGradeMap.set(course.grade, []);
      }
      meritGradeMap.get(course.grade)?.push(course);
    }
    [...course.examinations.entries()].map(([examkey, exam]) => {
      // Kolla om det finns ett datum på examinationen
      if (exam.date && exam.date !== "" && exam.hp > 0) {
        // Läs ut exempelvis "202210" ur "20221001"
        let yearmonth = Number.parseInt(exam.date.slice(0, 6));

        if (!dateMap.has(yearmonth)) {
          dateMap.set(yearmonth, []);
        }

        dateMap.get(yearmonth)?.push(exam);
      }
    });
  });

  // Sortera dateMap baserat på årsmånad (från äldst till nyast)
  const sortedEntries = [...dateMap.entries()].sort(([dateA], [dateB]) => dateA - dateB);
  const sortedDateMap = new Map(sortedEntries);

  return { sortedDateMap, meritGradeMap };
};
