import React from 'react'
import { 
  FileText, ShieldCheck, Globe, Database, UserCheck, 
  Eye, HelpCircle, UserX, ToggleLeft, ShieldAlert, 
  MessageSquare, Lock, Heart, RefreshCw 
} from 'lucide-react'

// --- Privacy Policy Sections Mapping ---
const sections = [
  {
    id: "purpose",
    title: "Purpose of This Privacy Policy",
    icon: <FileText size={18} />,
    content: (
      <>
        <p>ZenzLearn (“ZenzLearn”, “we”, “our”, or “us”) is dedicated to safeguarding your privacy and handling your data with responsibility and transparency.</p>
        <p>This Privacy Policy explains how we collect, use, store, and protect the personal information you share with us when you access our website, applications, or services. It also outlines your rights regarding your data, including how you can access, update, or withdraw your consent where applicable.</p>
        <p>The information we collect is used strictly to deliver and improve the services you choose to use on our platform. We do not process your data beyond what is necessary for providing these services, unless required by law or with your consent.</p>
        <p>Any terms used in this Policy that are not specifically defined here will carry the same meaning as outlined in our Terms and Conditions.</p>
        <p>For the purposes of this Policy, “personal information” includes any data that can identify an individual, including sensitive personal data where applicable under relevant laws. Wherever required, such sensitive information will be handled in accordance with applicable data protection regulations.</p>
      </>
    )
  },
  {
    id: "end-users",
    title: "Notice to End Users",
    icon: <UserCheck size={18} />,
    content: (
      <>
        <p>In certain situations, your account on ZenzLearn may be created or managed by a third party, such as your employer or an authorized training partner (“Client”). In such cases, the Client may provide us with your information, including personal data, on your behalf.</p>
        <p>When this occurs, ZenzLearn processes your information under the instructions of the Client, and our direct relationship is primarily with the Client rather than the individual end user.</p>
        <p>Your use of the platform in these scenarios may also be governed by the policies and agreements established by the Client. It is the Client’s responsibility to ensure they have the appropriate authority to collect, share, and manage your personal information in accordance with applicable laws and this Privacy Policy.</p>
        <p>If you are accessing ZenzLearn as an end user under such an arrangement, any questions or requests related to your personal data should be directed to your administrator or organization. ZenzLearn is not responsible for the privacy practices of Clients, which may differ from those outlined in this Policy.</p>
        <p>We also want to clarify that mobile contact information provided to ZenzLearn will not be shared with third parties or affiliates for marketing or promotional purposes. This includes strict protection of messaging consent data—such as opt-in records—which will not be disclosed to any external parties.</p>
      </>
    )
  },
  {
    id: "international-transfers",
    title: "International Data Transfers",
    icon: <Globe size={18} />,
    content: (
      <>
        <p>ZenzLearn operates on a global scale, and as part of delivering our services, your personal information may be stored, processed, or accessed in multiple locations around the world.</p>
        <p>This means your data may be transferred to and maintained on servers located outside your country of residence, including regions where ZenzLearn, its affiliates, or trusted service providers maintain operations. Currently, such locations may include countries like the United States, India, Singapore, and Japan.</p>
        <p>Our teams and authorized partners in these regions may access your data for purposes such as service delivery, platform improvement, customer support, and technical operations.</p>
        <p>Please note that data protection laws in some of these countries may differ from those in your jurisdiction. However, ZenzLearn takes appropriate measures to ensure that your information remains protected and handled in accordance with this Privacy Policy, regardless of where it is processed.</p>
        <p>For users located in regions such as the European Economic Area (EEA) or Switzerland, where stricter data protection standards apply, we implement appropriate safeguards—such as contractual agreements—to ensure your data continues to receive an adequate level of protection when transferred internationally.</p>
        <p>By using ZenzLearn’s services or submitting your personal information, you acknowledge and consent to the transfer, storage, and processing of your data across these global locations.</p>
      </>
    )
  },
  {
    id: "data-collection",
    title: "Information Collection & Usage",
    icon: <Database size={18} />,
    content: (
      <>
        <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2">Personal Information We Collect</h3>
        <p>ZenzLearn may collect certain personal details from users when they interact with our platform in specific ways. This information is typically gathered when you choose to share it with us—for example, when you fill out a contact form, engage with us via chat or phone, register for an account, or purchase a course.</p>
        <ul className="list-disc pl-5 space-y-1 my-3">
          <li>Name, email address, phone number, and mailing address.</li>
          <li>IP address and basic device-related information.</li>
        </ul>
        <p>You are free to browse the ZenzLearn website without revealing your identity. We only collect personal information when it is voluntarily provided by you. However, choosing not to share certain details may limit your ability to access specific features.</p>

        <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Non-Personal Data Collection</h3>
        <p>In addition to personal information, ZenzLearn may automatically collect certain non-identifiable data to better understand how users interact with our platform. This information is recorded through system logs and analytics tools and does not directly identify you as an individual.</p>
        <ul className="list-disc pl-5 space-y-1 my-3">
          <li>Device type, operating system, browser type, and version.</li>
          <li>General geographic location, language preferences, and time zone settings.</li>
          <li>Screen resolution, display settings, referring/exit pages, and navigational behavior.</li>
        </ul>
      </>
    )
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    icon: <Eye size={18} />,
    content: (
      <>
        <p>ZenzLearn uses the information you provide to deliver, manage, and improve our services, as well as to communicate effectively with you.</p>
        <p>Your personal data may be used for the following purposes:</p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>To provide access to courses, content, and other services offered on the platform.</li>
          <li>To communicate important updates, notifications, and service-related information.</li>
          <li>To understand your needs and recommend relevant courses or solutions.</li>
          <li>To respond to your queries and provide customer support.</li>
          <li>To analyze user behavior and preferences in order to improve our platform and offerings.</li>
        </ul>
        <p className="mt-4">We may contact you through various channels such as email, phone, or chat regarding your account, courses, inquiries, or other service-related matters. By using our services and accepting this Privacy Policy, you consent to receiving such communications.</p>
        <p>Please note that this consent applies even if your contact details are registered under “Do Not Disturb” (DND), “Do Not Call” (DNC), or similar preference registries, to the extent permitted by applicable laws.</p>
      </>
    )
  },
  {
    id: "sharing",
    title: "Sharing of Information",
    icon: <ShieldCheck size={18} />,
    content: (
      <>
        <p>ZenzLearn may share your information in specific situations to support service delivery, comply with legal obligations, or operate our business effectively.</p>
        <p>If your access to ZenzLearn has been arranged through your employer or an authorized training partner, certain account and usage details may be shared with them as part of that relationship.</p>
        <p>We may also share your information with trusted affiliates, service providers, and partners who assist us in operating the platform. These parties are bound by contractual obligations to handle your data securely and only for agreed purposes. In some cases, we may share limited personal information—such as your name or email address—with educational institutions or partners for academic or certification purposes.</p>
        <p>ZenzLearn does not share mobile contact information with third parties for marketing or promotional activities. Additionally, messaging consent data (such as opt-in records) is treated as strictly confidential and is not disclosed to any external parties.</p>
        <p>We may disclose personal information if required to do so by law or in response to valid legal requests from authorities. In the event of a business transaction—such as a merger, acquisition, or sale of assets—user information may be transferred as part of that process.</p>
      </>
    )
  },
  {
    id: "third-parties",
    title: "Information Received from Third Parties",
    icon: <HelpCircle size={18} />,
    content: (
      <>
        <p>In addition to the information you provide directly, ZenzLearn may obtain certain data about you from external sources. This helps us enhance our services, improve personalization, and maintain accurate records.</p>
        <p>The sources from which we may receive such information include:</p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>Data partners and analytics providers who supply demographic or aggregated insights.</li>
          <li>Social media platforms, when you grant permission to access or share your profile information through those services.</li>
          <li>Organizations or enterprise clients where your access to ZenzLearn is provided through your employer or institution.</li>
          <li>Referral programs, where existing or past learners may share limited information as part of recommending our services.</li>
          <li>Publicly available sources, such as open databases or information in the public domain.</li>
        </ul>
      </>
    )
  },
  {
    id: "your-rights",
    title: "Your Rights & Access Control",
    icon: <UserX size={18} />,
    content: (
      <>
        <p>ZenzLearn recognizes your rights over your personal information and provides you with the ability to access, update, or request deletion of your data, subject to applicable legal requirements.</p>
        <p>You have the right to request access to the personal information we hold about you and to ensure that such information is accurate and up to date. You also have the right to correct or update any inaccurate or incomplete personal information. In most cases, you can do this directly through your account settings.</p>
        <p>You may request the deletion of your personal information. We will honor such requests unless retention is required for legal, regulatory, dispute resolution, or enforcement purposes. Additionally, due to system and backup processes, some residual data may remain temporarily stored even after deletion requests are processed.</p>
        <p>Where your personal data is processed based on your consent, you have the right to withdraw that consent at any time by submitting a formal request to ZenzLearn.</p>
        <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
          <strong>Note for Managed Accounts:</strong> If your account is managed through an organization, employer, or authorized training partner, your data management requests may need to be directed to them, as outlined in the “Notice to End Users” section.
        </div>
      </>
    )
  },
  {
    id: "regional-notices",
    title: "Regional Protections & Compliance",
    icon: <ShieldAlert size={18} />,
    content: (
      <>
        <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2">EEA, UK, and Switzerland Users</h3>
        <p>These rights include the ability to request access to your personal data in a structured and portable format, as well as the right to request correction, deletion, restriction, or objection to the processing of your data. If you believe that your concerns regarding the handling of your personal information have not been adequately addressed, you also have the right to file a complaint with the appropriate data protection authority in your jurisdiction.</p>
        
        <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Notice for Users in India</h3>
        <p>If you believe that your personal data has been handled in a manner that does not comply with applicable data protection laws in India, you have the right to raise a complaint with us. You may contact our designated grievance officer using the contact details provided in this Privacy Policy.</p>
        <p>In accordance with applicable Indian laws, including the Digital Personal Data Protection Act, 2023 (DPDP Act), ZenzLearn will make reasonable efforts to address and resolve your complaint within the prescribed timelines.</p>

        <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Users Accessing Services from Outside India</h3>
        <p>ZenzLearn is headquartered in India. If you are accessing our platform from outside India, please note that your data may be transferred across international borders and processed in accordance with this Privacy Policy and applicable laws.</p>
      </>
    )
  },
  {
    id: "cookies",
    title: "Cookies & Tracking Technologies",
    icon: <ToggleLeft size={18} />,
    content: (
      <>
        <p>ZenzLearn uses cookies and similar technologies to enhance your experience, improve platform performance, and better understand how users interact with our services. These technologies may include cookies, web beacons, pixels, and device identifiers.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl">
            <h5 className="font-bold text-slate-900 text-sm mb-1">Essential Cookies</h5>
            <p className="text-xs text-slate-500 leading-relaxed">Necessary for the core functionality of our platform, such as secure login and session management.</p>
          </div>
          <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl">
            <h5 className="font-bold text-slate-900 text-sm mb-1">Analytics Cookies</h5>
            <p className="text-xs text-slate-500 leading-relaxed">Help us understand how users engage with our website, enabling content optimization.</p>
          </div>
          <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl">
            <h5 className="font-bold text-slate-900 text-sm mb-1">Marketing Cookies</h5>
            <p className="text-xs text-slate-500 leading-relaxed">Used to deliver promotional content and advertisements more relevant to your interests.</p>
          </div>
        </div>
        <p>You have the option to control or disable cookies through your browser settings. Please note that disabling certain cookies may impact the functionality of the website.</p>
        <p className="mt-4"><strong>Do Not Track (DNT) Signals:</strong> At present, there is no universally accepted standard for how websites should interpret or respond to DNT signals. As a result, ZenzLearn does not currently take specific action in response to such signals.</p>
      </>
    )
  },
  {
    id: "integrations",
    title: "Integrations & Public Spaces",
    icon: <MessageSquare size={18} />,
    content: (
      <>
        <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2">Public Forums and Community Areas</h3>
        <p>ZenzLearn may offer features such as discussion boards, blogs, or community spaces where users can share content. Please be aware that any information you choose to post in these public areas becomes visible to other users and may be collected, used, or shared by them. Content posted in public areas may also be indexed by search engines.</p>
        
        <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Single Sign-On and Social Media Features</h3>
        <p>Our website may include features such as social sharing buttons or interactive widgets. Your interaction with such tools is governed by the privacy policies of the respective third-party platforms. ZenzLearn may also allow you to sign in using third-party authentication services (such as LinkedIn). These services verify your identity and may share limited information with us based on your permissions.</p>

        <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Third-Party Website Links</h3>
        <p>ZenzLearn’s platform may include links to external websites or services that are not operated or managed by us. We are not responsible for how these external platforms handle your personal information and recommend reviewing their independent policies.</p>
      </>
    )
  },
  {
    id: "security",
    title: "Information Security Measures",
    icon: <Lock size={18} />,
    content: (
      <>
        <p>ZenzLearn implements appropriate technical and organizational measures to protect your personal information from unauthorized access, misuse, loss, or alteration.</p>
        <p>We use industry-standard security practices, including encryption technologies such as Secure Socket Layer (SSL), to safeguard sensitive data (for example, login credentials and payment details) during transmission.</p>
        <p>Our security practices include:</p>
        <ul className="list-disc pl-5 space-y-1 my-4">
          <li>Secure systems and controlled access to personal data, limited only to authorized personnel.</li>
          <li>Regular monitoring, vulnerability assessments, and security scans to identify potential risks.</li>
          <li>Use of malware detection and prevention tools.</li>
        </ul>
        <p>All payment transactions are handled through trusted and secure third-party payment gateways. ZenzLearn does not store or process your sensitive payment details, such as credit card information, on its own servers.</p>
      </>
    )
  },
  {
    id: "supplementary",
    title: "Supplementary Terms",
    icon: <Heart size={18} />,
    content: (
      <>
        <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2">Testimonials and Reviews</h3>
        <p>ZenzLearn may display testimonials, feedback, or reviews from users on its platform, which may include personal details such as the user’s name. We only publish such testimonials after obtaining the individual’s consent.</p>

        <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Children’s Privacy</h3>
        <p>ZenzLearn’s services are intended for individuals who are 18 years of age or older. We do not knowingly permit minors to create accounts or submit personal information on our platform. If we become aware that personal information has been collected from a minor without appropriate authorization, we will take prompt steps to remove such data and deactivate the associated account.</p>
      </>
    )
  },
  {
    id: "changes-policy",
    title: "Changes to This Privacy Policy",
    icon: <RefreshCw size={18} />,
    content: (
      <>
        <p>ZenzLearn reserves the right to update or modify this Privacy Policy at any time, at its sole discretion.</p>
        <p>When changes are made, we may notify users through appropriate channels, such as updates on our website or via email, and the revised version will include an updated effective date.</p>
        <p>We encourage you to review this Policy periodically to stay informed about how your personal information is being handled and protected. By continuing to use our website or services after any updates are published, you acknowledge and accept the revised terms of this Privacy Policy.</p>
      </>
    )
  }
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans selection:bg-blue-100 scroll-smooth">
      
      {/* 🔹 HERO HEADER */}
      <section className="bg-slate-950 text-white pt-24 pb-20 px-6 sm:px-8 border-b border-slate-800 relative overflow-hidden">
        {/* Abstract Background Layout Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-6">
            <span className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-md text-[10px] font-bold uppercase tracking-widest text-slate-300">
              Regulatory Document
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-400 font-medium leading-relaxed">
              Effective Date: May 2026. <br className="sm:hidden"/> 
              This statement outlines how user intelligence data is processed, managed, and guarded globally.
            </p>
          </div>
        </div>
      </section>

      {/* 🔹 MAIN LAYOUT GRID */}
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

          {/* 🔹 CONTENT HUB */}
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

              {/* End of Document Footer Notice */}
              <div className="mt-16 pt-8 border-t border-slate-200 text-center">
                <p className="text-sm font-semibold text-slate-500">
                  End of Privacy Policy statement. <br/> For privacy inquiries or rights enforcement updates, please target <a href="mailto:privacy@zenzlearn.com" className="text-blue-600 hover:underline">privacy@zenzlearn.com</a>.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}