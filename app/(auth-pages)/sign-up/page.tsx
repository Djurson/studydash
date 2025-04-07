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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

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

/** Gammal form kod
 * <Select name="studyYear" required>
                <SelectTrigger className="w-full text-gray-900 bg-white-0">
                  <SelectValue placeholder="När påbörjade du dina studier?" className="text-gray-900"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>När påbörjade du dina studier?</SelectLabel>
                    {Array.from({ length: currentYear - startYear + 1 }, (_, index) => {
                      const year = startYear + index;
                      return (
                        <SelectItem key={year} value={year.toString()}>
                          HT {year}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select name="prev-funds" required>
                <SelectTrigger className="w-full text-gray-900 bg-white-0">
                  <SelectValue placeholder="Har du sökt CSN tidigare?" className="text-gray-900"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Har du sökt CSN tidigare?</SelectLabel>
                    <SelectItem value={"yes"}>Ja</SelectItem>
                    <SelectItem value={"no"}>Nej</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="flex flex-col w-full gap-4">
                <Select disabled>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Linköpings universitet"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Universitet</SelectLabel>
                      <SelectItem value="Linköpings universitet">Linköpings universitet</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select disabled>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Civilingenjör i medieteknik"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Program/utbildning</SelectLabel>
                      <SelectItem value="Civilingenjör i medieteknik">Civilingenjör i medieteknik</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
 */

/** Gammal kod */
// <>
//   <div className="flex flex-col gap-12">
//     <Link href={"/"}>
//       <LogoCenter />
//     </Link>
//     <div className="flex flex-col items-center justify-center w-full h-full gap-6">
//       <div className="flex flex-col items-center justify-center gap-3 w-lg">
//         <h1 className="text-3xl font-semibold">Skapa ett konto</h1>
//         <p className="text-base font-normal text-center">
//           Ett konto gör att vi kan erbjuda dig samma upplevelse på flera enheter. Har du redan ett konto?
//           <Link href={"/login"} className="ml-2 text-blue-900">
//             Logga in
//           </Link>
//         </p>
//         <form className="flex flex-col justify-center gap-4 w-lg">
//           <FormMessage message={searchParams} />
//           <div className="flex flex-col w-full gap-4">
//             <InputField name="email" type="email" placeholder="E-post" required />
//             <InputField name="password" type="password" placeholder="Lösenord" required />
//             <Link href={"/forgot-password"}>
//               <span className="flex text-blue-900">
//                 Glömt ditt lösenord? <ChevronRight className="text-blue-900" />
//               </span>
//             </Link>
//             <div className="flex flex-col justify-center gap-4 item-center">
//               <FormButton formAction={SignInAction} type="submit">
//                 Logga in
//               </FormButton>
//               <FormButton className="!bg-white-100 !text-gray-600 border-2 border-gray-100" onClick={SignInActionGoogle}>
//                 <GoogleIcon />
//                 Logga in med Google
//               </FormButton>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
// </>;
