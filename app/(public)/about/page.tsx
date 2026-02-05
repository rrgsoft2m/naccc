'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export default function AboutPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const items = [
        {
            title: "NAC Nima?",
            content: "National Academic Challenge (NAC) — 1–6-sinf o‘quvchilari uchun matematika va ingliz tili fanlaridan tashkil etiladigan nodavlat, mustaqil akademik olimpiada. Bizning maqsadimiz o'quvchilarda yodlash emas, mantiqiy fikrlashni rivojlantirish."
        },
        {
            title: "Maqsad va Vazifalar",
            content: "Iqtidorli o‘quvchilarni aniqlash, ularda akademik raqobat madaniyatini shakllantirish va xalqaro standartlarga mos ta'lim sifatini monitoring qilish."
        },
        {
            title: "Fanlar",
            content: "Olimpiada 3 ta yo'nalishda o'tkaziladi: Matematika, Ingliz tili va Combo (ikkala fan). Har bir yo'nalish o'quvchining sinfiga moslashtirilgan savollardan iborat."
        },
        {
            title: "Boshqichlar",
            content: "1. Viloyat bosqichi (Saralash)\n2. Respublika bosqichi (Final) - 70% dan yuqori natija ko'rsatganlar uchun."
        },
        {
            title: "Mukofotlar",
            content: "1-o'rin uchun Kubok va planshet, 2-3 o'rinlar uchun medal va esdalik sovg'alari. Barcha ishtirokchilar uchun maxsus QR-kodli sertifikat."
        }
    ]

    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-[#001F3F] mb-8 text-center">About NAC</h1>

                <div className="space-y-4">
                    {items.map((item, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex justify-between items-center p-6 bg-white hover:bg-gray-50 transition text-left"
                            >
                                <span className="font-bold text-lg text-[#001F3F]">{item.title}</span>
                                {openIndex === idx ? <ChevronUp className="text-[#C5A059]" /> : <ChevronDown className="text-gray-400" />}
                            </button>
                            {openIndex === idx && (
                                <div className="p-6 pt-0 bg-white text-gray-600 leading-relaxed border-t border-gray-100">
                                    {item.content.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-gray-50 p-8 rounded-xl border-l-4 border-[#C5A059]">
                    <h3 className="text-xl font-bold text-[#001F3F] mb-4">Yuridik Qoidalar</h3>
                    <ul className="space-y-2 text-gray-600 list-disc ml-5">
                        <li>NAC nodavlat, mustaqil akademik olimpiada hisoblanadi.</li>
                        <li>Davlat attestatsiyasi o‘rnini bosmaydi.</li>
                        <li>To‘lovlar qaytarilmaydi (No Refund Policy).</li>
                        <li>Firibgarlik holatlari aniqlansa, ishtirokchi diskvalifikatsiya qilinadi.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
