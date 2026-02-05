import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import * as XLSX from 'xlsx'

export async function GET() {
    try {
        const results = await prisma.result.findMany({
            include: { participant: true },
            orderBy: { score: 'desc' }
        })
        return NextResponse.json(results)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'Fayl tanlanmagan' }, { status: 400 })
        }

        const buffer = await file.arrayBuffer()
        const workbook = XLSX.read(buffer)
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[]

        // Expected columns: ID (Participant ID), Ism, Fan, Ball, Rank
        // If ID matches, we update the result
        // Note: For now assuming we are updating existing participants' results by their ID or creating new result records linked to them.

        let count = 0

        for (const row of jsonData) {
            // We need a participant ID to link the result. 
            // If the excel has 'ID' column which corresponds to participant.id
            const participantId = row['ID']
            const score = parseFloat(row['Ball']) || 0
            const rank = parseInt(row['Rank']) || 0

            if (participantId) {
                // Find participant first to ensure exists
                const participant = await prisma.participant.findUnique({ where: { id: participantId } })

                if (participant) {
                    await prisma.result.upsert({
                        where: { participantId },
                        create: {
                            participantId,
                            score,
                            rank: rank > 0 ? rank : undefined,
                            isQualified: score >= 70, // Example logic
                            correctAnswers: Math.floor(score / 5), // Approximation if not provided
                        },
                        update: {
                            score,
                            rank: rank > 0 ? rank : undefined,
                            isQualified: score >= 70
                        }
                    })
                    count++
                }
            }
        }

        return NextResponse.json({ success: true, count })
    } catch (error) {
        console.error('Import error:', error)
        return NextResponse.json({ error: 'Import failed' }, { status: 500 })
    }
}
