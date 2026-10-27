import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Save, 
  Bell,
  BookOpen
} from 'lucide-react';

export default function StudentProfile() {
  const { showToast } = useApp();

  const [profile, setProfile] = useState({
    name: "Rahul Sharma",
    rollNumber: "BP-2026-0814",
    email: "rahul.sharma@example.com",
    phone: "+91 98112 43210",
    city: "Noida Sector 62, UP",
    enrollmentDate: "12 July 2026",
    primaryBatch: "Morning Batch A (8:00 AM - 11:30 AM)",
    targetExam: "SSC CGL 2026 & Banking PO",
    libraryCardNo: "LIB-9041"
  });

  const [notifications, setNotifications] = useState({
    whatsappNotif: true,
    emailNotif: true,
    mockTestReminders: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast("Student profile updated successfully!", "success");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80"
          alt="Rahul Sharma"
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-indigo-500 shadow-md shrink-0"
        />

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900">{profile.name}</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Verified Student
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Roll No: <strong className="text-slate-800 font-mono">{profile.rollNumber}</strong> • Enrolled in {profile.targetExam}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" /> {profile.city}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" /> Since {profile.enrollmentDate}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> 94% Classroom Attendance
            </span>
          </div>
        </div>
      </div>

      {/* Profile Edit Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Personal & Academic Contact Details
        </h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Roll Number (Fixed)
              </label>
              <input
                type="text"
                disabled
                value={profile.rollNumber}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-xs font-mono text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Batch Timing & Campus
              </label>
              <input
                type="text"
                value={profile.primaryBatch}
                onChange={(e) => setProfile({ ...profile, primaryBatch: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Library Card Number
              </label>
              <input
                type="text"
                value={profile.libraryCardNo}
                onChange={(e) => setProfile({ ...profile, libraryCardNo: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              SMS & WhatsApp Alert Preferences
            </span>
            <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-700">
              <input
                type="checkbox"
                checked={notifications.whatsappNotif}
                onChange={(e) => setNotifications({ ...notifications, whatsappNotif: e.target.checked })}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <span>Receive WhatsApp notifications for schedule changes & mock test links</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-700">
              <input
                type="checkbox"
                checked={notifications.mockTestReminders}
                onChange={(e) => setNotifications({ ...notifications, mockTestReminders: e.target.checked })}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <span>Send me SMS reminder 1 hour prior to Sunday All-India Mock Tests</span>
            </label>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <Save className="w-4 h-4" /> Save Profile Details
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
