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
        <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--background)] p-6 md:p-12 overflow-y-auto relative transition-colors duration-500">
            {/* Grid Background */}
            <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5 pointer-events-none transition-opacity"
                style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px', color: 'var(--foreground)' }}
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-blue-200 dark:border-blue-800 transition-colors">
                    <LayoutDashboard size={14} /> System Architect
                </div>
                <h2 className="text-4xl font-black text-[var(--foreground)] mb-2 transition-colors">The Task Matrix</h2>
                <p className="text-gray-500 dark:text-gray-400 transition-colors">Don't use AI for everything. <span className="font-bold text-gray-800 dark:text-gray-200 transition-colors">Assign the right agent.</span></p>
            </div>

            {/* THE WORKSPACE */}
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative">

                {/* BUCKET 1: AUTOMATE (AI) */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-purple-200 dark:border-purple-900 p-6 flex flex-col relative overflow-hidden group hover:border-purple-400 dark:hover:border-purple-700 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold shadow-sm transition-colors">
                            <Bot size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-gray-900 dark:text-gray-200 transition-colors">Automate</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors">Low Risk, Structured</div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-3">
                        {buckets.automate.map(t => (
                            <TaskCard key={t.id} label={t.label} color="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-800" />
                        ))}
                        {tasks.length > 0 && (
                            <button onClick={() => handleAssign(tasks[0], 'automate')} className="w-full py-3 rounded-xl border-2 border-purple-100 dark:border-purple-900 text-purple-400 dark:text-purple-500 text-xs font-bold border-dashed hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-all">+ Assign Next Task</button>
                        )}
                    </div>
                </div>

                {/* BUCKET 2: AUGMENT (HYBRID) */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-blue-200 dark:border-blue-900 p-6 flex flex-col group hover:border-blue-400 dark:hover:border-blue-700 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shadow-sm transition-colors">
                            <div className="flex"><Bot size={14} /><User size={14} /></div>
                        </div>
                        <div>
                            <div className="font-bold text-gray-900 dark:text-gray-200 transition-colors">Augment</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors">High Value, Iterative</div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-3">
                        {buckets.augment.map(t => (
                            <TaskCard key={t.id} label={t.label} color="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800" />
                        ))}
                        {tasks.length > 0 && (
                            <button onClick={() => handleAssign(tasks[0], 'augment')} className="w-full py-3 rounded-xl border-2 border-blue-100 dark:border-blue-900 text-blue-400 dark:text-blue-500 text-xs font-bold border-dashed hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all">+ Assign Next Task</button>
                        )}
                    </div>
                </div>

                {/* BUCKET 3: AUTHENTIC (HUMAN) */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-amber-200 dark:border-amber-900 p-6 flex flex-col group hover:border-amber-400 dark:hover:border-amber-700 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shadow-sm transition-colors">
                            <User size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-gray-900 dark:text-gray-200 transition-colors">Authentic</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors">High Stakes, Personal</div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-3">
                        {buckets.human.map(t => (
                            <TaskCard key={t.id} label={t.label} color="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800" />
                        ))}
                        {tasks.length > 0 && (
                            <button onClick={() => handleAssign(tasks[0], 'human')} className="w-full py-3 rounded-xl border-2 border-amber-100 dark:border-amber-900 text-amber-400 dark:text-amber-500 text-xs font-bold border-dashed hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all">+ Assign Next Task</button>
                        )}
                    </div>
                </div>

                {/* TASK DISPENSER */}
                {tasks.length > 0 && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
                        <motion.div
                            layoutId={tasks[0].id}
                            initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            className="w-64 bg-gray-900 dark:bg-white text-white dark:text-black p-6 rounded-2xl shadow-2xl border border-gray-700 dark:border-gray-200 text-center"
                        >
                            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Incoming Task</div>
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
                        className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl flex items-center gap-2"
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100/50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-green-200 dark:border-green-800 transition-colors">
                    <Library size={14} /> The Arsenal
                </div>
                <h2 className="text-4xl font-black text-[var(--foreground)] mb-4 transition-colors">Stop Reinventing the Wheel.</h2>
                <p className="text-gray-500 dark:text-gray-400 transition-colors">Save your best prompts. Build your personal operating system.</p>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-800 p-6 flex flex-col hover:shadow-xl transition-shadow relative overflow-hidden">
                        <div className="font-bold text-gray-900 dark:text-gray-100 mb-1 transition-colors">Standard Operating Procedure #{i}</div>
                        <div className="text-xs text-gray-400 mb-4 uppercase tracking-wider font-bold">Category: {i % 2 === 0 ? 'Analysis' : 'Communication'}</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 bg-gray-50 dark:bg-zinc-800 p-3 rounded border border-gray-100 dark:border-zinc-700 font-mono transition-colors">
                            Act as a senior analyst. Review the attached data for anomalies...
                        </p>

                        <button
                            onClick={() => savePrompt(i)}
                            disabled={savedPrompts.includes(i)}
                            className={`mt-auto py-3 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all
                                ${savedPrompts.includes(i) ? 'bg-green-500 text-white cursor-default' : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700'}
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
                    className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
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
            <div className="w-24 h-24 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl text-white dark:text-black transition-colors">
                <Briefcase size={40} />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-[var(--foreground)] transition-colors">System Online.</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 transition-colors">
                You now have a <b>Task Matrix</b> to decide <i>when</i> to use AI, and a <b>Prompt Library</b> to trigger it instantly.
            </p>
            <button
                onClick={onComplete}
                className="px-10 py-4 bg-[var(--foreground)] text-[var(--background)] rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
            >
                Start Week 1 Reflection <ArrowRight className="inline ml-2" size={16} />
            </button>
        </motion.div>
    )
}
