'use client'
import React, { useState, useEffect } from "react";
import { 
  Search, 
  ChevronDown, 
  Sparkles, 
  GraduationCap, 
  Users, 
  Briefcase,
  Menu,
  X,
  ArrowRight,
  Zap
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button"; // Assuming this exists in your project

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<null | string>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Link to Database API
  useEffect(() => {
    async function fetchNavbarCourses() {
      try {
        const res = await fetch("/api/admin/courses", { cache: 'no-store' });
        const data = await res.json();
        const fetched = Array.isArray(data) ? data : (data.data || []);
        setCourses(fetched);
      } catch (error) {
        console.error("Navbar Registry Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNavbarCourses();
  }, []);

  // Limit courses for the Mega Menu display
  const megaMenuCourses = courses.slice(0, 6);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setIsMobileMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="w-full bg-white/80 backdrop-blur-xl sticky top-0 z-[200] border-b border-slate-200/80 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer z-50">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-violet-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:rotate-6 group-hover:scale-105 transition-all duration-300">
              <Sparkles size={20} fill="currentColor" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">
              NEX<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">ORA</span>
            </span>
          </Link>

          {/* Center Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 h-full">
            
            {/* Mega Menu Wrapper */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown('courses')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`flex items-center gap-1.5 text-[15px] font-semibold transition-colors ${activeDropdown === 'courses' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}>
                Curriculum <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === 'courses' ? 'rotate-180' : ''}`} />
              </button>

              {/* Framer Motion Animated Mega Menu */}
              <AnimatePresence>
                {activeDropdown === 'courses' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-[80px] -left-24 w-[750px] bg-white border border-slate-100 shadow-2xl shadow-blue-900/5 rounded-3xl overflow-hidden flex"
                  >
                    {/* Left Side: Course List */}
                    <div className="flex-1 p-6 grid grid-cols-2 gap-3">
                      <div className="col-span-2 mb-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Top Programs</span>
                        <Link href="/courses" className="text-xs font-bold text-blue-600 flex items-center hover:translate-x-1 transition-transform">
                          View All <ArrowRight size={14} className="ml-1"/>
                        </Link>
                      </div>

                      {isLoading ? (
                        [...Array(6)].map((_, i) => <div key={i} className="h-16 bg-slate-50 animate-pulse rounded-xl" />)
                      ) : (
                        megaMenuCourses.map((course) => (
                          <Link 
                            key={course._id} 
                            href={`/courses/${course._id}`}
                            className="flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-all group/item border border-transparent hover:border-slate-100"
                          >
                            <div className="bg-slate-100 p-2.5 rounded-xl text-slate-500 group-hover/item:bg-blue-600 group-hover/item:text-white group-hover/item:shadow-md transition-all">
                              <GraduationCap size={18} />
                            </div>
                            <div className="min-w-0 pt-0.5">
                              <div className="text-sm font-bold text-slate-900 truncate">{course.title}</div>
                              <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">{course.category || 'Tech'}</div>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>

                    {/* Right Side: Featured Promotional Card */}
                    <div className="w-[280px] bg-slate-50 p-6 border-l border-slate-100 flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                          <Zap size={20} fill="currentColor" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2">Accelerate Your Career in 2026</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">Join our intensive 12-week AI engineering bootcamp. Limited seats available.</p>
                      </div>
                      <Button className="w-full bg-white text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 mt-6 rounded-xl shadow-sm transition-all">
                        Explore Bootcamp
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Simple Dropdown Wrapper */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown('more')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`flex items-center gap-1.5 text-[15px] font-semibold transition-colors ${activeDropdown === 'more' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}>
                Community <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === 'more' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'more' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[80px] left-0 w-64 bg-white border border-slate-100 shadow-2xl shadow-blue-900/5 rounded-2xl overflow-hidden py-2"
                  >
                    <Link href="/reviews" className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 group transition-colors">
                      <div className="bg-orange-50 p-2 rounded-lg text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors"><Users size={16} /></div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">Student Success</div>
                        <div className="text-[11px] text-slate-500">Read alumni reviews</div>
                      </div>
                    </Link>
                    <Link href="/instructor" className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 group transition-colors">
                      <div className="bg-blue-50 p-2 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"><Briefcase size={16} /></div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">Become Instructor</div>
                        <div className="text-[11px] text-slate-500">Join our faculty</div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Side: Search & CTAs */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            
            {/* Search Bar (Hidden on small mobile) */}
            <div className="hidden md:block relative group max-w-xs w-full lg:max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search courses..." 
                className="w-full bg-slate-100/80 border border-slate-200/60 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:border-blue-300 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none placeholder:text-slate-400"
              />
            </div>

            {/* CTA Button */}
            <Link href="/contactus" className="hidden sm:block">
              <Button className="bg-slate-900 hover:bg-blue-600 text-white rounded-xl h-10 px-5 font-bold text-xs shadow-lg shadow-slate-900/20 transition-all active:scale-95">
                Get Access
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* --- Trending Ribbon (Bottom Strip) --- */}
      <div className="bg-slate-50 border-t border-slate-100 hidden md:block">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center gap-6 h-10 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-r border-slate-200 pr-5 shrink-0 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" /> Trending
          </span>
          {isLoading ? (
            <div className="h-3 w-48 bg-slate-200 animate-pulse rounded" />
          ) : (
            courses.slice(0, 8).map((course) => (
              <Link 
                key={course._id} 
                href={`/courses/${course._id}`} 
                className="text-[11px] font-bold text-slate-500 hover:text-blue-600 whitespace-nowrap transition-colors"
              >
                {course.title}
              </Link>
            ))
          )}
        </div>
      </div>

      {/* --- Mobile Dropdown Menu --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              <Link href="/courses" className="font-bold text-slate-800 text-lg flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                Curriculum <ArrowRight size={18} className="text-slate-400"/>
              </Link>
              <Link href="/reviews" className="font-bold text-slate-800 text-lg flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                Student Success <ArrowRight size={18} className="text-slate-400"/>
              </Link>
              <Link href="/instructor" className="font-bold text-slate-800 text-lg flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                Become Instructor <ArrowRight size={18} className="text-slate-400"/>
              </Link>
              <hr className="border-slate-100 my-2" />
              <Link href="/contactus" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 font-bold text-sm shadow-md transition-all">
                  Get Access
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}