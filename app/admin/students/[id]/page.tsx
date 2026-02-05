'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Loader2, Save, ArrowLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'

export default function EditStudentPage() {
    const params = useParams()
    const router = useRouter()
    const { register, handleSubmit, reset } = useForm()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetch(`/api/admin/students/${params.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert('O‘quvchi topilmadi')
                    router.push('/admin/students')
                } else {
                    reset(data)
                    setLoading(false)
                }
            })
    }, [params.id, router, reset])

    const onSubmit = async (data: any) => {
        setSaving(true)
        try {
            const res = await fetch(`/api/admin/students/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (res.ok) {
                alert('O‘zgarishlar saqlandi')
                router.push('/admin/students')
            } else {
                alert('Xatolik yuz berdi')
            }
        } catch (e) {
            alert('Tizim xatoligi')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-8"><Loader2 className="animate-spin" /></div>

    return (
        <div className="p-8 max-w-2xl">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 mb-6 hover:text-[#001F3F]">
                <ArrowLeft className="w-4 h-4" /> Orqaga
            </button>

            <h1 className="text-2xl font-bold text-[#001F3F] mb-6">O‘quvchi Ma'lumotlarini Tahrirlash</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm mb-1">Ism</label>
                        <input {...register('firstName')} className="border p-2 rounded w-full text-black" required />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Familiya</label>
                        <input {...register('lastName')} className="border p-2 rounded w-full text-black" required />
                    </div>
                </div>

                <div>
                    <label className="block text-sm mb-1">Telefon</label>
                    <input {...register('phone')} className="border p-2 rounded w-full text-black" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm mb-1">Maktab</label>
                        <input {...register('school')} className="border p-2 rounded w-full text-black" required />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Sinf</label>
                        <input {...register('grade')} type="number" className="border p-2 rounded w-full text-black" required />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm mb-1">Fan</label>
                        <select {...register('subject')} className="border p-2 rounded w-full text-black">
                            <option value="MATH">Matematika</option>
                            <option value="ENGLISH">Ingliz tili</option>
                            <option value="COMBO">Ikkalasiham</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Holat</label>
                        <select {...register('status')} className="border p-2 rounded w-full text-black">
                            <option value="PENDING">Kutilmoqda</option>
                            <option value="PAID">To‘lov qilgan</option>
                        </select>
                    </div>
                </div>

                <button
                    disabled={saving}
                    className="bg-[#001F3F] text-white px-6 py-2 rounded font-bold w-full flex items-center justify-center gap-2 hover:bg-[#003366] transition"
                >
                    {saving ? <Loader2 className="animate-spin" /> : <><Save className="w-4 h-4" /> Saqlash</>}
                </button>
            </form>
        </div>
    )
}
