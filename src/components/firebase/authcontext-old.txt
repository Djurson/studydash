"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, User } from 'firebase/auth';
import { auth } from '../../../firebase/client';
import Cookies from 'js-cookie';
import { CreateUser, UserLogin } from './usertypes';

type AuthContextType = {
    user: User | null;
    userRegistration: (userData?: CreateUser) => Promise<string | null>;
    userSignInEmail: (userLogin: UserLogin) => Promise<string | null>;
    logout: () => Promise<string | null>;
    sendUserData: (userData: CreateUser, user: User) => Promise<string | null>;
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

    async function userRegistration(userData: CreateUser, userBasic: ): Promise<string | null> {
        if (!auth) {
            return Promise.resolve("Någonting gick fel");
        }

        try {
            if (!userData) {
                await signInWithPopup(auth, new GoogleAuthProvider());
            } else {
                const usercred = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
                await sendEmailVerification(usercred.user);
            }
            return null
        } catch (error) {
            return Promise.reject("Fel vid inloggning/skapande av konto: " + (error as Error).message);
        }
    }

    async function userSignInEmail(userLogin: UserLogin): Promise<string | null> {
        if (!auth) {
            return Promise.resolve("Någonting gick fel");
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
            return Promise.resolve("Någonting gick fel");
        }

        try {
            await signOut(auth)
            return null
        } catch (error) {
            return Promise.reject("Fel vid utloggning: " + (error as Error).message);
        }
    }

    async function sendUserData(userData: CreateUser, user: User): Promise<string | null> {
        try {
            await fetch(`${process.env.API_URL}/api/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: user.email,
                    year: userData.year,
                    previous: userData.previous,
                    displayname: user.displayName,
                }),
            });

            return null
        } catch (error) {
            return Promise.reject("Fel vid skapande av dokument: " + (error as Error).message);
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
        <AuthContext.Provider value={{ user, userRegistration, userSignInEmail, logout, sendUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);