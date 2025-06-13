import pandas as pd
import json
from collections import defaultdict
from bs4 import BeautifulSoup
import re

# Function 1: Parse course overview HTML
def parse_overview(html_content):
    overview = {
        "main_subject": "",
        "education_level": "",
        "course_type": "",
        "examiner": "",
        "study_director": "",
        "scheduled_hours": "",
        "self_study_hours": ""
    }

    if not html_content:
        return overview

    soup = BeautifulSoup(html_content, 'html.parser')
    labels = soup.find_all('h2', class_='overview-label')

    for label in labels:
        label_text = label.get_text(strip=True)
        next_node = label.next_sibling

        value = []
        while next_node and next_node.name != 'h2':
            if getattr(next_node, 'name', None) == 'br':
                break
            if isinstance(next_node, str) and next_node.strip():
                value.append(next_node.strip())
            next_node = next_node.next_sibling

        value_text = ' '.join(value).strip()

        if label_text == "Huvudområde":
            overview["main_subject"] = value_text.replace(' ', ', ')
        elif label_text == "Utbildningsnivå":
            overview["education_level"] = value_text
        elif label_text == "Kurstyp":
            overview["course_type"] = value_text
        elif label_text == "Examinator":
            overview["examiner"] = value_text
        elif label_text == "Studierektor eller motsvarande":
            overview["study_director"] = value_text
        elif label_text == "Undervisningstid":
            hours_text = ' '.join(soup.stripped_strings)
            scheduled_match = re.search(r'Preliminär schemalagd tid: (\d+ h)', hours_text)
            self_study_match = re.search(r'Rekommenderad självstudietid: (\d+ h)', hours_text)

            if scheduled_match:
                overview["scheduled_hours"] = scheduled_match.group(1)
            if self_study_match:
                overview["self_study_hours"] = self_study_match.group(1)

    return overview

# Function 2: Parse course plan HTML
def parse_course_plan(html_content):
    course_plan = {
        "learning_objectives": "",
        "course_content": "",
        "teaching_methods": "",
        "grade_scale": "",
        "institution": ""
    }

    if not html_content:
        return course_plan

    soup = BeautifulSoup(html_content, 'html.parser')

    def get_section_text(header_text):
        header = soup.find('h2', string=header_text)
        if not header:
            return ""

        content = []
        next_node = header.next_sibling
        while next_node and next_node.name != 'h2':
            if isinstance(next_node, str) and next_node.strip():
                content.append(next_node.strip())
            elif next_node.name == 'p':
                content.append(next_node.get_text(strip=True))
            elif next_node.name == 'ul':
                for li in next_node.find_all('li'):
                    content.append(li.get_text(strip=True))
            next_node = next_node.next_sibling

        return ' '.join(content).strip()

    course_plan["learning_objectives"] = get_section_text("Lärandemål")
    course_plan["course_content"] = get_section_text("Kursinnehåll")
    course_plan["teaching_methods"] = get_section_text("Undervisnings- och arbetsformer")
    course_plan["grade_scale"] = get_section_text("Betygsskala")
    course_plan["institution"] = get_section_text("Institution")

    return course_plan

# Function 3: Parse course literature HTML
def parse_literature(html_content):
    literature = []

    if not html_content or not isinstance(html_content, str) or html_content.strip() == "":
        return literature

    soup = BeautifulSoup(html_content, 'html.parser')
    sections = soup.find_all('div', class_='course-literature-section')

    for section in sections:
        type_header = section.find('h2')
        if not type_header:
            continue

        literature_type = type_header.get_text(strip=True)
        rows = section.find_all('div', class_='course-literature-row')

        for row in rows:
            entry = {"type": literature_type}
            text_parts = [part for part in row.stripped_strings]

            if literature_type == "Böcker" and len(text_parts) >= 3:
                entry["authors"] = text_parts[0].rstrip(',')
                title_tag = row.find('i')
                if title_tag:
                    entry["title"] = title_tag.get_text(strip=True)
                remaining_text = ' '.join(text_parts[1:])
                if "Kap" in remaining_text:
                    parts = remaining_text.split("Kap")
                    entry["edition"] = parts[0].strip()
                    entry["chapters"] = f"Kap{parts[1].strip()}"
                else:
                    entry["edition"] = remaining_text.strip()
            else:
                entry["title"] = ' '.join(text_parts)

            literature.append(entry)

    return literature
# Main function: Convert XLSX to JSON
def parse_xlsx_to_json(xlsx_filename, json_filename):
    df = pd.read_excel(xlsx_filename)
    structured_data = defaultdict(lambda: defaultdict(lambda: defaultdict(lambda: {
        "name": "",
        "course_code": "",
        "credits": "",
        "VOF": "",
        "url": "",
        "overview": {},
        "course_plan": {},
        "examinations": [],
        "literature": []
    })))

    all_rows = df.to_dict(orient="records")

    for row in reversed(all_rows):
        program_name = row['Program']
        term_name = row['Termin']
        course_key = row['Kurskod']

        course = structured_data[program_name][term_name][course_key]
        course_name, course_credits = [part.strip() for part in row["Kurs"].split(',', 1)]
        course["name"] = course_name
        course["course_code"] = row["Kurskod"]
        course["credits"] = course_credits
        course["VOF"] = row["VOF"]
        course["url"] = row["Kurslank-href"]

        if row.get("Oversikt"):
            course["overview"] = parse_overview(row["Oversikt"])

        if row.get("Kursplan"):
            course["course_plan"] = parse_course_plan(row["Kursplan"])

        if row.get("Kod") and row.get("Benamning"):
            exam_entry = {
                "code": row["Kod"],
                "name": row["Benamning"],
                "credits": row["Omfattning"],
                "grading": row["Betygskala"]
            }
            if exam_entry not in course["examinations"]:
                course["examinations"].append(exam_entry)

        if row.get("Kurslitteratur"):
            lit_entries = parse_literature(row["Kurslitteratur"])
            for entry in lit_entries:
                if entry not in course["literature"]:
                    course["literature"].append(entry)

    final_structure = {
        "programs": []
    }

    for program_name, terms in structured_data.items():
        name_part, credits_part = [part.strip() for part in program_name.split(',', 1)]
        program_data = {
            "name": name_part,
            "credits": credits_part,
            "url": row["web-scraper-start-url"],
            "semesters": []
        }

        def sort_terms(term_name):
            try:
                if "Termin" in term_name:
                    parts = term_name.split()
                    term_num = int(parts[1])
                    year = int(parts[3])
                    return (year, 0 if "VT" in term_name else 1, term_num)
                elif term_name.isdigit():
                    return (int(term_name), 0, 0)
                return (0, 0, 0)
            except:
                return (0, 0, 0)

        sorted_terms = sorted(terms.items(), key=lambda x: sort_terms(x[0]))

        for term_name, courses in sorted_terms:
            term_data = {
                "name": term_name,
                "courses": list(courses.values())
            }
            program_data["semesters"].append(term_data)

        final_structure["programs"].append(program_data)

    with open(json_filename, mode='w', encoding='utf-8') as json_file:
        json.dump(final_structure, json_file, indent=4, ensure_ascii=False)

# Run script
xlsx_filename = "6CIEN-ED.xlsx"  # Replace with your file
json_filename = "structured_courses_from_xlsx.json"
parse_xlsx_to_json(xlsx_filename, json_filename)

