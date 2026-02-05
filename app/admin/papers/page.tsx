'use client'

import { useState, useEffect } from 'react'
import { Loader2, Trash, Upload, FileText } from 'lucide-react'

const subjectMap: Record<string, string> = {
    'MATH': 'Matematika',
    'ENGLISH': 'Ingliz tili'
}

export default function PapersPage() {
    const [papers, setPapers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)

    const fetchPapers = async () => {
        const res = await fetch('/api/admin/papers')
        const data = await res.json()
        setPapers(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchPapers()
    }, [])

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        setUploading(true)
        const formData = new FormData(form)

        await fetch('/api/admin/papers', {
            method: 'POST',
            body: formData
        })

        setUploading(false)
        form.reset()
        fetchPapers()
    }

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-[#001F3F]">Namuna Testlar</h1>

            {/* Upload Form */}
            <div className="bg-white p-6 rounded shadow">
                <h2 className="font-bold mb-4 flex items-center gap-2"><Upload className="w-4 h-4" /> Yangi Fayl Yuklash</h2>
                <form onSubmit={handleUpload} className="flex gap-4 items-end flex-wrap">
                    <div>
                        <label className="block text-sm mb-1">Mavzu (Sarlavha)</label>
                        <input name="title" required className="border p-2 rounded w-64" placeholder="Matematika 1-sinf Demo" />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Fan</label>
                        <select name="subject" className="border p-2 rounded">
                            <option value="MATH">Matematika</option>
                            <option value="ENGLISH">Ingliz tili</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Sinf</label>
                        <select name="grade" className="border p-2 rounded">
                            {[1, 2, 3, 4, 5, 6].map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm mb-1">PDF Fayl</label>
                        <input type="file" name="file" accept="application/pdf" required className="border p-1 rounded" />
                    </div>
                    <button disabled={uploading} className="bg-[#001F3F] text-white px-4 py-2 rounded font-bold">
                        {uploading ? <Loader2 className="animate-spin" /> : 'Yuklash'}
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="bg-white rounded shadow p-6">
                <h2 className="font-bold mb-4">Yuklangan Fayllar</h2>
                {loading ? <Loader2 className="animate-spin" /> : (
                    <ul className="space-y-2">
                        {papers.map((paper) => (
                            <li key={paper.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                                <div className="flex items-center gap-3">
                                    <FileText className="text-red-500 w-5 h-5" />
                                    <div>
                                        <div className="font-bold">{paper.title}</div>
                                        <div className="text-xs text-gray-500">{subjectMap[paper.subject] || paper.subject} | {paper.grade}-sinf</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <a href={paper.fileUrl} target="_blank" className="text-blue-500 hover:underline text-sm">Yuklab olish</a>
                                    <DeleteButton id={paper.id} onDeleteSuccess={fetchPapers} />
                                </div>
                            </li>
                        ))}
                        {papers.length === 0 && <p className="text-gray-500">Hozircha fayllar yo‘q.</p>}
                    </ul>
                )}
            </div>
        </div>
    )
}

// Local DeleteButton for simple immediate deletion
function DeleteButton({ id, onDeleteSuccess }: { id: string, onDeleteSuccess: () => void }) {
    const [deleting, setDeleting] = useState(false)

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent row click events
        setDeleting(true)
        try {
            const res = await fetch(`/api/admin/papers?id=${id}`, { method: 'DELETE' })
            if (!res.ok) {
                const data = await res.json()
                alert(`Xatolik: ${data.error || 'O‘chirishda xatolik'}`)
            } else {
                onDeleteSuccess()
            }
        } catch (error) {
            alert('Internet bilan aloqa yo‘q yoki server xatosi')
        } finally {
            setDeleting(false)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-500 hover:bg-red-50 p-1 rounded"
            title="O‘chirish"
        >
            {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash className="w-4 h-4" />}
        </button>
    )
}
