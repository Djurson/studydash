'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './config';
import { usePathname, useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

interface AuthProviderProps {
    children?: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const protectedRoutes = ['/oversikt', '/dashboard', '/profile'];
    const publicRoutes = ['/login', '/signup', '/', '/verify'];

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!loading) {
            const isProtectedRoute = protectedRoutes.includes(pathname);
            const isPublicRoute = publicRoutes.includes(pathname);

            if (isProtectedRoute && !user) {
                router.push('/login');
            } else if (isProtectedRoute && user && !user.emailVerified) {
                router.push('/verify');
            }
        }
    }, [user, loading, pathname, router]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth måste användas inom en AuthProvider');
    }
    return context;
}
