"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User } from 'firebase/auth';
import { auth } from '../../../firebase/client';
import Cookies from 'js-cookie';
import { CreateUser, UserInputDB, UserLogin } from './usertypes';

type AuthContextType = {
    user: User | null;
    userRegistration: (userDB: UserInputDB, userData?: CreateUser) => Promise<string | null>;
    userSignInEmail: (userLogin: UserLogin) => Promise<string | null>;
    sendUserData: (userData: UserInputDB, user: User) => Promise<string | null>;
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
                await sendUserData(userDB, usercred.user);
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

    async function userSignInEmail(userLogin: UserLogin): Promise<string | null> {
        if (!auth) {
            return Promise.resolve("Internal error: 100");
        }

        try {
            await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            return null;
        } catch (error) {
            return Promise.reject("Fel vid inloggning/skapande av konto: " + (error as Error).message);
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

    async function sendUserData(userData: UserInputDB, user: User): Promise<string | null> {
        try {
            await fetch(`${process.env.API_URL}/api/setCustomClaims`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: user.uid,
                    year: userData.year,
                    previous: userData.previous,
                }),
            });
            return null
        } catch (error) {
            return Promise.reject("Fel vid skapning utav dokument: " + (error as Error).message)
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
        <AuthContext.Provider value={{ user, userRegistration, userSignInEmail, sendUserData, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);