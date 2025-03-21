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

type AlertPopupWindowProps = {
    defaultOpen?: boolean;
    title: string;
    description: string;
    actiontext: string;
    actionlink?: string;
}

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