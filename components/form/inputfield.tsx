import { ComponentProps } from "react";
import { Input } from "../ui/input";

export default function InputField({ ...props }: ComponentProps<typeof Input>) {
    return (
        <>
            <Input className={`${props.className} flex flex-1 bg-white !important text-base! border-gray-100 py-3 px-4 placeholder:text-gray-600 text-gray-900`} {...props} />
        </>
    )
}