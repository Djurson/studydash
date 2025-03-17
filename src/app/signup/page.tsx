"use client"

import FormButton from "@/components/form/formbutton";
import GoogleIcon from "@/components/googleIcon";
import InputField from "@/components/form/inputfield";
import LogoCenter from "@/components/form/logocenter";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import Link from "next/link";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { checkEmail, checkPassword, checkStudyInfo } from "@/components/utils/validation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/firebase/authcontext";
import { CreateUser } from "@/components/firebase/usertypes";

export default function Page() {
    const auth = useAuth();
    const router = useRouter();

    const [userInfo, setUserInfo] = useState<CreateUser>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        repeatpassword: "",
        year: "",
        previous: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [currentTabsPage, setCurrentTabsPage] = useState("signup");
    // @ts-ignore
    const isGoogleSignup = auth?.user.providerData.some(provider => provider.providerId === "google.com");

    useEffect(() => {
        if (auth?.user && isGoogleSignup) {
            setCurrentTabsPage("updateinfo");
        }
    }, [auth?.user])

    function emailPasswordCheck() {
        const emailError = checkEmail(userInfo.email);
        const passwordError = checkPassword(userInfo.password, userInfo.repeatpassword);

        if (emailError || passwordError) {
            setError(emailError || passwordError);
            return
        } else {
            setError(null);
            setCurrentTabsPage("updateinfo");
        }
    }

    async function SignUpEmail(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isGoogleSignup) {
            await SignUpGoogle();
            return
        }
        const emailError = checkEmail(userInfo.email);
        const passwordError = checkPassword(userInfo.password, userInfo.repeatpassword);
        const studyInfoError = checkStudyInfo(userInfo.year, userInfo.previous);

        if (emailError || passwordError || studyInfoError) {
            setError(emailError || passwordError || studyInfoError);
            return
        }

        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        const userRegError = await auth?.userRegistration(userInfo);

        if (userRegError) {
            setError(userRegError);
            return
        }

        router.push("/oversikt")
    }

    async function GoogleSetup(e: MouseEvent<HTMLButtonElement>) {
        const userRegError = await auth?.userRegistration();

        if (userRegError) {
            setError(userRegError);
            return
        }

        setError(null);
        setCurrentTabsPage("updateinfo");
    }

    async function SignUpGoogle() {
        if (!auth?.user) {
            setError("Ingen användare");
            return
        }

        const studyInfoError = checkStudyInfo(userInfo.year, userInfo.previous);

        if (studyInfoError) {
            setError(studyInfoError);
            return
        }

        try {
            const user_info = {
                firstname: auth.user.displayName,
                lastname: "",
                email: auth.user.email,
                year: userInfo.year,
                previous: JSON.parse(userInfo.previous),
            };

            localStorage.setItem("userInfo", JSON.stringify(user_info));

            router.push("/oversikt");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Ett okänt fel inträffade");
        }
    }

    const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <div className="flex flex-col gap-12">
                <Link href={"/"}><LogoCenter /></Link>
                <div className="flex flex-col w-full justify-center items-center h-full gap-6">
                    <div className="flex flex-col justify-center items-center gap-3 w-lg">
                        <h1 className="font-semibold text-3xl">Skapa ett konto</h1>
                        <p className="text-base font-normal text-center">Ett konto gör att vi kan erbjuda dig samma upplevelse på flera enheter. Har du redan ett konto? <Link href={"/login"} className="text-blue-900">Logga in</Link></p>
                    </div>
                    <Tabs defaultValue="signup" value={currentTabsPage} className="flex justify-center items-center shadow-2xl px-8 py-6 gap-6 rounded-xl bg-white-100">
                        <TabsList className="w-full flex gap-4 justify-center">
                            <TabsTrigger className={`${currentTabsPage == 'signup' ? 'outline-none border-gray-100 border-2 text-gray-900' : ''} transition duration-200 ease-in-out hover:cursor-pointer`}
                                value="signup"
                                onClick={() => setCurrentTabsPage("signup")}
                                disabled={isGoogleSignup}
                            >
                                Grund information
                            </TabsTrigger>
                            <TabsTrigger className={`${currentTabsPage == 'updateinfo' ? 'outline-none border-gray-100 border-2 text-gray-900' : ''} transition duration-200 ease-in-out hover:cursor-pointer`}
                                value="updateinfo"
                                onClick={() => setCurrentTabsPage("updateinfo")}
                                disabled={!isGoogleSignup && !!(checkEmail(userInfo.email) || checkPassword(userInfo.password, userInfo.repeatpassword))}
                            >
                                Studieinformation
                            </TabsTrigger>
                        </TabsList>
                        <form className="w-lg flex flex-col justify-center gap-4" method="POST" onSubmit={SignUpEmail}>
                            {error != null && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Fel</AlertTitle>
                                    <AlertDescription>
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}
                            <TabsContent value="signup" className="flex flex-col gap-4">
                                <div className="w-full flex gap-6">
                                    <InputField type="text" name="firstname" placeholder="Förnamn" value={userInfo.firstname} onchange={HandleChange} required={true} />
                                    <InputField type="text" name="lastname" placeholder="Efternamn" value={userInfo.lastname} onchange={HandleChange} required={true} />
                                </div>
                                <InputField type="email" name="email" placeholder="E-post" value={userInfo.email} onchange={HandleChange} required={true} />
                                <InputField type="password" name="password" placeholder="Lösenord" value={userInfo.password} onchange={HandleChange} required={true} />
                                <InputField type="password" name="repeatpassword" placeholder="Bekräfta lösenord" value={userInfo.repeatpassword} onchange={HandleChange} required={true} />
                                <div className="flex flex-col gap-4 justify-center item-center">
                                    <FormButton label="Nästa" type="button" onClick={emailPasswordCheck} />
                                    <FormButton className="!bg-white-100 !text-gray-600 border-2 border-gray-100"
                                        label="Skapa ett konto med Google"
                                        type="button"
                                        onClick={GoogleSetup}
                                    >
                                        <GoogleIcon />
                                    </FormButton>
                                </div>
                            </TabsContent>
                            <TabsContent value="updateinfo" className="flex flex-col gap-6">
                                <Select name="year" onValueChange={(value) => setUserInfo({ ...userInfo, year: value })} required={true} defaultValue={userInfo.year}>
                                    <SelectTrigger className="w-full text-base py-3 px-4">
                                        <SelectValue placeholder="Studieår" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel className="text-base text-gray-600">Studieår</SelectLabel>
                                            <SelectItem className="text-base text-gray-600" value="1">1</SelectItem>
                                            <SelectItem className="text-base text-gray-600" value="2">2</SelectItem>
                                            <SelectItem className="text-base text-gray-600" value="3">3</SelectItem>
                                            <SelectItem className="text-base text-gray-600" value="4">4</SelectItem>
                                            <SelectItem className="text-base text-gray-600" value="5">5</SelectItem>
                                            <SelectItem className="text-base text-gray-600" value="6">5+</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Select name="first" onValueChange={(value) => setUserInfo({ ...userInfo, previous: value })} required={true} defaultValue={userInfo.previous} >
                                    <SelectTrigger className="w-full text-base py-3 px-4">
                                        <SelectValue placeholder="Har du sökt CSN tidigare?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel className="text-base text-gray-600">Har du sökt CSN tidigare?</SelectLabel>
                                            <SelectItem className="text-base text-gray-600" value="true">Ja</SelectItem>
                                            <SelectItem className="text-base text-gray-600" value="false">Nej</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <div className="flex flex-col gap-4 justify-center item-center">
                                    <FormButton className="!bg-white-100 !text-gray-600 border-2 border-gray-100" label="Tillbaka" type="button" onClick={() => setCurrentTabsPage("signup")} />
                                    <FormButton label="Klar" type="submit" disabled={!userInfo.year || !userInfo.previous} />
                                </div>
                            </TabsContent>
                        </form>
                    </Tabs>
                    <p className="text-gray-600 text-xs w-lg">Genom att skapa ett konto godkänner du Google Firesbase användarvillkor för hur din persondata hanteras och lagras på vår plattform. <Link href={"/"} className="text-blue-900">Se hur din data hanteras.</Link></p>
                </div>
            </div >
        </>
    )
}