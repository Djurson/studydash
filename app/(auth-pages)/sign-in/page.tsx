import { SignInAction, SignInActionGoogle } from "@/app/actions";
import FormButton from "@/components/form/formbutton";
import { FormMessage } from "@/components/form/frommessage";
import InputField from "@/components/form/inputfield";
import LogoCenter from "@/components/form/logocenter";
import GoogleIcon from "@/components/googleIcon";
import { Message } from "@/components/supabase-template/form-message";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <>
      <div className="flex flex-col gap-24">
        <Link href={"/"}>
          <LogoCenter />
        </Link>
        <div className="flex flex-col items-center justify-center w-full h-full gap-6">
          <div className="flex flex-col items-center justify-center gap-3 px-12 py-12 bg-white-100 rounded-xl drop-shadow-lg w-xl">
            <h1 className="text-3xl font-semibold">Logga in</h1>
            <p className="text-base font-normal text-center">
              Ett konto gör att vi kan erbjuda dig samma upplevelse på flera enheter. Har du inte ett konto?
              <Link href={"/sign-up"} className="ml-2 text-blue-900">
                Skapa ett konto
              </Link>
            </p>
            <form className="flex flex-col justify-center gap-4 px-12 w-lg">
              <FormMessage message={searchParams} />
              <div className="flex flex-col justify-center gap-4 item-center">
                <FormButton formAction={SignInActionGoogle}>
                  <GoogleIcon />
                  Logga in med Google
                </FormButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Gammal kod
 *           <form className="flex flex-col justify-center gap-4 w-lg">
            <FormMessage message={searchParams} />
            <div className="flex flex-col w-full gap-4">
              <InputField name="email" type="email" placeholder="E-post" required />
              <InputField name="password" type="password" placeholder="Lösenord" required />
              <Link href={"/forgot-password"}>
                <span className="flex text-blue-900">
                  Glömt ditt lösenord? <ChevronRight className="text-blue-900" />
                </span>
              </Link>
              <div className="flex flex-col justify-center gap-4 item-center">
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
 */
