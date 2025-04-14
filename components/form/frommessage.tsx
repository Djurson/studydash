import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export type Message = { success: string } | { error: string } | { message: string };

/**
 * Formulärmeddelande-komponent för att visa lyckade, felaktiga eller informativa meddelanden.
 *
 * @description
 * Denna komponent visar en alert med olika stilar beroende på typen av meddelande.
 * Den kan visa ett lyckat meddelande, ett felmeddelande eller ett allmänt meddelande baserat på det objekt som skickas in som prop.
 *
 * @param message - Ett meddelandeobjekt som kan innehålla antingen en success-, error- eller message-sträng.
 *
 * @returns Returnerar en alert med en ikon och text anpassad efter typen av meddelande.
 */
export async function FormMessage({ message }: { message: Message }) {
  return (
    <>
      {"success" in message && (
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Lyckades</AlertTitle>
          <AlertDescription>{message.success}</AlertDescription>
        </Alert>
      )}
      {"error" in message && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Fel</AlertTitle>
          <AlertDescription>{message.error}</AlertDescription>
        </Alert>
      )}
      {"message" in message && (
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Meddelande</AlertTitle>
          <AlertDescription>{message.message}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
