"use client";
import { ComponentProps } from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

/**
 * Form button component with loading indicator
 * 
 * @remarks
 * This component renders a button with custom styles and displays a loading spinner
 * when the form is in a pending state.
 * It uses `useFormStatus` to track the form submission state.
 * 
 * @param children - The content of the button, usually text or icons
 * @param props - Additional props passed to the `Button` component
 * 
 * @returns Returns a button with custom styles, showing a loading indicator when pending
 */

export default function FormButton({ children, ...props }: ComponentProps<typeof Button>) {
    const { pending } = useFormStatus();
    return (
        <>
            <Button {...props} className={`${props.className} flex-1 gap-3 text-base font-bold py-3 cursor-pointer bg-blue-900 hover:bg-blue-400
            disabled:bg-blue-100 disabled:text-blue-400`}
                aria-disabled={pending}>
                {children}
            </Button>
            {pending && (
                <div className="w-full h-screen absolute bg-gray-600/20 top-0 left-0 flex justify-center items-center backdrop-blur-md">
                    <svg className="w-12 h-12 text-white animate-spin" viewBox="0 0 64 64" fill="none"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <path className="stroke-gray-600/20"
                            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                            strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path
                            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                            strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-background stroke-background">
                        </path>
                    </svg>
                </div>
            )}
        </>
    )
}