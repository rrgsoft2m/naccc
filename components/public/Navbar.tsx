'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
    { href: '/', label: 'Bosh Sahifa' },
    { href: '/about', label: 'NAC Haqida' },
    { href: '/register', label: 'Ro‘yxatdan O‘tish' },
    { href: '/samples', label: 'Namuna Testlar' },
    { href: '/results', label: 'Natijalar' },
    { href: '/gallery', label: 'Galereya' },
    { href: '/contact', label: 'Bog‘lanish' },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="bg-[#001F3F] text-white fixed w-full z-50 top-0 left-0 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative w-48 h-20">
                            <Image
                                src="/nac-logo-new.png"
                                alt="NAC Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-3 py-2 rounded-md text-sm font-medium hover:text-[#C5A059] transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/register"
                                className="bg-[#C5A059] text-[#001F3F] px-5 py-2 rounded-full font-bold hover:bg-yellow-500 transition shadow-lg transform hover:scale-105"
                            >
                                Ro‘yxatdan O‘tish
                            </Link>
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {
                isOpen && (
                    <div className="md:hidden bg-[#001F3F] border-t border-gray-700">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#C5A059]"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )
            }
        </nav >
    )
}
