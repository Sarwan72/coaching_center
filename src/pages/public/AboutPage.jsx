import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Target, 
  Eye, 
  Award, 
  ShieldCheck, 
  Users, 
  CheckCircle, 
  Building2, 
  Sparkles,
  BookOpen,
  Keyboard,
  Video
} from 'lucide-react';

export default function AboutPage() {
  const infraItems = [
    {
      title: "Interactive Smart Classrooms",
      desc: "Centralized air-conditioned lecture halls equipped with 86-inch 4K ViewSonic touch smartboards, crystal acoustic audio, and comfortable ergonomic seating.",
      icon: BookOpen,
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80"
    },
    {
      title: "60-Workstation Computer Typing Lab",
      desc: "Dedicated high-speed CBT lab for Allahabad High Court Clerk, SSC DEST, and Railway typing tests with English & Hindi Unicode keyboards.",
      icon: Keyboard,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80"
    },
    {
      title: "HD Recording Studios",
      desc: "Broadcast-quality studio setup with 4K PTZ Sony cameras, Rode wireless audio systems, and OBS streaming infrastructure for hybrid batches.",
      icon: Video,
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80"
    },
    {
      title: "Reading Hall & Digital Library",
      desc: "Quiet reading library open from 7:00 AM to 10:00 PM with 10,000+ reference books, national dailies (The Hindu & Indian Express), and high-speed Wi-Fi.",
      icon: Building2,
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
            About BrightPath Academy
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Nurturing Aspirations Into National Achievements
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Founded with a vision to democratize premium government examination coaching, BrightPath Academy has guided over 5,000 students into central and state services.
          </p>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            To provide student-centric, scientifically structured preparation that removes rote memorization. We empower students with conceptual clarity, speed arithmetic shortcuts, and real exam simulation.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            To become India's foremost benchmark in government exam preparation by blending classroom excellence with state-of-the-art digital video lectures and real-time computer testing modules.
          </p>
        </div>
      </div>

      {/* Director's Desk */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
              alt="Director"
              className="w-full aspect-square rounded-2xl object-cover ring-4 ring-indigo-500/30"
            />
          </div>
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">From the Director's Desk</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              "Every Student Has The Potential To Clear The Merit List With The Right Strategy"
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              "Government exams in India are not merely a test of knowledge—they are tests of speed, accuracy, and mental resilience under intense time pressure. At BrightPath, we don't just teach syllabus; we mentor your discipline, test temperament, and answer-writing instincts."
            </p>
            <div className="pt-2">
              <h4 className="text-base font-bold text-white">Dr. Alok Verma</h4>
              <p className="text-xs text-slate-400">Founder & Academic Director • Ph.D., Constitutional Law</p>
            </div>
          </div>
        </div>
      </div>

      {/* Infrastructure Showcase */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">World-Class Facilities</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Our Modern Learning Infrastructure</h2>
          <p className="text-sm text-slate-500 mt-2">Designed to offer optimal learning conditions for focused aspirants.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {infraItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="aspect-video bg-slate-900 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-black/60 backdrop-blur-md text-white">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
