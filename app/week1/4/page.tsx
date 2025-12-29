'use client'

import { useEffect, useState } from 'react'
import gsap from 'gsap'

export default function Module14() {
  const [isMounted, setIsMounted] = useState(false)
  const [iterations, setIterations] = useState<Array<{ id: number; text: string; quality: number }>>([])
  const [currentDraft, setCurrentDraft] = useState('Write a professional email to the client about the project delay.')
  const [refinementCount, setRefinementCount] = useState(0)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const refine = () => {
    const improvements = [
      'Write a professional email to the client about the project delay. Explain the reason clearly and propose a new timeline.',
      'Write a professional email to the client about the project delay. Explain the reason clearly, propose a new timeline, and offer to discuss alternatives.',
      'Write a professional email to the client about the project delay. Use a clear subject line, explain the reason transparently, propose a realistic new timeline with buffer, offer to discuss alternatives, and maintain a solution-focused tone.',
    ]

    if (refinementCount < improvements.length) {
      const newIteration = {
        id: iterations.length + 1,
        text: improvements[refinementCount],
        quality: (refinementCount + 1) * 30,
      }
      setIterations([...iterations, newIteration])
      setCurrentDraft(improvements[refinementCount])
      setRefinementCount(refinementCount + 1)
    }
  }

  const giveExample = () => {
    const example = 'Example: "Subject: Project Update - Revised Timeline\n\nDear [Client],\n\nI wanted to update you on the project timeline..."'
    const newIteration = {
      id: iterations.length + 1,
      text: currentDraft + '\n\n' + example,
      quality: Math.min(100, (iterations.length + 1) * 25),
    }
    setIterations([...iterations, newIteration])
    setCurrentDraft(newIteration.text)
  }

  const breakIntoSteps = () => {
    const steps = 'Step 1: Acknowledge the delay\nStep 2: Explain the reason\nStep 3: Propose new timeline\nStep 4: Offer alternatives'
    const newIteration = {
      id: iterations.length + 1,
      text: currentDraft + '\n\n' + steps,
      quality: Math.min(100, (iterations.length + 1) * 28),
    }
    setIterations([...iterations, newIteration])
    setCurrentDraft(newIteration.text)
  }

  const currentQuality = iterations.length > 0 ? iterations[iterations.length - 1].quality : 20

  return (
    <div className="min-h-screen flex flex-col">
      {/* Instruction */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium mb-2 text-[var(--foreground)]">1.4 Refine the Output</h1>
          <p className="text-sm text-[var(--foreground-muted)]">
            Improve your prompt through iteration. See quality increase with each refinement.
          </p>
        </div>
      </div>

      {/* Main Visual Canvas */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-5xl">
          {/* Iteration Stack */}
          <div className="mb-8 space-y-4">
            {iterations.length === 0 ? (
              <div className="p-6 bg-[var(--surface)] border border-white/10 rounded">
                <div className="text-sm text-[var(--foreground-muted)] mb-2">Initial Draft:</div>
                <div className="text-[var(--foreground)]">{currentDraft}</div>
              </div>
            ) : (
              iterations.map((iteration, i) => (
                <div
                  key={iteration.id}
                  className="p-6 bg-[var(--surface)] border border-white/10 rounded"
                  style={{
                    opacity: 1 - i * 0.1,
                    transform: `translateY(${i * -10}px)`,
                  }}
                >
                  <div className="text-xs text-[var(--foreground-muted)] mb-2">
                    Iteration {iteration.id} (Quality: {iteration.quality}%)
                  </div>
                  <div className="text-sm text-[var(--foreground)] whitespace-pre-line">
                    {iteration.text}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quality Meter */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-[var(--foreground-muted)] mb-2">
              <span>Output Quality</span>
              <span>{currentQuality}%</span>
            </div>
            <div className="h-4 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  currentQuality < 40
                    ? 'bg-red-500/50'
                    : currentQuality < 70
                    ? 'bg-yellow-500/50'
                    : 'bg-[var(--gold)]'
                }`}
                style={{ width: `${currentQuality}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="container mx-auto px-6 py-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={refine}
              disabled={refinementCount >= 3}
              className="px-6 py-3 bg-[var(--gold)]/20 border border-[var(--gold)]/30 text-[var(--foreground)] hover:bg-[var(--gold)]/30 transition-all disabled:opacity-50"
            >
              Refine
            </button>
            <button
              onClick={giveExample}
              className="px-6 py-3 bg-[var(--surface)] border border-white/10 text-[var(--foreground)] hover:border-white/20 transition-all"
            >
              Give Example
            </button>
            <button
              onClick={breakIntoSteps}
              className="px-6 py-3 bg-[var(--surface)] border border-white/10 text-[var(--foreground)] hover:border-white/20 transition-all"
            >
              Break into Steps
            </button>
          </div>

          {/* Challenge & Insight */}
          <div className="p-6 bg-[var(--surface)] border border-white/10 rounded">
            <div className="text-sm font-medium text-[var(--gold-soft)] mb-2">Challenge:</div>
            <p className="text-sm text-[var(--foreground-muted)] mb-4">
              Improve output quality in 3 refinements.
            </p>
            <div className="text-sm font-medium text-[var(--gold-soft)] mb-2">Insight:</div>
            <p className="text-sm text-[var(--foreground)]">
              Refine, don't restart. Each iteration builds on the last.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

