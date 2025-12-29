'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Smartphone, Zap, Wand2, Briefcase, User, GraduationCap, Scale, BookOpen, Eye, PlayCircle, Network, Thermometer, BrainCircuit, Sparkles, ChevronDown, Activity, RefreshCw, MessageSquare } from 'lucide-react'
import StreamingText from './StreamingText'
import ScrambleText from './ScrambleText'

// Layout Logic for Simulator Content Canvas
interface TopicCanvasProps {
    onComplete: () => void
    onStageChange?: (stage: 'READ' | 'VISUAL' | 'SIMULATOR') => void
}

export default function Topic1_WhatIsLLM({ onComplete, onStageChange }: TopicCanvasProps) {
    // 3 Major Stages: READ, VISUAL, SIMULATOR
    const [stage, setStage] = useState<'READ' | 'VISUAL' | 'SIMULATOR'>('READ')

    // Notify parent when stage changes
    useEffect(() => {
        onStageChange?.(stage)
    }, [stage, onStageChange])

    // Sub-steps for Visual and Simulator stages
    const [visualStep, setVisualStep] = useState<'DEMO' | 'EXPLAIN'>('DEMO')
    const [simStep, setSimStep] = useState<'CREATE' | 'APPLY'>('CREATE')
    const [showExplanation, setShowExplanation] = useState(false)
    const [showSimulatorIntro, setShowSimulatorIntro] = useState(true)


    // Logic for CREATE / APPLY phase
    const [selectedTone, setSelectedTone] = useState<'professional' | 'casual' | 'genz' | 'legal' | null>(null)
    const [selectedRole, setSelectedRole] = useState<'hr' | 'lawyer' | 'founder' | 'student' | null>(null)
    const [customPrompt, setCustomPrompt] = useState('')
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

    const AI_RESPONSES: Record<string, string> = {
        professional: "Dear Mr. Sharma, I am writing to kindly remind you of the pending invoice #402. Please verify at your earliest convenience.",
        casual: "Hey Sam! Just checking in on that invoice #402. Let me know when you can sort it out, no rush!",
        genz: "Yo invoice #402 is still ghosting us 💀 pls fix asap lol",
        legal: "Notice of Overdue Payment: Reference Invoice #402. Payment is required immediately pursuant to our service agreement."
    }

    const ROLE_RESPONSES: Record<string, string> = {
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

    // Helper to transform custom prompts based on tone
    const getTonePrefix = (tone: string | null) => {
        if (!tone || !customPrompt) return '';

        const prompt = customPrompt.trim();

        switch (tone) {
            case 'professional':
                return `Subject: Regarding your recent inquiry\n\nDear Sir/Madam,\n\nI am writing to ${prompt}. I would appreciate your prompt attention to this matter.\n\nThank you for your cooperation.\n\nBest regards`;

            case 'casual':
                return `Hey there!\n\n${prompt.charAt(0).toUpperCase() + prompt.slice(1)}. Let me know when you can!\n\nThanks!`;

            case 'genz':
                return `yo! ${prompt} pls? would really appreciate it ngl 🙏\n\nthanks bestie ✨`;

            case 'legal':
                return `TO WHOM IT MAY CONCERN:\n\nThis correspondence serves as formal notice regarding the following matter: ${prompt}.\n\nYour immediate attention to this matter is required pursuant to applicable regulations.\n\nRespectfully submitted`;

            default:
                return prompt;
        }
    }

    return (
        <div
            className="flex-1 h-full relative overflow-y-auto flex flex-col items-center justify-start p-12 bg-gradient-to-br from-[#fafafa] via-white to-[#f5f5f5] perspective-1000"
            onMouseMove={handleMouseMove}
        >

            {/* Enhanced Ambient Background */}
            <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-soft-light overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                        x: [-20, 20, -20]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-[800px] h-[800px] bg-[var(--gold)] rounded-full blur-[120px] top-[-200px] left-[-200px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.15, 0.3, 0.15],
                        y: [50, -50, 50]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute w-[600px] h-[600px] bg-blue-300 rounded-full blur-[100px] bottom-[-100px] right-[-100px]"
                />
            </div>

            {/* Subtle noise texture */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }} />


            <AnimatePresence mode="wait">

                {/* =========================================================================
                    STAGE 1: INTERACTIVE GAME (BE THE LLM)
                   ========================================================================= */}
                {stage === 'READ' && (
                    <motion.div
                        key="read"
                        style={{ rotateX, rotateY }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)", transition: { duration: 0.5 } }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                        className="max-w-5xl w-full z-10 px-6 flex flex-col items-center"
                    >
                        <PredictionGame onComplete={() => setStage('VISUAL')} />
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
                        className="w-full max-w-6xl flex flex-col items-center z-10"
                    >
                        <AnimatePresence mode="wait">
                            {visualStep === 'DEMO' ? (
                                <motion.div
                                    key="demo-view"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="w-full flex flex-col items-center"
                                >
                                    <div className="text-center mb-12 space-y-4">
                                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-[10px] uppercase font-bold tracking-widest text-[var(--gold)] mb-4">
                                            <Eye size={12} /> Live Visualization
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-3">
                                            See the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] to-amber-500">Thinking Process</span>
                                        </h2>
                                        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                                            The model analyzes the input, calculates millions of weights, and predicts the highest probability token.
                                        </p>
                                    </div>

                                    {/* MAIN VISUALIZATION ENGINE */}
                                    <div className="relative w-full max-w-5xl h-[500px] bg-white/40 backdrop-blur-xl rounded-[40px] flex items-center justify-between px-12 border border-white/60 shadow-2xl overflow-hidden">

                                        {/* Background Grid */}
                                        <div className="absolute inset-0 opacity-[0.03]"
                                            style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                                        />

                                        {/* STEP 1: INPUT */}
                                        <div className="flex flex-col gap-4 z-10 w-1/4">
                                            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Input Context</div>
                                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 relative">
                                                <div className="text-xl font-serif text-[var(--foreground)]">"How are"</div>
                                                {/* Connecting Line Start */}
                                                <div className="absolute top-1/2 -right-3 w-3 h-3 bg-[var(--gold)] rounded-full animate-pulse shadow-[0_0_10px_var(--gold)]" />
                                            </div>
                                        </div>

                                        {/* STEP 2: PROCESS (The Brain) */}
                                        <div className="relative z-10 flex-1 flex justify-center items-center">
                                            {/* Connection Line Left */}
                                            <svg className="absolute w-full h-full pointer-events-none top-0 left-0">
                                                <motion.path
                                                    d="M 120 250 H 300"
                                                    stroke="url(#flow-gradient)"
                                                    strokeWidth="3"
                                                    strokeDasharray="10 10"
                                                    initial={{ strokeDashoffset: 100 }}
                                                    animate={{ strokeDashoffset: 0 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                />
                                                <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#c9a24d" stopOpacity="0" />
                                                    <stop offset="50%" stopColor="#c9a24d" stopOpacity="1" />
                                                    <stop offset="100%" stopColor="#c9a24d" stopOpacity="0" />
                                                </linearGradient>
                                            </svg>

                                            <div className="relative w-48 h-48">
                                                {/* Spinning Outer Rings */}
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                                    className="absolute inset-0 rounded-full border border-[var(--gold)]/20 border-dashed"
                                                />
                                                <motion.div
                                                    animate={{ rotate: -360 }}
                                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                                    className="absolute inset-4 rounded-full border border-[var(--gold)]/30 border-dotted"
                                                />

                                                {/* Core Glowing Orb */}
                                                <div className="absolute inset-0 bg-[var(--gold)]/5 rounded-full blur-xl animate-pulse" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-24 h-24 bg-white rounded-full shadow-[0_0_50px_rgba(201,162,77,0.2)] flex items-center justify-center border border-[var(--gold)]/20 z-20">
                                                        <Network size={40} className="text-[var(--gold)]" strokeWidth={1.5} />
                                                    </div>
                                                </div>

                                                {/* Floating Particles */}
                                                {[...Array(6)].map((_, i) => (
                                                    <motion.div
                                                        key={`orb-${i}`}
                                                        className="absolute w-2 h-2 bg-[var(--gold)] rounded-full"
                                                        animate={{
                                                            x: [0, Math.cos(i) * 60, 0],
                                                            y: [0, Math.sin(i) * 60, 0],
                                                            opacity: [0, 1, 0]
                                                        }}
                                                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* STEP 3: OUTPUT PROBABILITIES */}
                                        <div className="flex flex-col gap-4 z-10 w-1/4">
                                            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Next Token Prediction</div>
                                            <div className="flex flex-col gap-3">
                                                {[
                                                    { word: "you", prob: 92, bg: "bg-[var(--gold)]", text: "text-white" },
                                                    { word: "things", prob: 4, bg: "bg-white", text: "text-gray-500" },
                                                    { word: "they", prob: 2, bg: "bg-white", text: "text-gray-400" },
                                                ].map((item, i) => (
                                                    <motion.div
                                                        key={item.word}
                                                        initial={{ x: -20, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: 1 + (i * 0.2) }}
                                                        className={`p-4 rounded-xl flex items-center justify-between shadow-sm border ${item.bg === 'bg-white' ? 'border-gray-100 hover:bg-gray-50' : 'border-[var(--gold)] shadow-md'} ${item.bg}`}
                                                    >
                                                        <span className={`font-bold ${item.text} text-lg`}>{item.word}</span>
                                                        <span className={`text-xs font-mono opacity-80 ${item.text}`}>{item.prob}%</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>

                                    <div className="mt-12 flex items-center gap-6">
                                        <button
                                            onClick={() => setShowExplanation(!showExplanation)}
                                            className="px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                                        >
                                            {showExplanation ? "Hide Details" : "How does it decide?"}
                                        </button>
                                        <motion.button
                                            onClick={() => setStage('SIMULATOR')}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-10 py-4 bg-[var(--foreground)] text-white rounded-full text-sm font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all flex items-center gap-3"
                                        >
                                            Run Simulator <ArrowRight size={16} />
                                        </motion.button>
                                    </div>

                                    {/* Explanation Content */}
                                    <AnimatePresence>
                                        {showExplanation && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="w-full max-w-3xl mt-8 overflow-hidden"
                                            >
                                                <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg text-left grid grid-cols-2 gap-8">
                                                    <div>
                                                        <h4 className="font-bold text-[var(--foreground)] mb-2">Training Data</h4>
                                                        <p className="text-sm text-gray-500 leading-relaxed">The model has seen "How are you" billions of times in books, websites, and chats.</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-[var(--foreground)] mb-2">Context Window</h4>
                                                        <p className="text-sm text-gray-500 leading-relaxed">It looks at the specific words before it ("How", "are") to narrow down the possibilities.</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ) : null}
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
                        className="w-full max-w-7xl z-10 space-y-8"
                    >
                        {/* Header for Simulator */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[var(--gold)]/20 to-amber-100/50 border-2 border-[var(--gold)]/30 text-[var(--gold)] text-xs uppercase tracking-[0.2em] font-bold shadow-lg">
                                <PlayCircle size={14} />
                                <span>Engine Control Deck</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/50 px-4 py-2 rounded-full border border-gray-100">
                                <Activity size={14} className="text-green-500 animate-pulse" />
                                <span className="text-xs font-mono text-gray-500">SYSTEM: ONLINE</span>
                            </div>
                        </div>

                        {simStep === 'CREATE' ? (
                            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 h-[650px]">

                                {/* LEFT: CONTROL PANEL */}
                                <div className="col-span-5 bg-white/90 backdrop-blur-xl rounded-[40px] p-10 border border-gray-200 shadow-xl flex flex-col gap-10">
                                    <div className="pb-6 border-b border-gray-100">
                                        <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Configuration</h3>
                                        <p className="text-sm text-gray-400">Adjust the model's behavior parameters.</p>
                                    </div>

                                    {/* Parameter: Temperature */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500">
                                                <Thermometer size={16} /> Temperature
                                            </label>
                                            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{temperature}</span>
                                        </div>
                                        <div className="relative h-12 flex items-center group">
                                            <div className="absolute inset-x-0 h-3 bg-gray-100 rounded-full overflow-hidden">
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
                                            <motion.div
                                                className="absolute w-8 h-8 bg-white border-4 border-gray-100 shadow-lg rounded-full pointer-events-none group-hover:scale-110 transition-transform"
                                                style={{ left: `calc(${temperature * 100}% - 16px)` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                            <span>Predictable (0.0)</span>
                                            <span className="text-[var(--gold)]">Balanced (0.5)</span>
                                            <span className="text-red-400">Chaotic (1.0)</span>
                                        </div>
                                    </div>

                                    {/* Parameter: Tone */}
                                    <div className="space-y-4 flex-1">
                                        <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500">
                                            <MessageSquare size={16} /> System Persona
                                        </label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {[
                                                { id: 'professional', label: 'Corporate Professional', desc: 'Formal, concise' },
                                                { id: 'casual', label: 'Casual Friendly', desc: 'Relaxed, emoji-friendly' },
                                                { id: 'genz', label: 'Gen-Z Mode', desc: 'Slang heavy, lowercase' },
                                                { id: 'legal', label: 'Legal Council', desc: 'Strict, verbose' },
                                            ].map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => setSelectedTone(item.id as any)}
                                                    className={`w-full p-4 text-left rounded-2xl border transition-all duration-200 flex items-center justify-between group
                                                    ${selectedTone === item.id
                                                            ? 'bg-[var(--foreground)] border-[var(--foreground)] shadow-lg'
                                                            : 'bg-white border-gray-100 hover:border-[var(--gold)] hover:shadow-md'
                                                        }`}
                                                >
                                                    <div>
                                                        <div className={`font-bold text-sm ${selectedTone === item.id ? 'text-white' : 'text-[var(--foreground)]'}`}>{item.label}</div>
                                                        <div className={`text-xs ${selectedTone === item.id ? 'text-gray-400' : 'text-gray-400 group-hover:text-[var(--gold)]'}`}>{item.desc}</div>
                                                    </div>
                                                    {selectedTone === item.id && <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT: OUTPUT SIMULATOR */}
                                <div className="col-span-7 bg-white rounded-[40px] border border-gray-200 overflow-hidden shadow-2xl flex flex-col relative">
                                    {/* Screen Glare */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent opacity-20 pointer-events-none z-20" />

                                    {/* Chat Header */}
                                    <div className="bg-gray-50 border-b border-gray-100 p-6 flex items-center justify-between z-10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[var(--foreground)] flex items-center justify-center">
                                                <Sparkles size={18} className="text-[var(--gold)]" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-[var(--foreground)]">AI Assistant</div>
                                                <div className="text-xs text-gray-400 flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => { setCustomPrompt(''); setSelectedTone(null); }}
                                            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                                        >
                                            <RefreshCw size={16} className="text-gray-400" />
                                        </button>
                                    </div>

                                    {/* Chat Area */}
                                    <div className="flex-1 bg-white p-8 overflow-y-auto z-10 flex flex-col gap-6">
                                        {/* User Input Mockup */}
                                        <div className="self-end max-w-[80%]">
                                            <textarea
                                                value={customPrompt}
                                                onChange={(e) => setCustomPrompt(e.target.value)}
                                                placeholder="Type a message here (e.g. 'Write a follow up email')..."
                                                className="w-full bg-blue-50 text-[var(--foreground)] p-4 rounded-2xl rounded-tr-sm border-0 focus:ring-2 focus:ring-[var(--gold)] resize-none text-sm leading-relaxed"
                                                rows={3}
                                            />
                                        </div>

                                        {/* AI Response Area */}
                                        <div className="self-start max-w-[90%] w-full">
                                            {selectedTone && customPrompt ? (
                                                <div className={`
                                                    bg-gray-50 p-6 rounded-2xl rounded-tl-sm border border-gray-100 relative
                                                    ${temperature > 0.8 ? 'animate-shake' : ''}
                                                `}>
                                                    {/* Glitch Effect for High Temp */}
                                                    {temperature > 0.8 && (
                                                        <div className="absolute -inset-1 bg-red-500/10 blur-xl animate-pulse z-0" />
                                                    )}

                                                    <div className="relative z-10 text-[var(--foreground)] leading-relaxed">
                                                        <ScrambleText
                                                            key={`${selectedTone}-${temperature}-${customPrompt}`}
                                                            text={getDistortedText(
                                                                customPrompt ? getTonePrefix(selectedTone) : "Waiting for input...",
                                                                temperature
                                                            )}
                                                            speed={30}
                                                            scrambleSpeed={20}
                                                            className="text-lg font-light"
                                                        />
                                                    </div>

                                                    {/* Warnings */}
                                                    {temperature > 0.7 && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                                            className="mt-4 pt-3 border-t border-red-100 text-red-500 text-xs font-mono flex items-center gap-2"
                                                        >
                                                            <Thermometer size={12} /> Warning: High Volatility Detected
                                                        </motion.div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center p-12 text-gray-300 gap-4 border-2 border-dashed border-gray-100 rounded-2xl">
                                                    <BrainCircuit size={40} className="opacity-20" />
                                                    <div className="text-sm font-medium">Select a Persona & Type a Prompt</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Bar */}
                                    <div className="p-6 bg-white border-t border-gray-100 z-10 flex justify-end">
                                        <button
                                            onClick={() => setSimStep('APPLY')}
                                            disabled={!selectedTone || !customPrompt}
                                            className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all
                                                    ${selectedTone && customPrompt
                                                    ? 'bg-[var(--gold)] text-white shadow-lg hover:shadow-xl hover:scale-105'
                                                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                                }
                                                `}
                                        >
                                            Continue to Next Level
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // APPLY STEP
                            <div className="w-full flex flex-col items-center justify-center min-h-[600px] text-center relative space-y-12">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="max-w-3xl"
                                >
                                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[var(--gold)]/20 to-amber-100/50 border-2 border-[var(--gold)]/30 text-[var(--gold)] text-xs uppercase tracking-[0.2em] font-bold shadow-lg mb-6">
                                        <Network size={14} />
                                        <span>Mastery Check</span>
                                    </div>

                                    <h2 className="text-5xl font-bold text-[var(--foreground)] mb-6">
                                        Context is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] to-amber-500">Everything</span>
                                    </h2>
                                    <p className="text-lg text-gray-600">Select a role to see how the same underlying model shifts its entire reality based on the system prompt.</p>
                                </motion.div>

                                <div className="grid grid-cols-4 gap-6 w-full max-w-5xl px-8">
                                    {[
                                        { id: 'hr', label: 'HR Dept', icon: Briefcase },
                                        { id: 'lawyer', label: 'Legal Team', icon: Scale },
                                        { id: 'founder', label: 'Founder', icon: User },
                                        { id: 'student', label: 'Student', icon: GraduationCap },
                                    ].map((role) => (
                                        <button
                                            key={role.id}
                                            onClick={() => setSelectedRole(role.id as any)}
                                            className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-4 transition-all duration-300
                                                ${selectedRole === role.id
                                                    ? 'border-[var(--gold)] bg-white shadow-xl scale-105'
                                                    : 'border-white bg-white/50 hover:border-gray-200 hover:bg-white'
                                                }
                                            `}
                                        >
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors
                                                ${selectedRole === role.id ? 'bg-[var(--gold)] text-white' : 'bg-gray-50 text-gray-400'}
                                            `}>
                                                <role.icon size={24} />
                                            </div>
                                            <span className={`text-xs font-bold uppercase tracking-widest ${selectedRole === role.id ? 'text-[var(--foreground)]' : 'text-gray-400'}`}>
                                                {role.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                <div className="w-full max-w-3xl min-h-[120px] bg-white rounded-2xl border border-gray-200 p-8 shadow-sm flex items-center justify-center">
                                    <AnimatePresence mode="wait">
                                        {selectedRole ? (
                                            <motion.div
                                                key={selectedRole}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="text-xl font-serif text-[var(--foreground)] italic"
                                            >
                                                "{ROLE_RESPONSES[selectedRole]}"
                                            </motion.div>
                                        ) : (
                                            <span className="text-gray-300 text-sm">Select a role to view response...</span>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {selectedRole && (
                                    <motion.button
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        onClick={onComplete}
                                        className="px-12 py-5 bg-[var(--foreground)] text-white rounded-full text-sm font-bold uppercase tracking-widest shadow-2xl hover:scale-105 transition-all"
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

// ==========================================
// NEW SUB-COMPONENT: PREDICTION GAME
// ==========================================
function PredictionGame({ onComplete }: { onComplete: () => void }) {
    const [round, setRound] = useState(0)
    const [score, setScore] = useState(0)
    const [finished, setFinished] = useState(false)
    const [selectedOption, setSelectedOption] = useState<number | null>(null)

    const ROUNDS = [
        {
            title: "Pattern Recognition",
            context: "2, 4, 6, 8,",
            options: [
                { text: "12", correct: false, reason: "Too high" },
                { text: "10", correct: true, reason: "Correct! (+2 pattern)" },
                { text: "Banana", correct: false, reason: "Complete nonsense" }
            ]
        },
        {
            title: "Sentence Completion",
            context: "The quick brown fox jumps over the",
            options: [
                { text: "Lazy Dog", correct: true, reason: "Most probable continuation" },
                { text: "Moon", correct: false, reason: "Grammatically correct, but unlikely" },
                { text: "Fence", correct: false, reason: "Possible, but less common phrase" }
            ]
        },
        {
            title: "Context Awareness",
            context: "The stock market crashed, causing investors to panic and",
            options: [
                { text: "Celebrate", correct: false, reason: "Contradicts 'panic'" },
                { text: "Sell", correct: true, reason: "Logical consequence" },
                { text: "Sleep", correct: false, reason: "Unlikely behavior" }
            ]
        }
    ]

    const handleSelect = (index: number) => {
        if (selectedOption !== null) return
        setSelectedOption(index)

        const isCorrect = ROUNDS[round].options[index].correct
        if (isCorrect) setScore(s => s + 1)

        setTimeout(() => {
            if (round < ROUNDS.length - 1) {
                setRound(r => r + 1)
                setSelectedOption(null)
            } else {
                setFinished(true)
            }
        }, 1500)
    }

    if (finished) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[3rem] p-12 shadow-2xl border border-[var(--gold)]/20 text-center max-w-2xl"
            >
                <div className="w-20 h-20 bg-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg text-white">
                    <Sparkles size={40} />
                </div>
                <h2 className="text-4xl font-bold mb-4">You act like an LLM!</h2>
                <p className="text-gray-500 mb-8 text-lg">
                    You predicted the most probable next token <b>{score}/{ROUNDS.length}</b> times.
                    <br />This is exactly how AI "thinks" — by predicting one word at a time based on probability.
                </p>
                <button
                    onClick={onComplete}
                    className="px-10 py-4 bg-[var(--foreground)] text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
                >
                    See How It Works <ArrowRight className="inline ml-2" size={16} />
                </button>
            </motion.div>
        )
    }

    const currentRound = ROUNDS[round]

    return (
        <div className="w-full max-w-4xl text-center">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 px-6 py-3 bg-white/50 backdrop-blur-md rounded-full border border-white/40 shadow-sm mx-auto w-fit gap-12">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                    Training Step {round + 1} / {ROUNDS.length}
                </div>
                <div className="flex gap-2">
                    {ROUNDS.map((_, i) => (
                        <div
                            key={i}
                            className={`
                                w-2 h-2 rounded-full transition-all duration-500 
                                ${i === round ? 'w-8 bg-[var(--gold)] shadow-[0_0_10px_rgba(201,162,77,0.4)]' : ''} 
                                ${i < round ? 'bg-[var(--gold)] opacity-50' : ''}
                                ${i > round ? 'bg-gray-200' : ''}
                            `}
                        />
                    ))}
                </div>
            </div>

            {/* Context Card - PREMIUM GLASS */}
            <motion.div
                key={round}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-12 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white mb-12 overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-[var(--gold)]/5 opacity-50" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-50" />

                <h3 className="relative text-[var(--gold)] font-bold uppercase tracking-[0.3em] text-xs mb-8 flex items-center justify-center gap-3">
                    <Sparkles size={14} /> Complete the Pattern
                </h3>

                <div className="relative text-4xl md:text-6xl font-light text-[var(--foreground)] leading-tight">
                    {currentRound.context.split(/([0-9]+)/).map((part, i) =>
                        /^[0-9]+$/.test(part) ? <span key={i} className="font-mono font-bold tracking-tighter">{part}</span> : part
                    )}
                    <span className="inline-flex items-center justify-center w-16 h-16 ml-4 rounded-xl bg-[var(--gold)]/10 border-2 border-[var(--gold)] text-[var(--gold)] animate-pulse">?</span>
                </div>
            </motion.div>

            {/* Options - INTERACTIVE DECK */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentRound.options.map((opt, i) => {
                    const isSelected = selectedOption === i
                    const isCorrect = opt.correct

                    let bgClass = "bg-white border-2 border-transparent hover:border-[var(--gold)]/30 hover:shadow-xl hover:-translate-y-1"
                    let textClass = "text-[var(--foreground)]"

                    if (selectedOption !== null) {
                        if (isSelected && isCorrect) {
                            bgClass = "bg-green-500 border-green-600 text-white shadow-[0_10px_30px_rgba(34,197,94,0.3)] scale-105"
                            textClass = "text-white"
                        }
                        else if (isSelected && !isCorrect) {
                            bgClass = "bg-red-500 border-red-600 text-white shadow-[0_10px_30px_rgba(239,68,68,0.3)] scale-105"
                            textClass = "text-white"
                        }
                        else if (!isSelected && isCorrect) {
                            bgClass = "bg-green-50 border-green-200 opacity-100" // Show correct answer nicely
                            textClass = "text-green-700"
                        }
                        else {
                            bgClass = "bg-gray-50 opacity-40 grayscale"
                            textClass = "text-gray-400"
                        }
                    }

                    return (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => handleSelect(i)}
                            disabled={selectedOption !== null}
                            className={`p-8 rounded-[1.5rem] shadow-lg flex flex-col items-center justify-center gap-3 transition-all duration-500 ${bgClass}`}
                        >
                            <span className={`text-2xl font-bold ${textClass}`}>{opt.text}</span>
                            {selectedOption !== null && (isSelected || (isCorrect && !isSelected)) && (
                                <span className={`text-xs font-bold uppercase tracking-wide ${isSelected ? 'text-white/80' : 'text-green-600'}`}>
                                    {opt.reason}
                                </span>
                            )}
                        </motion.button>
                    )
                })}
            </div>
        </div>
    )
}
