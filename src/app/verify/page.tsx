'use client'

import { useAuth } from '@/components/firebase/authcontext';
import { CreateUserDoc } from '@/components/firebase/firebaseAuth';
import FormButton from '@/components/form/formbutton';
import { useRouter } from 'next/navigation';
import { MouseEvent, useEffect, useState } from 'react';

export default function VerifyEmailPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            CreateDoc();
        }
    }, [user])

    async function CreateDoc() {
        if (!user?.emailVerified) {
            setError("E-posten är inte verifierad")
            return;
        }
        const savedUserInfo = localStorage.getItem("userInfo");

        if (!savedUserInfo) {
            setError("Kan inte hitta data, vänligen skapa ett nytt konto")
            return
        }

        const userInfoJSON = JSON.parse(savedUserInfo);

        const userInfo = {
            displayname: userInfoJSON.firstname + " " + userInfoJSON.lastname,
            email: userInfoJSON.email,
            year: userInfoJSON.year,
            previous: JSON.parse(userInfoJSON.previous),
        };

        console.log(userInfo)

        try {
            const userInfoDoc = await CreateUserDoc(userInfo, user.uid);
            if (userInfoDoc) {
                setError(userInfoDoc);
                return;
            }

            localStorage.removeItem("userInfo");
            router.push("/private/oversikt");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Ett okänt fel inträffade");
        }
    }

    const Verified = async (e: MouseEvent<HTMLButtonElement>) => {
        window.location.reload();
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold text-gray-900">Verifiera din e-post</h1>
            <p>Vi har skickat ett verifieringsmejl till {user?.email}. Klicka på länken i mejlet för att fortsätta.</p>
            <p>Uppdatera sidan när du har verifierat din e-post.</p>
            <div className='w-lg flex justify-center'>
                <FormButton label='Gå vidare' onClick={Verified} />
            </div>
            <p>{error}</p>
        </div >
    );
}
