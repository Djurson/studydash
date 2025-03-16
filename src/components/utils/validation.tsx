export function checkEmail(email: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return "Ogiltig e-postadress";
    }

    return null;
}

export function checkPassword(password: string, repeatpassword: string): string | null {
    const passwordRegex = /^(?=.*[\W_])[^\s]{8,}$/;

    if (password !== repeatpassword) {
        return "Lösenorden matchar inte."
    }

    if (!passwordRegex.test(password)) {
        return "Lösenordet måste vara minst 8 tecken långt, innehålla minst ett specialtecken och får inte ha mellanslag.";
    }

    return null;
}

export function checkStudyInfo(year: string, first: string): string | null {
    if (!year) {
        return "Välj ett studieår.";
    }
    if (!first) {
        return "Välj om du har sökt CSN tidigare.";
    }
    return null;
}