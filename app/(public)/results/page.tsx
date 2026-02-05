'use client'

import { useState } from 'react'
import { Search, Trophy } from 'lucide-react'

export default function ResultsPage() {
    const [id, setId] = useState('')
    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setResult(null)

        try {
            const res = await fetch(`/api/results?id=${id}`)
            const data = await res.json()

            if (res.ok) {
                setResult(data)
            } else {
                setError('Natija topilmadi. ID raqamingizni tekshiring yoki natijalar hali e\'lon qilinmagan.')
            }
        } catch (e) {
            setError('Tizim xatoligi, qayta urinib ko‘ring.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4">
            <div className="max-w-xl mx-auto text-center">
                <h1 className="text-3xl font-bold text-[#001F3F] mb-6">Natijalarni Tekshirish</h1>

                <div className="bg-white p-8 rounded-2xl shadow-xl">
                    <form onSubmit={handleSearch} className="mb-6">
                        <label className="block text-left text-sm font-medium text-gray-700 mb-2">ID Raqamingiz</label>
                        <div className="flex gap-2">
                            <input
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                placeholder="Masalan: cm6k..."
                                className="flex-1 border p-3 rounded-lg focus:ring-2 focus:ring-[#001F3F]"
                            />
                            <button disabled={loading} className="bg-[#001F3F] text-white px-6 rounded-lg font-bold">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </form>

                    {loading && <div className="text-gray-500">Qidirilmoqda...</div>}

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {result && (
                        <div className="bg-green-50 border border-green-200 p-6 rounded-xl animate-fade-in">
                            <Trophy className="w-12 h-12 text-[#C5A059] mx-auto mb-4" />
                            <h2 className="text-xl font-bold text-[#001F3F] mb-1">{result.participant.firstName} {result.participant.lastName}</h2>
                            <p className="text-sm text-gray-500 mb-4">{result.participant.subject} fani</p>

                            <div className="text-4xl font-bold text-[#001F3F] mb-2">{result.result.score} Ball</div>

                            {result.result.isQualified ? (
                                <p className="text-green-600 font-bold bg-green-100 py-2 rounded">Tabriklaymiz! Siz o'tdingiz.</p>
                            ) : (
                                <p className="text-red-500 font-medium">Afsuski, o'tish ballini to'play olmadingiz.</p>
                            )}

                            {result.result.rank && <div className="mt-4 text-sm text-gray-600">O'rin: {result.result.rank}</div>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
