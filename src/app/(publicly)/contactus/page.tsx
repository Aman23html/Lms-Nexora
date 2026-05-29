import React from 'react'
import { ShieldCheck, Globe, CheckCircle2, Sparkles } from 'lucide-react'
import InstructorForm from './InstructorForm' // Adjust the import path as needed

export default function BecomeInstructorPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-blue-100 font-sans">
      
      {/* 🔹 SUBTLE HEADER INDICATOR */}
      <div className="bg-white border-b border-slate-100 py-4 px-6 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck size={14} className="text-blue-600" /> Secure Faculty Encryption Active
        </p>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          {/* 🔹 LEFT COLUMN: BRAND INFO & TRUST NODES */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
                Teach on <br /> <span className="text-blue-600">ZenzLearn.</span>
              </h1>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md">
                Join a global platform where you can inspire learners, connect with professionals, and make a real impact on technical careers.
              </p>
            </div>

            {/* Value Blocks Styled as Contact Nodes */}
            <div className="space-y-4">
              <InstructorValueNode 
                icon={<Globe size={20} />} 
                title="Global Footprint" 
                detail="Why Join ZenzLearn?" 
                sub="Your knowledge has the power to shape careers. Reach learners around the world, gain visibility, and establish yourself as a trusted domain expert."
              />
            </div>

            {/* Core Requirements Badge */}
            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-4 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Sparkles size={80} /></div>
               <p className="font-black text-xs uppercase tracking-widest text-blue-400">What We Look For</p>
               <ul className="space-y-2.5 text-sm text-slate-300 font-medium">
                 <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500" /> Genuine passion for professional mentorship</li>
                 <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500" /> Strong verifiable industry workspace depth</li>
                 <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500" /> Engaging communication & lecture skills</li>
               </ul>
            </div>
          </div>

          {/* 🔹 RIGHT COLUMN: THE CLIENT COMPONENT FORM */}
          <div className="lg:col-span-7 lg:sticky lg:top-12">
            <div className="bg-white border border-slate-200 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
              <InstructorForm />
            </div>
          </div>

        </div>
      </main>

      {/* 🔹 BOTTOM METRIC ACCREDITATION */}
      <footer className="bg-white border-t border-slate-100 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-50 p-8 sm:p-12 rounded-[2rem] border border-slate-100">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h4 className="font-bold text-xl text-slate-900 tracking-tight flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck size={20} className="text-blue-600"/> Fully Vetted Operations
            </h4>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              ZenzLearn maintains a premium learning catalog. All applications undergo comprehensive peer review by our steering committee before onboarding profiles onto live environments.
            </p>
          </div>
          <div className="flex gap-6 shrink-0 text-slate-300 font-black tracking-tighter text-2xl select-none">
             <span>FACULTY</span> • <span>STEERING</span> • <span>BOARD</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

/** 🔹 HELPER CARD: NODE RE-USE */
function InstructorValueNode({ icon, title, detail, sub }: { icon: React.ReactNode, title: string, detail: string, sub: string }) {
  return (
    <div className="flex items-start gap-5 p-6 bg-white border border-slate-100 rounded-3xl hover:shadow-xl hover:border-blue-50 transition-all group">
      <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">{title}</p>
        <p className="text-lg font-bold text-slate-900 tracking-tight">{detail}</p>
        <p className="text-sm text-slate-500 font-medium leading-relaxed">{sub}</p>
      </div>
    </div>
  )
}