'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion' // 🔹 Import Variants type
import { 
  Heart, 
  Github, 
  Linkedin, 
  Award, 
  ShieldCheck, 
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// 🔹 Explicitly typed variants to prevent TS errors
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
    <div className="min-h-screen bg-white overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* 🌌 HERO SECTION */}
      <section className="relative h-[95vh] flex items-center justify-center bg-[#06080c] px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[150px]" />
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10">
            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Founded on Empathy & Code</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-6xl md:text-[9rem] font-black text-white tracking-tighter leading-[0.8] mb-12">
            WE ARE <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-700">NEXORA.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-3xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed italic opacity-80">
            "We believe that every line of code is a heartbeat, and every signal processed is a life transformed."
          </motion.p>
        </motion.div>
      </section>

      {/* 🚀 THE MISSION */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-10"
          >
            <motion.div variants={itemVariants} className="w-20 h-20 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-200">
              <Zap size={36} fill="currentColor" />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-6xl font-black tracking-tighter text-slate-900 leading-[0.9] uppercase">
              Merging Signal <br />With <span className="text-blue-600">Soul.</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-slate-500 text-xl leading-relaxed font-medium max-w-xl">
              Born from a deep fascination with <strong>Digital Signal Processing (DSP)</strong> and the limitless potential of the <strong>MERN Stack</strong>.
            </motion.p>
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
               <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
                  <p className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">Neural-SDR</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-widest">Core Intelligence</p>
               </div>
               <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
                  <p className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">MERN v4</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-widest">Industrial Strength</p>
               </div>
            </motion.div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
             whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
             transition={{ duration: 1 }}
             viewport={{ once: true }}
             className="relative"
          >
            <div className="absolute inset-0 bg-blue-600/10 rounded-[4rem] blur-3xl" />
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200" 
              className="relative rounded-[4rem] border-[12px] border-white shadow-2xl z-10 grayscale hover:grayscale-0 transition-all duration-1000" 
              alt="Engineering" 
            />
          </motion.div>
        </div>
      </section>

      {/* 👑 THE ARCHITECT */}
      <section className="py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 space-y-4">
             <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">The Human Behind The Machine</h3>
             <h2 className="text-6xl font-black tracking-tighter text-slate-900 uppercase">Meet the Architect</h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[4rem] p-12 lg:p-24 border border-slate-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] flex flex-col lg:grid lg:grid-cols-12 gap-16 items-center"
          >
             <div className="lg:col-span-5 w-full aspect-square rounded-[3.5rem] overflow-hidden border-[16px] border-slate-50 relative group shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  alt="Founder" 
                />
                <div className="absolute inset-0 bg-blue-900/10 group-hover:opacity-0 transition-opacity" />
             </div>

             <div className="lg:col-span-7 space-y-10">
                <blockquote className="text-4xl font-black tracking-tight text-slate-900 leading-[1.1] italic">
                  "Nexora isn't just a platform; it's my promise to the engineering community that intelligence and emotion can coexist."
                </blockquote>
                
                <div className="space-y-6">
                   <h4 className="text-3xl font-black text-blue-600 uppercase tracking-tighter">Founder & Lead Scientist</h4>
                   <p className="text-slate-500 font-medium leading-relaxed text-xl max-w-2xl">
                     Specializing in <strong>DSP architecture</strong> and <strong>Neural-SDR development</strong>, I founded Nexora to provide a sanctuary for engineers who want to master both the logic of the machine and the art of code.
                   </p>
                </div>

                <div className="flex flex-wrap gap-4">
                   <Button size="lg" className="rounded-2xl bg-slate-950 px-8 hover:bg-blue-600 transition-all"><Github className="mr-2" size={18}/> GitHub</Button>
                   <Button size="lg" className="rounded-2xl bg-blue-600 px-8 hover:bg-slate-950 transition-all"><Linkedin className="mr-2" size={18}/> LinkedIn</Button>
                </div>
             </div>
          </motion.div>
        </div>
      </section>



    </div>
  )
}