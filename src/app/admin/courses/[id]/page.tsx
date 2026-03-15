'use client'

import React, { useEffect, useState, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, CheckCircle2, Loader2, ListChecks, GraduationCap, 
  X, TrendingUp, Rocket, Save, Info, FileText, Target, 
  Briefcase, Users, LogOut, LayoutDashboard, Database,
  Plus, BookmarkCheck, SearchCheck, Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EditCoursePage() {
  const router = useRouter()
  const params = useParams()
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

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

  const getCourseDetails = useCallback(async () => {
    if (!id) return
    try {
      setFetching(true)
      const res = await fetch(`/api/admin/courses/${id}`, { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        setFormData(prev => ({
          ...prev,
          ...data,
          details: {
            ...prev.details,
            ...data.details,
            benefits: { ...prev.details.benefits, ...(data.details?.benefits || {}) },
            certification: { ...prev.details.certification, ...(data.details?.certification || {}) }
          }
        }))
      }
    } catch (err) {
      console.error("Hydration failed", err)
    } finally {
      setFetching(false)
    }
  }, [id])

  useEffect(() => { getCourseDetails() }, [getCourseDetails])

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
    if (!value.trim()) return
    setFormData(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.')
        const parentObj = prev.details[parent as keyof typeof prev.details] as any
        return {
          ...prev,
          details: { ...prev.details, [parent]: { ...parentObj, [child]: [...(parentObj[child] || []), value] } }
        }
      }
      const key = field as keyof typeof prev.details
      return { ...prev, details: { ...prev.details, [key]: [...(prev.details[key] as string[]), value] } }
    })
  }

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.')
        const parentObj = prev.details[parent as keyof typeof prev.details] as any
        return {
          ...prev,
          details: { ...prev.details, [parent]: { ...parentObj, [child]: parentObj[child].filter((_: any, i: number) => i !== index) } }
        }
      }
      const key = field as keyof typeof prev.details
      return { ...prev, details: { ...prev.details, [key]: (prev.details[key] as string[]).filter((_, i) => i !== index) } }
    })
  }

  const addObjectItem = (field: 'faqs' | 'whyJoin', obj: any) => {
    setFormData(prev => ({ ...prev, details: { ...prev.details, [field]: [...prev.details[field], obj] } }))
  }

  const removeObjectItem = (field: 'faqs' | 'whyJoin', index: number) => {
    setFormData(prev => ({ ...prev, details: { ...prev.details, [field]: prev.details[field].filter((_, i) => i !== index) } }))
  }

  async function updateCourse(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      if (res.ok) router.push("/admin/courses")
    } finally { setLoading(false) }
  }

  if (fetching) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa]">
      <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Syncing Intelligence...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-24 selection:bg-blue-100">
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100 px-8 py-4 mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push("/admin/courses")} className="rounded-xl text-slate-500 hover:text-blue-600 gap-2 font-bold text-xs uppercase tracking-widest">
            <ArrowLeft size={16} /> Registry
          </Button>
          <div className="h-4 w-[1px] bg-slate-200 mx-2" />
          <div className="flex items-center gap-2 text-slate-900 font-black tracking-tighter text-lg uppercase">
             <Database size={20} className="text-blue-600" /> Nexora <span className="text-blue-600">Revision</span>
          </div>
        </div>
        <Button onClick={() => router.push("/login")} variant="ghost" className="text-red-500 hover:bg-red-50 font-bold text-xs uppercase tracking-widest">Sign Out</Button>
      </nav>

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-2">
            <h1 className="text-6xl font-black tracking-tighter text-slate-900 leading-[0.85]">Revise <br /> <span className="text-blue-600">Manifest</span></h1>
            <p className="text-slate-400 font-mono text-[10px] uppercase tracking-widest opacity-60 italic font-bold">Instance ID: {id}</p>
          </div>
          <div className="flex items-center gap-6 bg-white border border-slate-100 p-5 rounded-[2rem] shadow-xl">
            <div className="text-right">
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Status</p>
              <p className={`text-xs font-black uppercase ${formData.isAvailableSoon ? 'text-orange-500' : 'text-emerald-500'}`}>{formData.isAvailableSoon ? "Queue" : "Live"}</p>
            </div>
            <button type="button" onClick={() => setFormData(p => ({...p, isAvailableSoon: !p.isAvailableSoon}))} className={`w-16 h-9 rounded-full transition-all flex items-center px-1.5 ${formData.isAvailableSoon ? 'bg-orange-500' : 'bg-slate-200'}`}>
              <motion.div layout transition={{ type: "spring", stiffness: 300, damping: 20 }} className="w-6 h-6 bg-white rounded-full shadow-md" />
            </button>
          </div>
        </div>

        <motion.form onSubmit={updateCourse} className="space-y-12">
          <FormSection title="Registry Identity" icon={<Info size={20}/>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="md:col-span-2 lg:col-span-3">
                <label className="label-elite">Manifest Title</label>
                <input className="form-input-elite" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
              <div><label className="label-elite">Domain</label><input className="form-input-elite" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} /></div>
              <div><label className="label-elite">Price (₹)</label><input className="form-input-elite" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} /></div>
              <div><label className="label-elite">Duration</label><input className="form-input-elite" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} /></div>
            </div>
          </FormSection>

          <AnimatePresence>
            {!formData.isAvailableSoon && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
                <FormSection title="Narrative & Outcomes" icon={<FileText size={20}/>}>
                  <div className="space-y-10">
                    <div><label className="label-elite">Overview (Hook)</label><textarea className="form-input-elite min-h-[80px]" value={formData.details.overview} onChange={(e) => handleDetailChange("overview", e.target.value)} /></div>
                    <div><label className="label-elite">Deep Description</label><textarea className="form-input-elite min-h-[160px]" value={formData.details.description} onChange={(e) => handleDetailChange("description", e.target.value)} /></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <TagInput title="Learning Outcomes" field="learningOutcomes" onAdd={addArrayItem} onRemove={removeArrayItem} items={formData.details.learningOutcomes} icon={<Target size={14}/>} />
                      <TagInput title="Key Highlights" field="highlights" onAdd={addArrayItem} onRemove={removeArrayItem} items={formData.details.highlights} icon={<BookmarkCheck size={14}/>} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <TagInput title="Program Features" field="keyFeatures" onAdd={addArrayItem} onRemove={removeArrayItem} items={formData.details.keyFeatures} icon={<Sparkles size={14}/>} />
                      <TagInput title="Competency Matrix" field="skillsCovered" onAdd={addArrayItem} onRemove={removeArrayItem} items={formData.details.skillsCovered} icon={<Rocket size={14}/>} />
                    </div>
                  </div>
                </FormSection>

                <FormSection title="Access & Prerequisites" icon={<ListChecks size={20}/>}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div><label className="label-elite">Eligibility</label><textarea className="form-input-elite min-h-[120px]" value={formData.details.eligibility} onChange={(e) => handleDetailChange("eligibility", e.target.value)} /></div>
                      <div><label className="label-elite">Pre-requisites</label><textarea className="form-input-elite min-h-[120px]" value={formData.details.preRequisites} onChange={(e) => handleDetailChange("preRequisites", e.target.value)} /></div>
                   </div>
                </FormSection>

                <FormSection title="Market Velocity" icon={<TrendingUp size={20}/>}>
                  <div className="space-y-6">
                    <textarea placeholder="Career Transformation..." className="form-input-elite" value={formData.details.benefits.description} onChange={(e) => handleNestedChange("benefits", "description", e.target.value)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input placeholder="Salary Hike / Stats" className="form-input-elite" value={formData.details.benefits.marketGrowth} onChange={(e) => handleNestedChange("benefits", "marketGrowth", e.target.value)} />
                      <input placeholder="Post-Completion Roles" className="form-input-elite" value={formData.details.benefits.careerProspects} onChange={(e) => handleNestedChange("benefits", "careerProspects", e.target.value)} />
                    </div>
                  </div>
                </FormSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ObjectBuilder title="Registry FAQs" onAdd={(q: string, a: string) => addObjectItem('faqs', { question: q, answer: a })} onRemove={(i: number) => removeObjectItem('faqs', i)} items={formData.details.faqs} label1="Question" label2="Answer" />
                  <ObjectBuilder title="Value Pillars" onAdd={(t: string, c: string) => addObjectItem('whyJoin', { title: t, content: c })} onRemove={(i: number) => removeObjectItem('whyJoin', i)} items={formData.details.whyJoin} label1="Title" label2="Content" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="sticky bottom-8 z-50 p-4 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] shadow-2xl flex gap-4 max-w-2xl mx-auto">
            <Button type="submit" disabled={loading} className="flex-[2] h-16 rounded-2xl bg-blue-600 hover:bg-slate-950 text-white font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3">
              {loading ? <Loader2 className="animate-spin" /> : <><Save size={18}/> Commit Revision</>}
            </Button>
            <Button type="button" onClick={() => router.push('/admin/courses')} className="flex-1 h-16 rounded-2xl border border-slate-200 bg-white text-slate-400 font-black uppercase tracking-widest text-[10px] hover:bg-red-50 hover:text-red-500 transition-all">Cancel</Button>
          </div>
        </motion.form>
      </div>
      
      <style jsx global>{`
        .form-input-elite { width: 100%; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 1.25rem; padding: 1.1rem 1.5rem; outline: none; transition: all 0.25s; font-weight: 500; font-size: 14px; }
        .form-input-elite:focus { border-color: #3b82f6; background: #fff; box-shadow: 0 0 0 5px rgba(59, 130, 246, 0.08); }
        .label-elite { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 0.6rem; display: block; margin-left: 0.25rem; }
      `}</style>
    </div>
  )
}

// 🔹 Updated TagInput for Big Data
function TagInput({ title, items, field, onAdd, onRemove, icon }: any) {
  const [v, setV] = useState("");
  const handleAdd = () => { if (v.trim()) { onAdd(field, v.trim()); setV(""); } };

  return (
    <div className="space-y-4">
      <label className="label-elite flex items-center gap-2">{icon} {title}</label>
      <div className="flex gap-2">
        <textarea 
          value={v} 
          onChange={(e) => setV(e.target.value)} 
          onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAdd(); } }} 
          className="form-input-elite min-h-[60px] py-3 resize-none" 
          placeholder={`Define ${title}...`} 
        />
        <button type="button" onClick={handleAdd} className="w-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all shrink-0"><Plus size={20}/></button>
      </div>
      <div className="flex flex-col gap-2 pt-2">
        {(items || []).map((it: string, i: number) => (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={i} className="flex items-start justify-between gap-4 px-5 py-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 transition-all shadow-sm">
            <div className="flex gap-3 items-start overflow-hidden">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
               <p className="text-[13px] font-bold text-slate-700 leading-relaxed break-words">{it}</p>
            </div>
            <button type="button" onClick={() => onRemove(field, i)} className="p-2 text-slate-300 hover:text-red-500 transition-all shrink-0"><X size={16} /></button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function FormSection({ title, icon, children }: any) {
  return (
    <section className="bg-white border border-slate-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.02)] rounded-[3rem] p-10 space-y-10">
      <div className="flex items-center gap-4 border-b border-slate-50 pb-8">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shadow-inner text-blue-600">{icon}</div>
        <h3 className="text-sm font-black uppercase tracking-[0.25em] text-slate-900">{title}</h3>
      </div>
      {children}
    </section>
  )
}

function ObjectBuilder({ title, items, onAdd, onRemove, label1, label2 }: any) {
  const [v1, setV1] = useState(""); const [v2, setV2] = useState("")
  return (
    <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-2xl space-y-6">
      <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-600 flex items-center gap-2"><Plus size={16}/> {title}</h3>
      <input placeholder={label1} className="form-input-elite" value={v1} onChange={(e) => setV1(e.target.value)} />
      <textarea placeholder={label2} className="form-input-elite min-h-[100px]" value={v2} onChange={(e) => setV2(e.target.value)} />
      <Button type="button" className="w-full bg-slate-50 text-slate-900 text-[10px] font-black uppercase h-14 rounded-2xl hover:bg-blue-600 transition-all shadow-sm" onClick={() => { onAdd(v1, v2); setV1(""); setV2(""); }}>Append Entry</Button>
      <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
        {(items || []).map((it: any, i: number) => (
          <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
            <p className="font-black text-[11px] text-slate-700 truncate pr-4">{it.question || it.title}</p>
            <button type="button" onClick={() => onRemove(i)} className="text-slate-300 hover:text-red-500"><X size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  )
}