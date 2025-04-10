import pandas as pd
import json

# Ladda Excel-filen
excel_fil = "matchade_kurser.xlsx"  # Uppdatera med rätt filnamn
df = pd.read_excel(excel_fil)

# Skapa en struktur för JSON-formatet
kurs_structure = {}

# Loop genom varje rad i Excel-filen för att samla information
for _, row in df.iterrows():
    utbkod = row['Utbkod']

    # Kontrollera om 'Utbkod' är en sträng och om den har ett '/'
    if isinstance(utbkod, str) and '/' in utbkod:
        # Dela 'Utbkod' för att få kurskod och moment
        kurskod = utbkod.split('/')[0]
        moment = utbkod.split('/')[1]
        datum = row['Datum']
        start_tid = row['Start']
        slut_tid = row['Slut']
        
        # Om kursen inte finns i kurs_structure, skapa den
        if kurskod not in kurs_structure:
            kurs_structure[kurskod] = {}

        # Om momentet inte finns för denna kurs, skapa det
        if moment not in kurs_structure[kurskod]:
            kurs_structure[kurskod][moment] = []

        # Lägg till datum och tid i momentet
        kurs_structure[kurskod][moment].append({
            'datum': datum,
            'tid': f"{start_tid}-{slut_tid}"
        })

# Skriv den strukturerade data till en JSON-fil
json_output_fil = "matchade_kurser.json"
with open(json_output_fil, "w", encoding="utf-8") as f:
    json.dump(kurs_structure, f, indent=4, ensure_ascii=False)

print(f"Matchade kurser har skrivits till {json_output_fil}")

