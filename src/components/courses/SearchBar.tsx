'use client'
import React from 'react'
import { Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <div className="relative group w-full md:w-96">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
      <input 
        type="text" 
        placeholder="Search certifications..." 
        className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 shadow-sm focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium"
      />
    </div>
  )
}