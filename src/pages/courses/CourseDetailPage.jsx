import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Star, 
  Clock, 
  Video, 
  Users, 
  CheckCircle, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft,
  Share2,
  BookOpen,
  Award
} from 'lucide-react';
import LectureCard from '../../components/cards/LectureCard';

export default function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, lectures, enrolledCourses, enrollCourse, openEnquiryModal, showToast } = useApp();

  const course = courses.find((c) => c.id === id) || courses[0];
  const isEnrolled = enrolledCourses.includes(course.id);
  const [expandedModule, setExpandedModule] = useState(0);

  const relatedLectures = lectures.filter((l) => l.courseId === course.id || l.courseName?.includes(course.title?.slice(0, 10))).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    showToast("Course link copied to clipboard!", "info");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumb & Back */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <button
          onClick={() => navigate('/courses')}
          className="flex items-center gap-1.5 hover:text-indigo-600 font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Courses
        </button>
        <div className="flex items-center gap-2">
          <span>{course.category}</span>
          <span>/</span>
          <span className="text-slate-800 font-medium truncate max-w-[200px]">{course.title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                {course.category}
              </span>
              {course.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  {course.badge}
                </span>
              )}
              <span className="text-xs text-slate-400 font-medium">Level: {course.level}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {course.description}
            </p>

            {/* Rating and Enrolled Counter */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 pt-2">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <strong className="text-slate-900 text-sm">{course.rating}</strong>
                <span className="text-slate-400">({course.reviewsCount} verified student ratings)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-600" />
                <span><strong className="text-slate-800">{course.enrolledStudents.toLocaleString()}+</strong> Students Enrolled</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Duration: <strong className="text-slate-800">{course.duration}</strong></span>
              </div>
            </div>
          </div>

          {/* Instructor Snapshot */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-lg">
                {course.instructor[0]}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Chief Course Faculty</span>
                <h4 className="text-sm font-bold text-slate-900">{course.instructor}</h4>
                <p className="text-xs text-slate-500">{course.instructorRole}</p>
              </div>
            </div>
            <Link
              to="/faculty"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 shrink-0"
            >
              Faculty Bio →
            </Link>
          </div>

          {/* Course Features & Deliverables Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              What's Included in this Course
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.features ? (
                course.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600" /> Comprehensive Syllabus Coverage
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600" /> Weekly Live Doubt Clearing Sessions
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600" /> Full-Length All-India Mock Tests
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600" /> Printable Handwritten PDF Notes
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Syllabus Modules Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" /> Detailed Course Syllabus
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Structured module-wise breakdown aligned with latest TCS & Exam Board guidelines.
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {course.syllabus ? `${course.syllabus.length} Modules` : '4 Modules'}
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {course.syllabus ? (
                course.syllabus.map((mod, idx) => {
                  const isExpanded = expandedModule === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setExpandedModule(isExpanded ? -1 : idx)}
                        className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs font-bold text-slate-800 transition-colors"
                      >
                        <span>{mod.module}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </button>
                      {isExpanded && (
                        <div className="p-4 bg-white space-y-2 border-t border-slate-200 text-xs text-slate-600">
                          {mod.topics.map((topic, tIdx) => (
                            <div key={tIdx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-slate-400">Syllabus breakdown is available on registration.</p>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Pricing & Enrollment Card */}
        <div className="lg:col-span-4 sticky top-28 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 space-y-5">
            {/* Thumbnail */}
            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-black/60 text-white backdrop-blur-md">
                Batch 2026-27
              </span>
            </div>

            {/* Price Box */}
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Course Fee</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">
                  ₹{course.price.toLocaleString()}
                </span>
                {course.originalPrice && (
                  <span className="text-base text-slate-400 line-through">
                    ₹{course.originalPrice.toLocaleString()}
                  </span>
                )}
                {course.discountPercent && (
                  <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800">
                    {course.discountPercent}% OFF
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500">Includes all 4 tiers, mock tests, and GST</p>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5">
              <button
                onClick={() => enrollCourse(course.id)}
                className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 ${
                  isEnrolled
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-[1.01]'
                }`}
              >
                {isEnrolled ? (
                  <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Already Enrolled • Go to Dashboard</span>
                ) : (
                  'Enroll in Course Now'
                )}
              </button>

              <button
                onClick={() => openEnquiryModal(course.title)}
                className="w-full py-3 rounded-xl font-bold text-xs text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" /> Book Free 2-Day Trial Session
              </button>
            </div>

            {/* Quick Guarantee Badges */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full access for 1 Year with Offline video download</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Certificate of Completion after Final Mock</span>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" /> Share this Course
            </button>
          </div>
        </div>

      </div>

      {/* Related Recorded Lectures */}
      {relatedLectures.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">
              Sample Lectures From This Course
            </h3>
            <Link to="/lectures" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
              View All Lectures →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedLectures.map((lec) => (
              <LectureCard key={lec.id} lecture={lec} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
