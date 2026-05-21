"use client"

import { Key, useState, FormEvent, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { 
  CheckCircle2, Clock, Users, ShieldCheck, 
  Briefcase, PlayCircle, Star, Target, 
  TrendingUp, Globe, BadgeCheck, GraduationCap,
  ListChecks, SearchCheck, Download,
  ChevronDown, Award, Zap, Layers, Lock, Play, Send, BookOpen, ChevronRight, FileText, Sparkles, AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import CourseHeader from "@/components/CourseHeader"

// --- Advanced Animation Configurations ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
}

const accordionVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } }
}

export default function CourseDetailsClient({ course }: { course: any }) {
  const details = course.details || {}
  const lessons = course.lessons || []
  
  // States
  const [showElig, setShowElig] = useState(false)
  const [showPreReq, setShowPreReq] = useState(false)
  const [openLesson, setOpenLesson] = useState<number | null>(0)
  const [activeTab, setActiveTab] = useState('overview')
  const [isScrolled, setIsScrolled] = useState(false)

  // Form States
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // Track scrolling for the mobile sticky bottom bar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Helper to parse newline separated strings
  const parseList = (text: string) => text?.split('\n').filter((l: string) => l.trim()) || []
  const eligibilityList = parseList(details.eligibility)
  const preReqList = parseList(details.preRequisites)

  // Form Submission
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = new FormData(form)
    
    try {
      await fetch("https://script.google.com/macros/s/AKfycbzRexSqcFo6093iso8fEdpQTy7uveHkqnBllDgnojIoTQsPvmTwKnpvVfbJPHJAKccv/exec", {
        method: "POST",
        body: new URLSearchParams({
          FullName: data.get("fullname") as string,
          Email: data.get("email") as string,
          Phone: data.get("phone") as string,
          Program: course.title,
          Message: "Sidebar Inquiry",
        }),
      })
      setIsSubmitted(true)
      form.reset()
    } catch (error) {
      alert("System busy. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Smooth scroll handler for tabs
  const scrollToSection = (id: string) => {
    setActiveTab(id)
    const element = document.getElementById(id)
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 140
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">
      <CourseHeader category={course.category} />

      {/* 🔹 HERO SECTION (Enterprise Grade) */}
      <section className="bg-slate-950 text-white pt-20 pb-24 px-5 sm:px-8 relative overflow-hidden">
        {/* Subtle mesh gradient background */}
        <div className="absolute top-0 right-0 w-full max-w-3xl h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/4" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl space-y-6">
            
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-2.5 text-xs font-semibold tracking-wide">
              <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">Programs</span>
              <ChevronRight size={14} className="text-slate-600" />
              <span className="text-blue-400 cursor-default">{course.category}</span>
              {course.subCategory && course.subCategory !== "All" && (
                <>
                  <ChevronRight size={14} className="text-slate-600" />
                  <span className="text-blue-400 cursor-default">{course.subCategory}</span>
                </>
              )}
            </motion.div>

            <div className="space-y-5">
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.15]">
                {course.title}
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
                {details.overview || "Master industry-standard competencies and accelerate your career trajectory with this comprehensive professional certification."}
              </motion.p>
            </div>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
              {course.isAvailableSoon && (
                <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <AlertCircle size={14}/> Waitlist Open
                </span>
              )}
              {course.recommended && (
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <Star size={14} fill="currentColor"/> Highly Recommended
                </span>
              )}
              <div className="flex items-center gap-2 text-amber-400 bg-white/5 px-3 py-1.5 rounded-md border border-white/10">
                <Star size={14} fill="currentColor" />
                <span className="text-white font-semibold text-sm">4.9</span>
                <span className="text-slate-400 text-xs ml-1">({Number(course.enrolled).toLocaleString()}+ Ratings)</span>
              </div>
            </motion.div>

            {/* Metrics Bar */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6 sm:gap-12 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0"><Clock size={20} className="text-blue-500"/></div>
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Duration</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{course.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0"><Layers size={20} className="text-blue-500"/></div>
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Level</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{course.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0"><GraduationCap size={20} className="text-blue-500"/></div>
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Instructor</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{course.instructor}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 🔹 STICKY NAVIGATION TABS (Desktop) */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 hidden md:block shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-8">
          {['overview', 'curriculum', 'impact', 'faqs'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => scrollToSection(tab)}
              className={`py-5 text-sm font-bold capitalize transition-colors relative ${activeTab === tab ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              {tab.replace('-', ' ')}
              {activeTab === tab && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 MAIN LAYOUT: Grid Architecture */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 items-start">
          
          {/* LEFT COLUMN: Deep Content */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* 01. Overview & Skills */}
            <motion.section id="overview" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="space-y-10 scroll-mt-28">
              {details.description && (
                <motion.div variants={fadeInUp} className="bg-white border border-slate-200/60 rounded-2xl p-8 sm:p-10 shadow-sm">
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-6">About This Program</h2>
                  <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-[1.8] text-base">
                    {details.description}
                  </div>
                </motion.div>
              )}

              {details.skillsCovered?.length > 0 && (
                <motion.div variants={fadeInUp} className="space-y-5">
                  <h3 className="text-xl font-extrabold text-slate-900">Skills You Will Master</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {details.skillsCovered.map((skill: string, i: number) => (
                      <span key={i} className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 shadow-sm hover:border-blue-400 hover:text-blue-700 transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {(details.learningOutcomes?.length > 0 || details.highlights?.length > 0) && (
                <motion.div variants={fadeInUp} className="bg-slate-900 rounded-2xl p-8 sm:p-10 shadow-lg">
                  <h2 className="text-2xl font-extrabold text-white mb-8 flex items-center gap-3"><Target className="text-blue-500"/> Key Learning Outcomes</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                    {(details.learningOutcomes?.length > 0 ? details.learningOutcomes : details.highlights).map((outcome: string, i: number) => (
                      <div key={i} className="flex items-start gap-4">
                        <CheckCircle2 size={20} className="text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-slate-300 leading-relaxed">{outcome}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.section>

            {/* 02. Curriculum Builder */}
            {lessons.length > 0 && (
              <motion.section id="curriculum" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="space-y-8 scroll-mt-28">
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">Curriculum Syllabus</h2>
                    <p className="text-sm text-slate-500 font-medium mt-1.5">{lessons.length} Comprehensive Modules</p>
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto rounded-xl border-slate-300 text-blue-600 hover:bg-blue-50 font-bold gap-2">
                    <Download size={16}/> Download Syllabus
                  </Button>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  {lessons.map((lesson: any, i: number) => (
                    <div key={i} className={`border-b border-slate-100 last:border-0 transition-colors ${openLesson === i ? 'bg-blue-50/30' : 'hover:bg-slate-50'}`}>
                      <div className="p-5 sm:p-6 flex items-center justify-between cursor-pointer" onClick={() => setOpenLesson(openLesson === i ? null : i)}>
                        <div className="flex items-center gap-5 flex-1 pr-4">
                           <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-extrabold text-sm">
                             {(i + 1).toString().padStart(2, '0')}
                           </div>
                           <div>
                             <h4 className="font-bold text-slate-900 text-base sm:text-lg leading-tight">{lesson.title}</h4>
                             <div className="flex flex-wrap items-center gap-3 mt-2">
                               <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><PlayCircle size={14}/> Video</span>
                               {lesson.duration && <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><Clock size={14}/> {lesson.duration}</span>}
                             </div>
                           </div>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                          {lesson.isFreePreview ? (
                            <span className="hidden sm:flex px-3 py-1 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest gap-1.5 items-center"><Play size={12} fill="currentColor"/> Free Preview</span>
                          ) : (
                            <Lock size={18} className="text-slate-300 hidden sm:block" />
                          )}
                          <div className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center bg-white transition-transform duration-300 ${openLesson === i ? 'rotate-180 border-blue-200' : ''}`}>
                             <ChevronDown size={18} className="text-slate-400" />
                          </div>
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {openLesson === i && (
                          <motion.div variants={accordionVariants} initial="hidden" animate="visible" exit="hidden" className="overflow-hidden">
                            <div className="px-5 sm:px-6 pb-6 pt-0 ml-[4.25rem]">
                              <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                  <FileText size={16} className="text-blue-500" />
                                  <span className="font-semibold text-sm text-slate-700">Lecture Materials & Video Content</span>
                                </div>
                                {lesson.isFreePreview ? (
                                  <Button size="sm" className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold w-full sm:w-auto">Watch Lesson</Button>
                                ) : (
                                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enroll to Unlock</span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              </motion.section>
            )}

            {/* 03. Career Impact & Target Audience */}
            <motion.section id="impact" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="space-y-8 scroll-mt-28">
              <motion.h2 variants={fadeInUp} className="text-2xl font-extrabold text-slate-900">Career Impact</motion.h2>
              
              <motion.div variants={fadeInUp} className="bg-blue-600 rounded-[2rem] p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-xl shadow-blue-600/20 relative overflow-hidden">
                 <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
                   <TrendingUp size={240} />
                 </div>
                 <div className="flex-1 space-y-5 relative z-10">
                    <h3 className="text-3xl font-extrabold leading-tight tracking-tight">Elevate your professional value.</h3>
                    <p className="text-blue-100 text-base leading-relaxed font-medium">
                      {details.benefits?.description || "Our alumni experience significant career transitions, reporting substantial salary hikes and advanced job roles globally."}
                    </p>
                    {details.benefits?.careerProspects && (
                      <div className="pl-4 border-l-2 border-blue-400">
                        <p className="text-white text-sm font-semibold italic">"{details.benefits.careerProspects}"</p>
                      </div>
                    )}
                 </div>
                 <div className="w-full md:w-auto bg-white rounded-2xl p-8 text-center min-w-[220px] shadow-lg relative z-10">
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-2">Average Salary Hike</p>
                    <p className="text-5xl font-black text-slate-900">+{details.benefits?.marketGrowth || "40%+"}</p>
                 </div>
              </motion.div>

              {(details.industriesCovered?.length > 0 || details.jobRoles?.length > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  {details.jobRoles?.length > 0 && (
                    <motion.div variants={fadeInUp} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
                        <Briefcase size={20} className="text-indigo-600"/>
                      </div>
                      <h4 className="font-extrabold text-lg text-slate-900 mb-5">Target Roles</h4>
                      <ul className="space-y-3">
                        {details.jobRoles.map((role: string, i: number) => (
                          <li key={i} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" /> {role}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                  {details.industriesCovered?.length > 0 && (
                    <motion.div variants={fadeInUp} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                      <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                        <Globe size={20} className="text-emerald-600"/>
                      </div>
                      <h4 className="font-extrabold text-lg text-slate-900 mb-5">Hiring Industries</h4>
                      <ul className="space-y-3">
                        {details.industriesCovered.map((industry: string, i: number) => (
                          <li key={i} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" /> {industry}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.section>

            {/* 04. Prerequisites */}
            {(eligibilityList.length > 0 || preReqList.length > 0) && (
              <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="space-y-6">
                <motion.h2 variants={fadeInUp} className="text-2xl font-extrabold text-slate-900">Eligibility</motion.h2>
                <div className="grid grid-cols-1 gap-4">
                  {eligibilityList.length > 0 && (
                    <motion.div variants={fadeInUp} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="p-6 cursor-pointer flex items-center justify-between hover:bg-slate-50 transition-colors" onClick={() => setShowElig(!showElig)}>
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                            <ListChecks size={20} className="text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-base sm:text-lg">Who can join this program?</h3>
                            <p className="text-sm text-slate-500 font-medium mt-1">{showElig ? "View details" : eligibilityList[0]}</p>
                          </div>
                        </div>
                        <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${showElig ? 'rotate-180' : ''}`} />
                      </div>
                      <AnimatePresence>
                        {showElig && (
                          <motion.div variants={accordionVariants} initial="hidden" animate="visible" exit="hidden" className="overflow-hidden bg-slate-50 border-t border-slate-100">
                            <div className="p-6 sm:px-8 space-y-4">
                              {eligibilityList.map((line: string, idx: Key) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                  <p className="text-slate-700 text-sm font-medium leading-relaxed">{line.trim()}</p>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {preReqList.length > 0 && (
                    <motion.div variants={fadeInUp} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="p-6 cursor-pointer flex items-center justify-between hover:bg-slate-50 transition-colors" onClick={() => setShowPreReq(!showPreReq)}>
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                            <SearchCheck size={20} className="text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-base sm:text-lg">Technical Prerequisites</h3>
                            <p className="text-sm text-slate-500 font-medium mt-1">{showPreReq ? "View details" : preReqList[0]}</p>
                          </div>
                        </div>
                        <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${showPreReq ? 'rotate-180' : ''}`} />
                      </div>
                      <AnimatePresence>
                        {showPreReq && (
                          <motion.div variants={accordionVariants} initial="hidden" animate="visible" exit="hidden" className="overflow-hidden bg-slate-50 border-t border-slate-100">
                            <div className="p-6 sm:px-8 space-y-4">
                              {preReqList.map((line: string, idx: Key) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                  <p className="text-slate-700 text-sm font-medium leading-relaxed">{line.trim()}</p>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </div>
              </motion.section>
            )}

            {/* 05. FAQs */}
            {details.faqs?.length > 0 && (
              <motion.section id="faqs" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="space-y-6 scroll-mt-28">
                 <motion.h2 variants={fadeInUp} className="text-2xl font-extrabold text-slate-900">Frequently Asked Questions</motion.h2>
                 <div className="space-y-3">
                   {details.faqs.map((faq: any, i: number) => (
                     <motion.details variants={fadeInUp} key={i} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden shadow-sm hover:border-blue-300 transition-colors">
                        <summary className="flex justify-between items-center p-6 font-bold text-slate-900 cursor-pointer text-base">
                          {faq.question}
                          <ChevronDown size={20} className="text-slate-400 transition-transform duration-300 group-open:rotate-180" />
                        </summary>
                        <div className="px-6 pb-6 pt-0 text-slate-600 text-sm font-medium leading-relaxed border-t border-slate-50 mt-2 pt-4">
                          {faq.answer}
                        </div>
                     </motion.details>
                   ))}
                 </div>
              </motion.section>
            )}
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* RIGHT COLUMN: STICKY SIDEBAR */}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-4 relative">
            <div className="lg:sticky lg:top-28 space-y-6 flex flex-col items-start w-full">
              
              {/* Box 1: Core Enrollment Card (Hidden on very small screens, integrated into mobile sticky) */}
              <div className="bg-white rounded-[1.5rem] shadow-xl border border-slate-200 overflow-hidden w-full hidden sm:block">
                <div className="relative aspect-video bg-slate-900 group cursor-pointer">
                  <img src={course.image} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" alt={course.title} />
                  <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center group-hover:bg-slate-900/50 transition-colors">
                    <div className="w-14 h-14 bg-white/95 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <PlayCircle className="text-blue-600 w-8 h-8 ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[2.25rem] font-extrabold text-slate-900 tracking-tight">₹{course.price}</span>
                    {course.isAvailableSoon && (
                      <span className="bg-orange-100 text-orange-700 text-[10px] font-extrabold px-2.5 py-1.5 rounded-md uppercase tracking-widest">Queue</span>
                    )}
                  </div>

                  <Link href={course.isAvailableSoon ? "#waitlist" : "/checkout"} className="block">
                    <Button className={`w-full h-14 rounded-xl font-bold text-sm shadow-lg transition-all ${course.isAvailableSoon ? 'bg-slate-900 hover:bg-slate-800' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-600/25'}`}>
                      {course.isAvailableSoon ? "Join the Waitlist" : "Enroll Now"}
                    </Button>
                  </Link>
                  <p className="text-center text-xs text-slate-500 font-medium">14-Day Money-Back Guarantee</p>

                  <div className="space-y-4 pt-6 border-t border-slate-100">
                    <p className="font-extrabold text-sm text-slate-900">Program Inclusions:</p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm text-slate-700 font-medium"><PlayCircle size={18} className="text-blue-500"/> {lessons.length} High-Quality Lessons</li>
                      <li className="flex items-center gap-3 text-sm text-slate-700 font-medium"><Target size={18} className="text-blue-500"/> Industry Projects</li>
                      <li className="flex items-center gap-3 text-sm text-slate-700 font-medium"><Globe size={18} className="text-blue-500"/> Lifetime Portal Access</li>
                      <li className="flex items-center gap-3 text-sm text-slate-700 font-medium"><Award size={18} className="text-blue-500"/> Official Certification</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Box 2: Integrated Form */}
              <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-200 p-8 relative overflow-hidden w-full">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><ShieldCheck size={100}/></div>
                
                <h3 className="font-extrabold text-xl text-slate-900 mb-1">Request Information</h3>
                <p className="text-sm font-medium text-slate-500 mb-6">Connect with an advisor for full curriculum details.</p>

                {isSubmitted ? (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 text-center bg-emerald-50 rounded-xl border border-emerald-100">
                     <CheckCircle2 size={32} className="text-emerald-500 mx-auto mb-3" />
                     <p className="text-base font-bold text-slate-900">Inquiry Received!</p>
                     <p className="text-xs font-medium text-slate-600 mt-1 px-4">An academic advisor will be in touch shortly.</p>
                   </motion.div>
                 ) : (
                   <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                     <div className="space-y-3">
                       <input name="fullname" required type="text" className="w-full text-sm font-medium px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-colors" placeholder="Full Name" />
                       <input name="email" required type="email" className="w-full text-sm font-medium px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-colors" placeholder="Work Email" />
                       <input name="phone" required type="tel" className="w-full text-sm font-medium px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-colors" placeholder="Phone Number" />
                     </div>
                     <Button disabled={loading} type="submit" className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2">
                        {loading ? "Submitting..." : <>Submit Inquiry <Send size={14}/></>}
                     </Button>
                     <p className="text-center text-[10px] font-medium text-slate-400 pt-2">By submitting, you agree to our Terms & Privacy Policy.</p>
                   </form>
                 )}
              </div>

              {/* Box 3: Differentiators */}
              {details.whyJoin?.length > 0 && (
                <div className="bg-slate-50 rounded-[1.5rem] border border-slate-200 p-8 space-y-5 w-full">
                  <h4 className="font-extrabold text-[11px] text-slate-400 uppercase tracking-widest">Why Join Us</h4>
                  <ul className="space-y-4">
                     {details.whyJoin.slice(0, 3).map((feat: any, i: number) => (
                       <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                         <Sparkles size={16} className="text-blue-600 shrink-0 mt-0.5" /> 
                         <span className="font-semibold">{feat.title}</span>
                       </li>
                     ))}
                   </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 🔹 BOTTOM TRUST SECTION (Industry Validated) */}
      <section className="bg-white border-t border-slate-200 py-20 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[10px] uppercase tracking-widest">
                 <ShieldCheck size={14} /> Official Certification
               </div>
               <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                 Earn a credential that <span className="text-blue-600">commands respect.</span>
               </h2>
               <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-lg">
                 Upon successful completion, you will receive a verifiable digital credential issued by <strong className="text-slate-900 font-extrabold">{details.certification?.awardedBy || "zenZcareer"}</strong>.
               </p>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pt-4">
                 {(details.certification?.features?.length > 0 ? details.certification.features : ['Shareable on LinkedIn', 'Global Recognition', 'Lifetime Validity', 'Verifiable Link']).map((f: string, i: number) => (
                   <div key={i} className="flex items-center gap-3 font-bold text-sm text-slate-700">
                     <BadgeCheck size={20} className="text-blue-600" /> {f}
                   </div>
                 ))}
               </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
               {[
                 { icon: Users, label: "Global Alumni", val: "12k+" },
                 { icon: Briefcase, label: "Hiring Partners", val: "450+" },
                 { icon: TrendingUp, label: "Avg. Salary Hike", val: "62%" },
                 { icon: Award, label: "Approval Rate", val: "99%" },
               ].map((box, i) => (
                 <div key={i} className="bg-slate-50 border border-slate-100 rounded-[1.5rem] p-8 sm:p-10 text-center flex flex-col items-center justify-center">
                    <box.icon size={28} className="text-slate-400 mb-5" />
                    <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">{box.val}</p>
                    <p className="font-bold text-[10px] text-slate-500 uppercase tracking-widest">{box.label}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 MOBILE STICKY BOTTOM BAR */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div 
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-50 p-4 sm:hidden flex items-center justify-between gap-4 pb-safe"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Total Fee</p>
              <p className="text-xl font-extrabold text-slate-900">₹{course.price}</p>
            </div>
            <Link href={course.isAvailableSoon ? "#waitlist" : "/checkout"} className="flex-1">
              <Button className={`w-full h-12 rounded-xl font-bold text-sm ${course.isAvailableSoon ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'}`}>
                {course.isAvailableSoon ? "Join Waitlist" : "Enroll Now"}
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* iOS Safe Area Padding for Mobile Bottom Bar */
        .pb-safe { padding-bottom: max(1rem, env(safe-area-inset-bottom)); }
        /* Hide scrollbar for nav tabs */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}