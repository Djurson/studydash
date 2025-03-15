"use client"

import Title from "@/components/title";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { auth } from "../firebase/config";
import { useRouter } from 'next/navigation'
import InputField from "@/components/inputfield";
import FormsButton from "@/components/formsbutton";
import GoogleIcon from "@/components/googleIcon";

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
            <div className="flex flex-col w-full justify-center items-center h-full gap-6">
                <h1 className="font-semibold text-3xl">Logga in</h1>
                <form className="w-lg flex justify-center flex-col gap-4" method="POST" onSubmit={HandleSubmit}>
                    <InputField type="email" placeholder="E-post" onchange={HandleChange} value={userLogin.email} />
                    <InputField type="password" placeholder="Lösenord" onchange={HandleChange} value={userLogin.password} />
                    <div className="flex flex-col gap-4 justify-center item-center">
                        <FormsButton label="Logga in" type="submit" />
                        <FormsButton classname="!bg-white-100 !text-gray-600 border-2 border-gray-100"
                            label="Logga in med Google"
                            type="button"
                            onclick={SignInGoogle}
                        >
                            <GoogleIcon />
                        </FormsButton>
                    </div>
                </form>
            </div>
        </>
    )
}