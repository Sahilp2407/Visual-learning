'use client'

import { motion } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'

interface EntryTransitionProps {
    children: ReactNode
    onComplete?: () => void
}

export default function EntryTransition({ children, onComplete }: EntryTransitionProps) {
    const [showChrome, setShowChrome] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowChrome(true)
            if (onComplete) onComplete()
        }, 300)
        return () => clearTimeout(timer)
    }, [onComplete])

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[var(--background)]">
            {/* Background Noise & Gradient */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,162,77,0.05)_0%,transparent_70%)]" />
                <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}
                />
            </div>

            {/* Main Content Entry */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full h-full"
            >
                {children}
            </motion.div>

            {/* Chrome (borders, corners) appearing after delay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showChrome ? 1 : 0 }}
                transition={{ duration: 1 }}
                className="pointer-events-none fixed inset-0 z-20 border-[12px] border-transparent"
            >
                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[var(--foreground)] opacity-10" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[var(--foreground)] opacity-10" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[var(--foreground)] opacity-10" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[var(--foreground)] opacity-10" />
            </motion.div>
        </div>
    )
}
