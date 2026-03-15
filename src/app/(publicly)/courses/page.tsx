'use client'

import { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Filter, 
  Sparkles, 
  ArrowUpRight, 
  Loader2, 
  LayoutGrid,
  BookOpen,
  ArrowRight
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// --- COURSE CARD COMPONENT (Elite Design) ---
function CourseCard({ course }: { course: any }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 flex flex-col h-full"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
        />
        <div className="absolute top-5 left-5 flex gap-2">
           <Badge className="bg-white/90 backdrop-blur text-slate-900 border-none font-black text-[9px] uppercase tracking-widest px-3 py-1">
             {course.level}
           </Badge>
           {course.recommended && (
             <Badge className="bg-blue-600 text-white border-none font-black text-[9px] uppercase tracking-widest px-3 py-1 shadow-lg shadow-blue-200">
               Trending
             </Badge>
           )}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
            {course.category}
          </span>
          <div className="flex items-center gap-1 text-slate-400 font-bold text-xs">
            <BookOpen size={14} /> {course.duration}
          </div>
        </div>

        <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight mb-4 group-hover:text-blue-600 transition-colors uppercase">
          {course.title}
        </h3>

        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Tuition Fee</p>
            <p className="text-xl font-black text-slate-900 tracking-tighter">₹{course.price}</p>
          </div>
          <Link href={`/courses/${course._id}`}>
            <Button size="icon" className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function CoursesExplorer() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  // 🔹 FETCH FROM BACKEND
  useEffect(() => {
    async function fetchRegistry() {
      try {
        const res = await fetch("/api/admin/courses", { cache: 'no-store' })
        const data = await res.json()
        setCourses(Array.isArray(data) ? data : (data.data || []))
      } catch (err) {
        console.error("Registry sync failed", err)
      } finally {
        setLoading(false)
      }
    }
    fetchRegistry()
  }, [])

  // 🔹 FILTER LOGIC
  const categories = ["All", ...Array.from(new Set(courses.map(c => c.category)))]
  
  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           c.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === "All" || c.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [courses, searchQuery, activeCategory])

  return (
    <div className="min-h-screen bg-[#fcfcfc] selection:bg-blue-100">
      
      {/* 🌌 HERO SECTION */}
      <section className="bg-slate-900 pt-1 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[200px] bg-blue-600/10 rounded-full blur-[120px] -z-0" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          
          
          <h1 className="text-3xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
            EXPAND YOUR <br /> <span className="text-blue-500 italic">POTENTIAL.</span>
          </h1>

          <div className="max-w-xl mx-auto relative group">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={10} />
             <input 
              type="text"
              placeholder="Search by technology, domain or level..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/10 backdrop-blur-xl rounded-[2rem] py-2 pl-16 pr-8 text-white placeholder:text-slate-500 outline-none focus:ring-4 focus:ring-blue-500/20 transition-all text-lg font-medium"
             />
          </div>
        </div>
      </section>

      {/* 🏗️ BROWSE & FILTER AREA */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Category Pill Bar */}
        <div className="flex items-center gap-4 mb-12 overflow-x-auto no-scrollbar pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 pr-6 border-r border-slate-200 shrink-0">
             <Filter size={16} className="text-slate-400" />
             <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Filter By Domain</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                : 'bg-white border border-slate-200 text-slate-500 hover:border-blue-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 🔹 COURSE GRID */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-blue-600" size={48} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Synchronizing registry nodes...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-10">
              <p className="text-sm font-bold text-slate-500">
                Displaying <span className="text-slate-900 font-black">{filteredCourses.length}</span> programs in the manifest
              </p>
              <LayoutGrid size={20} className="text-slate-300" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </AnimatePresence>
            </div>

            {/* Zero State */}
            {filteredCourses.length === 0 && (
              <div className="py-40 text-center space-y-4 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Search size={24} className="text-slate-300" />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">No Pathways Found</h3>
                 <p className="text-slate-500 text-sm">Try adjusting your query or resetting filters.</p>
                 <Button variant="link" onClick={() => {setSearchQuery(""); setActiveCategory("All")}} className="text-blue-600 font-black uppercase text-xs tracking-widest underline">
                    Reset Registry Search
                 </Button>
              </div>
            )}
          </>
        )}
      </section>

      
    </div>
  )
}