'use client'

import { useState, useEffect } from 'react'
import { FileText, Download } from 'lucide-react'

export default function SamplePapersPage() {
    const [papers, setPapers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [filterSubject, setFilterSubject] = useState('ALL')
    const [filterGrade, setFilterGrade] = useState('ALL')

    useEffect(() => {
        fetch('/api/admin/papers')
            .then(res => res.json())
            .then(data => {
                setPapers(Array.isArray(data) ? data : [])
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    const filtered = papers.filter(p => {
        if (filterSubject !== 'ALL' && p.subject !== filterSubject) return false
        if (filterGrade !== 'ALL' && p.grade.toString() !== filterGrade) return false
        return true
    })

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-[#001F3F] mb-8 text-center">Namuna Testlar</h1>

                <div className="flex justify-center gap-4 mb-12">
                    <button
                        onClick={() => setFilterSubject('ALL')}
                        className={`px-4 py-2 rounded-full ${filterSubject === 'ALL' ? 'bg-[#001F3F] text-white' : 'bg-white border'}`}
                    >
                        Barchasi
                    </button>
                    <button
                        onClick={() => setFilterSubject('MATH')}
                        className={`px-4 py-2 rounded-full ${filterSubject === 'MATH' ? 'bg-[#001F3F] text-white' : 'bg-white border'}`}
                    >
                        Matematika
                    </button>
                    <button
                        onClick={() => setFilterSubject('ENGLISH')}
                        className={`px-4 py-2 rounded-full ${filterSubject === 'ENGLISH' ? 'bg-[#001F3F] text-white' : 'bg-white border'}`}
                    >
                        Ingliz tili
                    </button>
                </div>

                {loading ? (
                    <div className="text-center">Yuklanmoqda...</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map(paper => (
                            <div key={paper.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                    <FileText className="text-red-600 w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-[#001F3F]">{paper.title}</h3>
                                    <p className="text-sm text-gray-500">{paper.grade}-sinf</p>
                                </div>
                                <a href={paper.fileUrl} download className="p-2 hover:bg-gray-100 rounded-full">
                                    <Download className="w-5 h-5 text-gray-500" />
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
