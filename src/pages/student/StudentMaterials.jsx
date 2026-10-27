import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import MaterialCard from '../../components/cards/MaterialCard';
import { FileText, Bookmark, Download, ArrowRight } from 'lucide-react';

export default function StudentMaterials() {
  const { materials, bookmarkedMaterials, previewPdf } = useApp();
  const savedMaterials = materials.filter(m => bookmarkedMaterials.includes(m.id));

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Bookmarked Notes & Downloads</h2>
          <p className="text-xs text-slate-500">
            Quickly preview or download your saved revision capsules, worksheets, and formula cheat sheets.
          </p>
        </div>
        <Link
          to="/study-material"
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shrink-0 shadow-sm"
        >
          Browse All Materials ({materials.length})
        </Link>
      </div>

      {savedMaterials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedMaterials.map((mat) => (
            <MaterialCard key={mat.id} material={mat} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No bookmarked notes yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Click the bookmark icon on any study material in the library to save it here for quick access.
          </p>
          <Link
            to="/study-material"
            className="inline-block px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
          >
            Explore Study Materials
          </Link>
        </div>
      )}

    </div>
  );
}
