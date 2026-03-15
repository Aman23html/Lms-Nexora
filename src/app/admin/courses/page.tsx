'use client'
import { signOut } from "next-auth/react"



import { useEffect, useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, Search, Trash2, Edit3, Users, Clock, IndianRupee,
  ExternalLink, ShieldCheck, RefreshCw, Loader2, Database,
  ChevronRight, AlertCircle, ArrowLeft, LogOut, LayoutDashboard,
  ChevronLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const router = useRouter()

  const fetchCourses = useCallback(async (isManual = false) => {
    try {
      if (isManual) setIsSyncing(true)
      else setIsLoading(true)

      const res = await fetch("/api/admin/courses", { 
        method: 'GET',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' }
      })
      
      const data = await res.json()
      const fetchedCourses = Array.isArray(data) ? data : (data.data || data.courses || [])
      setCourses(fetchedCourses)
    } catch (error) {
      console.error("Registry Sync Error:", error)
    } finally {
      setIsLoading(false)
      setIsSyncing(false)
    }
  }, [])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const filteredCourses = useMemo(() => {
    return courses.filter((c: any) => 
      c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [courses, searchQuery])

  async function deleteCourse(id: string) {
    if (!confirm("Decommission this pathway? This action is permanent.")) return
    
    try {
      const originalCourses = [...courses]
      setCourses(prev => prev.filter(c => c._id !== id))
      const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" })
      
      if (!res.ok) {
        setCourses(originalCourses)
        alert("Server failed to decommission resource.")
      }
    } catch (error) {
      console.error("Purge Error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pb-24 selection:bg-blue-100">
      
      {/* 🔹 ELITE ADMIN HEADER */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/admin")} 
            className="group rounded-xl text-slate-500 hover:text-blue-600 gap-2 font-bold text-xs uppercase tracking-widest px-3"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Dashboard
          </Button>
          <div className="h-4 w-[1px] bg-slate-200 mx-2" />
          <div className="flex items-center gap-2 text-slate-900 font-black tracking-tighter text-lg uppercase">
             <Database size={20} className="text-blue-600" /> Nexora <span className="text-blue-600">Inventory</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <Button 
            variant="outline" 
            size="sm" 
            onClick={() => fetchCourses(true)}
            className="hidden md:flex rounded-xl h-10 px-4 gap-2 border-slate-200 text-slate-500 hover:text-blue-600 transition-all bg-white"
           >
             <RefreshCw size={14} className={isSyncing ? "animate-spin" : ""} />
             <span className="text-[10px] font-black uppercase tracking-widest">Sync Registry</span>
           </Button>
<Button 
  onClick={() => signOut({ redirectTo: "/login" })}
  variant="ghost"
  className="rounded-xl text-red-500"
>
  Sign Out
</Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-12">
        
        {/* Path Indicator */}
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
           <span>Mainframe</span>
           <ChevronRight size={12} />
           <span className="text-slate-900">Registry Inventory</span>
        </div>

        {/* Header Section */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-16">
          <div className="space-y-3">
            <Badge className="bg-blue-50 text-blue-600 border-blue-100 rounded-lg px-3 py-1 font-black text-[9px] uppercase tracking-widest">
              Registry Version 4.0.2
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.85]">
              Active <br /><span className="text-slate-300">Inventory</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
            <div className="relative group w-full sm:w-96">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Filter pathways..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-[1.5rem] py-5 pl-14 pr-6 outline-none focus:ring-4 focus:ring-blue-100 transition-all text-sm font-bold shadow-sm"
              />
            </div>
            
            <Button 
              onClick={() => router.push("/admin/courses/create")}
              className="w-full sm:w-auto bg-slate-900 hover:bg-blue-600 text-white h-[68px] px-10 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center gap-3"
            >
              <Plus size={20} strokeWidth={3} /> Initialize Pathway
            </Button>
          </div>
        </div>

        {/* 🔹 Main Content Area */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[3rem] border border-slate-100 border-dashed">
            <Loader2 className="animate-spin text-blue-600 mb-6" size={48} />
            <p className="font-black uppercase tracking-[0.3em] text-xs text-slate-400">Syncing Intelligence Nodes...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course: any, idx: number) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.01 }}
                  key={course._id}
                  className="bg-white border border-slate-100 rounded-[2.5rem] p-6 flex flex-col lg:flex-row items-center justify-between gap-8 hover:shadow-2xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-100 group-hover:bg-blue-600 transition-colors" />

                  <div className="flex items-center gap-8 w-full lg:w-[45%]">
                    <div className="w-24 h-24 rounded-[2rem] overflow-hidden shrink-0 border-4 border-slate-50 shadow-inner bg-slate-50">
                      <img src={course.image} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" alt="" />
                    </div>
                    <div className="space-y-2 min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="font-black text-slate-900 tracking-tighter text-2xl leading-none truncate max-w-[300px]">
                          {course.title}
                        </h2>
                        {course.isAvailableSoon ? (
                          <Badge className="bg-orange-500 text-white border-none font-black text-[8px] uppercase tracking-widest px-2 py-1 rounded-md">Queue</Badge>
                        ) : (
                          <Badge className="bg-emerald-500 text-white border-none font-black text-[8px] uppercase tracking-widest px-2 py-1 rounded-md shadow-lg shadow-emerald-100">Live</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        <span className="text-blue-600/80">{course.category}</span>
                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span className="flex items-center gap-1"><Users size={12}/> {course.instructor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden xl:grid grid-cols-2 gap-12 flex-1 px-12 border-x border-slate-50">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">Valuation</p>
                      <p className="text-xl font-black text-slate-900 tracking-tighter">₹{course.price}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">Duration</p>
                      <p className="text-xl font-black text-slate-900 tracking-tighter">{course.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full lg:w-auto shrink-0 justify-end">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(`/courses/${course._id}`, '_blank')}
                      className="text-slate-400 hover:text-blue-600 border-slate-100 hover:border-blue-200 rounded-[1.2rem] h-14 w-14 transition-all shadow-sm bg-white"
                    >
                      <ExternalLink size={20} strokeWidth={1.5} />
                    </Button>
                    
                    <Button
                      onClick={() => router.push(`/admin/courses/${course._id}`)}
                      className="bg-slate-50 hover:bg-slate-950 text-slate-900 hover:text-white border-transparent rounded-[1.2rem] h-14 px-8 font-black text-[11px] uppercase tracking-widest transition-all shadow-sm"
                    >
                      Modify
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => deleteCourse(course._id)}
                      className="text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-[1.2rem] h-14 w-14 transition-all"
                    >
                      <Trash2 size={20} strokeWidth={1.5} />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!isLoading && filteredCourses.length === 0 && (
          <div className="py-40 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[4rem] bg-white/50 text-center px-6">
            <AlertCircle className="text-slate-200 mb-6" size={64} />
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">No Matching Pathways</h3>
            <p className="text-slate-500 font-medium mt-2 max-w-sm">The current filter parameters yielded zero results from the registry.</p>
            <Button 
              variant="link" 
              onClick={() => setSearchQuery("")} 
              className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs mt-6 border-b-2 border-blue-600 rounded-none pb-1 h-auto px-0"
            >
              Reset Intelligence Query
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}