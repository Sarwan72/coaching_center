import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { BookOpen, Video, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function StudentCourses() {
  const { courses, enrolledCourses, playVideo, lectures } = useApp();
  const myCourses = courses.filter((c) => enrolledCourses.includes(c.id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">My Enrolled Courses</h2>
          <p className="text-xs text-slate-500">Access your active batch syllabus, video lectures, and weekly mock tests.</p>
        </div>
        <Link
          to="/courses"
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shrink-0 shadow-sm"
        >
          Explore More Courses
        </Link>
      </div>

      {myCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myCourses.map((course) => {
            const courseLectures = lectures.filter(l => l.courseId === course.id);
            return (
              <div
                key={course.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-black/70 text-white backdrop-blur-md">
                      {course.category}
                    </span>
                    <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-600 text-white shadow">
                      Active Batch
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-base font-bold text-slate-900 leading-snug">{course.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{course.description}</p>
                    
                    <div className="pt-2 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100">
                      <span>Faculty: <strong className="text-slate-800">{course.instructor}</strong></span>
                      <span>{course.duration}</span>
                    </div>

                    {/* Progress */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-600">Course Progress</span>
                        <span className="text-indigo-600">65% Completed</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full w-[65%]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <Link
                      to={`/courses/${course.id}`}
                      className="text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors"
                    >
                      View Syllabus & FAQs
                    </Link>
                    <Link
                      to="/student/my-lectures"
                      className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                    >
                      Go to Lectures <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No courses enrolled yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Browse our catalogue to enroll in target batches with full video access and test series.
          </p>
          <Link
            to="/courses"
            className="inline-block px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
          >
            Explore Courses
          </Link>
        </div>
      )}
    </div>
  );
}
