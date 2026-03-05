'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, Download, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface Course {
  id: number;
  title: string;
  category: string;
  subCategory?: string; // e.g., 'ML using python', 'CAMP'
  duration: string;
  enrolled: string;
  price: string;
  instructor: string;
  image: string;
  recommended: boolean;
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] transition-all duration-500 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={course.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80" />
        
        {course.recommended && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-2 shadow-sm z-10">
            <Sparkles size={12} className="text-blue-600 fill-blue-600" />
            <span className="text-[10px] font-black uppercase text-slate-800 tracking-tight">Recommended</span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 flex items-center gap-2">
           <div className="bg-white/10 backdrop-blur-md border border-white/20 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">
             {course.instructor}
           </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-slate-400 mb-3">
          <span className="flex items-center gap-1 text-[11px] font-bold"><Clock size={14} className="text-blue-500" /> {course.duration}</span>
          <span className="flex items-center gap-1 text-[11px] font-bold"><Users size={14} className="text-orange-500" /> {course.enrolled}</span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-4 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Course Tuition</p>
            <p className="text-xl font-black text-slate-900">₹{course.price}</p>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" className="rounded-xl border-slate-200 hover:bg-blue-50 transition-colors">
              <Download size={18} className="text-slate-600" />
            </Button>
            <Button className="rounded-xl bg-slate-900 hover:bg-blue-600 px-4 font-bold transition-all active:scale-95 shadow-lg shadow-slate-200">
              View <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}