'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, BookOpen, Eye, PlayCircle, Database, FileText, Globe, Code, Scale, MessageCircle, Github, Sparkles, Binary, Quote, FileJson, Sliders, Cpu, ScanLine, Search, Shuffle } from 'lucide-react'
import ScrambleText from './ScrambleText'

// Layout Logic for Simulator Content Canvas
interface TopicCanvasProps {
    onComplete: () => void
}

export default function Topic2_TrainingData({ onComplete }: TopicCanvasProps) {
    const [stage, setStage] = useState<'READ' | 'VISUAL' | 'SIMULATOR'>('READ')

    // MOUSE PARALLAX
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const handleMouseMove = ({ clientX, clientY }: React.MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        mouseX.set(clientX / innerWidth - 0.5);
        mouseY.set(clientY / innerHeight - 0.5);
    }
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { damping: 20, stiffness: 100 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { damping: 20, stiffness: 100 });


    // ==========================================
    // VISUAL STAGE: PATTERN MATCHER
    // ==========================================
    const [patternType, setPatternType] = useState<'ENGLISH' | 'CODE' | 'MATH' | null>(null)
    const [isScanning, setIsScanning] = useState(false)

    const PATTERNS: Record<string, { input: string, prediction: string, source: string, confidence: number }> = {
        ENGLISH: {
            input: "The quick brown fox jumps over the",
            prediction: "lazy dog",
            source: "Common English Idioms",
            confidence: 99
        },
        CODE: {
            input: "public static void",
            prediction: "main(String[] args)",
            source: "Java Documentation",
            confidence: 98
        },
        MATH: {
            input: "if a = b and b = c, then a =",
            prediction: "c",
            source: "Logic Textbooks",
            confidence: 100
        }
    }

    const startScan = (type: 'ENGLISH' | 'CODE' | 'MATH') => {
        setPatternType(null)
        setIsScanning(true)
        setTimeout(() => {
            setIsScanning(false)
            setPatternType(type)
        }, 1500)
    }


    // ==========================================
    // SIMULATOR STAGE: DATA MIXER
    // ==========================================
    const [sliders, setSliders] = useState({
        shakespeare: 0,
        tech: 50,
        slang: 0
    })
    const [generatedResponse, setGeneratedResponse] = useState("")

    const generateResponse = () => {
        // Simple heuristic for demo
        if (sliders.shakespeare > 70) return "To debug, or not to debug, that is the question. Whether 'tis nobler in the system to suffer the slings and arrows of runtime errors..."
        if (sliders.slang > 70) return "yo this code is absolutely COOKED fam 💀 no cap stack overflow cant save u now"
        if (sliders.tech > 80 && sliders.shakespeare < 30) return "RuntimeError: The process encountered an unrecoverable exception at memory address 0x84F2. Check logs."

        // Mixed
        if (sliders.shakespeare > 40 && sliders.tech > 40) return "Hark! The compiler doth protest too much. Methinks line 42 hath a null pointer exception."
        if (sliders.slang > 40 && sliders.tech > 40) return "bruh the server is down again lol. sudo fix-it pls."
        if (sliders.shakespeare > 40 && sliders.slang > 40) return "Verily fam, this vibe is trite. Wherefore art thou, rizz?"

        return "System ready. Adjust parameters to synthesize output."
    }

    // Auto-update response when sliders change slightly
    useEffect(() => {
        const timer = setTimeout(() => {
            setGeneratedResponse(generateResponse())
        }, 300)
        return () => clearTimeout(timer)
    }, [sliders])


    return (
        <div
            className="flex-1 h-full relative overflow-y-auto flex flex-col items-center justify-start p-6 md:p-12 bg-[var(--background)] perspective-1000 transition-colors duration-500"
            onMouseMove={handleMouseMove}
        >
            {/* Background Grid & Ambience */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
                style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px', color: 'var(--foreground)' }}
            />
            <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--gold)] rounded-full blur-[150px] opacity-10 pointer-events-none"
            />

            {/* HEADER - STAGE INDICATOR */}
            <div className="relative z-50 mb-12 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md px-6 py-3 rounded-full border border-gray-200 dark:border-zinc-700 shadow-sm flex items-center gap-6 transition-colors">
                {[
                    { id: 'READ', icon: BookOpen, label: 'Data DNA' },
                    { id: 'VISUAL', icon: Eye, label: 'Pattern Scan' },
                    { id: 'SIMULATOR', icon: Sliders, label: 'Training Lab' }
                ].map((s, i) => (
                    <button
                        key={s.id}
                        onClick={() => setStage(s.id as any)}
                        className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${stage === s.id ? 'text-[var(--gold)]' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}
                    >
                        <s.icon size={14} /> {s.label}
                    </button>
                ))}
            </div>


            <AnimatePresence mode="wait">

                {/* =========================================================================================
                    STAGE 1: READ MODE (The "Matrix" Stream)
                   ========================================================================================= */}
                {stage === 'READ' && (
                    <motion.div
                        key="read"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                        className="w-full max-w-5xl flex flex-col items-center"
                    >
                        {/* INSTRUCTIONAL HEADER */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-12 max-w-3xl"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-6">
                                <Search size={12} /> Concept 2.1: The Mirror Effect
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-[var(--foreground)] mb-6 tracking-tight leading-tight">
                                AI is just a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] to-amber-600">Mirror</span>.
                            </h1>
                            <p className="text-xl text-gray-500 leading-relaxed">
                                <span className="font-bold text-gray-800">Here is the truth:</span> An LLM doesn't have a personality, opinions, or knowledge. It simply reflects the data it was fed. If you feed it math, it speaks math. If you feed it Reddit, it speaks internet slang.
                            </p>
                            <div className="mt-8 p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-100 dark:border-zinc-700 inline-block">
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">👇 Your Goal</p>
                                <p className="text-[var(--foreground)] font-medium">Observe how massive datasets flow into the "brain" to create its knowledge base.</p>
                            </div>
                        </motion.div>

                        {/* Interactive Data Pipeline Visual */}
                        <div className="relative w-full h-[500px] bg-[#0a0a0a] rounded-[40px] overflow-hidden shadow-2xl border border-gray-800 flex items-center justify-center group">

                            {/* Central Brain */}
                            <div className="relative z-20">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--gold)] to-amber-700 blur-md animate-pulse absolute inset-0 opacity-50" />
                                <div className="w-32 h-32 rounded-full border border-[var(--gold)]/50 bg-black flex items-center justify-center relative z-20 shadow-[0_0_50px_rgba(201,162,77,0.3)]">
                                    <Database size={40} className="text-[var(--gold)]" />
                                </div>
                                <div className="absolute -inset-10 border border-[var(--gold)]/20 rounded-full animate-[spin_10s_linear_infinite]" />
                                <div className="absolute -inset-16 border border-[var(--gold)]/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                            </div>

                            {/* Floating Data Particles */}
                            {[
                                { icon: Globe, label: "Wikipedia", color: "text-blue-400", x: "-30%", y: "-20%", delay: 0 },
                                { icon: Github, label: "GitHub Code", color: "text-purple-400", x: "30%", y: "-20%", delay: 1 },
                                { icon: MessageCircle, label: "Reddit Threads", color: "text-orange-400", x: "-30%", y: "20%", delay: 2 },
                                { icon: Scale, label: "Court Records", color: "text-red-400", x: "30%", y: "20%", delay: 3 },
                                { icon: FileText, label: "Books (1900-2023)", color: "text-green-400", x: "0%", y: "-35%", delay: 4 },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        x: item.x,
                                        y: item.y
                                    }}
                                    transition={{ delay: item.delay * 0.2 }}
                                    className="absolute z-10 flex flex-col items-center gap-2 cursor-pointer hover:scale-110 transition-transform"
                                    style={{ left: '50%', top: '50%', marginLeft: '-40px', marginTop: '-40px' }}
                                >
                                    {/* Connection Line */}
                                    <svg className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none -z-10 overflow-visible">
                                        <motion.line
                                            x1="0" y1="0" x2={item.x.includes('-') ? '100' : '-100'} y2={item.y.includes('-') ? '100' : '-100'}
                                            stroke="rgba(255,255,255,0.1)" strokeWidth="1"
                                        />
                                        <motion.circle
                                            cx="0" cy="0" r="2" fill="white"
                                            animate={{
                                                cx: [0, item.x.includes('-') ? 100 : -100],
                                                cy: [0, item.y.includes('-') ? 100 : -100],
                                                opacity: [0, 1, 0]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                                        />
                                    </svg>

                                    <div className={`w-16 h-16 rounded-2xl bg-gray-900 border border-gray-700 flex items-center justify-center shadow-lg ${item.color}`}>
                                        <item.icon size={28} />
                                    </div>
                                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider bg-black/50 px-2 py-1 rounded-full border border-gray-800">
                                        {item.label}
                                    </span>
                                </motion.div>
                            ))}

                            {/* Overlay Text */}
                            <div className="absolute bottom-8 left-0 right-0 text-center">
                                <p className="text-gray-500 text-xs font-mono animate-pulse">
                                    INGESTING 45 TB OF TEXT DATA...
                                </p>
                            </div>
                        </div>

                        <motion.button
                            onClick={() => setStage('VISUAL')}
                            className="group relative mt-12 px-8 py-4 bg-[var(--foreground)] rounded-full shadow-2xl hover:scale-105 transition-transform"
                        >
                            <div className="absolute inset-0 rounded-full border border-white/10" />
                            <div className="flex items-center gap-4 relative z-10">
                                <span className="text-white dark:text-black font-bold uppercase tracking-widest text-sm pl-2">Next: See The Patterns</span>
                                <div className="w-8 h-8 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center group-hover:bg-white/30 dark:group-hover:bg-black/20 transition-colors">
                                    <ArrowRight size={14} className="text-white dark:text-black" />
                                </div>
                            </div>
                        </motion.button>
                    </motion.div>
                )}


                {/* =========================================================================================
                    STAGE 2: VISUAL MODE (Pattern Recognition)
                   ========================================================================================= */}
                {stage === 'VISUAL' && (
                    <motion.div
                        key="visual"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                        className="w-full max-w-6xl flex flex-col items-center"
                    >
                        {/* INSTRUCTIONAL HEADER */}
                        <div className="text-center mb-10 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-50 border border-purple-100 text-[10px] font-bold uppercase tracking-widest text-purple-500 mb-6">
                                <Eye size={12} /> Concept 2.2: Pattern Recognition
                            </div>
                            <h2 className="text-4xl text-[var(--foreground)] font-bold mb-4">It's Not Thinking. It's Matching.</h2>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                The model doesn't "know" English or Java. It strictly follows <span className="font-bold text-gray-800">statistical probabilities</span>. It predicts the ending of a pattern based on billions of examples it has seen before.
                            </p>
                            <div className="p-4 bg-purple-50/50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-800 inline-block animate-bounce-subtle">
                                <p className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-1">👇 Try It Yourself</p>
                                <p className="text-[var(--foreground)] text-sm">Click a data type to see how the model "auto-completes" the pattern.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full h-[500px]">

                            {/* LEFT SIDE: SCANNER INPUTS */}
                            <div className="col-span-1 flex flex-col gap-4 justify-center">
                                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 pl-2">Select a Data Source</div>
                                {[
                                    { id: 'ENGLISH', label: "English Text", icon: Quote, color: "text-blue-500", bg: "bg-blue-50", desc: "Common idioms & sentences" },
                                    { id: 'CODE', label: "Source Code", icon: Code, color: "text-purple-500", bg: "bg-purple-50", desc: "Syntax & Logic structures" },
                                    { id: 'MATH', label: "Logic / Math", icon: Binary, color: "text-orange-500", bg: "bg-orange-50", desc: "Equations & Proofs" },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => startScan(item.id as any)}
                                        className={`p-6 rounded-2xl border text-left flex items-center gap-4 transition-all group
                                            ${patternType === item.id
                                                ? 'bg-white dark:bg-zinc-800 border-[var(--gold)] shadow-lg scale-105 ring-2 ring-[var(--gold)]/20'
                                                : 'bg-white dark:bg-zinc-800/50 border-gray-100 dark:border-zinc-700 hover:border-gray-200 dark:hover:border-zinc-600 hover:bg-gray-50 dark:hover:bg-zinc-700'
                                            } transition-colors`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg === 'bg-blue-50' ? 'bg-blue-50 dark:bg-blue-900/30' : item.bg === 'bg-purple-50' ? 'bg-purple-50 dark:bg-purple-900/30' : 'bg-orange-50 dark:bg-orange-900/30'} ${item.color}`}>
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-[var(--foreground)] text-lg">{item.label}</div>
                                            <div className="text-xs text-gray-400 group-hover:text-[var(--gold)] transition-colors mt-1">{item.desc}</div>
                                        </div>
                                        {patternType === item.id && <div className="ml-auto w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />}
                                    </button>
                                ))}
                            </div>

                            {/* RIGHT SIDE: THE SCANNER VISUAL */}
                            <div className="col-span-2 bg-[#1a1a1a] rounded-[32px] p-8 relative overflow-hidden flex flex-col items-center justify-center border border-gray-800 shadow-2xl">

                                {/* Background Grid */}
                                <div className="absolute inset-0 opacity-[0.2]"
                                    style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                                />

                                {isScanning ? (
                                    <div className="text-center space-y-6">
                                        <div className="relative w-24 h-24 mx-auto">
                                            <motion.div
                                                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="absolute inset-0 rounded-full border-4 border-t-[var(--gold)] border-r-[var(--gold)] border-b-transparent border-l-transparent"
                                            />
                                            <ScanLine size={40} className="absolute inset-0 m-auto text-[var(--gold)] animate-pulse" />
                                        </div>
                                        <div className="font-mono text-[var(--gold)] text-sm animate-pulse tracking-widest">
                                            SEARCHING KNOWLEDGE BASE...
                                        </div>
                                    </div>
                                ) : patternType && PATTERNS[patternType] ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="w-full max-w-lg bg-gray-900 rounded-2xl border border-gray-700 p-8 relative"
                                    >
                                        {/* Glowing Scanner Line */}
                                        <motion.div
                                            initial={{ top: 0, opacity: 0 }}
                                            animate={{ top: "100%", opacity: [0, 1, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute left-0 right-0 h-[2px] bg-[var(--gold)] shadow-[0_0_20px_var(--gold)] z-10"
                                        />

                                        <div className="space-y-6">
                                            {/* VISUAL BREAKDOWN */}
                                            <div>
                                                <div className="text-xs font-mono text-gray-500 mb-2">INPUT PATTERN</div>
                                                <div className="text-xl text-white font-mono bg-black/30 p-4 rounded-lg border border-gray-800">
                                                    {PATTERNS[patternType].input}
                                                </div>
                                            </div>

                                            <div className="flex justify-center flex-col items-center gap-2">
                                                <ArrowRight className="text-gray-600 rotate-90 md:rotate-0" />
                                                <span className="text-[10px] font-mono text-gray-500 uppercase">Calculating next likely token...</span>
                                            </div>

                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <div className="text-xs font-mono text-[var(--gold)]">PREDICTED COMPLETION</div>
                                                    <div className="text-xs font-mono text-green-400">{PATTERNS[patternType].confidence}% PROBABILITY</div>
                                                </div>
                                                <div className="text-2xl text-[var(--gold)] font-bold font-mono bg-[var(--gold)]/10 p-4 rounded-lg border border-[var(--gold)]/20 shadow-[0_0_30px_rgba(201,162,77,0.1)]">
                                                    {PATTERNS[patternType].prediction}
                                                </div>
                                            </div>

                                            {/* NEW: EDUCATIONAL INSIGHT BOX */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                                className="mt-6 p-4 bg-[#252525] rounded-xl border border-gray-700 text-sm leading-relaxed"
                                            >
                                                <div className="flex items-center gap-2 text-white font-bold mb-2">
                                                    <Sparkles size={14} className="text-yellow-400" />
                                                    Why did it happen?
                                                </div>
                                                <p className="text-gray-300">
                                                    {patternType === 'ENGLISH' && "It's just auto-complete. The model has seen 'The quick brown fox' billions of times in its training data, so the probability of 'lazy dog' coming next is nearly 100%."}
                                                    {patternType === 'CODE' && "Code follows strict rules. The model doesn't know how to code, but it knows that in Java, the word 'public static' is statistically almost always followed by 'void main'."}
                                                    {patternType === 'MATH' && "It recognized a logical bridge. If A=B and B=C, the massive pattern of logic textbooks suggests the only valid completion is A being equal to C."}
                                                </p>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="text-gray-600 font-mono text-sm flex items-center gap-3">
                                        <ArrowRight className="animate-bounce" />
                                        Select a pattern type to begin scan
                                    </div>
                                )}

                            </div>
                        </div>

                        {patternType && (
                            <motion.button
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                onClick={() => setStage('SIMULATOR')}
                                className="group relative mt-12 px-8 py-4 bg-[var(--foreground)] rounded-full shadow-2xl hover:scale-105 transition-transform"
                            >
                                <div className="absolute inset-0 rounded-full border border-white/10" />
                                <div className="flex items-center gap-4 relative z-10">
                                    <span className="text-white dark:text-black font-bold uppercase tracking-widest text-sm pl-2">Next: Control The Mix</span>
                                    <div className="w-8 h-8 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center group-hover:bg-white/30 dark:group-hover:bg-black/20 transition-colors">
                                        <ArrowRight size={14} className="text-white dark:text-black" />
                                    </div>
                                </div>
                            </motion.button>
                        )}
                    </motion.div>
                )}


                {/* =========================================================================================
                    STAGE 3: SIMULATOR MODE (The Mixing Control Deck)
                   ========================================================================================= */}
                {stage === 'SIMULATOR' && (
                    <motion.div
                        key="simulator"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-6xl"
                    >
                        {/* INSTRUCTIONAL HEADER */}
                        <div className="text-center mb-10 max-w-3xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-50 border border-orange-100 text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-6">
                                <Sliders size={12} /> Concept 2.3: Fine-Tuning
                            </div>
                            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-2">Control The "Training Diet"</h2>
                            <p className="text-gray-500 mb-6">
                                If you feed an AI mostly Shakespeare, it speaks like a poet. If you feed it Reddit, it speaks like a teenager. <br /> <strong className="text-gray-800">You are what you eat.</strong>
                            </p>
                            <div className="p-4 bg-orange-50/50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-800 inline-block">
                                <p className="text-sm font-bold text-orange-400 uppercase tracking-widest mb-1">👇 Your Mission</p>
                                <p className="text-[var(--foreground)] text-sm">Mix the datasets to unlock the hidden <span className="font-bold">"Gen-Z Poet"</span> personality.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[600px]">

                            {/* CONTROLS (Left 4 cols) */}
                            <div className="col-span-12 lg:col-span-5 bg-white dark:bg-zinc-900 rounded-[32px] border border-gray-200 dark:border-zinc-700 shadow-xl p-8 flex flex-col justify-between transition-colors">
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3 text-[var(--foreground)] font-bold uppercase tracking-widest text-sm border-b border-gray-100 dark:border-zinc-800 pb-4">
                                        <Database size={18} /> Training Data Mixer
                                    </div>

                                    {/* SLIDER 1 (Shakespeare) */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm font-medium">
                                            <span className="flex items-center gap-2 text-purple-700 bg-purple-50 px-2 py-1 rounded-md"><BookOpen size={14} /> Literature (1600s)</span>
                                            <span className="text-gray-400 font-mono">{sliders.shakespeare}%</span>
                                        </div>
                                        <input
                                            type="range" min="0" max="100" value={sliders.shakespeare}
                                            onChange={(e) => setSliders({ ...sliders, shakespeare: parseInt(e.target.value) })}
                                            className="w-full h-2 bg-gray-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                        />
                                        <div className="text-[10px] text-gray-400 font-mono pl-1">
                                            Adds: "Thou", "Verily", "Doth", "Hark"
                                        </div>
                                    </div>

                                    {/* SLIDER 2 (Tech) */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm font-medium">
                                            <span className="flex items-center gap-2 text-blue-700 bg-blue-50 px-2 py-1 rounded-md"><Cpu size={14} /> Technical Docs</span>
                                            <span className="text-gray-400 font-mono">{sliders.tech}%</span>
                                        </div>
                                        <input
                                            type="range" min="0" max="100" value={sliders.tech}
                                            onChange={(e) => setSliders({ ...sliders, tech: parseInt(e.target.value) })}
                                            className="w-full h-2 bg-gray-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        />
                                        <div className="text-[10px] text-gray-400 font-mono pl-1">
                                            Adds: "Function", "Runtime", "Error", "Null"
                                        </div>
                                    </div>

                                    {/* SLIDER 3 (Slang) */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm font-medium">
                                            <span className="flex items-center gap-2 text-pink-700 bg-pink-50 px-2 py-1 rounded-md"><MessageCircle size={14} /> Social Media</span>
                                            <span className="text-gray-400 font-mono">{sliders.slang}%</span>
                                        </div>
                                        <input
                                            type="range" min="0" max="100" value={sliders.slang}
                                            onChange={(e) => setSliders({ ...sliders, slang: parseInt(e.target.value) })}
                                            className="w-full h-2 bg-gray-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-pink-600"
                                        />
                                        <div className="text-[10px] text-gray-400 font-mono pl-1">
                                            Adds: "No cap", "Bruh", "Cooked", "Bet"
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* OUTPUT (Right 8 cols) */}
                            <div className="col-span-12 lg:col-span-7 bg-[#111] rounded-[32px] border border-gray-800 shadow-2xl p-10 relative overflow-hidden flex flex-col">
                                {/* Decor */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />

                                <div className="flex justify-between items-start mb-8 border-b border-gray-800 pb-6 z-10">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-gray-400 text-xs font-mono uppercase tracking-widest">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            Active Personality
                                        </div>
                                        <div className="text-xl font-bold text-white transition-all duration-300">
                                            {sliders.shakespeare > 60 && sliders.slang > 60 ? "🎭 The Gen-Z Poet" :
                                                sliders.shakespeare > 70 ? "📜 The Old Bard" :
                                                    sliders.slang > 70 ? "📱 The TikToker" :
                                                        sliders.tech > 70 ? "🤖 The System Admin" :
                                                            "😐 Default Assistant"}
                                        </div>
                                    </div>
                                    <div className="text-xs font-mono text-gray-500 text-right">
                                        Model: LLAMA-3-MIX<br />
                                        Temp: 0.7
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col justify-center items-start z-10">
                                    <div className="bg-gray-800/50 px-4 py-2 rounded-lg text-gray-400 font-mono text-xs mb-6 border-l-2 border-gray-600">
                                        USER_INPUT: "Give me a system status update."
                                    </div>

                                    <div className="w-full min-h-[120px]">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={generatedResponse}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, position: 'absolute' }}
                                                className="text-xl md:text-2xl text-white font-light leading-relaxed font-mono"
                                            >
                                                <span className="text-[var(--gold)] mr-3">{">"}</span>
                                                {generatedResponse}
                                                <span className="inline-block w-2 h-5 bg-[var(--gold)] ml-1 animate-pulse align-middle" />
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <div className="mt-auto border-t border-gray-800 pt-6 flex justify-end items-center z-10">
                                    <button
                                        onClick={onComplete}
                                        className="group relative px-6 py-3 bg-white dark:bg-zinc-100 hover:bg-gray-50 dark:hover:bg-zinc-200 rounded-full shadow-lg transition-all"
                                    >
                                        <div className="flex items-center gap-3 relative z-10">
                                            <span className="text-black font-bold uppercase tracking-widest text-xs pl-1">Complete Topic</span>
                                            <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center">
                                                <ArrowRight size={12} className="text-black" />
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    )
}
