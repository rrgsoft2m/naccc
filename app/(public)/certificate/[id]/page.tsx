'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { Loader2, XCircle } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import CertificateTemplate from '../../../components/CertificateTemplate'

export default function CertificatePage() {
    const params = useParams()
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const certificateRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!params.id) return

        fetch(`/api/results?id=${params.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else if (!data.isQualified && data.score < 80) {
                    setError('Ushbu o\'quvchi sertifikat olish uchun yetarli ball to‘plamagan.')
                } else {
                    setData(data)
                }
            })
            .catch(() => setError('Xatolik yuz berdi'))
            .finally(() => setLoading(false))
    }, [params.id])

    // Auto-actions based on URL params
    useEffect(() => {
        if (!loading && data && typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search)

            if (searchParams.get('print') === 'true') {
                const timer = setTimeout(() => {
                    window.print()
                }, 1000)
                return () => clearTimeout(timer)
            }

            if (searchParams.get('download') === 'true') {
                const timer = setTimeout(async () => {
                    if (certificateRef.current) {
                        try {
                            const canvas = await html2canvas(certificateRef.current, {
                                scale: 2, // Higher quality
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

                            const imgWidth = 297 // A4 width in mm
                            const imgHeight = 210 // A4 height in mm

                            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
                            pdf.save(`certificate-${data.participant.firstName}-${data.participant.lastName}.pdf`)

                            // Close window after download
                            setTimeout(() => {
                                window.close()
                            }, 1000)
                        } catch (err) {
                            console.error('PDF creation failed', err)
                            alert('PDF yuklab olishda xatolik yuz berdi')
                        }
                    }
                }, 1000)
                return () => clearTimeout(timer)
            }
        }
    }, [loading, data])

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8 text-[#001F3F]" /></div>

    if (error) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Sertifikat Topilmadi</h1>
            <p className="text-gray-600">{error}</p>
        </div>
    )

    if (!data) return null

    const { participant, result } = data

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 print:p-0 print:bg-white">
            <CertificateTemplate
                ref={certificateRef}
                participant={participant}
                result={result}
            />
        </div>
    )
}
