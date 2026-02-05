import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
    try {
        const student = await prisma.participant.findUnique({
            where: { id }
        })
        if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json(student)
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
    try {
        const body = await request.json()
        const { firstName, lastName, phone, school, grade, subject, status } = body

        const updated = await prisma.participant.update({
            where: { id },
            data: {
                firstName,
                lastName,
                phone,
                school,
                grade: parseInt(grade),
                subject,
                status
            }
        })

        return NextResponse.json(updated)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
    }
}
