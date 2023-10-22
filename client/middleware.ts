import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token

    const nonAuthPages = ["/", "/login", "/signup"]

    if (!isAuth && !nonAuthPages.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/", req.nextUrl))
    }

    if (isAuth && nonAuthPages.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
    }

    return null
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
