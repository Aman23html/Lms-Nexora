"use client"

import { Key, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { 
  CheckCircle2, Clock, Users, ShieldCheck, 
  Briefcase, PlayCircle, Star, Target, 
  TrendingUp, Globe, BadgeCheck, GraduationCap,
  ListChecks, SearchCheck, CheckCircle, Download, Database,
  ChevronDown, BookOpen, Award
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import CourseHeader from "@/components/CourseHeader"

// Subtle entrance animations
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

export default function CourseDetailsClient({ course }: { course: any }) {
  const details = course.details || {}
  
  // States for the new dropdown logic
  const [showElig, setShowElig] = useState(false)
  const [showPreReq, setShowPreReq] = useState(false)

  // Helper to parse newline separated lists safely
  const parseList = (text: string) => text?.split('\n').filter((l: string) => l.trim()) || []
  
  const eligibilityList = parseList(details.eligibility)
  const preReqList = parseList(details.preRequisites)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      <CourseHeader category={course.category} />

      {/* 🔹 HERO SECTION: Professional LMS Trust Banner */}
      <section className="bg-slate-900 text-white pt-20 pb-32 px-6 relative">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-400 via-slate-900 to-slate-900 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          
          <motion.div 
            className="lg:col-span-7 xl:col-span-8 pt-8 space-y-6"
            initial="hidden" animate="visible" variants={staggerContainer}
          >
            <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-3">
              <Badge className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full font-semibold text-xs tracking-wide">
                {course.category}
              </Badge>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                <span className="text-slate-300 font-medium text-sm ml-1.5 underline decoration-slate-600 underline-offset-4 cursor-pointer hover:text-white transition-colors">
                  (4.9/5 from 2,400+ reviews)
                </span>
              </div>
            </motion.div>
            
            <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-white">
              {course.title}
            </motion.h1>

            <motion.p variants={fadeUpVariants} className="text-slate-300 text-lg leading-relaxed max-w-3xl font-normal">
              {details.overview || "Master industry-standard competencies and accelerate your career trajectory with this comprehensive professional certification."}
            </motion.p>

            <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-6 pt-4 text-sm font-medium text-slate-300">
              <span className="flex items-center gap-2"><Globe size={18} className="text-indigo-400"/> Blended Learning</span>
              <span className="flex items-center gap-2"><Clock size={18} className="text-indigo-400"/> {course.duration}</span>
              <span className="flex items-center gap-2"><GraduationCap size={18} className="text-indigo-400"/> {course.instructor}</span>
            </motion.div>
          </motion.div>

          {/* 🔹 FLOATING ENROLLMENT CARD: Clean, High-Trust UI */}
          <motion.aside 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-5 xl:col-span-4 lg:absolute lg:right-6 lg:top-24 w-full lg:w-[400px] z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl shadow-slate-900/20 border border-slate-200 overflow-hidden">
               {/* Video Thumbnail */}
               <div className="relative aspect-video bg-slate-100 group cursor-pointer">
                  <img src={course.image} className="w-full h-full object-cover" alt="Course Preview" />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <PlayCircle className="text-indigo-600 w-8 h-8 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-0 w-full text-center">
                    <span className="bg-slate-900/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                      Preview this course
                    </span>
                  </div>
               </div>
               
               <div className="p-8 space-y-6">
                  <div className="space-y-1">
                    <div className="flex items-end gap-3">
                      <span className="text-4xl font-bold text-slate-900">₹{course.price}</span>
                      <span className="text-slate-400 line-through font-medium text-lg mb-1">
                        ₹{(parseInt(course.price?.replace(/,/g, '') || "0") * 1.5).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-emerald-600 font-semibold text-sm flex items-center gap-1">
                      <Award size={16}/> 33% discount applied automatically
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Link href="/contactus" className="block">
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-14 rounded-xl font-bold text-base shadow-md transition-all">
                        Enroll Now
                      </Button>
                    </Link>
                    <p className="text-center text-xs text-slate-500 font-medium">14-Day Money-Back Guarantee</p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <p className="font-semibold text-slate-900 text-sm">This course includes:</p>
                    <ul className="space-y-3">
                      {[
                        { text: 'Industry Real Projects', icon: Target },
                        { text: '24/7 Expert Mentorship', icon: Users },
                        { text: 'Job Portal Access', icon: Briefcase },
                        { text: 'Certificate of completion', icon: Award }
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                          <item.icon size={18} className="text-slate-400" /> {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="outline" className="w-full h-12 rounded-xl text-indigo-600 border-indigo-200 hover:bg-indigo-50 font-semibold text-sm flex items-center gap-2">
                    <Download size={16} /> Download Full Syllabus
                  </Button>
               </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* 🔹 MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 xl:col-span-8 space-y-20">
            
            {/* 01. PROGRAM OVERVIEW */}
            {details.description && (
              <section className="space-y-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                  About this course
                </h2>
                <div className="prose prose-slate prose-lg max-w-none text-slate-600">
                  {details.description}
                </div>

                {/* What you'll learn Grid */}
                {details.highlights?.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm mt-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">What you'll learn</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {details.highlights.map((h: string, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={20} className="text-indigo-600 shrink-0 mt-0.5" />
                          <p className="text-sm font-medium text-slate-700 leading-snug">{h}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* 02. ELIGIBILITY & REQUISITES (Redesigned with Dropdowns) */}
            {(eligibilityList.length > 0 || preReqList.length > 0) && (
              <section className="space-y-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                  Requirements & Eligibility
                </h2>
                
                <div className="grid grid-cols-1 gap-4">
                  
                  {/* Eligibility Accordion */}
                  {eligibilityList.length > 0 && (
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-slate-300">
                      <div 
                        className="p-6 cursor-pointer flex items-center justify-between bg-slate-50/50"
                        onClick={() => setShowElig(!showElig)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                            <ListChecks size={20} className="text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-lg">Who is this for?</h3>
                            <p className="text-sm text-slate-500 font-medium mt-1">
                              {showElig ? "Full criteria listed below" : eligibilityList[0]}
                            </p>
                          </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-transform duration-300 ${showElig ? 'rotate-180 bg-slate-100' : ''}`}>
                          <ChevronDown size={18} className="text-slate-500" />
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {showElig && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 pt-2 border-t border-slate-100 bg-white space-y-4">
                              {eligibilityList.map((line: string, idx: Key) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                                  <p className="text-slate-700 font-medium text-sm leading-relaxed">{line.trim()}</p>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Prerequisites Accordion */}
                  {preReqList.length > 0 && (
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-slate-300">
                      <div 
                        className="p-6 cursor-pointer flex items-center justify-between bg-slate-50/50"
                        onClick={() => setShowPreReq(!showPreReq)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                            <SearchCheck size={20} className="text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-lg">Technical Prerequisites</h3>
                            <p className="text-sm text-slate-500 font-medium mt-1">
                              {showPreReq ? "Required skills listed below" : preReqList[0]}
                            </p>
                          </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-transform duration-300 ${showPreReq ? 'rotate-180 bg-slate-100' : ''}`}>
                          <ChevronDown size={18} className="text-slate-500" />
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {showPreReq && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 pt-2 border-t border-slate-100 bg-white space-y-4">
                              {preReqList.map((line: string, idx: Key) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                                  <p className="text-slate-700 font-medium text-sm leading-relaxed">{line.trim()}</p>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                </div>
              </section>
            )}

            {/* 03. MARKET IMPACT MANIFEST (Clean Stats) */}
            <section className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-10 shadow-xl shadow-indigo-600/20">
               <div className="flex-1 space-y-4">
                  <Badge className="bg-indigo-500/50 text-indigo-100 border-none px-3 py-1 text-xs font-semibold rounded-full mb-2">
                    Career Impact
                  </Badge>
                  <h3 className="text-3xl font-bold leading-tight">Elevate your professional value.</h3>
                  <p className="text-indigo-100 text-lg font-medium leading-relaxed max-w-lg">
                    {details.benefits?.description || "Learners report significant career advancements and salary hikes within 6 months of completion."}
                  </p>
               </div>
               <div className="w-full md:w-auto bg-white rounded-2xl p-8 text-center min-w-[240px] shadow-lg">
                  <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Projected Salary Growth</p>
                  <p className="text-5xl font-extrabold text-indigo-600">+{details.benefits?.marketGrowth || "40%+"}</p>
               </div>
            </section>

            {/* 04. FAQ REGISTRY */}
            {details.faqs?.length > 0 && (
              <section className="space-y-8">
                 <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
                 <div className="space-y-4">
                   {details.faqs.map((faq: any, i: number) => (
                     <details key={i} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden shadow-sm">
                        <summary className="flex justify-between items-center p-6 font-bold text-slate-900 cursor-pointer text-base hover:bg-slate-50 transition-colors">
                          {faq.question}
                          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-transform duration-300 group-open:rotate-180 bg-white">
                            <ChevronDown size={18} className="text-slate-500" />
                          </div>
                        </summary>
                        <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed font-medium">
                          {faq.answer}
                        </div>
                     </details>
                   ))}
                 </div>
              </section>
            )}
          </div>
        </div>
      </main>

      {/* 🔹 VALIDATION SECTION: Industry Trust Matrix */}
      <section className="bg-white border-t border-slate-200 py-20 px-6 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm">
               <ShieldCheck size={16} /> Industry Validated
             </div>
             <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
               Earn a credential that <span className="text-indigo-600">stands out.</span>
             </h2>
             <p className="text-slate-600 text-lg leading-relaxed font-medium max-w-lg">
               Upon completion, you'll receive a verifiable digital credential issued by <strong className="text-slate-900">{details.certification?.awardedBy || "zenZcareer"}</strong>, proving your mastery to top employers worldwide.
             </p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
               {(details.certification?.features || ['Shareable on LinkedIn', 'Verifiable Link', 'Lifetime Access']).map((f: string, i: number) => (
                 <div key={i} className="flex items-center gap-3 font-semibold text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                   <BadgeCheck size={18} className="text-indigo-600" /> {f}
                 </div>
               ))}
             </div>
          </div>
          
          {/* Professional Trust Grid */}
          <div className="grid grid-cols-2 gap-4 w-full">
             {[
               { icon: Users, label: "Global Alumni", val: "12k+" },
               { icon: Briefcase, label: "Hiring Partners", val: "450+" },
               { icon: TrendingUp, label: "Avg. Salary Hike", val: "62%" },
               { icon: Award, label: "Approval Rate", val: "99%" },
             ].map((box, i) => (
               <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center hover:border-indigo-300 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <box.icon size={20} className="text-indigo-600" />
                  </div>
                  <p className="text-3xl font-bold text-slate-900 tracking-tight mb-1">{box.val}</p>
                  <p className="font-semibold text-sm text-slate-500">{box.label}</p>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  )
}