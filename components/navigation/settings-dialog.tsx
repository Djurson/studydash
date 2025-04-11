"use client";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  //behövs för att temat inte ska ändras vid byte av sida
  useEffect(() => {
// kollar om det finns sparat temea
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
 
    const initialDarkMode = savedTheme 
      ? savedTheme === 'dark' 
      : systemPrefersDark;
    
    setIsDarkMode(initialDarkMode);
    applyTheme(initialDarkMode);
  }, []);

  const applyTheme = (darkMode: boolean) => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem('theme', 'light');
    }
  };

  const handleThemeChange = (checked: boolean) => {
    setIsDarkMode(checked);
    applyTheme(checked);
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
            checked={isDarkMode} 
            onCheckedChange={handleThemeChange} 
          />
        </div>

        <DialogClose className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" />
      </DialogContent>
    </Dialog>
  );
}