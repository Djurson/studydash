export type Status = "done" | "ongoing" | "error" | "added" | "deleted" | "changed" | "none";
import { cn } from "@/lib/utils";
import { Minus, Check, Dot, Plus } from "lucide-react";

export function StatusSquare({ status, defaultStatus = "none", className }: { status?: Status; defaultStatus?: "none"; className?: string }) {
  const currentStatus = status ?? defaultStatus;
  const baseStyles = "rounded-sm h-4 w-4 flex items-center justify-center border-1";

  const statusStyles = {
    none: "h-4 w-4 border-foreground bg-transparent",
    done: "h-4 w-4 border-green-900 bg-green-900 text-primary-foreground",
    ongoing: "h-4 w-4 border-yellow-500 bg-yellow-900 text-yellow-foreground",
    error: "h-4 w-4 border-red-900 bg-transparent text-red-900 text-xs",
    added: "h-[1.188rem] w-[1.188rem] border-green-900 bg-transparent text-primary-foreground",
    changed: "h-[1.188rem] w-[1.188rem] border-yellow-500 bg-transparent text-yellow-foreground",
    deleted: "h-[1.188rem] w-[1.188rem] border-red-900 bg-transparent text-red-900 text-xs",
  };

  const statusContent = {
    none: null,
    done: <Check color="white" />,
    ongoing: <Minus color="white" />,
    error: <p className="leading-none">!</p>,
    added: <Plus color="#529839" />,
    changed: <Dot color="#f8ab5e" />,
    deleted: <Minus color="#f36961" />,
  };

  return (
    <div className="flex">
      <div className={cn(baseStyles, statusStyles[currentStatus], className)}>{statusContent[currentStatus]}</div>
    </div>
  );
}
