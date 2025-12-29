'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SimulatorSidebar from '../components/SimulatorSidebar'
import EntryTransition from '../components/EntryTransition'
import InsightReveal from '../components/InsightReveal'
import Topic1_WhatIsLLM from '../components/Topic1_WhatIsLLM'
import Topic2_TrainingData from '../components/Topic2_TrainingData'
import Topic3_Tokens from '../components/Topic3_Tokens'
import Topic4_Memory from '../components/Topic4_Memory'
import Topic5_Hallucinations from '../components/Topic5_Hallucinations'
import StageIndicator from '../components/StageIndicator'

export default function Week1Page() {
  const [isSimulatorActive, setIsSimulatorActive] = useState(false)
  const [complete, setComplete] = useState(false)

  // State for Topic Management
  const [activeTopicId, setActiveTopicId] = useState('1')
  const [unlockedTopicIds, setUnlockedTopicIds] = useState(['1'])

  // State for Stage Indicator
  const [currentStage, setCurrentStage] = useState<'READ' | 'VISUAL' | 'SIMULATOR'>('READ')

  const handleTopicComplete = (currentId: string) => {
    // Calculate next ID
    const nextId = (parseInt(currentId) + 1).toString()

    // Unlock next topic if valid and not already unlocked
    if (!unlockedTopicIds.includes(nextId) && nextId <= '5') {
      setUnlockedTopicIds(prev => [...prev, nextId])
    }

    // Optional: Auto-switch to next topic or just show completion feedback
    // For now, let's keep it on the current screen until user navigates
    setComplete(true)
  }

  // Render the correct canvas based on active topic
  const renderCanvas = () => {
    switch (activeTopicId) {
      case '1':
        return <Topic1_WhatIsLLM onComplete={() => handleTopicComplete('1')} onStageChange={setCurrentStage} />
      case '2':
        return <Topic2_TrainingData onComplete={() => handleTopicComplete('2')} />
      case '3':
        return <Topic3_Tokens onComplete={() => handleTopicComplete('3')} />
      case '4':
        return <Topic4_Memory onComplete={() => handleTopicComplete('4')} />
      case '5':
        return <Topic5_Hallucinations onComplete={() => handleTopicComplete('5')} />
      default:
        return <div className="flex items-center justify-center h-full text-[var(--foreground-muted)]">Topic {activeTopicId} Loading...</div>
    }
  }

  return (
    <EntryTransition onComplete={() => setIsSimulatorActive(true)}>
      <div className="relative w-full h-screen bg-[var(--background)] overflow-hidden flex">

        {/* BACKGROUND AMBIENCE */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="ambient-glow opacity-30" />
          <div className="grain-texture opacity-10" />
        </div>

        <AnimatePresence>
          {isSimulatorActive && (
            <>
              {/* LEFT SIDEBAR - COMPASS */}
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-20 h-full"
              >
                <SimulatorSidebar
                  activeTopicId={activeTopicId}
                  unlockedTopicIds={unlockedTopicIds}
                  onSelectTopic={setActiveTopicId}
                />
              </motion.div>

              {/* MAIN CANVAS - H-D-E-C-A ENGINE */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="flex-1 relative z-10 flex flex-col"
              >
                {/* Header Chrome */}
                <div className="flex justify-between items-center px-8 py-6 border-b border-gray-200">
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-medium">System v2.0 // Active</div>

                  {/* Stage Indicator */}
                  <StageIndicator currentStage={currentStage} />

                  <div className="text-xs uppercase tracking-wider text-[var(--gold)] font-medium">Latency: Optimal</div>
                </div>

                {/* The Content Engine */}
                <div className="flex-1 overflow-y-auto">
                  {renderCanvas()}
                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Success / Completion Overlay */}
        <AnimatePresence>
          {complete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-50 bg-[var(--background)]/90 backdrop-blur-md flex items-center justify-center"
            >
              <div className="text-center relative z-50">
                <InsightReveal />
                <h1 className="text-4xl font-light mb-8 mt-4">Topic Complete</h1>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setComplete(false)}
                    className="px-8 py-3 border border-[var(--foreground)] rounded-full hover:bg-[var(--foreground-muted)]/10 transition-all"
                  >
                    Stay Here
                  </button>
                  {(unlockedTopicIds.includes((parseInt(activeTopicId) + 1).toString())) && (
                    <button
                      onClick={() => {
                        setComplete(false)
                        setActiveTopicId((parseInt(activeTopicId) + 1).toString())
                      }}
                      className="px-8 py-3 bg-[var(--foreground)] text-white rounded-full hover:bg-[var(--charcoal)] transition-all shadow-lg"
                    >
                      Next Topic →
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </EntryTransition>
  )
}
