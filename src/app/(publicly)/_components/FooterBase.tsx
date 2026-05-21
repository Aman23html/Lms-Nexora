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
    <footer className="bg-white border-t border-slate-200/60 pt-12 md:pt-20 pb-8 overflow-hidden relative font-sans">
      
      {/* --- Ambient Background Glows --- */}
      <div className="absolute top-0 left-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-50/50 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-indigo-50/50 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Top CTA Banner --- */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl md:rounded-[2rem] p-6 sm:p-8 md:p-12 mb-12 md:mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 shadow-xl shadow-blue-900/5">
          <div className="max-w-xl">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-2 md:mb-3">
              Ready to accelerate your engineering career?
            </h3>
            <p className="text-blue-100 text-sm sm:text-base font-medium">
              Join 100,000+ developers building the future of AI and Web infrastructure.
            </p>
          </div>
          <Link href="/courses" className="w-full md:w-auto shrink-0">
            <button className="w-full md:w-auto bg-white text-blue-600 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-lg whitespace-nowrap flex items-center justify-center gap-2 text-sm sm:text-base group/btn">
              Explore Curriculum 
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* --- Main Footer Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-12 gap-8 md:gap-10 mb-12 md:mb-16">
          
          {/* Brand & Description */}
          <div className="sm:col-span-3 lg:col-span-4 space-y-4 md:space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                <Sparkles size={18} fill="currentColor" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Zenz<span className="text-blue-600">learn</span>
              </span>
            </Link>
            
            <p className="text-slate-500 text-sm leading-relaxed font-medium max-w-sm">
              The elite technical ecosystem for modern engineers. High-fidelity interactive content and progress tracking used by world-class teams.
            </p>

            <div className="flex gap-3 pt-2">
              {[Twitter, Github, Linkedin, Youtube].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  whileHover={{ y: -2 }}
                  className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="sm:col-span-3 lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((section, idx) => (
              <div key={idx} className={idx === 2 ? "col-span-2 sm:col-span-1" : ""}>
                <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-4 md:mb-6">{section.title}</h4>
                <ul className="space-y-3.5">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link 
                        href={link.href} 
                        className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors flex items-center group/link"
                      >
                        <ChevronRight size={14} className="opacity-0 -ml-4 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all text-blue-500 mr-0.5 shrink-0" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Column */}
          <div className="sm:col-span-3 lg:col-span-3 space-y-6 border-t sm:border-t-0 border-slate-200/60 pt-6 sm:pt-0">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-2 md:mb-6">Contact Support</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Support</p>
                  <p className="text-sm font-semibold text-slate-700 break-all">hello@zenzlearn.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Admissions</p>
                  <p className="text-sm font-semibold text-slate-700 whitespace-nowrap">+91 800 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <MapPin size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Location</p>
                  <p className="text-sm font-semibold text-slate-700">Jharkhand, India</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* --- Bottom Legal / Status Bar --- */}
        <div className="pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <span className="text-xs font-semibold text-slate-500 order-2 sm:order-1">
            &copy; {new Date().getFullYear()} ZenzLearn Systems. All rights reserved.
          </span>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 order-1 sm:order-2 w-full sm:w-auto justify-center sm:justify-end">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
              <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
              <Link href="/refund" className="hover:text-blue-600 transition-colors">Refund Policy</Link>
            </div>
            
            <div className="hidden lg:block w-px h-4 bg-slate-300" />

            <div className="flex items-center gap-2 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
               <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">All Systems Normal</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}