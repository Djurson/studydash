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