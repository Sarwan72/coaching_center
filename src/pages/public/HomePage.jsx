import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import CourseCard from '../../components/cards/CourseCard';
import LectureCard from '../../components/cards/LectureCard';
import MaterialCard from '../../components/cards/MaterialCard';
import VacancyCard from '../../components/cards/VacancyCard';
import FacultyCard from '../../components/cards/FacultyCard';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Video, 
  FileText, 
  Keyboard, 
  Briefcase, 
  CheckCircle, 
  Star, 
  Users, 
  Award, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Phone, 
  Mail,
  GraduationCap
} from 'lucide-react';

export default function HomePage() {
  const { courses, lectures, materials, vacancies, faculty, openEnquiryModal, announcements } = useApp();
  const [openFaq, setOpenFaq] = useState(0);

  // Filtered showcases
  const featuredCourses = courses.slice(0, 4);
  const featuredLectures = lectures.slice(0, 3);
  const popularMaterials = materials.slice(0, 4);
  const activeVacancies = vacancies.filter(v => v.status !== 'Closed').slice(0, 3);
  const spotlightFaculty = faculty.slice(0, 3);

  const stats = [
    { label: "Enrolled Students", value: "5,200+", subtext: "Across North India", icon: Users, color: "text-indigo-600" },
    { label: "Target Courses", value: "25+", subtext: "SSC, Banking, UPSC & Police", icon: BookOpen, color: "text-teal-600" },
    { label: "HD Video Lectures", value: "180+", subtext: "With Chapter Notes", icon: Video, color: "text-rose-600" },
    { label: "Student Success Rate", value: "95.4%", subtext: "Tier 1 & Prelims Qualified", icon: Award, color: "text-amber-500" },
  ];

  const faqs = [
    {
      q: "What competitive exams does BrightPath Academy prepare students for?",
      a: "BrightPath Academy offers targeted preparation for SSC (CGL, CHSL, MTS, CPO), Banking (SBI PO/Clerk, IBPS PO/Clerk, RRB), Civil Services (UPSC CSE Foundation, State PCS), State Police (UP Police Constable & Sub-Inspector), Railways (RRB NTPC & Group D), CTET/UPTET, and CCC Computer Certification."
    },
    {
      q: "Can I attend a free demo class before paying the course fees?",
      a: "Yes, absolutely! We provide 2 days of free demo classes in both offline classroom mode and online live interactive batches. Click on 'Book Demo Class' anywhere on our website to reserve your seat."
    },
    {
      q: "Does BrightPath Academy provide bilingual study materials?",
      a: "Yes. All our study materials, formula cheat-sheets, mock test series, and video lecture notes are available in both Hindi and English mediums with detailed step-by-step solutions."
    },
    {
      q: "Is there a dedicated typing lab facility for government exam aspirants?",
      a: "Yes. We operate fully air-conditioned computer labs with 60+ workstations in Noida and Lucknow, offering interactive typing tests for English and Hindi (Mangal/Kruti Dev) for High Court Clerk, SSC, and Railway skill tests."
    },
    {
      q: "How can educators and non-teaching professionals apply for job openings?",
      a: "Explore our dedicated Careers section to see active vacancies for faculties, counselors, and staff. You can submit your application, experience details, and resume directly through our online portal."
    }
  ];

  const testimonials = [
    {
      name: "Saurabh Mishra",
      exam: "Cleared SSC CGL 2024 (AIR 214)",
      post: "Appointed Inspector (Central Excise)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      review: "Vikramaditya Sir's zero-formula math tricks transformed my score from 32 to 48 in Quant Tier 1! The mock test series and library environment at Noida center played a decisive role in my selection."
    },
    {
      name: "Shreya Saxena",
      exam: "Cleared SBI PO 2024",
      post: "Probationary Officer, SBI",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      review: "Pooja Ma'am's puzzle reduction technique is a game changer. The 3-variable floor-flat puzzles that used to take me 8 minutes can now be cracked in under 3.5 minutes. Highly recommended!"
    },
    {
      name: "Dharmendra Yadav",
      exam: "Cleared UP Police Sub-Inspector",
      post: "Sub-Inspector, UP Police",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
      review: "Rakesh Yadav Sir's General Hindi and Mool Vidhi notes were 100% on target. Nearly 80% of questions in the actual exam matched our classroom practice worksheets."
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 hero-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Premier Coaching for SSC, Banking, Railways & State Exams</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Learn Better. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-teal-500">
                  Practice Smarter.
                </span> <br />
                Achieve More.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Join <strong className="text-slate-800">BrightPath Academy</strong>—India's trusted coaching institute providing structured classroom courses, recorded HD lectures, handwritten PDF revision notes, and simulated computer typing tests to ensure your top ranking.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link
                  to="/courses"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <BookOpen className="w-4 h-4" /> Explore Courses
                </Link>
                <Link
                  to="/study-material"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold text-slate-700 hover:text-indigo-600 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" /> Free Study Materials
                </Link>
                <button
                  onClick={() => openEnquiryModal()}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                >
                  Book 2-Day Trial
                </button>
              </div>

              {/* Social Proof Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>100% TCS Exam Pattern</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Offline + Online Hybrid</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Noida • Delhi • Lucknow</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Hero Card */}
                <div className="rounded-3xl bg-white p-3 shadow-2xl border border-slate-200/80 overflow-hidden">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900">
                    <img
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80"
                      alt="BrightPath Academy Students"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-600">
                        Classroom Batch 2026
                      </span>
                      <h4 className="text-base font-bold mt-1">Super 50 SSC & Banking Batch</h4>
                      <p className="text-xs text-slate-300">Mentored by Ex-Officers & Subject Specialists</p>
                    </div>
                  </div>

                  {/* Highlights Bar */}
                  <div className="p-4 grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Live Practice</span>
                      <h5 className="text-sm font-bold text-slate-800 mt-0.5">Typing Lab Drills</h5>
                      <p className="text-[11px] text-slate-500">English & Hindi Unicode</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Weekly Mock</span>
                      <h5 className="text-sm font-bold text-slate-800 mt-0.5">All-India Ranking</h5>
                      <p className="text-[11px] text-slate-500">Detailed AI Analytics</p>
                    </div>
                  </div>
                </div>

                {/* Floating Badge Top Right */}
                <div className="absolute -top-4 -right-4 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-subtle">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">4.92 / 5.0 Rating</div>
                    <div className="text-[10px] text-slate-400">From 3,800+ Aspirants</div>
                  </div>
                </div>

                {/* Floating Badge Bottom Left */}
                <div className="absolute -bottom-5 -left-5 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 hidden sm:flex">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">100% Verified Notes</div>
                    <div className="text-[10px] text-slate-400">TCS Pattern Solved Papers</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow text-center sm:text-left flex flex-col sm:flex-row items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 ${s.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {s.value}
                  </h3>
                  <p className="text-xs font-bold text-slate-700">{s.label}</p>
                  <p className="text-[11px] text-slate-400">{s.subtext}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. POPULAR COURSES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <BookOpen className="w-4 h-4" /> Comprehensive Preparation
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Popular Targeted Batches
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select from classroom, hybrid, or online courses with full syllabus coverage.
            </p>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors shrink-0"
          >
            <span>View All Courses (8)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* 4. FEATURED RECORDED LECTURES */}
      <section className="bg-slate-900 text-white py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">
                <Video className="w-4 h-4" /> HD Video Library
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Featured Recorded Lectures
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Learn high-yield concepts and shortcut tricks with interactive timestamps and notes.
              </p>
            </div>
            <Link
              to="/lectures"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors shrink-0"
            >
              <span>Explore Lecture Library ({lectures.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredLectures.map(lec => (
              <LectureCard key={lec.id} lecture={lec} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. PDF NOTES AND STUDY MATERIAL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <FileText className="w-4 h-4" /> Handwritten & Printed Resources
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Latest Study Materials & Notes
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Download formula sheets, previous year question papers, and question banks.
            </p>
          </div>
          <Link
            to="/study-material"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors shrink-0"
          >
            <span>Browse All Study Material ({materials.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularMaterials.map(mat => (
            <MaterialCard key={mat.id} material={mat} />
          ))}
        </div>
      </section>

      {/* 6. TYPING PRACTICE PREVIEW BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-teal-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
            <Keyboard className="w-96 h-96" />
          </div>

          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-400 text-teal-950 inline-block">
              Skill Test Module
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Interactive Typing Speed Practice
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Crack Allahabad High Court, SSC, and Railway typing tests with our live WPM and accuracy tracker. Practice both English passages and Hindi Unicode passages with realistic countdown timers (1, 3, 5, 10 minutes).
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/typing-practice"
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 shadow transition-all flex items-center gap-2 hover:scale-[1.02]"
              >
                <Keyboard className="w-4 h-4 text-indigo-600" /> Start Free Typing Practice Now
              </Link>
              <span className="text-xs text-slate-300">
                • English & Hindi • Live WPM & Accuracy Metrics
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CAREERS / VACANCIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
              <Briefcase className="w-4 h-4" /> Work With Us
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Join Our Faculty & Operations Team
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              BrightPath Academy is actively recruiting educators, counselors, and media editors across North India.
            </p>
          </div>
          <Link
            to="/careers"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors shrink-0"
          >
            <span>View All Vacancies ({vacancies.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeVacancies.map(vac => (
            <VacancyCard key={vac.id} vacancy={vac} />
          ))}
        </div>
      </section>

      {/* 8. FACULTY PROFILES SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <GraduationCap className="w-4 h-4" /> Expert Mentorship
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Meet Our Star Educators
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Learn from ex-civil servants, bank officers, and renowned authors with decades of proven experience.
            </p>
          </div>
          <Link
            to="/faculty"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors shrink-0"
          >
            <span>View All Faculty Members ({faculty.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {spotlightFaculty.map(fac => (
            <FacultyCard key={fac.id} faculty={fac} />
          ))}
        </div>
      </section>

      {/* 9. STUDENT TESTIMONIALS */}
      <section className="bg-slate-100 py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Proven Results
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
              Voices of Our Successful Aspirants
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Thousands of students have turned their government service dreams into reality with BrightPath.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    "{t.review}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                    <p className="text-xs font-bold text-emerald-600">{t.exam}</p>
                    <p className="text-[11px] text-slate-400">{t.post}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Got Questions?
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Everything you need to know about our admissions, demo classes, and facilities.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-800 hover:text-indigo-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. CONTACT & ENQUIRY CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Get In Touch
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight">
                Ready to Begin Your Success Journey?
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Visit our campus for personalized academic counseling or attend a free 2-day demo class. Our mentors are here to guide you at every stage.
              </p>

              <div className="pt-2 space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Noida Head Campus: Plot 24, Knowledge Park III, Sector 62</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>Counseling Helpline: +91 98112 00334 / +91 98711 55440</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sky-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>Email: admissions@brightpathacademy.in</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700/80 space-y-4">
              <h3 className="text-base font-bold text-white">Request an Immediate Callback</h3>
              <p className="text-xs text-slate-400">
                Fill in your contact information and an academic counselor will call you within 15 minutes.
              </p>
              <button
                onClick={() => openEnquiryModal()}
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" /> Book Free Demo & Counseling Call
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
