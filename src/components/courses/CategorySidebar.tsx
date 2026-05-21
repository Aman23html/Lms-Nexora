'use client'

import React, { useMemo } from 'react'
import { ChevronRight, Layers, BookOpen, Compass, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Course {
  category: string;
  [key: string]: any;
}

interface SidebarProps {
  active: string
  setTab: (tab: string) => void
  courses: Course[]
}

export default function CategorySidebar({ active, setTab, courses }: SidebarProps) {
  
  // 🔹 Memoize categories AND calculate course counts per category
  const categoryData = useMemo(() => {
    // 1. Calculate frequencies
    const counts = courses.reduce((acc: Record<string, number>, course) => {
      if (course.category) {
        acc[course.category] = (acc[course.category] || 0) + 1
      }
      return acc
    }, {})

    // 2. Extract unique sorted categories
    const uniqueCategories = Object.keys(counts).sort()

    // 3. Construct final array with "All Courses" at the top
    return [
      { name: "All Courses", count: courses.length },
      ...uniqueCategories.map(cat => ({ name: cat, count: counts[cat] }))
    ]
  }, [courses])

  return (
    <aside className="w-full flex flex-col gap-8 transition-all duration-500">
      
      {/* 🔹 Navigation Section */}
      <div className="space-y-4">
        {/* Section Header */}
        <div className="flex items-center gap-2.5 px-2">
          <Layers size={18} className="text-blue-600" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Browse Programs
          </h3>
        </div>

        {/* Category List */}
        <nav className="flex flex-col gap-1 relative">
          {categoryData.map((cat) => {
            const isActive = active === cat.name
            
            return (
              <button
                key={cat.name}
                onClick={() => setTab(cat.name)}
                className={`
                  relative w-full flex items-center justify-between px-4 py-3.5 text-sm font-semibold transition-colors duration-300 rounded-xl overflow-hidden group
                  ${isActive 
                    ? "text-blue-700" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }
                `}
              >
                {/* 🔹 Smooth Sliding Active Background */}
                {isActive && (
                  <motion.div 
                    layoutId="activeSidebarTab"
                    className="absolute inset-0 bg-blue-50/80 border-l-[3px] border-blue-600 z-0"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Left Side: Icon & Name */}
                <div className="relative z-10 flex items-center gap-3 truncate">
                  {cat.name === "All Courses" ? (
                    <Compass size={16} className={isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600 transition-colors"} />
                  ) : (
                    <BookOpen size={16} className={isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600 transition-colors"} />
                  )}
                  <span className="truncate">{cat.name}</span>
                </div>

                {/* Right Side: Count Badge & Arrow */}
                <div className="relative z-10 flex items-center gap-3">
                  {/* Dynamic Course Count Badge */}
                  <span className={`
                    text-xs font-bold px-2.5 py-0.5 rounded-full transition-colors
                    ${isActive ? "bg-blue-100/50 text-blue-600" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"}
                  `}>
                    {cat.count}
                  </span>

                  <ChevronRight 
                    size={16} 
                    className={`
                      transition-all duration-300 
                      ${isActive 
                        ? "text-blue-600 translate-x-0 opacity-100" 
                        : "text-slate-400 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }
                    `} 
                  />
                </div>
              </button>
            )
          })}
        </nav>
      </div>

      {/* 🔹 Professional EdTech Helper Widget */}
      <div className="mx-2 mt-4">
        <div className="p-6 bg-slate-900 rounded-[1.5rem] relative overflow-hidden group">
          {/* Decorative Background Blur */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/30 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150" />
          
          <div className="relative z-10 space-y-4">
            <h4 className="text-base font-bold text-white tracking-tight">Need guidance?</h4>
            <p className="text-xs font-medium text-slate-400 leading-relaxed">
              Not sure which program aligns with your career goals? Speak with an academic advisor.
            </p>
            <Link href="/contactus" className="inline-flex">
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors mt-2">
                Contact Admissions <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </div>

    </aside>
  )
}