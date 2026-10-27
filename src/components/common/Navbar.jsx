import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Search, 
  Menu, 
  X, 
  User, 
  ShieldCheck, 
  ChevronDown, 
  Sparkles, 
  Keyboard, 
  Briefcase,
  BookOpen,
  Video,
  FileText
} from 'lucide-react';

export default function Navbar() {
  const { setIsSearchOpen, openEnquiryModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Lectures', path: '/lectures' },
    { name: 'Study Material', path: '/study-material' },
    { name: 'Typing Practice', path: '/typing-practice', badge: 'Interactive' },
    { name: 'Careers', path: '/careers', badge: '10 Vacancies' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-200">
      {/* Top Banner Notice for Govt Exams */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] uppercase border border-emerald-400/30">
          Admissions 2026-27 Open
        </span>
        <span>Target Batches for SSC CGL, Banking PO, UP Police & Railways!</span>
        <button
          onClick={() => openEnquiryModal()}
          className="underline hover:text-emerald-200 font-semibold cursor-pointer ml-1"
        >
          Book 2-Day Trial Session →
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-teal-600 p-2.5 text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  BrightPath
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100">
                  Academy
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider font-semibold uppercase">
                Premier Govt & Skill Prep
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`
                }
              >
                {link.name}
                {link.badge && (
                  <span className="ml-1.5 text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-emerald-100 text-emerald-700">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons & Portals */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200/80 flex items-center gap-2 text-xs font-medium transition-colors"
              title="Search across all academy courses, videos, notes (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-indigo-600" />
              <span className="hidden md:inline-block text-slate-400">Search...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 rounded border border-slate-200">
                ⌘K
              </kbd>
            </button>

            {/* Quick Demo Portals Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLoginMenuOpen(!loginMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all"
              >
                <User className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Portals</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {loginMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in"
                  onMouseLeave={() => setLoginMenuOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Choose Demo Role
                  </div>
                  <Link
                    to="/student/dashboard"
                    onClick={() => setLoginMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold">Student Dashboard</div>
                      <div className="text-[10px] text-slate-400 font-normal">Rahul Sharma (Enrolled)</div>
                    </div>
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setLoginMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold">Admin / Owner Portal</div>
                      <div className="text-[10px] text-slate-400 font-normal">Manage Courses, Jobs, Enquiries</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Book Free Demo Button */}
            <button
              onClick={() => openEnquiryModal()}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Book Demo Class</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 pt-3 pb-6 animate-fade-in space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <Link
              to="/student/dashboard"
              onClick={handleNavClick}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold"
            >
              <GraduationCap className="w-4 h-4" /> Student Portal
            </Link>
            <Link
              to="/admin"
              onClick={handleNavClick}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold"
            >
              <ShieldCheck className="w-4 h-4" /> Admin Portal
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                    isActive ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-white/20 text-current">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openEnquiryModal();
            }}
            className="w-full mt-2 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 flex items-center justify-center gap-2 shadow"
          >
            <Sparkles className="w-4 h-4 text-amber-300" /> Book Free Demo Class
          </button>
        </div>
      )}
    </header>
  );
}
