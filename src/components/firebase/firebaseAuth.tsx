"use client"

import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { auth, db } from "./config"
import { CreateUserProps, UserInfoProps } from "./usertypes"
import { doc, setDoc } from "firebase/firestore"

export async function UserRegistration(userInfo: CreateUserProps): Promise<string | null> {
    try {
        await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);
        // @ts-ignore
        await sendEmailVerification(auth.currentUser);
        return null
    }
    catch (error: any) {
        return "Fel vid registrering utav användare " + error
    }
}

async function CreateUserDoc(userInfo: UserInfoProps): Promise<string | null> {
    if (!auth.currentUser) {
        return "Hittade ingen användare";
    }

    try {
        await setDoc(doc(db, "users", auth.currentUser.uid), userInfo);
        return null
    } catch (error) {
        return "Fel vid skapande av dokument " + error
    }
}