import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Institute Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-500 p-2 text-white shadow-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">BrightPath</span>
                <span className="ml-1 text-xs font-bold text-indigo-400 uppercase tracking-widest">Academy</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering government job aspirants and students across India with structured classroom coaching, recorded video lectures, handwritten PDF notes, and simulated computer typing tests.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-2 rounded-xl w-fit">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>ISO 9001:2015 Certified Coaching Institute</span>
            </div>
          </div>

          {/* Col 2: Flagship Courses */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Popular Courses</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/courses/course-1" className="hover:text-indigo-400 transition-colors">SSC CGL Foundation</Link></li>
              <li><Link to="/courses/course-2" className="hover:text-indigo-400 transition-colors">Banking PO & Clerk</Link></li>
              <li><Link to="/courses/course-3" className="hover:text-indigo-400 transition-colors">UPSC GS Pre-Cum-Mains</Link></li>
              <li><Link to="/courses/course-4" className="hover:text-indigo-400 transition-colors">UP Police Constable & SI</Link></li>
              <li><Link to="/courses/course-5" className="hover:text-indigo-400 transition-colors">RRB Railways Express</Link></li>
              <li><Link to="/courses/course-7" className="hover:text-indigo-400 transition-colors">Computer CCC Certification</Link></li>
            </ul>
          </div>

          {/* Col 3: Student Hub & Practice */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Learning Hub</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/lectures" className="hover:text-indigo-400 transition-colors">Recorded Lectures</Link></li>
              <li><Link to="/study-material" className="hover:text-indigo-400 transition-colors">PDF Notes & Mock Tests</Link></li>
              <li><Link to="/typing-practice" className="hover:text-indigo-400 transition-colors">Typing Speed Practice (EN/HI)</Link></li>
              <li><Link to="/careers" className="hover:text-indigo-400 transition-colors">Faculty & Staff Vacancies</Link></li>
              <li><Link to="/student/dashboard" className="hover:text-indigo-400 transition-colors">Student Dashboard</Link></li>
              <li><Link to="/admin" className="hover:text-indigo-400 transition-colors">Admin Management</Link></li>
            </ul>
          </div>

          {/* Col 4: Campus Locations & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact & Branches</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Plot 24, Knowledge Park III, Sector 62, Noida, UP - 201309</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 98112 00334 / +91 (0120) 456-7890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>admissions@brightpathacademy.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon - Sat: 7:30 AM - 8:30 PM (Sun Open for Tests)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Prototype Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BrightPath Academy. All rights reserved. Built for Coaching Excellence.</p>
          <div className="flex items-center gap-2 text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            <span>Client Evaluation Prototype • Fully Interactive Demo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
