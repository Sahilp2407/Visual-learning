'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Grid, Search as SearchIcon, MoreVertical, LayoutGrid } from 'lucide-react'

const weeks = [
  { id: 1, title: 'Week 1', fullTitle: 'Week 1', href: '/week1' },
  { id: 2, title: 'Week 2', fullTitle: 'Week 2', href: '#' },
  { id: 3, title: 'Week 3', fullTitle: 'Week 3', href: '#' },
  { id: 4, title: 'Week 4', fullTitle: 'Week 4', href: '#' },
  { id: 5, title: 'Week 5', fullTitle: 'Week 5', href: '#' },
  { id: 6, title: 'Week 6', fullTitle: 'Week 6', href: '#' },
  { id: 7, title: 'Week 7', fullTitle: 'Week 7', href: '#' },
  { id: 8, title: 'Week 8', fullTitle: 'Week 8', href: '#' },
  { id: 9, title: 'Week 9', fullTitle: 'Week 9', href: '#' },
  { id: 10, title: 'Week 10', fullTitle: 'Week 10', href: '#' },
  { id: 11, title: 'Week 11', fullTitle: 'Week 11', href: '#' },
  { id: 12, title: 'Week 12', fullTitle: 'Week 12', href: '#' },
]

export default function SemesterDashboard() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-6 font-sans transition-colors duration-500">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-4 transition-colors">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-500 dark:text-gray-300" />
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">Semester 1</h1>
            <span className="px-2 py-0.5 bg-[#4c1d95] rounded text-xs font-bold text-gray-200">08</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:border-purple-500 w-64 transition-colors"
            />
          </div>
          <button className="p-2 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <LayoutGrid size={20} className="text-gray-400" />
          </button>
        </div>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {weeks.map((week) => (
          <Link
            href={week.href}
            key={week.id}
            className="group relative bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 transition-all duration-300 rounded-xl p-6 h-48 flex flex-col justify-between overflow-hidden shadow-lg border border-transparent hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]"
          >
            {/* Background Decoration */}
            <div className="absolute right-[-10%] bottom-[-20%] opacity-20 text-white transform rotate-12 group-hover:scale-110 transition-all duration-500">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
              </svg>
            </div>

            <div>
              <h3 className="text-lg font-bold leading-tight text-white mb-2 shadow-sm">
                {week.fullTitle}
              </h3>
            </div>

            <div className="space-y-2 relative z-10">
              <div className="flex justify-between items-end">
                <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden backdrop-blur-sm mr-4">
                  <div className="h-full w-0 bg-white rounded-full" />
                </div>
                <span className="text-xs font-bold text-white/90">0%</span>
              </div>
            </div>

            {/* Logo Mark Bottom Right */}
            <div className="absolute bottom-4 right-4 text-white/20 hover:text-white/40 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15L6.04 7.5 12 10.85l5.96-3.35L12 4.15z" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
