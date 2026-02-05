'use client'

import { useState, useEffect } from 'react'
import { Loader2, Upload, Trash, Plus } from 'lucide-react'
import { ConfirmButton } from '@/app/components/admin/ConfirmButton'
import { Modal } from '@/app/components/ui/Modal'

export default function AdminGalleryPage() {
    const [images, setImages] = useState<any[]>([])
    const [uploading, setUploading] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetchImages = async () => {
        try {
            const res = await fetch('/api/admin/gallery/upload')
            const data = await res.json()
            // Ensure data is an array before setting
            setImages(Array.isArray(data) ? data : [])
        } catch (e) { }
        setLoading(false)
    }

    useEffect(() => {
        fetchImages()
    }, [])

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setUploading(true)
        const formData = new FormData(e.currentTarget)

        try {
            const res = await fetch('/api/admin/gallery/upload', {
                method: 'POST',
                body: formData
            })
            if (res.ok) {
                alert('Fayl yuklandi!')
                e.currentTarget.reset()
                setIsModalOpen(false)
                fetchImages()
            } else {
                alert('Yuklashda xatolik')
            }
        } catch (e) {
            alert('Xatolik')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#001F3F]">Galereya Boshqaruvi</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#001F3F] text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-[#003366] transition"
                >
                    <Plus className="w-5 h-5" />
                    Media Qo'shish
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yangi Media Yuklash">
                <form onSubmit={handleUpload} className="flex flex-col gap-4">
                    <div className="border border-dashed p-8 rounded-lg text-center cursor-pointer hover:bg-gray-50 transition relative">
                        <input
                            type="file"
                            name="file"
                            accept="image/*,video/*"
                            required
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-2 pointer-events-none">
                            <Upload className="w-8 h-8 text-gray-400" />
                            <span className="text-gray-500 text-sm">Faylni tanlang yoki shu yerga tashlang</span>
                        </div>
                    </div>
                    <button
                        disabled={uploading}
                        className="bg-[#001F3F] text-white w-full py-2 rounded font-bold hover:bg-[#003366] transition flex justify-center items-center"
                    >
                        {uploading ? <Loader2 className="animate-spin" /> : 'Yuklash'}
                    </button>
                </form>
            </Modal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((item) => (
                    <div key={item.id} className="relative group bg-gray-100 rounded overflow-hidden aspect-square">
                        {item.type === 'VIDEO' ? (
                            <video src={item.imageUrl} controls className="w-full h-full object-cover" />
                        ) : (
                            <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-xs p-1 text-center opacity-0 group-hover:opacity-100 transition flex justify-between items-center px-2">
                            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                            <ConfirmButton
                                onConfirm={async () => {
                                    await fetch(`/api/admin/gallery/upload?id=${item.id}`, { method: 'DELETE' })
                                    fetchImages()
                                }}
                                confirmColor="bg-red-500"
                                label={<Trash className="w-4 h-4 text-red-300 hover:text-red-100" />}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
