'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, FileText, Award, Image as ImageIcon, Settings, FileBarChart, LogOut, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
    { href: '/admin', label: 'Boshqaruv Paneli', icon: LayoutDashboard },
    { href: '/admin/students', label: 'O\'quvchilar', icon: Users },
    { href: '/admin/papers', label: 'Namuna Testlar', icon: FileText },
    { href: '/admin/results', label: 'Natijalar', icon: Award },
    { href: '/admin/gallery', label: 'Galereya', icon: ImageIcon },
    { href: '/admin/content', label: 'Sayt Matnlari', icon: Settings },
    { href: '/admin/comments', label: 'Izohlar', icon: MessageCircle },
    { href: '/admin/certificates', label: 'Sertifikatlar', icon: Award },
    // { href: '/admin/reports', label: 'Reports', icon: FileBarChart }, // Temporarily hidden or localized if used
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 bg-[#001F3F] text-white min-h-screen flex flex-col fixed left-0 top-0 z-20">
            <div className="p-6 border-b border-[#003366]">
                <h1 className="text-2xl font-bold text-[#C5A059]">NAC Admin</h1>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                isActive
                                    ? "bg-[#C5A059] text-[#001F3F] font-bold"
                                    : "text-gray-300 hover:bg-[#003366] hover:text-white"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>
            <div className="p-4 border-t border-[#003366]">
                <button
                    className="flex items-center gap-3 px-4 py-3 w-full text-red-300 hover:text-red-100 hover:bg-red-900/20 rounded-lg transition"
                    onClick={async () => {
                        await fetch('/api/auth/logout', { method: 'POST' }) // Need to implement this route or just simple client side cookie clear
                        window.location.href = '/admin/login'
                    }}
                >
                    <LogOut className="w-5 h-5" />
                    Chiqish
                </button>
            </div>
        </aside>
    )
}
