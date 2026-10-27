import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import FacultyPage from './pages/public/FacultyPage';

// Course Pages
import CoursesPage from './pages/courses/CoursesPage';
import CourseDetailPage from './pages/courses/CourseDetailPage';

// Lecture Pages
import LecturesPage from './pages/lectures/LecturesPage';
import LectureDetailPage from './pages/lectures/LectureDetailPage';

// Material Pages
import StudyMaterialPage from './pages/materials/StudyMaterialPage';

// Typing Module
import TypingPracticePage from './pages/typing/TypingPracticePage';

// Careers & Vacancies
import CareersPage from './pages/careers/CareersPage';
import JobDetailPage from './pages/careers/JobDetailPage';

// Student Portal Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentCourses from './pages/student/StudentCourses';
import StudentLectures from './pages/student/StudentLectures';
import StudentMaterials from './pages/student/StudentMaterials';
import StudentTypingResults from './pages/student/StudentTypingResults';
import StudentProfile from './pages/student/StudentProfile';

// Admin Portal Pages
import AdminOverview from './pages/admin/AdminOverview';
import AdminCourses from './pages/admin/AdminCourses';
import AdminLectures from './pages/admin/AdminLectures';
import AdminMaterials from './pages/admin/AdminMaterials';
import AdminVacancies from './pages/admin/AdminVacancies';
import AdminStudents from './pages/admin/AdminStudents';
import AdminFaculty from './pages/admin/AdminFaculty';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminApplications from './pages/admin/AdminApplications';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';
import AdminSettings from './pages/admin/AdminSettings';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/lectures" element={<LecturesPage />} />
            <Route path="/lectures/:id" element={<LectureDetailPage />} />
            <Route path="/study-material" element={<StudyMaterialPage />} />
            <Route path="/typing-practice" element={<TypingPracticePage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/careers/:id" element={<JobDetailPage />} />
            <Route path="/faculty" element={<FacultyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Student Dashboard Routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="my-courses" element={<StudentCourses />} />
            <Route path="my-lectures" element={<StudentLectures />} />
            <Route path="study-material" element={<StudentMaterials />} />
            <Route path="typing-results" element={<StudentTypingResults />} />
            <Route path="profile" element={<StudentProfile />} />
          </Route>

          {/* Admin / Owner Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="lectures" element={<AdminLectures />} />
            <Route path="materials" element={<AdminMaterials />} />
            <Route path="vacancies" element={<AdminVacancies />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="faculty" element={<AdminFaculty />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
