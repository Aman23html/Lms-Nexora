'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ListFilter } from 'lucide-react'
import { Course } from './CourseCard'

interface Props {
  activeSub: string
  setSub: (sub: string) => void
  courses: Course[]
}

export default function FilterRibbon({ activeSub, setSub, courses = [] }: Props) {

  // 🔹 Advanced: Extract unique subcategories AND their course counts
  const subCategoryData = useMemo(() => {
    if (!Array.isArray(courses)) return [{ name: "All", count: 0 }]

    const counts: Record<string, number> = {}
    let total = 0

    courses.forEach(course => {
      const sub = course?.subCategory?.trim()
      if (sub && sub.toLowerCase() !== "all") {
        counts[sub] = (counts[sub] || 0) + 1
      }
      total++ // Count all valid courses for the "All" tab
    })

    // Sort alphabetically and map to an array of objects
    const sortedSubs = Object.keys(counts).sort().map(name => ({
      name,
      count: counts[name]
    }))

    return [{ name: "All", count: total }, ...sortedSubs]
  }, [courses])

  return (
    <div className="flex items-center gap-4 w-full min-w-0">
      
      {/* 🔹 Left Label (Desktop Only) */}
      <div className="hidden lg:flex items-center gap-2.5 shrink-0 border-r border-slate-200 pr-5 py-1">
        <ListFilter size={16} className="text-slate-400" />
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Specializations
        </span>
      </div>

      {/* 🔹 Scrollable Filter Chips (Fixed Overflow) */}
      {/* Added min-w-0 to the wrapper to prevent flex blowout */}
      <div className="flex-1 min-w-0 relative">
        <div className="flex items-center gap-2.5 overflow-x-auto hide-scrollbar py-1">
          {subCategoryData.map((filter) => {
            const isActive = activeSub === filter.name
            
            return (
              <button
                key={`filter-${filter.name}`}
                onClick={() => setSub(filter.name)}
                className={`
                  relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap shrink-0 border group
                  ${isActive 
                    ? "text-white border-transparent" 
                    : "text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
                  }
                `}
              >
                {/* Smooth High-Contrast Active Pill Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeRibbonTab"
                    className="absolute inset-0 bg-slate-900 rounded-full z-0 shadow-md"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-2">
                  {filter.name}
                  {/* Embedded Course Count Badge */}
                  <span className={`
                    text-[10px] px-1.5 py-0.5 rounded-full font-bold transition-colors
                    ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}
                  `}>
                    {filter.count}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
        
        {/* Subtle Right Fade Indicator (Shows it's scrollable) */}
        <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden" />
      </div>

      {/* Embedded CSS to ensure scrollbar is hidden across all browsers */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}