import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export type Message =
    | { success: string }
    | { error: string }
    | { message: string };

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