'use client'

import { useEffect, useState } from 'react'
import gsap from 'gsap'

type PromptBlock = {
  id: string
  type: 'role' | 'context' | 'task' | 'constraints' | 'output'
  label: string
  content: string
  active: boolean
}

export default function Module13() {
  const [isMounted, setIsMounted] = useState(false)
  const [blocks, setBlocks] = useState<PromptBlock[]>([
    { id: '1', type: 'role', label: 'Role', content: 'You are a professional assistant', active: false },
    { id: '2', type: 'context', label: 'Context', content: 'Working on a quarterly report', active: false },
    { id: '3', type: 'task', label: 'Task', content: 'Summarize the key findings', active: false },
    { id: '4', type: 'constraints', label: 'Constraints', content: 'Keep it under 200 words', active: false },
    { id: '5', type: 'output', label: 'Output Format', content: 'Bullet points', active: false },
  ])
  const [clarity, setClarity] = useState(0)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const activeCount = blocks.filter((b) => b.active).length
    setClarity((activeCount / blocks.length) * 100)
  }, [blocks])

  const toggleBlock = (id: string) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, active: !block.active } : block
      )
    )
  }

  const activeBlocks = blocks.filter((b) => b.active)
  const activeOrder = activeBlocks.map((b) => b.type)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Instruction */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium mb-2 text-[var(--foreground)]">1.3 Prompt Builder</h1>
          <p className="text-sm text-[var(--foreground-muted)]">
            Build a clear prompt by activating blocks. Watch output clarity improve.
          </p>
        </div>
      </div>

      {/* Main Visual Canvas */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-5xl">
          {/* Prompt Blocks */}
          <div className="mb-8">
            <div className="text-sm text-[var(--foreground-muted)] mb-4">Prompt Blocks:</div>
            <div className="grid grid-cols-5 gap-4">
              {blocks.map((block) => (
                <button
                  key={block.id}
                  onClick={() => toggleBlock(block.id)}
                  className={`p-4 border rounded transition-all ${
                    block.active
                      ? 'border-[var(--gold)] bg-[var(--gold)]/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="text-xs text-[var(--foreground-muted)] mb-2">{block.label}</div>
                  <div className="text-sm text-[var(--foreground)]">{block.content}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Built Prompt */}
          <div className="mb-8 p-6 bg-[var(--surface)] border border-white/10 rounded">
            <div className="text-sm text-[var(--foreground-muted)] mb-4">Your Prompt:</div>
            <div className="text-[var(--foreground)] font-normal min-h-[100px]">
              {activeBlocks.length > 0 ? (
                <div className="space-y-2">
                  {activeBlocks.map((block, i) => (
                    <div key={block.id} className="text-sm">
                      <span className="text-[var(--gold-soft)]">{block.label}:</span> {block.content}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[var(--foreground-muted)]">Activate blocks to build your prompt</div>
              )}
            </div>
          </div>

          {/* Clarity Meter */}
          <div>
            <div className="flex justify-between text-sm text-[var(--foreground-muted)] mb-2">
              <span>Output Clarity</span>
              <span>{Math.round(clarity)}%</span>
            </div>
            <div className="h-4 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  clarity < 40
                    ? 'bg-red-500/50'
                    : clarity < 80
                    ? 'bg-yellow-500/50'
                    : 'bg-[var(--gold)]'
                }`}
                style={{ width: `${clarity}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="container mx-auto px-6 py-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          {/* Challenge & Insight */}
          <div className="p-6 bg-[var(--surface)] border border-white/10 rounded">
            <div className="text-sm font-medium text-[var(--gold-soft)] mb-2">Challenge:</div>
            <p className="text-sm text-[var(--foreground-muted)] mb-4">
              Build a clear prompt using all 5 blocks.
            </p>
            <div className="text-sm font-medium text-[var(--gold-soft)] mb-2">Insight:</div>
            <p className="text-sm text-[var(--foreground)]">
              Structure controls output. Role + Context + Task + Constraints + Format = Clear results.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

