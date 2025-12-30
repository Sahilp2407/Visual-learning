'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Brain, AlertCircle, MessageSquare, History, FileText, CheckCircle2, XCircle } from 'lucide-react'

// ==========================================
// TYPES
// ==========================================
interface TopicCanvasProps {
    onComplete: () => void
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function Topic4_Memory({ onComplete }: TopicCanvasProps) {
    const [stage, setStage] = useState<'LIMIT' | 'MISTAKE' | 'SOLUTION'>('LIMIT')

    return (
        <div className="w-full h-full flex flex-col relative bg-[var(--background)] transition-colors duration-500">
            {/* PROGRESS HEADER */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-zinc-800 z-50">
                <motion.div
                    className="h-full bg-black dark:bg-white"
                    animate={{ width: stage === 'LIMIT' ? '33%' : stage === 'MISTAKE' ? '66%' : '100%' }}
                />
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 p-8 md:p-12 flex justify-center items-center overflow-y-auto">
                <AnimatePresence mode="wait">
                    {stage === 'LIMIT' && <LimitAnimation key="limit" onNext={() => setStage('MISTAKE')} />}
                    {stage === 'MISTAKE' && <MistakeAnimation key="mistake" onNext={() => setStage('SOLUTION')} />}
                    {stage === 'SOLUTION' && <SolutionAnimation key="solution" onComplete={onComplete} />}
                </AnimatePresence>
            </div>
        </div>
    )
}

// ==========================================
// STAGE 1: THE LIMIT (SLIDING WINDOW)
// ==========================================
// ==========================================
// STAGE 1: THE LIMIT (SLIDING WINDOW)
// ==========================================
function LimitAnimation({ onNext }: { onNext: () => void }) {
    const [tick, setTick] = useState(0)
    const capacity = 3
    const conversation = [
        { role: 'user', text: "Hi, I'm Sahil." },
        { role: 'ai', text: "Hello Sahil!" },
        { role: 'user', text: "I'm a designer." },
        { role: 'ai', text: "Nice to meet you." },
        { role: 'user', text: "What's 2 + 2?" },
        { role: 'ai', text: "It's 4." },
        { role: 'user', text: "What's my job?" },
        { role: 'ai', text: "I don't know..." }
    ]

    // We show a history of items, but visually highlight the "Active Window"
    // The "Window" slides down as new items are added (or items slide up)

    useEffect(() => {
        const interval = setInterval(() => {
            setTick(prev => (prev < conversation.length + 2 ? prev + 1 : 0))
        }, 2200)
        return () => clearInterval(interval)
    }, [])

    // Visible items include the current window plus 1 forgotten item above
    const windowStart = Math.max(0, tick - capacity)
    const windowEnd = tick
    const activeItems = conversation.slice(windowStart, windowEnd)
    const forgottenItem = windowStart > 0 ? conversation[windowStart - 1] : null

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-5xl flex flex-col items-center"
        >
            <div className="text-center mb-12 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-bold text-xs uppercase tracking-widest transition-colors">
                    <Brain size={16} /> Concept 4.1: The Context Window
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-[var(--foreground)] tracking-tight transition-colors">
                    The Memory Limit.
                </h2>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
                    AI memory isn't infinite. It's a <span className="font-bold text-indigo-600 dark:text-indigo-400">moving window</span>.
                </p>
            </div>

            {/* CHAT INTERFACE VISUAL */}
            <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-[40px] shadow-2xl border-[8px] border-gray-100 dark:border-zinc-800 overflow-hidden flex flex-col h-[500px] transition-colors">

                {/* HEADER */}
                <div className="h-16 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between px-6 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md z-20 absolute top-0 w-full transition-colors">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Context: {Math.min(tick, capacity)}/{capacity}</div>
                </div>

                {/* RELATIVE CONTAINER FOR MESSAGES */}
                <div className="flex-1 pt-24 pb-8 px-6 flex flex-col justify-end gap-4 relative">

                    {/* BACKGROUND GRIDS */}
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                        style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px', color: 'var(--foreground)' }}
                    />

                    {/* FORGOTTEN ZONE VISUAL */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-50 to-transparent pointer-events-none z-10 flex justify-center pt-20">
                    </div>

                    <AnimatePresence mode='popLayout'>
                        {/* THE FORGOTTEN ITEM */}
                        {forgottenItem && (
                            <motion.div
                                key={`forgotten-${windowStart - 1}`}
                                initial={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                animate={{ opacity: 0.4, y: -100, filter: 'blur(4px)', scale: 0.9 }}
                                exit={{ opacity: 0 }}
                                className={`w-full p-4 rounded-2xl mb-2 flex items-center gap-3 grayscale border-2 border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10
                                     ${forgottenItem.role === 'ai' ? 'flex-row' : 'flex-row-reverse'}
                                `}
                            >
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                    <XCircle size={16} className="text-red-400" />
                                </div>
                                <div className="text-sm font-bold text-red-300 line-through truncate">{forgottenItem.text}</div>
                            </motion.div>
                        )}

                        {/* ACTIVE ITEMS */}
                        {activeItems.map((msg, i) => {
                            const isNewest = i === activeItems.length - 1;
                            return (
                                <motion.div
                                    key={`${windowStart + i}`}
                                    layout
                                    initial={{ y: 50, opacity: 0, scale: 0.8 }}
                                    animate={{ y: 0, opacity: 1, scale: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`
                                        max-w-[80%] p-4 rounded-2xl text-sm font-bold shadow-sm relative group
                                        ${msg.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}
                                        ${isNewest ? 'ring-2 ring-blue-200 dark:ring-blue-800 ring-offset-2 dark:ring-offset-zinc-900' : ''}
                                    `}>
                                        {msg.text}
                                        {isNewest && (
                                            <div className="absolute -right-2 -top-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                                        )}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>

                    {/* CONTEXT BOUNDARY LINE */}
                    <div className="absolute top-28 left-0 w-full border-t-2 border-dashed border-red-200 flex justify-center">
                        <span className="bg-red-50 text-red-500 text-[10px] font-bold px-2 -mt-2">MESSAGES ABOVE THIS LINE ARE DELETED</span>
                    </div>

                </div>

            </div>

            <div className="mt-12 text-center">
                <button onClick={onNext} className="group relative px-8 py-4 bg-[var(--foreground)] rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
                    <span className="flex items-center gap-2 text-[var(--background)]" style={{ color: 'var(--background)' }}>
                        See why long prompts fail <ArrowRight size={16} className="text-[var(--background)]" />
                    </span>
                </button>
            </div>
        </motion.div>
    )
}

// ==========================================
// STAGE 2: THE LONG PROMPT MISTAKE (ATTENTION DIP)
// ==========================================
// ==========================================
// STAGE 2: THE LONG PROMPT MISTAKE (ATTENTION DIP)
// ==========================================
function MistakeAnimation({ onNext }: { onNext: () => void }) {
    const [progress, setProgress] = useState(0)
    const [attention, setAttention] = useState(100)
    const [captured, setCaptured] = useState<{ id: string, label: string, status: 'success' | 'missed' | 'pending' }[]>([
        { id: 'intro', label: 'Start: Financial Report', status: 'pending' },
        { id: 'middle', label: 'Middle: "Use JSON Format"', status: 'pending' },
        { id: 'end', label: 'End: Summarize Revenue', status: 'pending' }
    ])
    const [commentary, setCommentary] = useState("Waiting to process...")

    // Simulating the "U-Shaped" Attention Curve (Primacy & Recency Effect)
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                // Reset Logic
                if (prev >= 110) {
                    setCaptured(c => c.map(i => ({ ...i, status: 'pending' })))
                    return 0
                }

                // === CALCULATE ATTENTION & COMMENTARY ===
                let currentAtt = 100
                let newCommentary = ""

                // PHASE 1: START (High Attention)
                if (prev < 30) {
                    currentAtt = 100
                    newCommentary = "✅ Starting fresh. High attention."
                    if (prev > 10) setCaptured(c => c.map(i => i.id === 'intro' ? { ...i, status: 'success' } : i))
                }
                // PHASE 2: MIDDLE (The Dip)
                else if (prev >= 30 && prev < 75) {
                    currentAtt = 30 + Math.sin((prev - 20) * 0.1) * 10 // Low Wobbly
                    newCommentary = "⚠️ Too much text! The AI is skimming/skipping this part."
                    if (prev > 50) setCaptured(c => c.map(i => i.id === 'middle' ? { ...i, status: 'missed' } : i))
                }
                // PHASE 3: END (Recency Effect)
                else {
                    currentAtt = 100
                    newCommentary = "✅ The End is recent. Attention spikes back up."
                    if (prev > 90) setCaptured(c => c.map(i => i.id === 'end' ? { ...i, status: 'success' } : i))
                }

                setAttention(currentAtt)
                setCommentary(newCommentary)

                return prev + 0.25 // SLOWED DOWN (was 0.5 or 1)
            })
        }, 80) // SLOWED DOWN (was 50ms)
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-6xl flex flex-col items-center"
        >
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 font-bold text-xs uppercase tracking-widest mb-4 transition-colors">
                    <AlertCircle size={16} /> Why AI makes Mistakes
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-[var(--foreground)] tracking-tight mb-4 transition-colors">
                    The "Middle" gets lost.
                </h2>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
                    Humans and AI both suffer from the <b>"Primacy & Recency Effect"</b>. <br />
                    We remember the start and end, but <span className="text-red-500 font-bold bg-red-50 dark:bg-red-900/30 px-1">ignore the boring middle</span>.
                </p>
            </div>

            {/* LIVE COMMENTARY BAR */}
            <div className="w-full max-w-5xl mb-6 bg-gray-900 dark:bg-black text-white rounded-xl p-4 flex items-center justify-center gap-3 font-mono text-sm shadow-xl transition-colors">
                <div className={`w-3 h-3 rounded-full ${attention > 80 ? 'bg-green-400 animate-pulse' : 'bg-red-500 animate-ping'}`} />
                {commentary}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">

                {/* LEFT: THE SCROLLING PROMPT */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 relative overflow-hidden h-[400px] flex flex-col transition-colors">
                    <div className="p-4 border-b border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 flex justify-between items-center z-10 transition-colors">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 transition-colors">Your Long Prompt</span>
                    </div>

                    <div className="relative flex-1 bg-white dark:bg-zinc-900 p-8 overflow-hidden transition-colors">
                        {/* The Content Moving Up */}
                        <motion.div
                            className="absolute top-0 left-0 w-full px-8 pb-8"
                            style={{ top: '50%', translateY: `${-progress * 4}%` }}
                        >
                            {/* INTRO */}
                            <div className="mb-32 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border-l-4 border-blue-500 transition-colors">
                                <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2 transition-colors">The Start</h4>
                                <p className="text-xs text-blue-700 dark:text-blue-400 transition-colors">"Here is the context for the financial report..."</p>
                            </div>

                            {/* MIDDLE */}
                            <div className="mb-32 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border-l-4 border-yellow-500 transition-all duration-300"
                                style={{
                                    opacity: attention < 50 ? 0.2 : 1,
                                    transform: attention < 50 ? 'scale(0.95)' : 'scale(1)',
                                    filter: attention < 50 ? 'blur(2px) grayscale(100%)' : 'none'
                                }}
                            >
                                <h4 className="font-bold text-yellow-900 dark:text-yellow-400 mb-2 transition-colors">The Middle</h4>
                                <div className="p-2 bg-yellow-200/50 dark:bg-yellow-900/50 rounded text-sm font-mono font-bold text-yellow-800 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-700 transition-colors">
                                    CRITICAL: OUTPUT MUST BE JSON
                                </div>
                            </div>

                            {/* END */}
                            <div className="mb-32 p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl border-l-4 border-green-500 transition-colors">
                                <h4 className="font-bold text-green-900 dark:text-green-300 mb-2 transition-colors">The End</h4>
                                <p className="text-xs text-green-700 dark:text-green-400 transition-colors">"Now please verify and summarize the revenue."</p>
                            </div>
                        </motion.div>

                        {/* The Focus Line */}
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-500 z-20 flex items-center">
                            <div className="w-full text-right pr-2">
                                <span className="bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm">AI Reading Head</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: THE ATTENTION MONITOR */}
                <div className="flex flex-col gap-6">

                    {/* ATTENTION GRAPH */}
                    <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-3xl p-6 shadow-inner border border-gray-200 dark:border-zinc-700 flex-1 flex flex-col relative overflow-hidden transition-colors">
                        <div className="flex justify-between items-center mb-6 z-10">
                            <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Internal Attention Level</span>
                            <span className={`text-3xl font-black ${attention > 80 ? 'text-green-500' : 'text-red-500'}`}>
                                {Math.round(attention)}%
                            </span>
                        </div>

                        {/* Graph Interface */}
                        <div className="flex-1 flex items-end gap-1 relative z-10">
                            <div className="w-full bg-gray-200 dark:bg-zinc-700 h-full absolute inset-0 rounded-xl opacity-20 transition-colors" />
                            <motion.div
                                className={`w-full rounded-t-xl transition-colors duration-300 ${attention > 60 ? 'bg-green-400' : 'bg-red-500'}`}
                                animate={{ height: `${attention}%` }}
                                transition={{ type: 'spring', damping: 20 }}
                            />
                        </div>
                        <div className="mt-2 text-center text-xs font-bold text-gray-400">
                            {attention > 60 ? "OPTIMAL PERFORMANCE" : "ATTENTION DROPPING - SKIPPING CONTENT"}
                        </div>
                    </div>

                    {/* CAPTURED CONCEPTS LIST */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-zinc-800 flex-1 transition-colors">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">What the AI Remembered:</h3>
                        <div className="space-y-3">
                            {captured.map((cap) => (
                                <div
                                    key={cap.id}
                                    className={`p-3 rounded-xl flex items-center justify-between border-l-4 transition-all duration-500
                                        ${cap.status === 'pending' ? 'opacity-30 border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800' : ''}
                                        ${cap.status === 'success' ? 'opacity-100 border-green-500 bg-green-50 dark:bg-green-900/20' : ''}
                                        ${cap.status === 'missed' ? 'opacity-100 border-red-500 bg-red-50 dark:bg-red-900/20' : ''}
                                    `}
                                >
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 transition-colors">{cap.label}</span>

                                    {cap.status === 'success' && <CheckCircle2 size={18} className="text-green-500" />}
                                    {cap.status === 'missed' && <span className="text-[10px] font-bold bg-red-500 text-white px-2 py-1 rounded">IGNORED</span>}
                                    {cap.status === 'pending' && <span className="text-[10px] font-bold text-gray-300">...</span>}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

            <div className="mt-12 text-center">
                <button onClick={onNext} className="group relative px-8 py-4 bg-[var(--foreground)] rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
                    <span className="flex items-center gap-2 text-[var(--background)]" style={{ color: 'var(--background)' }}>
                        How to fix this <ArrowRight size={16} className="text-[var(--background)] bg-transparent" />
                    </span>
                </button>
            </div>
        </motion.div>
    )
}

// ==========================================
// STAGE 3: THE SOLUTION (OPTIMIZED PROMPT)
// ==========================================
function SolutionAnimation({ onComplete }: { onComplete: () => void }) {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="w-full max-w-5xl flex flex-col items-center"
        >
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 text-green-700 dark:text-green-300 font-bold text-xs uppercase tracking-widest mb-4 transition-colors">
                    <CheckCircle2 size={16} /> Best Practice
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[var(--foreground)] tracking-tight mb-4 transition-colors">
                    Recency & Repetition.
                </h2>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
                    To fix memory leaks, <span className="font-bold text-[var(--foreground)] border-b-2 border-green-400">Restate Goals</span> at the end of your prompt, or break tasks into smaller chunks.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4">
                {[
                    { title: "One Task", desc: "Don't ask for 5 things at once.", icon: FileText, color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" },
                    { title: "Use Summaries", desc: "Ask AI to summarize before moving on.", icon: History, color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" },
                    { title: "Repeat Goals", desc: "Remind the AI of the format at the end.", icon: MessageSquare, color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400" },
                ].map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                        className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300"
                    >
                        <div className={`w-16 h-16 rounded-2xl ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <card.icon size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 transition-colors">{card.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 transition-colors">{card.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-16">
                <button onClick={onComplete} className="group relative px-10 py-5 bg-[var(--foreground)] text-[var(--background)] rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">
                    <div className="flex items-center gap-3">
                        Complete Topic <CheckCircle2 className="text-green-400" />
                    </div>
                </button>
            </div>
        </motion.div>
    )
}
