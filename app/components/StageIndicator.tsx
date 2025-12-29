'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Eye, PlayCircle } from 'lucide-react'

interface StageIndicatorProps {
    currentStage: 'READ' | 'VISUAL' | 'SIMULATOR'
}

export default function StageIndicator({ currentStage }: StageIndicatorProps) {
    const stages = [
        { id: 'READ' as const, icon: BookOpen, label: 'Theory' },
        { id: 'VISUAL' as const, icon: Eye, label: 'Visual' },
        { id: 'SIMULATOR' as const, icon: PlayCircle, label: 'Practice' }
    ]

    return (
        <div className="flex items-center gap-6 bg-white px-6 py-3 rounded-2xl border-2 border-gray-200 shadow-sm">
            {stages.map((s, i) => (
                <div key={s.id} className="relative flex items-center gap-3">
                    <div
                        className={`flex items-center gap-3 text-sm font-bold tracking-wide uppercase transition-all duration-500
                        ${currentStage === s.id ? 'text-[var(--foreground)]' : 'text-gray-400'}`}
                    >
                        <div className={`p-2 rounded-xl transition-all duration-300 ${currentStage === s.id
                                ? 'bg-gradient-to-br from-[var(--gold)] to-amber-500 shadow-lg'
                                : 'bg-gray-100'
                            }`}>
                            <s.icon size={16} className={currentStage === s.id ? 'text-white' : 'text-gray-400'} strokeWidth={2.5} />
                        </div>
                        <span>{s.label}</span>
                    </div>
                    {i < 2 && <div className="w-px h-6 bg-gray-200 ml-4" />}

                    {currentStage === s.id && (
                        <motion.div
                            layoutId="activeStage"
                            className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[var(--gold)] to-amber-500 rounded-full"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                </div>
            ))}
        </div>
    )
}
