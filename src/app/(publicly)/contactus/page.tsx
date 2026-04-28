'use client'

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Globe, 
  Clock,
  ShieldCheck,
  ArrowRight,
  Headphones
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactUsPage() {
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
        Program: data.get("program") as string,
        Message: data.get("message") as string,
      }),
    })

    setIsSubmitted(true)
    form.reset()

  } catch (error) {
    console.error(error)
    alert("Error submitting form")
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-blue-100">
      
      {/* 🔹 SUBTLE HEADER INDICATOR */}
      <div className="bg-white border-b border-slate-100 py-4 px-6 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck size={14} className="text-blue-600" /> Secure Inquiry Encryption Active
        </p>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          {/* 左侧: CONTACT INFO & TRUST NODES */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
                Connect with <br /> <span className="text-blue-600">Admissions.</span>
              </h1>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md">
                Our academic advisors are available to help you navigate your technical career pathway.
              </p>
            </div>

            <div className="space-y-4">
              <ContactNode 
                icon={<Phone size={20} />} 
                title="Admissions Hotline" 
                detail="+91 (800) NEXORA-GL" 
                sub="Mon-Sat, 9AM - 7PM IST"
              />
              <ContactNode 
                icon={<Mail size={20} />} 
                title="Official Registry" 
                detail="admissions@nexoraglobal.com" 
                sub="24h response protocol"
              />
              <ContactNode 
                icon={<MapPin size={20} />} 
                title="Corporate HQ" 
                detail="Nexora Tech Park, Level 4" 
                sub="Bangalore, KA, India"
              />
            </div>

            {/* Support Badge */}
            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white flex items-center gap-6 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10"><Headphones size={80} /></div>
               <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                  <MessageSquare size={24} />
               </div>
               <div>
                  <p className="font-black text-xs uppercase tracking-widest text-blue-400">Student Support</p>
                  <p className="font-bold text-sm text-slate-300">Live chat available for enrolled professionals.</p>
               </div>
            </div>
          </div>

          {/* 右侧: THE INQUIRY FORM */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
              
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Inquiry Logged</h2>
                  <p className="text-slate-500 font-medium max-w-xs mx-auto">
                    An advisor has been assigned to your profile. Expect a connection within 4 business hours.
                  </p>
                  <Button variant="outline" onClick={() => setIsSubmitted(false)} className="rounded-xl border-slate-200 font-bold uppercase tracking-widest text-[10px]">
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label-elite">Full Name</label>
                      <input name="fullname" required type="text" className="form-input-elite" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="label-elite">Work Email</label>
                      <input name="email" required type="email" className="form-input-elite" placeholder="john@company.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label-elite">Phone Number</label>
                      <input name="phone" required type="tel" className="form-input-elite" placeholder="+91 00000 00000" />
                    </div>
                    <div className="space-y-2">
                      <label className="label-elite">Interested Program</label>
                      <select name="program" className="form-input-elite appearance-none bg-slate-50">
                        <option>Full Stack Development</option>
                        <option>AI & Machine Learning</option>
                        <option>Data Science Masterclass</option>
                        <option>Cyber Security</option>
                        <option>Others</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="label-elite">Your Inquiry</label>
                    <textarea name="message" required className="form-input-elite min-h-[150px] pt-4" placeholder="Tell us about your career goals..." />
                  </div>

                  <Button 
                    disabled={loading}
                    type="submit" 
                    className="w-full h-16 bg-blue-600 hover:bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] shadow-xl transition-all flex items-center justify-center gap-3"
                  >
                    {loading ? "Processing..." : <>Send Manifest <ArrowRight size={16} /></>}
                  </Button>

                  <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    By submitting, you agree to our <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* 🔹 BOTTOM GLOBAL FOOTER INDICATOR */}
      <footer className="bg-white border-t border-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           {['Microsoft', 'Google', 'Amazon', 'Meta', 'Netflix'].map((partner) => (
             <span key={partner} className="text-2xl font-black tracking-tighter text-slate-400">{partner}</span>
           ))}
        </div>
      </footer>

      {/* 🔹 INTERNAL STYLES */}
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
        }
      `}</style>
    </div>
  )
}

/** 🔹 SUB-COMPONENT: CONTACT NODE */
function ContactNode({ icon, title, detail, sub }: { icon: React.ReactNode, title: string, detail: string, sub: string }) {
  return (
    <div className="flex items-start gap-5 p-6 bg-white border border-slate-100 rounded-3xl hover:shadow-xl hover:border-blue-50 transition-all group">
      <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">{title}</p>
        <p className="text-lg font-bold text-slate-900 tracking-tight">{detail}</p>
        <p className="text-xs text-slate-500 font-medium">{sub}</p>
      </div>
    </div>
  )
}