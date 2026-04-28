'use client'
import React, { useState, useEffect } from "react";
import { 
  Search, 
  ChevronDown, 
  GraduationCap, 
  Users, 
  Briefcase,
  Menu,
  X,
  ArrowRight,
  Zap,
  BookOpen,
  Layout,
  Award,
  PlayCircle,
  ChevronRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<null | string>(null);
  const [hoveredNav, setHoveredNav] = useState<null | string>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Database Courses
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

  // Handle Scroll and Resize events
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => { if (window.innerWidth >= 1024) setIsMobileMenuOpen(false); };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const megaMenuCourses = courses.slice(0, 4);

  const navItems = [
    { id: 'curriculum', label: 'Curriculum', hasDropdown: true },
    { id: 'community', label: 'Community', hasDropdown: true },
    { id: 'enterprise', label: 'Enterprise', hasDropdown: false },
  ];

  // Advanced Spring Physics for smooth, snappy animations
  const springAnim: Transition = { type: "spring", stiffness: 300, damping: 24 };

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-[200] transition-all duration-500 ease-out ${
          scrolled 
            ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-0" 
            : "bg-white border-b border-slate-100 py-1"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-8">
            
            {/* 🔹 Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group cursor-pointer z-50">
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                <BookOpen size={20} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center">
                zenZ<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">learn</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1.5 mb-3 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </span>
            </Link>

            {/* 🔹 Center Navigation (Desktop) */}
            <nav className="hidden lg:flex items-center h-full relative" onMouseLeave={() => setHoveredNav(null)}>
              {navItems.map((item) => (
                <div 
                  key={item.id}
                  className="relative h-full flex items-center px-4"
                  onMouseEnter={() => {
                    setHoveredNav(item.id);
                    if (item.hasDropdown) setActiveDropdown(item.id);
                    else setActiveDropdown(null);
                  }}
                  onMouseLeave={() => {
                    if (item.hasDropdown) setActiveDropdown(null);
                  }}
                >
                  {/* Magic Hover Pill */}
                  {hoveredNav === item.id && (
                    <motion.div
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 top-1/2 -translate-y-1/2 h-10 bg-slate-100/80 rounded-full -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={springAnim}
                    />
                  )}
                  
                  <Link href={`/${item.id === 'curriculum' ? 'courses' : item.id}`} className="flex items-center gap-1.5 text-[14px] font-bold text-slate-700 transition-colors">
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown size={14} strokeWidth={3} className={`transition-transform duration-300 ${activeDropdown === item.id ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
                    )}
                  </Link>

                  {/* 🔹 Mega Menu: Curriculum */}
                  <AnimatePresence>
                    {activeDropdown === 'curriculum' && item.id === 'curriculum' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={springAnim}
                        // 🟢 ADDED z-[100] to fix ribbon overlap, added backdrop-blur for premium feel
                        className="absolute top-[75px] -left-[300px] w-[900px] bg-white/95 backdrop-blur-2xl border border-slate-200/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] rounded-3xl overflow-hidden flex z-[100]"
                      >
                        {/* Categories Sidebar */}
                        <div className="w-64 bg-slate-50/50 p-6 border-r border-slate-100">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Disciplines</h4>
                          <ul className="space-y-1">
                            {['Software Engineering', 'Data Science & AI', 'Cloud Computing', 'UI/UX Design', 'Product Management'].map((cat, idx) => (
                              <li key={idx}>
                                <Link href={`/category/${cat.toLowerCase().replace(/ /g, '-')}`} className="flex items-center justify-between text-sm font-bold text-slate-600 p-3 rounded-xl hover:bg-white hover:text-indigo-600 hover:shadow-sm hover:ring-1 hover:ring-slate-100 transition-all group">
                                  {cat} <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Top Programs Grid */}
                        <div className="flex-1 p-8">
                          <div className="flex items-center justify-between mb-6">
                            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                              <Sparkles size={16} className="text-indigo-500" /> Featured Programs
                            </h4>
                            <Link href="/courses" className="text-xs font-bold text-indigo-600 flex items-center hover:bg-indigo-50 px-3 py-1.5 rounded-full transition-colors">
                              Explore Catalog <ArrowRight size={14} className="ml-1"/>
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            {isLoading ? (
                              [...Array(4)].map((_, i) => <div key={i} className="h-20 bg-slate-100 animate-pulse rounded-2xl" />)
                            ) : (
                              megaMenuCourses.map((course) => (
                                <Link 
                                  key={course._id} 
                                  href={`/courses/${course._id}`}
                                  className="flex items-start gap-4 p-4 rounded-2xl border border-slate-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/50 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-300 group"
                                >
                                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:shadow-inner transition-colors">
                                    <Layout size={20} className="text-slate-500 group-hover:text-white transition-colors" />
                                  </div>
                                  <div>
                                    <h5 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-700 transition-colors">{course.title}</h5>
                                    <p className="text-[11px] font-bold text-slate-500 mt-1.5 flex items-center gap-1.5 uppercase tracking-wider">
                                      <Award size={14} className="text-emerald-500"/> {course.level || 'Beginner'}
                                    </p>
                                  </div>
                                </Link>
                              ))
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 🔹 Simple Dropdown: Community */}
                  <AnimatePresence>
                    {activeDropdown === 'community' && item.id === 'community' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={springAnim}
                        // 🟢 ADDED z-[100] and backdrop blur
                        className="absolute top-[75px] left-0 w-72 bg-white/95 backdrop-blur-2xl border border-slate-200/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] rounded-3xl overflow-hidden py-3 px-3 z-[100]"
                      >
                        {[
                          { href: '/reviews', icon: Users, label: 'Student Success', desc: 'Read alumni stories', color: 'text-blue-600', bg: 'bg-blue-50', hover: 'group-hover:bg-blue-600' },
                          { href: '/instructor', icon: Briefcase, label: 'Become an Instructor', desc: 'Join our faculty', color: 'text-amber-600', bg: 'bg-amber-50', hover: 'group-hover:bg-amber-500' },
                          { href: '/events', icon: PlayCircle, label: 'Live Events', desc: 'Webinars & workshops', color: 'text-emerald-600', bg: 'bg-emerald-50', hover: 'group-hover:bg-emerald-500' }
                        ].map((link, i) => (
                          <Link key={i} href={link.href} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 group transition-all duration-300">
                            <div className={`${link.bg} p-3 rounded-xl ${link.color} ${link.hover} group-hover:text-white group-hover:shadow-md transition-all`}>
                              <link.icon size={18} strokeWidth={2.5} />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{link.label}</div>
                              <div className="text-xs font-medium text-slate-500 mt-0.5">{link.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              ))}
            </nav>

            {/* 🔹 Right Side: Search & CTAs */}
            <div className="flex items-center gap-5 flex-1 justify-end">
              
              {/* Sleek Search Bar */}
              <div className="hidden md:flex items-center relative group max-w-xs w-full lg:max-w-[260px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors z-10" size={16} strokeWidth={2.5} />
                <input 
                  type="text" 
                  placeholder="Search courses..." 
                  className="w-full bg-slate-100/80 hover:bg-slate-200/50 border border-transparent focus:border-indigo-200 focus:bg-white focus:ring-4 focus:ring-indigo-600/10 rounded-full py-2.5 pl-11 pr-12 text-sm font-semibold text-slate-900 transition-all outline-none placeholder:text-slate-400"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <kbd className="hidden lg:inline-flex items-center justify-center px-2 py-0.5 rounded-md border border-slate-200 bg-white text-[10px] font-bold text-slate-400 shadow-sm">⌘K</kbd>
                </div>
              </div>

              {/* Contact Us CTA */}
              <div className="hidden sm:flex items-center gap-3">
                <Link href="/contactus">
                  <Button className="bg-slate-900 hover:bg-indigo-600 text-white rounded-full h-10 px-6 font-bold text-[13px] shadow-lg shadow-slate-900/10 transition-all duration-300 active:scale-95 hover:shadow-indigo-600/25">
                    Contact Us
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* 🔹 Trending Ribbon (Auto-hides gracefully when scrolled) */}
        {/* 🟢 Removed overlapping risk by explicitly styling its container lower than the dropdowns */}
        <div className={`bg-slate-50 border-t border-slate-100 hidden md:block overflow-hidden transition-all duration-300 ease-in-out relative z-10 ${scrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'}`}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center gap-6 h-full overflow-x-auto no-scrollbar mask-fade-edges">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-r border-slate-200 pr-5 shrink-0 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> Top Searches
            </span>
            {isLoading ? (
              <div className="h-3 w-48 bg-slate-200/50 animate-pulse rounded-full" />
            ) : (
              courses.slice(0, 8).map((course) => (
                <Link 
                  key={course._id} 
                  href={`/courses/${course._id}`} 
                  className="text-[12px] font-bold text-slate-500 hover:text-indigo-600 whitespace-nowrap transition-colors"
                >
                  {course.title}
                </Link>
              ))
            )}
          </div>
        </div>
      </header>

      {/* 🔹 Mobile Full-Screen Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[150] bg-white pt-24 pb-6 px-6 lg:hidden flex flex-col h-screen overflow-y-auto"
          >
            <div className="relative mb-8">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} strokeWidth={2.5} />
               <input 
                 type="text" 
                 placeholder="Search for courses..." 
                 className="w-full bg-slate-100 border-transparent rounded-2xl py-4 pl-12 pr-4 text-base font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-600/10 focus:bg-white focus:border-indigo-200 transition-all"
               />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Navigation</div>
              <Link href="/courses" className="font-bold text-slate-900 text-2xl py-4 border-b border-slate-100 flex items-center justify-between group" onClick={() => setIsMobileMenuOpen(false)}>
                Curriculum <ArrowRight size={24} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all"/>
              </Link>
              <Link href="/reviews" className="font-bold text-slate-900 text-2xl py-4 border-b border-slate-100 flex items-center justify-between group" onClick={() => setIsMobileMenuOpen(false)}>
                Community <ArrowRight size={24} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all"/>
              </Link>
              <Link href="/enterprise" className="font-bold text-slate-900 text-2xl py-4 border-b border-slate-100 flex items-center justify-between group" onClick={() => setIsMobileMenuOpen(false)}>
                Enterprise <ArrowRight size={24} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all"/>
              </Link>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link href="/contactus" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl h-14 font-bold text-base shadow-lg shadow-slate-900/10 transition-colors">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Helper class for the fade edge on the ribbon */}
      <style dangerouslySetInnerHTML={{__html: `
        .mask-fade-edges {
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
      `}} />
    </>
  );
}