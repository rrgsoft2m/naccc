import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, phone, message } = body

        if (!name || !phone || !message) {
            return NextResponse.json(
                { error: 'Barcha maydonlarni to‘ldiring' },
                { status: 400 }
            )
        }

        const comment = await prisma.comment.create({
            data: {
                name,
                phone,
                message
            }
        })

        return NextResponse.json({ success: true, comment })
    } catch (error) {
        console.error('Comment creation error:', error)
        return NextResponse.json(
            { error: 'Xatolik yuz berdi' },
            { status: 500 }
        )
    }
}
