import { ComponentProps } from "react";
import { Input } from "../ui/input";

/**
 * Anpassat inputfält med egna stilar
 *
 * @description
 * Denna komponent utökar `Input`-komponenten med ytterligare stilar för inmatningsfältet.
 * Den tillåter anpassning via `className` och andra props som skickas vidare till `Input`-komponenten.
 *
 * @param props - Ytterligare egenskaper som skickas till `Input`-komponenten, inklusive className och event handlers
 *
 * @returns Returnerar ett inmatningsfält med anpassade stilar och platshållartext
 */
export default function InputField({ ...props }: ComponentProps<typeof Input>) {
  return <Input className={`${props.className} flex flex-1 bg-white !important text-base! border-gray-100 py-3 px-4 placeholder:text-gray-600 text-gray-900`} {...props} />;
}
