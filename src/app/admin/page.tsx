'use client'


import { signOut } from "next-auth/react"

// Inside your Logout button component:

import React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  BookOpen, 
  BarChart3, 
  Layers, 
  LogOut, 
  ShieldCheck, 
  ArrowUpRight,
  PlusCircle,
  Clock,
  Settings,
  LayoutDashboard,
  Users,
  Globe,
  Database,
  Badge
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const router = useRouter()

  const tools = [
    {
      title: "Course Registry",
      description: "Manage the global repository of educational pathways and curriculum nodes.",
      icon: BookOpen,
      path: "/admin/courses",
      color: "blue",
      stats: "Active Inventory"
    },
    {
      title: "Description Studio",
      description: "Hydrate course narratives and expand structural details for current listings.",
      icon: Layers,
      path: "/admin/description",
      color: "emerald",
      stats: "Content Sync"
    },
    {
      title: "Market Analytics",
      description: "Review enrollment velocity, student data, and regional performance stats.",
      icon: BarChart3,
      path: "/admin/analytics",
      color: "orange",
      stats: "Growth Metrics"
    }
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative selection:bg-blue-100">
      {/* 🔹 PROFESSIONAL HEADER */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-[110] px-8 py-5 shadow-sm">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-lg shadow-blue-100">
              <Database size={20} />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tighter leading-none uppercase">
                Nexora <span className="text-blue-600">Mainframe</span>
              </h1>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Administrative Control Layer</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Systems Operational
            </div>
            <Button 
              variant="ghost" 
              onClick={() => signOut({ redirectTo: "/login" })}
              className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl font-bold text-xs uppercase tracking-widest transition-all px-4"
            >
              <LogOut size={16} className="mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto w-full p-8 md:p-16 lg:p-24">
        
        {/* Welcome Block */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 mb-20">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
              <ShieldCheck size={14} className="text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-xs">Secure Admin Session</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              Executive <br /> <span className="text-slate-300">Dashboard</span>
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => router.push("/admin/courses/create")}
              className="bg-slate-900 hover:bg-blue-600 text-white h-[72px] px-10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl active:scale-95 flex items-center gap-3"
            >
              <PlusCircle size={20} strokeWidth={3} /> Initialize New Pathway
            </Button>
          </div>
        </div>

        {/* 🔹 TOOLSET GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, idx) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => router.push(tool.path)}
              className="group cursor-pointer bg-white border border-slate-100 p-10 rounded-[3rem] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 relative flex flex-col justify-between overflow-hidden"
            >
              {/* Internal Accent */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-50 group-hover:bg-blue-600 transition-colors" />

              <div className="space-y-10 relative z-10">
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 ${
                  tool.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                  tool.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                  'bg-orange-50 text-orange-600'
                }`}>
                  <tool.icon size={32} strokeWidth={2.5} />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-slate-500 font-medium text-[15px] leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className="mt-16 flex items-center justify-between relative z-10">
                <Badge className="bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 border-none font-black text-[9px] uppercase tracking-widest px-3 py-1 transition-colors">
                  {tool.stats}
                </Badge>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-slate-950 group-hover:text-white transition-all duration-500">
                  <ArrowUpRight size={20} />
                </div>
              </div>

              {/* High-end Watermark */}
              <tool.icon size={180} className="absolute -bottom-10 -right-10 text-slate-50 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* 🔹 SYSTEM OVERVIEW BAR */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: "Active Nodes", val: "128", icon: Globe },
             { label: "Total Professionals", val: "12,400+", icon: Users },
             { label: "Registry Health", val: "99.9%", icon: ShieldCheck },
           ].map((item, i) => (
             <div key={i} className="bg-white/50 border border-slate-100 rounded-3xl p-6 flex items-center gap-5">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm">
                  <item.icon size={20} />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.label}</p>
                   <p className="text-xl font-black text-slate-900">{item.val}</p>
                </div>
             </div>
           ))}
        </div>

        <div className="mt-20 flex justify-center">
            <button className="flex items-center gap-2 text-slate-300 hover:text-blue-600 transition-all font-black text-[10px] uppercase tracking-[0.4em]">
                <Settings size={14} /> Global System Configuration
            </button>
        </div>
      </main>
    </div>
  )
}