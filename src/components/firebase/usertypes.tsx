// Skapa konto struktur
export type CreateUserProps = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    repeatpassword: string,
    year: string,
    previous: string,
}

// Database struktur
export type UserProps = {
    displayname: string,
    email: string,
    year: string,
    previous: boolean,
}

// Login Struktur
export type UserLoginProps = {
    email: string;
    password: string;
}