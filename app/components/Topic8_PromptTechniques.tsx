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
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#212121] text-white p-6 md:p-12 overflow-y-auto relative perspective-1000">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/50 text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    <Layers size={14} /> Technique 1: Few-Shot Prompting
                </div>
                <h2 className="text-4xl font-bold mb-4">Monkey See, Monkey Do</h2>
                <p className="text-gray-400">Don't just explain. <span className="text-white font-bold">Show examples.</span></p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">

                {/* CONTROLS */}
                <div className="w-full md:w-1/3 space-y-4">
                    {[0, 1, 3].map((val) => (
                        <button
                            key={val}
                            onClick={() => setShots(val)}
                            className={`w-full p-4 rounded-xl border text-left transition-all relative overflow-hidden group
                                ${shots === val
                                    ? 'bg-blue-600 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                                    : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}
                            `}
                        >
                            <div className="relative z-10">
                                <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-70">
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
                <div className="flex-1 w-full bg-[#111] rounded-2xl border border-white/10 p-8 shadow-2xl relative min-h-[400px]">
                    <div className="absolute top-4 right-4 text-xs font-mono text-gray-500">model: gpt-4-turbo</div>

                    {/* The Prompt Context */}
                    <div className="space-y-4 mb-8">
                        <AnimatePresence>
                            {shots >= 1 && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-3 rounded bg-green-500/10 border border-green-500/20 text-sm text-green-300 font-mono">
                                    Example 1:<br />
                                    Input: "Love the color!"<br />
                                    Output: Positive | Aesthetic | Low Urgency
                                </motion.div>
                            )}
                            {shots >= 3 && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-3 rounded bg-green-500/10 border border-green-500/20 text-sm text-green-300 font-mono">
                                    Example 2:<br />
                                    Input: "It arrived broken."<br />
                                    Output: Negative | Shipping | High Urgency<br /><br />
                                    Example 3:<br />
                                    Input: "Can I return this?"<br />
                                    Output: Neutral | Support | Medium Urgency
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="p-4 bg-white/10 rounded-xl border border-white/10 text-white font-medium">
                            {DATA.input}
                        </div>
                    </div>

                    {/* The Output */}
                    <div className="mt-8 pt-8 border-t border-white/10">
                        <div className="text-xs font-bold uppercase text-gray-500 mb-2">AI Response</div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={shots}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`text-xl font-mono
                                    {shots === 3 ? 'text-green-400' : 'text-gray-300'}
                                `}
                            >
                                <StreamingText text={DATA.outputs[shots as keyof typeof DATA.outputs]} speed={30} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Analysis Badge */}
                    <div className="absolute bottom-8 right-8">
                        <div className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors
                            ${shots === 3 ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-gray-800 border-gray-700 text-gray-400'}
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
                        className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform"
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/50 text-purple-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    <BrainCircuit size={14} /> Technique 2: Chain of Thought
                </div>
                <h2 className="text-4xl font-bold mb-4">Think Step-by-Step</h2>
                <p className="text-gray-400">Force the AI to show its work to avoid <span className="text-white font-bold">stupid math & logic errors.</span></p>
            </div>

            <div className="flex flex-col gap-8 items-center">

                {/* The Problem */}
                <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                    <div className="text-xs font-bold uppercase text-gray-500 mb-2">The Riddle</div>
                    <p className="text-lg md:text-xl font-medium">
                        "I have 3 apples. I eat 1 today. I buy 2 more tomorrow. Then I give 1 to my friend. How many apples do I have?"
                    </p>
                </div>

                {/* Toggle */}
                <div className="flex gap-4">
                    <button
                        onClick={() => setMode('STANDARD')}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${mode === 'STANDARD' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-white'}`}
                    >
                        Standard Prompt
                    </button>
                    <button
                        onClick={() => setMode('COT')}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all border ${mode === 'COT' ? 'bg-purple-600 border-purple-500 text-white' : 'border-white/20 text-gray-400 hover:border-white/50'}`}
                    >
                        ✨ "Let's think step by step"
                    </button>
                </div>

                {/* The AI Brain */}
                <div className="w-full max-w-2xl min-h-[300px] bg-black rounded-3xl border border-gray-800 relative overflow-hidden p-8">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20" />

                    {mode === 'STANDARD' ? (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center h-full gap-4"
                        >
                            <div className="text-gray-500 text-sm">Reasoning...</div>
                            <div className="text-5xl font-bold text-red-500">4 Apples</div>
                            <div className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded-full font-bold">INCORRECT</div>
                            <p className="text-xs text-center text-gray-600 max-w-xs mt-4">
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
                                className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center"
                            >
                                <div className="text-5xl font-bold text-green-400">3 Apples</div>
                                <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-bold mt-2">CORRECT</div>
                            </motion.div>
                        </motion.div>
                    )}
                </div>

                {mode === 'COT' && (
                    <motion.button
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 5 }}
                        onClick={onNext}
                        className="px-10 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform"
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
            className="flex items-center gap-3 text-lg font-mono text-purple-200"
        >
            <Check size={16} className="text-purple-500" /> {text}
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
            <div className="w-24 h-24 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(255,255,255,0.3)]">
                <Zap size={40} fill="currentColor" />
            </div>
            <h2 className="text-4xl font-bold mb-6">Techniques Mastered</h2>
            <ul className="text-left space-y-4 max-w-md mx-auto mb-10 text-gray-400">
                <li className="flex items-center gap-3">
                    <Check className="text-green-400" />
                    <span><b>Few-Shot:</b> Give examples to fix format.</span>
                </li>
                <li className="flex items-center gap-3">
                    <Check className="text-green-400" />
                    <span><b>Chain of Thought:</b> Ask for steps to fix logic.</span>
                </li>
            </ul>
            <button
                onClick={onComplete}
                className="px-10 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
            >
                Next Topic <ArrowRight className="inline ml-2" size={16} />
            </button>
        </motion.div>
    )
}
