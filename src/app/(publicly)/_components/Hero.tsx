'use client'
import React, { useEffect, useState } from 'react'
import { easeIn, motion } from 'framer-motion'
import { 
  Search, 
  Brain, 
  Code2, 
  Terminal, 
  CheckCircle2, 
  Star,
  Users
} from 'lucide-react'

// Faster, gentler floating animations so it doesn't distract
const floatingAnimation = (delay: number, yOffset: number = 10) => ({
  y: [0, -yOffset, 0],
  transition: {
    duration: 3 + Math.random() * 2,
    repeat: Infinity,
    ease: easeIn, // cubic-bezier for easeInOut
    delay: delay,
  }
})

export default function FastEdTechHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Subtle mouse tracking for the background elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] overflow-hidden font-sans pt-16 pb-12">
      
      {/* --- Abstract Background Shapes --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
           style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)`, transition: 'transform 0.1s ease-out' }}>
        <div className="absolute -top-[10%] -right-[5%] w-[50vw] h-[50vw] bg-gradient-to-br from-orange-100/80 to-pink-100/80 rounded-full blur-3xl" />
        <div className="absolute top-[40%] -left-[10%] w-[40vw] h-[40vw] bg-gradient-to-tr from-blue-100/80 to-cyan-50/80 rounded-full blur-3xl" />
        
        {/* Concentric Decorative Circles */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[800px] h-[800px] border border-slate-200/50 rounded-full" />
        <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[600px] h-[600px] border border-slate-200/80 rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-12 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* --- Left Column: Text & Search --- */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            
            {/* FAST entrance animations (duration 0.3s) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-medium text-sm mb-6"
            >
              <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
              <span>World-Class Tech Curriculum</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}
              className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight"
            >
              Master The Tech <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                Skills You Need
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
              className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Join 100,000+ developers learning advanced Artificial Intelligence, Machine Learning, Python, and scalable Web Development.
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}
              className="relative flex items-center w-full max-w-lg bg-white rounded-2xl p-2 shadow-xl shadow-slate-200/50 border border-slate-100 mx-auto lg:mx-0"
            >
              <div className="pl-4 pr-2 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Keywords of your course..." 
                className="w-full py-3 px-2 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
              />
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200 whitespace-nowrap">
                Search Course
              </button>
            </motion.div>

            {/* Popular Tags */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-sm text-slate-500"
            >
              <span className="font-medium">Popular:</span>
              <span className="underline decoration-slate-300 hover:text-blue-600 cursor-pointer transition-colors">TensorFlow</span>
              <span className="underline decoration-slate-300 hover:text-blue-600 cursor-pointer transition-colors">React.js</span>
              <span className="underline decoration-slate-300 hover:text-blue-600 cursor-pointer transition-colors">Python</span>
            </motion.div>
          </div>

          {/* --- Right Column: Clipped Image & Floating Badges --- */}
          <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center mt-10 lg:mt-0">
            
            {/* Center Main Image with Custom Geometric Clip-Path */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10 w-[300px] h-[400px] lg:w-[420px] lg:h-[550px]"
            >
              {/* Background decorative shape to make the clip pop */}
              <div 
                className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-violet-500 translate-x-4 translate-y-4"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 85%, 90% 100%, 0 100%, 0 15%)' }}
              />
              
              {/* Actual Image with Clipped Corners */}
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                alt="Students learning tech" 
                className="relative z-10 w-full h-full object-cover shadow-2xl"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 85%, 90% 100%, 0 100%, 0 15%)' }}
              />
            </motion.div>

            {/* --- Floating Badges (Kept intact, perfectly positioned around the image) --- */}
            
            {/* Top Left: Happy Students */}
            <motion.div animate={floatingAnimation(0, 12)} className="absolute top-[10%] left-0 lg:-left-4 z-20">
              <div className="bg-white px-5 py-3 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">160K+</p>
                  <p className="text-xs text-slate-500 font-medium">Active Learners</p>
                </div>
              </div>
            </motion.div>

            {/* Top Right: AI Course */}
            <motion.div animate={floatingAnimation(0.5, 10)} className="absolute top-[20%] right-0 lg:-right-12 z-20">
              <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-[2px] rounded-2xl shadow-lg shadow-purple-200/50">
                <div className="bg-white px-4 py-2.5 rounded-[14px] flex items-center gap-2">
                  <Brain className="w-4 h-4 text-violet-500" />
                  <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                    Advanced AI/ML
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bottom Left: Web Dev Tech */}
            <motion.div animate={floatingAnimation(1, 12)} className="absolute bottom-[20%] left-4 lg:-left-8 z-20">
              <div className="bg-white p-3 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white"><Code2 className="w-4 h-4 text-slate-600"/></div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white"><Terminal className="w-4 h-4 text-blue-600"/></div>
                </div>
                <div className="pr-2">
                  <p className="text-xs font-bold text-slate-800">Full-Stack</p>
                  <p className="text-[10px] text-slate-500 text-nowrap">Next.js & Python</p>
                </div>
              </div>
            </motion.div>

            {/* Bottom Right: Success Rate */}
            <motion.div animate={floatingAnimation(1.5, 8)} className="absolute bottom-[10%] right-4 lg:-right-4 z-20">
              <div className="bg-white px-5 py-3 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">98%</p>
                  <p className="text-xs text-slate-500 font-medium text-nowrap">Placement Rate</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* --- Bottom Brand Marquee --- */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 w-full border-t border-slate-200/60 bg-white/50 backdrop-blur-xl mt-12 py-8"
      >
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest hidden md:block">
            Trusted Frameworks
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center font-bold text-xl text-slate-800">
             <span className="flex items-center gap-2"><Brain className="w-6 h-6"/> OpenAI</span>
             <span className="flex items-center gap-2"><Code2 className="w-6 h-6"/> React</span>
             <span className="flex items-center gap-2"><Terminal className="w-6 h-6"/> Python</span>
             <span className="flex items-center gap-2"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l-11 6v12l11 6 11-6v-12l-11-6zm-9 6.8l9-4.9 9 4.9v10.4l-9 4.9-9-4.9v-10.4z"/></svg> Node.js</span>
             <span className="flex items-center gap-2"><Star className="w-6 h-6"/> TensorFlow</span>
          </div>
        </div>
      </motion.div>

    </div>
  )
}