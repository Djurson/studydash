interface FormButtonProps {
    label: string;
    type?: "button" | "submit" | "reset";
    onclick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function FormsButton({ label = "", type = "button", onclick }: FormButtonProps) {
    return (
        <button className="flex flex-1 justify-center bg-blue-900 text-white text-base font-bold py-3" type={type} onClick={onclick}>{label}</button>
    )
}