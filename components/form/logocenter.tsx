import { Azeret_Mono } from "next/font/google";
import MainIcon from "../mainicon";

const azeret_mono = Azeret_Mono({ subsets: ["latin"] });

/**
 * Centered logo component with an icon and text
 * 
 * @remarks
 * This component displays a centered logo with an icon and the text "Portalen".
 * The text uses the `Azeret_Mono` font, and the layout is centered with a gap between the icon and text.
 * 
 * @returns Returns a centered logo consisting of an icon and the text "Portalen"
 */

export default function LogoCenter() {
  return (
    <>
      <div className="flex w-full justify-center items-center gap-4 py-4">
        <MainIcon className="w-7 h-7" />
        <p className={`${azeret_mono.className} font-medium text-3xl`}>
          Portalen
        </p>
      </div>
    </>
  );
}
