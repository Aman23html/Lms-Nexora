'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, Zap } from 'lucide-react'
import { Course } from './CourseCard'

interface Props {
  activeSub: string
  setSub: (sub: string) => void
  courses: Course[]
}

export default function FilterRibbon({ activeSub, setSub, courses = [] }: Props) {

  // 🔹 FIXED: Safely extract unique subcategories and ensure "All" is unique
  const subFilters = useMemo(() => {
    if (!Array.isArray(courses)) return ["All"]

    const uniqueSubs = new Set<string>()
    
    courses.forEach(course => {
      // Trim and ensure we don't add "All" from data since we add it manually
      const sub = course?.subCategory?.trim()
      if (sub && sub.toLowerCase() !== "all") {
        uniqueSubs.add(sub)
      }
    })

    // Return "All" as the first element, followed by alphabetically sorted subcategories
    return ["All", ...Array.from(uniqueSubs).sort()]
  }, [courses])

  const visibleCount = useMemo(() => {
    if (!Array.isArray(courses)) return 0
    return activeSub === "All" 
      ? courses.length 
      : courses.filter(c => c?.subCategory === activeSub).length
  }, [courses, activeSub])

  return (
    <div className="flex items-center gap-6 w-full group/ribbon">
      
      <div className="hidden lg:flex items-center gap-3 shrink-0 border-r border-slate-100 pr-6">
        <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-200">
          <SlidersHorizontal size={14} />
        </div>
        <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.3em]">
          Sub-registry
        </p>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 flex-1">
        {subFilters.map((filter) => {
          const isActive = activeSub === filter
          
          return (
            <button
              key={`filter-${filter}`} // 🔹 Added prefix to ensure keys are unique strings
              onClick={() => setSub(filter)}
              className={`
                relative px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap
                ${isActive ? "text-white" : "text-slate-500 hover:text-blue-600 hover:bg-slate-50"}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeRibbonTab"
                  className="absolute inset-0 bg-blue-600 rounded-2xl z-0 shadow-xl shadow-blue-100"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <span className="relative z-10 flex items-center gap-2">
                {isActive && <Zap size={10} className="text-blue-200 fill-blue-200 animate-pulse" />}
                {filter}
              </span>

              {!isActive && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          )
        })}
      </div>

      <div className="hidden xl:flex items-center gap-2 pl-6 border-l border-slate-100 shrink-0">
         <div className="text-right">
            <p className="text-[8px] font-black text-slate-300 uppercase">Visible</p>
            <p className="text-xs font-black text-slate-900 leading-none">
                {visibleCount}
            </p>
         </div>
      </div>

    </div>
  )
}