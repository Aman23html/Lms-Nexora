'use client'

import { Eye, EyeOff, Leaf, Loader2, Lock, LogIn, Mail, ShieldCheck, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import Image from 'next/image'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleLogin = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        try {
            const res = await signIn("credentials", {
                email, password, redirect: false
            })
            if (res?.error) setError("Invalid credentials. Please try again.")
            else router.push("/admin")
        } catch (err) {
            setError("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-[#0a0505] relative overflow-hidden px-6'>
            {/* Animated Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-900/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/10 rounded-full blur-[120px]" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="w-full max-w-md z-10"
            >
                <div className='bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl'>
                    
                    {/* Logo/Icon Section */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-20 h-20 bg-red-900 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-red-900/30">
                            <Leaf className="text-amber-400 w-10 h-10" />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight text-center">
                            LMS <span className="text-red-500">Login</span>
                        </h1>
                        <p className="text-slate-400 text-sm mt-2 font-medium tracking-wide uppercase">Secure Portal Access</p>
                    </div>

                    <form onSubmit={handleLogin} className='space-y-5'>
                        {/* Email Field */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Admin Email</label>
                            <div className='relative'>
                                <Mail className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500' />
                                <input 
                                    type="email" 
                                    placeholder='name@catering.com' 
                                    className='w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-red-600/50 transition-all shadow-inner' 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Secret Key</label>
                            <div className='relative'>
                                <Lock className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500' />
                                <input 
                                    type={show ? "text" : "password"} 
                                    placeholder='••••••••' 
                                    className='w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white outline-none focus:ring-2 focus:ring-red-600/50 transition-all shadow-inner' 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShow(!show)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                >
                                    {show ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }} 
                                    animate={{ opacity: 1, height: 'auto' }} 
                                    className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-3 rounded-xl border border-red-400/20"
                                >
                                    <AlertCircle size={14} /> {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button 
                            disabled={loading}
                            className="w-full bg-red-800 hover:bg-red-700 disabled:opacity-50 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-red-900/20 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Authorize Access <LogIn size={18}/></>}
                        </button>

                        <div className='flex items-center gap-4 my-6'>
                            <div className='flex-1 h-[1px] bg-white/10'></div>
                            <span className='text-slate-500 text-xs font-bold tracking-widest'>OR</span>
                            <div className='flex-1 h-[1px] bg-white/10'></div>
                        </div>

                        
                    </form>

                    <div className="mt-10 text-center">
                        <p className='text-slate-400 text-sm'>
                            New personnel? 
                            <span 
                                onClick={() => router.push("/register")}
                                className='text-red-500 font-bold cursor-pointer hover:underline ml-2'
                            >
                                Request Account
                            </span>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Login