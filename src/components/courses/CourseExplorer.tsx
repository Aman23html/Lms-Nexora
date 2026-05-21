'use client'

import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import CategorySidebar from './CategorySidebar'
import FilterRibbon from './FilterRibbon'
import SearchBar from './SearchBar'
import CourseCard, { Course } from './CourseCard'
import { Globe, Edit3, Loader2, Database, AlertCircle, SearchX, BookOpen, Layers, Settings2 } from 'lucide-react'

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
      if (!res.ok) throw new Error("Catalog sync failed")
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
// 🔹 Unified Filtering Logic (Deep Search)
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      // 1. Sidebar Category Filter
      const matchTab = activeTab === "All Courses" || course.category === activeTab
      
      // 2. Ribbon Sub-Category Filter
      const matchSub = activeSub === "All" || course.subCategory === activeSub
      
      // 3. Search Query Filter (Deep Search)
      const query = searchQuery.toLowerCase().trim()
      
      // Check title, instructor, category, subcategory, AND skills covered
      const matchSearch = !query || 
                          course.title?.toLowerCase().includes(query) || 
                          course.instructor?.toLowerCase().includes(query) ||
                          course.category?.toLowerCase().includes(query) ||
                          course.subCategory?.toLowerCase().includes(query) ||
                          course.details?.skillsCovered?.some((skill: string) => skill.toLowerCase().includes(query))

      return matchTab && matchSub && matchSearch
    })
  }, [activeTab, activeSub, searchQuery, courses])

  return (
    <section className="relative min-h-screen bg-[#F9FAFB] py-12 md:py-20 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          
          <div className="space-y-4 max-w-2xl">
            {/* Status Pill */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-white border border-slate-200 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLoading ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isLoading ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-700">
                {isLoading ? "Syncing Catalog" : "Live Curriculum"}
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Explore Our <span className="text-blue-600">Programs.</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed">
              Discover industry-validated courses designed to accelerate your career trajectory and build real-world expertise.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-5 lg:w-80 shrink-0">
            {/* Metrics */}
            <div className="flex items-center gap-6 sm:justify-end">
              <div className="text-left sm:text-right">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-0.5">Programs</p>
                <p className="text-2xl font-bold text-slate-900 leading-none">{isLoading ? "—" : filteredCourses.length}</p>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-left sm:text-right">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Status</p>
                <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${error ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                  {error ? <AlertCircle size={12}/> : <Database size={12}/>}
                  {error ? "Offline" : "Online"}
                </div>
              </div>
            </div>
            
           {/* Search Bar Component */}
<div className="w-full relative shadow-sm rounded-xl">
  <SearchBar value={searchQuery} onChange={setSearchQuery} />
</div>
          </div>
        </div>

        {/* --- MAIN LAYOUT --- */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* SIDEBAR */}
          <aside className="w-full lg:w-[260px] shrink-0 lg:sticky lg:top-24 h-fit flex flex-col gap-6">
            <CategorySidebar
              active={activeTab}
              setTab={(tab) => {
                setActiveTab(tab)
                setActiveSub("All")
              }}
              courses={courses}
            />

            {/* Admin Tool Box (Visible only if onEditCourse is provided) */}
            {onEditCourse && (
               <div className="p-5 bg-white border border-blue-200 rounded-xl shadow-sm relative group hidden lg:block">
                 <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                   <Settings2 size={16} />
                 </div>
                 <h4 className="text-sm font-bold text-slate-900 mb-1">Admin Mode Active</h4>
                 <p className="text-xs text-slate-500 font-medium leading-relaxed">
                   Click on any course card in the grid to open the revision editor.
                 </p>
               </div>
            )}
          </aside>

          {/* COURSE GRID */}
          <main className="flex-1 min-w-0 w-full">
            <div className="flex flex-col gap-6">
              
              {/* Sub-category Ribbon */}
              <FilterRibbon activeSub={activeSub} setSub={setActiveSub} courses={courses} />

              {isLoading ? (
                // SKELETON LOADER
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-[400px] w-full bg-white border border-slate-200 rounded-2xl p-5 flex flex-col">
                        <div className="w-full h-40 bg-slate-100 rounded-xl animate-pulse mb-5" />
                        <div className="w-1/3 h-4 bg-slate-100 rounded animate-pulse mb-3" />
                        <div className="w-full h-6 bg-slate-100 rounded animate-pulse mb-2" />
                        <div className="w-2/3 h-6 bg-slate-100 rounded animate-pulse mb-6" />
                        
                        <div className="mt-auto flex justify-between items-end">
                           <div className="w-1/4 h-8 bg-slate-100 rounded animate-pulse" />
                           <div className="w-1/3 h-10 bg-slate-100 rounded-lg animate-pulse" />
                        </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                // ERROR STATE
                <div className="py-20 flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 shadow-sm text-center px-6">
                    <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4">
                      <AlertCircle className="text-rose-500" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Catalog Sync Failed</h3>
                    <p className="text-slate-500 text-sm mt-2 max-w-sm font-medium leading-relaxed">
                      Unable to fetch the latest course data. Please verify your connection or contact support if the issue persists.
                    </p>
                    <button
                      type="button"
                      onClick={fetchRegistryData}
                      className="mt-6 bg-slate-900 text-white hover:bg-blue-600 px-6 rounded-lg font-semibold text-sm transition-colors"
                    >
                      Retry Connection
                    </button>
                </div>
              ) : (
                // ACTIVE GRID
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredCourses.map((course, idx) => (
                      <motion.div
                        key={course._id || course.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        layout
                        className="group relative cursor-pointer block h-full"
                        onClick={() => router.push(`/courses/${course._id || course.id}`)}
                      >
                        {/* Admin Edit Overlay */}
                        {onEditCourse && (
                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditCourse(course);
                            }}
                            className="absolute inset-0 z-30 bg-blue-900/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer rounded-2xl flex items-center justify-center"
                          >
                            <div className="bg-white text-blue-600 px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 hover:scale-105 transition-transform border border-blue-100">
                              <Edit3 size={14} /> Edit Course
                            </div>
                          </div>
                        )}
                        
                        {/* The Actual Course Card Component */}
                        <div className="h-full">
                          <CourseCard course={course} />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* EMPTY STATE */}
              {!isLoading && filteredCourses.length === 0 && !error && (
                <div className="py-24 flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 shadow-sm px-6">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                      <SearchX className="text-slate-400" size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">No programs found</h3>
                    <p className="text-sm text-slate-500 mt-2 text-center max-w-sm font-medium">
                      We couldn't find any courses matching your current filters or search query.
                    </p>
                    <button
                      type="button"
                      onClick={() => {setSearchQuery(""); setActiveTab("All Courses"); setActiveSub("All")}}
                      className="mt-6 rounded-lg text-blue-600 border border-blue-200 hover:bg-blue-50 font-semibold"
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