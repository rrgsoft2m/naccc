import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { firstName, lastName, phone, school, grade, subject, districtId, regionId } = body

        // Validation (Simple)
        if (!firstName || !lastName || !phone || !districtId) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }

        // Check duplicate phone/name combo? For now allow.

        const participant = await prisma.participant.create({
            data: {
                firstName,
                lastName,
                phone,
                school,
                grade: parseInt(grade),
                subject,
                districtId,
                regionId, // Optional but good for easy filtering
                status: 'PENDING'
            }
        })

        return NextResponse.json({ success: true, id: participant.id })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
    }
}
