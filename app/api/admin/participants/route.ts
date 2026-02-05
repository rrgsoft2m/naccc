import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status')
    const subject = searchParams.get('subject')

    const skip = (page - 1) * limit

    const where: any = {}

    if (search) {
        where.OR = [
            { firstName: { contains: search } }, // SQLite is case-sensitive by default usually but Prisma might handle it? 
            // Actually standard contains is often case-sensitive in SQLite. 
            // For now simple search.
            { lastName: { contains: search } },
            { phone: { contains: search } }
        ]
    }

    if (status && status !== 'ALL') where.status = status
    if (subject && subject !== 'ALL') where.subject = subject

    try {
        const [data, total] = await prisma.$transaction([
            prisma.participant.findMany({
                where,
                skip,
                take: limit,
                orderBy: { registeredAt: 'desc' },
                include: {
                    district: { include: { region: true } },
                    result: true
                }
            }),
            prisma.participant.count({ where })
        ])

        return NextResponse.json({
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to fetch participants' }, { status: 500 })
    }
}
