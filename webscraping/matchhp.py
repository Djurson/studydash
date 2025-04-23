import json

# Load both JSON files
with open('exams_with_names.json', 'r', encoding='utf-8') as f:
    exam_dates = json.load(f)

with open('course_info.json', 'r', encoding='utf-8') as f:
    course_info = json.load(f)

# Create a mapping of course codes to their full information
course_map = {}
for program in course_info['programs']:
    for semester in program['semesters']:
        for course in semester['courses']:
            course_code = course['course_code']
            if course_code not in course_map:
                course_map[course_code] = course

# Add credits to each exam in exam_dates
for exam in exam_dates:
    course_code = exam['kurskod']
    exam_code = exam['examinationsmoment']
    
    if course_code in course_map:
        course = course_map[course_code]
        # Find the matching examination
        for examination in course.get('examinations', []):
            if examination['code'] == exam_code:
                exam['hp'] = examination['credits']
                break
        else:
            # If no matching examination found, use course credits
            exam['hp'] = course['credits']
    else:
        # Fallback if course not found
        exam['hp'] = "N/A"

# Save the enhanced data
with open('exam_dates_with_credits.json', 'w', encoding='utf-8') as f:
    json.dump(exam_dates, f, ensure_ascii=False, indent=2)

print("Enhanced exam data with credits saved successfully!")