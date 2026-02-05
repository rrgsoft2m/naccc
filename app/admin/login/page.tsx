'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'

const loginSchema = z.object({
    username: z.string().min(1, 'Foydalanuvchi nomi kiritilishi shart'),
    password: z.string().min(1, 'Parol kiritilishi shart'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function AdminLoginPage() {
    const router = useRouter()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginForm) => {
        setIsLoading(true)
        setError('')

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (res.ok) {
                router.push('/admin')
            } else {
                const body = await res.json()
                setError(body.error || 'Kirishda xatolik yuz berdi')
            }
        } catch (e) {
            setError('Tizimda xatolik yuz berdi')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#001F3F] text-[#C5A059] rounded-full flex items-center justify-center mx-auto text-2xl font-bold mb-4">
                        NAC
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
                    <p className="text-gray-500">Boshqaruv tizimiga kirish</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Foydalanuvchi nomi</label>
                        <input
                            {...register('username')}
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#001F3F] focus:border-transparent transition"
                            placeholder="admin"
                        />
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Parol</label>
                        <input
                            {...register('password')}
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#001F3F] focus:border-transparent transition"
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#001F3F] text-white py-2 rounded hover:bg-[#003366] transition flex items-center justify-center font-medium"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Kirish'}
                    </button>
                </form>
            </div>
        </div>
    )
}
