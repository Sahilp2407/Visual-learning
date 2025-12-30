'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, AlertTriangle, ShieldAlert, BadgeCheck, Search, MessagesSquare, FileText, Sparkles, Brain, XCircle, CheckCircle2, Siren } from 'lucide-react'

// ==========================================
// TYPES
// ==========================================
interface TopicProps {
    onComplete: () => void
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function Topic5_Hallucinations({ onComplete }: TopicProps) {
    const [stage, setStage] = useState<'TRAP' | 'REVEAL' | 'SOLUTION'>('TRAP')

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--background)] p-8 md:p-12 font-sans overflow-y-auto transition-colors duration-500">

            <AnimatePresence mode='wait'>
                {stage === 'TRAP' && <TrapStage onNext={() => setStage('REVEAL')} />}
                {stage === 'REVEAL' && <RevealStage onNext={() => setStage('SOLUTION')} />}
                {stage === 'SOLUTION' && <SolutionStage onComplete={onComplete} />}
            </AnimatePresence>

        </div>
    )
}

// ==========================================
// STAGE 1: THE TRAP (THE CONFIDENT LIE)
// ==========================================
function TrapStage({ onNext }: { onNext: () => void }) {
    const [analyzing, setAnalyzing] = useState(false)
    const [result, setResult] = useState<'HIDDEN' | 'SHOW' | 'BUSTED'>('HIDDEN')

    const FAKE_STATS = [
        { label: "Q3 Revenue", val: "$4.2B", reason: "Fabricated" },
        { label: "Growth YoY", val: "+12.5%", reason: "Hallucinated" },
        { label: "Active Users", val: "850M", reason: "Guessed" },
    ]

    const handleVerify = () => {
        setAnalyzing(true)
        setTimeout(() => {
            setAnalyzing(false)
            setResult('BUSTED')
        }, 2000)
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl w-full flex flex-col items-center"
        >
            {/* HERDER */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 text-orange-600 dark:text-orange-400 font-bold text-xs uppercase tracking-widest mb-4 shadow-sm transition-colors">
                    <Siren size={14} /> The Intelligence Illusion
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-[var(--foreground)] mb-4 tracking-tight transition-colors">
                    Optimized for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Confidence</span>,<br />
                    Not Truth.
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
                    LLMs sound smart, but if they don't know the answer, they will often <b className="text-gray-800 dark:text-gray-200">confidently make it up</b>.
                </p>
            </div>

            {/* INTERACTIVE CARD */}
            <div className="w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden relative transition-colors">

                {/* Chat Header */}
                <div className="bg-gray-50 dark:bg-zinc-800/50 p-6 flex items-center gap-4 border-b border-gray-100 dark:border-zinc-800 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                        <Sparkles className="text-white" size={20} />
                    </div>
                    <div>
                        <div className="font-bold text-[var(--foreground)] transition-colors">AI Assistant</div>
                        <div className="text-xs text-green-600 dark:text-green-400 font-bold flex items-center gap-1 transition-colors">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Online & Confident
                        </div>
                    </div>
                </div>

                {/* Chat Content */}
                <div className="p-8 space-y-8">
                    {/* User */}
                    <div className="flex justify-end">
                        <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200 px-6 py-4 rounded-2xl rounded-tr-sm font-medium border border-blue-100 dark:border-blue-800/50 max-w-[80%] transition-colors">
                            Give me the exact Q3 2024 financial statistics for "TechCorp Global" with sources.
                        </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 shrink-0 mt-2 transition-colors" />
                        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-sm p-6 rounded-2xl rounded-tl-sm w-full relative overflow-hidden group transition-colors">

                            {/* The Content */}
                            <div className={`space-y-4 transition-all duration-500 ${result === 'BUSTED' ? 'blur-sm opacity-50' : ''}`}>
                                <p className="text-gray-800 dark:text-gray-200 font-medium transition-colors">Here is the financial summary for TechCorp Global (Q3 2024):</p>
                                <div className="grid grid-cols-3 gap-4">
                                    {FAKE_STATS.map((s, i) => (
                                        <div key={i} className="bg-gray-50 dark:bg-zinc-800 p-3 rounded-xl border border-gray-100 dark:border-zinc-700 transition-colors">
                                            <div className="text-xs text-gray-400 uppercase font-bold">{s.label}</div>
                                            <div className="text-xl font-black text-gray-900 dark:text-white transition-colors">{s.val}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-xs text-blue-600 dark:text-blue-400 underline cursor-pointer transition-colors">Source: TechCorp Investor Relations Report 2024</div>
                            </div>

                            {/* THE BUST REVEAL OVERLAY */}
                            {result === 'BUSTED' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm transition-colors"
                                >
                                    <AlertTriangle size={48} className="text-red-500 mb-2 drop-shadow-xl" />
                                    <h3 className="text-2xl font-black text-red-600 uppercase tracking-widest">Hallucination</h3>
                                    <p className="text-sm font-bold text-gray-600 dark:text-gray-300 transition-colors">This company doesn't even exist.</p>
                                </motion.div>
                            )}

                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 border-t border-gray-100 dark:border-zinc-800 flex justify-center transition-colors">
                    {result === 'HIDDEN' ? (
                        <button
                            onClick={handleVerify}
                            className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
                        >
                            {analyzing ? (
                                <>
                                    <Search size={18} className="animate-spin" /> Verifying...
                                </>
                            ) : (
                                <>
                                    <BadgeCheck size={18} /> Verify Facts
                                </>
                            )}
                        </button>
                    ) : (
                        <button
                            onClick={onNext}
                            className="flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-full font-bold uppercase tracking-widest shadow-xl hover:scale-105 transition-all animate-pulse"
                        >
                            How did that happen? <ArrowRight size={18} />
                        </button>
                    )}
                </div>

            </div>
        </motion.div>
    )
}

// ==========================================
// STAGE 2: THE REVEAL (FLUENCY VS ACCURACY)
// ==========================================
function RevealStage({ onNext }: { onNext: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="max-w-5xl w-full flex flex-col items-center"
        >
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-black text-[var(--foreground)] mb-6 transition-colors">
                    Why does it lie?
                </h2>
                <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                    LLMs are trained to complete sentences, not to check facts. <br />
                    It prioritizes <span className="text-blue-600 dark:text-blue-400 font-bold">Fluency</span> (sounding good) over <span className="text-green-600 dark:text-green-400 font-bold">Accuracy</span> (being right).
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

                {/* CARD 1: THE GOAL IS FLUENCY */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 flex flex-col items-center text-center group hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                >
                    <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6 transition-colors">
                        <MessagesSquare size={40} className="text-blue-600 dark:text-blue-400 transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2 transition-colors">Optimized For Fluency</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 transition-colors">The AI wants to generate a response that flows naturally, connects logically, and sounds confident.</p>

                    {/* Visual Meter */}
                    <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden relative">
                        <motion.div
                            initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute inset-0 bg-blue-500"
                        />
                    </div>
                    <div className="flex justify-between w-full mt-2 text-xs font-bold uppercase text-blue-600">
                        <span>Dumb</span>
                        <span>Extremely Fluent</span>
                    </div>
                </motion.div>

                {/* CARD 2: THE GAP IN ACCURACY */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                    className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 flex flex-col items-center text-center group hover:border-red-200 dark:hover:border-red-800 transition-colors"
                >
                    <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6 transition-colors">
                        <ShieldAlert size={40} className="text-red-500 dark:text-red-400 transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2 transition-colors">Accuracy is Optional</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 transition-colors">Unless connected to external tools (like Search), the AI relies on "fuzzy memories" from training data.</p>

                    {/* Visual Meter */}
                    <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden relative">
                        <motion.div
                            initial={{ width: 0 }} animate={{ width: '30%' }} transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute inset-y-0 left-0 bg-red-500"
                        />
                        <div className="absolute inset-y-0 right-0 w-[70%] bg-stripes-gray opacity-20" /> {/* Concept of missing data */}
                    </div>
                    <div className="flex justify-between w-full mt-2 text-xs font-bold uppercase text-red-500">
                        <span>Guessing</span>
                        <span>Verified Fact</span>
                    </div>
                </motion.div>

            </div>

            <button
                onClick={onNext}
                className="mt-12 px-10 py-4 bg-[var(--foreground)] text-[var(--background)] rounded-full font-bold uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform flex items-center gap-3"
            >
                How do we catch it? <ArrowRight size={18} />
            </button>
        </motion.div>
    )
}

// ==========================================
// STAGE 3: THE SOLUTION (INTERROGATION)
// ==========================================
function SolutionStage({ onComplete }: TopicProps) {
    const [verdict, setVerdict] = useState<'NONE' | 'SAFE' | 'UNSAFE'>('NONE')

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-6xl w-full flex flex-col items-center"
        >
            {/* HEADER */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 text-green-600 dark:text-green-400 font-bold text-xs uppercase tracking-widest mb-4 transition-colors">
                    <CheckCircle2 size={14} /> The Best Practice
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-[var(--foreground)] mb-4 transition-colors">
                    Trust, but Verify.
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                    Use LLMs for what they are good at (Structure, Ideas, Drafts) and avoid them for what they are bad at (Facts without Sources).
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

                {/* TOOL: THE INTERROGATION TECHNIQUE */}
                <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 shadow-xl border border-gray-200 dark:border-zinc-800 transition-colors">
                    <h3 className="flex items-center gap-2 text-xl font-bold text-[var(--foreground)] mb-6 transition-colors">
                        <Search className="text-[var(--gold)]" /> The "Spot It" Technique
                    </h3>

                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-100 dark:border-zinc-700 flex gap-4 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center font-bold text-gray-500 dark:text-gray-300">1</div>
                            <div>
                                <div className="font-bold text-[var(--foreground)] text-sm transition-colors">Ask for Sources</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors">"Where did you find this? Provide a URL." (If it can't, it's lying).</div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-100 dark:border-zinc-700 flex gap-4 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center font-bold text-gray-500 dark:text-gray-300">2</div>
                            <div>
                                <div className="font-bold text-[var(--foreground)] text-sm transition-colors">Cross-Examine</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors">"Ask the same question in 3 different ways." Inconsistencies = Hallucination.</div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-100 dark:border-zinc-700 flex gap-4 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center font-bold text-gray-500 dark:text-gray-300">3</div>
                            <div>
                                <div className="font-bold text-[var(--foreground)] text-sm transition-colors">Check Live Data</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors">Only trust verifiable facts if the model has browsing capabilities enabled.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* INTERACTIVE CHECKLIST */}
                <div className="bg-gray-900 dark:bg-black rounded-[2rem] p-8 shadow-2xl text-white relative overflow-hidden transition-colors">
                    <div className="absolute top-0 right-0 p-32 bg-blue-500 rounded-full blur-[100px] opacity-20 pointer-events-none" />

                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <BadgeCheck className="text-green-400" /> Safe Usage Checklist
                    </h3>

                    <div className="space-y-2 mb-8">
                        <UsageItem label="Drafting Emails" safe={true} />
                        <UsageItem label="Brainstorming Ideas" safe={true} />
                        <UsageItem label="Summarizing Text" safe={true} />
                        <UsageItem label="Citing Legal Cases" safe={false} />
                        <UsageItem label="Medical Advice" safe={false} />
                        <UsageItem label="Historical Dates" safe={false} />
                    </div>

                    <button
                        onClick={onComplete}
                        className="w-full py-4 bg-white text-black rounded-xl font-bold uppercase tracking-widest hover:bg-green-400 hover:scale-[1.02] transition-all shadow-lg"
                    >
                        Finish Day 1
                    </button>
                </div>

            </div>
        </motion.div>
    )
}

function UsageItem({ label, safe }: { label: string, safe: boolean }) {
    return (
        <div className={`flex items-center justify-between p-3 rounded-lg border ${safe ? 'border-gray-800 bg-gray-800/50' : 'border-red-900/30 bg-red-900/10'}`}>
            <span className="text-sm font-medium text-gray-200">{label}</span>
            {safe ? (
                <span className="text-[10px] font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded">SAFE</span>
            ) : (
                <span className="text-[10px] font-bold bg-red-500/20 text-red-400 px-2 py-1 rounded">DANGER</span>
            )}
        </div>
    )
}
