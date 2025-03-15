interface InputfieldProps {
    type?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    onchange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    classname?: string;
}

export default function InputField({ type, name, placeholder, value, onchange, classname }: InputfieldProps) {
    return (
        <input
            className={`flex-1 outline-none bg-white border-2 border-gray-100 text-regular py-3 px-4 placeholder:text-gray-600 rounded-sm text-gray-900 ${classname}`}
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={onchange}
        />
    )
}