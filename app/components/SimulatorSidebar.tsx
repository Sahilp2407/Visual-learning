'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, CheckCircle2, Circle, Sparkles, ChevronDown, BookOpen, Zap, Play, PlayCircle, FastForward } from 'lucide-react'

// Topic Data Structure
const TOPICS = [
    { id: '1', title: 'What is an LLM?', emoji: '🤖' },
    { id: '2', title: 'Training Data & Patterns', emoji: '📊' },
    { id: '3', title: 'Tokens & Context Window', emoji: '🔤' },
    { id: '4', title: 'Why LLMs Feel Smart', emoji: '🧠' },
    { id: '5', title: 'Hallucinations', emoji: '✨' },
    { id: '6', title: 'Workday Integration', emoji: '💼' },
    { id: '7', title: 'Prompt Engineering Lab', emoji: '🏗️' },
    { id: '8', title: 'Techniques: Few-Shot & CoT', emoji: '🥋' },
    { id: '9', title: 'Model Arena: GPT vs Claude', emoji: '⚔️' },
    { id: '10', title: 'Building Your Copilot System', emoji: '🏗️' },
    { id: '11', title: 'Week 1: Completion', emoji: '🏆' },
]

interface SimulatorSidebarProps {
    activeTopicId: string
    unlockedTopicIds: string[]
    onSelectTopic: (id: string) => void
    onLogout?: () => void
}

export default function SimulatorSidebar({ activeTopicId, unlockedTopicIds, onSelectTopic, onLogout }: SimulatorSidebarProps) {
    const [isExpanded, setIsExpanded] = useState(true)

    const completedCount = TOPICS.filter(t => unlockedTopicIds.includes((parseInt(t.id) + 1).toString())).length
    const progressPercent = Math.round((unlockedTopicIds.length / TOPICS.length) * 100)

    return (
        <div className="w-80 h-full bg-gradient-to-br from-white via-gray-50/30 to-white dark:from-zinc-900 dark:via-zinc-900 dark:to-black border-r border-gray-200/60 dark:border-zinc-800 flex flex-col z-20 relative overflow-hidden transition-colors">

            {/* Animated background orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.05, 0.1, 0.05],
                        x: [-20, 20, -20],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-20 -left-20 w-60 h-60 bg-[var(--gold)] rounded-full blur-3xl dark:opacity-20"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.03, 0.08, 0.03],
                        y: [20, -20, 20],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-400 rounded-full blur-3xl dark:opacity-20"
                />
            </div>

            {/* Header */}
            <div className="relative p-8 pb-6 z-10">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                >
                    {/* Week Badge */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-500 shadow-lg"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white">Week 1</span>
                    </motion.div>

                    {/* Title */}
                    <div>
                        <h1 className="text-4xl font-bold text-[var(--foreground)] tracking-tight leading-tight transition-colors">
                            LLM
                        </h1>
                        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] via-amber-500 to-[var(--gold)] bg-[length:200%_100%] animate-gradient-x">
                            Fundamentals
                        </h2>
                    </div>
                </motion.div>
            </div>

            {/* Main Module Header - Collapsible */}
            <div className="px-6 mb-3 relative z-10">
                <motion.button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full group relative rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800 border-2 border-gray-200 dark:border-zinc-700 hover:border-[var(--gold)]/40 hover:shadow-lg"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative p-4 flex items-center gap-3">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--gold)] to-amber-500 flex items-center justify-center shadow-md">
                                <BookOpen size={18} className="text-white" />
                            </div>
                        </div>

                        {/* Module Info */}
                        <div className="flex-1 text-left">
                            <div className="text-[9px] font-bold text-[var(--gold)] uppercase tracking-widest mb-1">Module 1</div>
                            <div className="text-sm font-bold text-[var(--foreground)] leading-tight transition-colors">
                                Introduction to LLMs
                            </div>
                        </div>

                        {/* Chevron */}
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex-shrink-0"
                        >
                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-zinc-800 group-hover:bg-[var(--gold)]/10 flex items-center justify-center transition-colors">
                                <ChevronDown size={16} className="text-gray-600 dark:text-gray-400 group-hover:text-[var(--gold)] transition-colors" />
                            </div>
                        </motion.div>
                    </div>
                </motion.button>
            </div>

            {/* Topics List - Collapsible */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex-1 overflow-y-auto px-6 space-y-2 pb-6 relative z-10"
                    >
                        {TOPICS.map((topic, index) => {
                            const isActive = activeTopicId === topic.id
                            const isLocked = !unlockedTopicIds.includes(topic.id)
                            const isCompleted = unlockedTopicIds.includes((parseInt(topic.id) + 1).toString())

                            return (
                                <motion.div
                                    key={topic.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    onClick={() => !isLocked && onSelectTopic(topic.id)}
                                    className={`group relative rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden
                                        ${isActive
                                            ? 'bg-gradient-to-br from-[var(--gold)]/20 via-amber-50 to-[var(--gold)]/10 dark:from-[var(--gold)]/30 dark:via-amber-900/40 dark:to-[var(--gold)]/20 shadow-lg border-2 border-[var(--gold)]/50 scale-[1.02]'
                                            : 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-2 border-gray-100 dark:border-zinc-800 hover:border-[var(--gold)]/30 hover:shadow-md hover:scale-[1.01]'
                                        }
                                        ${isLocked ? 'opacity-40 cursor-not-allowed hover:scale-100' : 'opacity-100'}
                                    `}
                                >
                                    {/* Shimmer effect for Active */}
                                    {isActive && (
                                        <>
                                            <motion.div
                                                animate={{ x: ['-100%', '100%'] }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent pointer-events-none z-0"
                                            />
                                            {/* Glowing Pulse Border */}
                                            <motion.div
                                                animate={{ opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="absolute inset-0 border-2 border-[var(--gold)]/50 rounded-2xl pointer-events-none z-0"
                                            />
                                        </>
                                    )}

                                    <div className="relative p-4 flex items-center gap-4 z-10">
                                        {/* Emoji + Status or Play Button */}
                                        <div className="flex-shrink-0 relative">
                                            {isActive && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <motion.div
                                                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                                                        className="w-full h-full rounded-xl bg-[var(--gold)]/30 absolute"
                                                    />
                                                    <motion.div
                                                        animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
                                                        className="w-full h-full rounded-xl bg-[var(--gold)]/20 absolute"
                                                    />
                                                </div>
                                            )}

                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all relative overflow-hidden z-10
                                                ${isLocked
                                                    ? 'bg-gray-100 dark:bg-zinc-800 grayscale'
                                                    : isActive
                                                        ? 'bg-gradient-to-br from-[var(--gold)] to-amber-600 shadow-lg scale-110 ring-2 ring-[var(--gold)]/30'
                                                        : 'bg-gray-50 dark:bg-zinc-800 group-hover:bg-gray-100 dark:group-hover:bg-zinc-700'}
                                            `}>
                                                {isActive ? (
                                                    <motion.div
                                                        whileTap={{ scale: 0.9 }}
                                                        animate={{ scale: [1, 1.1, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                        className="text-white flex items-center justify-center w-full h-full bg-black/10 backdrop-blur-[1px]"
                                                    >
                                                        <Play fill="currentColor" size={20} className="ml-1" />
                                                    </motion.div>
                                                ) : isLocked ? (
                                                    <Lock size={18} className="text-gray-400 dark:text-zinc-600" />
                                                ) : isCompleted ? (
                                                    <div className="relative w-full h-full flex items-center justify-center">
                                                        <span className="text-xl opacity-50">{topic.emoji}</span>
                                                        <div className="absolute inset-0 flex items-center justify-center bg-green-500/10">
                                                            <CheckCircle2 size={18} className="text-green-600 dark:text-green-500" />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className={isActive ? 'filter drop-shadow-sm' : ''}>{topic.emoji}</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Topic Title & Meta */}
                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <div className="flex justify-between items-center mb-0.5">
                                                <div className="flex items-center gap-1.5">
                                                    {isActive && (
                                                        <div className="flex items-end gap-[2px] h-3 pb-[1px]">
                                                            <motion.div animate={{ height: [3, 8, 3] }} transition={{ duration: 0.6, repeat: Infinity }} className="w-[2px] bg-[var(--gold)] rounded-full" />
                                                            <motion.div animate={{ height: [6, 10, 5] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }} className="w-[2px] bg-[var(--gold)] rounded-full" />
                                                            <motion.div animate={{ height: [4, 9, 2] }} transition={{ duration: 0.7, repeat: Infinity, delay: 0.2 }} className="w-[2px] bg-[var(--gold)] rounded-full" />
                                                        </div>
                                                    )}
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider
                                                        ${isActive ? 'text-[var(--gold-dark)] dark:text-[var(--gold)]' : 'text-gray-400'}
                                                    `}>
                                                        {isActive ? 'NOW PLAYING' : isCompleted ? 'COMPLETED' : `LESSON ${index + 1}`}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className={`text-sm font-bold transition-colors block truncate leading-tight
                                                ${isActive ? 'text-gray-900 dark:text-white text-base' : 'text-gray-700 dark:text-gray-400'}
                                                ${!isLocked && !isActive && 'group-hover:text-[var(--foreground)]'}
                                            `}>
                                                {topic.title}
                                            </span>

                                            {/* Progress Bar for Active */}
                                            {isActive && (
                                                <div className="w-full h-1 bg-gray-200 dark:bg-black/30 rounded-full mt-2 overflow-hidden relative">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "35%" }}
                                                        className="h-full bg-[var(--gold)] absolute left-0 top-0"
                                                    />
                                                    {/* Buffer animation */}
                                                    <motion.div
                                                        animate={{ x: [-100, 100] }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="h-full w-20 bg-white/30 blur-sm absolute top-0 left-0"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Active Action Icon */}
                                        {isActive && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 shadow-md flex items-center justify-center text-[var(--gold)]"
                                            >
                                                <FastForward size={14} fill="currentColor" />
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>



            {/* Logout Button (Bottom) */}
            <div className="p-6 relative z-10 border-t border-gray-200/60 dark:border-zinc-800">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group"
                >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">Logout</span>
                    <span className="group-hover:opacity-0 transition-opacity absolute">End Session</span>
                </button>
            </div>

        </div >
    )
}
