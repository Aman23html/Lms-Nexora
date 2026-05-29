'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Search, 
  ChevronDown, 
  BookOpen,
  Layout,
  Award,
  PlayCircle,
  ChevronRight,
  Sparkles,
  Users,
  Briefcase,
  Menu,
  X,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<null | string>(null);
  const [hoveredNav, setHoveredNav] = useState<null | string>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 🔹 State for the search inputs
  const [searchQuery, setSearchQuery] = useState("");

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
    const handleResize = () => { 
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false); 
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isMobileMenuOpen]);

  // 🔹 Search Submission Handler
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false); 
      setSearchQuery(""); 
    }
  };

  const megaMenuCourses = courses.slice(0, 4);

  const navItems = [
    { id: 'curriculum', label: 'Curriculum', hasDropdown: true },
    { id: 'community', label: 'Community', hasDropdown: true },
    { id: 'about', label: 'About Us', hasDropdown: false },
    // { id: 'enterprise', label: 'Enterprise', hasDropdown: false },
  ];

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
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4 sm:gap-8">
            
            {/* 🔹 Brand Logo with Advanced Animation */}
            <Link href="/" className="flex items-center z-50 shrink-0 outline-none relative group">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="relative flex items-center justify-center"
              >
                {/* Dynamic hover glow matching the logo's blue and orange colors */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1fb2e7]/40 to-[#fca311]/40 blur-[20px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                {/* Continuous smooth floating animation */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <Image
                    src="/zenzlearn_logo.png"
                    alt="zenZlearn Logo"
                    width={220}
                    height={65}
                    priority
                    className="w-[150px] sm:w-[190px] lg:w-[220px] h-auto object-contain drop-shadow-sm transition-all duration-300"
                  />
                </motion.div>
              </motion.div>
            </Link>

            {/* 🔹 Center Navigation (Desktop) */}
            <nav className="hidden lg:flex items-center h-full relative" onMouseLeave={() => setHoveredNav(null)}>
              {navItems.map((item) => (
                <div 
                  key={item.id}
                  className="relative h-full flex items-center px-3 xl:px-4"
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

                  {/* 🔹 Responsive Mega Menu: Curriculum */}
                  <AnimatePresence>
                    {activeDropdown === 'curriculum' && item.id === 'curriculum' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={springAnim}
                        className="absolute top-[70px] xl:top-[75px] left-0 lg:-left-[100px] xl:-left-[250px] w-[750px] xl:w-[900px] bg-white/95 backdrop-blur-2xl border border-slate-200/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] rounded-3xl overflow-hidden flex z-[100]"
                      >
                        <div className="w-56 xl:w-64 bg-slate-50/50 p-5 xl:p-6 border-r border-slate-100 shrink-0">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Disciplines</h4>
                          <ul className="space-y-1">
                            {['Software Engineering', 'Data Science & AI', 'Cloud Computing', 'UI/UX Design', 'Product Management'].map((cat, idx) => (
                              <li key={idx}>
                                <Link href={`/courses?search=${encodeURIComponent(cat)}`} className="flex items-center justify-between text-xs xl:text-sm font-bold text-slate-600 p-2.5 xl:p-3 rounded-xl hover:bg-white hover:text-indigo-600 hover:shadow-sm hover:ring-1 hover:ring-slate-100 transition-all group">
                                  {cat} <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex-1 p-6 xl:p-8">
                          <div className="flex items-center justify-between mb-6">
                            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                              <Sparkles size={16} className="text-indigo-500" /> Featured Programs
                            </h4>
                            <Link href="/courses" className="text-xs font-bold text-indigo-600 flex items-center hover:bg-indigo-50 px-3 py-1.5 rounded-full transition-colors">
                              Explore Catalog <ArrowRight size={14} className="ml-1"/>
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 gap-3 xl:gap-4">
                            {isLoading ? (
                              [...Array(4)].map((_, i) => <div key={i} className="h-20 bg-slate-100 animate-pulse rounded-2xl" />)
                            ) : (
                              megaMenuCourses.map((course) => (
                                <Link 
                                  key={course._id} 
                                  href={`/courses/${course._id}`}
                                  className="flex items-start gap-3 xl:gap-4 p-3 xl:p-4 rounded-2xl border border-slate-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/50 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-300 group"
                                >
                                  <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:shadow-inner transition-colors">
                                    <Layout size={18} className="text-slate-500 group-hover:text-white transition-colors xl:w-5 xl:h-5" />
                                  </div>
                                  <div className="min-w-0">
                                    <h5 className="text-xs xl:text-sm font-bold text-slate-900 truncate group-hover:text-indigo-700 transition-colors">{course.title}</h5>
                                    <p className="text-[10px] xl:text-[11px] font-bold text-slate-500 mt-1 xl:mt-1.5 flex items-center gap-1.5 uppercase tracking-wider">
                                      <Award size={12} className="text-emerald-500 xl:w-3.5 xl:h-3.5"/> {course.level || 'Beginner'}
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
                        className="absolute top-[70px] xl:top-[75px] left-0 w-64 xl:w-72 bg-white/95 backdrop-blur-2xl border border-slate-200/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] rounded-3xl overflow-hidden py-3 px-3 z-[100]"
                      >
                        {[
                          { href: '/reviews', icon: Users, label: 'Student Success', desc: 'Read alumni stories', color: 'text-blue-600', bg: 'bg-blue-50', hover: 'group-hover:bg-blue-600' },
                          { href: '/instructor', icon: Briefcase, label: 'Become an Instructor', desc: 'Join our faculty', color: 'text-amber-600', bg: 'bg-amber-50', hover: 'group-hover:bg-amber-500' },
                        ].map((link, i) => (
                          <Link key={i} href={link.href} className="flex items-center gap-3 xl:gap-4 p-2.5 xl:p-3 rounded-2xl hover:bg-slate-50 group transition-all duration-300">
                            <div className={`${link.bg} p-2.5 xl:p-3 rounded-xl ${link.color} ${link.hover} group-hover:text-white group-hover:shadow-md transition-all shrink-0`}>
                              <link.icon size={16} strokeWidth={2.5} className="xl:w-[18px] xl:h-[18px]" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs xl:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">{link.label}</div>
                              <div className="text-[10px] xl:text-xs font-medium text-slate-500 mt-0.5 truncate">{link.desc}</div>
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
            <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
              
              {/* 🔹 Linked Search Bar (Hidden on Mobile) */}
              <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative group max-w-[200px] lg:max-w-[260px] w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors z-10" size={14} strokeWidth={2.5} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..." 
                  className="w-full bg-slate-100/80 hover:bg-slate-200/50 border border-transparent focus:border-indigo-200 focus:bg-white focus:ring-4 focus:ring-indigo-600/10 rounded-full py-2 pl-9 pr-10 text-xs sm:text-sm font-semibold text-slate-900 transition-all outline-none placeholder:text-slate-400"
                />
                <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <kbd className="hidden lg:inline-flex items-center justify-center px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[9px] font-bold text-slate-400 shadow-sm hover:text-indigo-600 cursor-pointer">
                    ↵
                  </kbd>
                </button>
              </form>

              {/* Contact Us CTA (Hidden on tiny mobile, visible sm+) */}
              <div className="hidden sm:flex items-center">
                <Link href="/contactus">
                  <Button className="bg-slate-900 hover:bg-indigo-600 text-white rounded-full h-9 sm:h-10 px-4 sm:px-6 font-bold text-xs sm:text-[13px] shadow-lg shadow-slate-900/10 transition-all duration-300 active:scale-95 hover:shadow-indigo-600/25">
                    Contact
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Toggle (Visible < 1024px) */}
              <button 
                className="lg:hidden p-2 -mr-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-colors shrink-0"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* 🔹 Trending Ribbon (Hidden on Mobile) */}
        <div className={`bg-slate-50 border-t border-slate-100 hidden md:block overflow-hidden transition-all duration-300 ease-in-out relative z-10 ${scrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'}`}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center gap-6 h-full overflow-x-auto no-scrollbar mask-fade-edges">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-r border-slate-200 pr-5 shrink-0 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> Top Searches
            </span>
            {isLoading ? (
              <div className="h-3 w-48 bg-slate-200/50 animate-pulse rounded-full shrink-0" />
            ) : (
              courses.slice(0, 8).map((course) => (
                <Link 
                  key={course._id} 
                  href={`/courses/${course._id}`} 
                  className="text-[11px] lg:text-[12px] font-bold text-slate-500 hover:text-indigo-600 whitespace-nowrap transition-colors"
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
            className="fixed inset-0 z-[150] bg-white pt-20 sm:pt-24 pb-6 px-4 sm:px-6 lg:hidden flex flex-col h-[100dvh] overflow-y-auto"
          >
            {/* 🔹 Mobile Search Form */}
            <form onSubmit={handleSearchSubmit} className="relative mb-6 sm:mb-8 shrink-0">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} strokeWidth={2.5} />
               <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Search for courses..." 
                 className="w-full bg-slate-100 border-transparent rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-sm sm:text-base font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-600/10 focus:bg-white focus:border-indigo-200 transition-all"
               />
               <button type="submit" className="hidden" />
            </form>

            <div className="flex flex-col gap-1 sm:gap-2 flex-1 overflow-y-auto no-scrollbar">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 sm:mb-4 px-2">Navigation</div>
              <Link href="/courses" className="font-bold text-slate-900 text-xl sm:text-2xl py-3 sm:py-4 px-2 border-b border-slate-100 flex items-center justify-between group" onClick={() => setIsMobileMenuOpen(false)}>
                Curriculum <ArrowRight size={20} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all"/>
              </Link>
              <Link href="/reviews" className="font-bold text-slate-900 text-xl sm:text-2xl py-3 sm:py-4 px-2 border-b border-slate-100 flex items-center justify-between group" onClick={() => setIsMobileMenuOpen(false)}>
                Community <ArrowRight size={20} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all"/>
              </Link>
              <Link href="/enterprise" className="font-bold text-slate-900 text-xl sm:text-2xl py-3 sm:py-4 px-2 border-b border-slate-100 flex items-center justify-between group" onClick={() => setIsMobileMenuOpen(false)}>
                Enterprise <ArrowRight size={20} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all"/>
              </Link>
            </div>

            {/* Mobile Bottom CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-col gap-3 shrink-0">
              <Link href="/contactus" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl h-12 sm:h-14 font-bold text-sm sm:text-base shadow-lg shadow-slate-900/10 transition-colors">
                  Contact Admissions
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .mask-fade-edges {
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </>
  );
}