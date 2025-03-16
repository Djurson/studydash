import { useAuth } from "@/components/firebase/authcontext"
import { auth } from "@/components/firebase/config"
import { NextRequest, NextResponse } from "next/server"

const protectedRoutes = ['/oversikt']
const publicRoutes = ['/login', '/signup', '/', '/verify']

export default async function middleware(req: NextRequest) {
    const { user } = useAuth()
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    if (isProtectedRoute && !user) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    if (isProtectedRoute && !user?.emailVerified) {
        return NextResponse.redirect(new URL('/verify', req.nextUrl))
    }
}