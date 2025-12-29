'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface StatementMomentProps {
    onComplete: () => void
}

export default function StatementMoment({ onComplete }: StatementMomentProps) {
    const [step, setStep] = useState(0)

    useEffect(() => {
        // Sequence timing
        const timers = [
            setTimeout(() => setStep(1), 800),  // "AI does not think."
            setTimeout(() => setStep(2), 2000), // "It predicts."
            setTimeout(() => onComplete(), 4500) // Auto-advance
        ]
        return () => timers.forEach(clearTimeout)
    }, [onComplete])

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full text-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key="statement-container"
                    className="flex flex-col items-center gap-6"
                >
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-5xl md:text-7xl font-light text-[var(--foreground)] tracking-tight"
                        >
                            AI does not <span className="font-semibold">think</span>.
                        </motion.h1>
                    </div>

                    {step >= 2 && (
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-5xl md:text-7xl font-bold text-[var(--gold)] tracking-tight"
                            >
                                It predicts.
                            </motion.h1>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
