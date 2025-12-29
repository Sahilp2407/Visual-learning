'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Sparkles,
    AlertTriangle,
    CheckCircle2,
    User,
    FileText,
    Target,
    LayoutList,
    ArrowRight,
    Wand2,
    RefreshCw,
    Play,
    Terminal,
    MessageSquare
} from 'lucide-react'
import StreamingText from './StreamingText'

interface TopicProps {
    onComplete: () => void
}

export default function Topic7_PromptStructure({ onComplete }: TopicProps) {
    const [stage, setStage] = useState<'BAD_PROMPT' | 'BUILDER' | 'COMPARISON'>('BAD_PROMPT')

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#f8f9fa] p-6 md:p-8 overflow-y-auto relative">
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-[var(--gold)] rounded-full blur-[100px]" />
            </div>

            <AnimatePresence mode="wait">
                {stage === 'BAD_PROMPT' && <BadPromptStage onNext={() => setStage('BUILDER')} />}
                {stage === 'BUILDER' && <PromptBuilderStage onNext={() => setStage('COMPARISON')} />}
                {stage === 'COMPARISON' && <ComparisonStage onComplete={onComplete} />}
            </AnimatePresence>
        </div>
    )
}

// ==========================================
// STAGE 1: THE "GARBAGE IN" PROBLEM
// ==========================================
function BadPromptStage({ onNext }: { onNext: () => void }) {
    const [hasRun, setHasRun] = useState(false)
    const [isThinking, setIsThinking] = useState(false)

    const handleRun = () => {
        setIsThinking(true)
        setTimeout(() => {
            setIsThinking(false)
            setHasRun(true)
        }, 1500)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }}
            className="max-w-2xl w-full flex flex-col items-center z-10"
        >
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    <AlertTriangle size={14} /> The Trap
                </div>
                <h2 className="text-4xl font-black text-gray-900 mb-4">
                    "Garbage In, Garbage Out"
                </h2>
                <p className="text-lg text-gray-600">
                    Most people treat LLMs like Google Search.<br />This is why they get mediocre results.
                </p>
            </div>

            {/* THE LAZY PROMPT */}
            <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <div className="ml-auto text-xs font-mono text-gray-400">user@terminal:~$</div>
                </div>
                <div className="p-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">U</div>
                        <div className="bg-gray-100 px-6 py-3 rounded-2xl text-lg font-medium text-gray-800 border border-gray-200">
                            "Write an email about the meeting."
                        </div>
                    </div>

                    <AnimatePresence>
                        {isThinking && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-gray-400 text-sm ml-14 mb-4">
                                <RefreshCw className="animate-spin" size={16} /> Thinking...
                            </motion.div>
                        )}

                        {hasRun && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="flex gap-4"
                            >
                                <div className="w-10 h-10 rounded-full bg-[var(--gold)] flex items-center justify-center font-bold text-white shadow-lg shrink-0">AI</div>
                                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm w-full relative group">
                                    <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md animate-bounce">
                                        GENERIC!
                                    </div>
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        Subject: Meeting<br /><br />
                                        Hi Everyone,<br /><br />
                                        Just writing to let you know we had a meeting today. We talked about stuff. Let me know if you have questions.<br /><br />
                                        Best,<br />[Your Name]
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {!hasRun && !isThinking && (
                    <div className="px-8 pb-8 flex justify-center">
                        <button
                            onClick={handleRun}
                            className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:scale-105 transition-transform"
                        >
                            <Play size={16} fill="currentColor" /> Run Prompt
                        </button>
                    </div>
                )}
            </div>

            {hasRun && (
                <motion.button
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    onClick={onNext}
                    className="flex items-center gap-2 px-8 py-4 bg-[var(--foreground)] text-white rounded-full font-bold shadow-xl hover:bg-black transition-colors"
                >
                    Fix This Prompt <Wand2 size={18} />
                </motion.button>
            )}

        </motion.div>
    )
}

// ==========================================
// STAGE 2: THE PROMPT BUILDER
// ==========================================
function PromptBuilderStage({ onNext }: { onNext: () => void }) {
    const [components, setComponents] = useState({
        role: false,
        context: false,
        constraints: false,
        format: false
    })

    const allSelected = Object.values(components).every(Boolean)

    const BLOCKS = [
        { id: 'role', label: 'Persona', icon: User, color: 'bg-blue-500', text: "Act as a Senior Project Manager..." },
        { id: 'context', label: 'Context', icon: FileText, color: 'bg-indigo-500', text: "...writing to a frustrated client about a delay due to a bug..." },
        { id: 'constraints', label: 'Constraints', icon: Target, color: 'bg-pink-500', text: "...keep it empathetic but firm. Don't apologize excessively..." },
        { id: 'format', label: 'Format', icon: LayoutList, color: 'bg-teal-500', text: "...output as a structured email draft with 3 options." }
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-start h-[80vh]"
        >
            {/* LEFT: THE TOOLKIT */}
            <div className="w-full md:w-1/3 space-y-4">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">The Formula</h2>
                    <p className="text-sm text-gray-500">Click to assemble the perfect prompt.</p>
                </div>

                {BLOCKS.map((block) => (
                    <motion.button
                        key={block.id}
                        onClick={() => setComponents(prev => ({ ...prev, [block.id]: !prev[block.id as keyof typeof components] }))}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden group
                            ${components[block.id as keyof typeof components]
                                ? 'border-gray-900 bg-gray-900 text-white shadow-lg'
                                : 'border-gray-200 bg-white hover:border-gray-300 text-gray-600'}
                        `}
                    >
                        <div className="flex items-center gap-3 relative z-10">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${components[block.id as keyof typeof components] ? 'bg-white/20' : 'bg-gray-100'} transition-colors`}>
                                <block.icon size={20} className={components[block.id as keyof typeof components] ? "text-white" : "text-gray-500"} />
                            </div>
                            <div>
                                <div className="font-bold text-sm tracking-wide uppercase">{block.label}</div>
                                <div className={`text-xs mt-1 ${components[block.id as keyof typeof components] ? "text-gray-300" : "text-gray-400"}`}>
                                    {components[block.id as keyof typeof components] ? "Added to prompt" : "Click to add"}
                                </div>
                            </div>
                            {components[block.id as keyof typeof components] && <CheckCircle2 className="ml-auto text-green-400" size={20} />}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* RIGHT: THE CANVAS */}
            <div className="flex-1 h-full flex flex-col">
                <div className="flex-1 bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                        <Terminal size={120} />
                    </div>

                    <div className="mb-8">
                        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Constructed Prompt</div>
                        <div className="min-h-[160px] p-6 bg-gray-50 rounded-2xl border border-gray-200 text-lg leading-relaxed text-gray-700 font-medium relative">
                            {Object.values(components).every(v => !v) && (
                                <span className="text-gray-400 italic">Select blocks from the left to build your prompt...</span>
                            )}

                            {BLOCKS.map(block => components[block.id as keyof typeof components] && (
                                <motion.span
                                    key={block.id}
                                    layoutId={block.id}
                                    className={`inline-block mr-2 mb-2 px-3 py-1 rounded-md text-white text-sm ${block.color} shadow-sm`}
                                >
                                    {block.text}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-end">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500 font-medium">
                                Quality Score:
                                <span className={`ml-2 font-bold text-xl 
                                    ${Object.values(components).filter(Boolean).length === 4 ? 'text-green-500' :
                                        Object.values(components).filter(Boolean).length > 2 ? 'text-amber-500' : 'text-red-500'}
                                `}>
                                    {Object.values(components).filter(Boolean).length * 25}%
                                </span>
                            </div>
                            {allSelected && (
                                <motion.button
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onNext}
                                    className="px-8 py-3 bg-[var(--gold)] text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:brightness-110 flex items-center gap-2"
                                >
                                    Generate Output <Sparkles size={18} />
                                </motion.button>
                            )}
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-red-400 via-amber-400 to-green-500"
                                animate={{ width: `${Object.values(components).filter(Boolean).length * 25}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// ==========================================
// STAGE 3: THE MASTERPIECE
// ==========================================
function ComparisonStage({ onComplete }: { onComplete: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl w-full flex flex-col items-center pb-12"
        >
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    <CheckCircle2 size={14} /> The Result
                </div>
                <h2 className="text-4xl font-black text-gray-900 mb-4">
                    Structure = Success
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl">
                    By adding structure, you moved from a generic non-answer to a usable, professional draft.
                </p>
            </div>

            <div className="w-full bg-white rounded-2xl shadow-2xl border border-[var(--gold)]/30 overflow-hidden relative">
                <div className="bg-[var(--gold)]/10 px-6 py-4 border-b border-[var(--gold)]/20 flex justify-between items-center">
                    <span className="font-bold text-[var(--foreground)] flex items-center gap-2">
                        <Sparkles size={16} className="text-[var(--gold)]" /> AI Generated Response
                    </span>
                    <span className="text-xs uppercase tracking-widest font-bold text-[var(--gold)]">High Confidence</span>
                </div>

                <div className="p-8 space-y-6">
                    <div className="p-6 bg-gray-50 rounded-xl border-l-4 border-indigo-500">
                        <div className="text-xs font-bold uppercase text-indigo-500 mb-2">Option 1: Empathetic & Direct</div>
                        <h4 className="font-bold text-gray-900 mb-2">Subject: Update on Project Timeline - Solution Proposed</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Hi [Client Name],<br /><br />
                            I'm writing to personally update you on the current status of our launch. We've identified a minor bug in the final QA phase. <br /><br />
                            To ensure the stability you expect, we're extending the timeline by 24 hours. We are prioritizing quality over speed to prevent any issues post-launch.
                        </p>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-xl border-l-4 border-teal-500">
                        <div className="text-xs font-bold uppercase text-teal-500 mb-2">Option 2: Professional & Brief</div>
                        <h4 className="font-bold text-gray-900 mb-2">Subject: Launch Delay - Mitigation Plan</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Team,<br /><br />
                            We have flagged a critical item during testing. We are shifting the deployment to Tuesday morning to accommodate a fix.<br /><br />
                            This ensures zero downtime for your users. Appreciate your patience.
                        </p>
                    </div>
                </div>
            </div>

            <button
                onClick={onComplete}
                className="mt-12 px-10 py-4 bg-[var(--foreground)] text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl flex items-center gap-2"
            >
                Complete Lesson <ArrowRight size={16} />
            </button>
        </motion.div>
    )
}
