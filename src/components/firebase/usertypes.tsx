export interface CreateUserProps {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    repeatpassword: string,
    year: string,
    first: string,
}

export interface UserInfoProps {
    firstname: string,
    lastname: string,
    email: string,
    year: string,
    first: string,
}

export interface UserLoginProps {
    email: string;
    password: string;
}