'use client'

import React, { useRef, useEffect } from 'react'
import { Search, Command, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchBarProps {
  value: string
  onChange: (val: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  // 🔹 Luxury Feature: Press Cmd/Ctrl + K to focus the search bar automatically
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="relative group w-full xl:w-[400px]">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <Search 
          className={`transition-colors duration-300 ${
            value ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
          }`} 
          size={18} 
        />
      </div>

      <input 
        ref={inputRef}
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)} // 🔹 This updates the parent state
        placeholder="Search intelligence registry..." 
        className="w-full bg-white border border-slate-200 rounded-[1.2rem] py-4 pl-14 pr-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)] focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-black text-[10px] uppercase tracking-widest placeholder:text-slate-300 placeholder:font-bold"
      />

      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
        <AnimatePresence mode="wait">
          {value ? (
            <motion.button
              key="clear"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => onChange("")} // 🔹 Clears the search
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
            >
              <X size={14} />
            </motion.button>
          ) : (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-100 rounded-md pointer-events-none"
            >
              <Command size={10} className="text-slate-400" />
              <span className="text-[9px] font-black text-slate-400 tracking-tighter">K</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🔹 Underline Expansion Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue-600 group-focus-within:w-[80%] transition-all duration-500 rounded-full" />
    </div>
  )
}