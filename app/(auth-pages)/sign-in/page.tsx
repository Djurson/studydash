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
        <Link href={"/"}><LogoCenter /></Link>
        <div className="flex flex-col w-full justify-center items-center h-full gap-6">
          <h1 className="font-semibold text-3xl">Logga in</h1>
          <form className="w-lg flex flex-col justify-center gap-4">
            <FormMessage message={searchParams} />
            <div className="flex w-full flex-col gap-4">
              <InputField name="email" type="email" placeholder="E-post" required />
              <InputField name="password" type="password" placeholder="Lösenord" required />
              <Link href={"/forgot-password"}><span className="text-blue-900 flex">Glömt ditt lösenord? <ChevronRight className="text-blue-900" /></span></Link>
              <div className="flex flex-col gap-4 justify-center item-center">
                <FormButton formAction={SignInAction} type="submit">
                  Logga in
                </FormButton>
                <FormButton className="!bg-white-100 !text-gray-600 border-2 border-gray-100" formAction={SignInActionGoogle}>
                  <GoogleIcon />
                  Logga in med Google
                </FormButton>
              </div>
            </div>
          </form>
          <span className="flex gap-2 w-lg">Har du inget konto? <Link className="text-blue-900 flex" href={"/sign-up"}>Skapa ett konto <ChevronRight /></Link></span>
        </div>
      </div>
    </>
  );
}
