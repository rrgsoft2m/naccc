'use client'

import { useParams, useRouter } from 'next/navigation'
import { CheckCircle, CreditCard, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function PaymentPage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id
    const [loading, setLoading] = useState(false)

    // This would handle the actual payment redirect logic
    // For now we just mock "Paid" status update
    const handlePayment = async (provider: string) => {
        setLoading(true)
        // Simulate API call to initiate payment
        setTimeout(() => {
            setLoading(false)
            alert(`Redirecting to ${provider}... (Mock: Payment Successful)`)
            router.push('/') // Or a success page
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-[#001F3F] p-8 text-center text-white">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4 text-[#C5A059]" />
                    <h1 className="text-2xl font-bold">Ro‘yxatdan o‘tildi!</h1>
                    <p className="text-blue-200 mt-2">Tasdiqlash uchun to‘lovni amalga oshiring.</p>
                </div>

                <div className="p-8">
                    <div className="mb-6 text-center">
                        <p className="text-gray-500 text-sm">ID Raqamingiz</p>
                        <p className="text-2xl font-mono font-bold text-gray-800">{id}</p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => handlePayment('Click')}
                            className="w-full flex items-center justify-between p-4 border rounded-xl hover:border-blue-500 hover:bg-blue-50 transition group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
                                <span className="font-medium text-gray-700 group-hover:text-blue-700">Click orqali to‘lash</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                        </button>

                        <button
                            onClick={() => handlePayment('Payme')}
                            className="w-full flex items-center justify-between p-4 border rounded-xl hover:border-green-500 hover:bg-green-50 transition group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">P</div>
                                <span className="font-medium text-gray-700 group-hover:text-green-700">Payme orqali to‘lash</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-500" />
                        </button>

                        <button
                            onClick={() => handlePayment('Uzum')}
                            className="w-full flex items-center justify-between p-4 border rounded-xl hover:border-purple-500 hover:bg-purple-50 transition group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">U</div>
                                <span className="font-medium text-gray-700 group-hover:text-purple-700">Uzum orqali to‘lash</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500" />
                        </button>
                    </div>

                    <p className="text-center text-xs text-gray-400 mt-8">
                        To‘lov xavfsiz himoyalangan. Muammo bo‘lsa: +998 90 123 45 67
                    </p>
                </div>
            </div>
        </div>
    )
}
