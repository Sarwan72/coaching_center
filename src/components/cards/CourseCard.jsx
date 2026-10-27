import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Star, Clock, Video, Users, CheckCircle, ArrowRight } from 'lucide-react';

export default function CourseCard({ course }) {
  const { enrolledCourses, enrollCourse } = useApp();
  const isEnrolled = enrolledCourses.includes(course.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Thumbnail with Overlays */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Badge */}
        {course.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-md">
            {course.badge}
          </span>
        )}

        {/* Category Pill */}
        <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-black/60 text-slate-200 backdrop-blur-md">
          {course.category}
        </span>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500 text-white text-xs font-bold shadow">
          <Star className="w-3 h-3 fill-current" />
          <span>{course.rating}</span>
          <span className="text-[10px] opacity-80">({course.reviewsCount})</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title */}
        <Link to={`/courses/${course.id}`}>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
            {course.title}
          </h3>
        </Link>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span className="truncate">Mentor: <strong className="text-slate-800">{course.instructor}</strong></span>
          <span className="shrink-0 text-slate-400">{course.level}</span>
        </div>

        {/* Meta Stats */}
        <div className="grid grid-cols-3 gap-2 py-3 text-[11px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-rose-500" />
            <span>{course.totalLectures} Lessons</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-emerald-500" />
            <span>{course.enrolledStudents.toLocaleString()}+</span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-slate-900">
                ₹{course.price.toLocaleString()}
              </span>
              {course.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{course.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {course.discountPercent && (
              <span className="text-[10px] font-bold text-emerald-600 uppercase">
                {course.discountPercent}% OFF Special
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/courses/${course.id}`}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
            >
              Details
            </Link>
            <button
              onClick={() => enrollCourse(course.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                isEnrolled
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
              }`}
            >
              {isEnrolled ? (
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Enrolled</span>
              ) : (
                'Enroll Now'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
