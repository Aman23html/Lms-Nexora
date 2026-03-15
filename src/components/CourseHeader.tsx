'use client'

import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CourseHeaderProps {
  category: string
}

export default function CourseHeader({ category }: CourseHeaderProps) {
  const router = useRouter()

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-[110] px-6 py-4 shadow-sm lg:relative lg:shadow-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* 🔹 Dynamic Back Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()} 
            className="group rounded-xl text-slate-500 hover:text-blue-600 gap-2 font-bold text-xs uppercase tracking-widest px-2"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>

          <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
            <Link href="/" className="hover:text-slate-500 transition-colors">Nexora</Link>
            <ChevronRight size={10} />
            <span className="text-slate-900">{category}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="hidden sm:flex flex-col text-right">
              <p className="text-[9px] font-black text-slate-400 uppercase leading-none">Status</p>
              <p className="text-[11px] font-bold text-emerald-500 uppercase">Admission Open</p>
           </div>
           <div className="h-8 w-[1px] bg-slate-100 mx-2 hidden sm:block" />
           <Link href="/contactus">
             <Button className="bg-blue-600 hover:bg-slate-900 text-white h-10 px-6 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all">
                Get Syllabus
             </Button>
           </Link>
        </div>
      </div>
    </header>
  )
}