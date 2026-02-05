'use client'

import { Mail, Phone, MapPin, MessageCircle, Loader2, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ContactPage() {
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const onSubmit = async (data: any) => {
        setLoading(true)
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (res.ok) {
                setSubmitted(true)
                reset()
            } else {
                alert('Xatolik yuz berdi')
            }
        } catch (error) {
            alert('Aloqa xatoligi')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-[#001F3F] mb-12 text-center">Biz bilan bog'lanish</h1>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-xl font-bold text-[#001F3F] mb-6">Aloqa Ma'lumotlari</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow text-[#C5A059]">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Telefon</p>
                                    <p className="font-bold text-[#001F3F]">+998 97 597 19 45</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow text-[#C5A059]">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-bold text-[#001F3F]">info@nac.uz</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow text-[#C5A059]">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Manzil</p>
                                    <p className="font-bold text-[#001F3F]">Sirdaryo viloyati, Guliston shahri</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow text-[#C5A059]">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Telegram</p>
                                    <a href="#" className="font-bold text-blue-500 hover:underline">@nac_support</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <h3 className="text-xl font-bold text-[#001F3F] mb-6">Savolingiz bormi?</h3>
                        {submitted ? (
                            <div className="text-center py-10">
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h4 className="text-xl font-bold text-[#001F3F]">Xabar yuborildi!</h4>
                                <p className="text-gray-500">Tez orada siz bilan bog'lanamiz.</p>
                                <button onClick={() => setSubmitted(false)} className="mt-6 text-[#C5A059] underline">Yana yuborish</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Ismingiz</label>
                                    <input {...register('name', { required: true })} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#001F3F] text-black" placeholder="Ismingizni kiriting" />
                                    {errors.name && <span className="text-red-500 text-xs">Ism kiritish shart</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Telefon</label>
                                    <input {...register('phone', { required: true })} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#001F3F] text-black" placeholder="+998" />
                                    {errors.phone && <span className="text-red-500 text-xs">Telefon kiritish shart</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Xabar</label>
                                    <textarea {...register('message', { required: true })} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#001F3F] h-32 text-black" placeholder="Xabaringizni yozing..." />
                                    {errors.message && <span className="text-red-500 text-xs">Xabar yozish shart</span>}
                                </div>
                                <button disabled={loading} className="w-full bg-[#001F3F] text-white py-3 rounded-lg font-bold hover:bg-[#003366] transition flex items-center justify-center">
                                    {loading ? <Loader2 className="animate-spin" /> : 'Yuborish'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
