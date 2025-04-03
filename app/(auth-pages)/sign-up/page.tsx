import { SignInAction, SignInActionGoogle, SignUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/supabase-template/form-message";
import { SubmitButton } from "@/components/supabase-template/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import LogoCenter from "@/components/form/logocenter";
import InputField from "@/components/form/inputfield";
import { ChevronRight } from "lucide-react";
import FormButton from "@/components/form/formbutton";
import GoogleIcon from "@/components/googleIcon";

export default async function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-12">
        <Link href={"/"}>
          <LogoCenter />
        </Link>
        <div className="flex flex-col w-full justify-center items-center h-full gap-6">
          <div className="flex flex-col justify-center items-center gap-3 w-lg">
            <h1 className="font-semibold text-3xl">Skapa ett konto</h1>
            <p className="text-base font-normal text-center">
              Ett konto gör att vi kan erbjuda dig samma upplevelse på flera enheter. Har du redan ett konto?
              <Link href={"/login"} className="ml-2 text-blue-900">
                Logga in
              </Link>
            </p>
            <form className="w-lg flex flex-col justify-center gap-4">
              <FormMessage message={searchParams} />
              <div className="flex w-full flex-col gap-4">
                <InputField name="email" type="email" placeholder="E-post" required />
                <InputField name="password" type="password" placeholder="Lösenord" required />
                <Link href={"/forgot-password"}>
                  <span className="text-blue-900 flex">
                    Glömt ditt lösenord? <ChevronRight className="text-blue-900" />
                  </span>
                </Link>
                <div className="flex flex-col gap-4 justify-center item-center">
                  <FormButton formAction={SignInAction} type="submit">
                    Logga in
                  </FormButton>
                  <FormButton className="!bg-white-100 !text-gray-600 border-2 border-gray-100" onClick={SignInActionGoogle}>
                    <GoogleIcon />
                    Logga in med Google
                  </FormButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
