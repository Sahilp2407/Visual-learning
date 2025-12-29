'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Section = 'intro' | 'visual' | 'interaction' | 'explanation'

export default function Module11Content() {
  const [currentSection, setCurrentSection] = useState<Section>('intro')
  const [showSecondLine, setShowSecondLine] = useState(false)
  const [tokens, setTokens] = useState<string[]>([])
  const [showOutput, setShowOutput] = useState(false)
  const [userInput, setUserInput] = useState('Write a professional email for payment delay')
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // SECTION 1: Auto-play intro
  useEffect(() => {
    // Show second line after delay
    const timer1 = setTimeout(() => {
      setShowSecondLine(true)
    }, 800)

    // Transition to visual section
    const timer2 = setTimeout(() => {
      setCurrentSection('visual')
    }, 3000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  // SECTION 2: Auto-play visual explanation
  useEffect(() => {
    if (currentSection === 'visual') {
      // Start typing tokens
      const words = userInput.split(' ')
      const newTokens: string[] = []

      words.forEach((word, i) => {
        setTimeout(() => {
          newTokens.push(word)
          setTokens([...newTokens])
          if (i === words.length - 1) {
            setTimeout(() => {
              setIsProcessing(true)
              setTimeout(() => {
                setShowOutput(true)
                setTimeout(() => {
                  setCurrentSection('interaction')
                }, 2000)
              }, 1500)
            }, 500)
          }
        }, i * 250)
      })
    }
  }, [currentSection, userInput])

  // SECTION 3: Focus input when interaction section appears
  useEffect(() => {
    if (currentSection === 'interaction' && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 500)
    }
  }, [currentSection])

  const handleUserInput = (value: string) => {
    setUserInput(value)
    setTokens([])
    setShowOutput(false)
    setIsProcessing(false)

    if (value.length > 0) {
      const words = value.split(' ')
      const newTokens: string[] = []

      words.forEach((word, i) => {
        setTimeout(() => {
          newTokens.push(word)
          setTokens([...newTokens])
          if (i === words.length - 1) {
            setTimeout(() => {
              setIsProcessing(true)
              setTimeout(() => {
                setShowOutput(true)
              }, 1500)
            }, 500)
          }
        }, i * 200)
      })
    }
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Background (Subtle) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--glow-soft)] opacity-50"></div>
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {/* SECTION 1: CINEMATIC INTRO */}
          {currentSection === 'intro' && (
            <motion.section
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex items-center justify-center px-6"
            >
              <div className="text-center space-y-8 max-w-5xl">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="text-7xl lg:text-9xl font-light text-[var(--foreground)] leading-[1.05] tracking-tight"
                >
                  AI does not think.
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showSecondLine ? 1 : 0, y: showSecondLine ? 0 : 20 }}
                  transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                  className="text-7xl lg:text-9xl font-light text-[var(--gold)] leading-[1.05] tracking-tight"
                >
                  It predicts.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showSecondLine ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-xl lg:text-2xl text-[var(--foreground-muted)] font-light mt-8"
                >
                  Every word is a probability, not understanding.
                </motion.p>
              </div>
            </motion.section>
          )}

          {/* SECTION 2: VISUAL EXPLANATION */}
          {currentSection === 'visual' && (
            <motion.section
              key="visual"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex items-center justify-center px-6 py-16"
            >
              <div className="w-full max-w-6xl space-y-16">
                {/* Horizontal 3-Part System */}
                <div className="relative flex items-center justify-between gap-8">
                  {/* USER INPUT */}
                  <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 space-y-4"
                  >
                    <div className="text-xs text-[var(--foreground-muted)] uppercase tracking-wide mb-3">
                      User Input
                    </div>
                    <div className="bg-[var(--surface)] border border-[var(--border-light)] rounded-xl p-8 min-h-[200px] flex items-center">
                      <div className="flex flex-wrap gap-2 w-full">
                        {tokens.map((token, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-4 py-2 bg-[var(--glow-soft)] border border-[var(--gold)]/20 rounded-lg text-sm text-[var(--foreground)] font-light"
                          >
                            {token}
                          </motion.span>
                        ))}
                        {tokens.length > 0 && !isProcessing && !showOutput && (
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="inline-block w-0.5 h-6 bg-[var(--gold)] ml-1"
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* AI ENGINE (Center) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col items-center space-y-4 relative"
                  >
                    {/* Flow Arrow 1 */}
                    <motion.div
                      className="absolute left-[-60px] top-1/2 w-12 h-0.5 bg-[var(--gold)]/40"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: tokens.length > 0 ? 1 : 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    />
                    <motion.div
                      className="absolute left-[-60px] top-1/2 w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-[var(--gold)]/40"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: tokens.length > 0 ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                    />

                    <div className="relative">
                      <motion.div
                        animate={{
                          scale: isProcessing ? [1, 1.1, 1] : 1,
                        }}
                        transition={{
                          duration: 2,
                          repeat: isProcessing ? Infinity : 0,
                          ease: 'easeInOut',
                        }}
                        className="w-32 h-32 rounded-full bg-[var(--gold)]/10 border-2 border-[var(--gold)]/30 flex items-center justify-center"
                      >
                        <div className="w-20 h-20 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/40"></div>
                        {isProcessing && (
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-[var(--gold)]/50"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.div>
                    </div>
                    <div className="text-xs text-[var(--foreground-muted)] uppercase tracking-wide text-center">
                      Pattern Matching Engine
                    </div>

                    {/* Flow Arrow 2 */}
                    <motion.div
                      className="absolute right-[-60px] top-1/2 w-12 h-0.5 bg-[var(--gold)]/40"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: showOutput ? 1 : 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    />
                    <motion.div
                      className="absolute right-[-60px] top-1/2 w-0 h-0 border-t-4 border-b-4 border-r-8 border-t-transparent border-b-transparent border-r-[var(--gold)]/40"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: showOutput ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                    />
                  </motion.div>

                  {/* OUTPUT */}
                  <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: showOutput ? 1 : 0, x: showOutput ? 0 : 60 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex-1 space-y-4"
                  >
                    <div className="text-xs text-[var(--foreground-muted)] uppercase tracking-wide mb-3">
                      Output
                    </div>
                    <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-xl p-8 min-h-[200px] flex items-center">
                      <p className="text-sm text-[var(--foreground)] font-light">
                        Generated response
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Caption */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showOutput ? 1 : 0, y: showOutput ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-center"
                >
                  <p className="text-lg text-[var(--foreground-muted)] font-light">
                    AI predicts the next most likely word.
                  </p>
                </motion.div>
              </div>
            </motion.section>
          )}

          {/* SECTION 3: INTERACTION */}
          {currentSection === 'interaction' && (
            <motion.section
              key="interaction"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-screen flex items-center justify-center px-6 py-16"
            >
              <div className="w-full max-w-6xl space-y-16">
                {/* Same 3-Part System (Interactive) */}
                <div className="relative flex items-center justify-between gap-8">
                  {/* USER INPUT (Interactive) */}
                  <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1 space-y-4"
                  >
                    <div className="text-xs text-[var(--foreground-muted)] uppercase tracking-wide mb-3">
                      Your Prompt
                    </div>
                    <div className="bg-[var(--surface)] border-2 border-[var(--gold)]/30 rounded-xl p-8 min-h-[200px] flex items-center relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={userInput}
                        onChange={(e) => handleUserInput(e.target.value)}
                        className="w-full bg-transparent text-[var(--foreground)] text-lg font-light focus:outline-none"
                        placeholder="Try changing the prompt and see what breaks..."
                      />
                      {userInput.length > 0 && (
                        <div className="absolute bottom-4 left-8 flex flex-wrap gap-2">
                          {tokens.map((token, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2 }}
                              className="px-3 py-1 bg-[var(--glow-soft)] border border-[var(--gold)]/20 rounded text-xs text-[var(--foreground)]"
                            >
                              {token}
                            </motion.span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* AI ENGINE */}
                  <motion.div
                    className="flex flex-col items-center space-y-4 relative"
                  >
                    <motion.div
                      className="absolute left-[-60px] top-1/2 w-12 h-0.5 bg-[var(--gold)]/40"
                      animate={{ scaleX: tokens.length > 0 ? 1 : 0 }}
                    />
                    <motion.div
                      className="absolute left-[-60px] top-1/2 w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-[var(--gold)]/40"
                      animate={{ opacity: tokens.length > 0 ? 1 : 0 }}
                    />

                    <div className="relative">
                      <motion.div
                        animate={{
                          scale: isProcessing ? [1, 1.1, 1] : 1,
                        }}
                        transition={{
                          duration: 2,
                          repeat: isProcessing ? Infinity : 0,
                          ease: 'easeInOut',
                        }}
                        className="w-32 h-32 rounded-full bg-[var(--gold)]/10 border-2 border-[var(--gold)]/30 flex items-center justify-center"
                      >
                        <div className="w-20 h-20 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/40"></div>
                        {isProcessing && (
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-[var(--gold)]/50"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.div>
                    </div>
                    <div className="text-xs text-[var(--foreground-muted)] uppercase tracking-wide text-center">
                      Pattern Matching Engine
                    </div>

                    <motion.div
                      className="absolute right-[-60px] top-1/2 w-12 h-0.5 bg-[var(--gold)]/40"
                      animate={{ scaleX: showOutput ? 1 : 0 }}
                    />
                    <motion.div
                      className="absolute right-[-60px] top-1/2 w-0 h-0 border-t-4 border-b-4 border-r-8 border-t-transparent border-b-transparent border-r-[var(--gold)]/40"
                      animate={{ opacity: showOutput ? 1 : 0 }}
                    />
                  </motion.div>

                  {/* OUTPUT */}
                  <motion.div
                    animate={{ opacity: showOutput ? 1 : 0.3 }}
                    className="flex-1 space-y-4"
                  >
                    <div className="text-xs text-[var(--foreground-muted)] uppercase tracking-wide mb-3">
                      AI Output
                    </div>
                    <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-xl p-8 min-h-[200px] flex items-center">
                      {showOutput ? (
                        <p className="text-sm text-[var(--foreground)] font-light">
                          Generated response
                        </p>
                      ) : (
                        <p className="text-sm text-[var(--foreground-muted)] font-light">
                          Waiting for input...
                        </p>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Warning Badge */}
                {showOutput && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center"
                  >
                    <div className="px-6 py-3 bg-[var(--glow-soft)] border border-[var(--gold)]/30 rounded-lg">
                      <p className="text-sm text-[var(--foreground)] font-medium">
                        Confidence ≠ correctness
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* SECTION 4: WHY THIS MATTERS (Floating Panel) */}
        {currentSection === 'interaction' && (
          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="fixed right-8 top-1/2 -translate-y-1/2 hidden xl:block w-80 z-20"
          >
            <div className="bg-[var(--surface)]/95 backdrop-blur-sm border border-[var(--border-light)] rounded-xl p-6 space-y-4 shadow-lg">
              <h3 className="text-sm font-medium text-[var(--foreground)] mb-4">
                Why this matters
              </h3>
              
              {[
                {
                  icon: '💡',
                  title: 'Why AI sounds confident',
                  text: 'High probability patterns create confident-sounding outputs',
                },
                {
                  icon: '⚠️',
                  title: 'Why wrong answers happen',
                  text: 'Predictions can be wrong even when they sound right',
                },
                {
                  icon: '🎯',
                  title: 'Why prompts matter',
                  text: 'Better prompts = better pattern matching = better results',
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                  whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                  className="p-4 bg-[var(--background)] border border-[var(--border-light)] rounded-lg cursor-pointer transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{card.icon}</span>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-[var(--foreground)] mb-1">
                        {card.title}
                      </h4>
                      <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                        {card.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.aside>
        )}
      </div>
    </div>
  )
}
