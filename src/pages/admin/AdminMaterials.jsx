import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Plus, Search, Trash2, Eye, X, Upload, HardDrive } from 'lucide-react';

export default function AdminMaterials() {
  const { materials, courses, addMaterial, deleteMaterial, previewPdf, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

  const [formData, setFormData] = useState({
    title: '',
    courseName: courses[0]?.title || 'SSC CGL 2026 Complete Foundation',
    subject: 'Quantitative Aptitude',
    category: 'Notes',
    fileSize: '3.8 MB',
    pages: 45,
    description: 'Comprehensive handwritten revision notes with shortcut formulas and previous year questions.'
  });

  const filteredMaterials = materials.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.subject.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSimulatedPdfUpload = () => {
    setIsUploading(true);
    setUploadPercent(20);
    const timer = setInterval(() => {
      setUploadPercent(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsUploading(false);
          showToast("PDF document indexed and verified!", "success");
          return 100;
        }
        return prev + 30;
      });
    }, 350);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    addMaterial(formData);
    setIsModalOpen(false);
    setUploadPercent(0);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Study Material & PDF Hub</h2>
          <p className="text-xs text-slate-500">Upload revision notes, mock test booklets, and previous year exam papers.</p>
        </div>
        <button
          onClick={() => {
            setUploadPercent(0);
            setIsUploading(false);
            setIsModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add PDF Notes
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search study material by title or subject..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none"
          />
        </div>
        <span className="text-xs text-slate-500">{filteredMaterials.length} Documents Found</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-semibold uppercase">
                <th className="py-3.5 px-4">Document Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Size & Pages</th>
                <th className="py-3.5 px-4">Downloads</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMaterials.map((mat) => (
                <tr key={mat.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 
                          onClick={() => previewPdf(mat)}
                          className="font-bold text-slate-800 hover:text-indigo-600 cursor-pointer line-clamp-1"
                        >
                          {mat.title}
                        </h4>
                        <span className="text-[10px] text-slate-400">{mat.courseName} • {mat.uploadDate}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {mat.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-700">{mat.subject}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">
                    {mat.fileSize} • {mat.pages || 48} pgs
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-emerald-600">
                    {mat.downloadsCount?.toLocaleString() || 0}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => previewPdf(mat)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"
                        title="Preview Document"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteMaterial(mat.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                        title="Delete Document"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal with Simulated PDF Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <h3 className="text-base font-bold flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" /> Upload Study Material PDF
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              
              {/* Simulated PDF Upload Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Attach Document File (PDF)</span>
                  <span className="text-[10px] text-slate-400">PDF up to 25MB</span>
                </div>

                {uploadPercent > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-slate-600">
                      <span>Uploading PDF: {uploadPercent}%</span>
                      {uploadPercent === 100 && <span className="text-emerald-600 font-bold">Uploaded</span>}
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-600 h-full transition-all duration-300"
                        style={{ width: `${uploadPercent}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSimulatedPdfUpload}
                  disabled={isUploading}
                  className="w-full py-2.5 rounded-xl border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/50 text-xs font-bold text-amber-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  {isUploading ? 'Validating PDF Format...' : uploadPercent === 100 ? 'Re-upload PDF File' : 'Click to Select & Upload PDF (Simulated)'}
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Quantitative Aptitude Trigonometry Short Notes"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="Notes">Notes</option>
                    <option value="Previous Year Papers">Previous Year Papers</option>
                    <option value="Mock Tests">Mock Tests</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Syllabus">Syllabus</option>
                    <option value="Answer Keys">Answer Keys</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    File Size Display
                  </label>
                  <input
                    type="text"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Page Count
                  </label>
                  <input
                    type="number"
                    value={formData.pages}
                    onChange={(e) => setFormData({ ...formData, pages: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Description / Topic Summary
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow transition-all"
                >
                  Publish Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
