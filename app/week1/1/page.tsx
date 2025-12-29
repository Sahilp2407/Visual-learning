'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Module11() {
  const [isMounted, setIsMounted] = useState(false)
  const [contextLevel, setContextLevel] = useState<'low' | 'medium' | 'high'>('medium')
  const [contextWindow, setContextWindow] = useState<'full' | 'limited'>('full')
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState('')
  const [tokens, setTokens] = useState<string[]>([])
  const [showingHallucination, setShowingHallucination] = useState(false)

  const canvasRef = useRef<HTMLDivElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const runPrediction = () => {
    setIsRunning(true)
    setOutput('')
    setTokens([])
    setShowingHallucination(false)

    const examples = {
      low: {
        prompt: 'The capital of France is',
        correct: 'Paris',
        hallucination: 'London',
      },
      medium: {
        prompt: 'Based on the data, the quarterly revenue increased by',
        correct: '15% compared to last quarter',
        hallucination: '25% compared to last year',
      },
      high: {
        prompt: 'Given the context of the meeting notes and project timeline, the next milestone should be',
        correct: 'completed by end of Q2',
        hallucination: 'postponed indefinitely',
      },
    }

    const example = examples[contextLevel]
    const willHallucinate = contextWindow === 'limited' || contextLevel === 'low'

    // Animate tokens appearing
    const promptWords = example.prompt.split(' ')
    let currentTokens: string[] = []

    promptWords.forEach((word, i) => {
      setTimeout(() => {
        currentTokens = [...currentTokens, word]
        setTokens([...currentTokens])
      }, i * 200)
    })

    setTimeout(() => {
      // Show prediction
      const result = willHallucinate ? example.hallucination : example.correct
      const resultWords = result.split(' ')

      resultWords.forEach((word, i) => {
        setTimeout(() => {
          setOutput((prev) => prev + (prev ? ' ' : '') + word)
          if (willHallucinate && i === resultWords.length - 1) {
            setShowingHallucination(true)
          }
        }, (promptWords.length * 200) + (i * 150))
      })

      setTimeout(() => {
        setIsRunning(false)
      }, (promptWords.length * 200) + (resultWords.length * 150) + 500)
    }, promptWords.length * 200 + 300)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Instruction */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium mb-2 text-[var(--foreground)]">1.1 How AI Thinks</h1>
          <p className="text-sm text-[var(--foreground-muted)]">
            Watch AI predict text word-by-word. See how context affects accuracy.
          </p>
        </div>
      </div>

      {/* Main Visual Canvas */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div ref={canvasRef} className="w-full max-w-4xl">
          <div className="bg-[var(--surface)] border border-white/10 p-12 rounded-lg">
            {/* Prompt Display */}
            <div className="mb-8">
              <div className="text-sm text-[var(--foreground-muted)] mb-4">Input Prompt:</div>
              <div className="text-xl text-[var(--foreground)] font-normal">
                {tokens.length > 0 ? (
                  <span>
                    {tokens.map((token, i) => (
                      <span
                        key={i}
                        className="inline-block mr-2 px-2 py-1 bg-[var(--glow-soft)] rounded"
                      >
                        {token}
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className="text-[var(--foreground-muted)]">Click "Run Prediction" to start</span>
                )}
              </div>
            </div>

            {/* Output Display */}
            <div className="mb-8 min-h-[120px]">
              <div className="text-sm text-[var(--foreground-muted)] mb-4">AI Prediction:</div>
              <div className="text-xl text-[var(--foreground)] font-normal">
                {output ? (
                  <span className={showingHallucination ? 'text-red-400' : 'text-[var(--gold-soft)]'}>
                    {output}
                    {showingHallucination && (
                      <span className="ml-2 text-xs bg-red-500/20 px-2 py-1 rounded">
                        ⚠️ Hallucination
                      </span>
                    )}
                  </span>
                ) : (
                  <span className="text-[var(--foreground-muted)]">Waiting for prediction...</span>
                )}
              </div>
            </div>

            {/* Context Window Indicator */}
            <div className="mb-8">
              <div className="text-sm text-[var(--foreground-muted)] mb-2">Context Window:</div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    contextWindow === 'full' ? 'w-full bg-[var(--gold)]' : 'w-1/3 bg-red-500/50'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="container mx-auto px-6 py-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <button
              onClick={runPrediction}
              disabled={isRunning}
              className="px-6 py-3 bg-[var(--gold)]/20 border border-[var(--gold)]/30 text-[var(--foreground)] hover:bg-[var(--gold)]/30 transition-all disabled:opacity-50"
            >
              {isRunning ? 'Running...' : 'Run Prediction'}
            </button>

            <div>
              <label className="block text-sm text-[var(--foreground-muted)] mb-2">
                Context Level
              </label>
              <select
                value={contextLevel}
                onChange={(e) => setContextLevel(e.target.value as any)}
                className="w-full px-4 py-2 bg-[var(--surface)] border border-white/10 text-[var(--foreground)]"
              >
                <option value="low">Low Context</option>
                <option value="medium">Medium Context</option>
                <option value="high">High Context</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-[var(--foreground-muted)] mb-2">
                Context Window
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setContextWindow('full')}
                  className={`flex-1 px-4 py-2 border transition-all ${
                    contextWindow === 'full'
                      ? 'border-[var(--gold)] bg-[var(--gold)]/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  Full
                </button>
                <button
                  onClick={() => setContextWindow('limited')}
                  className={`flex-1 px-4 py-2 border transition-all ${
                    contextWindow === 'limited'
                      ? 'border-red-500/50 bg-red-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  Limited
                </button>
              </div>
            </div>
          </div>

          {/* Challenge & Insight */}
          <div className="mt-8 p-6 bg-[var(--surface)] border border-white/10 rounded">
            <div className="text-sm font-medium text-[var(--gold-soft)] mb-2">Challenge:</div>
            <p className="text-sm text-[var(--foreground-muted)] mb-4">
              Can you make AI stop hallucinating using context?
            </p>
            <div className="text-sm font-medium text-[var(--gold-soft)] mb-2">Insight:</div>
            <p className="text-sm text-[var(--foreground)]">
              AI predicts patterns, not truth. More context = better predictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

