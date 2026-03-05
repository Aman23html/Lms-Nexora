'use client'
import React from 'react'

const subFilters = ["All", "ML using python", "Power BI", "MySQL", "python", "Tableau", "PMP", "CAMP", "CISSP"];

interface Props {
  activeSub: string;
  setSub: (sub: string) => void;
}

export default function FilterRibbon({ activeSub, setSub }: Props) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-2">
      {subFilters.map((filter) => (
        <button
          key={filter}
          onClick={() => setSub(filter)}
          className={`px-5 py-2 rounded-full border text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
            activeSub === filter 
            ? "bg-slate-900 text-white border-slate-900 scale-105" 
            : "bg-white text-slate-600 border-slate-200 hover:border-blue-400"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}