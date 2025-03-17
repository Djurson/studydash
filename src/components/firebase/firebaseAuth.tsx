"use client"

import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"
import { auth, db } from "../../../firebase/client"
import { CreateUserProps, UserLoginProps, UserProps } from "./usertypes"
import { doc, getDoc, setDoc } from "firebase/firestore"

export async function UserRegistration(userInfo: CreateUserProps): Promise<string | null>;
export async function UserRegistration(): Promise<string | null>;

export async function UserRegistration(userInfo?: CreateUserProps): Promise<string | null> {
    try {
        if (userInfo) {
            await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);
            if (auth.currentUser) {
                await sendEmailVerification(auth.currentUser);
            } else {
                return "Ingen användare är inloggad";
            }
        } else {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        }
        return null
    } catch (error: any) {
        return "Fel vid registrering av användare: " + error.message;
    }
}

export async function CreateUserDoc(userInfo: UserProps, uid: string): Promise<string | null> {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return "Du har redan verifierat ditt konto"
    }

    try {
        await setDoc(doc(db, "users", uid), userInfo);
        return null
    } catch (error) {
        return "Fel vid skapande av dokument: " + error
    }
}

export async function UpdateProfile(user: UserProps): Promise<string | null> {
    if (!auth.currentUser) {
        return "Hittade ingen användare";
    }
    try {
        await updateProfile(auth.currentUser, {
            displayName: user.displayname
        })

        return null
    } catch (error) {
        return "Fel vid uppdatering utav profil: " + error;
    }
}

export async function SignIn(userLogin: UserLoginProps): Promise<string | null> {
    try {
        await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
        return null
    } catch (error) {
        return "Fel vid inloggning: " + error
    }
}