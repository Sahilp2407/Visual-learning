'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Trophy,
    Clock,
    ArrowRight,
    Star,
    TrendingUp,
    CheckCircle,
    CalendarCheck,
    Download
} from 'lucide-react'
import confetti from 'canvas-confetti'

interface TopicProps {
    onComplete: () => void
}

export default function Topic11_Reflection({ onComplete }: TopicProps) {
    const [step, setStep] = useState(0)
    const [timeSaved, setTimeSaved] = useState(0)

    // Trigger confetti on mount
    React.useEffect(() => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

        return () => clearInterval(interval);
    }, [])

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1c20] to-black text-white p-6 md:p-12 overflow-y-auto relative">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,215,0,0.1) 0%, transparent 70%)' }}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl w-full flex flex-col items-center z-10"
            >
                <div className="w-32 h-32 mb-8 relative">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-4 border-[var(--gold)] border-dashed rounded-full opacity-30"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--gold)] to-amber-600 rounded-full shadow-[0_0_50px_rgba(255,215,0,0.5)]">
                        <Trophy size={48} className="text-white" />
                    </div>
                </div>

                <h1 className="text-5xl md:text-6xl font-black mb-4 text-center tracking-tight">Week 1 Complete</h1>
                <p className="text-xl text-gray-400 text-center max-w-xl mb-12">
                    You've mastered the fundamentals. From tokens to prompt engineering, you are now operating at a higher level.
                </p>

                <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm mb-8">
                    <div className="flex flex-col md:flex-row gap-8 justify-between items-center text-center">
                        <div>
                            <div className="text-xs font-bold uppercase text-gray-500 mb-1">Modules Cleared</div>
                            <div className="text-4xl font-black text-white">11/11</div>
                        </div>
                        <div>
                            <div className="text-xs font-bold uppercase text-gray-500 mb-1">New Skills</div>
                            <div className="text-4xl font-black text-[var(--gold)]">Prompting+</div>
                        </div>
                        <div>
                            <div className="text-xs font-bold uppercase text-gray-500 mb-1">Estimated ROI</div>
                            <div className="text-4xl font-black text-green-400">10x Speed</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 w-full">
                    <h3 className="text-sm font-bold uppercase text-gray-500 tracking-widest text-center">Action Items for Next Week</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ActionItem text="Use the '5 Bullet Point' summarizer on 1 report." />
                        <ActionItem text="Draft 3 emails using 'Persona + Context' structure." />
                        <ActionItem text="Try 'Chain of Thought' on a complex logic problem." />
                        <ActionItem text="Save your first prompt to your personal library." />
                    </div>
                </div>

                <div className="mt-12 flex gap-4">
                    <button
                        onClick={onComplete}
                        className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                    >
                        Return to Dashboard
                    </button>
                    <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2">
                        <Download size={16} /> Certificate
                    </button>
                </div>

            </motion.div>
        </div>
    )
}

function ActionItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                <CheckCircle size={14} className="text-green-500" />
            </div>
            <span className="text-sm font-medium text-gray-300">{text}</span>
        </div>
    )
}
