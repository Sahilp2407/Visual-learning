'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface StreamingTextProps {
    text: string
    speed?: number
    className?: string
    onComplete?: () => void
}

export default function StreamingText({ text, speed = 30, className = "", onComplete }: StreamingTextProps) {
    const [displayedText, setDisplayedText] = useState("")
    const index = useRef(0)

    useEffect(() => {
        // Reset whenever text changes
        setDisplayedText("")
        index.current = 0
    }, [text])

    useEffect(() => {
        if (index.current < text.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText((prev) => prev + text.charAt(index.current))
                index.current += 1
            }, speed)
            return () => clearTimeout(timeoutId)
        } else if (onComplete) {
            onComplete()
        }
    }, [displayedText, text, speed, onComplete])

    return (
        <div className={className}>
            {displayedText}
            {/* Blinking cursor effect */}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[2px] h-[1em] bg-[var(--gold)] ml-1 align-middle"
            />
        </div>
    )
}
