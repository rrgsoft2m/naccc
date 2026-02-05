'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Loader2 } from 'lucide-react'

export default function CommentsPage() {
    const [comments, setComments] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/admin/comments')
            .then(res => res.json())
            .then(data => {
                // Ensure data is an array before setting
                setComments(Array.isArray(data) ? data : [])
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-[#001F3F]">Kelib tushgan izohlar</h1>

            <div className="bg-white rounded shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-700">Ism</th>
                            <th className="p-4 font-semibold text-gray-700">Telefon</th>
                            <th className="p-4 font-semibold text-gray-700">Xabar</th>
                            <th className="p-4 font-semibold text-gray-700">Sana</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={4} className="p-8 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-gray-400" /></td></tr>
                        ) : comments.length === 0 ? (
                            <tr><td colSpan={4} className="p-8 text-center text-gray-500">Izohlar mavjud emas.</td></tr>
                        ) : (
                            comments.map((comment) => (
                                <tr key={comment.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-medium">{comment.name}</td>
                                    <td className="p-4 text-sm">{comment.phone}</td>
                                    <td className="p-4 text-sm max-w-md">{comment.message}</td>
                                    <td className="p-4 text-sm text-gray-500">
                                        <div>{new Date(comment.createdAt).toLocaleDateString()}</div>
                                        <div className="flex gap-2 mt-2">
                                            <a href={`tel:${comment.phone}`} className="text-green-600 hover:underline text-xs border border-green-600 px-1 rounded">Call</a>
                                            <a href={`https://t.me/+998${comment.phone.replace(/\D/g, '').slice(-9)}`} target="_blank" className="text-blue-500 hover:underline text-xs border border-blue-500 px-1 rounded">Telegram</a>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
