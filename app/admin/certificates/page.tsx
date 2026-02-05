'use client'

import { useState, useEffect, useRef } from 'react'
import { Loader2, Download, Search } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import CertificateTemplate from '../../components/CertificateTemplate'

export default function AdminCertificatesPage() {
    const [students, setStudents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    // PDF Generation State
    const [downloadingId, setDownloadingId] = useState<string | null>(null)
    const [targetStudent, setTargetStudent] = useState<any>(null)
    const certificateRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        fetch('/api/admin/participants?limit=1000')
            .then(res => res.json())
            .then(data => {
                // Safely access data.data and filter: must have result and score >= 80
                const participants = Array.isArray(data?.data) ? data.data : []
                const qualified = participants.filter((s: any) => s.result && s.result.score >= 80)
                setStudents(qualified)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    const filtered = students.filter(s =>
        s.firstName.toLowerCase().includes(search.toLowerCase()) ||
        s.lastName.toLowerCase().includes(search.toLowerCase())
    )

    // Trigger PDF generation when targetStudent is set and ref is ready
    useEffect(() => {
        if (targetStudent && certificateRef.current) {
            const generatePDF = async () => {
                try {
                    // Small delay to ensure rendering is complete (images etc)
                    await new Promise(resolve => setTimeout(resolve, 100))

                    const canvas = await html2canvas(certificateRef.current!, {
                        scale: 2,
                        useCORS: true,
                        logging: false,
                        backgroundColor: '#ffffff'
                    })

                    const imgData = canvas.toDataURL('image/png')
                    const pdf = new jsPDF({
                        orientation: 'landscape',
                        unit: 'mm',
                        format: 'a4'
                    })

                    const imgWidth = 297
                    const imgHeight = 210

                    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
                    pdf.save(`certificate-${targetStudent.firstName}-${targetStudent.lastName}.pdf`)
                } catch (err) {
                    console.error("PDF Failed", err)
                    alert("PDF yuklab olishda xatolik!")
                } finally {
                    setDownloadingId(null)
                    setTargetStudent(null)
                }
            }

            generatePDF()
        }
    }, [targetStudent])

    const handleDownload = (student: any) => {
        setDownloadingId(student.id)
        setTargetStudent(student)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#001F3F]">Sertifikatlar (80%+)</h1>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    className="border p-2 pl-9 rounded w-full"
                    placeholder="Qidirish..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {loading ? <Loader2 className="animate-spin" /> : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#001F3F]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">O'quvchi</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fan</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Ball</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Amallar</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filtered.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{student.firstName} {student.lastName}</div>
                                        <div className="text-xs text-gray-500">{student.school}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {student.subject}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {student.result.score}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleDownload(student)}
                                            disabled={downloadingId === student.id}
                                            className="text-[#001F3F] hover:text-[#C5A059] flex items-center gap-1 ml-auto disabled:opacity-50"
                                        >
                                            {downloadingId === student.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Download className="w-4 h-4" />
                                            )}
                                            <span className="hidden md:inline">PDF</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div className="p-4 text-center text-gray-500">
                            Hech qanday sertifikat topilmadi.
                        </div>
                    )}
                </div>
            )}

            {/* Hidden Certificate Rendering Area */}
            <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '1123px', height: '795px' }}>
                {targetStudent && (
                    <CertificateTemplate
                        ref={certificateRef}
                        participant={targetStudent}
                        result={targetStudent.result}
                    />
                )}
            </div>
        </div>
    )
}
