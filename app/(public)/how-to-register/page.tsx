import Link from 'next/link'
import { UserPlus, CreditCard, FileCheck, Calendar } from 'lucide-react'

export default function HowToRegisterPage() {
    const steps = [
        { icon: UserPlus, title: "Ro‘yxatdan o‘tish", desc: "Sayt yoki Telegram bot orqali shaxsiy ma'lumotlaringizni kiriting." },
        { icon: FileCheck, title: "Fan tanlash", desc: "O'zingiz qatnashmoqchi bo'lgan fan (Matematika/Ingliz tili) ni tanlang." },
        { icon: CreditCard, title: "To‘lov", desc: "Click, Payme yoki Uzum orqali to'lovni amalga oshiring." },
        { icon: Calendar, title: "Imtihon kuni", desc: "Belgilangan sana va vaqtda imtihonga ID raqamingiz bilan keling." },
    ]

    return (
        <div className="min-h-screen bg-white py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-[#001F3F] mb-16 text-center">Ro'yxatdan O'tish Tartibi</h1>

                <div className="grid md:grid-cols-4 gap-8 mb-16 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-8 left-0 w-full h-1 bg-gray-100 -z-10 transform translate-y-4"></div>

                    {steps.map((step, idx) => (
                        <div key={idx} className="bg-white p-6 text-center">
                            <div className="w-16 h-16 bg-[#001F3F] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg relative z-10 border-4 border-white">
                                <step.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-[#001F3F] mb-3">{step.title}</h3>
                            <p className="text-gray-500">{step.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center flex-col items-center gap-6">
                    <Link href="/register" className="bg-[#C5A059] text-[#001F3F] px-10 py-4 rounded-full font-bold text-xl hover:bg-yellow-500 transition shadow-xl animate-pulse">
                        Hozir Ro‘yxatdan O‘tish
                    </Link>
                    <p className="text-gray-500">Yoki Telegram orqali: <a href="#" className="text-blue-500 underline">@nac_bot</a></p>
                </div>

            </div>
        </div>
    )
}
