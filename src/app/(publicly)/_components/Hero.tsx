'use client'
import React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  ArrowRight, 
  BookOpen, 
  Gamepad2, 
  BarChart3, 
  Users2, 
  PlayCircle,
  Sparkles
} from 'lucide-react'

const features = [
  {
    title: "Comprehensive Courses",
    description: "Deep-dive into advanced technical curriculum designed by industry titans.",
    icon: <BookOpen className="w-6 h-6" />,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    title: 'Interactive Learning',
    description:'Experience hands-on labs and real-time coding environments within your browser.',
    icon: <Gamepad2 className="w-6 h-6" />,
    color: "text-orange-600",
    bg: "bg-orange-50"
  },
  {
    title: 'Progress Intelligence',
    description: 'AI-driven analytics to identify skill gaps and accelerate your learning path.',
    icon: <BarChart3 className="w-6 h-6" />,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    title: 'Global Community',
    description: 'Connect with a vibrant ecosystem of 50k+ developers and engineers.',
    icon: <Users2 className="w-6 h-6" />,
    color: "text-purple-600",
    bg: "bg-purple-50"
  }
]

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background Decorative Element - The "Power" Look */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-blue-400 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[50%] bg-orange-300 rounded-full blur-[100px]" />
      </div>

      <section className='relative max-w-7xl mx-auto px-6 pt-24 pb-20'>
        <div className='flex flex-col items-center text-center'>
          
          <Badge variant="secondary" className="px-4 py-1.5 mb-8 border-blue-100 bg-blue-50 text-blue-700 animate-fade-in font-medium">
            
            2026 Skills Certification is here
          </Badge>

          <h1 className='text-5xl md:text-8xl font-black tracking-tight text-slate-900 leading-[1.1] mb-8'>
            Master the Future.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
              Adapt and Build.
            </span>
          </h1>

          <p className='max-w-[800px] text-slate-500 text-lg md:text-2xl leading-relaxed font-medium mb-10'>
            Nexora is the elite technical ecosystem for engineers. Access high-fidelity 
            interactive content and progress tracking used by world-class teams.
          </p>

          <div className='flex flex-col sm:flex-row gap-5 mb-24'>
            <Link 
              href="/courses"
              className={buttonVariants({
                size: 'lg',
                className: "px-8 py-7 text-lg shadow-xl shadow-blue-200 bg-blue-600 hover:bg-blue-700 rounded-2xl transition-all hover:scale-105 active:scale-95"
              })}
            >
              Start Learning Now <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            
            <Link 
              href="/programs"
              className={buttonVariants({
                size: 'lg',
                variant: 'ghost',
                className: "px-8 py-7 text-lg text-slate-700 hover:bg-slate-100 rounded-2xl transition-all"
              })}
            >
              <PlayCircle className="mr-2 w-5 h-5" /> Watch Demo
            </Link>
          </div>

          {/* Advanced Feature Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full'>
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className='group relative p-8 border-none bg-slate-300/10 hover:bg-white transition-all duration-500  hover:shadow-2xl hover:shadow-slate-200 rounded-[2rem] overflow-hidden'
              >
                {/* Subtle Hover Decoration */}
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className={`w-2 h-2 rounded-full ${feature.color.replace('text', 'bg')}`} />
                </div>

                <div className={`${feature.bg} ${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  {feature.icon}
                </div>

                <h3 className='text-xl font-bold text-slate-900 mb-3'>{feature.title}</h3>
                <p className='text-slate-500 text-sm leading-relaxed font-medium'>
                  {feature.description}
                </p>
                
                <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-wider text-blue-600 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  Explore Feature <ArrowRight className="ml-1 w-3 h-3" />
                </div>
              </Card>
            ))}
          </div>

        </div>
      </section>
    </div>
  )
}