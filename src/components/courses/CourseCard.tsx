'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, Download, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export interface Course {
  _id?: string // 🔹 Added for MongoDB compatibility
  id?: number  // 🔹 Keep for legacy static data compatibility
  title: string
  category: string
  subCategory?: string
  duration: string
  enrolled: string
  price: string
  instructor: string
  image: string
  recommended?: boolean
  level?: string
}

interface CourseCardProps {
  course: Course
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <motion.div
      layout
      whileHover={{ y: -8 }} // 🔹 Smooth vertical lift on hover
      className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col h-full relative"
    >
      {/* 🔹 Image Section with Premium Overlays */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
        />

        {/* Cinematic Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Floating Tags */}
        <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
          {course.recommended && (
            <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-xl">
              <Sparkles size={12} className="text-orange-500 fill-orange-500" />
              <span className="text-[9px] font-black uppercase text-slate-800 tracking-widest">
                Elite Choice
              </span>
            </div>
          )}
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center z-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-lg text-[9px] font-black text-white uppercase tracking-[0.2em]">
            {course.instructor}
          </div>
          {course.level && (
             <Badge className="bg-blue-600/90 backdrop-blur-md text-white border-none text-[8px] font-black uppercase tracking-widest">
                {course.level}
             </Badge>
          )}
        </div>
      </div>

      {/* 🔹 Content Body */}
      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
            {course.category}
          </p>
          <div className="flex items-center gap-1.5 text-slate-400">
             <ShieldCheck size={12} className="text-emerald-500" />
             <span className="text-[9px] font-bold uppercase tracking-tighter">Accredited</span>
          </div>
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-4 line-clamp-2 leading-[1.2] group-hover:text-blue-600 transition-colors tracking-tight">
          {course.title}
        </h3>

        {/* 🔹 Meta Stats */}
        <div className="flex items-center gap-5 text-slate-500 mb-6">
          <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <Clock size={14} className="text-blue-500" strokeWidth={2.5} />
            {course.duration}
          </span>

          <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <Users size={14} className="text-orange-500" strokeWidth={2.5} />
            {course.enrolled} Enrolled
          </span>
        </div>

        {/* 🔹 Action Footer */}
        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Admission Fee
            </p>
            <p className="text-2xl font-black text-slate-900 tracking-tighter">
              ₹{course.price}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              className="rounded-2xl border-slate-100 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 w-12 h-12"
            >
              <Download size={18} />
            </Button>

            <Button className="rounded-2xl bg-slate-900 hover:bg-blue-600 px-6 h-12 font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl shadow-slate-200 group/btn">
              Explore
              <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CourseCard