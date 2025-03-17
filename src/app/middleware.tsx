// middleware.js
// https://www.youtube.com/watch?v=NYbM-gP7Vwc&ab_channel=RavenJS
import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken } from 'firebase-admin/auth';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { initAdmin } from '@/components/firebase/admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}');

initializeApp({
    credential: cert(serviceAccount),
});

export async function middleware(req: NextRequest) {
    await initAdmin();
    const { pathname } = req.nextUrl;

    // Definiera privata vägar
    const privatePaths = ['/oversikt', '/profile'];

    if (privatePaths.some((path) => pathname.startsWith(path))) {
        const token = req.cookies.get('token');

        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        try {
            await verifyIdToken(token);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    return NextResponse.next();
}
