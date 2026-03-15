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
  Smartphone,
  ShieldCheck,
  Globe
} from 'lucide-react'

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Newsroom", href: "/news" },
      { name: "Contact Us", href: "/contactus" },
      { name: "Admin Portal", href: "/admin/courses" } // Link to your admin dashboard
    ]
  },
  {
    title: "Work With Us",
    links: [
      { name: "Become an Instructor", href: "/instructor" },
      { name: "Blog as Guest", href: "/blog" },
      { name: "Partner Program", href: "/partners" }
    ]
  },
  {
    title: "Discover",
    links: [
      { name: "Skillup Registry", href: "/courses" },
      { name: "Free Resources", href: "/resources" },
      { name: "RSS Feed", href: "/feed" },
      { name: "Sitemap", href: "/sitemap" }
    ]
  },
  {
    title: "For Business",
    links: [
      { name: "Corporate Training", href: "/business" },
      { name: "Digital Transformation", href: "/transform" },
      { name: "Higher Ed", href: "/higher-ed" }
    ]
  }
]

export default function Footer() {
  return (
    <footer className="bg-[#080a0f] text-slate-300 pt-24 pb-12 overflow-hidden relative border-t border-white/5">
      {/* 🌌 Deep Space Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-blue-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          
          {/* 🔹 Column 1: Brand & Apps */}
          <div className="lg:col-span-3 space-y-10">
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                  <Sparkles size={22} fill="currentColor" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-white uppercase">
                  Nex<span className="text-blue-500">ora</span>
                </span>
              </Link>
              <div className="flex gap-4">
                {[Twitter, Github, Linkedin, Youtube, Send].map((Icon, i) => (
                  <motion.a 
                    key={i} 
                    href="#" 
                    whileHover={{ y: -3 }}
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
            </div>

           
          </div>

          {/* 🔹 Column 2-5: Dynamic Links */}
          <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-12">
            {footerLinks.map((section, idx) => (
              <div key={idx} className="space-y-8">
                <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em]">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link 
                        href={link.href} 
                        className="text-[13px] font-medium text-slate-500 hover:text-blue-500 transition-colors flex items-center group"
                      >
                        <ChevronRight size={12} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-blue-500" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Contact Bar (Brutalist style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/5 rounded-[2.5rem] overflow-hidden mb-20">
            {[
              { icon: Mail, label: "Registry Support", val: "support@nexora.ai", color: "text-blue-500" },
              { icon: Phone, label: "Admission Line", val: "+1 (555) NEX-ORA", color: "text-orange-500" },
              { icon: MapPin, label: "HQ Node", val: "Dhanbad, Jharkhand, IN", color: "text-emerald-500" }
            ].map((item, i) => (
              <div key={i} className="p-10 bg-white/[0.02] border-r border-white/5 last:border-r-0 flex flex-col gap-4 group hover:bg-white/[0.04] transition-colors">
                <div className={`${item.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                  <item.icon size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-white tracking-tight">{item.val}</p>
                </div>
              </div>
            ))}
        </div>

        {/* 🔹 Bottom Section */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 text-[11px] font-black uppercase tracking-widest text-slate-600">
            <span>© 2026 NEXORA SYSTEMS GEN-4</span>
            <div className="hidden md:block h-1 w-1 bg-slate-800 rounded-full" />
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Manifest</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Service Protocol</Link>
          </div>

          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Mainnet Operational</span>
            </div>
            
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
              <Globe size={12} className="text-blue-500" />
              Node: Cluster-IN-04
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const ChevronRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
)