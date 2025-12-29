'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Smartphone, Zap, Wand2, Briefcase, User, GraduationCap, Scale, BookOpen, Eye, PlayCircle, Network, Thermometer, BrainCircuit, Sparkles } from 'lucide-react'
import StreamingText from './StreamingText'
import ScrambleText from './ScrambleText'

// Layout Logic for Simulator Content Canvas
interface SimulatorCanvasProps {
    onComplete: () => void
}

export default function SimulatorCanvas({ onComplete }: SimulatorCanvasProps) {
    // 3 Major Stages: READ, VISUAL, SIMULATOR
    const [stage, setStage] = useState<'READ' | 'VISUAL' | 'SIMULATOR'>('READ')

    // Sub-steps for Visual and Simulator stages
    const [visualStep, setVisualStep] = useState<'DEMO' | 'EXPLAIN'>('DEMO')
    const [simStep, setSimStep] = useState<'CREATE' | 'APPLY'>('CREATE')

    // Logic for CREATE / APPLY phase
    const [selectedTone, setSelectedTone] = useState<'professional' | 'casual' | 'genz' | 'legal' | null>(null)
    const [selectedRole, setSelectedRole] = useState<'hr' | 'lawyer' | 'founder' | 'student' | null>(null)
    const [temperature, setTemperature] = useState(0.5) // 0.0 to 1.0 logic

    // Mouse Parallax Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
        const { innerWidth, innerHeight } = window;
        mouseX.set(clientX / innerWidth - 0.5);
        mouseY.set(clientY / innerHeight - 0.5);
    }

    const contentRotateX = useTransform(mouseY, [-0.5, 0.5], [2, -2]);
    const contentRotateY = useTransform(mouseX, [-0.5, 0.5], [-2, 2]);

    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(contentRotateX, springConfig);
    const rotateY = useSpring(contentRotateY, springConfig);

    const AI_RESPONSES = {
        professional: "Dear Mr. Sharma, I am writing to kindly remind you of the pending invoice #402. Please verify at your earliest convenience.",
        casual: "Hey Sam! Just checking in on that invoice #402. Let me know when you can sort it out, no rush!",
        genz: "Yo invoice #402 is still ghosting us 💀 pls fix asap lol",
        legal: "Notice of Overdue Payment: Reference Invoice #402. Payment is required immediately pursuant to our service agreement."
    }

    const ROLE_RESPONSES = {
        hr: "Based on company policy 4.2, we should proceed with a documented formal warning.",
        lawyer: "Standard liability clauses should cover this risk, assuming no gross negligence.",
        founder: "Let's ignore the rules for now and ship it. Speed is our only advantage.",
        student: "I used ChatGPT to summarize the textbook, but I should probably double-check the citations."
    }

    // Helper to get distorted text based on temperature
    const getDistortedText = (text: string, temp: number) => {
        if (temp <= 0.3) return text;
        if (temp > 0.8) {
            return text.split(' ').reverse().join(' ') + " (Wait, what?)";
        }
        if (temp > 0.6) {
            return text.replace(/[aeiou]/g, (l) => Math.random() > 0.7 ? '*' : l) + " ...maybe?";
        }
        return text;
    }

    return (
        <div
            className="flex-1 h-full relative overflow-hidden flex flex-col items-center justify-center p-12 bg-[var(--background)] perspective-1000"
            onMouseMove={handleMouseMove}
        >

            {/* Ambient Background - Moving Aurora */}
            <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-soft-light overflow-hidden">
                <div className="absolute w-[800px] h-[800px] bg-[var(--gold)] rounded-full blur-[120px] opacity-20 animate-pulse top-[-200px] left-[-200px]" />
                <div className="absolute w-[600px] h-[600px] bg-blue-300 rounded-full blur-[100px] opacity-10 bottom-[-100px] right-[-100px]" />
            </div>

            <div className="grain-texture z-0" />

            {/* STAGE INDICATOR - Premium Pill */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute top-8 z-30 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/50 shadow-sm flex gap-6"
            >
                {[
                    { id: 'READ', icon: BookOpen, label: 'Theory' },
                    { id: 'VISUAL', icon: Eye, label: 'Visual' },
                    { id: 'SIMULATOR', icon: PlayCircle, label: 'Practice' }
                ].map((s, i) => (
                    <div key={s.id} className="relative flex items-center">
                        <div
                            className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all duration-500 cursor-default
                            ${stage === s.id ? 'text-[var(--gold)]' : 'text-gray-400'}`}
                        >
                            <s.icon size={12} strokeWidth={stage === s.id ? 2.5 : 2} />
                            {s.label}
                        </div>
                        {stage === s.id && (
                            <motion.div
                                layoutId="activeStep"
                                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--gold)] rounded-full"
                            />
                        )}
                    </div>
                ))}
            </motion.div>

            <AnimatePresence mode="wait">

                {/* =========================================================================
                    STAGE 1: READ MODE (Mental Model)
                   ========================================================================= */}
                {stage === 'READ' && (
                    <motion.div
                        key="read"
                        style={{ rotateX, rotateY }}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)", transition: { duration: 0.5 } }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                        className="max-w-3xl text-center z-10"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="inline-block px-4 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 text-[var(--gold)] text-[10px] uppercase tracking-[0.2em] font-bold mb-8 shadow-[0_0_20px_rgba(201,162,77,0.1)]"
                        >
                            Module 1.1: Foundations
                        </motion.div>

                        <h1 className="text-6xl md:text-7xl font-light text-[var(--foreground)] mb-8 leading-[1.1] tracking-tight mx-auto max-w-4xl">
                            LLMs don't <span className="italic font-serif">think</span>.<br />
                            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] via-[#e6c875] to-[var(--gold)] animate-gradient-x text-glow">
                                They predict.
                            </span>
                        </h1>

                        <div className="premium-glass p-10 rounded-3xl text-left shadow-2xl border-white/40 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-50" />

                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-[var(--foreground)] font-medium text-lg">
                                        <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                                            <BrainCircuit size={24} className="text-[var(--gold)]" />
                                        </div>
                                        The Illusion of Intelligence
                                    </div>
                                    <p className="text-[var(--foreground-muted)] leading-relaxed">
                                        Every "thought" an AI has is just a math equation calculating the most likely next word. It feels like magic, but it's just statistics at massive scale.
                                    </p>
                                </div>

                                <div className="space-y-4 border-l border-gray-200 pl-8">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Key Takeaways</h3>
                                    <ul className="space-y-4">
                                        {['Prediction vs Understanding', 'The "Hallucination" Trap', 'controlling Probability'].map((item, i) => (
                                            <motion.li
                                                key={item}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5 + (i * 0.1) }}
                                                className="flex items-center gap-3 text-sm font-medium text-[var(--foreground)]"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                                                {item}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            onClick={() => setStage('VISUAL')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative mt-12 px-12 py-6 bg-[var(--foreground)] text-white rounded-2xl mx-auto overflow-hidden shadow-2xl transition-all"
                        >
                            <div className="absolute inset-0 bg-[var(--charcoal)]" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />

                            <div className="relative flex items-center gap-4 text-sm font-bold tracking-widest uppercase">
                                <span>Start Interactive Demo</span>
                                <div className="p-1 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                                    <ArrowRight size={14} className="text-white" />
                                </div>
                            </div>
                        </motion.button>
                    </motion.div>
                )}


                {/* =========================================================================
                    STAGE 2: VISUAL MODE (Guided Explanation)
                   ========================================================================= */}
                {stage === 'VISUAL' && (
                    <motion.div
                        key="visual"
                        style={{ rotateX, rotateY }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-5xl flex flex-col items-center z-10"
                    >
                        <AnimatePresence mode="wait">
                            {visualStep === 'DEMO' ? (
                                <motion.div
                                    key="demo-view"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="w-full flex flex-col items-center"
                                >
                                    <div className="text-center mb-10">
                                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-[10px] uppercase font-bold tracking-widest text-[var(--gold)] mb-4">
                                            <Eye size={12} /> Live Visualization
                                        </div>
                                        <h2 className="text-4xl font-light mb-2">The Probability Engine</h2>
                                        <p className="text-[var(--foreground-muted)] max-w-md mx-auto">See how the model struggles to choose the next connection.</p>
                                    </div>

                                    <div className="relative w-full max-w-3xl h-[450px] premium-glass rounded-[40px] flex items-center justify-center border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden">

                                        <div className="absolute top-8 left-8 text-xs font-mono text-gray-400">
                                            STATUS: <span className="text-[var(--gold)] animate-pulse">COMPUTING_WEIGHTS</span>
                                        </div>

                                        {/* PARTICLES */}
                                        <div className="absolute inset-0 pointer-events-none z-0 opacity-60">
                                            {[...Array(8)].map((_, i) => (
                                                <motion.div
                                                    key={`p-win-${i}`}
                                                    className="absolute w-1 h-1 bg-[var(--gold)] rounded-full shadow-[0_0_10px_var(--gold)]"
                                                    initial={{ x: 300, y: 225, opacity: 0 }}
                                                    animate={{ x: [300, 550], y: [225, 150], opacity: [0, 1, 0] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                                                />
                                            ))}
                                        </div>

                                        <div className="absolute left-[150px] w-40 h-40 rounded-full bg-white border border-[var(--gold)]/30 flex items-center justify-center shadow-[0_0_80px_rgba(201,162,77,0.15)] z-10 backdrop-blur-xl">
                                            <div className="absolute inset-0 rounded-full border border-[var(--gold)]/40 animate-[spin_8s_linear_infinite]" style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }} />
                                            <div className="absolute inset-4 rounded-full border border-[var(--gold)]/20 animate-[spin_12s_linear_infinite_reverse]" style={{ borderBottomColor: 'transparent' }} />
                                            <BrainCircuit strokeWidth={1} size={40} className="text-[var(--gold)] animate-pulse" />
                                        </div>

                                        {/* OPTIONS */}
                                        <div className="absolute right-[100px] flex flex-col gap-6">
                                            {[
                                                { text: "Payment", percent: 92, active: true },
                                                { text: "Invoice", percent: 4, active: false },
                                                { text: "Money", percent: 2, active: false },
                                            ].map((item, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: 50 }}
                                                    animate={{ opacity: item.active ? 1 : 0.4, x: 0 }}
                                                    transition={{ delay: 0.5 + (i * 0.2) }}
                                                    className={`
                                                        relative px-6 py-4 rounded-xl border flex items-center gap-4 min-w-[200px]
                                                        ${item.active
                                                            ? 'bg-white border-[var(--gold)] shadow-lg scale-105 z-20'
                                                            : 'bg-white/40 border-transparent blur-[1px]'}
                                                    `}
                                                >
                                                    <span className={`text-lg ${item.active ? 'font-bold text-[var(--foreground)]' : 'font-normal text-gray-400'}`}>{item.text}</span>
                                                    {item.active && (
                                                        <div className="absolute -right-3 -top-3 bg-[var(--gold)] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                                                            {item.percent}%
                                                        </div>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Connecting Lines SVG */}
                                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                            <motion.path
                                                d="M 310 225 C 400 225, 450 150, 520 150"
                                                stroke="url(#gradient-gold)"
                                                strokeWidth="2"
                                                fill="transparent"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                            />
                                            <defs>
                                                <linearGradient id="gradient-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="transparent" />
                                                    <stop offset="50%" stopColor="#c9a24d" />
                                                    <stop offset="100%" stopColor="transparent" />
                                                </linearGradient>
                                            </defs>
                                        </svg>

                                    </div>

                                    <motion.button
                                        onClick={() => setVisualStep('EXPLAIN')}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="mt-12 group flex items-center gap-3 px-8 py-4 rounded-full bg-white shadow-lg border border-gray-100 hover:border-[var(--gold)] transition-all"
                                    >
                                        <span className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)]">Deep Dive</span>
                                        <div className="p-1 bg-gray-100 rounded-full group-hover:bg-[var(--gold)] group-hover:text-white transition-colors">
                                            <ArrowRight size={12} />
                                        </div>
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="explain-view"
                                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                    className="w-full flex flex-col items-center"
                                >
                                    <div className="grid grid-cols-2 gap-8 w-full max-w-4xl px-8">
                                        <div className="aspect-square bg-white rounded-3xl border border-gray-100 p-8 flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow duration-500 group">
                                            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <Smartphone size={40} className="text-gray-300" />
                                            </div>
                                            <h3 className="text-xl font-medium mb-2">Autocomplete</h3>
                                            <p className="text-sm text-gray-400">Sees 3 words back.<br />"How are <strong>you</strong>"</p>
                                        </div>

                                        <div className="aspect-square bg-gradient-to-br from-[var(--surface)] to-[#fffdf5] rounded-3xl border border-[var(--gold)]/30 p-8 flex flex-col items-center justify-center text-center shadow-[0_10px_40px_rgba(201,162,77,0.15)] relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-[var(--gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg border border-[var(--gold)]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <Zap size={40} className="text-[var(--gold)]" />
                                            </div>
                                            <h3 className="text-xl font-medium mb-2">LLM (GPT-4)</h3>
                                            <p className="text-sm text-[var(--foreground-muted)]">Sees 100,000 words back.<br />Understanding context, tone, and intent.</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setStage('SIMULATOR')}
                                        className="mt-16 px-12 py-5 bg-[var(--foreground)] text-white rounded-full text-sm font-bold tracking-widest uppercase shadow-2xl hover:scale-105 transition-transform"
                                    >
                                        Try The Simulator
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}


                {/* =========================================================================
                    STAGE 3: SIMULATOR MODE (Hands-On)
                   ========================================================================= */}
                {stage === 'SIMULATOR' && (
                    <motion.div
                        key="simulator"
                        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-6xl z-10"
                    >
                        {simStep === 'CREATE' ? (
                            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 h-[600px]">

                                {/* LEFT PANEL - CONTROLS */}
                                <div className="col-span-4 bg-white/80 backdrop-blur-xl rounded-[32px] p-8 border border-white shadow-xl flex flex-col gap-8">
                                    <div>
                                        <h3 className="text-lg font-medium flex items-center gap-2 mb-1">
                                            <Thermometer size={18} className="text-[var(--gold)]" /> Temperature
                                        </h3>
                                        <p className="text-xs text-gray-400 mb-6">Controls randomness & creativity</p>

                                        <div className="relative h-12 flex items-center">
                                            <div className="absolute inset-x-0 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-blue-400 via-[var(--gold)] to-red-400"
                                                    style={{ width: `${temperature * 100}%` }}
                                                />
                                            </div>
                                            <input
                                                type="range" min="0" max="1" step="0.1"
                                                value={temperature}
                                                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            {/* Thumb */}
                                            <motion.div
                                                className="absolute w-6 h-6 bg-white border-2 border-gray-200 rounded-full shadow-md pointer-events-none"
                                                style={{ left: `calc(${temperature * 100}% - 12px)` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-300 mt-2">
                                            <span>Precise</span>
                                            <span>Creative</span>
                                            <span>Chaotic</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                                        <p className="text-xs font-bold uppercase tracking-widest text-gray-300">Select Persona</p>
                                        {[
                                            { id: 'professional', label: 'Professional' },
                                            { id: 'casual', label: 'Casual Tone' },
                                            { id: 'genz', label: 'Gen-Z Mode' },
                                            { id: 'legal', label: 'Strict Legal' },
                                        ].map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => setSelectedTone(item.id as any)}
                                                className={`w-full p-4 text-left rounded-2xl border transition-all duration-200 ${selectedTone === item.id
                                                    ? 'bg-[var(--foreground)] text-white border-[var(--foreground)] shadow-lg scale-[1.02]'
                                                    : 'bg-white border-transparent hover:bg-gray-50'}`}
                                            >
                                                <div className="font-medium text-sm">{item.label}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* RIGHT PANEL - OUTPUT */}
                                <div className="col-span-8 premium-glass rounded-[32px] p-10 border border-white/50 relative overflow-hidden flex flex-col shadow-2xl">
                                    <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white to-transparent opacity-80 z-10 pointer-events-none" />

                                    {selectedTone ? (
                                        <div className="relative z-0 h-full flex flex-col justify-center">
                                            <div className="flex items-center gap-3 mb-8 opacity-50">
                                                <div className="w-8 h-8 rounded-full bg-[var(--foreground)] flex items-center justify-center">
                                                    <Sparkles size={14} className="text-[var(--gold)]" />
                                                </div>
                                                <div className="text-xs font-mono uppercase tracking-widest">AI Generating...</div>
                                            </div>

                                            <div className={`text-3xl font-light leading-relaxed text-[var(--foreground)] ${temperature > 0.8 ? 'blur-[0.5px]' : ''}`}>
                                                <ScrambleText
                                                    key={`${selectedTone}-${temperature}`}
                                                    text={getDistortedText(AI_RESPONSES[selectedTone], temperature)}
                                                    speed={30}
                                                    scrambleSpeed={20}
                                                />
                                            </div>

                                            {temperature > 0.7 && (
                                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-4 bg-red-50 text-red-600 rounded-xl text-xs font-mono border border-red-100 flex items-center gap-3">
                                                    <Thermometer size={14} /> High Temperature Detected: Hallucination Risk
                                                </motion.div>
                                            )}

                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="mt-auto self-end">
                                                <button onClick={() => setSimStep('APPLY')} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--gold)] hover:text-[var(--foreground)] transition-colors">
                                                    Continue <ArrowRight size={14} />
                                                </button>
                                            </motion.div>
                                        </div>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center opacity-30">
                                            <BrainCircuit size={64} strokeWidth={1} />
                                            <p className="mt-4 font-light">Select a persona to begin</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            // APPLY STEP
                            <div className="w-full flex flex-col items-center justify-center h-[600px] text-center">
                                <h2 className="text-4xl font-light mb-12">How Context Shifts Reality</h2>

                                <div className="flex gap-6 mb-16">
                                    {[
                                        { id: 'hr', label: 'HR', icon: Briefcase },
                                        { id: 'lawyer', label: 'Legal', icon: Scale },
                                        { id: 'founder', label: 'Founder', icon: User },
                                        { id: 'student', label: 'Student', icon: GraduationCap },
                                    ].map((role) => (
                                        <button
                                            key={role.id}
                                            onClick={() => setSelectedRole(role.id as any)}
                                            className={`w-32 h-32 rounded-3xl border flex flex-col items-center justify-center gap-3 transition-all duration-300 ${selectedRole === role.id
                                                ? 'bg-[var(--gold)] text-white border-[var(--gold)] shadow-xl scale-110'
                                                : 'bg-white text-gray-400 border-gray-100 hover:border-[var(--gold)] hover:text-[var(--gold)]'}`}
                                        >
                                            <role.icon size={28} />
                                            <span className="text-xs font-bold uppercase tracking-widest">{role.label}</span>
                                        </button>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    {selectedRole && (
                                        <motion.div
                                            key={selectedRole}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="max-w-2xl bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
                                        >
                                            <div className="text-2xl font-serif italic text-[var(--foreground)]">
                                                "<ScrambleText text={ROLE_RESPONSES[selectedRole]} speed={25} scrambleSpeed={15} />"
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {selectedRole && (
                                    <motion.button
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        onClick={onComplete}
                                        className="mt-12 px-10 py-4 bg-[var(--foreground)] text-white rounded-full font-bold uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform"
                                    >
                                        Complete Module
                                    </motion.button>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    )
}
