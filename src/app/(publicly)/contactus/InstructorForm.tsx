'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Firebase Imports
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function InstructorForm() {
const recaptchaContainerRef = useRef<HTMLDivElement>(null);

  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [verified, setVerified] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================== SEND OTP FUNCTION ==================
// ================== SEND OTP FUNCTION ==================
async function sendOTP() {
  const phoneInput = document.getElementById("phone") as HTMLInputElement;
  const phone = phoneInput?.value.trim();

  if (!phone || !phone.startsWith("+")) {
    alert("Please enter a valid phone number with country code.\nExample: +919876543210");
    return;
  }

  try {
    // Clear previous reCAPTCHA
    if (recaptchaContainerRef.current) {
      recaptchaContainerRef.current.innerHTML = "";
    }

    const verifier = new RecaptchaVerifier(auth, recaptchaContainerRef.current!, {
      size: "invisible",
    });

    const result = await signInWithPhoneNumber(auth, phone, verifier);
    
    setConfirmationResult(result);
    setShowOtp(true);
    alert("✅ OTP Sent Successfully! Please check your phone.");

  } catch (err: any) {
    console.error("Send OTP Error:", err);
    alert(err.message || "Failed to send OTP. Please try again.");
  }
}

// ================== VERIFY OTP FUNCTION ==================
async function verifyOTP() {
  if (!confirmationResult) {
    alert("Please send OTP first");
    return;
  }

  try {
    await confirmationResult.confirm(otp);
    setVerified(true);
    alert("✅ Phone Verified Successfully");
  } catch (err: any) {
    console.error(err);
    alert("Invalid OTP. Please try again.");
  }
}

  // ================== FORM SUBMIT ==================
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!verified) {
      alert("Please verify your phone number before submitting.");
      return;
    }

    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const url = "https://script.google.com/macros/s/AKfycbzRexSqcFo6093iso8fEdpQTy7uveHkqnBllDgnojIoTQsPvmTwKnpvVfbJPHJAKccv/exec";

    try {
      await fetch(url, {
        method: "POST",
        body: new URLSearchParams({
          FullName: data.get("fullname") as string,
          Email: data.get("email") as string,
          Phone: data.get("phone") as string,
          Program: data.get("domain") as string,
          Message: data.get("bio") as string,
        }),
      });

      setIsSubmitted(true);
      form.reset();
      
      // Reset verification after successful submit
      setVerified(false);
      setShowOtp(false);
      setOtp("");
      setConfirmationResult(null);

    } catch (error) {
      console.error(error);
      alert("Error submitting faculty dossier application.");
    } finally {
      setLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="py-20 text-center space-y-6"
      >
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Dossier Logged</h2>
        <p className="text-slate-500 font-medium max-w-xs mx-auto">
          Your faculty application has reached our academic steering registry board. Expect a connection protocol status call within 24 hours.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)} className="rounded-xl border-slate-200 font-bold uppercase tracking-widest text-[10px]">
          Submit another application
        </Button>
      </motion.div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="label-elite">Full Name</label>
            <input name="fullname" required type="text" className="form-input-elite" placeholder="Dr. Alex Mercer" />
          </div>
          <div className="space-y-2">
            <label className="label-elite">Work Email</label>
            <input name="email" required type="email" className="form-input-elite" placeholder="alex@company.com" />
          </div>
        </div>

       {/* ================== PHONE NUMBER SECTION ================== */}
<div className="space-y-2">
  <label className="label-elite">Phone Number</label>
  
  <div className="flex gap-2">
    <input
      id="phone"
      name="phone"
      required
      type="tel"
      className="form-input-elite"
      placeholder="+91 9876543210"
    />
    <Button
      type="button"
      onClick={sendOTP}
      disabled={showOtp || verified}
      className="whitespace-nowrap"
    >
      Send OTP
    </Button>
  </div>

  {showOtp && !verified && (
    <div className="flex gap-2 mt-3">
      <input
        type="text"
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="form-input-elite"
        maxLength={6}
      />
      <Button
        type="button"
        onClick={verifyOTP}
      >
        Verify OTP
      </Button>
    </div>
  )}

  {verified && (
    <p className="text-green-600 text-sm font-bold flex items-center gap-1">
      ✅ Phone Verified Successfully
    </p>
  )}

  {/* reCAPTCHA Container using ref */}
  <div ref={recaptchaContainerRef} id="recaptcha-container"></div>
</div>

        <div className="space-y-2">
          <label className="label-elite">Brief Profile Bio & Background</label>
          <textarea name="bio" required className="form-input-elite min-h-[150px] pt-4 resize-none" placeholder="Tell us about your core technical background and lecture records..." />
        </div>

        <Button 
          disabled={loading || !verified}
          type="submit" 
          className="w-full h-16 bg-blue-600 hover:bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] shadow-xl transition-all flex items-center justify-center gap-3"
        >
          {loading ? "Processing..." : <>Submit Faculty Application <ArrowRight size={16} /></>}
        </Button>

        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          By submitting, you agree to comply with ZenzLearn's standard quality guidelines.
        </p>
      </form>

      {/* Styles */}
      <style jsx>{`
        .form-input-elite {
          width: 100%;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1rem 1.25rem;
          outline: none;
          transition: all 0.2s;
          font-weight: 600;
          font-size: 14px;
          color: #0f172a;
        }
        .form-input-elite:focus {
          border-color: #3b82f6;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.08);
        }
        .label-elite {
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #94a3b8;
          display: block;
          margin-left: 0.25rem;
          margin-bottom: 0.6rem;
        }
      `}</style>
    </>
  )
}