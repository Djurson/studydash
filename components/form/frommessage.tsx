import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export type Message =
    | { success: string }
    | { error: string }
    | { message: string };

/**
* Form message component to display success, error, or informational messages
* 
* @remarks
* This component renders an alert with different styles based on the type of message.
* It can display a success, error, or general message using the provided message prop.
* 
* @param message - A message object that can contain either a success, error, or general message
* 
* @returns Returns an alert with an appropriate icon and message based on the type
*/

export async function FormMessage({ message }: { message: Message }) {
    return (
        <>
            {"success" in message && (
                <Alert variant="default" >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Lyckades</AlertTitle>
                    <AlertDescription>
                        {message.success}
                    </AlertDescription>
                </Alert >
            )}
            {"error" in message && (
                <Alert variant="destructive" >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Fel</AlertTitle>
                    <AlertDescription>
                        {message.error}
                    </AlertDescription>
                </Alert >
            )}
            {"message" in message && (
                <Alert variant="default" >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Meddelande</AlertTitle>
                    <AlertDescription>
                        {message.message}
                    </AlertDescription>
                </Alert >
            )}
        </>
    )
}