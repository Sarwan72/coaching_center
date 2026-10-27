import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, GraduationCap, Phone, User, Mail, MapPin } from 'lucide-react';

export default function EnquiryModal() {
  const { isEnquiryModalOpen, closeEnquiryModal, enquiryModalCourse, courses, submitEnquiry } = useApp();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    courseInterested: '',
    mode: 'Offline Classroom (Noida)',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (enquiryModalCourse) {
      setFormData(prev => ({ ...prev, courseInterested: enquiryModalCourse }));
    } else if (courses.length > 0) {
      setFormData(prev => ({ ...prev, courseInterested: courses[0].title }));
    }
  }, [enquiryModalCourse, courses]);

  if (!isEnquiryModalOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = "Valid 10-digit phone number is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Enter a valid email address";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    submitEnquiry(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      closeEnquiryModal();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-white/10">
              <GraduationCap className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base font-bold">Book Free Demo Class</h3>
              <p className="text-xs text-indigo-100">Attend a session & experience our teaching methodology</p>
            </div>
          </div>
          <button
            onClick={closeEnquiryModal}
            className="p-1 rounded-lg text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-800">Demo Class Reserved!</h4>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              We have received your details. Our academic counselor will call you on <span className="font-semibold text-slate-800">{formData.phone}</span> with your batch schedule and entry pass.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Student Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                    errors.name ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50'
                  }`}
                />
              </div>
              {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit Mobile"
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                      errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                      errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Course Interested In *
              </label>
              <select
                value={formData.courseInterested}
                onChange={(e) => setFormData({ ...formData, courseInterested: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {courses.map(c => (
                  <option key={c.id} value={c.title}>{c.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Preferred Learning Mode & Center
              </label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="Offline Classroom (Noida Sector 62)">Offline Classroom (Noida Sector 62)</option>
                <option value="Offline Classroom (Delhi Mukherjee Nagar)">Offline Classroom (Delhi Mukherjee Nagar)</option>
                <option value="Offline Classroom (Lucknow Hazratganj)">Offline Classroom (Lucknow Hazratganj)</option>
                <option value="Offline Classroom (Jaipur Gopalpura)">Offline Classroom (Jaipur Gopalpura)</option>
                <option value="Live Interactive Online Batch">Live Interactive Online Batch</option>
                <option value="Typing Lab Special Batch">Typing Lab Special Batch</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Any Specific Questions / Target Exam Year?
              </label>
              <textarea
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="e.g. Target SSC CGL 2026, need morning timing info..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
              ></textarea>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={closeEnquiryModal}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all"
              >
                Confirm Demo Class Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
