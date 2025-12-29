'use client'

import { motion } from 'framer-motion'
import { AlertCircle, Brain, Lightbulb } from 'lucide-react'

export default function InsightReveal() {
    const cards = [
        {
            icon: <Brain size={20} className="text-[var(--gold)]" />,
            text: "Confidence is calculated, not felt."
        },
        {
            icon: <AlertCircle size={20} className="text-red-400" />,
            text: "Hallucinations are just low-probability guesses."
        },
        {
            icon: <Lightbulb size={20} className="text-blue-400" />,
            text: "Context window limits reasoning depth."
        }
    ]

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4 w-72 pointer-events-none">
            {cards.map((card, i) => (
                <motion.div
                    key={i}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 4 + (i * 0.2), duration: 0.6 }}
                    className="pointer-events-auto bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--border-light)] p-4 rounded-xl shadow-[var(--shadow-medium)] group hover:-translate-x-2 transition-transform duration-300 cursor-help"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[var(--background)] rounded-lg group-hover:scale-110 transition-transform">
                            {card.icon}
                        </div>
                        <p className="text-sm font-medium text-[var(--foreground)] leading-tight">
                            {card.text}
                        </p>
                    </div>
                    {/* Glow Effect on Hover */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_20px_rgba(201,162,77,0.15)]" />
                </motion.div>
            ))}
        </div>
    )
}
