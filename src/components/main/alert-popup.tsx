import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"

export default function AlertPopupWindow() {
    return (
        <>
            <AlertDialog defaultOpen>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Ingen kursinfo?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Vi kan inte hitta någon studieinformation kopplat till ditt konto? Denna tjänst baseras på att du laddar upp ett ladok resultatintyg eller
                            manuellt fyller i kurser och examinationsmoment. Har du redan fyllt i din kursinformation? Vänligen välj rapportera ett fel.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>Fyll i kursinformation</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog >
        </>
    )
}