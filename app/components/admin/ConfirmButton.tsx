'use client'

import { useState, useEffect } from 'react'
import { Loader2, Trash } from 'lucide-react'

interface ConfirmButtonProps {
    onConfirm: () => Promise<void> | void
    label?: React.ReactNode
    confirmLabel?: string
    confirmColor?: string
    icon?: React.ElementType
}

export function ConfirmButton({
    onConfirm,
    label = <Trash className="w-4 h-4" />,
    confirmLabel = 'Tasdiqlash',
    confirmColor = 'bg-red-500',
    icon: Icon = Trash
}: ConfirmButtonProps) {
    const [loading, setLoading] = useState(false)
    const [confirming, setConfirming] = useState(false)

    useEffect(() => {
        if (confirming) {
            const timer = setTimeout(() => setConfirming(false), 3000)
            return () => clearTimeout(timer)
        }
    }, [confirming])

    const handleClick = async (e: React.MouseEvent) => {
        e.stopPropagation()

        if (!confirming) {
            setConfirming(true)
            return
        }

        setLoading(true)
        try {
            await onConfirm()
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
            setConfirming(false)
        }
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={loading}
            className={`p-1 rounded transition-all duration-200 ${confirming
                    ? `${confirmColor} text-white px-3 py-1 text-xs font-bold`
                    : 'text-red-500 hover:bg-red-50'
                }`}
        >
            {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : confirming ? (
                confirmLabel
            ) : (
                label
            )}
        </button>
    )
}
