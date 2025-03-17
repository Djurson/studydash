"use client"

interface AuthContextType {
    user: User | null;
}

interface AuthProviderProps {
    children?: ReactNode;
}

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from './client';
import Cookies from 'js-cookie';

export function getAuthToken(): string | undefined {
    return Cookies.get("firebaseIdToken");
}

export function setAuthToken(token: string): string | undefined {
    return Cookies.set("firebaseIdToken", token, { secure: true });
}

export function removeAuthToken(): void {
    return Cookies.remove("firebaseIdToken");
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth måste användas inom en AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

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
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};
