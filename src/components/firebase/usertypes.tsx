// Skapa konto struktur
export type CreateUser = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    repeatpassword: string,
    year: string,
    previous: string,
}

// Database struktur
export type User = {
    displayname: string,
    email: string,
    year: string,
    previous: boolean,
}

// Login Struktur
export type UserLogin = {
    email: string;
    password: string;
}