export type Semester = 'HT' | 'VT';

export interface SemesterInfo {
  semester: Semester;
  year: number;
  fullString: string;
}

export function generateAllSemesters(startSemester: string): SemesterInfo[] {
  const [startSeason, startYearStr] = startSemester.split(' ');
  const startYear = parseInt(startYearStr);
  
  // Ckeck so the semester string is valid 
  if (!['HT', 'VT'].includes(startSeason)) {
    throw new Error('Invalid semester format. Must start with HT or VT');
  }
  if (isNaN(startYear)) {
    throw new Error('Invalid year in semester string');
  }

  const result: SemesterInfo[] = [];
  let currentYear = startYear;
  let currentSeason = startSeason as Semester;

  // Generate the next 10 semesters
  for (let i = 0; i < 10; i++) {
    result.push({
      semester: currentSeason,
      year: currentYear,
      fullString: `${currentSeason} ${currentYear}`
    });

    // Increment the semester
    if (currentSeason === 'HT') {
      currentSeason = 'VT';
      currentYear++;
    } else {
      currentSeason = 'HT';
    }
  }

  return result;
}

// Types of return values
export function getSemestersInRange(start: string, from: number, to: number) {
  const all = generateAllSemesters(start);
  return all.slice(from - 1, to);
}