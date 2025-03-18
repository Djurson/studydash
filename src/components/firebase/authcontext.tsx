"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User } from 'firebase/auth';
import { auth, db } from '../../../firebase/client';
import Cookies from 'js-cookie';
import { CreateUser, UserInputDB, UserLogin } from './usertypes';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

enum UserTypesEnum {
    NORMAL = "normal",
    PRO = "pro",
}

type UserType = {
    verified: string;
    userRole: UserTypesEnum;
}

type AuthContextType = {
    user: User | null;
    UserSignUpEmail: (userData: CreateUser) => Promise<string | null>;
    UserSignInEmail: (userLogin: UserLogin) => Promise<string | null>;
    UserSignInGoogle: () => Promise<string | null>;
    CreateUserData: (user: User, userData: UserInputDB) => Promise<string | null>;
    Logout: () => Promise<string | null>;
    userInfo: UserType | null;
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
    const [userInfo, setUserInfo] = useState<UserType | null>(null)

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

                const tokenResult = await user.getIdTokenResult();

                console.log(tokenResult.claims)
                // setUserInfo(userinfo);
            }
        })
    }, []);

    async function UserSignUpEmail(userData: CreateUser): Promise<string | null> {
        if (!auth) {
            return Promise.reject("Internal error: 100");
        }
        try {
            const usercred = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            await sendEmailVerification(usercred.user);
            await updateProfile(usercred.user, { displayName: `${userData.firstname} ${userData.lastname}` });
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
                created: user.metadata.creationTime,
            })
            return null
        } catch (error) {
            return Promise.reject("Fel vid skapande av konto: " + (error as Error).message);
        }
    }

    async function UserSignInEmail(userLogin: UserLogin): Promise<string | null> {
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

    async function UserSignInGoogle(): Promise<string | null> {
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

    async function Logout(): Promise<string | null> {
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

    return (
        <AuthContext.Provider value={{ user, UserSignUpEmail, UserSignInEmail, UserSignInGoogle, CreateUserData, Logout, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);