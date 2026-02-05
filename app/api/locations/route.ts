import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const regions = await prisma.region.findMany({
            include: {
                districts: true
            },
            orderBy: {
                name: 'asc'
            }
        })
        return NextResponse.json(regions)
    } catch (error) {
        console.error('Locations API Error:', error)
        return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 })
    }
}
