'use client'

import { useState, useEffect } from 'react'
import { Loader2, Save } from 'lucide-react'

// Defined content keys based on requirement
const CONTENT_SECTIONS = [
    { key: 'home_hero_title', label: 'Bosh Sahifa: Asosiy Sarlavha', type: 'text' },
    { key: 'home_hero_subtitle', label: 'Bosh Sahifa: Ost Sarlavha', type: 'text' },
    { key: 'about_text', label: 'Biz Haqimizda: Asosiy Matn', type: 'textarea' },
    { key: 'contact_phone', label: 'Aloqa: Telefon', type: 'text' },
    { key: 'contact_address', label: 'Aloqa: Manzil', type: 'textarea' },
]

export default function ContentPage() {
    const [contents, setContents] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(data => {
                const map: any = {}
                data.forEach((d: any) => map[d.key] = d.content)
                setContents(map)
                setLoading(false)
            })
    }, [])

    const handleSave = async (key: string) => {
        setSaving(true)
        await fetch('/api/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, content: contents[key] })
        })
        setSaving(false)
        alert('Saqlandi!')
    }

    if (loading) return <div>Yuklanmoqda...</div>

    return (
        <div className="max-w-4xl">
            <h1 className="text-2xl font-bold text-[#001F3F] mb-6">Sayt Matnlarini Boshqarish</h1>

            <div className="space-y-6">
                {CONTENT_SECTIONS.map((section) => (
                    <div key={section.key} className="bg-white p-6 rounded shadow">
                        <label className="block font-medium text-gray-700 mb-2">{section.label}</label>
                        <div className="flex gap-4 items-start">
                            {section.type === 'textarea' ? (
                                <textarea
                                    className="flex-1 border p-2 rounded h-32 focus:ring-2 focus:ring-[#001F3F]"
                                    value={contents[section.key] || ''}
                                    onChange={(e) => setContents({ ...contents, [section.key]: e.target.value })}
                                />
                            ) : (
                                <input
                                    type="text"
                                    className="flex-1 border p-2 rounded focus:ring-2 focus:ring-[#001F3F]"
                                    value={contents[section.key] || ''}
                                    onChange={(e) => setContents({ ...contents, [section.key]: e.target.value })}
                                />
                            )}
                            <button
                                onClick={() => handleSave(section.key)}
                                disabled={saving}
                                className="bg-[#001F3F] text-white p-2 rounded hover:bg-[#003366] transition"
                            >
                                {saving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
