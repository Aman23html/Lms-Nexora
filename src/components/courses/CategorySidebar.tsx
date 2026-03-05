'use client'
import React from 'react'
import { ChevronRight } from 'lucide-react'

const categories = [
  "All Courses", "Generative AI", "AI & Machine Learning", "Data Science", 
  "Project Management", "Cyber Security", "Cloud Computing", "Software Development"
];

export default function CategorySidebar({ active, setTab }: { active: string, setTab: (t: string) => void }) {
  return (
    // 'sticky' keeps it fixed, 'top-24' sets the distance from the top of the screen
    // 'h-fit' is required for sticky to work in a flex/grid container
    <aside className="hidden lg:block w-72 h-fit sticky top-24 space-y-2">
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4">
        Domains
      </p>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setTab(cat)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
            active === cat 
              ? "bg-blue-600 text-white shadow-lg translate-x-2" 
              : "text-slate-600 hover:bg-white hover:text-blue-600"
          }`}
        >
          {cat}
          <ChevronRight 
            size={16} 
            className={`transition-opacity ${active === cat ? "opacity-100" : "opacity-0"}`} 
          />
        </button>
      ))}
    </aside>
  )
}