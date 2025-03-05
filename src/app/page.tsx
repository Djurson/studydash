import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-2 h-lvh">
      <h1 className="text-5xl font-extrabold text-gray-900 md:text-7xl">Study Dash</h1>
      <h2 className="text-xl font-semibold text-gray-600 md:text-2xl">Effektivisera din studiegång</h2>
      <div className="flex gap-4 mt-4">
        <Link href={'/login'}>
          <button className="px-6 py-2 font-medium bg-gray-900 border-2 border-gray-900 rounded-md text-white-400 hover:shadow-xl hover:shadow-gray-900/25 duration-400 hover:cursor-pointer">Logga in</button>
        </Link>
        <Link href={'/signup'}>
          <button className="px-6 py-2 font-medium text-gray-900 transition ease-in-out border-2 border-gray-600 rounded-md bg-white-400 hover:shadow-xl hover:shadow-gray-900/25 duration-400 hover:cursor-pointer">Skapa konto</button>
        </Link>
      </div>
    </div>
  );
}
