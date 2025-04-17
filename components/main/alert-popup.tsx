import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { Info } from "lucide-react";
import { useAuth } from "../supabase/authprovider";
import { createClient } from "@/utils/supabase/client";

type AlertPopupWindowProps = {
  open?: boolean;
  title: string;
  description: string;
  actiontext: string;
  actionlink?: string;
};

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

export default function AlertPopupWindow({ ...props }: AlertPopupWindowProps) {
  const supabase = createClient();
  return (
    <>
      <AlertDialog open={props.open ?? false}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex gap-2 items-center">
              <Info className="stroke-red-900 stroke-2 size-4" />
              {props.title}
            </AlertDialogTitle>
            <AlertDialogDescription>{props.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:text-red-900 transition duration-300 ease-in-out" onClick={() => supabase.auth.signOut}>
              Logga ut
            </AlertDialogCancel>
            <Link href={props.actionlink ?? ""}>
              <AlertDialogAction className="bg-foreground hover:bg-muted transition duration-300 ease-in-out">{props.actiontext}</AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
