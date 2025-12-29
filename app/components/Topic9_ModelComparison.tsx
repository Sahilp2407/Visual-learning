'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Cpu,
    Zap,
    BookOpen,
    Code,
    Image as ImageIcon,
    MessageSquare,
    CheckCircle2,
    Shield,
    ArrowRight,
    Search
} from 'lucide-react'

interface TopicProps {
    onComplete: () => void
}

export default function Topic9_ModelComparison({ onComplete }: TopicProps) {
    const [subModule, setSubModule] = useState<'ROSTER' | 'ARENA' | 'DONE'>('ROSTER')

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-6 md:p-12 overflow-y-auto relative">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }}
            />

            <AnimatePresence mode='wait'>
                {subModule === 'ROSTER' && <ModelRoster onNext={() => setSubModule('ARENA')} />}
                {subModule === 'ARENA' && <BattleArena onNext={() => setSubModule('DONE')} />}
                {subModule === 'DONE' && <ModelSummary onComplete={onComplete} />}
            </AnimatePresence>
        </div>
    )
}

// ==========================================
// 1. THE ROSTER (CHOOSE YOUR FIGHTER)
// ==========================================
function ModelRoster({ onNext }: { onNext: () => void }) {
    const MODELS = [
        {
            id: 'gpt4',
            name: 'GPT-4o',
            company: 'OpenAI',
            color: 'from-green-400 to-emerald-600',
            icon: Zap,
            stats: { reasoning: 95, creative: 90, speed: 95, context: 80 },
            bestFor: "General Purpose, Reasoning, Speed"
        },
        {
            id: 'claude',
            name: 'Claude 3.5 Sonnet',
            company: 'Anthropic',
            color: 'from-orange-400 to-red-500',
            icon: BookOpen,
            stats: { reasoning: 98, creative: 95, speed: 90, context: 100 },
            bestFor: "Coding, Writing, Long Docs"
        },
        {
            id: 'gemini',
            name: 'Gemini 1.5 Pro',
            company: 'Google',
            color: 'from-blue-400 to-purple-500',
            icon: Search,
            stats: { reasoning: 92, creative: 85, speed: 90, context: 99 },
            bestFor: "Multimodal (Video/Audio), Google Ecosystem"
        }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: -100 }}
            className="max-w-6xl w-full"
        >
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    <Cpu size={14} /> Knowledge Base
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-4">Know Your Models</h2>
                <p className="text-gray-400">One size does <span className="text-white font-bold decoration-red-500 underline decoration-4">NOT</span> fit all.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MODELS.map((model, i) => (
                    <motion.div
                        key={model.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="bg-[#151515] border border-gray-800 rounded-2xl p-6 relative overflow-hidden group"
                    >
                        {/* Gradient Glow */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${model.color} opacity-20 blur-[50px] rounded-full group-hover:opacity-40 transition-opacity`} />

                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${model.color} flex items-center justify-center mb-4 shadow-lg`}>
                            <model.icon size={24} className="text-white" />
                        </div>

                        <h3 className="text-2xl font-bold mb-1">{model.name}</h3>
                        <div className="text-xs font-mono text-gray-500 mb-6">{model.company}</div>

                        <div className="space-y-3 mb-6">
                            <StatBar label="Reasoning" value={model.stats.reasoning} color={model.color} />
                            <StatBar label="Creativity" value={model.stats.creative} color={model.color} />
                            <StatBar label="Context" value={model.stats.context} color={model.color} />
                        </div>

                        <div className="pt-4 border-t border-gray-800">
                            <div className="text-xs font-bold uppercase text-gray-500 mb-2">Best For</div>
                            <p className="text-sm font-medium text-gray-300">{model.bestFor}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <button
                    onClick={onNext}
                    className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                >
                    Enter Battle Arena <ArrowRight className="inline ml-2" size={16} />
                </button>
            </div>
        </motion.div>
    )
}

function StatBar({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-20 text-xs font-bold text-gray-500 text-right">{label}</div>
            <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }} animate={{ width: `${value}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full bg-gradient-to-r ${color}`}
                />
            </div>
        </div>
    )
}

// ==========================================
// 2. BATTLE ARENA (SIMULATOR)
// ==========================================
function BattleArena({ onNext }: { onNext: () => void }) {
    const [selectedTask, setSelectedTask] = useState<string | null>(null)

    const TASKS = [
        { id: 'doc', icon: BookOpen, label: 'Analyze 50-Page PDF' },
        { id: 'code', icon: Code, label: 'Refactor React Component' },
        { id: 'creative', icon: Zap, label: 'Write Viral LinkedIn Post' },
        { id: 'video', icon: ImageIcon, label: 'Analyze Video File' }
    ]

    const RESULTS: Record<string, { winner: string, reason: string, color: string }> = {
        doc: { winner: 'Claude 3.5 Sonnet', reason: 'Superior Context Window (200k) & "Needle in Haystack" retrieval. Less prone to forgetting details in long docs.', color: 'text-orange-500' },
        code: { winner: 'Claude 3.5 Sonnet', reason: 'Currently holds top benchmarks for coding (HumanEval). Writes cleaner, modern code with fewer bugs.', color: 'text-orange-500' },
        creative: { winner: 'GPT-4o', reason: 'Often more conversational, punchy, and adaptable to specific personas for marketing copy.', color: 'text-green-500' },
        video: { winner: 'Gemini 1.5 Pro', reason: 'Native Multimodal. Can watch video files directly (up to 1 hour) without breaking them into frames.', color: 'text-blue-500' }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="max-w-4xl w-full"
        >
            <div className="text-center mb-10">
                <h2 className="text-4xl font-black mb-2">The right tool for the job</h2>
                <p className="text-gray-400">Select a task to see the recommended champion.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {TASKS.map(task => (
                    <button
                        key={task.id}
                        onClick={() => setSelectedTask(task.id)}
                        className={`flex items-center gap-2 px-6 py-4 rounded-xl border-2 font-bold transition-all
                            ${selectedTask === task.id
                                ? 'bg-white text-black border-white scale-105'
                                : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500'}
                        `}
                    >
                        <task.icon size={18} /> {task.label}
                    </button>
                ))}
            </div>

            <div className="min-h-[250px] relative">
                <AnimatePresence mode="wait">
                    {selectedTask ? (
                        <motion.div
                            key={selectedTask}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-[#151515] border border-gray-700 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20" />

                            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Recommended Model</div>
                            <h3 className={`text-5xl font-black mb-6 ${RESULTS[selectedTask].color}`}>
                                {RESULTS[selectedTask].winner}
                            </h3>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                                {RESULTS[selectedTask].reason}
                            </p>
                        </motion.div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-600 font-mono text-sm">
                            [waiting for task selection...]
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {selectedTask && (
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={onNext}
                        className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                    >
                        Next Lesson <ArrowRight className="inline ml-2" size={16} />
                    </button>
                </div>
            )}
        </motion.div>
    )
}

function ModelSummary({ onComplete }: TopicProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-2xl"
        >
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Cpu size={40} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-6">Pro Tip: Don't be loyal.</h2>
            <p className="text-xl text-gray-400 mb-10">
                The AI landsape changes weekly. Use the best model for the specific task at hand. <br />
                <span className="text-white font-bold">Flexibility is your superpower.</span>
            </p>
            <button
                onClick={onComplete}
                className="px-10 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
            >
                Complete Module 1.5 <ArrowRight className="inline ml-2" size={16} />
            </button>
        </motion.div>
    )
}
