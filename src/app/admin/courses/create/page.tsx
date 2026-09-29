'use client'

import React, { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { signOut } from "next-auth/react"
import { 
  ArrowLeft, Plus, Loader2, 
  GraduationCap, X, TrendingUp, Rocket,
  Target, Briefcase, FileText, Info, Users, LogOut, LayoutDashboard,
  BookmarkCheck, Sparkles, HelpCircle, ShieldCheck, UploadCloud, AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"

type FAQ = { question: string; answer: string }
type WhyJoin = { title: string; content: string }
type Benefits = { description: string; marketGrowth: string; careerProspects: string }
type Certification = { awardedBy: string; features: string[] }
type CourseDetails = {
  description: string
  overview: string
  learningOutcomes: string[]
  highlights: string[]
  keyFeatures: string[]
  skillsCovered: string[]
  benefits: Benefits
  eligibility: string
  preRequisites: string
  certification: Certification
  whyJoin: WhyJoin[]
  faqs: FAQ[]
  industriesCovered: string[]
  jobRoles: string[]
}
type CourseFormData = {
  title: string
  category: string
  subCategory: string
  instructor: string
  price: string
  duration: string
  image: string
  level: string
  recommended: boolean
  isAvailableSoon: boolean
  details: CourseDetails
}
type StringArrayPath =
  | "highlights"
  | "learningOutcomes"
  | "keyFeatures"
  | "skillsCovered"
  | "industriesCovered"
  | "jobRoles"
  | "certification.features"

export default function CreateCoursePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<CourseFormData>({
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
      whyJoin: [] as WhyJoin[],
      faqs: [] as FAQ[],
      industriesCovered: [] as string[],
      jobRoles: [] as string[],
    }
  })

  // --- Logic Handlers ---
  const handleDetailChange = <K extends keyof CourseDetails,>(name: K, value: CourseDetails[K]) => {
    setFormData(prev => ({ ...prev, details: { ...prev.details, [name]: value } }))
  }

  const handleNestedChange = (parent: "benefits" | "certification", name: keyof Benefits | "awardedBy", value: string) => {
    if (parent === "benefits" && name !== "awardedBy") {
      setFormData(prev => ({ ...prev, details: { ...prev.details, benefits: { ...prev.details.benefits, [name]: value } } }))
    } else if (parent === "certification" && name === "awardedBy") {
      setFormData(prev => ({ ...prev, details: { ...prev.details, certification: { ...prev.details.certification, awardedBy: value } } }))
    }
  }

  const updateArray = (field: StringArrayPath, update: (items: string[]) => string[]) => {
    setFormData(prev => {
      const details = { ...prev.details }
      switch (field) {
        case "highlights": details.highlights = update(details.highlights); break
        case "learningOutcomes": details.learningOutcomes = update(details.learningOutcomes); break
        case "keyFeatures": details.keyFeatures = update(details.keyFeatures); break
        case "skillsCovered": details.skillsCovered = update(details.skillsCovered); break
        case "industriesCovered": details.industriesCovered = update(details.industriesCovered); break
        case "jobRoles": details.jobRoles = update(details.jobRoles); break
        case "certification.features":
          details.certification = { ...details.certification, features: update(details.certification.features) }
          break
      }
      return { ...prev, details }
    })
  }

  const addArrayItem = (field: StringArrayPath, value: string) => {
    if (!value.trim()) return
    updateArray(field, items => [...items, value.trim()])
  }

  const removeArrayItem = (field: StringArrayPath, index: number) => {
    updateArray(field, items => items.filter((_, itemIndex) => itemIndex !== index))
  }

  const addObjectItem = (field: 'faqs' | 'whyJoin', item: FAQ | WhyJoin) => {
    if (field === "faqs") {
      setFormData(prev => ({ ...prev, details: { ...prev.details, faqs: [...prev.details.faqs, item as FAQ] } }))
    } else {
      setFormData(prev => ({ ...prev, details: { ...prev.details, whyJoin: [...prev.details.whyJoin, item as WhyJoin] } }))
    }
  }

  const removeObjectItem = (field: 'faqs' | 'whyJoin', index: number) => {
    if (field === "faqs") {
      setFormData(prev => ({ ...prev, details: { ...prev.details, faqs: prev.details.faqs.filter((_, itemIndex) => itemIndex !== index) } }))
    } else {
      setFormData(prev => ({ ...prev, details: { ...prev.details, whyJoin: prev.details.whyJoin.filter((_, itemIndex) => itemIndex !== index) } }))
    }
  }

  // 🔹 Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        setSubmitError("Choose a valid image file.")
        e.target.value = ""
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError("Cover images must be 5 MB or smaller.")
        e.target.value = ""
        return
      }
      setSubmitError("")
      const reader = new FileReader()
      reader.onerror = () => setSubmitError("The selected image could not be read. Please try another file.")
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitError("")
    if (!formData.image.trim()) {
      setSubmitError("Add a cover image before publishing this course.")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Course creation failed. Please try again.")
      router.push("/admin/courses")
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Course creation failed. Please try again.")
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-24 relative selection:bg-blue-100">
      {/* Admin Navigation */}
      <nav className="sticky top-0 z-100 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-8 py-4 mb-10 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()} className="rounded-xl text-slate-500 hover:text-blue-600 gap-2 font-bold text-xs uppercase tracking-widest">
            <ArrowLeft size={16} /> Registry
          </Button>
          <div className="h-4 w-px bg-slate-200 mx-2" />
          <div className="flex items-center gap-2 text-slate-900 font-black tracking-tighter text-lg uppercase">
             <LayoutDashboard size={20} className="text-blue-600" /> Nexora <span className="text-blue-600">Admin</span>
          </div>
        </div>
        <Button onClick={() => signOut({ redirectTo: "/login" })} variant="ghost" className="rounded-xl text-red-500 hover:bg-red-50 gap-2 font-bold text-xs uppercase tracking-widest">
           <LogOut size={16} /> Exit Node
        </Button>
      </nav>

      <div className="max-w-6xl mx-auto px-6">
        <Header status={formData.isAvailableSoon} onToggle={() => setFormData(p => ({...p, isAvailableSoon: !p.isAvailableSoon}))} section={formData.isAvailableSoon ? "Queue" : "Live"} />

        <motion.form onSubmit={handleSubmit} className="space-y-12">
          {submitError && (
            <div role="alert" className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-800">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>{submitError}</p>
            </div>
          )}
          
          {/* 1. CORE DATA */}
          <FormSection title="Registry Identity" icon={<Info size={20}/>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="md:col-span-2 lg:col-span-3">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2 block">Manifest Title</label>
                <input required placeholder="e.g., Machine Learning Using Python" className="form-input-elite" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
              <input required placeholder="Domain (e.g. AI & ML)" className="form-input-elite" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
              <input required placeholder="Accreditor (Instructor)" className="form-input-elite" value={formData.instructor} onChange={(e) => setFormData({...formData, instructor: e.target.value})} />
              <input required placeholder="Tuition (₹)" className="form-input-elite" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
              <input required placeholder="Duration (e.g. 40+ Hours)" className="form-input-elite" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
              
              {/* 🔹 Replaced URL Input with File Upload Zone */}
              <div className="md:col-span-2 space-y-2">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-16 bg-[#f8fafc] border border-slate-200 rounded-4xl flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all group overflow-hidden relative"
                >
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleImageUpload} 
                  />
                  {formData.image ? (
                     <div className="w-full h-full relative group">
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white font-bold text-xs tracking-widest uppercase">Change Image</span>
                        </div>
                     </div>
                  ) : (
                     <div className="flex items-center gap-3 text-slate-400 group-hover:text-blue-600 transition-colors">
                       <UploadCloud size={20} />
                       <span className="text-sm font-bold">Upload Cover Image</span>
                     </div>
                  )}
                </div>
              </div>

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
                       <textarea placeholder="e.g., Harness the Power of Data..." className="form-input-elite min-h-20" value={formData.details.overview} onChange={(e) => handleDetailChange("overview", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 block">Full Deep Narrative (Description)</label>
                       <textarea placeholder="Detailed course story..." className="form-input-elite min-h-40" value={formData.details.description} onChange={(e) => handleDetailChange("description", e.target.value)} />
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
                  <ObjectBuilder title="Protocol FAQ" onAdd={(question, answer) => addObjectItem('faqs', { question, answer })} onRemove={(index) => removeObjectItem('faqs', index)} items={formData.details.faqs} label1="Question" label2="Answer" icon={<HelpCircle size={16}/>} />
                  <ObjectBuilder title="Nexora Pillars (Why Join)" onAdd={(title, content) => addObjectItem('whyJoin', { title, content })} onRemove={(index) => removeObjectItem('whyJoin', index)} items={formData.details.whyJoin} label1="Value Proposition Title" label2="Deep Content" icon={<Plus size={16}/>} />
                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Footer */}
          <div className="sticky bottom-8 z-50 p-4 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] shadow-2xl flex gap-4 max-w-2xl mx-auto items-center">
            <Button type="submit" disabled={loading} className="flex-2 h-16 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3">
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

function FormSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="bg-white border border-slate-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] rounded-3xl p-5 sm:p-8 space-y-6 sm:space-y-10">
      <div className="flex items-center gap-4 border-b border-slate-50 pb-6 sm:pb-8">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shadow-inner text-blue-600">{icon}</div>
        <h3 className="text-sm font-black uppercase tracking-[0.25em] text-slate-900">{title}</h3>
      </div>
      {children}
    </section>
  )
}

function TagInput({ title, items, field, onAdd, onRemove, icon }: { title: string; items: string[]; field: StringArrayPath; onAdd: (field: StringArrayPath, value: string) => void; onRemove: (field: StringArrayPath, index: number) => void; icon: React.ReactNode }) {
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
          className="form-input-elite min-h-15 py-3 resize-none" 
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
              <p className="text-[13px] font-bold text-slate-700 leading-relaxed wrap-break-word pr-4">
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

function ObjectBuilder({ title, items, onAdd, onRemove, label1, label2, icon }: { title: string; items: (FAQ | WhyJoin)[]; onAdd: (first: string, second: string) => void; onRemove: (index: number) => void; label1: string; label2: string; icon: React.ReactNode }) {
  const [v1, setV1] = useState(""); const [v2, setV2] = useState("")
  const [error, setError] = useState("")
  const handleAdd = () => {
    if (!v1.trim() || !v2.trim()) {
      setError("Complete both fields before appending this entry.")
      return
    }
    onAdd(v1.trim(), v2.trim())
    setV1("")
    setV2("")
    setError("")
  }

  return (
    <div className="bg-white border border-slate-100 p-5 sm:p-8 rounded-3xl shadow-xl shadow-slate-100/50 space-y-6">
      <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-600 flex items-center gap-2">{icon} {title} Module</h3>
      <input placeholder={label1} className="form-input-elite" value={v1} onChange={(e) => setV1(e.target.value)} />
      <textarea placeholder={label2} className="form-input-elite min-h-25" value={v2} onChange={(e) => setV2(e.target.value)} />
      <Button type="button" className="w-full bg-slate-50 text-slate-900 text-[10px] font-black uppercase h-14 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm" onClick={handleAdd}>Append Entry</Button>
      {error && <p role="alert" className="text-sm text-rose-600">{error}</p>}
      <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
        {items.map((it, i) => (
          <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center group">
            <p className="font-black text-[11px] text-slate-700 truncate pr-4">{"question" in it ? it.question : it.title}</p>
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
        <button type="button" role="switch" aria-checked={status} aria-label="Toggle course availability" onClick={onToggle} className={`w-16 h-9 rounded-full transition-all flex items-center px-1.5 ${status ? 'bg-orange-500' : 'bg-slate-200'}`}>
          <motion.div layout transition={{ type: "spring", stiffness: 300, damping: 20 }} className="w-6 h-6 bg-white rounded-full shadow-md" />
        </button>
      </div>
    </div>
  )
}