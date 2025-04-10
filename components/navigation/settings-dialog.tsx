"use client";

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
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Inställningar</DialogTitle>
          <DialogDescription>
            Här kan du justera dina preferenser och kontoinställningar.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-2">
          {/* Example setting placeholder */}
          <p className="text-sm text-muted-foreground">
            Här kommer dina inställningar att visas.
          </p>
        </div>
        <DialogClose className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
