type Status = "done" | "ongoing" | "error" | "none";
import { cn } from "@/lib/utils";
import { Minus, Check } from "lucide-react";

export function StatusSquare({ status, defaultStatus = "none", className }: { status?: Status; defaultStatus?: "none"; className?: string }) {
    const currentStatus = status ?? defaultStatus;
    const baseStyles = "rounded-sm h-4 w-4 flex items-center justify-center border";

    const statusStyles = {
        none: "border-gray-900 bg-transparent",
        done: "border-green-900 bg-green-900 text-primary-foreground",
        ongoing: "border-yellow-500 bg-yellow-900 text-yellow-foreground",
        error: "border-red-900 bg-transparent text-red-900 text-xs",
    };

    const statusContent = {
        none: null,
        done: <Check color="white" />,
        ongoing: <Minus color="white" />,
        error: <p className="leading-none">!</p>,
    };

    return (
        <div className="flex">
            <div className={cn(baseStyles, statusStyles[currentStatus], className)}>{statusContent[currentStatus]}</div>
        </div>
    );
}