import { SignUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/supabase-template/form-message";
import { SubmitButton } from "@/components/supabase-template/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import LogoCenter from "@/components/form/logocenter";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
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
        <Link href={"/"}><LogoCenter /></Link>
        <div className="flex flex-col w-full justify-center items-center h-full gap-6">
          <div className="flex flex-col justify-center items-center gap-3 w-lg">
            <h1 className="font-semibold text-3xl">Skapa ett konto</h1>
            <p className="text-base font-normal text-center">Ett konto gör att vi kan erbjuda dig samma upplevelse på flera enheter. Har du redan ett konto? <Link href={"/login"} className="text-blue-900">Logga in</Link></p>
          </div>
        </div>
      </div>
      <form className="flex flex-col min-w-64 max-w-64">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
          <SubmitButton formAction={SignUpAction} pendingText="Signing up...">
            Sign up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}
