"use client";

import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { auth } from "../../firebase/client";
import { removeAuthToken, setAuthToken } from "../utils/cookies";
import { signOut, User } from "firebase/auth";

type AuthContextType = {
    user: User | null;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProviderClient({ children, token }: { children: ReactNode; token: string | null }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (!auth) return;

        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const newToken = await user.getIdToken(true);
                setAuthToken(newToken);
                setUser(user);
            } else {
                removeAuthToken();
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    async function logout() {
        await signOut(auth)
        removeAuthToken();
        setUser(null);
    }

    return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);