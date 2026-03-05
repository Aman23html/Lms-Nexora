'use client'
import React from 'react'
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
  ArrowRight 
} from 'lucide-react'

const footerLinks = [
  {
    title: "University",
    links: ["All Courses", "Generative AI", "Data Science", "Cloud Computing", "Cyber Security"]
  },
  {
    title: "Community",
    links: ["Student Reviews", "Become an Instructor", "Events", "Scholarships", "Free Resources"]
  },
  {
    title: "Enterprise",
    links: ["Nexora for Business", "Corporate Training", "Partnerships", "Case Studies"]
  },
  {
    title: "Support",
    links: ["Help Center", "Privacy Policy", "Terms of Service", "Contact Us", "FAQ"]
  }
]

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 overflow-hidden relative">
      {/* Decorative Gradient Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-blue-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-20">
          
          {/* Brand Identity */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-700 to-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Sparkles size={22} fill="currentColor" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                NEX<span className="text-blue-500">ORA</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The elite technical ecosystem for engineers. Empowering the next generation 
              of developers through industry-validated pathways and AI-driven learning.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Youtube].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all border border-slate-800"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-sm hover:text-blue-500 transition-colors flex items-center group">
                      <ArrowRight size={12} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter / Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 bg-slate-900/50 rounded-[2rem] border border-slate-800 mb-20">
           <div className="flex items-center gap-4">
             <div className="bg-blue-600/20 p-3 rounded-xl text-blue-500"><Mail size={24} /></div>
             <div>
               <p className="text-xs font-bold text-slate-500 uppercase">Email Us</p>
               <p className="text-white font-semibold">support@nexora.ai</p>
             </div>
           </div>
           <div className="flex items-center gap-4">
             <div className="bg-orange-600/20 p-3 rounded-xl text-orange-500"><Phone size={24} /></div>
             <div>
               <p className="text-xs font-bold text-slate-500 uppercase">Call Support</p>
               <p className="text-white font-semibold">+1 (555) 000-1234</p>
             </div>
           </div>
           <div className="flex items-center gap-4">
             <div className="bg-emerald-600/20 p-3 rounded-xl text-emerald-500"><MapPin size={24} /></div>
             <div>
               <p className="text-xs font-bold text-slate-500 uppercase">Global Office</p>
               <p className="text-white font-semibold">Dhanbad, Jharkhand, India</p>
             </div>
           </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-xs font-medium text-slate-500">
            <span>© 2026 NEXORA LMS. All rights reserved.</span>
            <div className="hidden md:block h-1 w-1 bg-slate-800 rounded-full" />
            <span className="hover:text-white cursor-pointer transition-colors">Sitemap</span>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Systems Operational</span>
            </div>
            <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-slate-400 focus:ring-0 cursor-pointer">
              <option>English (US)</option>
              <option>हिन्दी (IN)</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}