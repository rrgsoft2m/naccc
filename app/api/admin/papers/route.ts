import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { put } from '@vercel/blob'

export async function GET() {
    try {
        const papers = await prisma.testPaper.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(papers)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch papers' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const title = formData.get('title') as string
        const subject = formData.get('subject') as string
        const grade = parseInt(formData.get('grade') as string)
        const file = formData.get('file') as File

        if (!title || !subject || !grade || !file) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }

        const blob = await put(file.name, file, { access: 'public' })

        const paper = await prisma.testPaper.create({
            data: {
                title,
                subject,
                grade,
                fileUrl: blob.url
            }
        })

        return NextResponse.json(paper)
    } catch (error) {
        console.error('Paper upload error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    try {
        await prisma.testPaper.delete({ where: { id } })
        // Optional: Delete file from disk using fs/promises. Accessing the path might require a DB lookup first if we want to be strict.
        return NextResponse.json({ success: true })
    } catch (e) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
    }
}
