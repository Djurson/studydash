import Title from "@/components/title";
import { LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";

export default async function Page() {
    return (
        <>
            <Title title={"Välkommen tillbaka!"} subtitle={"Logga in på ditt konto här nedan"} />
            <form className="flex flex-col w-full gap-10 mt-12">
                <div className="flex items-center w-full gap-1 px-4 border-2 border-gray-900 justify-evenly rounded-xl">
                    <Mail className="w-6 h-6 text-gray-900" />
                    <input className="w-full px-2 py-4 text-base font-medium text-gray-900 placeholder-gray-600 bg-transparent border-transparent outline-none peer rounded-xl"
                        placeholder="exempel@epost.se"
                        type="text" />
                    <label className="relative px-2 text-base font-medium text-gray-600 -translate-y-1/2 w-23 -top-5 right-4/5 bg-white-400 peer-focus:animate-text-pule">E-post</label>
                </div>
                <div className="flex items-center w-full gap-1 px-4 border-2 border-gray-900 justify-evenly rounded-xl">
                    <LockKeyhole className="w-6 h-6 text-gray-900" />
                    <input className="w-full px-2 py-4 text-base font-medium text-gray-900 placeholder-gray-600 bg-transparent border-transparent outline-none peer rounded-xl"
                        placeholder="************"
                        type="password" />
                    <label className="relative px-2 text-base font-medium text-gray-600 -translate-y-1/2 w-23 -top-5 right-[74%] bg-white-400 peer-focus:animate-text-pule">Lösenord</label>
                </div>
                <button className="w-full py-4 bg-gray-900 text-white-400 rounded-xl">Logga in</button>
            </form>
            <div className="flex flex-col items-center justify-between gap-6 mt-8">
                <div className="flex items-center w-full">
                    <div className="flex-1 h-1 bg-gray-100"></div>
                    <p className="px-4">eller</p>
                    <div className="flex-1 h-1 bg-gray-100"></div>
                </div>
                <button className="flex items-center justify-center w-full gap-4 py-4 shadow-xl bg-white-100 text-white-400 rounded-xl shadow-black/25">
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                    >
                        <path
                            fill="#FFC107"
                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                        <path
                            fill="#FF3D00"
                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                        ></path>
                        <path
                            fill="#4CAF50"
                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                        ></path>
                        <path
                            fill="#1976D2"
                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                    </svg>
                    <span className="font-medium text-gray-600">Logga in med Google</span>
                </button>
                <p className="text-gray-600">Har du inte ett konto? <Link className="font-semibold text-gray-900" href={"/signup"}>Skapa konto</Link></p>
            </div>
        </>
    )
}