import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const comments = await prisma.comment.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(comments)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
    }
}
