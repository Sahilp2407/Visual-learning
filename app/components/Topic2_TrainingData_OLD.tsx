'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, BookOpen, Eye, PlayCircle, Database, FileText, Globe, Code, Scale, MessageCircle, Github, Sparkles } from 'lucide-react'


// Layout Logic for Simulator Content Canvas
interface TopicCanvasProps {
    onComplete: () => void
}

export default function Topic2_TrainingData({ onComplete }: TopicCanvasProps) {
    const [stage, setStage] = useState<'READ' | 'VISUAL' | 'SIMULATOR'>('READ')

    // VISUAL MODE STATE
    const [visualStep, setVisualStep] = useState<'DEMO' | 'EXPLAIN'>('DEMO')
    const [demoSource, setDemoSource] = useState<'REDDIT' | 'LEGAL' | 'SHAKESPEARE' | null>(null)

    // SIMULATOR MODE STATE
    const [simStep, setSimStep] = useState<'CREATE' | 'APPLY'>('CREATE')
    const [mix, setMix] = useState<{ formal: number, casual: number }>({ formal: 50, casual: 50 })
    const [selectedRole, setSelectedRole] = useState<'marketing' | 'coding' | 'legal'>('marketing')

    const DEMO_RESPONSES = {
        REDDIT: "honestly life is just paying bills until u die lol 💀",
        LEGAL: "The definition of 'life', hereinafter referred to as the Existence, is subject to the terms of...",
        SHAKESPEARE: "Life's but a walking shadow, a poor player that struts and frets his hour upon the stage."
    }

    const MIX_RESPONSES = {
        FORMAL: "We must optimize our synergy to leverage core competencies.",
        BALANCED: "We need to work together to use our best skills.",
        CASUAL: "Let's vibe together and do cool stuff."
    }

    const getMixResponse = () => {
        if (mix.formal > 80) return MIX_RESPONSES.FORMAL
        if (mix.casual > 80) return MIX_RESPONSES.CASUAL
        return MIX_RESPONSES.BALANCED
    }

    return (
        <div className="flex-1 h-full relative overflow-y-auto flex flex-col items-center justify-start p-12 bg-gradient-to-br from-[#fafafa] via-white to-[#f5f5f5]">

            {/* STAGE INDICATOR */}
            <div className="absolute top-8 flex gap-4 text-xs font-bold tracking-widest uppercase">
                <div className={`flex items-center gap-2 ${stage === 'READ' ? 'text-[var(--gold)]' : 'text-[var(--foreground-muted)] opacity-50'}`}>
                    <BookOpen size={14} /> Read
                </div>
                <div className="w-8 h-[1px] bg-[var(--border-medium)] self-center" />
                <div className={`flex items-center gap-2 ${stage === 'VISUAL' ? 'text-[var(--gold)]' : 'text-[var(--foreground-muted)] opacity-50'}`}>
                    <Eye size={14} /> Visual
                </div>
                <div className="w-8 h-[1px] bg-[var(--border-medium)] self-center" />
                <div className={`flex items-center gap-2 ${stage === 'SIMULATOR' ? 'text-[var(--gold)]' : 'text-[var(--foreground-muted)] opacity-50'}`}>
                    <PlayCircle size={14} /> Simulator
                </div>
            </div>

            <AnimatePresence mode="wait">

                {/* =========================================================================
                    STAGE 1: READ MODE
                   ========================================================================= */}
                {stage === 'READ' && (
                    <motion.div
                        key="read"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="max-w-2xl text-center"
                    >
                        <h1 className="text-4xl font-light text-[var(--foreground)] mb-8 leading-tight">
                            AI mirrors its <span className="font-semibold text-[var(--gold)]">training data</span>.
                        </h1>

                        <div className="text-left space-y-6 text-[var(--foreground-muted)] text-lg leading-relaxed mb-12">
                            <p>
                                An LLM doesn't have a personality. It has a massive archive of text—from Shakespeare to Reddit threads.
                            </p>
                            <p>
                                When you prompt it, you aren't talking to a person. You are querying a specific slice of the internet.
                            </p>

                            <div className="flex justify-center gap-8 py-8 opacity-70">
                                <div className="flex flex-col items-center gap-2">
                                    <Globe size={24} />
                                    <span className="text-xs uppercase tracking-widest">Web</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <FileText size={24} />
                                    <span className="text-xs uppercase tracking-widest">Books</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Code size={24} />
                                    <span className="text-xs uppercase tracking-widest">Code</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setStage('VISUAL')}
                            className="group flex items-center gap-3 px-8 py-4 bg-[var(--foreground)] text-white rounded-lg mx-auto hover:bg-[var(--charcoal)] transition-all shadow-lg hover:shadow-xl"
                        >
                            <span className="text-white">See the patterns visually</span>
                            <ArrowRight size={18} className="text-white group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                )}


                {/* =========================================================================
                    STAGE 2: VISUAL MODE
                   ========================================================================= */}
                {stage === 'VISUAL' && (
                    <motion.div
                        key="visual"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-4xl flex flex-col items-center"
                    >
                        {/* Sub-navigation */}
                        <div className="mb-8 flex gap-2">
                            <div className={`w-2 h-2 rounded-full transition-colors ${visualStep === 'DEMO' ? 'bg-[var(--gold)]' : 'bg-gray-300'}`} />
                            <div className={`w-2 h-2 rounded-full transition-colors ${visualStep === 'EXPLAIN' ? 'bg-[var(--gold)]' : 'bg-gray-300'}`} />
                        </div>

                        {visualStep === 'DEMO' ? (
                            <div className="w-full flex flex-col items-center">
                                <h2 className="text-2xl font-light mb-8">Prompt: "The meaning of life is..."</h2>

                                <div className="grid grid-cols-3 gap-4 mb-12 w-full">
                                    <button
                                        onClick={() => setDemoSource('REDDIT')}
                                        className={`p-6 border rounded-xl flex flex-col items-center gap-4 transition-all ${demoSource === 'REDDIT' ? 'border-[var(--gold)] bg-[var(--gold)]/5' : 'hover:border-gray-300'}`}
                                    >
                                        <MessageCircle size={32} className={demoSource === 'REDDIT' ? 'text-[var(--gold)]' : 'text-gray-400'} />
                                        <span className="text-xs font-bold uppercase">Reddit Data</span>
                                    </button>
                                    <button
                                        onClick={() => setDemoSource('LEGAL')}
                                        className={`p-6 border rounded-xl flex flex-col items-center gap-4 transition-all ${demoSource === 'LEGAL' ? 'border-[var(--gold)] bg-[var(--gold)]/5' : 'hover:border-gray-300'}`}
                                    >
                                        <Scale size={32} className={demoSource === 'LEGAL' ? 'text-[var(--gold)]' : 'text-gray-400'} />
                                        <span className="text-xs font-bold uppercase">Legal Contracts</span>
                                    </button>
                                    <button
                                        onClick={() => setDemoSource('SHAKESPEARE')}
                                        className={`p-6 border rounded-xl flex flex-col items-center gap-4 transition-all ${demoSource === 'SHAKESPEARE' ? 'border-[var(--gold)] bg-[var(--gold)]/5' : 'hover:border-gray-300'}`}
                                    >
                                        <BookOpen size={32} className={demoSource === 'SHAKESPEARE' ? 'text-[var(--gold)]' : 'text-gray-400'} />
                                        <span className="text-xs font-bold uppercase">Shakespeare</span>
                                    </button>
                                </div>

                                <div className="h-[120px] mb-8 w-full max-w-2xl text-center flex items-center justify-center">
                                    {demoSource ? (
                                        <motion.p
                                            key={demoSource}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-xl font-serif italic text-[var(--foreground)]"
                                        >
                                            "{DEMO_RESPONSES[demoSource]}"
                                        </motion.p>
                                    ) : (
                                        <span className="text-[var(--foreground-muted)] text-sm">Select a data source to see how accurate prediction changes...</span>
                                    )}
                                </div>

                                <button onClick={() => setVisualStep('EXPLAIN')} className="text-sm uppercase tracking-widest text-[var(--foreground-muted)] hover:text-[var(--foreground)] flex items-center gap-2">
                                    <span className="text-[var(--foreground-muted)] hover:text-[var(--foreground)]">Analyze Logic</span> <ArrowRight size={14} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full flex flex-col items-center">
                                <h2 className="text-2xl font-light mb-8">It doesn't have "thoughts". It has "patterns".</h2>
                                <div className="flex gap-8 items-center mb-12">
                                    <div className="p-6 bg-[var(--surface)] border border-[var(--border-light)] rounded-xl text-center w-64">
                                        <div className="text-4xl mb-2">📚</div>
                                        <h3 className="font-bold mb-2">Formal Corpus</h3>
                                        <p className="text-sm text-[var(--foreground-muted)]">Books, Articles, Papers</p>
                                    </div>
                                    <ArrowRight size={24} className="text-[var(--gold)]" />
                                    <div className="p-6 bg-[var(--surface)] border border-[var(--gold)] rounded-xl text-center w-64 shadow-lg">
                                        <div className="text-4xl mb-2">🤖</div>
                                        <h3 className="font-bold mb-2 text-[var(--gold)]">Model Identity</h3>
                                        <p className="text-sm text-[var(--foreground-muted)]">Mixture of all sources</p>
                                    </div>
                                    <ArrowRight size={24} className="text-[var(--gold)]" />
                                    <div className="p-6 bg-[var(--surface)] border border-[var(--border-light)] rounded-xl text-center w-64">
                                        <div className="text-4xl mb-2">💬</div>
                                        <h3 className="font-bold mb-2">Casual Corpus</h3>
                                        <p className="text-sm text-[var(--foreground-muted)]">Reddit, Twitter, Forums</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setStage('SIMULATOR')}
                                    className="px-8 py-3 bg-[var(--foreground)] text-white rounded-full text-sm hover:scale-105 transition-transform"
                                >
                                    <span className="text-white">Next: Mix Your Own Data</span> <ArrowRight size={14} className="text-white inline ml-2" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}


                {/* =========================================================================
                    STAGE 3: SIMULATOR MODE
                   ========================================================================= */}
                {stage === 'SIMULATOR' && (
                    <motion.div
                        key="simulator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-5xl"
                    >
                        {simStep === 'CREATE' ? (
                            <div className="w-full">
                                <h2 className="text-2xl font-light text-center mb-12">Adjust the Training Mix</h2>

                                <div className="w-full max-w-2xl mx-auto mb-12 bg-white p-8 rounded-xl border border-[var(--border-light)] hover:shadow-md transition-shadow">
                                    <div className="flex justify-between mb-4 text-xs font-bold uppercase tracking-widest text-[var(--foreground-muted)]">
                                        <span>Formal / Business</span>
                                        <span>Casual / Social</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={mix.casual}
                                        onChange={(e) => setMix({ casual: parseInt(e.target.value), formal: 100 - parseInt(e.target.value) })}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--gold)]"
                                    />
                                    <div className="mt-8 text-center p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                        <p className="text-sm text-[var(--foreground-muted)] mb-2">Prompt: "Let's collaborate on this project."</p>
                                        <p className="text-lg font-medium text-[var(--foreground)]">"{getMixResponse()}"</p>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <button onClick={() => setSimStep('APPLY')} className="px-8 py-3 bg-[var(--gold)] text-white rounded-full text-sm font-bold shadow-lg hover:bg-[var(--amber)] transition-colors">
                                        <span className="text-white">Next: Real World Application</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // APPLY STEP
                            <div className="w-full text-center max-w-2xl mx-auto">
                                <h2 className="text-2xl font-light mb-8">Why does your company AI sounds generic?</h2>
                                <p className="text-lg text-[var(--foreground-muted)] mb-12">
                                    Most enterprise models are strictly trained on "safe" formal data. This leads to the "Corporate Grey Goo" effect—where everything sounds safe, but nothing sounds human.
                                </p>
                                <div className="flex justify-center gap-4">
                                    <button className="p-4 border border-[var(--border-light)] rounded-lg text-left w-64 hover:border-[var(--gold)] transition-colors">
                                        <span className="block text-xs font-bold uppercase text-[var(--gold)] mb-1">Bad Strategy</span>
                                        <span className="text-sm">Using raw ChatGPT for brand voice without style context.</span>
                                    </button>
                                    <button className="p-4 border border-[var(--border-light)] rounded-lg text-left w-64 hover:border-[var(--gold)] transition-colors">
                                        <span className="block text-xs font-bold uppercase text-[var(--gold)] mb-1">Good Strategy</span>
                                        <span className="text-sm">Providing "Few-Shot" examples in your prompt to bias the pattern.</span>
                                    </button>
                                </div>
                                <div className="flex justify-center mt-12">
                                    <button onClick={onComplete} className="px-10 py-4 bg-[var(--foreground)] text-white text-sm uppercase tracking-widest hover:bg-black transition-colors shadow-2xl rounded-sm">
                                        <span className="text-white">Complete & Unlock Topic 3</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
