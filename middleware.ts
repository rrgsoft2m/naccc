import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    if (path.startsWith('/admin')) {
        // Allow login page access
        if (path === '/admin/login') {
            return NextResponse.next()
        }

        // Check session
        const sessionCookie = request.cookies.get('session')?.value
        const session = sessionCookie ? await verifySession(sessionCookie) : null

        if (!session) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}
