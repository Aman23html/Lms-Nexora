import React from 'react'
import { FileText, ShieldCheck, HelpCircle, Layers, RefreshCw, AlertCircle, Sparkles } from 'lucide-react'

// --- Content Structure ---
const sections = [
  {
    id: "overview",
    title: "Refund Policy Overview",
    icon: <FileText size={18} />,
    content: (
      <>
        <p>Thank you for choosing ZenzLearn for your learning journey. We strive to provide a high-quality and satisfying experience for all users as they explore, evaluate, and enroll in our courses, whether instructor-led or self-paced.</p>
        <p>By purchasing any course from our platform, you agree to abide by our Refund Policy, along with our Terms of Use and Privacy Policy.</p>
        <p>This Refund Policy outlines the conditions under which refunds may be granted and the process to request them. We encourage you to review these terms carefully before making a purchase to ensure clarity and transparency.</p>
      </>
    )
  },
  {
    id: "instructor-led-eligibility",
    title: "Refund Eligibility for Instructor-Led Training",
    icon: <Layers size={18} />,
    content: (
      <>
        <p>To be considered for a refund on instructor-led courses, the following conditions must be met:</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          <div className="bg-slate-50 p-5 border border-slate-200 rounded-xl flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Window Constraint</span>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">The refund request must be submitted within 7 days from the date of purchase.</p>
          </div>
          <div className="bg-slate-50 p-5 border border-slate-200 rounded-xl flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Consumption Cap</span>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">You should not have accessed more than 25% of the course content.</p>
          </div>
          <div className="bg-slate-50 p-5 border border-slate-200 rounded-xl flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Attendance Barrier</span>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">Participation must be limited to no more than one (1) live session.</p>
          </div>
          <div className="bg-slate-50 p-5 border border-slate-200 rounded-xl flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Asset Protection</span>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">No exam voucher, certification kit, or related material should have been requested or issued.</p>
          </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 mt-4 text-xs text-amber-800 font-medium">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>Refund requests that do not satisfy all of the above criteria will not be eligible for approval.</span>
        </div>
      </>
    )
  },
  {
    id: "duplicate-payments",
    title: "Refunds for Duplicate Payments",
    icon: <RefreshCw size={18} />,
    content: (
      <>
        <p>In the event of a duplicate payment, the excess amount will be refunded using the original payment method.</p>
        <p>Once your request has been received and verified, the refund will be processed within 10 working days.</p>
      </>
    )
  },
  {
    id: "policy-updates",
    title: "Policy Updates",
    icon: <Sparkles size={18} />,
    content: (
      <>
        <p>ZenzLearn reserves the right to modify or update this Refund Policy at any time without prior notice.</p>
      </>
    )
  }
]

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans selection:bg-blue-100 scroll-smooth mt-10">
      
      {/* 🔹 HERO HEADER */}
      <section className="bg-slate-950 text-white pt-24 pb-20 px-6 sm:px-8 border-b border-slate-800 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-6">
            <span className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-md text-[10px] font-bold uppercase tracking-widest text-slate-300">
              Transaction Safety Registry
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Refund Policy
            </h1>
            <p className="text-lg text-slate-400 font-medium leading-relaxed">
              Effective Date: May 2026. <br className="sm:hidden"/> 
              This registry framework details clear guidelines regarding course cancellation workflows.
            </p>
          </div>
        </div>
      </section>

      {/* 🔹 MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* 🔹 STICKY SIDEBAR NAVIGATION */}
          <aside className="hidden lg:block w-[280px] shrink-0 sticky top-28">
            <nav className="flex flex-col gap-1 pr-6 border-r border-slate-200">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="relative flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-colors duration-200 text-left text-slate-500 hover:bg-slate-100 hover:text-slate-900 group"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-slate-400 group-hover:text-blue-600 transition-colors">
                      {section.icon}
                    </span>
                    <span className="truncate text-ellipsis">{section.title}</span>
                  </span>
                </a>
              ))}
            </nav>
          </aside>

          {/* 🔹 CONTENT CONTAINER AREA */}
          <div className="flex-1 min-w-0">
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 sm:p-12 lg:p-16 shadow-sm">
              <div className="space-y-16">
                {sections.map((section, index) => (
                  <section 
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-32"
                  >
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 shrink-0">
                        {section.icon}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        {index + 1}. {section.title}
                      </h2>
                    </div>
                    <div className="prose prose-slate prose-blue max-w-none text-slate-600 font-medium leading-[1.8] text-[15px]">
                      {section.content}
                    </div>
                  </section>
                ))}
              </div>

              {/* End of Document Support Notice */}
              <div className="mt-16 pt-8 border-t border-slate-200 text-center">
                <p className="text-sm font-semibold text-slate-500">
                  End of Refund Policy statement. <br/> For processing queries or dashboard verification errors, please coordinate with <a href="mailto:support@zenzlearn.com" className="text-blue-600 hover:underline font-bold">support@zenzlearn.com</a>.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}