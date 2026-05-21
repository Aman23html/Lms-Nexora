'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, DollarSign, CheckCircle2, ArrowRight, ShieldCheck, 
  Mail, Phone, MapPin, Globe, Headphones, MessageSquare, Sparkles 
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function BecomeInstructorPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const data = new FormData(form)
    const url = "https://script.google.com/macros/s/AKfycbzRexSqcFo6093iso8fEdpQTy7uveHkqnBllDgnojIoTQsPvmTwKnpvVfbJPHJAKccv/exec"

    try {
      await fetch(url, {
        method: "POST",
        body: new URLSearchParams({
          FullName: data.get("fullname") as string,
          Email: data.get("email") as string,
          Phone: data.get("phone") as string,
          Program: data.get("domain") as string, // Maps to the "Program" column in sheet
          Message: data.get("bio") as string,   // Maps to the "Message" column in sheet
        }),
      })

      setIsSubmitted(true)
      form.reset()
    } catch (error) {
      console.error(error)
      alert("Error submitting faculty dossier application.")
    } finally {
      setLoading(false)
    }
  }

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
              <InstructorValueNode 
                icon={<DollarSign size={20} />} 
                title="Monetize Expertise" 
                detail="Earn While You Teach" 
                sub="We value your engineering experience. Benefit from a flexible earning model that scales consistently as your student cohort base expands."
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

          {/* 🔹 RIGHT COLUMN: THE GOOGLE SHEETS SYNCED FORM */}
          <div className="lg:col-span-7 lg:sticky lg:top-12">
            <div className="bg-white border border-slate-200 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
              
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Dossier Logged</h2>
                  <p className="text-slate-500 font-medium max-w-xs mx-auto">
                    Your faculty application has reached our academic steering registry board. Expect a connection protocol status call within 24 hours.
                  </p>
                  <Button variant="outline" onClick={() => setIsSubmitted(false)} className="rounded-xl border-slate-200 font-bold uppercase tracking-widest text-[10px]">
                    Submit another application
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label-elite">Full Name</label>
                      <input name="fullname" required type="text" className="form-input-elite" placeholder="Dr. Alex Mercer" />
                    </div>
                    <div className="space-y-2">
                      <label className="label-elite">Work Email</label>
                      <input name="email" required type="email" className="form-input-elite" placeholder="alex@company.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label-elite">Phone Number</label>
                      <input name="phone" required type="tel" className="form-input-elite" placeholder="+91 00000 00000" />
                    </div>
                    <div className="space-y-2">
                      <label className="label-elite">Primary Domain Expertise</label>
                      <div className="relative">
                        <select name="domain" className="form-input-elite bg-slate-50 cursor-pointer pr-10">
                          <option>Concern Related to Instructor</option>
                          
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="label-elite">Brief Profile Bio & Background</label>
                    <textarea name="bio" required className="form-input-elite min-h-[150px] pt-4 resize-none" placeholder="Tell us about your core technical background and lecture records..." />
                  </div>

                  <Button 
                    disabled={loading}
                    type="submit" 
                    className="w-full h-16 bg-blue-600 hover:bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] shadow-xl transition-all flex items-center justify-center gap-3"
                  >
                    {loading ? "Processing..." : <>Submit Faculty Application <ArrowRight size={16} /></>}
                  </Button>

                  <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    By submitting, you agree to comply with ZenzLearn's standard quality guidelines.
                  </p>
                </form>
              )}
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

      {/* 🔹 INTERNAL BASE COMPONENT STYLES */}
      <style jsx global>{`
        .form-input-elite {
          width: 100%;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1rem 1.25rem;
          outline: none;
          transition: all 0.2s;
          font-weight: 600;
          font-size: 14px;
          color: #0f172a;
        }
        .form-input-elite:focus {
          border-color: #3b82f6;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.08);
        }
        .label-elite {
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #94a3b8;
          display: block;
          margin-left: 0.25rem;
          margin-bottom: 0.6rem;
        }
      `}</style>
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