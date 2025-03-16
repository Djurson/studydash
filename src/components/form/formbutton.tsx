import { ReactNode } from "react";

interface FormButtonProps {
    label: string;
    type?: "button" | "submit" | "reset";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    children?: ReactNode;
    disabled?: boolean;
}

export default function FormButton({ children, label, type, onClick, className, disabled }: FormButtonProps) {
    return (
        <button className={`
            flex flex-1 justify-center items-center gap-3 bg-blue-900 text-white text-base font-bold py-3 rounded-sm hover:cursor-pointer
            disabled:bg-blue-100 disabled:text-blue-400 
            ${className}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
            {label}
        </button>
    )
}