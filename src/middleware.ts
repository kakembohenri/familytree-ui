/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server";
import { clearCookie, getCookie } from "./lib/handle-jwt";
import { authFrontendRoutes, frontendPaths } from "./paths/frontendPaths";
import { UserRoles } from "./enums/userRoles";

export default async function middleware(req: any) {
  const session = await getCookie();

  // Check if cookie is expired
  if (session !== null) {
    const expirationDate = new Date(session.expires);
    const currentDate = new Date();

    if (currentDate > expirationDate) {
      await clearCookie();
      const absoluteURL = new URL("/?auth=false", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  if (
    req.nextUrl.pathname.includes("static") === false &&
    req.nextUrl.pathname.includes(".") === false
  ) {
    if (
      authFrontendRoutes.includes(req.nextUrl.pathname.split("/")[1]) &&
      session === null
    ) {
      const absoluteURL = new URL("/?auth=false", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }

    if (req.nextUrl.pathname.split("/")[1] === "users" && session !== null) {
      const role = JSON.parse(session.userProfile).Role;
      if (role === UserRoles.Viewer) {
        const absoluteURL = new URL(
          `${frontendPaths.tree}?redirect=true`,
          req.nextUrl.origin
        );

        return NextResponse.redirect(absoluteURL.toString());
      }
    }
  }

  return NextResponse.next();
}
