import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Calendar, 
  IndianRupee, 
  ArrowLeft, 
  CheckCircle2, 
  Upload, 
  FileText, 
  Check, 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vacancies, submitApplication } = useApp();

  const vacancy = vacancies.find((v) => v.id === id) || vacancies[0];

  // Application Form State
  const [formData, setFormData] = useState({
    candidateName: '',
    email: '',
    phone: '',
    city: '',
    experienceYears: '3 Years',
    highestQualification: 'Postgraduate / Master\'s',
    currentCompany: '',
    expectedSalary: '₹50,000 / month',
    coverLetter: '',
    resumeFileName: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [simulatedUploading, setSimulatedUploading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSimulatedUploading(true);
      setTimeout(() => {
        setFormData(prev => ({ ...prev, resumeFileName: file.name }));
        setSimulatedUploading(false);
      }, 700);
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.candidateName.trim()) errs.candidateName = "Candidate full name is required";
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = "Valid 10-digit mobile number required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Valid email address required";
    if (!formData.resumeFileName) errs.resumeFileName = "Please attach your resume PDF or Word document";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    submitApplication({
      vacancyId: vacancy.id,
      jobTitle: vacancy.title,
      ...formData
    });
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Nav */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <button
          onClick={() => navigate('/careers')}
          className="flex items-center gap-1.5 hover:text-indigo-600 font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Career Openings
        </button>
        <span className="text-slate-800 font-medium truncate max-w-[200px]">{vacancy.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Job Details */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                {vacancy.department} • {vacancy.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                vacancy.status === 'Closing Soon'
                  ? 'bg-amber-100 text-amber-800 animate-pulse'
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {vacancy.status}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {vacancy.title}
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed">
              {vacancy.description}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Location</span>
                <span className="font-bold text-slate-800 mt-0.5 block truncate">{vacancy.location}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Salary / Month</span>
                <span className="font-bold text-emerald-600 mt-0.5 block truncate">{vacancy.salary}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Experience</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{vacancy.experience}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Deadline</span>
                <span className="font-bold text-rose-600 mt-0.5 block">{vacancy.deadline}</span>
              </div>
            </div>
          </div>

          {/* Key Responsibilities */}
          {vacancy.responsibilities && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                Key Roles & Responsibilities
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {vacancy.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2"></span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Qualifications */}
          {vacancy.qualifications && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                Required Qualifications & Skills
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {vacancy.qualifications.map((qual, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{qual}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {vacancy.benefits && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                Employee Benefits & Perks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                {vacancy.benefits.map((ben, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{ben}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Application Form */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
              <h3 className="text-lg font-bold">Apply for this Position</h3>
              <p className="text-xs text-indigo-100 mt-1">Submit your profile and resume for immediate review</p>
            </div>

            {isSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Application Submitted!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-800">{formData.candidateName}</strong>! Your application for <strong>{vacancy.title}</strong> has been logged into our hiring portal. Our recruitment manager will reach out to you at <strong className="text-slate-800">{formData.email}</strong>.
                </p>
                <div className="pt-2">
                  <Link
                    to="/careers"
                    className="inline-block px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                  >
                    Browse Other Openings
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Candidate Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.candidateName}
                      onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                      placeholder="e.g. Vikramaditya Sharma"
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                        errors.candidateName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50'
                      }`}
                    />
                  </div>
                  {errors.candidateName && <p className="text-[11px] text-rose-500 mt-1">{errors.candidateName}</p>}
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                          errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98..."
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                          errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Experience & Qualification */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Total Experience
                    </label>
                    <select
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none"
                    >
                      <option value="Fresher / < 1 Year">Fresher / &lt; 1 Year</option>
                      <option value="1-2 Years">1-2 Years</option>
                      <option value="3-5 Years">3-5 Years</option>
                      <option value="6-10 Years">6-10 Years</option>
                      <option value="10+ Years">10+ Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Highest Degree
                    </label>
                    <input
                      type="text"
                      value={formData.highestQualification}
                      onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
                      placeholder="e.g. M.Sc Mathematics, B.Tech"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Current Organization & Expected Salary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Current Institute / Org
                    </label>
                    <input
                      type="text"
                      value={formData.currentCompany}
                      onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                      placeholder="e.g. Freelance / Coaching Name"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Expected Salary
                    </label>
                    <input
                      type="text"
                      value={formData.expectedSalary}
                      onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                      placeholder="e.g. ₹55,000 / month"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Resume Upload Simulation */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Upload Resume (PDF / DOCX) *
                  </label>
                  <label className={`w-full p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
                    errors.resumeFileName 
                      ? 'border-rose-400 bg-rose-50/50' 
                      : formData.resumeFileName 
                      ? 'border-emerald-400 bg-emerald-50/40' 
                      : 'border-slate-200 hover:border-indigo-400 bg-slate-50'
                  }`}>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    {simulatedUploading ? (
                      <span className="text-xs text-indigo-600 font-semibold animate-pulse">Uploading resume...</span>
                    ) : formData.resumeFileName ? (
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                        <FileText className="w-4 h-4" />
                        <span className="truncate max-w-[200px]">{formData.resumeFileName}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600">Click to upload your resume</span>
                        <span className="text-[10px] text-slate-400">PDF, DOC, DOCX up to 10MB</span>
                      </>
                    )}
                  </label>
                  {errors.resumeFileName && <p className="text-[11px] text-rose-500 mt-1">{errors.resumeFileName}</p>}
                </div>

                {/* Cover Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Brief Statement / Teaching Philosophy
                  </label>
                  <textarea
                    rows={2}
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    placeholder="Briefly explain your teaching experience or why you are a fit for this role..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" /> Submit Application
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
