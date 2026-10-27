import React, { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  BookOpen, 
  Video, 
  FileText, 
  Briefcase, 
  Users, 
  UserCheck, 
  MessageSquare, 
  FileCheck, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  GraduationCap, 
  Search,
  ExternalLink,
  ChevronRight,
  Plus
} from 'lucide-react';
import VideoPlayerModal from '../components/common/VideoPlayerModal';
import PdfPreviewModal from '../components/common/PdfPreviewModal';
import ToastContainer from '../components/common/ToastContainer';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { enquiries, applications, vacancies, courses, students } = useApp();

  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;
  const newApplicationsCount = applications.filter(a => a.status === 'Under Review').length;

  const adminMenu = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Manage Courses', path: '/admin/courses', icon: BookOpen, count: courses.length },
    { name: 'Recorded Lectures', path: '/admin/lectures', icon: Video },
    { name: 'Study Material (PDF)', path: '/admin/materials', icon: FileText },
    { name: 'Job Vacancies', path: '/admin/vacancies', icon: Briefcase, count: vacancies.length },
    { name: 'Student Roster', path: '/admin/students', icon: Users, count: students.length },
    { name: 'Faculty Profiles', path: '/admin/faculty', icon: UserCheck },
    { name: 'Lead Enquiries', path: '/admin/enquiries', icon: MessageSquare, badge: newEnquiriesCount > 0 ? `${newEnquiriesCount} New` : null },
    { name: 'Job Applications', path: '/admin/applications', icon: FileCheck, badge: newApplicationsCount > 0 ? `${newApplicationsCount} New` : null },
    { name: 'Announcements', path: '/admin/announcements', icon: Bell },
    { name: 'Institute Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-800">
      
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo / Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-extrabold text-white tracking-tight">BrightPath</h2>
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">
                  Admin
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Coaching Management Suite</p>
            </div>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Staff Info */}
        <div className="px-5 py-3 border-b border-slate-800/60 bg-slate-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-200">Director / Admin Portal</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">v2.4 Demo</span>
        </div>

        {/* Sidebar Nav List */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {adminMenu.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-700/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </div>
                {item.badge ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold animate-pulse">
                    {item.badge}
                  </span>
                ) : item.count !== undefined ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                    {item.count}
                  </span>
                ) : null}
              </NavLink>
            );
          })}
        </nav>

        {/* Quick Portal Switch */}
        <div className="p-4 border-t border-slate-800/80 space-y-2 bg-slate-950/80">
          <Link
            to="/student/dashboard"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-indigo-400 text-xs font-medium transition-colors"
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>Student View Demo</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          <Link
            to="/"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
          >
            <div className="flex items-center gap-2">
              <LogOut className="w-4 h-4 text-slate-400" />
              <span>Public Website</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900">
                Academy Control Center
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                All records sync locally with localStorage for live client demonstration.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/courses"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add New Course
            </Link>

            <Link
              to="/admin/vacancies"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-all"
            >
              <Briefcase className="w-3.5 h-3.5 text-indigo-600" /> Post Vacancy
            </Link>

            <div className="flex items-center gap-2 p-1 pl-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-bold text-slate-800">Owner Demo</span>
            </div>
          </div>
        </header>

        {/* Admin Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <VideoPlayerModal />
      <PdfPreviewModal />
      <ToastContainer />
    </div>
  );
}
