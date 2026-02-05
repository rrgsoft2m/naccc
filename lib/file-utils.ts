import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

export async function saveFile(file: File, folder: string): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer())

    // Get extension
    const ext = path.extname(file.name) || (file.type.startsWith('image/') ? '.jpg' : file.type.startsWith('video/') ? '.mp4' : '.bin')

    // Generate safe filename
    const filename = `${Date.now()}-${randomUUID()}${ext}`

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder)

    try {
        await mkdir(uploadDir, { recursive: true })
        await writeFile(path.join(uploadDir, filename), buffer)
        return `/uploads/${folder}/${filename}`
    } catch (error) {
        console.error('File save error:', error)
        throw new Error('File save failed')
    }
}
