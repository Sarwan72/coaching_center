import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Save, Building2, Phone, Mail, Globe, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AdminSettings() {
  const { showToast } = useApp();

  const [settings, setSettings] = useState({
    instituteName: "BrightPath Academy",
    tagline: "Learn Better. Practice Smarter. Achieve More.",
    helplinePhone: "+91 98112 00334",
    landlinePhone: "+91 (0120) 456-7890",
    admissionsEmail: "admissions@brightpathacademy.in",
    headCampusAddress: "Plot 24, Knowledge Park III, Sector 62, Noida, UP - 201309",
    branches: "Noida, Delhi (Mukherjee Nagar), Lucknow (Hazratganj), Jaipur",
    telegramChannel: "t.me/BrightPathAcademyOfficial",
    youtubeChannel: "youtube.com/@BrightPathAcademyLive",
    admissionStatus: "Open for 2026-27",
    enableTypingLab: true,
    enableJobBoard: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast("Academy website settings saved successfully!", "success");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-extrabold text-slate-900">Coaching Institute & Portal Settings</h2>
        <p className="text-xs text-slate-500">Configure public institute branding, helpline contact numbers, and campus listings.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Brand Information */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">Institute Identity & Branding</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Coaching Institute Name
              </label>
              <input
                type="text"
                value={settings.instituteName}
                onChange={(e) => setSettings({ ...settings, instituteName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Can easily be rebranded for real clients</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Primary Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Helpline Mobile
              </label>
              <input
                type="text"
                value={settings.helplinePhone}
                onChange={(e) => setSettings({ ...settings, helplinePhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Admissions Email
              </label>
              <input
                type="email"
                value={settings.admissionsEmail}
                onChange={(e) => setSettings({ ...settings, admissionsEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Head Campus Address
            </label>
            <input
              type="text"
              value={settings.headCampusAddress}
              onChange={(e) => setSettings({ ...settings, headCampusAddress: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none"
            />
          </div>
        </div>

        {/* Features & Modules Toggles */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Platform Modules Toggle</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">Interactive Typing Practice Lab</span>
                <span className="text-slate-500">Allow students to take live English and Hindi speed drills</span>
              </div>
              <input
                type="checkbox"
                checked={settings.enableTypingLab}
                onChange={(e) => setSettings({ ...settings, enableTypingLab: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">Careers & Faculty Recruitment Module</span>
                <span className="text-slate-500">Show public vacancy board and accept teacher CV applications</span>
              </div>
              <input
                type="checkbox"
                checked={settings.enableJobBoard}
                onChange={(e) => setSettings({ ...settings, enableJobBoard: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
          >
            <Save className="w-4 h-4" /> Save Website Configuration
          </button>
        </div>

      </form>

    </div>
  );
}
