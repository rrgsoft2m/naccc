import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { signSession } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json()

        // TODO: Hash password check in real app.
        // Demo: Plaintext check as per seed
        const user = await prisma.adminUser.findUnique({
            where: { username },
        })

        if (!user || user.password !== password) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const token = await signSession({ sub: user.id, role: user.role, username: user.username })

        // Set cookie
        const cookieStore = await cookies()
        cookieStore.set('session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
