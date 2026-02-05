'use client'

import React, { forwardRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'

interface CertificateTemplateProps {
    participant: {
        id: string
        firstName: string
        lastName: string
        subject: string
    }
    result: {
        score: number
        rank?: number | null
        createdAt: string | Date
    }
}

const CertificateTemplate = forwardRef<HTMLDivElement, CertificateTemplateProps>(({ participant, result }, ref) => {
    const subjectMap: Record<string, string> = {
        'MATH': 'Matematika',
        'ENGLISH': 'Ingliz tili',
        'Math': 'Matematika',
        'English': 'Ingliz tili'
    }

    const displaySubject = subjectMap[participant.subject] || participant.subject

    return (
        <div
            ref={ref}
            className="bg-[#ffffff] p-2 shadow-2xl max-w-[900px] w-full aspect-[1.414/1] relative print:shadow-none print:w-full print:h-screen print:absolute print:top-0 print:left-0"
        >
            {/* Border Frame */}
            <div className="h-full w-full border-[16px] border-[#001F3F] relative p-6 flex flex-col items-center justify-between overflow-hidden">
                <div className="absolute top-0 left-0 w-24 h-24 border-t-[16px] border-l-[16px] border-[#C5A059] z-10" />
                <div className="absolute top-0 right-0 w-24 h-24 border-t-[16px] border-r-[16px] border-[#C5A059] z-10" />
                <div className="absolute bottom-0 left-0 w-24 h-24 border-b-[16px] border-l-[16px] border-[#C5A059] z-10" />
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-[16px] border-r-[16px] border-[#C5A059] z-10" />

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
                    <div className="w-[500px] h-[500px] rounded-full border-[50px] border-[#001F3F]" />
                </div>

                {/* Header */}
                <div className="text-center mt-6 z-20">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <h2 className="text-[#C5A059] font-bold tracking-[0.3em] uppercase text-sm">National Academic Challenge</h2>
                    </div>
                    <h1 className="text-5xl md:text-5xl font-serif font-bold text-[#001F3F] tracking-widest uppercase mb-1">Sertifikat</h1>
                    <p className="text-[#C5A059] text-lg font-medium tracking-widest uppercase">Muvaffaqiyatli Ishtirok Uchun</p>
                </div>

                {/* Body */}
                <div className="text-center w-full max-w-2xl z-20 space-y-1">
                    <p className="text-[#6b7280] font-serif italic text-base">Ushbu sertifikat taqdim etiladi:</p>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#001F3F] py-3 border-b-2 border-[#C5A059] inline-block min-w-[300px] px-8">
                        {participant.firstName} {participant.lastName}
                    </h2>
                    <div className="pt-4 text-[#374151] text-base leading-relaxed">
                        <p>
                            <strong>National Academic Challenge</strong> olimpiadasida
                            <span className="font-bold text-[#001F3F]"> {displaySubject} </span>
                            fanidan ishtirok etib, yuqori natija qayd etgani uchun.
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-6 w-full max-w-3xl mt-4 z-20">
                    <div className="text-center">
                        <p className="text-[#C5A059] uppercase text-[10px] font-bold tracking-widest mb-1">TO‘PLANGAN BALL</p>
                        <p className="text-2xl font-bold text-[#001F3F]">{result.score}</p>
                    </div>
                    <div className="text-center border-x border-[#e5e7eb]">
                        <p className="text-[#C5A059] uppercase text-[10px] font-bold tracking-widest mb-1">EGALLAGAN O‘RNI</p>
                        <p className="text-2xl font-bold text-[#001F3F]">
                            {result.rank ? `${result.rank}-o‘rin` : 'Yuqori'}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-[#C5A059] uppercase text-[10px] font-bold tracking-widest mb-1">SANA</p>
                        <p className="text-lg font-bold text-[#001F3F] mt-1">
                            {new Date(result.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end w-full px-12 pb-6 z-20 mt-6">
                    <div className="text-center">
                        <div className="w-32 h-16 border-b-2 border-[#001F3F] mb-2"></div>
                        <p className="text-xs text-[#001F3F] uppercase font-bold tracking-widest">Direktor Imzosi</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="bg-[#ffffff] p-2 rounded shadow-sm border border-[#e5e7eb]">
                            <QRCodeSVG
                                value={`https://nacc.uz/certificate/${participant.id}`}
                                size={80}
                                fgColor="#001F3F"
                            />
                        </div>
                        <p className="text-[10px] text-[#9ca3af] mt-1 uppercase tracking-wide">ID: {participant.id}</p>
                    </div>

                    <div className="text-center w-32">
                    </div>
                </div>
            </div>
        </div>
    )
})

CertificateTemplate.displayName = 'CertificateTemplate'

export default CertificateTemplate
