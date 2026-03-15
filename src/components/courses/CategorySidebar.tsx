'use client'

import React, { useMemo } from 'react'
import { ChevronRight, LayoutGrid, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

interface SidebarProps {
  active: string
  setTab: (tab: string) => void
  courses: { category: string }[]
}

export default function CategorySidebar({ active, setTab, courses }: SidebarProps) {
  
  // 🔹 Memoize categories so they don't jump/recalculate on every render
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(courses.map(c => c.category))).filter(Boolean)
    return ["All Courses", ...uniqueCategories]
  }, [courses])

  return (
    <aside className="w-full h-fit transition-all duration-500">
      
      {/* Sidebar Label */}
      <div className="flex items-center justify-between px-5 mb-6">
        <div className="flex items-center gap-2">
          <LayoutGrid size={14} className="text-blue-600" />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
            Intelligence Domains
          </p>
        </div>
        {active !== "All Courses" && (
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
          />
        )}
      </div>

      {/* Navigation List */}
      <div className="space-y-1">
        {categories.map((cat) => {
          const isActive = active === cat
          
          return (
            <button
              key={cat}
              onClick={() => setTab(cat)}
              className={`
                w-full flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-500 group relative overflow-hidden
                ${isActive 
                  ? "text-white" 
                  : "text-slate-500 hover:text-blue-600 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50"
                }
              `}
            >
              {/* Active Background Slide Effect */}
              {isActive && (
                <motion.div 
                  layoutId="activeSidebarTab"
                  className="absolute inset-0 bg-slate-900 shadow-2xl shadow-slate-300 z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <span className="relative z-10 truncate pr-4 flex items-center gap-2">
                {isActive && <Zap size={12} className="text-blue-400 animate-pulse" />}
                {cat}
              </span>

              <ChevronRight 
                size={16} 
                className={`
                  relative z-10 transition-all duration-500 
                  ${isActive 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
                  }
                `} 
              />
            </button>
          )
        })}
      </div>

      {/* Visual Footer for Sidebar */}
      <div className="mt-10 px-5">
        <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-[2rem] space-y-3">
           <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">System Status</p>
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Registry Live</p>
           </div>
        </div>
      </div>

    </aside>
  )
}