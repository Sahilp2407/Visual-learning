'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

type Task = {
  id: string
  name: string
  category: 'good' | 'bad'
  role?: string
}

export default function Module12() {
  const [isMounted, setIsMounted] = useState(false)
  const [selectedRole, setSelectedRole] = useState('HR')
  const [draggedTask, setDraggedTask] = useState<string | null>(null)
  const [aiZoneTasks, setAiZoneTasks] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [challengeActive, setChallengeActive] = useState(false)

  const aiZoneRef = useRef<HTMLDivElement>(null)

  const tasks: Task[] = [
    { id: '1', name: 'Draft email response', category: 'good', role: 'all' },
    { id: '2', name: 'Summarize meeting notes', category: 'good', role: 'all' },
    { id: '3', name: 'Approve budget request', category: 'bad', role: 'all' },
    { id: '4', name: 'Negotiate contract terms', category: 'bad', role: 'all' },
    { id: '5', name: 'Generate report outline', category: 'good', role: 'all' },
    { id: '6', name: 'Plan team strategy', category: 'bad', role: 'all' },
  ]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (challengeActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && challengeActive) {
      setChallengeActive(false)
    }
  }, [challengeActive, timeLeft])

  const startChallenge = () => {
    setChallengeActive(true)
    setTimeLeft(30)
    setScore(0)
    setAiZoneTasks([])
  }

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId)
  }

  const handleDragEnd = () => {
    setDraggedTask(null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (!draggedTask) return

    const task = tasks.find((t) => t.id === draggedTask)
    if (!task) return

    if (task.category === 'good') {
      setAiZoneTasks([...aiZoneTasks, draggedTask])
      if (challengeActive) {
        setScore(score + 1)
        // Smooth accept animation
        if (aiZoneRef.current) {
          gsap.fromTo(
            aiZoneRef.current,
            { scale: 1 },
            { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1 }
          )
        }
      }
    } else {
      // Soft rejection
      if (aiZoneRef.current) {
        gsap.fromTo(
          aiZoneRef.current,
          { x: 0 },
          { x: -10, duration: 0.1, yoyo: true, repeat: 3 }
        )
      }
    }
    setDraggedTask(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Instruction */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium mb-2 text-[var(--foreground)]">1.2 AI Task Fit</h1>
          <p className="text-sm text-[var(--foreground-muted)]">
            Drag tasks to the AI Zone. See which ones fit and which don't.
          </p>
        </div>
      </div>

      {/* Main Visual Canvas */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Task Cards */}
            <div>
              <div className="text-sm text-[var(--foreground-muted)] mb-4">Your Tasks:</div>
              <div className="space-y-3">
                {tasks
                  .filter((task) => !aiZoneTasks.includes(task.id))
                  .map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task.id)}
                      onDragEnd={handleDragEnd}
                      className="p-4 bg-[var(--surface)] border border-white/10 cursor-move hover:border-[var(--gold)]/30 transition-all"
                    >
                      {task.name}
                    </div>
                  ))}
              </div>
            </div>

            {/* AI Zone */}
            <div>
              <div className="text-sm text-[var(--foreground-muted)] mb-4">AI Zone:</div>
              <div
                ref={aiZoneRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="min-h-[400px] p-8 bg-[var(--surface)] border-2 border-dashed border-[var(--gold)]/30 rounded-lg flex flex-col gap-3"
              >
                {aiZoneTasks.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-[var(--foreground-muted)] text-sm">
                    Drag tasks here
                  </div>
                ) : (
                  aiZoneTasks.map((taskId) => {
                    const task = tasks.find((t) => t.id === taskId)
                    return (
                      <div
                        key={taskId}
                        className="p-4 bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded"
                      >
                        ✓ {task?.name}
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="container mx-auto px-6 py-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-[var(--foreground-muted)] mb-2">
                Your Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-2 bg-[var(--surface)] border border-white/10 text-[var(--foreground)]"
              >
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Ops">Operations</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            <div className="flex items-end gap-4">
              <button
                onClick={startChallenge}
                className="px-6 py-3 bg-[var(--gold)]/20 border border-[var(--gold)]/30 text-[var(--foreground)] hover:bg-[var(--gold)]/30 transition-all"
              >
                Start Challenge
              </button>
              {challengeActive && (
                <div className="text-sm">
                  <div className="text-[var(--foreground-muted)]">Time: {timeLeft}s</div>
                  <div className="text-[var(--gold-soft)]">Score: {score}/5</div>
                </div>
              )}
            </div>
          </div>

          {/* Challenge & Insight */}
          <div className="mt-8 p-6 bg-[var(--surface)] border border-white/10 rounded">
            <div className="text-sm font-medium text-[var(--gold-soft)] mb-2">Challenge:</div>
            <p className="text-sm text-[var(--foreground-muted)] mb-4">
              Sort 5 tasks correctly in under 30 seconds.
            </p>
            <div className="text-sm font-medium text-[var(--gold-soft)] mb-2">Insight:</div>
            <p className="text-sm text-[var(--foreground)]">
              AI drafts. Humans decide. Use AI for creation, not approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

