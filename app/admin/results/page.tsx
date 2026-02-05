'use client'

import { useState, useEffect } from 'react'
import { Loader2, Upload, FileSpreadsheet, Plus } from 'lucide-react'
import { Modal } from '@/app/components/ui/Modal'

export default function AdminResultsPage() {
    const [uploading, setUploading] = useState(false)
    const [message, setMessage] = useState('')
    const [results, setResults] = useState<any[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetchResults = async () => {
        try {
            const res = await fetch('/api/admin/results/import')
            const data = await res.json()
            if (Array.isArray(data)) setResults(data)
        } catch (e) { console.error(e) }
    }

    useEffect(() => {
        fetchResults()
    }, [])

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setUploading(true)
        setMessage('')

        const formData = new FormData(e.currentTarget)

        try {
            const res = await fetch('/api/admin/results/import', {
                method: 'POST',
                body: formData
            })
            const data = await res.json()
            if (res.ok) {
                setMessage(`Muvaffaqiyatli yuklandi: ${data.count} ta natija`)
                e.currentTarget.reset()
                fetchResults()
                // Don't close immediately to show success message
                setTimeout(() => {
                    setIsModalOpen(false)
                    setMessage('')
                }, 2000)
            } else {
                setMessage(`Xatolik: ${data.error}`)
            }
        } catch (error) {
            setMessage('Tizimda xatolik yuz berdi')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#001F3F]">Natijalarni Boshqarish</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700 transition shadow-lg"
                >
                    <FileSpreadsheet className="w-4 h-4" />
                    Excel Yuklash
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Excel orqali yuklash">
                <div className="space-y-4">
                    <p className="text-gray-600 text-sm">
                        Fayl ustunlari: <strong>ID, Ism, Fan, Ball, Rank</strong> kabi bo‘lishi kerak.
                    </p>

                    <form onSubmit={handleUpload} className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition cursor-pointer relative">
                            <input
                                type="file"
                                name="file"
                                accept=".xlsx, .xls"
                                required
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center gap-2 pointer-events-none">
                                <Upload className="w-8 h-8 text-gray-400" />
                                <span className="text-gray-500 font-medium">Excel faylni tanlang (Drag & Drop)</span>
                            </div>
                        </div>

                        <button
                            disabled={uploading}
                            className="bg-[#001F3F] text-white w-full py-2 rounded font-bold hover:bg-[#003366] transition flex items-center justify-center gap-2"
                        >
                            {uploading ? <Loader2 className="animate-spin" /> : 'Yuklash'}
                        </button>

                        {message && (
                            <div className={`p-3 rounded-lg text-sm font-medium ${message.startsWith('Xatolik') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                {message}
                            </div>
                        )}
                    </form>
                </div>
            </Modal>

            {/* Results Table */}
            <div className="bg-white rounded shadow-lg border-t-4 border-[#C5A059] p-6 mt-8">
                <h2 className="font-bold mb-4 text-[#001F3F]">Mavjud Natijalar</h2>
                {results.length === 0 ? <p className="text-gray-500">Natijalar yo‘q.</p> : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="p-3 text-sm font-bold text-gray-600">ID</th>
                                    <th className="p-3 text-sm font-bold text-gray-600">O‘quvchi</th>
                                    <th className="p-3 text-sm font-bold text-gray-600">Fan</th>
                                    <th className="p-3 text-sm font-bold text-gray-600">Ball</th>
                                    <th className="p-3 text-sm font-bold text-gray-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((r: any) => (
                                    <tr key={r.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                                        <td className="p-3 font-mono text-xs text-blue-600">{r.participant?.id ? r.participant.id.slice(0, 8) + '...' : 'N/A'}</td>
                                        <td className="p-3 font-medium">{r.participant?.firstName} {r.participant?.lastName}</td>
                                        <td className="p-3 text-sm">{r.participant?.subject}</td>
                                        <td className="p-3 font-bold text-[#001F3F]">{r.score}</td>
                                        <td className="p-3">
                                            {r.score >= 80 ? (
                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold border border-green-200">
                                                    Sertifikat
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 text-xs">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
