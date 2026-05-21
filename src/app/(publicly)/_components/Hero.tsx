'use client'

import React, { useRef, useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, cubicBezier, AnimatePresence } from 'framer-motion'
import { 
  Search, Brain, Code2, Terminal, Star, Users, PlayCircle, TrendingUp, Award, ArrowRight, Command, X
} from 'lucide-react'

const Particles = () => {
  const particles = useMemo(() => Array.from({ length: 25 }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  })), [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-indigo-600/15"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px` }}
          animate={{
            y: [0, -200],
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

export default function AdvancedEdTechHero() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const [searchQuery, setSearchQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // 🔹 Link Submission to routing parameters
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/courses')
    }
  }

  const handleTagClick = (tag: string) => {
    router.push(`/courses?search=${encodeURIComponent(tag)}`)
  }

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const { left, top } = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  const springConfig = { damping: 30, stiffness: 100, mass: 1 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothMouseY, [0, 1000], [5, -5])
  const rotateY = useTransform(smoothMouseX, [0, 1000], [-5, 5])
  const spotlightBackground = useMotionTemplate`radial-gradient(600px circle at ${smoothMouseX}px ${smoothMouseY}px, rgba(99, 102, 241, 0.06), transparent 80%)`

  const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: cubicBezier(0.42, 0, 0.58, 1) } }
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-white text-slate-900 overflow-hidden font-sans flex items-center pt-24 pb-16 perspective-[2000px] selection:bg-indigo-100"
    >
      <Particles />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-0" />
      <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ background: spotlightBackground }} />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-400/10 rounded-[100%] blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col justify-center min-h-[70vh]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          <motion.div initial="hidden" animate="visible" className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left z-20">
            <motion.div variants={fadeUp} className="group flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-8 hover:bg-indigo-100/80 transition-all cursor-pointer shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.5)] animate-pulse" />
              <span className="text-xs font-bold text-indigo-700 tracking-wide uppercase">zenZlearn 2.0 is live</span>
              <ArrowRight size={14} className="text-indigo-500 group-hover:translate-x-1 transition-transform" />
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-[76px] font-black text-slate-900 leading-[1.05] tracking-tight mb-6">
              Engineer Your <br />
              <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500">
                Future Today.
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg font-medium">
              The elite platform for ambitious developers. Master AI, Full-Stack, and Cloud architecture through interactive, real-world engineering.
            </motion.p>

            {/* Form Wrap */}
            <motion.form onSubmit={handleSearchSubmit} variants={fadeUp} className="w-full max-w-lg relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur-lg opacity-10 group-hover:opacity-25 transition duration-500" />
              <div className="relative flex items-center bg-white rounded-2xl p-2 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
                <Search className={`w-5 h-5 ml-3 transition-colors ${isFocused ? 'text-indigo-600' : 'text-slate-400'}`} />
                <input 
                  ref={inputRef}
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="What technology do you want to master?" 
                  className="w-full py-3 px-4 bg-transparent outline-none text-slate-900 text-sm font-semibold placeholder:text-slate-400 placeholder:font-medium"
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button type="button" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={() => setSearchQuery("")} className="p-1 text-slate-400 hover:text-slate-600 mr-2">
                      <X size={16} />
                    </motion.button>
                  )}
                </AnimatePresence>
                <button type="submit" className="bg-slate-900 hover:bg-indigo-600 text-white rounded-xl px-6 h-11 font-bold text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 shrink-0">
                  Explore <Command size={14} className="opacity-50 hidden sm:block" />
                </button>
              </div>
            </motion.form>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-semibold text-slate-500">
              <span className="uppercase tracking-widest text-[10px] text-slate-400">Trending</span>
              {['Next.js 14', 'Gen AI', 'AWS SysOps'].map((tag) => (
                <button type="button" onClick={() => handleTagClick(tag)} key={tag} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer transition-all shadow-sm">
                  {tag}
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-6 relative h-[500px] lg:h-[600px] w-full flex items-center justify-center lg:justify-end mt-10 lg:mt-0 [perspective:1200px]">
            <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-200 bg-white/90 backdrop-blur-3xl flex flex-col">
                <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <div className="ml-4 text-[10px] text-slate-500 font-mono font-semibold flex-1 text-center pr-10">main.py - neural_net</div>
                </div>
                <div className="p-6 font-mono text-[12px] leading-relaxed text-slate-600 font-medium">
                  <p><span className="text-violet-600 font-bold">import</span> tensorflow <span className="text-violet-600 font-bold">as</span> tf</p>
                  <p><span className="text-violet-600 font-bold">from</span> layers <span className="text-violet-600 font-bold">import</span> Dense, Dropout</p>
                  <br />
                  <p><span className="text-blue-600 font-bold">def</span> <span className="text-cyan-700 font-bold">build_model</span>():</p>
                  <p className="pl-4">model = tf.keras.Sequential([</p>
                  <p className="pl-8">Dense(<span className="text-orange-600">256</span>, activation=<span className="text-emerald-600">'relu'</span>),</p>
                  <p className="pl-8">Dropout(<span className="text-orange-600">0.3</span>),</p>
                  <p className="pl-8">Dense(<span className="text-orange-600">10</span>, activation=<span className="text-emerald-600">'softmax'</span>)</p>
                  <p className="pl-4">])</p>
                  <p className="pl-4"><span className="text-violet-600 font-bold">return</span> model</p>
                  <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-4 bg-indigo-500 inline-block align-middle ml-1" />
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              </div>

              <motion.div style={{ translateZ: 80 }} className="absolute -right-8 top-16 bg-white/80 backdrop-blur-2xl p-5 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] border border-white w-[240px]">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600"><Brain size={16}/></div>
                    <p className="font-bold text-xs text-slate-900">AI Architecture</p>
                  </div>
                  <span className="text-xs font-bold text-indigo-600">72%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "72%" }} transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }} className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-full rounded-full shadow-sm" />
                </div>
              </motion.div>

              <motion.div style={{ translateZ: 120 }} className="absolute -left-10 bottom-20 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center gap-4 w-[260px]">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <PlayCircle size={20} fill="currentColor" className="text-white"/>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
                    <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase text-emerald-600 tracking-widest mb-0.5">Live Masterclass</p>
                  <p className="text-sm font-bold text-slate-900 line-clamp-1">Advanced React Patterns</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full border-t border-slate-100 bg-white/80 backdrop-blur-md py-4 z-20">
        <div className="flex overflow-hidden group mask-fade-edges-light">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 35, ease: [0, 0, 1, 1], repeat: Infinity }} className="flex items-center gap-16 lg:gap-24 whitespace-nowrap pl-16 group-hover:[animation-play-state:paused]">
            {[...Array(2)].map((_, idx) => (
              <React.Fragment key={idx}>
                <span className="flex items-center gap-2 font-bold text-sm text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"><Brain className="w-5 h-5 text-indigo-500"/> OpenAI</span>
                <span className="flex items-center gap-2 font-bold text-sm text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"><Code2 className="w-5 h-5 text-cyan-500"/> React Ecosystem</span>
                <span className="flex items-center gap-2 font-bold text-sm text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"><Terminal className="w-5 h-5 text-emerald-500"/> Python</span>
                <span className="flex items-center gap-2 font-bold text-sm text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"><Award className="w-5 h-5 text-amber-500"/> AWS Certified</span>
                <span className="flex items-center gap-2 font-bold text-sm text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"><TrendingUp className="w-5 h-5 text-rose-500"/> Data Analytics</span>
                <span className="flex items-center gap-2 font-bold text-sm text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"><Terminal className="w-5 h-5 text-blue-500"/> TypeScript</span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .mask-fade-edges-light {
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}} />
    </div>
  )
}