'use client'

import { Eye, EyeOff, Loader2, Lock, LogIn, Mail, ShieldCheck, AlertCircle, Database, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        try {
            const res = await signIn("credentials", {
                email, password, redirect: false
            })
            if (res?.error) {
                setError("Authorization failed. Please verify credentials.")
            } else {
                router.push("/admin")
            }
        } catch (err) {
            setError("Mainframe connection error.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-[#F8FAFC] relative overflow-hidden px-6 selection:bg-blue-100'>
            
            {/* 🔹 DYNAMIC AMBIENT BACKGROUND */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] bg-blue-100/50 rounded-full blur-[120px]" 
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
                    className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-slate-200/50 rounded-full blur-[100px]" 
                />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-lg z-10"
            >
                <div className='bg-white border border-slate-200 p-8 md:p-14 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] relative overflow-hidden'>
                    
                    {/* Header Branding */}
                    <div className="flex flex-col items-center mb-12">
                        <motion.div 
                            whileHover={{ rotate: 15 }}
                            className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl shadow-blue-200"
                        >
                            <Database className="text-white w-10 h-10" />
                        </motion.div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase text-center">
                            Nexora <span className="text-blue-600">Mainframe</span>
                        </h1>
                        <div className="flex items-center gap-2 mt-3">
                            <div className="h-[1px] w-4 bg-slate-200" />
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Administrative Access</p>
                            <div className="h-[1px] w-4 bg-slate-200" />
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className='space-y-6'>
                        
                        {/* Email Node */}
                        <div className="space-y-2">
                            <label className="label-elite flex items-center gap-2">
                                <Mail size={12} className="text-blue-600" /> Administrative Email
                            </label>
                            <div className='relative group'>
                                <input 
                                    type="email" 
                                    placeholder='name@nexoraglobal.com' 
                                    className='form-input-elite pl-6' 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Secret Key Node */}
                        <div className="space-y-2">
                            <label className="label-elite flex items-center gap-2">
                                <Lock size={12} className="text-blue-600" /> Credential Key
                            </label>
                            <div className='relative group'>
                                <input 
                                    type={show ? "text" : "password"} 
                                    placeholder='••••••••' 
                                    className='form-input-elite pl-6 pr-14' 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShow(!show)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-blue-600 transition-colors"
                                >
                                    {show ? <EyeOff size={18} strokeWidth={2.5} /> : <Eye size={18} strokeWidth={2.5} />}
                                </button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0, y: -10 }} 
                                    animate={{ opacity: 1, height: 'auto', y: 0 }} 
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-3 text-red-600 text-xs font-bold bg-red-50 p-4 rounded-2xl border border-red-100"
                                >
                                    <AlertCircle size={16} /> {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Button 
                            disabled={loading}
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-blue-600 text-white h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Initialize Session <LogIn size={16}/></>}
                        </Button>

                    </form>

                    <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                        <p className='text-slate-400 text-[11px] font-bold uppercase tracking-widest'>
                            Restricted Area. <br />
                            <span className="text-slate-300 italic font-medium lowercase tracking-normal">Unauthorized access is monitored.</span>
                        </p>
                    </div>

                    {/* Subtle Corner Accents */}
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                        <ShieldCheck size={120} />
                    </div>
                </div>

                <div className="mt-8 text-center flex items-center justify-center gap-6 opacity-40 grayscale group hover:grayscale-0 transition-all duration-700">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Security Partners:</p>
                    <div className="flex gap-4">
                        <ShieldCheck size={16} />
                        <Sparkles size={16} />
                    </div>
                </div>
            </motion.div>

            {/* 🔹 ELITE STYLES */}
            <style jsx global>{`
                .form-input-elite {
                    width: 100%;
                    background: #F8FAFC;
                    border: 1px solid #E2E8F0;
                    border-radius: 1.25rem;
                    padding: 1.1rem 1.5rem;
                    outline: none;
                    transition: all 0.25s ease;
                    font-weight: 600;
                    font-size: 14px;
                    color: #0F172A;
                }
                .form-input-elite:focus {
                    border-color: #3B82F6;
                    background: #FFF;
                    box-shadow: 0 0 0 5px rgba(59, 130, 246, 0.08);
                }
                .label-elite {
                    font-size: 10px;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    color: #94A3B8;
                    display: block;
                    margin-left: 0.5rem;
                }
            `}</style>
        </div>
    )
}

export default Login