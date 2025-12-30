'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useEffect, useState, useRef } from 'react'

interface EntryTransitionProps {
    children: ReactNode
    onComplete?: () => void
}

export default function EntryTransition({ children, onComplete }: EntryTransitionProps) {
    const [phase, setPhase] = useState<'BOOT' | 'ZOOM' | 'FLASH' | 'REVEAL'>('BOOT')
    const [progress, setProgress] = useState(0)

    // BOOT SEQUENCE
    const hasStarted = useRef(false)
    const onCompleteRef = useRef(onComplete)

    // Update ref if prop changes, avoiding effect re-run
    useEffect(() => {
        onCompleteRef.current = onComplete
    }, [onComplete])

    useEffect(() => {
        if (hasStarted.current) return
        hasStarted.current = true

        // 1. Progress Bar build up (0-100%)
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer)
                    return 100
                }
                return prev + Math.random() * 5 // Random chunks
            })
        }, 30)

        // 2. Trigger Zoom phase
        const zoomTimer = setTimeout(() => {
            setPhase('ZOOM')
        }, 1800)

        // 3. Trigger Flash phase
        const flashTimer = setTimeout(() => {
            setPhase('FLASH')
        }, 2200)

        // 4. Reveal Content
        const revealTimer = setTimeout(() => {
            setPhase('REVEAL')
            if (onCompleteRef.current) onCompleteRef.current()
        }, 2500)

        return () => {
            clearInterval(timer)
            clearTimeout(zoomTimer)
            clearTimeout(flashTimer)
            clearTimeout(revealTimer)
        }
    }, []) // Empty dependency array ensures this runs ONCE only

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[var(--background)]">
            {/* 1. LOADING OVERLAY (Absolute Top) */}
            <AnimatePresence>
                {phase !== 'REVEAL' && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center pointer-events-none"
                        exit={{ opacity: 0 }}
                    >
                        {/* STARFIELD / WARP EFFECT */}
                        {phase === 'ZOOM' && (
                            <motion.div
                                initial={{ scale: 0.1, opacity: 0, rotate: 0 }}
                                animate={{ scale: [1, 30], opacity: [0, 1], rotate: 45 }}
                                transition={{ duration: 0.5, ease: "anticipate" }}
                                className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_10%)] z-0"
                            />
                        )}

                        {/* CONTENT CONTAINER WITH SHAKE */}
                        <motion.div
                            animate={phase === 'ZOOM' ? {
                                scale: [1, 0.9, 1.5],
                                opacity: 0,
                                filter: "blur(20px)",
                                x: [0, -10, 10, -10, 10, 0], // Shake x
                                y: [0, 5, -5, 5, -5, 0] // Shake y
                            } : {}}
                            transition={phase === 'ZOOM' ? { duration: 0.4 } : { duration: 0.3 }}
                            className="relative z-10 flex flex-col items-center gap-6"
                        >
                            {/* LOGO / ICON */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-16 h-16 border-2 border-[var(--gold)]/50 rounded-full flex items-center justify-center relative"
                            >
                                <div className="w-12 h-12 bg-[var(--gold)]/20 rounded-full animate-pulse" />
                                <div className="absolute inset-0 border-t-2 border-[var(--gold)] rounded-full animate-spin" style={{ animationDuration: '2s' }} />
                            </motion.div>

                            {/* TEXT SCRAMBLE / STATUS */}
                            <div className="text-center">
                                <h2 className="text-[var(--gold)] text-sm font-bold tracking-[0.3em] mb-2 uppercase">
                                    {progress < 100 ? 'System Initializing' : 'Access Granted'}
                                </h2>
                                <div className="font-mono text-[10px] text-gray-500">
                                    CORE.LOADER.V2 // {Math.min(100, Math.floor(progress))}%
                                </div>
                            </div>

                            {/* PROGRESS BAR */}
                            <div className="w-64 h-1 bg-gray-900 rounded-full overflow-hidden relative">
                                <motion.div
                                    style={{ width: `${progress}%` }}
                                    className="h-full bg-[var(--gold)] shadow-[0_0_10px_var(--gold)]"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. FLASH TRANSITION */}
            <AnimatePresence>
                {phase === 'FLASH' && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="fixed inset-0 z-50 bg-white pointer-events-none mix-blend-overlay"
                    />
                )}
            </AnimatePresence>

            {/* 3. MAIN CONTENT (Reveal) */}
            <motion.div
                initial={{ scale: 1.05, opacity: 0, filter: "brightness(0)" }}
                animate={phase === 'REVEAL' ? { scale: 1, opacity: 1, filter: "brightness(1)" } : {}}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative z-10 w-full h-full"
            >
                {children}
            </motion.div>
        </div>
    )
}
