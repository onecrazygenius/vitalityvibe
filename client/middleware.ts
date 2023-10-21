import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // check if a valid token is in cookies
    const token = request.cookies.get('token') 
    
    // if there is no token, redirect to the login page
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl).href)
    }
    
    // if there is a token, dont let back to the login page
    console.log(request.nextUrl.pathname)
    if (request.nextUrl.pathname === '/login' 
        || request.nextUrl.pathname === '/signup'
        || request.nextUrl.pathname === '/forgot-password' 
        || request.nextUrl.pathname === '/reset-password'
        || request.nextUrl.pathname === '/verify-email'
        || request.nextUrl.pathname === '/'
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl).href)
    }

    // if there is a token, let them visit the page
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
    // matcher all
    matcher: '/:path*'
}