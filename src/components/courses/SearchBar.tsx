'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Search, Command, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchBarProps {
  value: string
  onChange: (val: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isMac, setIsMac] = useState(false)

  // Detect OS for the shortcut hint (Cmd vs Ctrl)
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [])

  // Luxury Feature: Press Cmd/Ctrl + K to focus the search bar automatically
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

  // 🔹 FIX 1: Handle form submit to dismiss mobile keyboards smoothly
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    inputRef.current?.blur() // Dismiss keyboard on enter
  }

  return (
    <form onSubmit={handleSubmit} className="relative group w-full">
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <Search 
          className={`transition-colors duration-200 ${
            value ? 'text-blue-600' : 'text-slate-400 group-focus-within:text-slate-600'
          }`} 
          size={18} 
        />
      </div>

      {/* 🔹 FIX 2: Changed to type="search" for native mobile UI benefits */}
      <input 
        ref={inputRef}
        type="search" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search courses, skills, or instructors..." 
        className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-11 pr-16 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-sm font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-medium [&::-webkit-search-cancel-button]:hidden"
      />

      {/* Right Side Actions (Clear / Shortcut Hint) */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
        <AnimatePresence mode="wait">
          {value ? (
            <motion.button
              key="clear"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              type="button"
              // 🔹 FIX 3: Use onPointerDown to prevent the input from blurring before the click registers
              onPointerDown={(e) => {
                e.preventDefault()
                onChange("")
                inputRef.current?.focus()
              }}
              className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Clear search"
            >
              <X size={16} />
            </motion.button>
          ) : (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="hidden sm:flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-400 pointer-events-none select-none shadow-sm"
            >
              {isMac ? <Command size={12} /> : <span className="text-[10px] font-bold">Ctrl</span>}
              <span className="text-xs font-bold leading-none">K</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}