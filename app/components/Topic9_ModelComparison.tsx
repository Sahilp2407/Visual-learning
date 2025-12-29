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
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-900 p-6 md:p-12 overflow-y-auto relative">
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
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
            color: 'from-green-500 to-emerald-600',
            bg: 'bg-green-50 border-green-200',
            icon: Zap,
            stats: { reasoning: 95, creative: 90, speed: 95, context: 80 },
            bestFor: "General Purpose, Reasoning, Speed"
        },
        {
            id: 'claude',
            name: 'Claude 3.5 Sonnet',
            company: 'Anthropic',
            color: 'from-orange-500 to-red-500',
            bg: 'bg-orange-50 border-orange-200',
            icon: BookOpen,
            stats: { reasoning: 98, creative: 95, speed: 90, context: 100 },
            bestFor: "Coding, Writing, Long Docs"
        },
        {
            id: 'gemini',
            name: 'Gemini 1.5 Pro',
            company: 'Google',
            color: 'from-blue-500 to-purple-600',
            bg: 'bg-blue-50 border-blue-200',
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    <Cpu size={14} /> Knowledge Base
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">Know Your Models</h2>
                <p className="text-gray-500">One size does <span className="text-red-500 font-bold underline decoration-4">NOT</span> fit all.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MODELS.map((model, i) => (
                    <motion.div
                        key={model.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className={`border rounded-2xl p-6 relative overflow-hidden group shadow-lg hover:shadow-2xl transition-all bg-white`}
                    >
                        {/* Gradient Glow */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${model.color} opacity-10 blur-[50px] rounded-full group-hover:opacity-20 transition-opacity`} />

                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${model.color} flex items-center justify-center mb-4 shadow-md`}>
                            <model.icon size={24} className="text-white" />
                        </div>

                        <h3 className="text-2xl font-bold mb-1 text-gray-900">{model.name}</h3>
                        <div className="text-xs font-mono text-gray-500 mb-6">{model.company}</div>

                        <div className="space-y-3 mb-6">
                            <StatBar label="Reasoning" value={model.stats.reasoning} color={model.color} />
                            <StatBar label="Creativity" value={model.stats.creative} color={model.color} />
                            <StatBar label="Context" value={model.stats.context} color={model.color} />
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <div className="text-xs font-bold uppercase text-gray-400 mb-2">Best For</div>
                            <p className="text-sm font-medium text-gray-700">{model.bestFor}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <button
                    onClick={onNext}
                    className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
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
            <div className="w-20 text-xs font-bold text-gray-400 text-right">{label}</div>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
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

    const RESULTS: Record<string, { winner: string, reason: string, color: string, bgColor: string }> = {
        doc: { winner: 'Claude 3.5 Sonnet', reason: 'Superior Context Window (200k) & "Needle in Haystack" retrieval. Less prone to forgetting details in long docs.', color: 'text-orange-600', bgColor: 'bg-orange-50 border-orange-200' },
        code: { winner: 'Claude 3.5 Sonnet', reason: 'Currently holds top benchmarks for coding (HumanEval). Writes cleaner, modern code with fewer bugs.', color: 'text-orange-600', bgColor: 'bg-orange-50 border-orange-200' },
        creative: { winner: 'GPT-4o', reason: 'Often more conversational, punchy, and adaptable to specific personas for marketing copy.', color: 'text-green-600', bgColor: 'bg-green-50 border-green-200' },
        video: { winner: 'Gemini 1.5 Pro', reason: 'Native Multimodal. Can watch video files directly (up to 1 hour) without breaking them into frames.', color: 'text-blue-600', bgColor: 'bg-blue-50 border-blue-200' }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="max-w-4xl w-full"
        >
            <div className="text-center mb-10">
                <h2 className="text-4xl font-black mb-2 text-gray-900">The right tool for the job</h2>
                <p className="text-gray-500">Select a task to see the recommended champion.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {TASKS.map(task => (
                    <button
                        key={task.id}
                        onClick={() => setSelectedTask(task.id)}
                        className={`flex items-center gap-2 px-6 py-4 rounded-xl border-2 font-bold transition-all
                            ${selectedTask === task.id
                                ? 'bg-gray-900 text-white border-gray-900 scale-105 shadow-lg'
                                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-400 hover:bg-gray-50'}
                        `}
                    >
                        <task.icon size={18} /> {task.label}
                    </button>
                ))}
            </div>

            <div className="min-h-[250px] relative">
                <AnimatePresence mode="wait">
                    {selectedTask && RESULTS[selectedTask] ? (
                        <motion.div
                            key={selectedTask}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`rounded-3xl p-8 md:p-12 text-center shadow-xl border ${RESULTS[selectedTask].bgColor} bg-white relative overflow-hidden`}
                        >
                            <div className={`absolute top-0 left-0 w-full h-1 bg-current opacity-20`} />

                            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Recommended Model</div>
                            <h3 className={`text-5xl font-black mb-6 ${RESULTS[selectedTask].color}`}>
                                {RESULTS[selectedTask].winner}
                            </h3>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                {RESULTS[selectedTask].reason}
                            </p>
                        </motion.div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 font-mono text-sm border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
                            [waiting for task selection...]
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {selectedTask && (
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={onNext}
                        className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
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
            <div className="w-24 h-24 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <Cpu size={40} />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Pro Tip: Don't be loyal.</h2>
            <p className="text-xl text-gray-500 mb-10">
                The AI landsape changes weekly. Use the best model for the specific task at hand. <br />
                <span className="text-gray-900 font-bold">Flexibility is your superpower.</span>
            </p>
            <button
                onClick={onComplete}
                className="px-10 py-4 bg-gray-900 text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
            >
                Complete Module 1.5 <ArrowRight className="inline ml-2" size={16} />
            </button>
        </motion.div>
    )
}
