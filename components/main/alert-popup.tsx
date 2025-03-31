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
} from "../ui/alert-dialog"

type AlertPopupWindowProps = {
    defaultOpen?: boolean;
    title: string;
    description: string;
    actiontext: string;
    actionlink?: string;
}

/**
 * Alert popup window component
 * 
 * @remarks
 * This component renders an alert dialog window with a customizable title, description,
 * and action text. It allows for a default open state and an optional action link.
 * 
 * @param defaultOpen - Optional boolean to determine if the dialog is open by default
 * @param title - The title text for the alert dialog
 * @param description - The description text for the alert dialog
 * @param actiontext - The text to display on the action button
 * @param actionlink - Optional URL that the action button can link to
 * 
 * @returns Returns an alert dialog with the specified content and action button
 */


export default function AlertPopupWindow({ defaultOpen, title, description, actiontext, actionlink }: AlertPopupWindowProps) {
    return (
        <>
            <AlertDialog defaultOpen={defaultOpen ?? false}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>{actiontext}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog >
        </>
    )
}