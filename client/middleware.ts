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
        return NextResponse.redirect('/login')
    } 
    
    if (token && unauthPaths.includes(request.nextUrl.pathname)) {
        // if there is a token, redirect to home page
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl.origin).href)
    }

    // if there is a token, let them visit the page
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
    // matcher all
    matcher: '/:path*'
}