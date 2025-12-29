'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Box, Cpu, FileText, ArrowDown, Scan, ArrowBigRightDash, CheckCircle2 } from 'lucide-react'

// ==========================================
// TYPES & HELPERS
// ==========================================
interface TopicCanvasProps {
    onComplete: () => void
}

export default function Topic3_Tokens({ onComplete }: TopicCanvasProps) {
    const [stage, setStage] = useState<'TOKENS' | 'CONTEXT' | 'OPTIMIZATION'>('TOKENS')

    // ==========================================
    // RENDER
    // ==========================================
    return (
        <div className="flex-1 h-full flex flex-col bg-[#f8f9fa] relative overflow-hidden font-sans">

            {/* TOP NAVIGATION */}
            <div className="w-full h-20 border-b border-gray-200 flex items-center justify-between px-10 bg-white z-50 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="bg-black text-white p-2 rounded-lg">
                        <Cpu size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Topic 3</div>
                        <div className="font-bold text-gray-900 text-lg tracking-tight">How AI Reads & Remembers</div>
                    </div>
                </div>

                <div className="flex bg-gray-100 p-1.5 rounded-xl">
                    {[
                        { id: 'TOKENS', label: '1. The Translator' },
                        { id: 'CONTEXT', label: '2. The Moving Table' },
                        { id: 'OPTIMIZATION', label: '3. Compression' }
                    ].map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setStage(s.id as any)}
                            className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${stage === s.id ? 'bg-white shadow-md text-black transform scale-105' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 p-10 flex justify-center items-center overflow-y-auto">
                <AnimatePresence mode="wait">
                    {stage === 'TOKENS' && <TokenAnimation key="tokens" onNext={() => setStage('CONTEXT')} />}
                    {stage === 'CONTEXT' && <ContextAnimation key="context" onNext={() => setStage('OPTIMIZATION')} />}
                    {stage === 'OPTIMIZATION' && <OptimizationAnimation key="optim" onComplete={onComplete} />}
                </AnimatePresence>
            </div>

        </div>
    )
}

// ==========================================
// SUB-COMPONENTS (THE ANIMATIONS)
// ==========================================

function TokenAnimation({ onNext }: { onNext: () => void }) {
    const [step, setStep] = useState(0) // 0-4 cycle

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(prev => (prev + 1) % 5)
        }, 3000)
        return () => clearInterval(timer)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-5xl"
        >
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-6">
                    <Scan size={14} /> Concept 3.1: Tokenization
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Machines don't read words.</h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    They break language into <span className="text-blue-600 font-bold">Chunks</span> and convert them into <span className="text-indigo-600 font-bold">Numbers</span>.
                </p>
            </div>

            <div className="relative h-[400px] bg-white rounded-[40px] shadow-2xl border border-gray-100 flex items-center justify-center overflow-hidden p-8">
                {/* Background Grid */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />

                {/* Progress Bar */}
                <div className="absolute top-8 left-0 w-full flex justify-center gap-2">
                    {[0, 1, 2, 3].map((s) => (
                        <div key={s} className={`h-1 w-12 rounded-full transition-colors duration-500 ${step >= s ? 'bg-blue-500' : 'bg-gray-200'}`} />
                    ))}
                </div>

                <div className="flex items-center justify-between w-full max-w-4xl relative">

                    {/* LEFT: HUMAN INPUT */}
                    <div className="relative z-10 w-1/3 flex flex-col items-center">
                        <div className="text-[10px] font-bold uppercase text-gray-400 mb-4 tracking-widest">Raw Input</div>
                        <motion.div
                            animate={{
                                opacity: step === 0 ? 1 : 0.2,
                                scale: step === 0 ? 1.1 : 0.9,
                                filter: step === 0 ? 'blur(0px)' : 'blur(4px)'
                            }}
                            className="bg-gray-50 border-2 border-gray-100 px-8 py-6 rounded-2xl shadow-sm text-4xl font-serif text-gray-800"
                        >
                            "Uber"
                        </motion.div>
                    </div>

                    {/* MIDDLE: THE SCANNER */}
                    <div className="relative z-20 w-1/3 h-40 flex items-center justify-center">
                        {/* The Beam */}
                        <motion.div
                            animate={{
                                x: [-150, 150],
                                opacity: [0, 1, 1, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-y-0 w-1 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)] z-30"
                        />

                        {/* Token Transformation */}
                        <div className="flex gap-1 relative">
                            <AnimatePresence mode="wait">
                                {step >= 1 ? (
                                    <>
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                            className="px-5 py-3 rounded-lg bg-blue-100/50 border border-blue-200 text-blue-800 font-bold text-2xl"
                                        >
                                            U
                                        </motion.div>
                                        <motion.div
                                            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                            className="px-5 py-3 rounded-lg bg-indigo-100/50 border border-indigo-200 text-indigo-800 font-bold text-2xl"
                                        >
                                            ber
                                        </motion.div>
                                    </>
                                ) : (
                                    <div className="px-8 py-6 opacity-0">PLACEHOLDER</div>
                                )}
                            </AnimatePresence>
                        </div>

                        {step >= 1 && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="absolute -bottom-10 text-xs font-bold text-blue-500 uppercase tracking-widest flex items-center gap-2"
                            >
                                <Scan size={14} className="animate-spin-slow" /> Tokenizing...
                            </motion.div>
                        )}
                    </div>

                    {/* RIGHT: MACHINE OUTPUT */}
                    <div className="relative z-10 w-1/3 flex flex-col items-center">
                        <div className="text-[10px] font-bold uppercase text-gray-400 mb-4 tracking-widest">Neural Input</div>
                        <div className="bg-[#0a0a0a] w-full max-w-[200px] h-[100px] rounded-2xl flex items-center justify-center border border-gray-800 shadow-2xl relative overflow-hidden group">

                            <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                            {step >= 2 ? (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="font-mono font-black text-4xl tracking-widest flex gap-4 relative z-50 text-white"
                                    style={{ color: '#ffffff', opacity: 1, filter: 'none' }}
                                >
                                    <span style={{ color: '#ffffff' }}>52</span>
                                    <span style={{ color: '#ffffff' }}>901</span>
                                </motion.div>
                            ) : (
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
                                    <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-75" />
                                    <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-150" />
                                </div>
                            )}

                            {/* Tech Deco */}
                            <div className="absolute top-2 left-2 w-1 h-1 bg-gray-600 rounded-full" />
                            <div className="absolute top-2 right-2 w-1 h-1 bg-gray-600 rounded-full" />
                            <div className="absolute bottom-2 left-2 w-1 h-1 bg-gray-600 rounded-full" />
                            <div className="absolute bottom-2 right-2 w-1 h-1 bg-gray-600 rounded-full" />
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex justify-center mt-12">
                <button onClick={onNext} className="group relative px-10 py-5 bg-black rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                    <div className="flex items-center gap-3 text-white" style={{ color: 'white' }}>
                        Finish Topic <ArrowRight className="group-hover:translate-x-1 transition-transform text-white" />
                    </div>
                </button>
            </div>
        </motion.div>
    )
}
function ContextAnimation({ onNext }: { onNext: () => void }) {
    const memoryCapacity = 3;
    const sequence = ["Hello", "My", "Name", "Is", "Sahil", "Pandey"];
    const [visibleItems, setVisibleItems] = useState<string[]>([]);
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(prev => {
                const nextStep = (prev + 1) % (sequence.length + 3); // Extra steps for pause
                return nextStep;
            })
        }, 1500)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if (step < sequence.length) {
            // Adding Phase
            setVisibleItems(prev => {
                const newItem = sequence[step];
                const newArr = [...prev, newItem];
                if (newArr.length > memoryCapacity) {
                    return newArr.slice(1); // Remove first
                }
                return newArr;
            })
        } else {
            // Reset phase
            if (step === sequence.length + 2) setVisibleItems([])
        }
    }, [step])

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-5xl"
        >
            <div className="text-center mb-16">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">The "Moving Table" Memory</h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                    The AI has a small table. When it's full, adding a new block <span className="text-red-500 font-bold">pushes the oldest one off the edge</span>.
                </p>
            </div>

            <div className="h-[400px] w-full relative flex items-center justify-center">

                {/* The "Table" */}
                <div className="w-[600px] h-4 bg-gray-300 rounded-full relative mx-auto my-auto z-10 flex items-center justify-center">
                    <div className="absolute top-6 text-xs font-bold uppercase text-gray-400 tracking-widest text-center w-full">Context Window (Limit: 3)</div>
                </div>

                {/* Visualizing Items */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="flex gap-4">
                        <AnimatePresence mode="popLayout">
                            {visibleItems.map((item, i) => (
                                <motion.div
                                    layout
                                    key={`${item}-${i}`} // Force unique
                                    initial={{ opacity: 0, y: -50, scale: 0.5 }}
                                    animate={{ opacity: 1, y: -30, scale: 1 }}
                                    exit={{ opacity: 0, y: 100, rotate: 20, scale: 0.8, transition: { duration: 0.5 } }}
                                    className="w-32 h-32 rounded-2xl bg-white shadow-xl border-4 border-gray-100 flex items-center justify-center text-xl font-bold text-gray-800"
                                >
                                    {item}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* The Abyss */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-30 pointer-events-none" />
                <div className="absolute bottom-10 left-1/4 text-red-300 text-xs font-bold uppercase tracking-widest flex flex-col items-center">
                    <ArrowDown size={20} className="mb-2 animate-bounce" />
                    Forgotten Zone
                </div>
            </div>

            {/* Explanation Box */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center max-w-xl mx-auto mt-8">
                <p className="text-blue-900 font-medium">
                    Did you see that? By the time "Sahil" arrived on the table, the word "Hello" fell off.
                    The AI literally <span className="underline">cannot see</span> "Hello" anymore.
                </p>
            </div>

            <div className="flex justify-center mt-12">
                <button onClick={onNext} className="group flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">
                    See The Solution <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

        </motion.div>
    )
}

function OptimizationAnimation({ onComplete }: { onComplete: () => void }) {

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl flex flex-col items-center"
        >
            <div className="text-center mb-16">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Pack Your Suitcase Carefully</h2>
                <p className="text-xl text-gray-500 max-w-xl mx-auto">
                    Since space is limited, we must remove the "Air" (Filler words) to fit more "Clothes" (Meaning).
                </p>
            </div>

            <div className="grid grid-cols-2 gap-12 w-full">
                {/* BAD PACKING */}
                <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm opacity-50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-br-lg">
                        Wasteful
                    </div>
                    <div className="mt-8 text-lg font-serif text-gray-400 leading-relaxed">
                        "Hello AI, I was possibly wondering if you could please tell me what the weather is?"
                    </div>
                    <div className="mt-8 flex gap-1">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="h-3 w-full bg-red-200 rounded-full" />
                        ))}
                    </div>
                </div>

                {/* GOOD PACKING */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-green-50 p-8 rounded-3xl border-2 border-green-500 shadow-xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 bg-green-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-br-lg">
                        Optimized
                    </div>
                    <div className="mt-8 text-2xl font-bold text-gray-900 leading-relaxed">
                        "Weather report?"
                    </div>
                    <div className="mt-10 flex gap-1 w-[20%]">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-3 w-full bg-green-500 rounded-full" />
                        ))}
                    </div>
                    <div className="mt-4 text-green-700 font-bold text-sm flex items-center gap-2">
                        <CheckCircle2 size={16} /> 80% Space Saved
                    </div>
                </motion.div>
            </div>

            <div className="flex justify-center mt-20">
                <button onClick={onComplete} className="group flex items-center gap-3 px-12 py-5 bg-[var(--gold)] text-white rounded-full font-bold text-lg uppercase tracking-widest hover:scale-105 hover:shadow-2xl transition-all">
                    Finish Topic <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

        </motion.div>
    )
}
