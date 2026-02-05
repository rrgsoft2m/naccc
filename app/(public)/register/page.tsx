'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle, Send } from 'lucide-react'

// Schema
const registerSchema = z.object({
    firstName: z.string().min(2, "Ism kiritish shart"),
    lastName: z.string().min(2, "Familiya kiritish shart"),
    phone: z.string().min(9, "Telefon raqam noto‘g‘ri"),
    regionId: z.string().min(1, "Viloyatni tanlang"),
    districtId: z.string().min(1, "Tumanni tanlang"),
    school: z.string().min(1, "Maktab raqamini kiriting"),
    grade: z.string().min(1, "Sinfni tanlang"),
    subject: z.enum(["MATH", "ENGLISH", "COMBO"])
})

type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterPage() {
    const router = useRouter()
    const [regions, setRegions] = useState<any[]>([])
    const [districts, setDistricts] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [fetchingLocs, setFetchingLocs] = useState(true)

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            subject: undefined
        }
    })

    // Watch region to filter districts
    const selectedRegionId = watch('regionId')

    useEffect(() => {
        fetch('/api/locations')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setRegions(data)
                } else {
                    console.error('Failed to load regions:', data)
                    setRegions([])
                }
                setFetchingLocs(false)
            })
            .catch(err => {
                console.error('Fetch error:', err)
                setRegions([])
                setFetchingLocs(false)
            })
    }, [])

    useEffect(() => {
        if (selectedRegionId) {
            const region = regions.find(r => r.id === selectedRegionId)
            setDistricts(region ? region.districts : [])
            setValue('districtId', '') // Reset district when region changes
        }
    }, [selectedRegionId, regions, setValue])

    const onSubmit = async (data: RegisterForm) => {
        setLoading(true)
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const result = await res.json()

            if (res.ok) {
                // Redirect to payment/confirmation
                router.push(`/payment/${result.id}`)
            } else {
                alert(result.error || 'Xatolik yuz berdi')
            }
        } catch (error) {
            alert('Internet bilan aloqa yo‘q')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-[#001F3F]">NAC Olimpiadasiga Ro‘yxatdan O‘tish</h1>
                    <p className="mt-2 text-gray-600">Ma'lumotlarni to‘g‘ri va aniq kiriting. Ular sertifikatda aks etadi.</p>
                </div>

                <div className="bg-white shadow-xl rounded-2xl p-8 border-t-4 border-[#C5A059]">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Personal Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ism</label>
                                <input {...register('firstName')} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#001F3F] text-black" placeholder="Ali" />
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Familiya</label>
                                <input {...register('lastName')} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#001F3F] text-black" placeholder="Valiyev" />
                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon Raqam (Ota-ona)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">+998</span>
                                <input {...register('phone')} className="w-full border p-3 pl-14 rounded-lg focus:ring-2 focus:ring-[#001F3F] text-black" placeholder="90 123 45 67" />
                            </div>
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                        </div>

                        {/* Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Viloyat</label>
                                <select {...register('regionId')} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#001F3F] text-black">
                                    <option value="">Tanlang...</option>
                                    {regions.map(r => (
                                        <option key={r.id} value={r.id}>{r.name}</option>
                                    ))}
                                </select>
                                {errors.regionId && <p className="text-red-500 text-xs mt-1">{errors.regionId.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tuman</label>
                                <select
                                    {...register('districtId')}
                                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#001F3F] text-black"
                                    disabled={!selectedRegionId}
                                >
                                    <option value="">Oldin viloyatni tanlang...</option>
                                    {districts.map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                                {errors.districtId && <p className="text-red-500 text-xs mt-1">{errors.districtId.message}</p>}
                            </div>
                        </div>

                        {/* School & Grade */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Maktab</label>
                                <input {...register('school')} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#001F3F] text-black" placeholder="21-maktab" />
                                {errors.school && <p className="text-red-500 text-xs mt-1">{errors.school.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sinf</label>
                                <select {...register('grade')} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#001F3F] text-black">
                                    <option value="">Tanlang...</option>
                                    {[1, 2, 3, 4, 5, 6].map(g => (
                                        <option key={g} value={g}>{g}-sinf</option>
                                    ))}
                                </select>
                                {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade.message}</p>}
                            </div>
                        </div>

                        {/* Subject Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Fan Yo‘nalishi</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <label className={`border-2 rounded-xl p-4 cursor-pointer hover:border-[#001F3F] transition ${watch('subject') === 'MATH' ? 'border-[#001F3F] bg-blue-50' : 'border-gray-200'}`}>
                                    <input type="radio" value="MATH" {...register('subject')} className="sr-only" />
                                    <div className="font-bold text-[#001F3F]">Matematika</div>
                                    <div className="text-sm text-gray-500">20 ta savol</div>
                                </label>
                                <label className={`border-2 rounded-xl p-4 cursor-pointer hover:border-[#001F3F] transition ${watch('subject') === 'ENGLISH' ? 'border-[#001F3F] bg-red-50' : 'border-gray-200'}`}>
                                    <input type="radio" value="ENGLISH" {...register('subject')} className="sr-only" />
                                    <div className="font-bold text-[#001F3F]">Ingliz tili</div>
                                    <div className="text-sm text-gray-500">20 ta savol</div>
                                </label>
                                <label className={`border-2 rounded-xl p-4 cursor-pointer hover:border-[#001F3F] transition ${watch('subject') === 'COMBO' ? 'border-[#001F3F] bg-purple-50' : 'border-gray-200'}`}>
                                    <input type="radio" value="COMBO" {...register('subject')} className="sr-only" />
                                    <div className="font-bold text-[#001F3F]">Combo</div>
                                    <div className="text-sm text-gray-500">Ikkala fan (40 ta)</div>
                                </label>
                            </div>
                            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#001F3F] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#003366] transition flex items-center justify-center gap-2 shadow-lg"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : 'Ro‘yxatdan O‘tish'}
                            </button>

                            <a
                                href="https://t.me/nac_bot"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full mt-4 bg-white text-[#0088cc] border-2 border-[#0088cc] py-4 rounded-xl font-bold text-lg hover:bg-[#0088cc] hover:text-white transition flex items-center justify-center gap-2 shadow-lg"
                            >
                                <Send className="w-5 h-5" />
                                Telegram bot orqali
                            </a>
                            <p className="text-center text-gray-500 text-xs mt-4">
                                Tugmani bosish orqali siz ommaviy oferta shartlariga rozilik bildirasiz.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
