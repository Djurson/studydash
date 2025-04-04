"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Provider } from "@supabase/supabase-js";

/**
 * Sign up with email & password server action
 *
 * @param formData - The form data (passed automatically by the form)
 *
 * @remarks Automatically sends a confirm email message to the user, redirects the user to /sign-up on success
 *
 * @returns There are several returns, either with an error (email/password criterias were not satisfied, or other errors through supabase) or success
 *
 */
export const SignUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect("error", "/sign-up", "Email and password are required");
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
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect("success", "/sign-up", "Thanks for signing up! Please check your email for a verification link.");
  }
};

/**
 * Sign in with email & password server action
 *
 * @param formData - The form data (passed automatically by the form)
 *
 * @remarks Redirects the user to /protected on success
 *
 * @returns There are several returns, either with an error (email/password criterias were not satisfied, or other errors through supabase) or success
 *
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
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

/**
 * Sign up with google server action
 *
 * @remarks Redirects the user to /protected on success
 *
 * @returns There are several returns, either with an error (email/password criterias were not satisfied, or other errors through supabase) or success
 *
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
    return encodedRedirect("error", "/sign-in", error.message);
  }

  redirect(data.url);
};

export const SignInActionGoogle = SignInWithProvider("google");

/**
 * Forgot password server action
 *
 * @param formData - The form data (passed automatically by the form)
 *
 * @remarks Redirects the user to /forgot-password on success
 *
 * @returns There are several returns, either with an error (email criterias were not satisfied, or other errors through supabase) or success
 *
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
 * Reset password server action
 *
 * @param formData - The form data (passed automatically by the form)
 *
 * @remarks Redirects the user to /protected/reset-password on success
 *
 * @returns There are several returns, either with an error (password criterias were not satisfied, or other errors through supabase) or success
 *
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
 * Sign out server action
 *
 * @remarks Redirects the user to /sign-in on success
 *
 */
export const SignOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
