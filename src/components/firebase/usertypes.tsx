// Skapa konto struktur
export interface CreateUserProps {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    repeatpassword: string,
    year: string,
    previous: string,
}

// Database struktur
export interface UserProps {
    displayname: string,
    email: string,
    year: string,
    previous: boolean,
}

// Login Struktur
export interface UserLoginProps {
    email: string;
    password: string;
}