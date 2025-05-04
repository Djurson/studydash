import { SignInActionGoogle } from "@/app/actions";
import { FormMessage, Message } from "@/components/supabase-template/form-message";
import Link from "next/link";
import LogoCenter from "@/components/form/logocenter";
import FormButton from "@/components/form/formbutton";
import GoogleIcon from "@/components/googleIcon";

export default async function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="flex items-center justify-center flex-1 w-full h-screen gap-2 p-4 sm:max-w-md">
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
        <div className="flex flex-col items-center justify-center w-full h-full gap-6">
          <div className="flex flex-col items-center justify-center gap-3 px-12 py-12 bg-white-100 rounded-xl drop-shadow-lg w-xl">
            <h1 className="text-3xl font-semibold">Skapa ett konto</h1>
            <p className="text-base font-normal text-center">
              Ett konto gör att vi kan erbjuda dig samma upplevelse på flera enheter. Har du redan ett konto?
              <Link href={"/sign-in"} className="ml-2 text-blue-900">
                Logga in
              </Link>
            </p>
            <form className="flex flex-col justify-center gap-4 px-12 w-lg">
              <FormMessage message={searchParams} />
              <div className="flex flex-col justify-center gap-4 item-center">
                <FormButton formAction={SignInActionGoogle}>
                  <GoogleIcon />
                  Skapa konto med Google
                </FormButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}