'use client'

import React from 'react'
import CourseExplorer from './courses/CourseExplorer'

export default function TopProgram() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-[1440px] mx-auto px-6">
        <CourseExplorer />
      </div>
    </section>
  )
}