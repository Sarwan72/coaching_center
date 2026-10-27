import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import GlobalSearchModal from '../components/common/GlobalSearchModal';
import VideoPlayerModal from '../components/common/VideoPlayerModal';
import PdfPreviewModal from '../components/common/PdfPreviewModal';
import EnquiryModal from '../components/forms/EnquiryModal';
import ToastContainer from '../components/common/ToastContainer';

export default function PublicLayout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {/* Global Modals & Notifications */}
      <GlobalSearchModal />
      <VideoPlayerModal />
      <PdfPreviewModal />
      <EnquiryModal />
      <ToastContainer />
    </div>
  );
}
