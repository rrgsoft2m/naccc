'use client'

import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import { Download, Search, Loader2 } from 'lucide-react'

export default function StudentsPage() {
    const [students, setStudents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('ALL')
    // Debounce search could be added, but simple button for now

    const fetchStudents = async () => {
        setLoading(true)
        const params = new URLSearchParams({
            page: page.toString(),
            limit: '20',
            search,
            status: statusFilter
        })

        try {
            const res = await fetch(`/api/admin/participants?${params}`)
            const data = await res.json()
            setStudents(data.data)
            setTotal(data.total)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStudents()
    }, [page, statusFilter]) // Refresh when page/filter changes

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setPage(1)
        fetchStudents()
    }

    const exportToExcel = () => {
        // Export CURRENT view or ALL? The prompt says "export qilib oladigan bo'lsin".
        // Usually exporting ALL is expected for reports. 
        // I'll fetch ALL for export (separate call without pagination) or just export current if list is small. 
        // Better: Fetch all logic. For MVP, I'll export current table data to show it works, or add a specific "Export All" button that hits an API to generate download.
        // Client-side export of current view is easiest for immediate feedback.

        // Let's do client side export of current view for now, but really should be full DB export.
        // I'll implement "Export All" that fetches EVERYTHING (with high limit).

        async function doExport() {
            const res = await fetch(`/api/admin/participants?limit=10000&status=${statusFilter}&search=${search}`)
            const json = await res.json()
            const data = json.data.map((s: any) => ({
                ID: s.id,
                Name: s.firstName,
                Surname: s.lastName,
                Phone: s.phone,
                Region: s.district.region.name,
                District: s.district.name,
                School: s.school,
                Grade: s.grade,
                Subject: s.subject,
                Status: s.status,
                Date: new Date(s.registeredAt).toLocaleDateString()
            }))

            const ws = XLSX.utils.json_to_sheet(data)
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, "Students")
            XLSX.writeFile(wb, "NAC_Students.xlsx")
        }

        doExport()
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#001F3F]">O‘quvchilarni Boshqarish</h1>
                <button
                    onClick={exportToExcel}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    <Download className="w-4 h-4" />
                    Excelga Yuklash
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded shadow flex gap-4 flex-wrap">
                <form onSubmit={handleSearch} className="flex gap-2 items-center flex-1">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Ism, telefon orqali qidirish..."
                            className="w-full pl-10 pr-4 py-2 border rounded focus:ring-2 focus:ring-[#001F3F] text-black"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="bg-[#001F3F] text-white px-4 py-2 rounded font-medium">Qidirish</button>
                </form>

                <select
                    className="border p-2 rounded text-black"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="ALL">Barchasi</option>
                    <option value="PAID">To‘lov Qilgan</option>
                    <option value="PENDING">Kutilmoqda</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded shadow overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-700">Ism Familiya</th>
                            <th className="p-4 font-semibold text-gray-700">Hudud</th>
                            <th className="p-4 font-semibold text-gray-700">Sinf/Fan</th>
                            <th className="p-4 font-semibold text-gray-700">Telefon</th>
                            <th className="p-4 font-semibold text-gray-700">Holati</th>
                            <th className="p-4 font-semibold text-gray-700">Sana</th>
                            <th className="p-4 font-semibold text-gray-700">Amallar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={7} className="p-8 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-gray-400" /></td></tr>
                        ) : students.length === 0 ? (
                            <tr><td colSpan={7} className="p-8 text-center text-gray-500">O‘quvchilar topilmadi.</td></tr>
                        ) : (
                            students.map((student) => (
                                <tr key={student.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">
                                        <div className="font-medium">{student.firstName} {student.lastName}</div>
                                        <div className="text-xs text-gray-500">{student.school}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm">{student.district.name}</div>
                                        <div className="text-xs text-gray-500">{student.district.region.name}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-medium">{student.grade}-sinf</span>
                                        <div className="text-xs text-gray-500">{student.subject}</div>
                                    </td>
                                    <td className="p-4 text-sm">{student.phone}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${student.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {student.status === 'PAID' ? 'To‘lov qilgan' : 'Kutilmoqda'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">
                                        {new Date(student.registeredAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <a
                                            href={`/admin/students/${student.id}`}
                                            className="text-blue-600 hover:underline text-sm font-medium"
                                        >
                                            Tahrirlash
                                        </a>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center bg-white p-4 rounded shadow">
                <div className="text-sm text-gray-500">
                    Jami {total} tadan {(page - 1) * 20 + 1}-{Math.min(page * 20, total)} ko‘rsatilmoqda
                </div>
                <div className="flex gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Oldingi
                    </button>
                    <button
                        disabled={page * 20 >= total}
                        onClick={() => setPage(p => p + 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Keyingi
                    </button>
                </div>
            </div>
        </div>
    )
}
