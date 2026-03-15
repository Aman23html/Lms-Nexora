import { notFound } from "next/navigation"
import Link from "next/link"
import { 
  CheckCircle2, Clock, Users, ShieldCheck, 
  Award, HelpCircle, Briefcase, PlayCircle, Star, Zap, 
  ChevronRight, BarChart3, Target, FileText,
  TrendingUp, Globe, BadgeCheck, GraduationCap,
  ChevronLeft, Info, ListChecks, SearchCheck,
  CheckCircle, Download
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import CourseHeader from "@/components/CourseHeader"
import { Key } from "react"

async function getCourse(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  try {
    const res = await fetch(`${baseUrl}/api/admin/courses/${id}`, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" }
    })
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    return null
  }
}

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = await getCourse(id)

  if (!course) return notFound()

  const details = course.details || {}

  // 🔹 "Coming Soon" State UI
  if (course.isAvailableSoon) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
         <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mb-8 shadow-xl animate-bounce">
            <Clock size={32} />
         </div>
         <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight uppercase">{course.title}</h1>
         <p className="text-slate-500 max-w-lg text-lg font-medium leading-relaxed">
            The curriculum is currently being calibrated for the next industry standard. 
            Deployment to Nexora Registry scheduled shortly.
         </p>
         <div className="mt-10 flex gap-4">
           <Link href="/contactus">
             <Button className="bg-blue-600 hover:bg-blue-700 h-14 px-10 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-200">
               Notify Me
             </Button>
           </Link>
           <Link href="/">
             <Button variant="outline" className="h-14 px-10 rounded-xl font-bold uppercase tracking-widest text-xs border-slate-200">
               Back to Inventory
             </Button>
           </Link>
         </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 font-sans">
      
      {/* 🔹 PERSISTENT BREADCRUMB HEADER */}
      <CourseHeader category={course.category} />

      {/* 🔹 PROFESSIONAL HERO SECTION */}
      <section className="bg-slate-900 text-white pt-20 pb-28 px-6 relative overflow-hidden">
        {/* Subtle background geometric overlay */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 skew-x-12 transform origin-right translate-x-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex flex-wrap items-center gap-4">
              <Badge className="bg-blue-600 text-white border-none px-4 py-1.5 rounded-sm font-bold text-[10px] uppercase tracking-widest">
                {course.category} Certification
              </Badge>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                <span className="text-slate-400 text-xs font-bold ml-2">(4.9/5 Rating)</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
              {course.title}
            </h1>

            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl font-medium border-l-4 border-blue-600 pl-6">
              {details.overview || "Professional certification designed to master industry-standard competencies and accelerate your career trajectory."}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/10">
              {[
                { label: "Learning Mode", value: "Blended Learning", icon: Globe },
                { label: "Difficulty", value: course.level, icon: BarChart3 },
                { label: "Course Duration", value: course.duration, icon: Clock },
                { label: "Accreditor", value: course.instructor, icon: GraduationCap },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
                    <stat.icon size={12} className="text-blue-500" /> {stat.label}
                  </span>
                  <p className="text-white font-bold text-sm">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 🔹 ENROLLMENT ASIDE (Mobile: In-flow, Desktop: Sticky) */}
          <aside className="lg:col-span-4 lg:absolute lg:right-6 lg:top-24 lg:w-96">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-900 group">
               <div className="relative aspect-video overflow-hidden">
                  <img src={course.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Course" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <PlayCircle className="text-white w-16 h-16" strokeWidth={1} />
                  </div>
               </div>
               
               <div className="p-10 space-y-8">
                  <div className="space-y-2">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Investment Value</p>
                    <div className="flex items-center gap-4">
                      <span className="text-5xl font-black text-slate-900 tracking-tighter">₹{course.price}</span>
                      <span className="text-slate-300 line-through font-bold text-lg">₹{(parseInt(course.price?.replace(/,/g, '') || "0") * 1.5).toLocaleString()}</span>
                    </div>
                  </div>

                  <Link href="/contactus" className="block">
                    <Button className="w-full bg-blue-600 hover:bg-slate-900 text-white h-16 rounded-xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl transition-all">
                      Begin Admission
                    </Button>
                  </Link>

                  <ul className="space-y-4 pt-6 border-t border-slate-100">
                    {['Industry Real Projects', '24/7 Mentorship', 'Job Portal Access'].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-xs font-bold text-slate-700">
                        <CheckCircle2 size={16} className="text-emerald-500" /> {item}
                      </li>
                    ))}
                  </ul>

                  <Button variant="link" className="w-full text-blue-600 font-bold text-xs uppercase flex items-center gap-2">
                    <Download size={14} /> Download Syllabus
                  </Button>
               </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 🔹 MAIN CURRICULUM ARCHITECTURE */}
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-8 space-y-32">
            
            {/* 01. NARRATIVE SECTION */}
            {details.description && (
              <div className="space-y-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-blue-600" /> Program Overview
                  </h3>
                  <div className="prose prose-slate max-w-none text-slate-600 text-lg leading-relaxed font-medium">
                    {details.description}
                  </div>
                </div>

                {/* Highlights Grid */}
                {details.highlights?.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {details.highlights.map((h: string, i: number) => (
                      <div key={i} className="flex gap-4 p-6 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:border-blue-200 transition-all group">
                        <CheckCircle size={20} className="text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-sm font-bold text-slate-700 uppercase tracking-tight leading-snug">{h}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 02. LEARNING OUTCOMES (The Value) */}
            {details.learningOutcomes?.length > 0 && (
              <div className="bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-white space-y-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-20 opacity-10"><Target size={300} /></div>
                <div className="space-y-2 relative z-10">
                   <h3 className="text-3xl md:text-5xl font-black tracking-tight">What You Will <span className="text-blue-500">Gain.</span></h3>
                   <p className="text-slate-400 font-medium">Industry-aligned competencies verified by Nexora Registry.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  {details.learningOutcomes.map((item: string, i: number) => (
                    <div key={i} className="flex gap-4 items-start p-4 bg-white/5 border border-white/10 rounded-xl">
                       <ShieldCheck size={20} className="text-blue-400 shrink-0" />
                       <p className="text-slate-200 font-bold text-sm leading-snug uppercase tracking-tight">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 03. MARKET IMPACT MANIFEST (Stats) */}
            <div className="bg-blue-600 rounded-[2.5rem] p-12 md:p-16 text-white flex flex-col md:flex-row items-center gap-12 relative overflow-hidden shadow-2xl">
               <div className="flex-1 space-y-6">
                  <Badge className="bg-white/20 text-white border-none text-[9px] font-black uppercase tracking-[0.3em]">Career Velocity</Badge>
                  <h3 className="text-4xl font-black leading-tight tracking-tight uppercase">Professional Impact</h3>
                  <p className="text-blue-100 font-medium text-lg italic opacity-90 leading-relaxed">
                    {details.benefits?.description}
                  </p>
               </div>
               <div className="w-full md:w-auto bg-white rounded-3xl p-12 text-center min-w-[260px] shadow-2xl border-b-[10px] border-blue-800">
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">Projected Salary Growth</p>
                  <p className="text-6xl font-black text-slate-900 tracking-tighter">+{details.benefits?.marketGrowth || "40%+"}</p>
                  <div className="h-1.5 w-16 bg-blue-600 mx-auto mt-4 rounded-full" />
               </div>
            </div>

            {/* 04. ELIGIBILITY & REQUISITES */}
            {(details.eligibility || details.preRequisites) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="p-10 bg-slate-50 border border-slate-100 rounded-3xl space-y-6 hover:bg-white hover:border-blue-100 transition-all">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
                    <ListChecks size={20} className="text-blue-600" /> Eligibility Criteria
                  </h4>
                  <div className="space-y-4">
                    {details.eligibility?.split('\n').filter((l: string) => l.trim()).map((line: string, idx: Key | null | undefined) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                        <p className="text-slate-700 font-bold leading-relaxed text-[14px]">{line.trim()}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-10 bg-slate-50 border border-slate-100 rounded-3xl space-y-6 hover:bg-white hover:border-orange-100 transition-all">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
                    <SearchCheck size={20} className="text-orange-600" /> Prerequisites
                  </h4>
                  <div className="space-y-4">
                    {details.preRequisites?.split('\n').filter((l: string) => l.trim()).map((line: string, idx: Key | null | undefined) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
                        <p className="text-slate-700 font-bold leading-relaxed text-[14px]">{line.trim()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 05. SKILLS MATRIX */}
            <div className="space-y-12">
               <h3 className="text-2xl font-black uppercase tracking-widest text-slate-900 flex items-center gap-4">
                 <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center"><Zap size={20} fill="currentColor" /></div>
                 Mastery Points
               </h3>
               <div className="flex flex-wrap gap-3">
                 {details.skillsCovered?.map((s: string, i: number) => (
                   <span key={i} className="px-6 py-4 bg-white border border-slate-200 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-800 shadow-sm hover:border-blue-600 transition-all">
                     {s}
                   </span>
                 ))}
               </div>
            </div>

            {/* 06. PROGRAM DIFFERENTIATION (Why Join) */}
            <div className="space-y-12">
               <h3 className="text-3xl font-black tracking-tight text-slate-900 uppercase">The <span className="text-blue-600 italic">Nexora</span> Advantage.</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {details.whyJoin?.map((item: any, i: number) => (
                   <div key={i} className="p-10 bg-white border border-slate-200 rounded-3xl space-y-4 hover:shadow-2xl transition-all border-t-[8px] border-t-blue-600">
                      <h4 className="font-black text-xl text-slate-900 uppercase tracking-tighter">{item.title}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">{item.content}</p>
                   </div>
                 ))}
               </div>
            </div>

            {/* 07. FAQ REGISTRY */}
            {details.faqs?.length > 0 && (
              <div className="space-y-12">
                 <h3 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">General <span className="text-slate-400">Registry FAQs.</span></h3>
                 <div className="space-y-4">
                   {details.faqs.map((faq: any, i: number) => (
                     <details key={i} className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                        <summary className="flex justify-between items-center p-8 font-black text-slate-900 cursor-pointer list-none text-base uppercase tracking-tight group-open:bg-slate-50 transition-colors">
                          {faq.question}
                          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-transform group-open:rotate-90"><ChevronRight size={14} className="text-slate-400" /></div>
                        </summary>
                        <div className="px-8 pb-10 pt-2 text-slate-500 leading-relaxed font-medium italic border-t border-slate-50">
                          "{faq.answer}"
                        </div>
                     </details>
                   ))}
                 </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 🔹 VALIDATION SECTION (Certificate Details) */}
      <section className="bg-slate-50 py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
          <div className="flex-1 space-y-10">
             <div className="space-y-4">
               <Badge className="bg-emerald-100 text-emerald-700 border-none font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-sm">Verified Credentials</Badge>
               <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-slate-900">Industry Validated <br /> Mastery.</h2>
             </div>
             <p className="text-slate-600 text-xl leading-relaxed font-medium">
               Upon successful program completion, you will receive a global credential issued by **{details.certification?.awardedBy || "zenZcareer"}**, validating your dominance in this technical node.
             </p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {(details.certification?.features || []).map((f: string, i: number) => (
                 <div key={i} className="flex items-center gap-4 text-[11px] font-black text-slate-700 uppercase tracking-widest bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                   <BadgeCheck size={20} className="text-blue-600" /> {f}
                 </div>
               ))}
             </div>
          </div>
          {/* 🔹 Replaced Certificate Image with Professional Trust Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4">
             {[
               { icon: Users, label: "Global Alumni", val: "12k+" },
               { icon: Briefcase, label: "Hiring Partners", val: "450+" },
               { icon: TrendingUp, label: "Salary Hike", val: "62% Avg" },
               { icon: ShieldCheck, label: "Course Rating", val: "4.9/5" },
             ].map((box, i) => (
               <div key={i} className="bg-white border border-slate-200 p-10 rounded-3xl text-center space-y-4 shadow-xl shadow-slate-100/50">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mx-auto"><box.icon size={24}/></div>
                  <div>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter">{box.val}</p>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">{box.label}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  )
}