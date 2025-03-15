"use client"

import FormsButton from "@/components/formsbutton";
import InputField from "@/components/inputfield";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Page() {
    const [userLogin, setUserLogin] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        repeatpassword: "",
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
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <div className="flex flex-col w-full justify-center items-center h-full gap-6">
                <div className="flex flex-col justify-center items-center gap-4 w-lg">
                    <h1 className="font-semibold text-3xl">Skapa ett konto</h1>
                    <p className="text-lg font-normal text-center">Ett konto gör att vi kan erbjuda dig samma upplevelse på flera enheter. Har du redan ett konto? <Link href={"/login"} className="text-blue-900">Logga in</Link></p>
                </div>
                <Tabs defaultValue="signup" value={currentTabsPage} className="flex justify-center items-center shadow-2xl px-8 py-6 gap-6 rounded-xl bg-white-100">
                    <TabsList className="w-full flex gap-4 justify-center">
                        <TabsTrigger value="signup" onClick={() => setCurrentTabsPage("signup")}>Grund information</TabsTrigger>
                        <TabsTrigger value="updateinfo" onClick={() => setCurrentTabsPage("updateinfo")}>Studieinformation</TabsTrigger>
                        <TabsTrigger value="optional" onClick={() => setCurrentTabsPage("optional")}>Valfritt</TabsTrigger>
                    </TabsList>
                    <form className="w-lg flex justify-center items-center" method="POST">
                        <TabsContent value="signup" className="flex flex-col gap-6">
                            <div className="w-full flex gap-6">
                                <InputField type="text" name="firstname" placeholder="Förnamn" value={userLogin.firstname} onchange={HandleChange} />
                                <InputField type="text" name="lastname" placeholder="Efternamn" value={userLogin.lastname} onchange={HandleChange} />
                            </div>
                            <InputField type="email" name="email" placeholder="E-post" value={userLogin.email} onchange={HandleChange} />
                            <InputField type="password" name="password" placeholder="Lösenord" value={userLogin.password} onchange={HandleChange} />
                            <InputField type="password" name="repeatpassword" placeholder="Bekräfta lösenord" value={userLogin.repeatpassword} onchange={HandleChange} />
                            <FormsButton label="Nästa" type="button" onclick={() => setCurrentTabsPage("updateinfo")} />
                        </TabsContent>
                        <TabsContent value="updateinfo" className="flex flex-col gap-6">
                            <div className="w-full flex gap-6">
                                <InputField type="text" name="firstname" placeholder="Förnamn" value={userLogin.firstname} onchange={HandleChange} />
                                <InputField type="text" name="lastname" placeholder="Efternamn" value={userLogin.lastname} onchange={HandleChange} />
                            </div>
                            <InputField type="email" name="email" placeholder="E-post" value={userLogin.email} onchange={HandleChange} />
                            <InputField type="password" name="password" placeholder="Lösenord" value={userLogin.password} onchange={HandleChange} />
                            <InputField type="password" name="repeatpassword" placeholder="Bekräfta lösenord" value={userLogin.repeatpassword} onchange={HandleChange} />
                            <div className="flex gap-6 justify-center item-center">
                                <FormsButton label="Tillbaka" type="button" onclick={() => setCurrentTabsPage("signup")} />
                                <FormsButton label="Nästa" type="button" onclick={() => setCurrentTabsPage("optional")} />
                            </div>
                        </TabsContent>
                    </form>
                </Tabs>
            </div>
        </>
    )
}