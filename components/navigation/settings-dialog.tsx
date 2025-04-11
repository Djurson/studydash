"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch"; 
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { useTheme } from "next-themes"; 

interface SettingsDialogProps {
  children: React.ReactNode;
}

export function SettingsDialog({ children }: SettingsDialogProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  
  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light"); 
  };

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
          <Switch
            checked={theme === "dark"} 
            onCheckedChange={handleThemeChange} 
          />
        </div>

        <DialogClose className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" />
      </DialogContent>
    </Dialog>
  );
}
