import React from 'react'
import { 
  Users, BookOpen, Star, DollarSign, Target, CheckCircle2, 
  ArrowRight, ShieldCheck, Mail, Phone, Globe, Briefcase, Sparkles 
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function BecomeInstructorPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans selection:bg-blue-100">
      
      {/* 🔹 HERO SECTION: Full-Width Executive Dark Theme */}
      <section className="bg-[#0B1120] text-white pt-24 pb-28 px-4 sm:px-6 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full translate-x-1/4 translate-y-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-md text-[10px] font-bold uppercase tracking-widest text-slate-300">
              Global Faculty Network
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Passionate about teaching & sharing your expertise?
            </h1>
            <p className="text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Join a platform where you can inspire learners, connect with professionals, and make a real impact on careers—while earning additional income along the way.
            </p>
          </div>
          
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl text-center max-w-sm w-full shadow-2xl">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Empowering Growth</p>
              <p className="text-3xl font-bold text-white tracking-tight">You’re in the Right Place</p>
              <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                At ZenzLearn, we’re building a global community of passionate educators and industry professionals who are committed to delivering high-quality, impactful learning experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 MAIN TWO-COLUMN LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Value Propositions & Requirements */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* Value Blocks */}
            <div className="space-y-10">
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                  <Globe size={22} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Why Join ZenzLearn?</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Your knowledge has the power to shape careers. When you teach with us, your content reaches learners around the world—giving you greater visibility, a wider audience, and the opportunity to establish yourself as a trusted expert in your field.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm">
                  <DollarSign size={22} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Earn While You Teach</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    We value the time, effort, and expertise you bring. That’s why we offer a flexible earning model that allows you to generate consistent income as your courses grow. The more value you create, the more you earn.
                  </p>
                </div>
              </div>
            </div>

            {/* Requirements Matrix */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-sm space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">What We’re Looking For</h3>
                <p className="text-slate-500 text-sm font-medium mt-1">Our standard profiles match specific expertise benchmarks:</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "A genuine passion for teaching and mentoring professionals",
                  "Strong domain expertise, backed by relevant certifications or experience",
                  "Clear, concise communication and engaging presentation skills",
                  "Unwavering commitment to high-quality learning assets"
                ].map((req, i) => (
                  <div key={i} className="flex gap-3.5 items-start">
                    <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                      <CheckCircle2 size={12} />
                    </div>
                    <p className="text-slate-700 text-sm font-semibold leading-relaxed">{req}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 🔹 RIGHT COLUMN: Sticky Registration Intake Form */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-md sticky top-24 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Apply to Teach</h3>
                <p className="text-xs font-medium text-slate-500 mt-1">Submit your dossier to our academic registry board.</p>
              </div>

              {/* standard submission container to match architecture */}
              <form className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Full Name</label>
                  <input required type="text" name="fullname" className="w-full text-sm font-semibold px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-colors" placeholder="e.g. Dr. Alex Mercer" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Email Address</label>
                    <input required type="email" name="email" className="w-full text-sm font-semibold px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-colors" placeholder="alex@company.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Phone Number</label>
                    <input required type="tel" name="phone" className="w-full text-sm font-semibold px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-colors" placeholder="+91 00000 00000" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Primary Domain Expertise</label>
                  <select name="domain" className="w-full text-sm font-semibold px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-colors appearance-none">
                    <option>Artificial Intelligence & Data Engineering</option>
                    <option>Full-Stack Web Architectures</option>
                    <option>Cloud Infrastructure & DevOps</option>
                    <option>Product Management & Business Strategy</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Brief Profile Bio</label>
                  <textarea name="bio" className="w-full text-sm font-semibold px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-colors min-h-[100px] resize-none" placeholder="Highlight your professional training background..." />
                </div>

                <Button className="w-full h-12 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md flex items-center justify-center gap-2 mt-2 transition-colors">
                  Submit Faculty Application <ArrowRight size={14}/>
                </Button>
                
                <p className="text-center text-[10px] font-medium text-slate-400 pt-2">
                  By applying, you agree to comply with ZenzLearn's standard quality guidelines.
                </p>
              </form>
            </div>
          </div>

        </div>
      </main>

      {/* 🔹 SYSTEM FOOTER ACCREDITATION */}
      <section className="bg-white border-t border-slate-200 py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-50 p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h4 className="font-bold text-xl text-slate-900 tracking-tight flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck size={20} className="text-blue-600"/> Fully Vetted Operations
            </h4>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              ZenzLearn maintains a premium learning catalog. All applications undergo comprehensive peer review by our steering committee before onboarding profiles onto live systems.
            </p>
          </div>
          <div className="flex gap-6 shrink-0 text-slate-300 font-black tracking-tighter text-2xl select-none">
             <span>FACULTY</span> • <span>STEERING</span> • <span>BOARD</span>
          </div>
        </div>
      </section>
    </div>
  )
}