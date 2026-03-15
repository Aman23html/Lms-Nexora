'use client'

import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import CategorySidebar from './CategorySidebar'
import FilterRibbon from './FilterRibbon'
import SearchBar from './SearchBar'
import CourseCard, { Course } from './CourseCard'
import { Globe, Edit3, Loader2, Database, AlertCircle, SearchX } from 'lucide-react'

interface Props {
  onEditCourse?: (course: any) => void;
}

export default function CourseExplorer({ onEditCourse }: Props) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("All Courses")
  const [activeSub, setActiveSub] = useState("All")
  const [searchQuery, setSearchQuery] = useState("") // 🔹 New state for search
  const [courses, setCourses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchRegistryData = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/admin/courses", { cache: 'no-store' })
      if (!res.ok) throw new Error("Registry sync failed")
      const data = await res.json()
      const fetchedCourses = Array.isArray(data) ? data : (data.data || data.courses || [])
      setCourses(fetchedCourses)
      setError(false)
    } catch (err) {
      console.error("Fetch Error:", err)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRegistryData()
  }, [fetchRegistryData])

  // 🔹 Unified Intelligence Filtering Logic
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      // 1. Sidebar Category Filter
      const matchTab = activeTab === "All Courses" || course.category === activeTab
      
      // 2. Ribbon Sub-Category Filter
      const matchSub = activeSub === "All" || course.subCategory === activeSub
      
      // 3. Search Query Filter (Title or Instructor)
      const query = searchQuery.toLowerCase()
      const matchSearch = !searchQuery || 
                          course.title?.toLowerCase().includes(query) || 
                          course.instructor?.toLowerCase().includes(query)

      return matchTab && matchSub && matchSearch
    })
  }, [activeTab, activeSub, searchQuery, courses])

  return (
    <section className="relative min-h-screen bg-[#fafafa] py-12 md:py-20 xl:py-24 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-blue-50/60 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-orange-50/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 xl:px-12">
        
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-12 items-end mb-16 xl:mb-20">
          <div className="xl:col-span-8 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white shadow-sm border border-slate-100"
            >
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isLoading ? 'bg-orange-400' : 'bg-blue-400'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isLoading ? 'bg-orange-600' : 'bg-blue-600'}`}></span>
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                {isLoading ? "Synchronizing Manifest..." : "Intelligence Hub"}
              </span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              Forge Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500">Expertise</span>
            </h2>
          </div>

          <div className="xl:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-8 mb-4 xl:justify-end">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Available</p>
                <p className="text-2xl font-black text-slate-900 tracking-tighter">{isLoading ? "---" : filteredCourses.length}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</p>
                <p className={`text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded border ${error ? 'text-red-500 border-red-100' : 'text-emerald-500 border-emerald-100'}`}>
                    {error ? "Offline" : "Live"}
                </p>
              </div>
            </div>
            {/* 🔹 Fixed SearchBar Integration */}
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">
          <aside className="w-full lg:w-[280px] xl:w-[320px] lg:sticky lg:top-28 h-fit">
            <div className="bg-white/40 backdrop-blur-md p-2 rounded-[2.5rem] border border-white/50 shadow-sm">
              <CategorySidebar
                active={activeTab}
                setTab={(tab) => {
                  setActiveTab(tab)
                  setActiveSub("All")
                }}
                courses={courses}
              />
            </div>
            <div className="mt-8 p-10 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative group hidden lg:block shadow-2xl shadow-slate-200">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                <Globe size={100} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4">Registry Node</p>
              <h4 className="text-xl font-bold mb-4 tracking-tight leading-tight uppercase">Database Synchronized</h4>
              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold">
                 <Database size={12} /> Multi-Region Active
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0 w-full">
            <div className="flex flex-col gap-10">
              <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm overflow-x-auto no-scrollbar">
                <FilterRibbon activeSub={activeSub} setSub={setActiveSub} courses={courses} />
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-[450px] w-full bg-white border border-slate-100 rounded-[3rem] animate-pulse p-8 space-y-6">
                        <div className="w-full h-52 bg-slate-100 rounded-[2rem]" />
                        <div className="w-2/3 h-8 bg-slate-100 rounded-lg" />
                        <div className="w-full h-24 bg-slate-50 rounded-2xl" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="py-24 flex flex-col items-center justify-center bg-white rounded-[4rem] border-2 border-dashed border-red-100 text-center">
                    <AlertCircle className="text-red-500 mb-4" size={56} />
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Connection Interrupted</h3>
                    <p className="text-slate-500 text-sm mt-3 max-w-xs">The engine was unable to establish a link with the course registry.</p>
                </div>
              ) : (
                <motion.div 
                  layout
                  transition={{ type: "spring", stiffness: 80, damping: 20 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-8 xl:gap-10"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredCourses.map((course, idx) => (
                      <motion.div
                        key={course._id || course.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        layout
                        className="group relative cursor-pointer active:scale-95 transition-transform"
                        onClick={() => router.push(`/courses/${course._id || course.id}`)}
                      >
                        {onEditCourse && (
                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditCourse(course);
                            }}
                            className="absolute inset-0 z-30 bg-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-[3rem] flex items-center justify-center backdrop-blur-[2px] border-2 border-dashed border-orange-400"
                          >
                            <div className="bg-white text-orange-600 px-6 py-3 rounded-2xl font-black text-[11px] uppercase shadow-2xl flex items-center gap-2">
                              <Edit3 size={16} /> Edit manifest
                            </div>
                          </div>
                        )}
                        <CourseCard course={course} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {!isLoading && filteredCourses.length === 0 && (
                <div className="py-40 flex flex-col items-center justify-center bg-white/50 rounded-[4rem] border-2 border-dashed border-slate-200">
                    <SearchX className="text-slate-200 mb-6" size={64} />
                    <h3 className="text-xl font-black text-slate-400 uppercase tracking-[0.3em]">No Manifests Match Query</h3>
                    <button 
                      onClick={() => {setSearchQuery(""); setActiveTab("All Courses"); setActiveSub("All")}}
                      className="mt-6 text-blue-600 font-black text-[10px] uppercase tracking-widest border-b-2 border-blue-600 pb-1 hover:text-slate-900 hover:border-slate-900 transition-all"
                    >
                      Reset Intelligence Parameters
                    </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </section>
  )
}