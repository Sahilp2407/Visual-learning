'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Target,
    Zap,
    Layers,
    ArrowRight,
    BrainCircuit,
    Check,
    X,
    Lightbulb,
    MessageSquare,
    List
} from 'lucide-react'
import StreamingText from './StreamingText'

interface TopicProps {
    onComplete: () => void
}

export default function Topic8_PromptTechniques({ onComplete }: TopicProps) {
    const [subModule, setSubModule] = useState<'FEW_SHOT' | 'CHAIN_OF_THOUGHT' | 'DONE'>('FEW_SHOT')

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] p-6 md:p-12 overflow-y-auto relative perspective-1000 transition-colors duration-500">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 pointer-events-none transition-opacity"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }}
            />

            <AnimatePresence mode='wait'>
                {subModule === 'FEW_SHOT' && <FewShotModule onNext={() => setSubModule('CHAIN_OF_THOUGHT')} />}
                {subModule === 'CHAIN_OF_THOUGHT' && <ChainOfThoughtModule onNext={() => setSubModule('DONE')} />}
                {subModule === 'DONE' && <TechniquesSummary onComplete={onComplete} />}
            </AnimatePresence>
        </div>
    )
}

// ==========================================
// 1. FEW-SHOT PROMPTING SIMULATOR
// ==========================================
function FewShotModule({ onNext }: { onNext: () => void }) {
    const [shots, setShots] = useState(0) // 0 = Zero-shot, 1 = One-shot, 3 = Few-shot

    const DATA = {
        input: "Product: 'The battery died after 2 hours.' Sentiment: ?",
        outputs: {
            0: "Negative.", // Boring, standard
            1: "Negative (Complaint)", // Better
            3: "Sentiment: Negative | Category: Defect | Urgency: High" // Perfect structure
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: -100 }}
            className="max-w-4xl w-full"
        >
            <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4 transition-colors">
                    <Layers size={14} /> Technique 1: Few-Shot Prompting
                </div>
                <h2 className="text-4xl font-bold mb-4 text-[var(--foreground)] transition-colors">Monkey See, Monkey Do</h2>
                <p className="text-gray-500 dark:text-gray-400 transition-colors">Don't just explain. <span className="text-blue-600 dark:text-blue-400 font-bold transition-colors">Show examples.</span></p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">

                {/* CONTROLS */}
                <div className="w-full md:w-1/3 space-y-4">
                    {[0, 1, 3].map((val) => (
                        <button
                            key={val}
                            onClick={() => setShots(val)}
                            className={`w-full p-4 rounded-xl border text-left transition-all relative overflow-hidden group shadow-sm
                                ${shots === val
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-105'
                                    : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300'}
                            `}
                        >
                            <div className="relative z-10">
                                <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${shots === val ? 'opacity-80' : 'text-gray-400'}`}>
                                    {val === 0 ? 'Zero-Shot' : val === 1 ? 'One-Shot' : 'Few-Shot'}
                                </div>
                                <div className="font-bold text-lg">
                                    {val === 0 ? 'Just the Question' : val === 1 ? '+ 1 Example' : '+ 3 Examples'}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* VISUALIZER */}
                <div className="flex-1 w-full bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-8 shadow-xl relative min-h-[400px] transition-colors">
                    <div className="absolute top-4 right-4 text-xs font-mono text-gray-400">model: gpt-4-turbo</div>

                    {/* The Prompt Context */}
                    <div className="space-y-4 mb-8">
                        <AnimatePresence>
                            {shots >= 1 && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-3 rounded bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-sm text-green-700 dark:text-green-300 font-mono transition-colors">
                                    Example 1:<br />
                                    Input: "Love the color!"<br />
                                    Output: Positive | Aesthetic | Low Urgency
                                </motion.div>
                            )}
                            {shots >= 3 && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-3 rounded bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-sm text-green-700 dark:text-green-300 font-mono transition-colors">
                                    Example 2:<br />
                                    Input: "It arrived broken."<br />
                                    Output: Negative | Shipping | High Urgency<br /><br />
                                    Example 3:<br />
                                    Input: "Can I return this?"<br />
                                    Output: Neutral | Support | Medium Urgency
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-200 font-medium transition-colors">
                            {DATA.input}
                        </div>
                    </div>

                    {/* The Output */}
                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <div className="text-xs font-bold uppercase text-gray-400 mb-2">AI Response</div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={shots}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`text-xl font-mono font-medium transition-colors
                                    {shots === 3 ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-200'}
                                `}
                            >
                                <StreamingText text={DATA.outputs[shots as keyof typeof DATA.outputs]} speed={30} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Analysis Badge */}
                    <div className="absolute bottom-8 right-8">
                        <div className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors
                            ${shots === 3 ? 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400'}
                         `}>
                            Structure Quality: {shots === 3 ? 'PERFECT' : shots === 1 ? 'BETTER' : 'POOR'}
                        </div>
                    </div>

                </div>
            </div>

            <div className="mt-12 flex justify-end">
                {shots === 3 && (
                    <motion.button
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        onClick={onNext}
                        className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg"
                    >
                        Next Technique <ArrowRight className="inline ml-2" size={16} />
                    </motion.button>
                )}
            </div>
        </motion.div>
    )
}

// ==========================================
// 2. CHAIN OF THOUGHT SIMULATOR
// ==========================================
function ChainOfThoughtModule({ onNext }: { onNext: () => void }) {
    const [mode, setMode] = useState<'STANDARD' | 'COT'>('STANDARD')

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl w-full"
        >
            <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4 transition-colors">
                    <BrainCircuit size={14} /> Technique 2: Chain of Thought
                </div>
                <h2 className="text-4xl font-bold mb-4 text-[var(--foreground)] transition-colors">Think Step-by-Step</h2>
                <p className="text-gray-500 dark:text-gray-400 transition-colors">Force the AI to show its work to avoid <span className="text-purple-600 dark:text-purple-400 font-bold transition-colors">stupid math & logic errors.</span></p>
            </div>

            <div className="flex flex-col gap-8 items-center">

                {/* The Problem */}
                <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 text-center shadow-lg transition-colors">
                    <div className="text-xs font-bold uppercase text-gray-400 mb-2">The Riddle</div>
                    <p className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200 transition-colors">
                        "I have 3 apples. I eat 1 today. I buy 2 more tomorrow. Then I give 1 to my friend. How many apples do I have?"
                    </p>
                </div>

                {/* Toggle */}
                <div className="flex gap-4">
                    <button
                        onClick={() => setMode('STANDARD')}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all shadow-sm ${mode === 'STANDARD' ? 'bg-gray-800 text-white shadow-lg' : 'bg-white dark:bg-zinc-900 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-800'}`}
                    >
                        Standard Prompt
                    </button>
                    <button
                        onClick={() => setMode('COT')}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all border shadow-sm ${mode === 'COT' ? 'bg-purple-600 border-purple-500 text-white shadow-lg' : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-gray-400 hover:border-purple-200 dark:hover:border-purple-800'}`}
                    >
                        ✨ "Let's think step by step"
                    </button>
                </div>

                {/* The AI Brain */}
                <div className="w-full max-w-2xl min-h-[300px] bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 relative overflow-hidden p-8 shadow-2xl transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

                    {mode === 'STANDARD' ? (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center h-full gap-4"
                        >
                            <div className="text-gray-400 text-sm font-mono">Reasoning...</div>
                            <div className="text-5xl font-bold text-red-500">4 Apples</div>
                            <div className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-full font-bold border border-red-100 dark:border-red-800 transition-colors">INCORRECT</div>
                            <p className="text-xs text-center text-gray-400 max-w-xs mt-4">
                                (Without step-by-step logic, LLMs often hallucinate simple math by rushing to the answer.)
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="space-y-4"
                        >
                            <StepDelay text="1. Start: 3 apples." delay={0.5} />
                            <StepDelay text="2. Eat 1: 3 - 1 = 2 apples left." delay={1.5} />
                            <StepDelay text="3. Buy 2: 2 + 2 = 4 apples." delay={2.5} />
                            <StepDelay text="4. Give 1: 4 - 1 = 3 apples." delay={3.5} />

                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 4.5, type: 'spring' }}
                                className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800 flex flex-col items-center transition-colors"
                            >
                                <div className="text-5xl font-bold text-green-600 dark:text-green-500 transition-colors">3 Apples</div>
                                <div className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs rounded-full font-bold mt-2 border border-green-100 dark:border-green-800 transition-colors">CORRECT</div>
                            </motion.div>
                        </motion.div>
                    )}
                </div>

                {mode === 'COT' && (
                    <motion.button
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 5 }}
                        onClick={onNext}
                        className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
                    >
                        Finish Training
                    </motion.button>
                )}

            </div>
        </motion.div>
    )
}

function StepDelay({ text, delay }: { text: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className="flex items-center gap-3 text-lg font-mono text-gray-600 dark:text-gray-400 transition-colors"
        >
            <Check size={16} className="text-purple-500 dark:text-purple-400 transition-colors" /> {text}
        </motion.div>
    )
}

// ==========================================
// SUMMARY
// ==========================================
function TechniquesSummary({ onComplete }: TopicProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-2xl"
        >
            <div className="w-24 h-24 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl transition-colors">
                <Zap size={40} fill="currentColor" />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-[var(--foreground)] transition-colors">Techniques Mastered</h2>
            <ul className="text-left space-y-4 max-w-md mx-auto mb-10 text-gray-500 dark:text-gray-400 transition-colors">
                <li className="flex items-center gap-3">
                    <Check className="text-green-500" />
                    <span><b>Few-Shot:</b> Give examples to fix format.</span>
                </li>
                <li className="flex items-center gap-3">
                    <Check className="text-green-500" />
                    <span><b>Chain of Thought:</b> Ask for steps to fix logic.</span>
                </li>
            </ul>
            <button
                onClick={onComplete}
                className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
            >
                Next Topic <ArrowRight className="inline ml-2" size={16} />
            </button>
        </motion.div>
    )
}
