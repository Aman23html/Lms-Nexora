'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Mail, 
  MapPin, 
  Phone, 
  Sparkles, 
  ArrowRight,
  Send,
  Globe,
  ChevronRight
} from 'lucide-react'

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Contact Us", href: "/contactus" },
      { name: "Admin Portal", href: "/admin/courses" }
    ]
  },
  {
    title: "Work With Us",
    links: [
      { name: "Become an Instructor", href: "/instructor" },
      { name: "Careers", href: "/careers" },
      { name: "Partner Network", href: "/partners" }
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Student Success", href: "/reviews" },
      { name: "Community Forum", href: "/community" },
      { name: "Tech Blog", href: "/blog" }
    ]
  }
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/60 pt-20 pb-10 overflow-hidden relative font-sans">
      
      {/* --- Ambient Background Glows --- */}
      <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-violet-50/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        
        {/* --- Top CTA Banner --- */}
        <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-[2rem] p-8 md:p-12 mb-20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-blue-900/10">
          <div className="max-w-xl">
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
              Ready to accelerate your engineering career?
            </h3>
            <p className="text-blue-100 font-medium">
              Join 100,000+ developers building the future of AI and Web infrastructure.
            </p>
          </div>
          <Link href="/courses">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg whitespace-nowrap flex items-center gap-2">
              Explore Curriculum <ArrowRight size={18} />
            </button>
          </Link>
        </div>

        {/* --- Main Footer Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Socials Column */}
          <div className="lg:col-span-4 pr-8">
            <Link href="/" className="flex items-center gap-2.5 group cursor-pointer mb-6">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-violet-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:rotate-6 group-hover:scale-105 transition-all duration-300">
                <Sparkles size={20} fill="currentColor" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900">
                NEX<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">ORA</span>
              </span>
            </Link>
            
            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
              The elite technical ecosystem for modern engineers. High-fidelity interactive content and progress tracking used by world-class teams.
            </p>

            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Youtube].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm"
                >
                  <Icon size={18} strokeWidth={2} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Dynamic Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerLinks.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-slate-900 font-bold text-sm mb-6">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link 
                        href={link.href} 
                        className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center group"
                      >
                        <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-blue-500 mr-1" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="text-slate-900 font-bold text-sm mb-6">Contact Us</h4>
            <div className="space-y-5">
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Support</p>
                  <p className="text-sm font-semibold text-slate-700">hello@nexora.ai</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Admissions</p>
                  <p className="text-sm font-semibold text-slate-700">+91 (800) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Headquarters</p>
                  <p className="text-sm font-semibold text-slate-700">Bihar, India</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* --- Bottom Legal / Status Bar --- */}
        <div className="pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-slate-500">
              © {new Date().getFullYear()} Nexora Systems. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
              <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            </div>
            
            <div className="hidden md:block w-px h-4 bg-slate-300" />

            <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">All Systems Normal</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}