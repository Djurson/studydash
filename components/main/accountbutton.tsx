import { ComponentProps } from "react";
import { Button } from "../ui/button";

/**
 * Komponent för landningssidan "Logga in/Skapa konto"
 *
 * @param children - Innehållet i knappen, vanligtvis text eller ikoner
 * @param props - Ytterligare egenskaper som skickas till `Button`-komponenten, såsom className och event handlers
 *
 * @returns Returnerar en stiliserad knapp
 */
export function UserAuthActionButton({ children, ...props }: ComponentProps<typeof Button>) {
  return (
    <Button
      className={`px-6 py-5 font-medium border-2 rounded-md flex-1 text-base
            bg-accent text-foreground border-accent
            transition ease-in-out dark:hover:shadow-md dark:hover:shadow-foreground/5 hover:shadow-foreground/25 hover:shadow-xl hover:accent/25 duration-400 hover:cursor-pointer hover:border-foregroung hover:text-gray-600 hover:bg-background
            ${props.className}`}
      {...props}>
      {children}
    </Button>
  );
}
