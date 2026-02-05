import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (key) {
        const block = await prisma.contentBlock.findUnique({ where: { key } })
        return NextResponse.json(block || { content: '' })
    }

    const blocks = await prisma.contentBlock.findMany()
    return NextResponse.json(blocks)
}

export async function POST(request: Request) {
    const body = await request.json()
    const { key, content, type } = body

    const block = await prisma.contentBlock.upsert({
        where: { key },
        update: { content, type },
        create: { key, content, type: type || 'text' }
    })

    return NextResponse.json(block)
}
