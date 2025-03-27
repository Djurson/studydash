export function checkUserRegistrationInput(email: string, password: string, repeatpassword: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return "Ogiltig e-postadress";
    }

    const passwordRegex = /^(?=.*[\W_])[^\s]{8,}$/;

    if (password !== repeatpassword) {
        return "Lösenorden matchar inte."
    }

    if (!passwordRegex.test(password)) {
        return "Lösenordet måste vara minst 8 tecken långt, innehålla minst ett specialtecken och får inte ha mellanslag.";
    }

    return null;
}

export function checkStudyInfo(year: string, previous: string): string | null {
    if (!year || year === "") {
        return "Välj ett studieår.";
    }
    // Implementera en bättre check ifall det kan vara en boolean eller inte?
    if (!previous || previous === "") {
        return "Välj om du har sökt CSN tidigare.";
    }
    return null;
}