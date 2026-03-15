'use client'

import React, { useState, useEffect } from "react"
import { 
  PlusCircle, 
  Type, 
  Layers, 
  Tag, 
  Clock, 
  IndianRupee, 
  UserCircle, 
  Image as ImageIcon,
  Sparkles,
  Edit3,
  X
} from "lucide-react"
import { Course } from "../courses/CourseCard"

interface CourseFormProps {
  onAdd: (course: Course) => void;
  initialData?: Course | null;
  onCancel?: () => void;
}

export default function CourseForm({ onAdd, initialData, onCancel }: CourseFormProps) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    subCategory: "",
    duration: "",
    enrolled: "0",
    price: "",
    instructor: "",
    image: ""
  })

  // 🔹 Sync form with initialData when editing starts
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        category: initialData.category || "",
        subCategory: initialData.subCategory || "",
        duration: initialData.duration || "",
        enrolled: initialData.enrolled || "0",
        price: initialData.price || "",
        instructor: initialData.instructor || "",
        image: initialData.image || ""
      })
    } else {
      resetForm()
    }
  }, [initialData])

  const resetForm = () => {
    setForm({
      title: "",
      category: "",
      subCategory: "",
      duration: "",
      enrolled: "0",
      price: "",
      instructor: "",
      image: ""
    })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!form.title || !form.price) return

    const courseData: Course = {
      // Preserve ID if editing, otherwise create new
      id: initialData ? initialData.id : Date.now(),
      ...form,
      recommended: initialData ? initialData.recommended : false
    }

    onAdd(courseData)
    resetForm()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white p-8 rounded-[2.5rem] border transition-all duration-500 ${
        initialData ? "border-orange-200 shadow-orange-50" : "border-slate-200 shadow-sm"
      } space-y-6`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${initialData ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-blue-600"}`}>
            {initialData ? <Edit3 size={20} /> : <PlusCircle size={20} />}
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {initialData ? "Edit Pathway" : "Create Pathway"}
          </h2>
        </div>
        
        {initialData && (
          <button 
            type="button" 
            onClick={onCancel}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Course Title */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Course Title</label>
          <div className="relative">
            <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              name="title" 
              placeholder="e.g. Advanced Quantum Computing" 
              value={form.title} 
              onChange={handleChange} 
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm font-medium"
              required
            />
          </div>
        </div>

        {/* Domain & Tag */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Domain</label>
            <div className="relative">
              <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input name="category" placeholder="Data Science" value={form.category} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm font-medium"/>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tech Tag</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input name="subCategory" placeholder="Python" value={form.subCategory} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm font-medium"/>
            </div>
          </div>
        </div>

        {/* Duration & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Duration</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input name="duration" placeholder="6 Months" value={form.duration} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm font-medium"/>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Fees (INR)</label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input name="price" placeholder="15,000" value={form.price} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm font-medium"/>
            </div>
          </div>
        </div>

        {/* Instructor */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Instructor / Institution</label>
          <div className="relative">
            <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input name="instructor" placeholder="IIT Bombay / Nexora Labs" value={form.instructor} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm font-medium"/>
          </div>
        </div>

        {/* Image */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Cover Image URL</label>
          <div className="relative">
            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input name="image" placeholder="https://unsplash.com/..." value={form.image} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm font-medium"/>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          type="submit"
          className={`group relative flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg ${
            initialData 
            ? "bg-orange-600 hover:bg-orange-700 text-white shadow-orange-200" 
            : "bg-slate-900 hover:bg-blue-600 text-white shadow-slate-200"
          }`}
        >
          <Sparkles size={16} className="group-hover:animate-spin" />
          {initialData ? "Save Changes" : "Publish to Repository"}
        </button>

        {initialData && (
          <button 
            type="button"
            onClick={onCancel}
            className="px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}