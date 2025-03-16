'use client';

import { useAuth } from '@/components/firebase/authcontext';
import FormButton from '@/components/form/formbutton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent, useEffect } from 'react';

export default function VerifyEmailPage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user?.emailVerified) {
            console.log("hej")
        }
    }, [user, router]);

    const Verified = (e: MouseEvent<HTMLButtonElement>) => {
        // kontrollera om användaren har verifierat mailen
        // ladda in localstorage
        // skapa dokument med localstorage fälten
        // skicka användaren vidare
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold text-gray-900">Verifiera din e-post</h1>
            <p>Vi har skickat ett verifieringsmejl till {user?.email}. Klicka på länken i mejlet för att fortsätta.</p>
            <p>Uppdatera sidan när du har verifierat din e-post.</p>
            <div className='w-lg flex justify-center'>
                <FormButton label='Gå vidare' onClick={Verified} />
            </div>
        </div >
    );
}
