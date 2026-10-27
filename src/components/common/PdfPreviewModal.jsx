import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Download, Bookmark, FileText, ZoomIn, ZoomOut, Share2, Check } from 'lucide-react';

export default function PdfPreviewModal() {
  const { activePdf, closePdf, bookmarkedMaterials, toggleBookmarkMaterial, showToast } = useApp();
  const [zoomLevel, setZoomLevel] = useState(100);
  const [copied, setCopied] = useState(false);

  if (!activePdf) return null;

  const isBookmarked = bookmarkedMaterials.includes(activePdf.id);

  const handleDownload = () => {
    showToast(`Downloading: ${activePdf.title} (${activePdf.fileSize})`, "success");
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    showToast("Study material link copied to clipboard!", "info");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-4xl bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/30 text-indigo-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold line-clamp-1">{activePdf.title}</h3>
              <p className="text-xs text-slate-400">
                {activePdf.subject} • {activePdf.pages || 48} Pages • {activePdf.fileSize}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmarkMaterial(activePdf.id)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title={isBookmarked ? 'Saved to Bookmarks' : 'Bookmark this note'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Share document link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition-all"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
            <button
              onClick={closePdf}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-2 bg-slate-100 border-b border-slate-200 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-700">Previewing Page 1 of {activePdf.pages || 48}</span>
            <span className="px-2 py-0.5 rounded bg-slate-200 font-medium text-slate-700">{activePdf.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel(prev => Math.max(75, prev - 15))}
              className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono font-medium text-slate-700">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(150, prev + 15))}
              className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF Document Simulation Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-200/70 flex justify-center">
          <div 
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-2xl bg-white rounded-lg shadow-xl border border-slate-300 p-8 sm:p-12 transition-transform duration-200 min-h-[600px] flex flex-col justify-between"
          >
            {/* Document Header */}
            <div>
              <div className="border-b-2 border-indigo-600 pb-4 mb-6 flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">BrightPath Academy Study Material</span>
                  <h2 className="text-xl font-bold text-slate-900 mt-1">{activePdf.title}</h2>
                  <p className="text-xs text-slate-500 mt-1">Course: {activePdf.courseName} • Subject: {activePdf.subject}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-xs font-mono font-semibold text-slate-400">DOC-ID: {activePdf.id}</span>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase mt-1">Official Notes</p>
                </div>
              </div>

              {/* Sample Excerpt Content */}
              <div className="text-sm text-slate-700 leading-relaxed font-sans space-y-4">
                <p className="text-xs italic bg-amber-50 text-amber-900 p-3 rounded-lg border border-amber-200">
                  {activePdf.description}
                </p>
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {activePdf.samplePreviewText || `
1. DEFINITIONS & FUNDAMENTALS
- Core conceptual laws and memory maps for quick recall during examination hours.
- Verified solutions for previous year questions matching the TCS exam layout.
- Practice assignments with detailed explanations provided at the back of each chapter.

2. SPEED HACKS & SHORTCUT RULES
- Memorize fractional equivalents and recurring prime numbers.
- Avoid lengthy conventional calculations using elimination techniques.
                  `}
                </div>
              </div>
            </div>

            {/* Document Footer */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
              <span>© BrightPath Academy • Strictly for enrolled student personal use</span>
              <span className="font-mono">Page 1 of {activePdf.pages || 48}</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            Need a printed copy? Study materials are also available at our Noida, Delhi & Lucknow centers.
          </p>
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow"
          >
            <Download className="w-4 h-4" /> Download Complete PDF ({activePdf.fileSize})
          </button>
        </div>
      </div>
    </div>
  );
}
