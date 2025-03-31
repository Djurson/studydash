import { ComponentProps } from "react";
import { Input } from "../ui/input";

/**
 * Custom input field component with custom styles
 * 
 * @remarks
 * This component extends the `Input` component with additional styles for the input field.
 * It allows for customization through the `className` and other props passed to the `Input` component.
 * 
 * @param props - Additional props passed to the `Input` component, including className and event handlers
 * 
 * @returns Returns an input field with custom styles and placeholder text
 */

export default function InputField({ ...props }: ComponentProps<typeof Input>) {
    return (
        <>
            <Input className={`${props.className} flex flex-1 bg-white !important text-base! border-gray-100 py-3 px-4 placeholder:text-gray-600 text-gray-900`} {...props} />
        </>
    )
}