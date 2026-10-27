import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Download, Eye, Bookmark, Star, Calendar, HardDrive } from 'lucide-react';

export default function MaterialCard({ material }) {
  const { previewPdf, toggleBookmarkMaterial, bookmarkedMaterials, showToast } = useApp();
  const isBookmarked = bookmarkedMaterials.includes(material.id);

  const handleDownload = (e) => {
    e.stopPropagation();
    showToast(`Downloading "${material.title}" (${material.fileSize})`, "success");
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Top Header Pill & Category */}
        <div className="p-4 pb-0 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 border border-amber-500/20 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                {material.category}
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[180px]">
                {material.subject}
              </p>
            </div>
          </div>

          <button
            onClick={() => toggleBookmarkMaterial(material.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              isBookmarked 
                ? 'bg-amber-100 text-amber-600' 
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            title={isBookmarked ? 'Saved in Student Bookmarks' : 'Bookmark this resource'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 pt-3">
          <h4 
            onClick={() => previewPdf(material)}
            className="text-sm font-bold text-slate-800 hover:text-indigo-600 cursor-pointer line-clamp-2 leading-snug transition-colors"
          >
            {material.title}
          </h4>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {material.description}
          </p>

          <div className="mt-3 py-2 px-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 font-mono">
              <HardDrive className="w-3 h-3 text-slate-400" /> {material.fileSize}
            </span>
            <span>{material.pages || 48} Pages</span>
            <span className="flex items-center gap-1 text-amber-600 font-semibold">
              <Star className="w-3 h-3 fill-current" /> {material.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 pt-0">
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <span className="text-[11px] text-slate-400">
            {(material.downloadsCount || 1200).toLocaleString()} Downloads
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => previewPdf(material)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-700 hover:bg-indigo-50 border border-indigo-200 transition-colors flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
