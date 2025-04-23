import { Azeret_Mono } from "next/font/google";
import MainIcon from "../mainicon";

const azeret_mono = Azeret_Mono({ subsets: ["latin"] });

/**
 * Centrerad logotypkomponent med ett ikon och text
 *
 * @description
 * Den här komponenten visar en centrerad logotyp med ett ikon och texten "Portalen".
 * Texten använder typsnittet `Azeret_Mono`, och layouten är centrerad med ett mellanrum mellan ikonen och texten.
 *
 * @returns Returnerar en centrerad logotyp bestående av en ikon och texten "Portalen"
 */
export default function LogoCenter() {
  return (
    <>
      <div className="flex w-full justify-center items-center gap-4 py-4">
        <MainIcon className="w-7 h-7" />
        <p className={`${azeret_mono.className} font-medium text-3xl`}>Portalen</p>
      </div>
    </>
  );
}
