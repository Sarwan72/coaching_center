import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles,
  Building2,
  MessageSquare
} from 'lucide-react';

export default function ContactPage() {
  const { submitEnquiry } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseInterested: 'SSC CGL 2026 Complete Foundation',
    mode: 'Offline Classroom (Noida)',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const branches = [
    {
      city: "Noida (Head Campus)",
      address: "Plot 24, Knowledge Park III, Sector 62, Noida, Uttar Pradesh - 201309",
      landmark: "Near Sector 62 Metro Station (Gate 2)",
      phone: "+91 98112 00334 / +91 (0120) 456-7890",
      email: "noida@brightpathacademy.in"
    },
    {
      city: "Delhi (North Campus)",
      address: "B-14, Commercial Complex, Main Road, Mukherjee Nagar, Delhi - 110009",
      landmark: "Opposite Batra Cinema Complex",
      phone: "+91 98711 44520 / +91 98118 77665",
      email: "delhi@brightpathacademy.in"
    },
    {
      city: "Lucknow (Central UP)",
      address: "4th Floor, Anand Plaza, Hazratganj, Lucknow, Uttar Pradesh - 226001",
      landmark: "Near Mayfair Cinema Crossing",
      phone: "+91 94503 12890 / +91 99182 67543",
      email: "lucknow@brightpathacademy.in"
    },
    {
      city: "Jaipur (Rajasthan Campus)",
      address: "32, Surya Nagar, Gopalpura Bypass Road, Jaipur, Rajasthan - 302018",
      landmark: "Near Ridhi Sidhi Circle",
      phone: "+91 98254 11223 / +91 94140 99887",
      email: "jaipur@brightpathacademy.in"
    }
  ];

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
      setFormData({
        name: '',
        email: '',
        phone: '',
        courseInterested: 'SSC CGL 2026 Complete Foundation',
        mode: 'Offline Classroom (Noida)',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Campus Visit & Direct Counseling</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Connect With BrightPath Academy
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Have questions about upcoming batches, syllabus roadmap, or scholarship tests? Drop us a message or visit our state-of-the-art coaching centers.
          </p>
        </div>
      </div>

      {/* Main Grid: Form & Campus Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Send an Enquiry</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Book an In-Person Counseling Session</h2>
            <p className="text-xs text-slate-500 mt-1">
              Our academic counselors will guide you on exam eligibility, selection strategy, and batch schedules.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Enquiry Received Successfully!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you for contacting BrightPath. An academic counselor will contact you shortly on your provided mobile number.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                    errors.name ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50'
                  }`}
                />
                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                      errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Target Examination
                  </label>
                  <select
                    value={formData.courseInterested}
                    onChange={(e) => setFormData({ ...formData, courseInterested: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:outline-none"
                  >
                    <option value="SSC CGL 2026 Complete Foundation">SSC CGL 2026 Complete Foundation</option>
                    <option value="Banking PO & Clerk (SBI / IBPS)">Banking PO & Clerk (SBI / IBPS)</option>
                    <option value="UPSC Civil Services Foundation GS">UPSC Civil Services Foundation GS</option>
                    <option value="UP Police Constable & SI Special">UP Police Constable & SI Special</option>
                    <option value="RRB NTPC & Group D Railways">RRB NTPC & Group D Railways</option>
                    <option value="Computer Fundamentals & CCC">Computer Fundamentals & CCC</option>
                    <option value="Typing Speed Clinic">Typing Speed Clinic (EN/HI)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Campus
                  </label>
                  <select
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:outline-none"
                  >
                    <option value="Noida Sector 62 (Head Campus)">Noida Sector 62 (Head Campus)</option>
                    <option value="Delhi (Mukherjee Nagar)">Delhi (Mukherjee Nagar)</option>
                    <option value="Lucknow (Hazratganj)">Lucknow (Hazratganj)</option>
                    <option value="Jaipur (Gopalpura Bypass)">Jaipur (Gopalpura Bypass)</option>
                    <option value="Online Live Interactive Batch">Online Live Interactive Batch</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Any Specific Question or Target Batch Timing?
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. Inquiring for morning batch timings and hostel accommodation nearby..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Enquiry & Request Callback
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Campus Addresses */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Office & Counseling Hours
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span>Monday – Saturday:</span>
                <span className="font-semibold text-white">7:30 AM – 8:30 PM</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span>Sunday (Mock Tests & Labs):</span>
                <span className="font-semibold text-white">9:00 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Telecalling Helpline:</span>
                <span className="font-semibold text-emerald-400">Available 24x7</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Campus Centers Across India
            </h3>
            {branches.map((branch, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">{branch.city}</h4>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    Operational
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{branch.address}</p>
                <p className="text-[11px] text-slate-400">Landmark: {branch.landmark}</p>
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" /> {branch.phone}
                  </span>
                  <span className="flex items-center gap-1 text-indigo-600">
                    <Mail className="w-3.5 h-3.5" /> {branch.email}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span className="font-bold">Noida Head Campus Interactive Map Location</span>
          <span>Knowledge Park III, Sector 62</span>
        </div>
        <div className="h-64 bg-slate-100 flex flex-col items-center justify-center text-slate-400 space-y-2 relative">
          <MapPin className="w-10 h-10 text-rose-500 animate-bounce-subtle" />
          <p className="text-sm font-bold text-slate-700">BrightPath Academy Head Campus</p>
          <p className="text-xs text-slate-500">Sector 62, Noida, Uttar Pradesh (Interactive Map View)</p>
        </div>
      </div>

    </div>
  );
}
