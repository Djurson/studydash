"use client";
import { Switch } from "@/components/ui/switch"
import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";
import React from "react";
import { useEffect, useState } from "react";
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
    const { theme, setTheme } = useTheme();
    const [isDark, setIsDark] = useState(false);
  
    useEffect(() => {
      setIsDark(theme === "dark");
    }, [theme]);
  
    const handleToggle = (checked: boolean) => {
      setIsDark(checked);
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
            <Switch checked={isDark} onCheckedChange={handleToggle} />
          </div>
  
          <DialogClose className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
  }