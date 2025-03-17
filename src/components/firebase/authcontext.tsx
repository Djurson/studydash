"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { auth } from '../../../firebase/client';
import Cookies from 'js-cookie';
import { CreateUserProps } from './usertypes';

type AuthContextType = {
    user: User | null;
    userRegistration: (userInfo?: CreateUserProps) => Promise<string | null>;
    userSignInEmail: () => Promise<string | null>;
    logout: () => Promise<void>;
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

    async function userRegistration(): Promise<string | null> {
        try {
            if (!auth) {
                return Promise.resolve("Någonting gick fel");
            }

            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            return null
        } catch (error) {
            return Promise.reject("Fel vid inloggning: " + (error as Error).message);
        }
    }

    function userRegistrationEmail(): Promise<string | null> {

    }

    function logout(): Promise<void> {
        return new Promise((resolve, reject) => {
            reject();
        })
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
        <AuthContext.Provider value={{ user, userRegistration, userRegistrationEmail, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);