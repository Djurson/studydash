"use client"

import FormsButton from "@/components/formsbutton";
import GoogleIcon from "@/components/googleIcon";
import InputField from "@/components/inputfield";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Page() {
    const [userInfo, setUserInfo] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        repeatpassword: "",
        year: "",
        first: "",
    });

    const [currentTabsPage, setCurrentTabsPage] = useState("signup");

    async function SignUpEmail(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Lägga in checks för att kolla så att båda lösenorden stämmer överrens
        // andra lösenords krav?
        // kolla så att mailen inte används redan?
        // skapa användar dokument
    }

    // @ts-ignore
    const HandleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <div className="flex flex-col w-full justify-center items-center h-full gap-6">
                <div className="flex flex-col justify-center items-center gap-3 w-lg">
                    <h1 className="font-semibold text-3xl">Skapa ett konto</h1>
                    <p className="text-lg font-normal text-center">Ett konto gör att vi kan erbjuda dig samma upplevelse på flera enheter. Har du redan ett konto? <Link href={"/login"} className="text-blue-900">Logga in</Link></p>
                </div>
                <Tabs defaultValue="signup" value={currentTabsPage} className="flex justify-center items-center shadow-2xl px-8 py-6 gap-6 rounded-xl bg-white-100">
                    <TabsList className="w-full flex gap-4 justify-center">
                        <TabsTrigger className={`${currentTabsPage == 'signup' ? 'outline-none border-gray-100 border-2 text-gray-900' : ''} transition duration-200 ease-in-out hover:cursor-pointer`} value="signup" onClick={() => setCurrentTabsPage("signup")}>Grund information</TabsTrigger>
                        <TabsTrigger className={`${currentTabsPage == 'updateinfo' ? 'outline-none border-gray-100 border-2 text-gray-900' : ''} transition duration-200 ease-in-out hover:cursor-pointer`} value="updateinfo" onClick={() => setCurrentTabsPage("updateinfo")}>Studieinformation</TabsTrigger>
                    </TabsList>
                    <form className="w-lg flex justify-center items-center" method="POST" onSubmit={SignUpEmail}>
                        <TabsContent value="signup" className="flex flex-col gap-4">
                            <div className="w-full flex gap-6">
                                <InputField type="text" name="firstname" placeholder="Förnamn" value={userInfo.firstname} onchange={HandleChange} />
                                <InputField type="text" name="lastname" placeholder="Efternamn" value={userInfo.lastname} onchange={HandleChange} />
                            </div>
                            <InputField type="email" name="email" placeholder="E-post" value={userInfo.email} onchange={HandleChange} />
                            <InputField type="password" name="password" placeholder="Lösenord" value={userInfo.password} onchange={HandleChange} />
                            <InputField type="password" name="repeatpassword" placeholder="Bekräfta lösenord" value={userInfo.repeatpassword} onchange={HandleChange} />
                            <div className="flex flex-col gap-4 justify-center item-center">
                                <FormsButton label="Nästa" type="button" onclick={() => setCurrentTabsPage("updateinfo")} />
                                <FormsButton classname="!bg-white-100 !text-gray-600 border-2 border-gray-100"
                                    label="Skapa ett konto med Google"
                                    type="button"
                                    onclick={() => setCurrentTabsPage("updateinfo")}
                                >
                                    <GoogleIcon />
                                </FormsButton>
                            </div>
                        </TabsContent>
                        <TabsContent value="updateinfo" className="flex flex-col gap-6">
                            <Select name="year" onValueChange={(value) => setUserInfo({ ...userInfo, year: value })}>
                                <SelectTrigger className="w-full text-base py-3 px-4">
                                    <SelectValue placeholder="Studieår" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel className="text-base text-gray-600">År</SelectLabel>
                                        <SelectItem className="text-base text-gray-600" value="1">1</SelectItem>
                                        <SelectItem className="text-base text-gray-600" value="2">2</SelectItem>
                                        <SelectItem className="text-base text-gray-600" value="3">3</SelectItem>
                                        <SelectItem className="text-base text-gray-600" value="4">4</SelectItem>
                                        <SelectItem className="text-base text-gray-600" value="5">5</SelectItem>
                                        <SelectItem className="text-base text-gray-600" value="6">5+</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Select name="first" onValueChange={(value) => setUserInfo({ ...userInfo, first: value })}>
                                <SelectTrigger className="w-full text-base py-3 px-4">
                                    <SelectValue placeholder="Har du sökt CSN tidigare?" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem className="text-base text-gray-600" value="true">Ja</SelectItem>
                                        <SelectItem className="text-base text-gray-600" value="false">Nej</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <div className="flex flex-col gap-4 justify-center item-center">
                                <FormsButton classname="!bg-white-100 !text-gray-600 border-2 border-gray-100" label="Tillbaka" type="button" onclick={() => setCurrentTabsPage("signup")} />
                                <FormsButton label="Klar" type="submit" />
                            </div>
                        </TabsContent>
                    </form>
                </Tabs>
                <p className="text-gray-600 text-xs w-lg">Genom att skapa ett konto godkänner du Google Firesbase användarvillkor för hur din persondata hanteras och lagras på vår plattform. <Link href={"/"} className="text-blue-900">Se hur din data hanteras.</Link></p>
            </div>
        </>
    )
}