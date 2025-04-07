import { ComponentProps } from "react";
import { Button } from "../ui/button";

type variant = "default" | "outline";

export function UserAuthActionButton({ children, ...props }: ComponentProps<typeof Button>) {
    return (
        <Button
            className={`px-6 py-5 font-medium border-2 rounded-md flex-1 text-base
            bg-gray-900 text-white-400 border-gray-900 
            transition ease-in-out hover:shadow-xl hover:shadow-gray-900/25 duration-400 hover:cursor-pointer hover:border-gray-900 hover:text-gray-900 hover:bg-background
            ${props.className}`}
            {...props}>
            {children}
        </Button>
    )
}