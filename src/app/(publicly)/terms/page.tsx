import React from 'react'
import { Scale, ShieldCheck, FileText, Link as LinkIcon, Copyright, AlertCircle, CreditCard, AlertTriangle, Shield, Tag, BookOpen } from 'lucide-react'

// --- Content Structure ---
const sections = [
  {
    id: "introduction",
    title: "Terms of Use",
    icon: <Scale size={18} />,
    content: (
      <>
        <p>Welcome to ZenzLearn. These Terms of Use outline the rules and conditions for accessing and using our website and services.</p>
        <p>Throughout this document, “ZenzLearn”, “we”, “our”, or “us” refers to the company operating this platform. “User”, “you”, or “your” refers to anyone visiting, accessing, or purchasing from our platform.</p>
        <p>ZenzLearn provides an online platform that includes its website, learning programs, courses, and all related materials (collectively referred to as the “Services”). All rights, ownership, and control of these Services remain with ZenzLearn.</p>
        <p>By accessing, browsing, enrolling in a course, or contributing content to the platform, you confirm that you accept these Terms and agree to follow them. This applies whether you are simply visiting the site or actively using paid services.</p>
        <p>If you are accessing ZenzLearn on behalf of an organization or allowing others to use your account or purchased services, you accept full responsibility for all associated use, including any claims, losses, or liabilities that may arise.</p>
        <p>Your continued use of ZenzLearn indicates that you have read, understood, and agreed to these Terms, along with our Privacy Policy, which explains how your data is handled.</p>
        <p>If you do not agree with any part of these Terms, you should stop using the platform immediately, as access is only permitted under acceptance of these conditions.</p>
      </>
    )
  },
  {
    id: "guidelines",
    title: "Usage Guidelines and Limitations",
    icon: <FileText size={18} />,
    content: (
      <>
        <p>Before using ZenzLearn’s services, we encourage you to review these guidelines carefully to ensure a smooth and responsible experience.</p>
        <p>By accessing this platform, you agree to use it only for lawful purposes. Any misuse, violation of applicable laws, or failure to follow our Terms or Privacy Policy may result in restricted or terminated access.</p>
        <p>ZenzLearn strives to keep all content accurate and up to date. However, we do not guarantee that all information across our courses, emails, blogs, or other resources will always be free from errors or omissions. The Company shall not be held responsible for any loss, damage, or consequences arising from reliance on such content or from using our services.</p>
        <p>While many of our offerings may be accessible without direct charges, users are responsible for their own expenses related to internet access, devices, software, or service providers. Ensuring proper system functionality and connectivity remains the user’s responsibility.</p>
        <p>Certain areas of the platform may require account login details. You are expected to maintain the confidentiality of your credentials. ZenzLearn reserves the right to suspend or block access if any user fails to comply with these terms or misuses the platform.</p>
        <p>We aim to provide consistent and reliable access to our services. However, uninterrupted availability cannot be guaranteed at all times due to technical or external factors.</p>
        <p>Additionally, ZenzLearn is not liable for disruptions, delays, or failures caused by issues beyond our control, including problems related to user networks, servers, or third-party infrastructure.</p>
      </>
    )
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use Policy",
    icon: <ShieldCheck size={18} />,
    content: (
      <>
        <p>To maintain a safe, respectful, and secure learning environment, all users of ZenzLearn are expected to follow these guidelines while accessing the platform.</p>
        <ul className="list-disc pl-5 space-y-3 mt-4">
          <li><strong>Respectful Interaction:</strong> Users must interact respectfully with others. Any form of harmful behavior—including harassment, intimidation, threats, stalking, or abusive language—is strictly prohibited.</li>
          <li><strong>Lawful Content:</strong> Sharing or distributing content that is unlawful, misleading, defamatory, obscene, or otherwise inappropriate is not allowed.</li>
          <li><strong>Intellectual Property:</strong> You may not upload or transmit any files, software, or materials that are protected by intellectual property rights unless you have proper authorization.</li>
          <li><strong>System Security:</strong> Any attempt to interfere with the platform’s functionality is prohibited. This includes modifying source code, reverse engineering, or introducing malicious software.</li>
          <li><strong>Automated Abuse:</strong> The use of automated scripts, spam tools, or any activity that may disrupt platform performance is not permitted.</li>
          <li><strong>Spam & Promotions:</strong> ZenzLearn does not allow unsolicited promotions, advertisements, or the distribution of spam content.</li>
          <li><strong>Content Respect:</strong> Copying, reproducing, or distributing platform material without permission, as well as plagiarism in any form, is strictly prohibited.</li>
        </ul>
        <p className="mt-4">Users are also expected to comply with all applicable laws, regulations, and industry standards while using the platform. Any violation of legal or regulatory requirements may result in immediate action.</p>
      </>
    )
  },
  {
    id: "links-policy",
    title: "Links and External References",
    icon: <LinkIcon size={18} />,
    content: (
      <>
        <p>ZenzLearn may include links to third-party websites for informational or convenience purposes. These external sites are not operated or controlled by us, and we do not take responsibility for their content, accuracy, or practices. Accessing such links is at your own discretion.</p>
        <p>Users are not permitted to replicate, frame, or mirror any part of the ZenzLearn website on any other platform without prior authorization.</p>
        <p>Linking to ZenzLearn must be done responsibly and transparently. Any use of misleading, spam-like, or manipulative anchor text is strictly prohibited. You may not use ZenzLearn’s name, branding, trademarks, design elements, or copyrighted materials as part of a link without explicit written permission.</p>
        <p>Links directed to or from ZenzLearn must not be associated with content that promotes or supports harmful, illegal, or unethical activities. This includes, but is not limited to:</p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>Content related to discrimination, hate, or violence</li>
          <li>Terrorism or extremist ideologies</li>
          <li>Pornographic or exploitative material</li>
          <li>Violations of human or animal rights</li>
        </ul>
        <p className="mt-4">Additionally, links must not lead to content that infringes on the intellectual property rights of any individual or organization.</p>
      </>
    )
  },
  {
    id: "copyright",
    title: "Copyright & Intellectual Property",
    icon: <Copyright size={18} />,
    content: (
      <>
        <p>ZenzLearn respects the intellectual property rights of others and expects all users of the platform to do the same.</p>
        <p>All content available on the ZenzLearn website—including but not limited to text, course materials, graphics, logos, design elements, code, and software—is protected under applicable copyright and trademark laws. These rights are owned by ZenzLearn, its partners, or authorized third-party licensors.</p>
        <p>Users are not permitted to copy, reproduce, modify, distribute, publish, or commercially exploit any material from the platform without prior written permission from ZenzLearn or the respective rights holder.</p>
        <p>ZenzLearn reserves the right to restrict, suspend, or terminate access for any user found to be violating intellectual property rights or engaging in unauthorized use of our content.</p>
        <p>The use of ZenzLearn’s logos, brand elements, or digital assets is strictly prohibited without explicit written consent.</p>
      </>
    )
  },
  {
    id: "reporting-ip",
    title: "Reporting IP Infringement",
    icon: <AlertCircle size={18} />,
    content: (
      <>
        <p>ZenzLearn takes intellectual property rights seriously. If you believe that any content available on our platform has been used without proper authorization and infringes your copyright or intellectual property rights, you may submit a formal complaint for review.</p>
        <p>To help us process your request efficiently, please provide the following details:</p>
        <ul className="list-decimal pl-5 space-y-2 mt-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
          <li>A valid signature (electronic or physical) of the person authorized to act on behalf of the intellectual property owner.</li>
          <li>A clear identification and description of the copyrighted work or material you believe has been infringed.</li>
          <li>Specific information about where the allegedly infringing content is located on the ZenzLearn platform, with sufficient detail to help us locate it quickly.</li>
          <li>Your contact information, including your full address, phone number, and email address.</li>
          <li>A declaration stating that the information provided is accurate and that you are authorized to act on behalf of the owner of the intellectual property.</li>
        </ul>
        <p className="mt-4">Once we receive a complete and valid request, we will review the matter and take appropriate action as necessary. You can submit your claims by contacting the ZenzLearn Support Team through our official support channels.</p>
      </>
    )
  },
  {
    id: "payment",
    title: "Payment and Transaction Policy",
    icon: <CreditCard size={18} />,
    content: (
      <>
        <p>When making a purchase on ZenzLearn, you agree to complete the payment associated with the selected course or service. All transactions are considered final once processed, subject to any applicable refund or cancellation policies.</p>
        <p>Users are responsible for reviewing all payment-related details before completing a transaction. This includes the total amount payable, applicable taxes, discounts, and any additional charges that may apply.</p>
        <p>Certain courses or services may have specific terms or requirements. In such cases, you will be required to review and accept those additional conditions before completing your purchase. Invoices for completed transactions will be made available within your user account.</p>
        <p>For courses that include certification, eligible learners who successfully complete all required criteria will receive their certificates within a reasonable timeframe.</p>
        <p>ZenzLearn provides its products and services on an “as is” and “as available” basis, without any guarantees or warranties, whether express or implied. Any additional terms proposed by users will not be considered valid unless formally accepted in writing by ZenzLearn.</p>
        <p>ZenzLearn reserves the right to update pricing, modify offerings, limit quantities, or decline transactions at its sole discretion, without prior notice.</p>
      </>
    )
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: <AlertTriangle size={18} />,
    content: (
      <>
        <p>By using ZenzLearn’s platform and services, you acknowledge and agree that ZenzLearn shall not be held responsible for any damages arising from your use of, or inability to use, the platform.</p>
        <p>This includes, but is not limited to, any direct or indirect losses, incidental or consequential damages, or any special or exemplary damages such as loss of revenue, data, business opportunities, or goodwill—even if such possibilities have been communicated to us in advance.</p>
        <p>ZenzLearn is not liable for any losses or damages resulting from:</p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>Your access to or use of (or inability to access or use) the platform or its services.</li>
          <li>Any transactions or purchases made through the platform, including issues related to third-party services or substitute arrangements.</li>
          <li>Unauthorized access, data breaches, or alterations to your information or communications.</li>
          <li>Actions, content, or conduct of any third party on or through the platform.</li>
          <li>Any other circumstances connected to the use of our services or content.</li>
        </ul>
        <p className="mt-4 font-semibold text-slate-900">All services are provided on an “as available” basis, and your use of the platform is at your own discretion and risk.</p>
      </>
    )
  },
  {
    id: "indemnification",
    title: "Indemnification",
    icon: <Shield size={18} />,
    content: (
      <>
        <p>By using ZenzLearn’s platform and services, you agree to protect, defend, and hold harmless ZenzLearn, along with its affiliates, partners, directors, officers, employees, and representatives, from any claims, liabilities, damages, or demands raised by any third party.</p>
        <p>This includes any costs or expenses (such as legal fees and professional charges) arising from:</p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>Your violation of these Terms or any related policies.</li>
          <li>Your misuse of the platform or its services.</li>
          <li>Your breach of applicable laws or regulations.</li>
          <li>Any infringement of the rights of another individual, organization, or entity.</li>
        </ul>
        <p className="mt-4">This obligation will continue even after you stop using ZenzLearn’s services.</p>
      </>
    )
  },
  {
    id: "pricing",
    title: "Pricing Disclaimer",
    icon: <Tag size={18} />,
    content: (
      <>
        <p>All pricing, course fees, and promotional offers on ZenzLearn are subject to change at any time without prior notice.</p>
        <p>We strive to ensure that all information displayed on our platform is accurate and up to date. However, occasional errors may occur, including incorrect pricing due to technical issues, human oversight, or discrepancies in information received from third-party providers.</p>
        <p>ZenzLearn reserves the right to revise or update pricing, offers, and availability of courses based on factors such as market conditions, changes in partnerships, course updates or discontinuation, and correction of errors.</p>
        <p>In the event of a pricing change after a purchase has been completed, the amount paid by the user at the time of the transaction will remain valid and honored for that specific purchase.</p>
      </>
    )
  },
  {
    id: "study-materials",
    title: "Use of Study Materials",
    icon: <BookOpen size={18} />,
    content: (
      <>
        <p>All study materials provided by ZenzLearn, including course content, videos, documents, presentations, and other learning resources, are the exclusive property of ZenzLearn or its authorized partners.</p>
        <p>These materials are intended solely for personal learning and non-commercial use. Users are not permitted to copy, reproduce, distribute, modify, publish, or share any part of the study material in any form without prior written permission from ZenzLearn.</p>
        <p>Any unauthorized use, including redistribution or commercial exploitation of the content, may result in legal action and suspension or termination of access to the platform.</p>
        <p>ZenzLearn reserves the right to update, modify, or discontinue any study material at its discretion without prior notice.</p>
      </>
    )
  }
]

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans selection:bg-blue-100 scroll-smooth mt-10">
      
      {/* 🔹 HERO HEADER */}
      <section className="bg-slate-950 text-white pt-24 pb-20 px-6 sm:px-8 border-b border-slate-800 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-6">
            <span className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-md text-[10px] font-bold uppercase tracking-widest text-slate-300">
              Legal Documentation
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Terms of Use
            </h1>
            <p className="text-lg text-slate-400 font-medium leading-relaxed">
             
              Please read these terms carefully before using the ZenzLearn platform.
            </p>
          </div>
        </div>
      </section>

      {/* 🔹 MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* 🔹 STICKY SIDEBAR NAVIGATION (Static for Server Component) */}
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
                    <span className="truncate">{section.title}</span>
                  </span>
                </a>
              ))}
            </nav>
          </aside>

          {/* 🔹 CONTENT AREA */}
          <div className="flex-1 min-w-0">
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 sm:p-12 lg:p-16 shadow-sm">
              <div className="space-y-16">
                {sections.map((section, index) => (
                  <section 
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-32" // Added padding to offset the fixed header during anchor link jumps
                  >
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 shrink-0">
                        {section.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                        {index + 1}. {section.title}
                      </h2>
                    </div>
                    <div className="prose prose-slate prose-blue max-w-none text-slate-600 font-medium leading-[1.8] text-[15px]">
                      {section.content}
                    </div>
                  </section>
                ))}
              </div>

              {/* End of Document Notice */}
              <div className="mt-16 pt-8 border-t border-slate-200 text-center">
                <p className="text-sm font-semibold text-slate-500">
                  End of Terms of Use. <br/> If you have any questions, please contact our legal team at <a href="mailto:legal@zenzlearn.com" className="text-blue-600 hover:underline">legal@zenzlearn.com</a>.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}