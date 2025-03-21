// Skapa konto (email) struktur
export type CreateUser = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    repeatpassword: string,
}

// Generell skapa konto info
export type UserInputDB = {
    year: string;
    previous: boolean;
}

// Database struktur
export type UserDB = {
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