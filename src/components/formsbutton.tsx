import { ReactNode } from "react";

interface FormButtonProps {
    label: string;
    type?: "button" | "submit" | "reset";
    onclick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    classname?: string;
    children?: ReactNode;
}

export default function FormsButton({ children, label, type, onclick, classname }: FormButtonProps) {
    return (
        <button className={`flex flex-1 justify-center items-center gap-3 bg-blue-900 text-white text-base font-bold py-3 rounded-sm hover:cursor-pointer ${classname}`}
            type={type}
            onClick={onclick}
        >
            {children}
            {label}
        </button>
    )
}