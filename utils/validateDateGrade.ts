
interface Examination {
    code: string;
    name: string;
    credits: string;
    grading: string;
  }
  
  export const validateDate = (date: string, programStartDate: string, todayFormatted: string) => {
    if (date.length !== 8) return "Ange giltigt datum (YYYY-MM-DD)";
    if (!/^\d+$/.test(date)) return "Endast siffror tillåtna";
    
    if (date < programStartDate) return "Datum kan inte vara före programmets startdatum";
    if (date > todayFormatted) return "Datum kan inte vara efter dagens datum";
    
    return "";
  };
  
  export const validateGrade = (grade: string, exam: Examination) => {
    if (!grade) return "Betyg krävs";
    
    // Normalize grades by removing any "LiU," prefix and splitting by commas
    const gradingString = exam.grading.replace(/^LiU,\s*/, '');
    const allowedGrades = gradingString.split(/\s*,\s*/).map(g => g.trim());
    
    if (!allowedGrades.includes(grade.toUpperCase())) {
      return `Ange giltigt betyg (${allowedGrades.join(", ")})`;
    }
    
    return "";
  };
  
  // Helper function to format today's date
  export const getTodayFormatted = () => {
    const today = new Date();
    return `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
  };