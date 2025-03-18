"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User } from 'firebase/auth';
import { auth, db } from '../../../firebase/client';
import Cookies from 'js-cookie';
import { CreateUser, UserInputDB, UserLogin } from './usertypes';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

type AuthContextType = {
    user: User | null;
    userRegistration: (userDB: UserInputDB, userData?: CreateUser) => Promise<string | null>;
    userSignInEmail: (userLogin: UserLogin) => Promise<string | null>;
    userSignInGoogle: () => Promise<string | null>;
    CreateUserData: (user: User, userData: UserInputDB) => Promise<string | null>;
    logout: () => Promise<string | null>;
}

type AuthProviderProps = {
    children?: ReactNode;
}

export function getAuthToken(): string | undefined {
    return Cookies.get("firebaseIdToken");
}

export function setAuthToken(token: string): string | undefined {
    return Cookies.set("firebaseIdToken", token, { secure: true });
}

export function removeAuthToken(): void {
    return Cookies.remove("firebaseIdToken");
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    async function userRegistration(userDB: UserInputDB, userData?: CreateUser): Promise<string | null> {
        if (!auth) {
            return Promise.reject("Internal error: 100");
        }
        try {
            if (!userData) {
                const usercred = await signInWithPopup(auth, new GoogleAuthProvider());
                await CreateUserData(usercred.user, userDB);
            } else {
                const usercred = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
                await sendEmailVerification(usercred.user);
                await updateProfile(usercred.user, { displayName: `${userData.firstname} ${userData.lastname}` });
            }
            return null
        } catch (error) {
            return Promise.reject("Fel vid skapande av konto: " + (error as Error).message);
        }
    }

    async function CreateUserData(user: User, userData: UserInputDB): Promise<string | null> {
        try {
            await setDoc(doc(db, "users", user.uid), {
                ...userData,
                displayname: user.displayName,
                email: user.email,
                created: serverTimestamp(),
            })
            return null
        } catch (error) {
            return Promise.reject("Fel vid skapande av konto: " + (error as Error).message);
        }
    }

    async function userSignInEmail(userLogin: UserLogin): Promise<string | null> {
        if (!auth) {
            return Promise.resolve("Internal error: 100");
        }

        try {
            await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            return null;
        } catch (error) {
            return Promise.reject("Fel vid inloggning: " + (error as Error).message);
        }
    }

    async function userSignInGoogle(): Promise<string | null> {
        if (!auth) {
            return Promise.resolve("Internal error: 100");
        }
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
            return null
        } catch (error) {
            return Promise.reject("Fel vid inloggning: " + (error as Error).message);
        }
    }

    async function logout(): Promise<string | null> {
        if (!auth) {
            return Promise.resolve("Internal error: 100");
        }

        try {
            await signOut(auth)
            return null
        } catch (error) {
            return Promise.reject("Fel vid utloggning: " + (error as Error).message);
        }
    }

    useEffect(() => {
        if (!auth) return;

        return auth.onAuthStateChanged(async (user) => {
            if (!user) {
                setUser(null);
                removeAuthToken();
            } else {
                const token = await user.getIdToken();
                setUser(user);
                setAuthToken(token);
            }
        })
    }, []);

    return (
        <AuthContext.Provider value={{ user, userRegistration, userSignInEmail, userSignInGoogle, CreateUserData, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);