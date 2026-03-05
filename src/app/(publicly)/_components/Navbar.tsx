'use client'
import React, { useState } from "react";
import { Search, ChevronDown, Sparkles, GraduationCap, Users, Briefcase } from "lucide-react";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<null | string>(null);

  const courses = [
    { name: "ML using python", desc: "Advanced neural networks & data models" },
    { name: "Power BI", desc: "Enterprise data visualization" },
    { name: "MySQL", desc: "Relational database management" },
    { name: "Python", desc: "Core programming & automation" },
    { name: "Tableau", desc: "Business intelligence mastery" },
    { name: "PMP", desc: "Project management professional" },
  ];

  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="flex items-center justify-between h-20 gap-12">
          
          {/* Brand - Minimalist & Bold */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-700 to-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
              <Sparkles size={22} fill="currentColor" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">
              NEX<span className="text-blue-600">ORA</span>
            </span>
          </div>

          {/* Center Navigation - Floating Links */}
          <nav className="hidden lg:flex items-center gap-10">
            {/* Courses Mega-Menu Trigger */}
            <div 
              className="relative group py-8"
              onMouseEnter={() => setActiveDropdown('courses')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`flex items-center gap-1.5 text-[15px] font-semibold transition-colors ${activeDropdown === 'courses' ? 'text-blue-600' : 'text-slate-600'}`}>
                All Courses <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === 'courses' ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              {activeDropdown === 'courses' && (
                <div className="absolute top-[80px] -left-20 w-[600px] bg-white border border-slate-100 shadow-2xl rounded-2xl p-6 grid grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-200">
                  {courses.map((course, idx) => (
                    <a key={idx} href="#" className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                      <div className="bg-blue-50 p-2 rounded-lg text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                        <GraduationCap size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{course.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{course.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            
            
            {/* More Dropdown */}
            <div 
              className="relative group py-8"
              onMouseEnter={() => setActiveDropdown('more')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`flex items-center gap-1.5 text-[15px] font-semibold transition-colors ${activeDropdown === 'more' ? 'text-blue-600' : 'text-slate-600'}`}>
                Community <ChevronDown size={16} />
              </button>

              {activeDropdown === 'more' && (
                <div className="absolute top-[80px] right-0 w-64 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-4">
                  <a href="#" className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50 text-slate-700">
                    <Users size={18} className="text-orange-500" />
                    <span className="text-sm font-bold">Student Reviews</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50 text-slate-700 border-t border-slate-50">
                    <Briefcase size={18} className="text-blue-600" />
                    <span className="text-sm font-bold">Become Instructor</span>
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* Search & CTA Section */}
          <div className="flex-1 max-w-md hidden xl:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search 5,000+ technical courses..." 
                className="w-full bg-slate-100 border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          

        </div>
      </div>

      {/* Modern Quick-Access Ribbon */}
      <div className="bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-screen-2xl mx-auto px-8 flex items-center gap-8 h-12 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 border-r border-slate-200 pr-4">Trending</span>
          {courses.map((course, idx) => (
            <a key={idx} href="#" className="text-xs font-bold text-slate-500 hover:text-blue-600 whitespace-nowrap transition-colors uppercase tracking-tight">
              {course.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}