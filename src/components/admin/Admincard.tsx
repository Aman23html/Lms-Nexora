'use client'

import { useRouter } from "next/navigation"

export default function Admincard({title, desc, link}:{title:string, desc:string, link:string}) {

  const router = useRouter()

  return (
    <div
      onClick={() => router.push(link)}
      className="cursor-pointer p-6 rounded-2xl bg-white border hover:shadow-xl transition"
    >
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-slate-500 mt-2">{desc}</p>
    </div>
  )
}