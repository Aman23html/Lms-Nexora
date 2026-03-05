'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CategorySidebar from './CategorySidebar'
import FilterRibbon from './FilterRibbon'
import SearchBar from './SearchBar'
import CourseCard, { Course } from './CourseCard'

const DATA: Course[] = [
  { id: 1, title: "Certified ScrumMaster (CSM)®", category: "Agile and Scrum", subCategory: "CAMP", duration: "16 Hrs", enrolled: "10", price: "17,135", instructor: "Scrum Alliance", image: "https://plus.unsplash.com/premium_photo-1661414415246-3e502e2fb241?q=80&w=400", recommended: true },
  { id: 2, title: "Professional Certificate in Data Analytics & Generative AI", category: "Generative AI", subCategory: "ML using python", duration: "11 Months", enrolled: "10", price: "24,500", instructor: "Nexora", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400", recommended: true },
  { id: 3, title: "PMP® Certification Training Course", category: "Project Management", subCategory: "PMP", duration: "35 Hrs", enrolled: "10", price: "15,999", instructor: "PMI", image: "https://images.unsplash.com/photo-1454165833767-027ffea9e78b?q=80&w=400", recommended: false },
  { id: 4, title: "Cybersecurity Architect Masterclass", category: "Cyber Security", subCategory: "CISSP", duration: "8 Months", enrolled: "45k", price: "32,000", instructor: "Nexora Elite", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400", recommended: true },
  { id: 5, title: "Big Data Engineering with MySQL", category: "Data Science", subCategory: "MySQL", duration: "4 Months", enrolled: "0k", price: "12,400", instructor: "Oracle Partner", image: "https://images.unsplash.com/photo-1544380903-58001816f19a?q=80&w=400", recommended: false },
  { id: 6, title: "Advanced Tableau for Business Intelligence", category: "Data Science", subCategory: "Tableau", duration: "3 Months", enrolled: "0k", price: "11,500", instructor: "Tableau Auth", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400", recommended: true },
  { id: 7, title: "Python for AI & Machine Learning", category: "AI & Machine Learning", subCategory: "python", duration: "6 Months", enrolled: "210k", price: "18,900", instructor: "Nexora Labs", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400", recommended: true },
  { id: 8, title: "Cloud Infrastructure Specialist", category: "Cloud Computing", subCategory: "Power BI", duration: "9 Months", enrolled: "0k", price: "28,000", instructor: "AWS Academy", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400", recommended: false },
];

export default function CourseExplorer() {
  const [activeTab, setActiveTab] = useState("All Courses")
  const [activeSub, setActiveSub] = useState("All")

  const filteredCourses = useMemo(() => {
    return DATA.filter(course => {
      const matchTab = activeTab === "All Courses" || course.category === activeTab
      const matchSub = activeSub === "All" || course.subCategory === activeSub
      return matchTab && matchSub
    })
  }, [activeTab, activeSub])

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 }
  }

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-[1440px] mx-auto px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">
              Explore <span className="text-blue-600">Top</span> Programs
            </h2>
            <p className="text-slate-500 font-medium">
              Select a domain or technical path to begin your transformation.
            </p>
          </div>
          <SearchBar />
        </div>

        {/* 'items-start' is vital! It prevents the sidebar from growing to the 
            full height of the grid, which allows the 'sticky' position to work.
        */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Sidebar - Frozen/Sticky Logic is inside the CategorySidebar component */}
          <CategorySidebar
            active={activeTab}
            setTab={(tab) => {
              setActiveTab(tab)
              setActiveSub("All")
            }}
          />

          {/* Course Section */}
          <div className="flex-1 w-full">
            <FilterRibbon activeSub={activeSub} setSub={setActiveSub} />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-6">
              <AnimatePresence mode="popLayout">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <motion.div
                      key={course.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.35 }}
                      layout
                    >
                      <CourseCard course={course} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full py-20 text-center bg-white rounded-[2rem] border border-dashed border-slate-300"
                  >
                    <p className="text-slate-400 font-bold">
                      No courses found matching this combination.
                    </p>
                    <button
                      onClick={() => {
                        setActiveTab("All Courses")
                        setActiveSub("All")
                      }}
                      className="mt-4 text-blue-600 font-black underline"
                    >
                      Reset Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}