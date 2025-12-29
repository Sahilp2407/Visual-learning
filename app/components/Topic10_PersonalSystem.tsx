'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Briefcase,
    Bot,
    User,
    ArrowRight,
    Library,
    Plus,
    Save,
    LayoutDashboard,
    Check
} from 'lucide-react'

interface TopicProps {
    onComplete: () => void
}

export default function Topic10_PersonalSystem({ onComplete }: TopicProps) {
    const [subModule, setSubModule] = useState<'MAPPER' | 'LIBRARY' | 'DONE'>('MAPPER')

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#f0f4f8] p-6 md:p-12 overflow-y-auto relative">
            {/* Grid Background */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <AnimatePresence mode='wait'>
                {subModule === 'MAPPER' && <TaskMapperModule onNext={() => setSubModule('LIBRARY')} />}
                {subModule === 'LIBRARY' && <PromptLibraryModule onNext={() => setSubModule('DONE')} />}
                {subModule === 'DONE' && <SystemSummary onComplete={onComplete} />}
            </AnimatePresence>
        </div>
    )
}

// ==========================================
// 1. TASK MAPPER (DRAG & DROP SIMULATOR)
// ==========================================
function TaskMapperModule({ onNext }: { onNext: () => void }) {
    const [tasks, setTasks] = useState([
        { id: 'email', label: 'Drafting Routine Emails' },
        { id: 'strategy', label: 'Company 5-Year Strategy' },
        { id: 'meeting', label: 'Summarizing Meeting Notes' },
        { id: 'feedback', label: 'Performance Reviews' },
        { id: 'data', label: 'Formatting Excel Data' }
    ])

    const [buckets, setBuckets] = useState<{
        automate: typeof tasks,
        augment: typeof tasks,
        human: typeof tasks
    }>({
        automate: [],
        augment: [],
        human: []
    })

    const handleAssign = (task: typeof tasks[0], bucket: 'automate' | 'augment' | 'human') => {
        setTasks(prev => prev.filter(t => t.id !== task.id))
        setBuckets(prev => ({
            ...prev,
            [bucket]: [...prev[bucket], task]
        }))
    }

    const isComplete = tasks.length === 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }}
            className="max-w-5xl w-full flex flex-col items-center h-[85vh]"
        >
            <div className="text-center mb-8 shrink-0">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-blue-200">
                    <LayoutDashboard size={14} /> System Architect
                </div>
                <h2 className="text-4xl font-black text-gray-900 mb-2">The Task Matrix</h2>
                <p className="text-gray-500">Don't use AI for everything. <span className="font-bold text-gray-800">Assign the right agent.</span></p>
            </div>

            {/* THE WORKSPACE */}
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative">

                {/* BUCKET 1: AUTOMATE (AI) */}
                <div className="bg-white rounded-2xl border-2 border-dashed border-purple-200 p-6 flex flex-col relative overflow-hidden group hover:border-purple-400 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold shadow-sm">
                            <Bot size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-gray-900">Automate</div>
                            <div className="text-xs text-gray-500">Low Risk, Structured</div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-3">
                        {buckets.automate.map(t => (
                            <TaskCard key={t.id} label={t.label} color="bg-purple-50 text-purple-700 border-purple-100" />
                        ))}
                        {tasks.length > 0 && (
                            <button onClick={() => handleAssign(tasks[0], 'automate')} className="w-full py-3 rounded-xl border-2 border-purple-100 text-purple-400 text-xs font-bold border-dashed hover:bg-purple-50 hover:text-purple-600 transition-all">+ Assign Next Task</button>
                        )}
                    </div>
                </div>

                {/* BUCKET 2: AUGMENT (HYBRID) */}
                <div className="bg-white rounded-2xl border-2 border-dashed border-blue-200 p-6 flex flex-col group hover:border-blue-400 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold shadow-sm">
                            <div className="flex"><Bot size={14} /><User size={14} /></div>
                        </div>
                        <div>
                            <div className="font-bold text-gray-900">Augment</div>
                            <div className="text-xs text-gray-500">High Value, Iterative</div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-3">
                        {buckets.augment.map(t => (
                            <TaskCard key={t.id} label={t.label} color="bg-blue-50 text-blue-700 border-blue-100" />
                        ))}
                        {tasks.length > 0 && (
                            <button onClick={() => handleAssign(tasks[0], 'augment')} className="w-full py-3 rounded-xl border-2 border-blue-100 text-blue-400 text-xs font-bold border-dashed hover:bg-blue-50 hover:text-blue-600 transition-all">+ Assign Next Task</button>
                        )}
                    </div>
                </div>

                {/* BUCKET 3: AUTHENTIC (HUMAN) */}
                <div className="bg-white rounded-2xl border-2 border-dashed border-amber-200 p-6 flex flex-col group hover:border-amber-400 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold shadow-sm">
                            <User size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-gray-900">Authentic</div>
                            <div className="text-xs text-gray-500">High Stakes, Personal</div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-3">
                        {buckets.human.map(t => (
                            <TaskCard key={t.id} label={t.label} color="bg-amber-50 text-amber-700 border-amber-100" />
                        ))}
                        {tasks.length > 0 && (
                            <button onClick={() => handleAssign(tasks[0], 'human')} className="w-full py-3 rounded-xl border-2 border-amber-100 text-amber-400 text-xs font-bold border-dashed hover:bg-amber-50 hover:text-amber-600 transition-all">+ Assign Next Task</button>
                        )}
                    </div>
                </div>

                {/* TASK DISPENSER */}
                {tasks.length > 0 && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
                        <motion.div
                            layoutId={tasks[0].id}
                            initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            className="w-64 bg-gray-900 text-white p-6 rounded-2xl shadow-2xl border border-gray-700 text-center"
                        >
                            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Incoming Task</div>
                            <div className="font-bold text-lg mb-4">{tasks[0].label}</div>
                            <div className="text xs text-gray-500">Where does this belong?</div>
                        </motion.div>
                    </div>
                )}
            </div>

            {isComplete && (
                <div className="mt-8 shrink-0">
                    <button
                        onClick={onNext}
                        className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl flex items-center gap-2"
                    >
                        Build Library <Library size={18} />
                    </button>
                </div>
            )}
        </motion.div>
    )
}

function TaskCard({ label, color }: { label: string, color: string }) {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className={`p-3 rounded-lg text-sm font-bold border ${color}`}
        >
            {label}
        </motion.div>
    )
}

// ==========================================
// 2. PROMPT LIBRARY (THE REPOSITORY)
// ==========================================
function PromptLibraryModule({ onNext }: { onNext: () => void }) {
    const [savedPrompts, setSavedPrompts] = useState<number[]>([])

    const savePrompt = (id: number) => {
        if (!savedPrompts.includes(id)) {
            setSavedPrompts([...savedPrompts, id])
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl w-full flex flex-col items-center"
        >
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100/50 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-green-200">
                    <Library size={14} /> The Arsenal
                </div>
                <h2 className="text-4xl font-black text-gray-900 mb-4">Stop Reinventing the Wheel.</h2>
                <p className="text-gray-500">Save your best prompts. Build your personal operating system.</p>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col hover:shadow-xl transition-shadow relative overflow-hidden">
                        <div className="font-bold text-gray-900 mb-1">Standard Operating Procedure #{i}</div>
                        <div className="text-xs text-gray-400 mb-4 uppercase tracking-wider font-bold">Category: {i % 2 === 0 ? 'Analysis' : 'Communication'}</div>
                        <p className="text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded border border-gray-100 font-mono">
                            Act as a senior analyst. Review the attached data for anomalies...
                        </p>

                        <button
                            onClick={() => savePrompt(i)}
                            disabled={savedPrompts.includes(i)}
                            className={`mt-auto py-3 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all
                                ${savedPrompts.includes(i) ? 'bg-green-500 text-white cursor-default' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                            `}
                        >
                            {savedPrompts.includes(i) ? <><Check size={14} /> Saved to Library</> : <><Save size={14} /> Save Prompt</>}
                        </button>
                    </div>
                ))}
            </div>

            {savedPrompts.length === 4 && (
                <button
                    onClick={onNext}
                    className="px-10 py-4 bg-gray-900 text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
                >
                    Finish System Setup <ArrowRight className="inline ml-2" size={16} />
                </button>
            )}

        </motion.div>
    )
}

function SystemSummary({ onComplete }: TopicProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-2xl"
        >
            <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl text-white">
                <Briefcase size={40} />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">System Online.</h2>
            <p className="text-xl text-gray-500 mb-10">
                You now have a <b>Task Matrix</b> to decide <i>when</i> to use AI, and a <b>Prompt Library</b> to trigger it instantly.
            </p>
            <button
                onClick={onComplete}
                className="px-10 py-4 bg-[var(--foreground)] text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
            >
                Start Week 1 Reflection <ArrowRight className="inline ml-2" size={16} />
            </button>
        </motion.div>
    )
}
