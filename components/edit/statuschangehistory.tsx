export type Status = "added" | "deleted" | "changed" | "none";
import { cn } from "@/lib/utils";
import { Minus, Plus, Dot } from "lucide-react";

export function StatusChangeHistory({ status, defaultStatus = "none", className }: { status?: Status; defaultStatus?: "none"; className?: string }) {
  const currentStatus = status ?? defaultStatus;
  const baseStyles = "rounded-sm h-[1.188rem] w-[1.188rem] flex items-center justify-center border-1";

  const statusStyles = {
    none: "border-foreground bg-transparent",
    added: "border-green-900 bg-transparent text-primary-foreground",
    changed: "border-yellow-500 bg-transparent text-yellow-foreground",
    deleted: "border-red-900 bg-transparent text-red-900 text-xs",
  };

  const statusContent = {
    none: null,
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
