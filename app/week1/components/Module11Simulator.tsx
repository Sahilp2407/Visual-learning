'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

type SimulatorStep = 'orientation' | 'simulator' | 'summary'

export default function Module11Simulator({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<SimulatorStep>('orientation')
  const [isMounted, setIsMounted] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const inputTextRef = useRef<HTMLDivElement>(null)
  const aiCoreRef = useRef<HTMLDivElement>(null)
  const aiCoreLabelRef = useRef<HTMLDivElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const flowLine1Ref = useRef<HTMLDivElement>(null)
  const flowLine2Ref = useRef<HTMLDivElement>(null)
  const keyMessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || step !== 'simulator') return

    // Check if all refs are available
    if (!inputTextRef.current || !outputRef.current ||
      !flowLine1Ref.current || !flowLine2Ref.current ||
      !aiCoreRef.current || !aiCoreLabelRef.current || !keyMessageRef.current) {
      return
    }

    const playAnimation = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setAnimationPhase(4) // Show key message
        },
      })

      // Reset all elements
      gsap.set([inputTextRef.current, outputRef.current], {
        opacity: 0,
        y: 20,
      })
      gsap.set([flowLine1Ref.current, flowLine2Ref.current], {
        scaleX: 0,
        opacity: 0,
      })
      gsap.set(aiCoreRef.current, {
        scale: 1,
        boxShadow: '0 0 40px rgba(212, 175, 55, 0.2)',
      })
      gsap.set(aiCoreLabelRef.current, {
        opacity: 0,
      })
      gsap.set(keyMessageRef.current, {
        opacity: 0,
        y: 20,
      })

      // Phase 1: Input types
      setAnimationPhase(1)
      if (inputTextRef.current) {
        inputTextRef.current.textContent = ''
        tl.to(inputTextRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        })

        // Type text character by character
        const inputText = 'Can you draft a professional reply for this email?'
        const chars = inputText.split('')
        const charDelay = 2000 / chars.length

        chars.forEach((char, i) => {
          tl.call(
            () => {
              if (inputTextRef.current) {
                inputTextRef.current.textContent += char
              }
            },
            undefined,
            i * (charDelay / 1000)
          )
        })
      }

      // Phase 2: Flow to AI Core
      tl.call(() => setAnimationPhase(2), undefined, '+=0.5')
      tl.to(flowLine1Ref.current, {
        scaleX: 1,
        opacity: 0.4,
        duration: 0.8,
        ease: 'power2.out',
      })

      // AI Core label appears
      tl.to(aiCoreLabelRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.4')

      // Change AI Core label text
      tl.call(() => {
        if (aiCoreLabelRef.current) {
          aiCoreLabelRef.current.textContent = 'AI predicts the next likely word'
        }
      }, undefined, '+=1')

      // Phase 3: AI Core intensifies
      tl.to(aiCoreRef.current, {
        scale: 1.15,
        boxShadow: '0 0 60px rgba(212, 175, 55, 0.5)',
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.5')

      // Phase 4: Flow to output
      tl.call(() => setAnimationPhase(3), undefined, '+=0.3')
      tl.to(flowLine2Ref.current, {
        scaleX: 1,
        opacity: 0.4,
        duration: 0.8,
        ease: 'power2.out',
      })

      // Output appears
      tl.to(outputRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.4')

      // Phase 5: Key message
      tl.call(() => setAnimationPhase(4), undefined, '+=1')
      tl.to(keyMessageRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
    }

    // Start animation after a brief delay
    const timer = setTimeout(() => {
      playAnimation()
    }, 300)

    // Continuous AI core pulse
    if (aiCoreRef.current) {
      gsap.to(aiCoreRef.current, {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
      })
    }

    return () => {
      clearTimeout(timer)
    }
  }, [isMounted, step])

  const handleStartSimulator = () => {
    setStep('simulator')
  }

  const handleContinue = () => {
    setStep('summary')
  }

  const handleBackToWeek1 = () => {
    onBack()
  }

  return (
    <div ref={containerRef} className="w-full space-y-8 min-h-[500px]">
      {/* STEP 1: ORIENTATION SCREEN */}
      {step === 'orientation' && (
        <div className="text-center space-y-8 py-12 px-4">
          <div className="space-y-6 max-w-2xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-medium text-[var(--foreground)] leading-tight">
              How AI Actually Works
              <br />
              <span className="text-2xl lg:text-3xl text-[var(--foreground-muted)]">(in 60 seconds)</span>
            </h1>

            <div className="space-y-4 text-left max-w-xl mx-auto">
              <p className="text-lg text-[var(--foreground)] leading-relaxed">
                AI does not think like humans.
              </p>
              <p className="text-lg text-[var(--foreground)] leading-relaxed">
                It does not understand meaning.
              </p>
              <p className="text-lg text-[var(--foreground)] leading-relaxed">
                It predicts the next word using patterns.
              </p>
              <p className="text-lg text-[var(--foreground-muted)] leading-relaxed mt-6">
                Let's see how this works visually.
              </p>
            </div>

            <div className="pt-8">
              <button
                onClick={handleStartSimulator}
                className="px-8 py-4 bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--foreground)] hover:bg-[var(--gold)]/20 hover:border-[var(--gold)]/50 transition-all duration-300 text-sm font-medium tracking-wide uppercase"
              >
                See it in action
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: GUIDED VISUAL SIMULATOR */}
      {step === 'simulator' && (
        <div className="space-y-8">
          {/* Visual Scene */}
          <div className="relative h-[500px] bg-[var(--surface)] border border-white/10 rounded-lg p-12 flex items-center justify-center overflow-hidden">
            {/* Input Side (Left) */}
            <div className="absolute left-12 top-1/2 -translate-y-1/2">
              <div className="mb-4">
                <div className="text-xs text-[var(--foreground-muted)] mb-2 uppercase tracking-wide">
                  {animationPhase >= 1 ? 'This is your input' : ''}
                </div>
                <div
                  ref={inputTextRef}
                  className="px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-sm text-[var(--foreground)] max-w-[240px] min-h-[80px] flex items-center"
                  style={{ opacity: 0, transform: 'translateY(20px)' }}
                >
                  Can you draft a professional reply for this email?
                </div>
              </div>
            </div>

            {/* AI Core (Center) */}
            <div className="relative">
              <div
                ref={aiCoreRef}
                className="w-40 h-40 rounded-full bg-[var(--gold)]/20 border-2 border-[var(--gold)]/40 flex items-center justify-center relative"
                style={{
                  boxShadow: '0 0 40px rgba(212, 175, 55, 0.2)',
                }}
              >
                <div className="w-28 h-28 rounded-full bg-[var(--gold)]/30 border border-[var(--gold)]/60"></div>
                <div className="absolute inset-0 rounded-full bg-[var(--gold)]/10 animate-pulse"></div>
              </div>
              <div
                ref={aiCoreLabelRef}
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-sm text-[var(--foreground-muted)] text-center min-w-[200px]"
                style={{ opacity: 0 }}
              >
                AI looks at patterns from past data
              </div>
            </div>

            {/* Output Side (Right) */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2">
              <div className="mb-4">
                <div className="text-xs text-[var(--foreground-muted)] mb-2 uppercase tracking-wide">
                  {animationPhase >= 3 ? 'This is the output' : ''}
                </div>
                <div
                  ref={outputRef}
                  className="px-6 py-4 bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg text-sm text-[var(--foreground)] max-w-[240px] min-h-[80px] flex items-center"
                  style={{ opacity: 0, transform: 'translateY(20px)' }}
                >
                  Here is a professional reply draft for your email...
                </div>
              </div>
            </div>

            {/* Flow Lines */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Input to Core */}
              <div
                ref={flowLine1Ref}
                className="absolute left-[240px] top-1/2 h-0.5 bg-[var(--gold)]/40 origin-left"
                style={{
                  width: 'calc(50% - 320px)',
                  transform: 'scaleX(0)',
                  opacity: 0,
                }}
              />
              {/* Core to Output */}
              <div
                ref={flowLine2Ref}
                className="absolute left-1/2 top-1/2 h-0.5 bg-[var(--gold)]/40 origin-left"
                style={{
                  width: 'calc(50% - 320px)',
                  transform: 'scaleX(0)',
                  opacity: 0,
                }}
              />
            </div>
          </div>

          {/* Key Message */}
          {animationPhase >= 4 && (
            <div
              ref={keyMessageRef}
              className="text-center p-8 bg-[var(--surface)] border border-[var(--gold)]/20 rounded-lg"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              <p className="text-xl text-[var(--foreground)] mb-2">
                AI sounds confident.
              </p>
              <p className="text-lg text-[var(--foreground-muted)]">
                Confidence ≠ correctness.
              </p>
            </div>
          )}

          {/* Continue Button */}
          {animationPhase >= 4 && (
            <div className="flex justify-center pt-4">
              <button
                onClick={handleContinue}
                className="px-8 py-3 bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--foreground)] hover:bg-[var(--gold)]/20 transition-all text-sm font-medium tracking-wide uppercase"
              >
                Continue to next topic
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: LEARNING SUMMARY */}
      {step === 'summary' && (
        <div className="space-y-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-medium text-[var(--foreground)]">
              What you just learned
            </h2>

            <div className="max-w-2xl mx-auto space-y-6 text-left">
              <div className="p-6 bg-[var(--surface)] border border-white/10 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[var(--gold)] mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-[var(--foreground)]">
                    AI predicts, not thinks
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[var(--surface)] border border-white/10 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[var(--gold)] mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-[var(--foreground)]">
                    Input quality matters
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[var(--surface)] border border-white/10 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[var(--gold)] mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-[var(--foreground)]">
                    AI can still be wrong
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={handleBackToWeek1}
                className="px-8 py-3 bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--foreground)] hover:bg-[var(--gold)]/20 transition-all text-sm font-medium tracking-wide uppercase"
              >
                ← Back to Week 1
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
