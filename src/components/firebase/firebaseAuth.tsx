"use server"

import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from "firebase/auth"
import { auth, db } from "./config"
import { CreateUserProps, UserInfoProps } from "./usertypes"
import { doc, setDoc } from "firebase/firestore"
import { useRouter } from "next/router"

export async function UserRegistration(userInfo: CreateUserProps): Promise<string | null> {
    try {
        const userCred = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)

        const currentUser = auth.currentUser;
        if (!currentUser) {
            return "Hittade ingen användare";
        }
        await sendEmailVerification(currentUser);

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