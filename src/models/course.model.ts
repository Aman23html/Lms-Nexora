import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
  // --- CORE CARD DATA ---
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, index: true },
  subCategory: { type: String, default: "All", index: true },
  instructor: { type: String, required: true },
  price: { type: String, required: true },
  duration: { type: String, required: true },
  enrolled: { type: String, default: "0" },
  image: { type: String, required: true },
  recommended: { type: Boolean, default: false },
  level: { 
    type: String, 
    enum: ["Beginner", "Intermediate", "Advanced", "Professional", "Expert"], 
    default: "Intermediate" 
  },

  // --- LOGIC TOGGLE ---
  isAvailableSoon: { type: Boolean, default: false },

  // --- DEEP DETAILS ---
  details: {
    // 1. Course Description (The long-form narrative)
    description: { type: String }, 
    
    // 2. Course Overview (The summary/hook)
    overview: { type: String }, 

    // 3. What You Will Gain (Simplilearn style outcomes)
    learningOutcomes: [{ type: String }], 

    // 4. Highlights (Bullet points for top of page)
    highlights: [{ type: String }], 
    
    // 5. Key Features (Guarantee, hours of learning, etc.)
    keyFeatures: [{ type: String }], 
    
    // 6. Core Skills Covered
    skillsCovered: [{ type: String }], 
    
    // 7. Benefits & Career Prospects
    benefits: {
      description: { type: String }, // General career benefits text
      marketGrowth: { type: String }, // Stats on industry surge
      careerProspects: { type: String } // Details on growth after completion
    },

    // 8. Requirements
    eligibility: { type: String },
    preRequisites: { type: String },
    
    // 9. Certification
    certification: {
      awardedBy: { type: String, default: "zenZcareer" },
      features: [{ type: String }] 
    },

    // 10. Program Differentiation
    whyJoin: [
      {
        title: { type: String },
        content: { type: String }
      }
    ],

    // 11. FAQ
    faqs: [
      {
        question: { type: String },
        answer: { type: String }
      }
    ],

    // 12. Industry Mapping
    industriesCovered: [{ type: String }], 
    jobRoles: [{ type: String }] 
  },

  // --- CURRICULUM ---
  lessons: [
    {
      title: { type: String, required: true },
      video: { type: String, required: true },
      duration: { type: String },
      isFreePreview: { type: Boolean, default: false }
    }
  ]

}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

courseSchema.index({ title: 'text', category: 'text', subCategory: 'text' });

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema)

export default Course