"use client"

import { AlertCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from 'next/navigation'
import InputField from "@/components/form/inputfield";
import FormButton from "@/components/form/formbutton";
import GoogleIcon from "@/components/googleIcon";
import LogoCenter from "@/components/form/logocenter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserLogin } from "@/components/firebase/usertypes";
import { useAuth } from "@/components/firebase/authcontext";

export default function Page() {
    const auth = useAuth();

    const router = useRouter();

    const [userLogin, setUserLogin] = useState<UserLogin>({
        email: "",
        password: "",
    });

    const [error, setError] = useState<string | null>(null);

    const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value,
        });
    };

    async function HandleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const userError = await auth?.UserSignInEmail(userLogin);

        if (userError) {
            setError(userError);
            return
        }

        setError(null);

        Navigate();
    }

    async function SignInGoogle() {
        const userRegError = await auth?.UserSignInGoogle();

        if (userRegError) {
            setError(userRegError);
            return
        }

        setError(null);

        Navigate();
    }

    async function Navigate() {
        router.push("/oversikt");
    }

    return (
        <>
            <div className="flex flex-col gap-24">
                <Link href={"/"}><LogoCenter /></Link>
                <div className="flex flex-col w-full justify-center items-center h-full gap-6">
                    <h1 className="font-semibold text-3xl">Logga in</h1>
                    <form className="w-lg flex flex-col justify-center gap-4" method="POST" onSubmit={HandleSubmit}>
                        {error != "" && error != null && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Fel</AlertTitle>
                                <AlertDescription>
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}
                        <div className="flex w-full flex-col gap-4">
                            <InputField name="email" type="email" placeholder="E-post" onchange={HandleChange} value={userLogin.email} />
                            <InputField name="password" type="password" placeholder="Lösenord" onchange={HandleChange} value={userLogin.password} />
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