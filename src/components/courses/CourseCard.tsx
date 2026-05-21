'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, Download, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export interface Course {
  _id?: string
  id?: number
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
  // Extract initials for the instructor avatar
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'I'
  }

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col h-full relative"
    >
      {/* 🔹 Image Section with Refined Overlays */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Professional Cinematic Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          {course.recommended && (
            <Badge className="bg-amber-400 text-amber-950 hover:bg-amber-400 border-none px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
              <Sparkles size={12} className="fill-amber-950" /> Elite Choice
            </Badge>
          )}
        </div>

        {/* Bottom Image Details (Instructor & Level) */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
              {getInitials(course.instructor)}
            </div>
            <span className="text-sm font-medium text-white shadow-sm drop-shadow-md">
              {course.instructor}
            </span>
          </div>

          {course.level && (
            <span className="bg-white/20 backdrop-blur-md border border-white/30 px-2.5 py-1 rounded-md text-[10px] font-semibold text-white uppercase tracking-wider">
              {course.level}
            </span>
          )}
        </div>
      </div>

      {/* 🔹 Content Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Category & Accreditation */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-blue-600">
            {course.category}
          </span>
          <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
            <ShieldCheck size={14} /> Accredited
          </span>
        </div>

        {/* Course Title */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        {/* 🔹 Meta Stats */}
        <div className="flex items-center gap-4 text-slate-600 mb-6 mt-auto">
          <div className="flex items-center gap-1.5 text-sm font-medium">
            <Clock size={16} className="text-slate-400" />
            {course.duration}
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300" />
          <div className="flex items-center gap-1.5 text-sm font-medium">
            <Users size={16} className="text-slate-400" />
            {Number(course.enrolled).toLocaleString()} Enrolled
          </div>
        </div>

        {/* 🔹 Action Footer */}
        <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">
              Program Fee
            </p>
            <p className="text-2xl font-bold text-slate-900 tracking-tight">
              ₹{course.price}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              title="Download Syllabus"
              className="w-10 h-10 rounded-xl border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors hidden sm:flex"
            >
              <Download size={18} />
            </Button>

            <Button className="h-10 rounded-xl bg-blue-600 hover:bg-slate-900 px-5 font-semibold text-sm text-white shadow-md shadow-blue-600/20 transition-all group/btn">
              View Details
              <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CourseCard