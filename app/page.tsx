'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Brain, Layers, Zap, ChevronDown } from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate consistent particle positions
  const particles = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    })),
    []
  )

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 })
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 })

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <main
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#fafafa] via-white to-[#f5f5f5]"
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-[var(--gold)]/30 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-blue-400/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-[var(--gold)]/30 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-64 h-64 border-l-2 border-t-2 border-[var(--gold)]/10" />
      <div className="absolute bottom-0 right-0 w-64 h-64 border-r-2 border-b-2 border-[var(--gold)]/10" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--gold)]/20 shadow-sm mb-6">
                <Sparkles className="w-4 h-4 text-[var(--gold)]" />
                <span className="text-xs font-semibold tracking-wider text-[var(--gold)]">PREMIUM LEARNING PLATFORM</span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                <span className="block text-[var(--foreground)]">Master</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] via-amber-500 to-[var(--gold)]">
                  AI Systems
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-[var(--foreground-muted)] leading-relaxed max-w-xl">
                An interactive visual journey through Large Language Models.
                <span className="block mt-2 text-[var(--foreground)] font-medium">
                  No code. Just pure understanding.
                </span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => router.push('/week1')}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative px-8 py-4 bg-black text-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-[var(--gold)]/20 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)]/0 via-[var(--gold)]/20 to-[var(--gold)]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="relative flex items-center gap-3 z-10">
                  <span className="text-base font-bold tracking-wide text-white">Start Learning</span>
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-[var(--foreground)] rounded-2xl border border-gray-200 hover:border-[var(--gold)] transition-all duration-300 hover:shadow-lg">
                <span className="text-base font-semibold">Watch Demo</span>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200"
            >
              <div>
                <div className="text-3xl font-bold text-[var(--foreground)]">5+</div>
                <div className="text-sm text-[var(--foreground-muted)]">Modules</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[var(--foreground)]">20+</div>
                <div className="text-sm text-[var(--foreground-muted)]">Simulations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[var(--foreground)]">100%</div>
                <div className="text-sm text-[var(--foreground-muted)]">Visual</div>
              </div>
            </motion.div>
          </div>

          {/* Right: 3D Interactive Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              perspective: 1000
            }}
            className="relative"
          >
            <div className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl border border-white/60">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--gold)] to-amber-500 rounded-[2rem] opacity-20 blur-xl" />

              <div className="relative space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-amber-500 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[var(--foreground)]">AI Simulator</div>
                      <div className="text-xs text-[var(--foreground-muted)]">System v2.0</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                    <span className="text-xs font-semibold text-green-600">● LIVE</span>
                  </div>
                </div>

                {/* Visual Elements */}
                <div className="space-y-4">
                  {[
                    { icon: Layers, label: "Neural Architecture", value: "Transformer", color: "from-blue-500 to-cyan-500" },
                    { icon: Zap, label: "Processing Speed", value: "12ms/token", color: "from-[var(--gold)] to-amber-500" },
                    { icon: Brain, label: "Model Size", value: "1.7T params", color: "from-purple-500 to-pink-500" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:border-[var(--gold)]/30 transition-all group cursor-pointer"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-[var(--foreground-muted)]">{item.label}</div>
                        <div className="text-sm font-bold text-[var(--foreground)]">{item.value}</div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[var(--gold)] transition-colors" />
                    </motion.div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--foreground-muted)]">Learning Progress</span>
                    <span className="text-[var(--foreground)] font-semibold">0%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "0%" }}
                      className="h-full bg-gradient-to-r from-[var(--gold)] to-amber-500"
                    />
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => router.push('/week1')}
                  className="w-full mt-4 px-6 py-4 rounded-xl font-bold text-sm tracking-wide hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(to right, #c9a24d, #d4af37)',
                    color: '#ffffff'
                  }}
                >
                  <span className="relative z-10 text-white font-bold">START INTERACTIVE DEMO</span>
                  <ArrowRight className="w-4 h-4 relative z-10 text-white" />
                </button>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[var(--gold)] to-amber-500 rounded-2xl shadow-xl flex items-center justify-center"
              style={{ transform: "translateZ(50px)" }}
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[var(--foreground-muted)] font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-[var(--gold)]" />
        </motion.div>
      </motion.div>
    </main>
  )
}
