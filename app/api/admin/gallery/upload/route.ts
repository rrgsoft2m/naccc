import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { saveFile } from '@/lib/file-utils'

export async function GET() {
    try {
        const items = await prisma.galleryItem.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(items)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        const type = file.type.startsWith('video/') ? 'VIDEO' : 'IMAGE'
        const fileUrl = await saveFile(file, 'gallery')

        const item = await prisma.galleryItem.create({
            data: {
                imageUrl: fileUrl,
                type
            }
        })

        return NextResponse.json(item)
    } catch (error) {
        console.error('Gallery upload error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    try {
        await prisma.galleryItem.delete({ where: { id } })
        return NextResponse.json({ success: true })
    } catch (e) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
    }
}
