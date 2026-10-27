import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  BookOpen, 
  Video, 
  FileText, 
  Briefcase, 
  MessageSquare, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Plus, 
  FileCheck,
  Award
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from 'recharts';

export default function AdminOverview() {
  const { 
    courses, 
    lectures, 
    materials, 
    vacancies, 
    students, 
    enquiries, 
    applications 
  } = useApp();

  const activeVacanciesCount = vacancies.filter(v => v.status !== 'Closed').length;
  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;
  const pendingAppsCount = applications.filter(a => a.status === 'Under Review').length;

  // Chart Demo Data
  const monthlyEnrollmentData = [
    { month: 'May', students: 320, enquiries: 410 },
    { month: 'Jun', students: 480, enquiries: 620 },
    { month: 'Jul', students: 780, enquiries: 940 },
    { month: 'Aug', students: 920, enquiries: 1100 },
    { month: 'Sep', students: 1150, enquiries: 1350 },
    { month: 'Oct', students: 1420, enquiries: 1680 }
  ];

  const courseCategoryData = [
    { name: 'SSC CGL', count: 1420 },
    { name: 'UP Police', count: 2150 },
    { name: 'Railways', count: 1320 },
    { name: 'Banking PO', count: 980 },
    { name: 'Computer CCC', count: 1840 },
    { name: 'UPSC GS', count: 640 }
  ];

  const stats = [
    { label: 'Total Enrolled Students', value: students.length, display: '5,280+', icon: Users, color: 'text-indigo-600', link: '/admin/students' },
    { label: 'Active Courses', value: courses.length, display: courses.length, icon: BookOpen, color: 'text-teal-600', link: '/admin/courses' },
    { label: 'Recorded Lectures', value: lectures.length, display: lectures.length, icon: Video, color: 'text-rose-600', link: '/admin/lectures' },
    { label: 'Study Material (PDF)', value: materials.length, display: materials.length, icon: FileText, color: 'text-amber-500', link: '/admin/materials' },
    { label: 'Active Vacancies', value: activeVacanciesCount, display: activeVacanciesCount, icon: Briefcase, color: 'text-emerald-600', link: '/admin/vacancies' },
    { label: 'New Lead Enquiries', value: newEnquiriesCount, display: `${newEnquiriesCount} New`, icon: MessageSquare, color: 'text-blue-600', link: '/admin/enquiries' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Overview Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Coaching Owner Overview</h2>
          <p className="text-xs text-slate-500 mt-1">Real-time statistics across admissions, live courses, student inquiries, and faculty recruitment.</p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/courses"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add Course
          </Link>
          <Link
            to="/admin/vacancies"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Briefcase className="w-3.5 h-3.5" /> Post Vacancy
          </Link>
        </div>
      </div>

      {/* 6 Key Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Link
              key={idx}
              to={s.link}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className={`p-2 rounded-xl bg-slate-50 border border-slate-100 ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <span className="text-[10px] text-slate-400 group-hover:text-indigo-600 font-bold transition-colors">
                  View →
                </span>
              </div>
              <div className="mt-3">
                <div className="text-xl font-extrabold text-slate-900">{s.display}</div>
                <div className="text-[11px] font-semibold text-slate-500 mt-0.5 line-clamp-1">{s.label}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Analytics Charts Section (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Monthly Enrollment & Enquiry Trend */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Student Admissions & Inquiries</h3>
              <p className="text-xs text-slate-400">Monthly trend over the last 6 months</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-indigo-600 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span> Admissions
              </span>
              <span className="flex items-center gap-1.5 text-teal-600 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span> Inquiries
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyEnrollmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEnquiries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="students" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorStudents)" />
                <Area type="monotone" dataKey="enquiries" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#colorEnquiries)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Enrollment Breakdown */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Enrollment by Course</h3>
              <p className="text-xs text-slate-400">Top demand categories</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              Current Session
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseCategoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Two Responsive Tables: Recent Enquiries & Job Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Student Leads / Enquiries */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">Recent Student Course Enquiries</h3>
            </div>
            <Link to="/admin/enquiries" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
              View All ({enquiries.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {enquiries.slice(0, 4).map((enq) => (
              <div
                key={enq.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-slate-800">{enq.name}</h5>
                    <span className="text-[10px] text-slate-400 font-mono">{enq.phone}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{enq.courseInterested}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  enq.status === 'New'
                    ? 'bg-rose-100 text-rose-800'
                    : enq.status === 'Converted'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {enq.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Job Applications */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">Recent Job & Faculty Applications</h3>
            </div>
            <Link to="/admin/applications" className="text-xs font-bold text-emerald-600 hover:text-emerald-800">
              View All ({applications.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {applications.slice(0, 4).map((app) => (
              <div
                key={app.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-slate-800">{app.candidateName}</h5>
                    <span className="text-[10px] text-slate-400">{app.experienceYears} exp</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{app.jobTitle}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  app.status === 'Hired'
                    ? 'bg-emerald-100 text-emerald-800'
                    : app.status === 'Shortlisted'
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
