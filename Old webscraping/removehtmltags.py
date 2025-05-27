import json
import re
import os

def remove_html_tags(text):
    if isinstance(text, str):
        clean = re.sub(r'<[^>]+>', '', text)
        return clean.strip()
    return text

def clean_json(obj):
    if isinstance(obj, dict):
        return {key: clean_json(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [clean_json(element) for element in obj]
    else:
        return remove_html_tags(obj)

def main():
    input_file = "data_processed.json"  # You can change this if needed
    output_file = "data_processed_cleaned.json"

    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            print(f"Loaded data from {input_file}")

        cleaned_data = clean_json(data)

        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(cleaned_data, f, indent=4, ensure_ascii=False)
            print(f"Cleaned JSON written to {output_file}")

    except FileNotFoundError:
        print(f"File '{input_file}' not found. Make sure it's in the same folder.")
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

if __name__ == "__main__":
    main()
