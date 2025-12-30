'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FileText,
    Scissors,
    ArrowRight,
    PenTool,
    Eraser,
    Briefcase,
    MessageSquare,
    Repeat,
    Zap,
    CheckCircle2,
    Sliders,
    Layers,
    Wand2,
    Mail
} from 'lucide-react'
import StreamingText from './StreamingText'

// ==========================================
// TYPES
// ==========================================
interface TopicProps {
    onComplete: () => void
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function Topic6_WorkdayIntegration({ onComplete }: TopicProps) {
    const [subModule, setSubModule] = useState<'SUMMARIZE' | 'DRAFT' | 'TRANSFORM' | 'DONE'>('SUMMARIZE')

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--background)] p-8 md:p-12 font-sans overflow-y-auto transition-colors duration-500">

            <AnimatePresence mode='wait'>
                {subModule === 'SUMMARIZE' && <SummarizeModule onNext={() => setSubModule('DRAFT')} />}
                {subModule === 'DRAFT' && <DraftModule onNext={() => setSubModule('TRANSFORM')} />}
                {subModule === 'TRANSFORM' && <TransformModule onNext={() => setSubModule('DONE')} />}
                {subModule === 'DONE' && <SummaryScreen onComplete={onComplete} />}
            </AnimatePresence>

        </div>
    )
}

// ==========================================
// 1. THE SUMMARIZER (INTELLIGENT COMPRESSION)
// ==========================================
function SummarizeModule({ onNext }: { onNext: () => void }) {
    const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'DONE'>('IDLE')

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }}
            className="max-w-5xl w-full flex flex-col items-center"
        >
            {/* HEADER */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-4 transition-colors">
                    <Scissors size={14} /> Task 1: Distinction
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[var(--foreground)] mb-4 transition-colors">
                    The "5 Bullet Point" Rule
                </h2>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
                    AI excels at removing noise. Don't read 10 pages when you only need the key insights.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center w-full justify-center">

                {/* INPUT: LONG DOCUMENT */}
                <div className={`
                    w-64 h-80 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-lg p-6 relative overflow-hidden transition-all duration-500
                    ${status === 'PROCESSING' ? 'scale-90 opacity-50 blur-sm translate-x-20' : ''}
                    ${status === 'DONE' ? 'scale-0 opacity-0' : ''}
                `}>
                    <div className="absolute top-0 right-0 p-2 bg-gray-100 dark:bg-zinc-800 rounded-bl-xl text-[10px] font-bold text-gray-400">PDF REPORT</div>
                    <div className="space-y-2 mt-4 opacity-30 text-[6px]">
                        {[...Array(30)].map((_, i) => (
                            <div key={i} className="h-1 bg-gray-800 dark:bg-gray-200 rounded-full w-full" style={{ width: `${Math.random() * 50 + 50}%` }} />
                        ))}
                    </div>
                </div>

                {/* THE PROCESSOR */}
                <div className="relative z-10 flex flex-col items-center justify-center w-40">
                    {status === 'IDLE' && (
                        <button
                            onClick={() => setStatus('PROCESSING')}
                            className="w-16 h-16 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                        >
                            <Zap size={24} />
                        </button>
                    )}

                    {status === 'PROCESSING' && (
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-20 h-20 rounded-full bg-[var(--gold)] flex items-center justify-center animate-spin-slow shadow-lg text-white font-bold text-xs">
                                AI
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-[var(--gold)] animate-pulse">Distilling...</span>
                        </div>
                    )}

                    {status === 'PROCESSING' && (
                        setTimeout(() => setStatus('DONE'), 2500),
                        null
                    )}
                </div>

                {/* OUTPUT: SUMMARY */}
                <AnimatePresence>
                    {status === 'DONE' && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, x: -20 }}
                            animate={{ scale: 1, opacity: 1, x: 0 }}
                            className="w-80 h-auto bg-white dark:bg-zinc-900 border-2 border-[var(--gold)] rounded-xl shadow-2xl p-8 relative transition-colors"
                        >
                            <div className="absolute -top-3 -right-3 bg-[var(--gold)] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                                80% Time Saved
                            </div>
                            <h3 className="font-bold text-lg mb-4 text-gray-900">Executive Summary</h3>
                            <ul className="space-y-3">
                                {[
                                    "Revenue up by 12% YoY",
                                    "New market expansion approved",
                                    "Risk Assessment: Low",
                                    "Action: Sign off on budget"
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.2 }}
                                        className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium transition-colors"
                                    >
                                        <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>

                            <button
                                onClick={onNext}
                                className="mt-8 w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-black dark:hover:bg-gray-200 transition-colors"
                            >
                                Next Task <ArrowRight className="inline ml-1" size={14} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </motion.div>
    )
}

// ==========================================
// 2. THE DRAFTER (STRUCTURE BUILDER)
// ==========================================
function DraftModule({ onNext }: { onNext: () => void }) {
    const [step, setStep] = useState(0)

    const EMAIL_PARTS = [
        { label: "Tone", content: "Apologetic & Professional" },
        { label: "Opening", content: "Dear [Client Name], I am writing to sincerely apologize for the delay..." },
        { label: "Reason", content: "Due to an unforeseen supply chain disruption..." },
        { label: "Solution", content: "We have expedited the shipping at no extra cost..." },
        { label: "Closing", content: "Thank you for your patience. Best, [My Name]" },
    ]

    useEffect(() => {
        if (step < EMAIL_PARTS.length) {
            const timer = setTimeout(() => setStep(s => s + 1), 800)
            return () => clearTimeout(timer)
        }
    }, [step])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: -50 }}
            className="max-w-4xl w-full flex flex-col items-center"
        >
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-widest mb-4 transition-colors">
                    <PenTool size={14} /> Task 2: First Draft
                </div>
                <h2 className="text-4xl font-black text-[var(--foreground)] mb-4 transition-colors">
                    Never Start from Zero
                </h2>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
                    Use AI to build the <b className="text-purple-600 dark:text-purple-400">Skeleton</b>. You provide the <b className="text-gray-900 dark:text-white">Soul</b>.
                </p>
            </div>

            <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800 overflow-hidden flex flex-col transition-colors">
                <div className="bg-gray-50 dark:bg-zinc-800/50 p-4 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center transition-colors">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300">
                        <Mail size={16} /> New Message
                    </div>
                </div>

                <div className="p-8 min-h-[400px] relative">
                    {/* Ghost Lines for structure */}
                    <div className="absolute inset-0 p-8 pointer-events-none opacity-5 dark:opacity-[0.03]">
                        {[...Array(10)].map((_, i) => <div key={i} className="h-4 bg-black dark:bg-white w-full mb-6 rounded" />)}
                    </div>

                    <div className="space-y-6">
                        {EMAIL_PARTS.map((part, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: step >= i ? 1 : 0, y: step >= i ? 0 : 10 }}
                                className="flex gap-4"
                            >
                                <div className="w-20 text-xs font-bold uppercase text-purple-400 text-right pt-1 shrink-0">{part.label}</div>
                                <div className={`text-gray-800 dark:text-gray-200 transition-colors ${i === 0 ? 'font-bold text-sm bg-purple-50 dark:bg-purple-900/20 px-2 rounded' : 'text-base font-serif'}`}>
                                    {step > i ? part.content : <StreamingText text={part.content} speed={10} />}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {step >= EMAIL_PARTS.length && (
                        <div className="absolute bottom-8 right-8">
                            <button
                                onClick={onNext}
                                className="px-6 py-3 bg-purple-600 text-white rounded-full font-bold text-sm shadow-xl hover:scale-105 transition-transform animate-bounce"
                            >
                                Edit & Send <ArrowRight className="inline ml-1" size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </motion.div>
    )
}

// ==========================================
// 3. THE TRANSFORMER (UNIVERSAL TRANSLATOR)
// ==========================================
function TransformModule({ onNext }: { onNext: () => void }) {
    const [mode, setMode] = useState<'ORIGINAL' | 'CLIENT' | 'GENZ' | 'EXEC'>('ORIGINAL')

    const ORIGINAL_TEXT = "The latency issues in the Kubernetes cluster were due to resource contention in the pod scheduling algorithm, necessitating a re-evaluation of our horizontal scaling policies."

    const MODES = {
        ORIGINAL: ORIGINAL_TEXT,
        CLIENT: "The website was slow because too many people visited at once. We are adding more servers to fix it automatically next time.",
        GENZ: "Servers were lagging hard bc too much traffic 💀. We scaling up fr so no more loading screens.",
        EXEC: "ACTION REQUIRED: Performance dip identified due to traffic spike. Auto-scaling upgrade initiated. Risk mitigated."
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl w-full flex flex-col items-center"
        >
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 text-green-600 dark:text-green-400 font-bold text-xs uppercase tracking-widest mb-4 transition-colors">
                    <Repeat size={14} /> Task 3: Transformation
                </div>
                <h2 className="text-4xl font-black text-[var(--foreground)] mb-4 transition-colors">
                    Same Content, Different Audience
                </h2>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
                    Don't rewrite. Just <span className="text-green-600 dark:text-green-400 font-bold">Reshape</span>.
                </p>
            </div>

            <div className="w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800 p-8 flex flex-col md:flex-row gap-8 items-center transition-colors">

                {/* Input Side */}
                <div className="flex-1 space-y-4">
                    <div className="text-xs font-bold uppercase text-gray-400">Original (Technical)</div>
                    <div className="p-6 bg-gray-50 dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 font-mono text-sm leading-relaxed transition-colors">
                        "{ORIGINAL_TEXT}"
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col gap-2">
                    <ArrowRight className="text-gray-300 dark:text-gray-600 rotate-90 md:rotate-0 self-center" size={32} />
                    <div className="p-1 bg-gray-100 dark:bg-zinc-800 rounded-lg flex flex-col gap-1 transition-colors">
                        <button onClick={() => setMode('CLIENT')} className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${mode === 'CLIENT' ? 'bg-white dark:bg-zinc-700 shadow text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700'}`}>To Client</button>
                        <button onClick={() => setMode('EXEC')} className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${mode === 'EXEC' ? 'bg-white dark:bg-zinc-700 shadow text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700'}`}>To CEO</button>
                        <button onClick={() => setMode('GENZ')} className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${mode === 'GENZ' ? 'bg-white dark:bg-zinc-700 shadow text-pink-600 dark:text-pink-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700'}`}>To Intern</button>
                    </div>
                </div>

                {/* Output Side */}
                <div className="flex-1 space-y-4 relative min-h-[200px] flex flex-col justify-center">
                    <div className="text-xs font-bold uppercase text-gray-400">Transformed</div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`p-6 rounded-2xl border-2 text-lg font-medium leading-relaxed shadow-lg transition-colors
                                ${mode === 'ORIGINAL' ? 'border-gray-100 bg-white dark:bg-zinc-800 dark:border-zinc-700 text-gray-300 dark:text-gray-600' : ''}
                                ${mode === 'CLIENT' ? 'border-green-100 bg-green-50 dark:bg-green-900/10 dark:border-green-800/50 text-green-800 dark:text-green-300' : ''}
                                ${mode === 'EXEC' ? 'border-blue-100 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-800/50 text-blue-900 dark:text-blue-300' : ''}
                                ${mode === 'GENZ' ? 'border-pink-100 bg-pink-50 dark:bg-pink-900/10 dark:border-pink-800/50 text-pink-800 dark:text-pink-300' : ''}
                            `}
                        >
                            {mode === 'ORIGINAL' ? "Select a mode..." : MODES[mode]}
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>

            {mode !== 'ORIGINAL' && (
                <button
                    onClick={onNext}
                    className="mt-12 px-10 py-4 bg-[var(--foreground)] text-[var(--background)] rounded-full font-bold uppercase tracking-widest shadow-xl hover:scale-105 transition-transform"
                >
                    Finish Day 2
                </button>
            )}

        </motion.div>
    )
}


// ==========================================
// DONE SCREEN
// ==========================================
function SummaryScreen({ onComplete }: TopicProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-2xl"
        >
            <div className="w-24 h-24 bg-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl text-white">
                <Briefcase size={40} />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-[var(--foreground)] transition-colors">Day 2 Complete!</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 transition-colors">
                You now know exactly where LLMs fit:
                <br /><b>Not as a replacement, but as an accelerator.</b>
            </p>
            <button
                onClick={onComplete}
                className="px-10 py-4 bg-[var(--foreground)] text-white dark:text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
            >
                Start Next Day <ArrowRight className="inline ml-2" size={16} />
            </button>
        </motion.div>
    )
}
