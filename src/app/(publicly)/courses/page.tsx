'use client'

import { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Filter, 
  ArrowRight,
  Sparkles,
  Clock,
  X,
  GraduationCap
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// --- TYPES & INTERFACES ---
interface Course {
  _id: string;
  title: string;
  category?: string;
  level?: string;
  recommended?: boolean;
  duration?: string;
  description?: string;
  price?: number;
  image?: string;
}

// --- FIX: Removed the explicit `: Variants` type to allow natural inference ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

// --- FIX: Removed the explicit `: Variants` type ---
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
}

// --- ELITE COURSE CARD COMPONENT ---
function CourseCard({ course }: { course: Course }) {
  return (
    <div className="group bg-white border border-slate-200/80 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 flex flex-col h-full">
      {/* Card Header / Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 p-1">
        <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
          <img 
            src={course.image || 'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=800&q=80'} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        <div className="absolute top-4 left-4 flex gap-2">
           <Badge className="bg-white/95 backdrop-blur-md text-slate-800 border-none font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 shadow-sm">
             {course.level || 'Beginner'}
           </Badge>
           {course.recommended && (
             <Badge className="bg-gradient-to-r from-blue-600 to-violet-600 text-white border-none font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 shadow-md shadow-blue-500/30 flex items-center gap-1">
               <Sparkles size={12} /> Trending
             </Badge>
           )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[11px] font-black uppercase tracking-[0.15em] text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
            {course.category || 'Technology'}
          </span>
          <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs bg-slate-50 px-3 py-1 rounded-lg">
            <Clock size={14} /> {course.duration || '8 Weeks'}
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-sm text-slate-500 line-clamp-2 mb-6 font-medium leading-relaxed">
          {course.description || "Master the fundamentals and advanced concepts to elevate your technical career to the next level."}
        </p>

        {/* Card Footer */}
        <div className="mt-auto pt-6 border-t border-slate-100 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tuition Fee</p>
            <p className="text-2xl font-black text-slate-900 tracking-tighter">
              ₹{course.price ? course.price.toLocaleString() : '0'}
            </p>
          </div>
          <Link href={`/courses/${course._id}`}>
            <Button size="icon" className="w-12 h-12 rounded-2xl bg-slate-900 text-white group-hover:bg-blue-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-slate-900/20 group-hover:shadow-blue-600/30">
              <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// --- SKELETON LOADER ---
function SkeletonCard() {
  return (
    <div className="bg-white border border-slate-100 rounded-[2rem] h-[500px] overflow-hidden flex flex-col">
      <div className="aspect-[16/10] bg-slate-100 animate-pulse m-1 rounded-[1.5rem]" />
      <div className="p-8 flex flex-col flex-1 gap-4">
        <div className="flex justify-between">
          <div className="w-24 h-6 bg-slate-100 animate-pulse rounded-lg" />
          <div className="w-20 h-6 bg-slate-100 animate-pulse rounded-lg" />
        </div>
        <div className="w-full h-8 bg-slate-100 animate-pulse rounded-lg mt-2" />
        <div className="w-3/4 h-8 bg-slate-100 animate-pulse rounded-lg" />
        <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-end">
          <div className="w-24 h-10 bg-slate-100 animate-pulse rounded-lg" />
          <div className="w-12 h-12 bg-slate-100 animate-pulse rounded-2xl" />
        </div>
      </div>
    </div>
  )
}

// --- MAIN PAGE COMPONENT ---
export default function CoursesExplorer() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  useEffect(() => {
    async function fetchRegistry() {
      try {
        const res = await fetch("/api/admin/courses", { cache: 'no-store' })
        const data = await res.json()
        setCourses(Array.isArray(data) ? data : (data?.data || []))
      } catch (err) {
        console.error("Registry sync failed", err)
      } finally {
        setLoading(false)
      }
    }
    fetchRegistry()
  }, [])

  // Safely extract unique categories
  const categories = ["All", ...Array.from(new Set(courses.map(c => c.category).filter(Boolean)))] as string[]
  
  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const titleMatch = c.title?.toLowerCase().includes(searchQuery.toLowerCase())
      const catMatch = c.category?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSearch = titleMatch || catMatch
      const matchesCategory = activeCategory === "All" || c.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [courses, searchQuery, activeCategory])

  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-blue-200 selection:text-blue-900 font-sans pb-24">
      
      {/* 🌌 HERO / SEARCH SECTION */}
      <section className="bg-white border-b border-slate-200/60 pt-20 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-[10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] opacity-60 pointer-events-none" />
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[100px] opacity-60 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs uppercase tracking-widest mb-6"
          >
            <GraduationCap size={16} /> Course Registry
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[1.05] mb-8"
          >
            Expand Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Potential.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 font-medium mb-10 max-w-2xl mx-auto"
          >
            Explore our curated selection of high-fidelity technical programs designed to accelerate your engineering career.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto relative group shadow-2xl shadow-slate-200/50 rounded-full"
          >
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
             <input 
              type="text"
              placeholder="Search by technology, domain, or framework..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-slate-100 rounded-full h-16 pl-14 pr-16 text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-base md:text-lg font-medium"
             />
             {searchQuery && (
               <button 
                 onClick={() => setSearchQuery("")}
                 className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-1 rounded-full transition-colors"
               >
                 <X size={16} />
               </button>
             )}
          </motion.div>
        </div>
      </section>

      {/* 🏗️ BROWSE & FILTER AREA */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-12">
        <div className="flex items-center gap-3 mb-12 overflow-x-auto no-scrollbar pb-4">
          <div className="flex items-center gap-2 pr-4 border-r border-slate-300 shrink-0">
             <Filter size={16} className="text-slate-500" />
             <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Filters</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat 
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105' 
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm font-semibold text-slate-500">
                Displaying <span className="text-slate-900 font-black px-1">{filteredCourses.length}</span> programs
              </p>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredCourses.map((course) => (
                  <motion.div
                    key={course._id}
                    variants={itemVariants as any} // Cast as any to bypass TS complaining about layout transitions
                    layout
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredCourses.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="py-32 text-center space-y-5 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 shadow-sm max-w-3xl mx-auto mt-10"
              >
                 <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto shadow-inner border border-slate-100">
                    <Search size={32} className="text-slate-400" />
                 </div>
                 <h3 className="text-3xl font-black text-slate-900 tracking-tight">No Pathways Found</h3>
                 <p className="text-slate-500 text-base font-medium max-w-sm mx-auto">
                   We couldn't find any courses matching "{searchQuery}". Try adjusting your query or resetting your filters.
                 </p>
                 <div className="pt-4">
                   <Button 
                     onClick={() => {setSearchQuery(""); setActiveCategory("All")}} 
                     className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 h-12 font-bold transition-all shadow-lg shadow-blue-600/20"
                   >
                     Clear All Filters
                   </Button>
                 </div>
              </motion.div>
            )}
          </>
        )}
      </section>
    </div>
  )
}