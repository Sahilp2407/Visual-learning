'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Zap } from 'lucide-react'

interface SystemSimulatorProps {
    mode: 'watch' | 'interactive'
    onInteractionStart?: () => void
}

export default function SystemSimulator({ mode, onInteractionStart }: SystemSimulatorProps) {
    const [inputText, setInputText] = useState('')
    const [generatedTokens, setGeneratedTokens] = useState<string[]>([])
    const [activeTokenIndex, setActiveTokenIndex] = useState(-1)

    // Simulation Sequence
    const simulationPrompt = "Review the quarterly "
    const simulationCompletion = ["financial", "results", "and", "propose", "next", "steps."]

    // Interactive Simulation
    const [userPrompt, setUserPrompt] = useState('')

    // Reset sequence when switching to interactive
    useEffect(() => {
        if (mode === 'interactive') {
            setGeneratedTokens([])
            setActiveTokenIndex(-1)
        } else {
            // Reset for watch mode
            setGeneratedTokens([])
            setActiveTokenIndex(-1)
        }
    }, [mode])

    // Watch Mode Animation Loop
    useEffect(() => {
        if (mode === 'watch') {
            let currentToken = 0
            const interval = setInterval(() => {
                if (currentToken < simulationCompletion.length) {
                    setActiveTokenIndex(currentToken)
                    setGeneratedTokens(prev => [...prev, simulationCompletion[currentToken]])
                    currentToken++
                } else {
                    clearInterval(interval)
                }
            }, 800)
            return () => clearInterval(interval)
        }
    }, [mode])

    // Interactive Handler
    const handleUserType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserPrompt(e.target.value)
        if (onInteractionStart) onInteractionStart()

        // Mock simple prediction visualization
        // In a real app this would call an API
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 relative">

            {/* MAIN SYSTEM LAYOUT */}
            <div className="grid grid-cols-12 gap-8 w-full max-w-7xl h-[70vh]">

                {/* LEFT: INPUT / TOKENS */}
                <div className="col-span-3 flex flex-col justify-center">
                    <h3 className="text-xs uppercase tracking-widest text-[var(--foreground-muted)] mb-6">Input Sequence</h3>
                    <div className="bg-[var(--surface)] border border-[var(--border-light)] p-6 rounded-2xl shadow-sm min-h-[300px] flex flex-wrap content-start gap-2 transition-all duration-500">
                        {mode === 'interactive' ? (
                            <div className="w-full">
                                <input
                                    autoFocus
                                    type="text"
                                    value={userPrompt}
                                    onChange={handleUserType}
                                    placeholder="Type to predict..."
                                    className="w-full bg-transparent border-b-2 border-[var(--gold)] outline-none text-xl font-medium p-2 text-[var(--foreground)]"
                                />
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {userPrompt.split(' ').map((word, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="px-2 py-1 bg-gray-100 rounded text-sm text-[var(--foreground-muted)]"
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <>
                                <span className="text-lg text-[var(--foreground)]">{simulationPrompt}</span>
                                {/* Simulation Cursor */}
                                <motion.div
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="w-[2px] h-6 bg-[var(--gold)] inline-block align-middle ml-1"
                                />
                            </>
                        )}
                    </div>
                </div>

                {/* CENTER: ENGINE */}
                <div className="col-span-6 flex flex-col items-center justify-center relative">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {/* This matches the CSS in globals.css for .ai-core-container */}
                        <div className="ai-core-container">
                            <div className="ai-core">
                                {/* CSS Rings */}
                                <div className="core-ring core-ring-1"></div>
                                <div className="core-ring core-ring-2"></div>
                                <div className="core-ring core-ring-3"></div>

                                {/* Neural Nodes */}
                                <div className="neural-node" style={{ top: '20%', left: '30%' }}></div>
                                <div className="neural-node" style={{ top: '70%', left: '80%' }}></div>
                                <div className="neural-node" style={{ top: '40%', left: '90%' }}></div>

                                {/* Center Core */}
                                <div className="core-center flex items-center justify-center">
                                    <div className="text-center z-10 transition-opacity duration-300">
                                        <div className="text-[10px] uppercase font-bold tracking-widest text-white/80">Next Token</div>
                                        <div className="text-2xl font-bold text-white mt-1">
                                            {mode === 'watch' && activeTokenIndex >= 0
                                                ? simulationCompletion[activeTokenIndex]
                                                : mode === 'interactive' && userPrompt.length > 0
                                                    ? "..."
                                                    : "?"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Labels */}
                    <div className="absolute bottom-10 flex flex-col items-center">
                        <h2 className="text-sm font-medium text-[var(--gold)] uppercase tracking-widest mb-1">Probability Engine</h2>
                        <p className="text-xs text-[var(--foreground-muted)]">Calculating Top-K Distribution</p>
                    </div>
                </div>

                {/* RIGHT: OUTPUT */}
                <div className="col-span-3 flex flex-col justify-center">
                    <h3 className="text-xs uppercase tracking-widest text-[var(--foreground-muted)] mb-6 text-right">Prediction output</h3>

                    <div className="bg-[var(--surface)] border border-[var(--border-light)] p-6 rounded-2xl shadow-sm min-h-[300px] flex flex-col relative overflow-hidden">
                        <AnimatePresence mode="popLayout">
                            {generatedTokens.map((token, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="inline-block mb-2"
                                >
                                    <span className={`text-lg transition-colors duration-500 ${i === activeTokenIndex ? 'text-[var(--gold)] font-bold' : 'text-[var(--foreground)]'}`}>
                                        {token}
                                    </span>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {mode === 'interactive' && (
                            <div className="absolute inset-0 flex items-center justify-center text-[var(--foreground-muted)] opacity-20 pointer-events-none">
                                <Zap size={48} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
