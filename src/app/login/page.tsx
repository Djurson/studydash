"use client"

import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { auth } from "@/components/firebase/config";
import { useRouter } from 'next/navigation'
import InputField from "@/components/form/inputfield";
import FormButton from "@/components/form/formbutton";
import GoogleIcon from "@/components/googleIcon";
import LogoCenter from "@/components/form/logocenter";

export default function Page() {
    const router = useRouter();

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);

    const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value,
        });
    };

    async function HandleSubmit(event: FormEvent<HTMLFormElement>) {
        // Sidan ska inte reloadas
        event.preventDefault();

        // Kopplar samman med firebase, firebase kollar finns den här mailen och lösenordet
        const res = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password).catch((error) => {
            setError(error.code);
        })

        // Inloggningen gick bra
        if (res?.user) {
            Navigate();
        } else {
            // Errors
        }
    }

    async function SignInGoogle() {
        const provider = new GoogleAuthProvider();

        // Kopplar samman med firebase, firebase kollar finns den här mailen och lösenordet
        const res = await signInWithPopup(auth, provider);

        // Inloggningen gick bra
        if (res?.user) {
            // Folk som är nya kan råka gå in här och "skapa" ett konto
            // Implementera att kolla ifall det finns ett dokument för användaren -> annars skapa ett
            // Exakt samma funktion kommer användas i signup kanske går att göra någon komponent som gör det?

            Navigate();
        }
    }

    function Navigate() {
        router.push('/');
    }

    return (
        <>
            <div className="flex flex-col gap-24">
                <Link href={"/"}><LogoCenter /></Link>
                <div className="flex flex-col w-full justify-center items-center h-full gap-6">
                    <h1 className="font-semibold text-3xl">Logga in</h1>
                    <form className="w-lg flex justify-center flex-col gap-8" method="POST" onSubmit={HandleSubmit}>
                        <div className="flex w-full flex-col gap-4">
                            <InputField type="email" placeholder="E-post" onchange={HandleChange} value={userLogin.email} />
                            <InputField type="password" placeholder="Lösenord" onchange={HandleChange} value={userLogin.password} />
                            <span className="text-blue-900 flex">Glömt ditt lösenord? <ChevronRight className="text-blue-900" /></span>
                        </div>
                        <div className="flex flex-col gap-4 justify-center item-center">
                            <FormButton label="Logga in" type="submit" />
                            <FormButton className="!bg-white-100 !text-gray-600 border-2 border-gray-100"
                                label="Logga in med Google"
                                type="button"
                                onClick={SignInGoogle}
                            >
                                <GoogleIcon />
                            </FormButton>
                        </div>
                    </form>
                    <span className="flex gap-2 w-lg">Har du inget konto? <Link className="text-blue-900 flex" href={"/signup"}>Skapa ett konto <ChevronRight /></Link></span>
                </div>
            </div>
        </>
    )
}