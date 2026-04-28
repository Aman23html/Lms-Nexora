'use client'

import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import CategorySidebar from './CategorySidebar'
import FilterRibbon from './FilterRibbon'
import SearchBar from './SearchBar'
import CourseCard, { Course } from './CourseCard'
import { Globe, Edit3, Loader2, Database, AlertCircle, SearchX, BookOpen, Layers } from 'lucide-react'

interface Props {
  onEditCourse?: (course: any) => void;
}

export default function CourseExplorer({ onEditCourse }: Props) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("All Courses")
  const [activeSub, setActiveSub] = useState("All")
  const [searchQuery, setSearchQuery] = useState("") 
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

  // 🔹 Unified Filtering Logic
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
    <section className="relative min-h-screen bg-white py-16 md:py-24 overflow-hidden">
      {/* Crisp Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 opacity-60 pointer-events-none" />
      
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLoading ? 'bg-amber-400' : 'bg-indigo-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isLoading ? 'bg-amber-500' : 'bg-indigo-600'}`}></span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-700">
                {isLoading ? "Syncing Catalog..." : "Learning Hub"}
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
              Explore The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500">
                Curriculum.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-5 lg:pl-10">
            <div className="flex items-center gap-8 lg:justify-end">
              <div className="text-left lg:text-right">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1">Available Programs</p>
                <p className="text-3xl font-black text-slate-900 tracking-tight">{isLoading ? "—" : filteredCourses.length}</p>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="text-left lg:text-right">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1">System Status</p>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${error ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                  {error ? <AlertCircle size={14}/> : <Database size={14}/>}
                  {error ? "Offline" : "Online"}
                </div>
              </div>
            </div>
            
            {/* SearchBar wrapper for styling alignment */}
            <div className="w-full">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </div>
        </div>

        {/* --- MAIN LAYOUT --- */}
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* SIDEBAR */}
          <aside className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-28 h-fit flex flex-col gap-6">
            <div className="bg-white p-2 rounded-3xl border border-slate-200 shadow-sm">
              <CategorySidebar
                active={activeTab}
                setTab={(tab) => {
                  setActiveTab(tab)
                  setActiveSub("All")
                }}
                courses={courses}
              />
            </div>

            {/* Clean Platform Status Card */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden relative group hidden lg:block">
              <div className="absolute -right-6 -bottom-6 opacity-[0.03] text-indigo-900 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                <Layers size={140} strokeWidth={1} />
              </div>
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-indigo-600 mb-4">
                <BookOpen size={20} />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Enterprise Ready</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                All courses are globally distributed and synced via our high-speed edge network.
              </p>
            </div>
          </aside>

          {/* COURSE GRID */}
          <main className="flex-1 min-w-0 w-full">
            <div className="flex flex-col gap-8">
              
              {/* Sub-category Ribbon */}
              <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
                <FilterRibbon activeSub={activeSub} setSub={setActiveSub} courses={courses} />
              </div>

              {isLoading ? (
                // SKELETON LOADER
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-[420px] w-full bg-white border border-slate-100 rounded-3xl shadow-sm p-6 space-y-6">
                        <div className="w-full h-48 bg-slate-100/80 rounded-2xl animate-pulse" />
                        <div className="space-y-3">
                          <div className="w-1/4 h-5 bg-slate-100 rounded-md animate-pulse" />
                          <div className="w-3/4 h-7 bg-slate-100 rounded-md animate-pulse" />
                        </div>
                        <div className="w-full h-16 bg-slate-50 rounded-xl animate-pulse mt-auto" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                // ERROR STATE
                <div className="py-24 flex flex-col items-center justify-center bg-rose-50/50 rounded-3xl border border-dashed border-rose-200 text-center px-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-rose-100 mb-6">
                      <AlertCircle className="text-rose-500" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Connection Interrupted</h3>
                    <p className="text-slate-500 text-sm mt-2 max-w-sm font-medium">Unable to fetch the latest curriculum data. Please check your connection and try again.</p>
                    <button onClick={fetchRegistryData} className="mt-6 bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-indigo-600 transition-colors">
                      Retry Connection
                    </button>
                </div>
              ) : (
                // ACTIVE GRID
                <motion.div 
                  layout
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredCourses.map((course, idx) => (
                      <motion.div
                        key={course._id || course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        layout
                        className="group relative cursor-pointer block h-full"
                        onClick={() => router.push(`/courses/${course._id || course.id}`)}
                      >
                        {/* Admin Edit Overlay - Refined Glassmorphism */}
                        {onEditCourse && (
                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditCourse(course);
                            }}
                            className="absolute inset-0 z-30 bg-indigo-900/5 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer rounded-3xl flex items-center justify-center border border-indigo-200"
                          >
                            <div className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-xl flex items-center gap-2 hover:scale-105 transition-transform border border-indigo-50">
                              <Edit3 size={16} /> Edit Course
                            </div>
                          </div>
                        )}
                        
                        {/* The Actual Course Card Component */}
                        <div className="h-full transition-transform duration-300 group-hover:-translate-y-1 group-active:translate-y-0 group-active:scale-[0.98]">
                          <CourseCard course={course} />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* EMPTY STATE */}
              {!isLoading && filteredCourses.length === 0 && !error && (
                <div className="py-32 flex flex-col items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 px-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                      <SearchX className="text-slate-300" size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">No courses found</h3>
                    <p className="text-sm text-slate-500 mt-2 text-center max-w-sm font-medium">We couldn't find any courses matching your current filters and search query.</p>
                    <button 
                      onClick={() => {setSearchQuery(""); setActiveTab("All Courses"); setActiveSub("All")}}
                      className="mt-8 text-indigo-600 font-bold text-sm bg-indigo-50 px-6 py-2.5 rounded-xl hover:bg-indigo-100 transition-colors"
                    >
                      Clear all filters
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