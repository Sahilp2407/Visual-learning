'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <motion.div
                className="flex items-center gap-1 p-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-full border border-gray-200 dark:border-zinc-700 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <button
                    onClick={() => setTheme('light')}
                    className={`relative p-2 rounded-full transition-all duration-300 ${theme === 'light' ? 'text-amber-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                >
                    {theme === 'light' && (
                        <motion.div
                            layoutId="activeTheme"
                            className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-full shadow-sm border border-gray-100 dark:border-zinc-700"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10"><Sun size={18} /></span>
                </button>
                <button
                    onClick={() => setTheme('dark')}
                    className={`relative p-2 rounded-full transition-all duration-300 ${theme === 'dark' ? 'text-indigo-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                >
                    {theme === 'dark' && (
                        <motion.div
                            layoutId="activeTheme"
                            className="absolute inset-0 bg-zinc-800 rounded-full shadow-sm border border-zinc-700"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10"><Moon size={18} /></span>
                </button>
            </motion.div>
        </div>
    )
}
