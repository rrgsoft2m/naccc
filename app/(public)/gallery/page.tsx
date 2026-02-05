'use client'

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function GalleryPage() {
    const [items, setItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/admin/gallery/upload')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setItems(data)
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-[#001F3F] mb-12">NAC Fotogalereya</h1>

                {loading ? (
                    <div className="flex justify-center"><Loader2 className="animate-spin w-8 h-8 text-[#001F3F]" /></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {items.map((item) => (
                            <div key={item.id} className="aspect-square bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition relative group">
                                {item.type === 'VIDEO' ? (
                                    <video
                                        src={item.imageUrl}
                                        controls
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title || "Gallery image"}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                                    />
                                )}
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition translate-y-2 group-hover:translate-y-0">
                                    <p className="font-medium text-sm">{new Date(item.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                        {items.length === 0 && (
                            <div className="col-span-full text-gray-500 py-12">
                                Hozircha hech narsa yuklanmagan.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
