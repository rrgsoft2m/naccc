'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Users, CreditCard, AlertCircle } from 'lucide-react'

// Colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
const NAVY = '#001F3F'
const GOLD = '#C5A059'

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/admin/stats')
            .then(res => res.json())
            .then(data => {
                setStats(data)
                setLoading(false)
            })
            .catch(err => setLoading(false))
    }, [])

    if (loading) return <div>Loading dashboard...</div>
    if (!stats) return <div>Error loading stats</div>

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-[#001F3F]">Boshqaruv Paneli</h1>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                        <Users className="w-8 h-8 text-[#001F3F]" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Jami Ishtirokchilar</p>
                        <h2 className="text-3xl font-bold">{stats.total}</h2>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-full">
                        <CreditCard className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">To‘lov Qilganlar</p>
                        <h2 className="text-3xl font-bold">{stats.paid}</h2>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-full">
                        <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">To‘lov Qilmaganlar</p>
                        <h2 className="text-3xl font-bold">{stats.unpaid}</h2>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Payment Status / Subjects (Pie) */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Fanlar Bo‘yicha Statistika</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats.subjects}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }: { name?: string | number; percent?: number }) => `${name || ''} ${(percent ? percent * 100 : 0).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {stats.subjects.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Daily Registrations (Line) */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Kunlik Ro‘yxatdan O‘tishlar</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats.daily}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="count" stroke={NAVY} strokeWidth={2} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    )
}
