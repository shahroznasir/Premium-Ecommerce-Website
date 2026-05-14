import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { createServerClient } from "@supabase/ssr";

/* =========================================================
   MIDDLEWARE
========================================================== */

export async function middleware(
  request: NextRequest
) {

  let response =
    NextResponse.next({
      request,
    });

  /* =======================================================
     SUPABASE SERVER CLIENT
  ======================================================== */

  const supabase =
    createServerClient(
      process.env
        .NEXT_PUBLIC_SUPABASE_URL!,

      process.env
        .NEXT_PUBLIC_SUPABASE_ANON_KEY!,

      {
        cookies: {

          get(
            name: string
          ) {

            return request.cookies.get(
              name
            )?.value;
          },

          set(
            name: string,
            value: string,
            options: object
          ) {

            request.cookies.set({
              name,
              value,
              ...options,
            });

            response =
              NextResponse.next({
                request,
              });

            response.cookies.set({
              name,
              value,
              ...options,
            });
          },

          remove(
            name: string,
            options: object
          ) {

            request.cookies.set({
              name,
              value: "",
              ...options,
            });

            response =
              NextResponse.next({
                request,
              });

            response.cookies.set({
              name,
              value: "",
              ...options,
            });
          },
        },
      }
    );

  /* =======================================================
     CHECK SESSION
  ======================================================== */

  const {
    data: {
      session,
    },
  } = await supabase.auth.getSession();

  /* =======================================================
     PROTECT ADMIN ROUTES
  ======================================================== */

  const isAdminRoute =
    request.nextUrl.pathname.startsWith(
      "/admin"
    );

  const isLoginPage =
    request.nextUrl.pathname ===
    "/admin-login";

  if (
    isAdminRoute &&
    !isLoginPage &&
    !session
  ) {

    return NextResponse.redirect(
      new URL(
        "/admin-login",
        request.url
      )
    );
  }

  /* =======================================================
     REDIRECT IF ALREADY LOGGED IN
  ======================================================== */

  if (
    isLoginPage &&
    session
  ) {

    return NextResponse.redirect(
      new URL(
        "/admin",
        request.url
      )
    );
  }

  return response;
}

/* =========================================================
   MATCHER
========================================================== */

export const config = {
  matcher: [
    "/admin/:path*",
    "/admin-login",
  ],
};