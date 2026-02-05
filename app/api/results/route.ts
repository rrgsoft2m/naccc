import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
        return NextResponse.json({ error: 'ID kiritilishi shart' }, { status: 400 })
    }

    try {
        const result = await prisma.result.findFirst({
            where: {
                participant: {
                    id: { equals: id }
                }
            },
            include: {
                participant: true
            }
        })

        if (!result) {
            return NextResponse.json({ error: 'Natija topilmadi' }, { status: 404 })
        }

        return NextResponse.json({
            participant: result.participant,
            result: result
        })
    } catch (error) {
        return NextResponse.json({ error: 'Tizimda xatolik' }, { status: 500 })
    }
}
