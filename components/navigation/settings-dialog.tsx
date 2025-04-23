"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { useTheme } from "next-themes";
import { ThemeSwitcher } from "@/components/supabase-template/theme-switcher";

interface SettingsDialogProps {
  children: React.ReactNode;
}

export function SettingsDialog({ children }: SettingsDialogProps) {
  const { theme } = useTheme(); // We only need theme for display purposes
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Inställningar</DialogTitle>
          <DialogDescription>Här kan du justera dina preferenser och kontoinställningar.</DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm">Tema</span>
          <ThemeSwitcher /> {/* Replaced the Switch with your ThemeSwitcher */}
        </div>

        <DialogClose className="absolute top-4 right-4" />
      </DialogContent>
    </Dialog>
  );
}
