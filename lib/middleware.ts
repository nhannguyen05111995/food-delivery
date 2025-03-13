import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add paths that don't require authentication
const publicPaths = ['/signin', '/signup', '/', 'meals', "cart"]

export function middleware(request: NextRequest) {
    // Get the session ID from the cookies
    const sessionId = request.cookies.get('sessionId')
    const { pathname } = request.nextUrl

    // Allow access to public paths
    if (publicPaths.includes(pathname)) {
        // Redirect to articles if already authenticated
        if (sessionId) {
            return NextResponse.redirect(new URL('/articles', request.url))
        }
        return NextResponse.next()
    }

    // Require authentication for all other paths
    if (!sessionId) {
        const signInUrl = new URL('/login', request.url)
        signInUrl.searchParams.set('from', pathname)
        return NextResponse.redirect(signInUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}