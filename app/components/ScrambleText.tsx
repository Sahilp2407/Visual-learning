'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface ScrambleTextProps {
    text: string
    className?: string
    speed?: number // ms per character fix
    scrambleSpeed?: number // ms per scramble update
    onComplete?: () => void
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+"

export default function ScrambleText({ text, className = "", speed = 40, scrambleSpeed = 30, onComplete }: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState("")
    const [isComplete, setIsComplete] = useState(false)
    const iteration = useRef(0)

    useEffect(() => {
        setDisplayText("")
        setIsComplete(false)
        iteration.current = 0

        let interval: NodeJS.Timeout

        const startScramble = () => {
            interval = setInterval(() => {
                let newText = ""

                // For each character in the target text
                for (let i = 0; i < text.length; i++) {
                    if (i < iteration.current) {
                        // If we passed this index, show the real character
                        newText += text[i]
                    } else {
                        // Otherwise show a random character
                        newText += CHARS[Math.floor(Math.random() * CHARS.length)]
                    }
                }

                setDisplayText(newText)

                // Increment iteration slowly to reveal text
                // Adjust this increment to control how fast the "wave" of fixating characters moves
                if (iteration.current < text.length) {
                    iteration.current += 1 / 3 // Slower reveal, more scrambling
                } else {
                    clearInterval(interval)
                    setIsComplete(true)
                    if (onComplete) onComplete()
                }
            }, scrambleSpeed)
        }

        startScramble()

        return () => clearInterval(interval)
    }, [text, speed, scrambleSpeed, onComplete])

    return (
        <span className={`${className} font-mono whitespace-pre-wrap block`}>
            {displayText}
        </span>
    )
}
