'use client'

import { useEffect, useState } from 'react'

type WeeklyTask = {
  id: string
  name: string
  assigned: boolean
}

type PromptSystem = {
  id: string
  name: string
  taskId: string | null
}

export default function Module16() {
  const [isMounted, setIsMounted] = useState(false)
  const [tasks, setTasks] = useState<WeeklyTask[]>([
    { id: '1', name: 'Weekly email summaries', assigned: false },
    { id: '2', name: 'Meeting notes formatting', assigned: false },
    { id: '3', name: 'Report outlines', assigned: false },
    { id: '4', name: 'Client communication drafts', assigned: false },
  ])
  const [promptSystems, setPromptSystems] = useState<PromptSystem[]>([
    { id: '1', name: 'Email Summary System', taskId: null },
    { id: '2', name: 'Document Format System', taskId: null },
  ])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const assignTask = (taskId: string, systemId: string) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, assigned: true } : t)))
    setPromptSystems(
      promptSystems.map((ps) => (ps.id === systemId ? { ...ps, taskId } : ps))
    )
  }

  const unassignTask = (systemId: string) => {
    const system = promptSystems.find((ps) => ps.id === systemId)
    if (system?.taskId) {
      setTasks(tasks.map((t) => (t.id === system.taskId ? { ...t, assigned: false } : t)))
      setPromptSystems(
        promptSystems.map((ps) => (ps.id === systemId ? { ...ps, taskId: null } : ps))
      )
    }
  }

  const completedSystems = promptSystems.filter((ps) => ps.taskId !== null).length

  return (
    <div className="min-h-screen flex flex-col">
      {/* Instruction */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium mb-2 text-[var(--foreground)]">1.6 Your AI Copilot</h1>
          <p className="text-sm text-[var(--foreground-muted)]">
            Build reusable prompt systems for your weekly tasks.
          </p>
        </div>
      </div>

      {/* Main Visual Canvas */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Weekly Tasks */}
            <div>
              <div className="text-sm text-[var(--foreground-muted)] mb-4">Your Weekly Tasks:</div>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 border rounded ${
                      task.assigned
                        ? 'border-[var(--gold)]/30 bg-[var(--gold)]/10 opacity-50'
                        : 'border-white/10 hover:border-white/20 cursor-pointer'
                    }`}
                  >
                    {task.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Prompt Systems */}
            <div>
              <div className="text-sm text-[var(--foreground-muted)] mb-4">Prompt Systems:</div>
              <div className="space-y-4">
                {promptSystems.map((system) => (
                  <div
                    key={system.id}
                    className="p-6 bg-[var(--surface)] border border-white/10 rounded"
                  >
                    <div className="text-sm font-medium text-[var(--foreground)] mb-4">
                      {system.name}
                    </div>
                    {system.taskId ? (
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-[var(--gold-soft)]">
                          ✓ {tasks.find((t) => t.id === system.taskId)?.name}
                        </div>
                        <button
                          onClick={() => unassignTask(system.id)}
                          className="text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="text-xs text-[var(--foreground-muted)] mb-2">
                          Assign a task:
                        </div>
                        <div className="space-y-2">
                          {tasks
                            .filter((t) => !t.assigned)
                            .map((task) => (
                              <button
                                key={task.id}
                                onClick={() => assignTask(task.id, system.id)}
                                className="w-full text-left p-2 text-sm border border-white/10 hover:border-[var(--gold)]/30 transition-all"
                              >
                                {task.name}
                              </button>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="container mx-auto px-6 py-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="text-sm text-[var(--foreground-muted)] mb-2">Progress:</div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--gold)] transition-all duration-500"
                style={{ width: `${(completedSystems / promptSystems.length) * 100}%` }}
              />
            </div>
            <div className="text-xs text-[var(--foreground-muted)] mt-2">
              {completedSystems}/{promptSystems.length} systems created
            </div>
          </div>

          {/* Challenge & Insight */}
          <div className="p-6 bg-[var(--surface)] border border-white/10 rounded">
            <div className="text-sm font-medium text-[var(--gold-soft)] mb-2">Challenge:</div>
            <p className="text-sm text-[var(--foreground-muted)] mb-4">
              Create 2 reusable prompt systems.
            </p>
            <div className="text-sm font-medium text-[var(--gold-soft)] mb-2">Insight:</div>
            <p className="text-sm text-[var(--foreground)]">
              Systems beat random prompts. Build once, use weekly.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

