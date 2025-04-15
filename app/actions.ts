"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Provider } from "@supabase/supabase-js";

/**
 * Registrering med e-post och lösenord (server action)
 *
 * @param formData - Formulärdata (skickas automatiskt från formuläret)
 *
 * @description
 * Skickar automatiskt ett bekräftelsemail till användaren vid registrering.
 * Vid lyckad registrering omdirigeras användaren till startsidan med ett meddelande.
 *
 * @returns Returnerar olika resultat beroende på om registreringen lyckades eller om ett fel inträffade (t.ex. ogiltig e-post eller lösenord, eller Supabase-fel).
 */
export const SignUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect("error", "/", "Email and password are required");
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/", error.message);
  } else {
    return encodedRedirect("success", "/", "Thanks for signing up! Please check your email for a verification link.");
  }
};

/**
 * Inloggning med e-post och lösenord (server action)
 *
 * @param formData - Formulärdata (skickas automatiskt från formuläret)
 *
 * @description
 * Vid lyckad inloggning omdirigeras användaren till en skyddad sida.
 *
 * @returns Returnerar antingen ett felmeddelande (t.ex. felaktiga uppgifter eller tekniska fel via Supabase) eller omdirigerar användaren.
 */
export const SignInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/", error.message);
  }

  return redirect("/protected");
};

/**
 * Genererar en serverfunktion för inloggning via en extern leverantör (OAuth).
 *
 * @param provider - Namnet på den leverantör som ska användas (t.ex. "google", "github" m.fl.)
 *
 * @description
 * Skapar en asynkron funktion som påbörjar inloggning via vald OAuth-leverantör med Supabase.
 * Vid fel returneras ett felmeddelande och användaren omdirigeras.
 * Vid lyckad begäran omdirigeras användaren till leverantörens inloggningssida.
 *
 * @returns En asynkron funktion som hanterar OAuth-inloggning och omdirigerar användaren.
 */
const SignInWithProvider = (provider: Provider) => async () => {
  const supabase = await createClient();
  const auth_callback_url = `${process.env.SITE_URL}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });

  if (error) {
    return encodedRedirect("error", "/", error.message);
  }

  redirect(data.url);
};

/**
 * Inloggning med Google (OAuth via Supabase)
 *
 * @description
 * Startar inloggningsflödet via Google. Vid lyckad autentisering omdirigeras användaren till en skyddad sida.
 *
 * @returns Returnerar ett felmeddelande om något går fel eller omdirigerar användaren till Google för inloggning.
 */
export const SignInActionGoogle = SignInWithProvider("google");

/**
 * Glömt lösenord (server action)
 *
 * @param formData - Formulärdata (skickas automatiskt från formuläret)
 *
 * @description
 * Skickar ett återställningsmail till angiven e-postadress. Vid lyckat utskick visas ett meddelande eller sker omdirigering.
 *
 * @returns Returnerar fel vid ogiltig e-post eller andra problem, eller visar ett bekräftelsemeddelande om instruktioner skickats.
 */
export const ForgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect("error", "/forgot-password", "Could not reset password");
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect("success", "/forgot-password", "Check your email for a link to reset your password.");
};

/**
 * Återställ lösenord (server action)
 *
 * @param formData - Formulärdata (skickas automatiskt från formuläret)
 *
 * @description
 * Uppdaterar användarens lösenord efter att ha bekräftat att båda lösenorden matchar. Vid lyckad uppdatering visas ett bekräftelsemeddelande.
 *
 * @returns Returnerar fel vid ogiltiga lösenord eller mismatch, eller visar ett meddelande vid lyckad uppdatering.
 */
export const ResetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect("error", "/protected/reset-password", "Password and confirm password are required");
  }

  if (password !== confirmPassword) {
    encodedRedirect("error", "/protected/reset-password", "Passwords do not match");
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect("error", "/protected/reset-password", "Password update failed");
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

/**
 * Logga ut (server action)
 *
 * @description Loggar ut användaren från sessionen och omdirigerar till startsidan.
 */
export const SignOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
};
