'use client'

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, Plus, CheckCircle2, Loader2, 
  ListChecks, GraduationCap, X, TrendingUp, Rocket,
  Target, Briefcase, FileText, Info, Users, LogOut, LayoutDashboard,
  BookmarkCheck, Sparkles, HelpCircle, ShieldCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CreateCoursePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subCategory: "All",
    instructor: "",
    price: "",
    duration: "",
    image: "",
    level: "Intermediate",
    recommended: false,
    isAvailableSoon: false,
    details: {
      description: "", 
      overview: "",    
      learningOutcomes: [] as string[], 
      highlights: [] as string[],
      keyFeatures: [] as string[],
      skillsCovered: [] as string[],
      benefits: { 
        description: "", 
        marketGrowth: "",
        careerProspects: "" 
      },
      eligibility: "",
      preRequisites: "",
      certification: { awardedBy: "zenZcareer", features: [] as string[] },
      whyJoin: [] as { title: string; content: string }[],
      faqs: [] as { question: string; answer: string }[],
      industriesCovered: [] as string[],
      jobRoles: [] as string[],
    }
  })

  // --- Logic Handlers ---
  const handleDetailChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, details: { ...prev.details, [name]: value } }))
  }

  const handleNestedChange = (parent: string, name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [parent]: { ...(prev.details[parent as keyof typeof prev.details] as object), [name]: value }
      }
    }))
  }

  const addArrayItem = (field: string, value: string) => {
    if (!value.trim()) return;
    setFormData(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        const parentObj = prev.details[parent as keyof typeof prev.details] as any;
        return {
          ...prev,
          details: { ...prev.details, [parent]: { ...parentObj, [child]: [...(parentObj[child] || []), value] } }
        };
      }
      const key = field as keyof typeof prev.details;
      return { ...prev, details: { ...prev.details, [key]: [...(prev.details[key] as string[]), value] } }
    });
  }

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        const parentObj = prev.details[parent as keyof typeof prev.details] as any;
        return {
          ...prev,
          details: { ...prev.details, [parent]: { ...parentObj, [child]: parentObj[child].filter((_: any, i: number) => i !== index) } }
        };
      }
      const key = field as keyof typeof prev.details;
      return { ...prev, details: { ...prev.details, [key]: (prev.details[key] as string[]).filter((_, i) => i !== index) } }
    });
  }

  const addObjectItem = (field: 'faqs' | 'whyJoin', obj: any) => {
    setFormData(prev => ({ ...prev, details: { ...prev.details, [field]: [...prev.details[field], obj] } }))
  }

  const removeObjectItem = (field: 'faqs' | 'whyJoin', index: number) => {
    setFormData(prev => ({ ...prev, details: { ...prev.details, [field]: prev.details[field].filter((_, i) => i !== index) } }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      if (res.ok) router.push("/admin/courses");
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-24 relative selection:bg-blue-100">
      {/* Admin Navigation */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100 px-8 py-4 mb-10 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()} className="rounded-xl text-slate-500 hover:text-blue-600 gap-2 font-bold text-xs uppercase tracking-widest">
            <ArrowLeft size={16} /> Registry
          </Button>
          <div className="h-4 w-[1px] bg-slate-200 mx-2" />
          <div className="flex items-center gap-2 text-slate-900 font-black tracking-tighter text-lg uppercase">
             <LayoutDashboard size={20} className="text-blue-600" /> Nexora <span className="text-blue-600">Admin</span>
          </div>
        </div>
        <Button onClick={() => router.push("/login")} variant="ghost" className="rounded-xl text-red-500 hover:bg-red-50 gap-2 font-bold text-xs uppercase tracking-widest">
           <LogOut size={16} /> Exit Node
        </Button>
      </nav>

      <div className="max-w-6xl mx-auto px-6">
        <Header status={formData.isAvailableSoon} onToggle={() => setFormData(p => ({...p, isAvailableSoon: !p.isAvailableSoon}))} section={formData.isAvailableSoon ? "Queue" : "Live"} />

        <motion.form onSubmit={handleSubmit} className="space-y-12">
          
          {/* 1. CORE DATA */}
          <FormSection title="Registry Identity" icon={<Info size={20}/>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="md:col-span-2 lg:col-span-3">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2 block">Manifest Title</label>
                <input placeholder="e.g., Machine Learning Using Python" className="form-input-elite" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
              <input placeholder="Domain (e.g. AI & ML)" className="form-input-elite" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
              <input placeholder="Accreditor (Instructor)" className="form-input-elite" value={formData.instructor} onChange={(e) => setFormData({...formData, instructor: e.target.value})} />
              <input placeholder="Tuition (₹)" className="form-input-elite" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
              <input placeholder="Duration (e.g. 40+ Hours)" className="form-input-elite" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
              <input placeholder="Image Resource URL" className="md:col-span-2 form-input-elite" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
            </div>
          </FormSection>

          <AnimatePresence>
            {!formData.isAvailableSoon && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
                
                {/* 2. NARRATIVES & HIGHLIGHTS */}
                <FormSection title="Narrative & Scope" icon={<FileText className="text-emerald-600" size={20}/>}>
                  <div className="space-y-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 block">Strategic Hook (Overview)</label>
                       <textarea placeholder="e.g., Harness the Power of Data..." className="form-input-elite min-h-[80px]" value={formData.details.overview} onChange={(e) => handleDetailChange("overview", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 block">Full Deep Narrative (Description)</label>
                       <textarea placeholder="Detailed course story..." className="form-input-elite min-h-[160px]" value={formData.details.description} onChange={(e) => handleDetailChange("description", e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <TagInput title="Program Highlights" field="highlights" onAdd={addArrayItem} onRemove={removeArrayItem} items={formData.details.highlights} icon={<BookmarkCheck size={14}/>} />
                      <TagInput title="What You Will Gain" field="learningOutcomes" onAdd={addArrayItem} onRemove={removeArrayItem} items={formData.details.learningOutcomes} icon={<Target size={14}/>} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <TagInput title="Key Program Features" field="keyFeatures" onAdd={addArrayItem} onRemove={removeArrayItem} items={formData.details.keyFeatures} icon={<Sparkles size={14}/>} />
                      <TagInput title="Competency Matrix (Skills)" field="skillsCovered" onAdd={addArrayItem} onRemove={removeArrayItem} items={formData.details.skillsCovered} icon={<Rocket size={14}/>} />
                    </div>
                  </div>
                </FormSection>

                {/* 3. MARKET DATA */}
                <FormSection title="Market Velocity" icon={<TrendingUp className="text-orange-600" size={20}/>}>
                  <div className="space-y-6">
                    <textarea placeholder="Career Benefits Description..." className="form-input-elite" value={formData.details.benefits.description} onChange={(e) => handleNestedChange("benefits", "description", e.target.value)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input placeholder="Market Growth Stats (e.g. ₹17 LPA Avg)" className="form-input-elite" value={formData.details.benefits.marketGrowth} onChange={(e) => handleNestedChange("benefits", "marketGrowth", e.target.value)} />
                      <input placeholder="Post-Completion Prospects" className="form-input-elite" value={formData.details.benefits.careerProspects} onChange={(e) => handleNestedChange("benefits", "careerProspects", e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <TagInput title="Target Industries" field="industriesCovered" onAdd={addArrayItem} onRemove={removeArrayItem} items={formData.details.industriesCovered} icon={<Briefcase size={14}/>} />
                       <TagInput title="Active Job Roles" field="jobRoles" onAdd={addArrayItem} onRemove={removeArrayItem} items={formData.details.jobRoles} icon={<Users size={14}/>} />
                    </div>
                  </div>
                </FormSection>

                {/* 4. REQUIREMENTS & CERT */}
                <FormSection title="Validation & Access" icon={<ShieldCheck className="text-purple-600" size={20}/>}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <textarea placeholder="Eligibility (Who is this for?)" className="form-input-elite" value={formData.details.eligibility} onChange={(e) => handleDetailChange("eligibility", e.target.value)} />
                    <textarea placeholder="Pre-Requisites" className="form-input-elite" value={formData.details.preRequisites} onChange={(e) => handleDetailChange("preRequisites", e.target.value)} />
                  </div>
                  <div className="pt-6 space-y-6 border-t border-slate-50">
                    <input placeholder="Certifying Body (e.g. zenZcareer)" className="form-input-elite" value={formData.details.certification.awardedBy} onChange={(e) => handleNestedChange("certification", "awardedBy", e.target.value)} />
                    <TagInput title="Certification Privileges" field="certification.features" onAdd={addArrayItem} onRemove={removeArrayItem} items={formData.details.certification.features} icon={<GraduationCap size={14}/>} />
                  </div>
                </FormSection>

                {/* 5. BUILDERS (FAQ / WHY JOIN) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ObjectBuilder title="Protocol FAQ" onAdd={(v1:any, v2:any) => addObjectItem('faqs', { question: v1, answer: v2 })} onRemove={(i:any) => removeObjectItem('faqs', i)} items={formData.details.faqs} label1="Question" label2="Answer" icon={<HelpCircle size={16}/>} />
                  <ObjectBuilder title="Nexora Pillars (Why Join)" onAdd={(v1:any, v2:any) => addObjectItem('whyJoin', { title: v1, content: v2 })} onRemove={(i: number) => removeObjectItem('whyJoin', i)} items={formData.details.whyJoin} label1="Value Proposition Title" label2="Deep Content" icon={<Plus size={16}/>} />
                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Footer */}
          <div className="sticky bottom-8 z-50 p-4 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] shadow-2xl flex gap-4 max-w-2xl mx-auto items-center">
            <Button type="submit" disabled={loading} className="flex-[2] h-16 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3">
              {loading ? <Loader2 className="animate-spin" /> : <><Rocket size={18}/> Deploy Intelligence Node</>}
            </Button>
            <Button type="button" onClick={() => router.push('/admin/courses')} className="flex-1 h-16 rounded-2xl border border-slate-200 bg-white text-slate-400 font-black uppercase tracking-widest text-[10px] hover:bg-red-50 hover:text-red-500 transition-all">Cancel</Button>
          </div>
        </motion.form>
      </div>
      
      {/* Global CSS for Elite Inputs */}
      <style jsx global>{`
        .form-input-elite {
          width: 100%;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 1.25rem;
          padding: 1.1rem 1.5rem;
          outline: none;
          transition: all 0.25s;
          font-weight: 500;
          font-size: 14px;
        }
        .form-input-elite:focus {
          border-color: #3b82f6;
          background: #fff;
          box-shadow: 0 0 0 5px rgba(59, 130, 246, 0.08);
        }
      `}</style>
    </div>
  )
}

// --- Internal Visual Components ---

function FormSection({ title, icon, children }: any) {
  return (
    <section className="bg-white border border-slate-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] rounded-[3rem] p-10 space-y-10">
      <div className="flex items-center gap-4 border-b border-slate-50 pb-8">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shadow-inner text-blue-600">{icon}</div>
        <h3 className="text-sm font-black uppercase tracking-[0.25em] text-slate-900">{title}</h3>
      </div>
      {children}
    </section>
  )
}

// ... (rest of your code remains the same until TagInput)

function TagInput({ title, items, field, onAdd, onRemove, icon }: any) {
  const [v, setV] = useState("");
  
  const handleAdd = () => {
    if (v.trim()) {
      onAdd(field, v.trim());
      setV("");
    }
  };

  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2 ml-1">
        {icon} {title}
      </label>
      
      <div className="flex gap-2">
        <textarea 
          value={v} 
          onChange={(e) => setV(e.target.value)} 
          onKeyDown={(e) => { 
            if(e.key === 'Enter' && !e.shiftKey) { 
              e.preventDefault(); 
              handleAdd(); 
            } 
          }} 
          className="form-input-elite min-h-[60px] py-3 resize-none" 
          placeholder={`Add to ${title}...`} 
        />
        <button 
          type="button" 
          onClick={handleAdd} 
          className="w-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all shrink-0"
        >
          <Plus size={20}/>
        </button>
      </div>

      {/* 🔹 FIXED TAG CONTAINER FOR BIG DATA 🔹 */}
      <div className="flex flex-col gap-2 pt-2">
        {(items || []).map((it: string, i: number) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }} 
            key={i} 
            className="group relative flex items-start justify-between gap-4 px-5 py-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 transition-all shadow-sm"
          >
            <div className="flex gap-3 items-start overflow-hidden">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
               <p className="text-[13px] font-bold text-slate-700 leading-relaxed break-words pr-4">
                 {it}
               </p>
            </div>
            
            <button 
              type="button"
              onClick={() => onRemove(field, i)}
              className="p-2 -mr-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all shrink-0"
            >
              <X size={16} strokeWidth={3} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ... (rest of your components like ObjectBuilder, Header, etc.)

function ObjectBuilder({ title, items, onAdd, onRemove, label1, label2, icon }: any) {
  const [v1, setV1] = useState(""); const [v2, setV2] = useState("")
  return (
    <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-2xl shadow-slate-100/50 space-y-6">
      <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-600 flex items-center gap-2">{icon} {title} Module</h3>
      <input placeholder={label1} className="form-input-elite" value={v1} onChange={(e) => setV1(e.target.value)} />
      <textarea placeholder={label2} className="form-input-elite min-h-[100px]" value={v2} onChange={(e) => setV2(e.target.value)} />
      <Button type="button" className="w-full bg-slate-50 text-slate-900 text-[10px] font-black uppercase h-14 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm" onClick={() => { onAdd(v1, v2); setV1(""); setV2(""); }}>Append Entry</Button>
      <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
        {(items || []).map((it: any, i: number) => (
          <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center group">
            <p className="font-black text-[11px] text-slate-700 truncate pr-4">{it.question || it.title}</p>
            <button type="button" onClick={() => onRemove(i)} className="text-slate-300 hover:text-red-500"><X size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  )
}

function Header({ status, onToggle, section }: { status: boolean, onToggle: () => void, section: string }) {
  return (
    <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
      <div className="space-y-2">
        <h1 className="text-6xl font-black tracking-tighter text-slate-900 leading-[0.85]">
          Deploy <br /> <span className="text-blue-600">Intelligence</span>
        </h1>
        <p className="text-slate-400 font-medium tracking-tight">Structured curriculum manifest deployment for Nexora Hub.</p>
      </div>
      <div className="flex items-center gap-6 bg-white border border-slate-100 p-5 rounded-[2rem] shadow-xl shadow-slate-200/50">
        <div className="text-right">
          <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Visibility</p>
          <p className={`text-xs font-black uppercase ${status ? 'text-orange-500' : 'text-emerald-500'}`}>{section}</p>
        </div>
        <button type="button" onClick={onToggle} className={`w-16 h-9 rounded-full transition-all flex items-center px-1.5 ${status ? 'bg-orange-500' : 'bg-slate-200'}`}>
          <motion.div layout transition={{ type: "spring", stiffness: 300, damping: 20 }} className="w-6 h-6 bg-white rounded-full shadow-md" />
        </button>
      </div>
    </div>
  )
}