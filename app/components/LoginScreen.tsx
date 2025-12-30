'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, UserCircle2 } from 'lucide-react'

interface LoginScreenProps {
    onLogin: (username: string) => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (name.trim().length < 2) {
            setError(true)
            return
        }
        onLogin(name.trim())
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#fafafa]">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-[var(--gold)]/20 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity, delay: 2 }}
                    className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[100px]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative bg-white/80 backdrop-blur-xl p-12 rounded-[2.5rem] shadow-2xl border border-white max-w-md w-full"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[var(--foreground)] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl text-[var(--gold)]">
                        <Sparkles size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Welcome Back</h1>
                    <p className="text-gray-500">Enter your name to continue your learning journey.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <UserCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--gold)] transition-colors" size={20} />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                setError(false)
                            }}
                            placeholder="Your Name"
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-[var(--gold)] focus:outline-none focus:shadow-lg transition-all text-[var(--foreground)] font-medium placeholder:text-gray-400"
                        />
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                            className="text-red-500 text-xs font-bold text-center"
                        >
                            Please enter a valid name (2+ characters)
                        </motion.div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-4 bg-[var(--foreground)] text-white dark:text-black rounded-xl font-bold uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 group"
                    >
                        Start Learning <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </form>

                <div className="mt-8 text-center text-[10px] text-gray-400 uppercase tracking-widest">
                    AI Copilot Mastery • v2.0
                </div>
            </motion.div>
        </div>
    )
}
