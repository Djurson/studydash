import pandas as pd
import json

# Read Excel data (replace 'exams.xlsx' with your file path)
df = pd.read_excel('examdate.xlsx')

# Group by course code and exam type
grouped = df.groupby(['Utbkod', 'kod'])

# Prepare the output structure
output = []

for (exam_code, course_code), group in grouped:
    # Get course name (take first occurrence)
    course_name = group['Kursnamn'].iloc[0]
    
    # Prepare exam instances
    instances = []
    for _, row in group.iterrows():
        instances.append({
            'datum': row['Datum'],
            'tid': f"{row['Start']}-{row['Slut']}"
        })
    
    output.append({
        'kurskod': course_code,
        'kursnamn': course_name,
        'examinationsmoment': exam_code.split('/')[1],
        'tillfällen': instances
    })

# Save as JSON
with open('exams_with_names.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print("JSON file created successfully!")