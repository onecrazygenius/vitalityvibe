import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const unauthPaths = [
        '/login',
        '/signup',
        '/forgot-password',
        '/reset-password',
        '/verify-email',
        '/',
    ]

    // check if a valid token is in cookies
    const token = request.cookies.get('token') 

    if (!token && !unauthPaths.includes(request.nextUrl.pathname)) {
        // if there is no token, redirect to login page
        return NextResponse.redirect(
            new URL('/login?next=' + request.nextUrl.pathname, request.nextUrl.origin).href
        )
    } 
    
    if (token && unauthPaths.includes(request.nextUrl.pathname)) {
        // if there is a token check if next is set
        if (request.nextUrl.searchParams.has('next')) {
            return NextResponse.redirect(
                new URL(request.nextUrl.searchParams.get('next') as string, request.nextUrl.origin).href
            )
        }
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl.origin).href)
    }

    // if there is a token, let them visit the page
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}