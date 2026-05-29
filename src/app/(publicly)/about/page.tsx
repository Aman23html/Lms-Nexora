'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { 
  Heart, 
  Github, 
  Linkedin, 
  Zap,
  Globe2,
  Cpu
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.2 
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden selection:bg-[#1fb2e7]/20 selection:text-slate-900 font-sans">
      
      {/* 🌌 HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#06080c] px-4 sm:px-6 py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[#1fb2e7]/15 rounded-full blur-[100px] md:blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#fca311]/15 rounded-full blur-[100px] md:blur-[150px]" />
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto text-center relative z-10 w-full"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 sm:mb-10">
            <Heart size={14} className="text-[#fca311] fill-[#fca311] animate-pulse shrink-0" />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-slate-300">Founded on Empathy & Code</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black text-white tracking-tighter leading-[0.85] sm:leading-[0.8] mb-8 sm:mb-12 break-words">
            WE ARE <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1fb2e7] to-[#fca311]">ZENZLEARN.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg sm:text-xl md:text-3xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed italic opacity-80 px-4">
            "We believe that every line of code is a heartbeat, and every system built is a future transformed."
          </motion.p>
        </motion.div>
      </section>

      {/* 🚀 THE MISSION */}
      <section className="py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="space-y-8 md:space-y-10"
          >
            <motion.div variants={itemVariants} className="w-16 h-16 md:w-20 md:h-20 bg-[#1fb2e7] text-white rounded-2xl md:rounded-[2rem] flex items-center justify-center shadow-2xl shadow-[#1fb2e7]/30">
              <Zap size={32} fill="currentColor" className="md:w-9 md:h-9" />
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[1] uppercase">
              Merging Logic <br />With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1fb2e7] to-[#fca311]">Creativity.</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium max-w-xl">
              Born from a deep fascination with <strong>Systems Architecture</strong> and the limitless potential of <strong>Modern Web Technologies</strong>, we are redefining how engineers learn.
            </motion.p>
            
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
               <div className="p-6 md:p-8 bg-slate-50 rounded-3xl md:rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:border-[#1fb2e7]/20 transition-all group">
                  <Cpu className="w-6 h-6 text-[#1fb2e7] mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-[#1fb2e7] transition-colors">AI & Data</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-widest">Core Intelligence</p>
               </div>
               <div className="p-6 md:p-8 bg-slate-50 rounded-3xl md:rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:border-[#fca311]/20 transition-all group">
                  <Globe2 className="w-6 h-6 text-[#fca311] mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-[#fca311] transition-colors">Full-Stack</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-widest">Industrial Strength</p>
               </div>
            </motion.div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
             whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
             transition={{ duration: 1 }}
             viewport={{ once: true }}
             className="relative mt-8 lg:mt-0"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1fb2e7]/20 to-[#fca311]/20 rounded-3xl md:rounded-[4rem] blur-2xl md:blur-3xl" />
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200" 
              className="relative w-full h-auto rounded-3xl md:rounded-[4rem] border-8 md:border-[12px] border-white shadow-2xl z-10 grayscale hover:grayscale-0 transition-all duration-1000 object-cover" 
              alt="Engineering Team" 
            />
          </motion.div>
        </div>
      </section>

      {/* 👑 THE ARCHITECT */}
      <section className="py-20 md:py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 md:mb-24 space-y-3 md:space-y-4">
             <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#1fb2e7]">The Human Behind The Machine</h3>
             <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase">Meet the Architect</h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl md:rounded-[4rem] p-6 sm:p-12 lg:p-24 border border-slate-100 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.05)] flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-center relative overflow-hidden"
          >
            {/* Ambient inner glow */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#fca311]/5 rounded-full blur-[80px] pointer-events-none" />

             <div className="lg:col-span-5 w-full max-w-md lg:max-w-none aspect-square rounded-3xl md:rounded-[3.5rem] overflow-hidden border-8 md:border-[16px] border-slate-50 relative group shadow-2xl mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  alt="Marcus Vance" 
                />
                <div className="absolute inset-0 bg-[#1fb2e7]/10 group-hover:opacity-0 transition-opacity" />
             </div>

             <div className="lg:col-span-7 space-y-8 md:space-y-10 text-center lg:text-left relative z-10">
                <blockquote className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-[1.2] md:leading-[1.1] italic">
                  "zenZlearn isn't just a platform; it's a launchpad for the next generation of visionary engineers."
                </blockquote>
                
                <div className="space-y-4 md:space-y-6">
                   <h4 className="text-2xl md:text-3xl font-black text-[#1fb2e7] uppercase tracking-tighter">Marcus Vance</h4>
                   <p className="text-sm md:text-base font-bold text-[#fca311] uppercase tracking-widest">Founder & Lead Architect</p>
                   <p className="text-slate-500 font-medium leading-relaxed text-lg md:text-xl max-w-2xl mx-auto lg:mx-0">
                     With over a decade of experience leading scalable infrastructure teams at top-tier tech firms, I founded zenZlearn to bridge the gap between academic theory and industry reality. We exist to provide a sanctuary for engineers who want to master both the logic of the machine and the art of modern development.
                   </p>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 pt-2">
                   <Button size="lg" className="w-full sm:w-auto rounded-xl md:rounded-2xl bg-slate-900 px-8 hover:bg-[#1fb2e7] transition-all text-sm md:text-base h-12 md:h-14 shadow-lg hover:shadow-[#1fb2e7]/25">
                     <Github className="mr-2" size={18}/> GitHub
                   </Button>
                   <Button size="lg" className="w-full sm:w-auto rounded-xl md:rounded-2xl bg-[#1fb2e7] px-8 hover:bg-slate-900 transition-all text-sm md:text-base h-12 md:h-14 shadow-lg hover:shadow-slate-900/25">
                     <Linkedin className="mr-2" size={18}/> LinkedIn
                   </Button>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}