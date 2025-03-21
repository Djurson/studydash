import { cookies } from "next/headers";
import AuthProviderClient from "./AuthProviderClient";

export default function AuthProviderServer({ children }: { children: React.ReactNode }) {
    // Hämta token från cookies
    const token = cookies().get("firebaseIdToken")?.value || null;

    return <AuthProviderClient token={token}>{children}</AuthProviderClient>;
}