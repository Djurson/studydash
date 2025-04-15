import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

/**
 * Handles the OAuth callback for server-side authentication with Supabase.
 *
 * This route processes the authorization code sent from the OAuth provider, exchanges
 * it for a user session using Supabase's server-side auth flow, and redirects the user
 * to the specified `redirect_to` URL or a default protected page if no redirection is specified.
 *
 * @param request - The HTTP request object containing the URL, including the authorization code and redirection URL.
 *
 * @returns A `NextResponse` redirecting the user to the appropriate page after authentication.
 *
 * @example
 * // Example of usage:
 * // User visits the `/auth/callback?code=somecode&redirect_to=/dashboard` route
 * // The server handles exchanging the code and redirects the user to the `/dashboard` page.
 */
// export async function GET(request: Request) {
//   // The `/auth/callback` route is required for the server-side auth flow implemented
//   // by the SSR package. It exchanges an auth code for the user's session.
//   // https://supabase.com/docs/guides/auth/server-side/nextjs
//   const requestUrl = new URL(request.url);
//   const code = requestUrl.searchParams.get("code");
//   const origin = requestUrl.origin;
//   const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

//   if (code) {
//     const supabase = await createClient();
//     await supabase.auth.exchangeCodeForSession(code);
//   }

//   if (redirectTo) {
//     return NextResponse.redirect(`${origin}${redirectTo}`);
//   }

//   // URL to redirect to after sign up process completes
//   return NextResponse.redirect(`${origin}/protected`);
// }

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
