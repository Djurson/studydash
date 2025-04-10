"use client";
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

interface SettingsDialogProps {
  children: React.ReactNode;
}

export function SettingsDialog({ children }: SettingsDialogProps) {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inställningar</DialogTitle>
            <DialogDescription>
              Här kan du justera dina preferenser och kontoinställningar.
            </DialogDescription>
          </DialogHeader>
  
          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm">Mörkt läge</span>
            <Switch />
          </div>
  
          <DialogClose className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
  }

