'use client'

import { useEffect, useState } from 'react'

export default function Module17() {
  const [isMounted, setIsMounted] = useState(false)
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [beforeTime, setBeforeTime] = useState(60)
  const [afterTime, setAfterTime] = useState(20)
  const [beforeQuality, setBeforeQuality] = useState(70)
  const [afterQuality, setAfterQuality] = useState(90)

  const tasks = [
    'Email drafting',
    'Report writing',
    'Meeting summaries',
    'Data analysis',
    'Content creation',
  ]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const timeSaved = beforeTime - afterTime
  const qualityImprovement = afterQuality - beforeQuality

  return (
    <div className="min-h-screen flex flex-col">
      {/* Instruction */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium mb-2 text-[var(--foreground)]">1.7 AI Impact Review</h1>
          <p className="text-sm text-[var(--foreground-muted)]">
            Compare your work before and after using AI. See measurable improvement.
          </p>
        </div>
      </div>

      {/* Main Visual Canvas */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-6xl">
          {/* Task Selection */}
          <div className="mb-8">
            <div className="text-sm text-[var(--foreground-muted)] mb-4">Select Your Task:</div>
            <div className="grid md:grid-cols-5 gap-3">
              {tasks.map((task) => (
                <button
                  key={task}
                  onClick={() => setSelectedTask(task)}
                  className={`p-4 border rounded transition-all ${
                    selectedTask === task
                      ? 'border-[var(--gold)] bg-[var(--gold)]/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="text-sm text-[var(--foreground)]">{task}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Before vs After Comparison */}
          {selectedTask && (
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Before */}
              <div className="p-8 bg-[var(--surface)] border border-white/10 rounded">
                <div className="text-sm text-[var(--foreground-muted)] mb-6">Before AI</div>
                <div className="space-y-6">
                  <div>
                    <div className="text-xs text-[var(--foreground-muted)] mb-2">Time (minutes)</div>
                    <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500/50 transition-all duration-500"
                        style={{ width: `${(beforeTime / 60) * 100}%` }}
                      />
                    </div>
                    <div className="text-lg text-[var(--foreground)] mt-2">{beforeTime} min</div>
                  </div>
                  <div>
                    <div className="text-xs text-[var(--foreground-muted)] mb-2">Quality</div>
                    <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500/50 transition-all duration-500"
                        style={{ width: `${beforeQuality}%` }}
                      />
                    </div>
                    <div className="text-lg text-[var(--foreground)] mt-2">{beforeQuality}%</div>
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="p-8 bg-[var(--surface)] border border-[var(--gold)]/30 rounded">
                <div className="text-sm text-[var(--gold-soft)] mb-6">After AI</div>
                <div className="space-y-6">
                  <div>
                    <div className="text-xs text-[var(--foreground-muted)] mb-2">Time (minutes)</div>
                    <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--gold)] transition-all duration-500"
                        style={{ width: `${(afterTime / 60) * 100}%` }}
                      />
                    </div>
                    <div className="text-lg text-[var(--foreground)] mt-2">{afterTime} min</div>
                  </div>
                  <div>
                    <div className="text-xs text-[var(--foreground-muted)] mb-2">Quality</div>
                    <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--gold)] transition-all duration-500"
                        style={{ width: `${afterQuality}%` }}
                      />
                    </div>
                    <div className="text-lg text-[var(--foreground)] mt-2">{afterQuality}%</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Impact Summary */}
          {selectedTask && (
            <div className="p-6 bg-[var(--surface)] border border-white/10 rounded">
              <div className="text-sm font-medium text-[var(--gold-soft)] mb-4">Impact Summary:</div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs text-[var(--foreground-muted)] mb-1">Time Saved</div>
                  <div className="text-2xl text-[var(--gold-soft)]">{timeSaved} minutes</div>
                  <div className="text-xs text-[var(--foreground-muted)] mt-1">
                    {Math.round((timeSaved / beforeTime) * 100)}% faster
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--foreground-muted)] mb-1">Quality Improvement</div>
                  <div className="text-2xl text-[var(--gold-soft)]">+{qualityImprovement}%</div>
                  <div className="text-xs text-[var(--foreground-muted)] mt-1">
                    From {beforeQuality}% to {afterQuality}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="container mx-auto px-6 py-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          {/* Challenge & Insight */}
          <div className="p-6 bg-[var(--surface)] border border-white/10 rounded">
            <div className="text-sm font-medium text-[var(--gold-soft)] mb-2">Challenge:</div>
            <p className="text-sm text-[var(--foreground-muted)] mb-4">
              Improve one real task using AI.
            </p>
            <div className="text-sm font-medium text-[var(--gold-soft)] mb-2">Insight:</div>
            <p className="text-sm text-[var(--foreground)]">
              AI value = measurable improvement. Track time saved and quality gained.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

