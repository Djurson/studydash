import pandas as pd
import json

# Ladda Excel-filen
excel_fil = "pagin.xlsx"  # Uppdatera med rätt filnamn
df = pd.read_excel(excel_fil)

# Extrahera kurskoder (före "/") från kolumnen där kursen finns
df['kod'] = df['Utbkod'].apply(lambda x: x.split('/')[0] if isinstance(x, str) else None)

# Ladda JSON-filen
json_fil = "data_processed.json"  # Uppdatera med rätt filnamn
with open(json_fil, "r", encoding="utf-8") as f:
    kurs_data = json.load(f)

# Funktion för att hitta kursinfo i JSON-strukturen
def hitta_kurs_info(kurskod, data):
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, dict) and "Kurs" in value and value["Kurs"] == kurskod:
                return value
            else:
                resultat = hitta_kurs_info(kurskod, value)
                if resultat:
                    return resultat
    return None

# Hitta alla matchande kurser
matchade_kurser = []
for kurskod in df['kod'].dropna().unique():
    info = hitta_kurs_info(kurskod, kurs_data)
    if info:
        # Lägg till endast raden från Excel
        matchade_kurser.append(df[df['kod'] == kurskod])

# Kombinera alla matchade kurser till en enda DataFrame
resultat_df = pd.concat(matchade_kurser, ignore_index=True)

# Ta bort de första tre kolumnerna: 'web-scraper-order', 'web-scraper-start-url', 'Pagin'
resultat_df = resultat_df.drop(columns=['web-scraper-order', 'web-scraper-start-url', 'Pagin'])

# Skriv resultatet till en ny Excel-fil (utan de tre kolumnerna)
resultat_fil = "matchade_kurser.xlsx"
resultat_df.to_excel(resultat_fil, index=False)

print(f"Matchade kurser har skrivits till {resultat_fil}")
