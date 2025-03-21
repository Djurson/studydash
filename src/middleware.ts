// middleware.js
// https://www.youtube.com/watch?v=NYbM-gP7Vwc&ab_channel=RavenJS
// https://www.youtube.com/watch?v=-BEqV6eaaQk&t=1997s&ab_channel=Timegame
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  /*
  const response = NextResponse.next();
  const cookieStore = cookies();
  const authToken = (await cookieStore).get("firebaseIdToken")?.value;
  if (!authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    return NextResponse.next();
  }*/
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
