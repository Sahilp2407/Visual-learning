'use client'

import { useEffect, useState } from 'react'

type Model = 'chatgpt' | 'gemini' | 'claude'
type Task = {
  id: string
  name: string
  bestModel: Model
  description: string
}

export default function Module15() {
  const [isMounted, setIsMounted] = useState(false)
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const [results, setResults] = useState<Record<string, Model>>({})
  const [score, setScore] = useState(0)

  const tasks: Task[] = [
    {
      id: '1',
      name: 'Creative writing',
      bestModel: 'chatgpt',
      description: 'Best for creative and conversational tasks',
    },
    {
      id: '2',
      name: 'Data analysis',
      bestModel: 'gemini',
      description: 'Strong with Google integrations and data',
    },
    {
      id: '3',
      name: 'Long document analysis',
      bestModel: 'claude',
      description: 'Excellent context window and accuracy',
    },
  ]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleModelSelect = (model: Model) => {
    if (!selectedTask) return

    setSelectedModel(model)
    setResults({ ...results, [selectedTask]: model })

    const task = tasks.find((t) => t.id === selectedTask)
    if (task && model === task.bestModel) {
      setScore(score + 1)
    }
  }

  const resetChallenge = () => {
    setSelectedTask(null)
    setSelectedModel(null)
    setResults({})
    setScore(0)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Instruction */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium mb-2 text-[var(--foreground)]">1.5 Choose the Right AI</h1>
          <p className="text-sm text-[var(--foreground-muted)]">
            Match tasks to the best AI tool. Each model has strengths.
          </p>
        </div>
      </div>

      {/* Main Visual Canvas */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-6xl">
          {/* Task Selection */}
          <div className="mb-8">
            <div className="text-sm text-[var(--foreground-muted)] mb-4">Select a Task:</div>
            <div className="grid md:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => {
                    setSelectedTask(task.id)
                    setSelectedModel(null)
                  }}
                  className={`p-6 border rounded transition-all text-left ${
                    selectedTask === task.id
                      ? 'border-[var(--gold)] bg-[var(--gold)]/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="text-sm font-medium text-[var(--foreground)] mb-2">
                    {task.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Model Selection */}
          {selectedTask && (
            <div className="mb-8">
              <div className="text-sm text-[var(--foreground-muted)] mb-4">Choose AI Model:</div>
              <div className="grid md:grid-cols-3 gap-4">
                {(['chatgpt', 'gemini', 'claude'] as Model[]).map((model) => {
                  const task = tasks.find((t) => t.id === selectedTask)
                  const isBest = task?.bestModel === model
                  const isSelected = selectedModel === model

                  return (
                    <button
                      key={model}
                      onClick={() => handleModelSelect(model)}
                      className={`p-6 border rounded transition-all ${
                        isSelected
                          ? isBest
                            ? 'border-[var(--gold)] bg-[var(--gold)]/20'
                            : 'border-red-500/50 bg-red-500/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="text-lg font-medium text-[var(--foreground)] mb-2 capitalize">
                        {model === 'chatgpt' ? 'ChatGPT' : model === 'gemini' ? 'Gemini' : 'Claude'}
                      </div>
                      {isSelected && (
                        <div className="text-xs text-[var(--foreground-muted)] mt-2">
                          {isBest ? '✓ Best match' : '✗ Not ideal'}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Result Display */}
          {selectedTask && selectedModel && (
            <div className="p-6 bg-[var(--surface)] border border-white/10 rounded">
              <div className="text-sm text-[var(--foreground-muted)] mb-2">Result:</div>
              <div className="text-[var(--foreground)]">
                {(() => {
                  const task = tasks.find((t) => t.id === selectedTask)
                  const isBest = task?.bestModel === selectedModel
                  return isBest ? (
                    <span className="text-[var(--gold-soft)]">
                      ✓ Good choice! {task?.description}
                    </span>
                  ) : (
                    <span className="text-red-400">
                      ✗ {task?.description} Consider using {task?.bestModel === 'chatgpt' ? 'ChatGPT' : task?.bestModel === 'gemini' ? 'Gemini' : 'Claude'} instead.
                    </span>
                  )
                })()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="container mx-auto px-6 py-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm">
              <span className="text-[var(--foreground-muted)]">Score: </span>
              <span className="text-[var(--gold-soft)]">{score}/3</span>
            </div>
            <button
              onClick={resetChallenge}
              className="px-6 py-3 bg-[var(--surface)] border border-white/10 text-[var(--foreground)] hover:border-white/20 transition-all"
            >
              Reset Challenge
            </button>
          </div>

          {/* Challenge & Insight */}
          <div className="p-6 bg-[var(--surface)] border border-white/10 rounded">
            <div className="text-sm font-medium text-[var(--gold-soft)] mb-2">Challenge:</div>
            <p className="text-sm text-[var(--foreground-muted)] mb-4">
              Match 3 tasks to the correct AI tool.
            </p>
            <div className="text-sm font-medium text-[var(--gold-soft)] mb-2">Insight:</div>
            <p className="text-sm text-[var(--foreground)]">
              Right tool = better results. ChatGPT for creativity, Gemini for data, Claude for accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

