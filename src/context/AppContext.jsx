import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCourses } from '../data/courses';
import { initialLectures } from '../data/lectures';
import { initialMaterials } from '../data/materials';
import { initialVacancies } from '../data/vacancies';
import { initialFaculty } from '../data/faculty';
import { initialStudents } from '../data/students';
import { initialEnquiries } from '../data/enquiries';
import { initialApplications } from '../data/applications';
import { initialAnnouncements } from '../data/announcements';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Load initial states from localStorage if available, otherwise defaults
  const loadInitial = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`brightpath_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      console.warn(`Failed reading ${key} from localStorage`, e);
      return fallback;
    }
  };

  const [courses, setCourses] = useState(() => loadInitial('courses', initialCourses));
  const [lectures, setLectures] = useState(() => loadInitial('lectures', initialLectures));
  const [materials, setMaterials] = useState(() => loadInitial('materials', initialMaterials));
  const [vacancies, setVacancies] = useState(() => loadInitial('vacancies', initialVacancies));
  const [faculty, setFaculty] = useState(() => loadInitial('faculty', initialFaculty));
  const [students, setStudents] = useState(() => loadInitial('students', initialStudents));
  const [enquiries, setEnquiries] = useState(() => loadInitial('enquiries', initialEnquiries));
  const [applications, setApplications] = useState(() => loadInitial('applications', initialApplications));
  const [announcements, setAnnouncements] = useState(() => loadInitial('announcements', initialAnnouncements));

  // User student interactions
  const [enrolledCourses, setEnrolledCourses] = useState(() => loadInitial('enrolled_courses', ['course-1', 'course-7']));
  const [completedLectures, setCompletedLectures] = useState(() => loadInitial('completed_lectures', ['lec-1', 'lec-5']));
  const [bookmarkedMaterials, setBookmarkedMaterials] = useState(() => loadInitial('bookmarked_materials', ['mat-1', 'mat-2', 'mat-5']));
  const [typingHistory, setTypingHistory] = useState(() => loadInitial('typing_history', [
    { id: "th-1", date: "2026-10-24 16:30", passageTitle: "The Pillars of Indian Democracy", language: "English", wpm: 44, accuracy: 96, duration: "1 min" },
    { id: "th-2", date: "2026-10-23 11:15", passageTitle: "Technological Revolution in Banking", language: "English", wpm: 48, accuracy: 98, duration: "3 min" },
    { id: "th-3", date: "2026-10-21 14:00", passageTitle: "भारतीय संविधान और लोकतंत्र", language: "Hindi", wpm: 32, accuracy: 93, duration: "1 min" }
  ]));

  // Global UI modaling
  const [toasts, setToasts] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activePdf, setActivePdf] = useState(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryModalCourse, setEnquiryModalCourse] = useState("");

  // Persist state updates to localStorage
  useEffect(() => {
    localStorage.setItem('brightpath_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('brightpath_lectures', JSON.stringify(lectures));
  }, [lectures]);

  useEffect(() => {
    localStorage.setItem('brightpath_materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('brightpath_vacancies', JSON.stringify(vacancies));
  }, [vacancies]);

  useEffect(() => {
    localStorage.setItem('brightpath_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('brightpath_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('brightpath_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('brightpath_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('brightpath_enrolled_courses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('brightpath_completed_lectures', JSON.stringify(completedLectures));
  }, [completedLectures]);

  useEffect(() => {
    localStorage.setItem('brightpath_bookmarked_materials', JSON.stringify(bookmarkedMaterials));
  }, [bookmarkedMaterials]);

  useEffect(() => {
    localStorage.setItem('brightpath_typing_history', JSON.stringify(typingHistory));
  }, [typingHistory]);

  // Toast System
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Student Actions
  const enrollCourse = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses((prev) => [...prev, courseId]);
      showToast("Successfully enrolled in course! Check your Student Dashboard.", "success");
    } else {
      showToast("You are already enrolled in this course.", "info");
    }
  };

  const toggleCompleteLecture = (lectureId) => {
    setCompletedLectures((prev) => {
      const isCompleted = prev.includes(lectureId);
      const updated = isCompleted ? prev.filter(id => id !== lectureId) : [...prev, lectureId];
      showToast(isCompleted ? "Marked lecture as incomplete." : "Lecture completed! Progress updated.", isCompleted ? "info" : "success");
      return updated;
    });
  };

  const toggleBookmarkMaterial = (materialId) => {
    setBookmarkedMaterials((prev) => {
      const isBookmarked = prev.includes(materialId);
      const updated = isBookmarked ? prev.filter(id => id !== materialId) : [...prev, materialId];
      showToast(isBookmarked ? "Removed from bookmarks." : "Saved to your study bookmarks!", isBookmarked ? "info" : "success");
      return updated;
    });
  };

  const saveTypingResult = (result) => {
    const entry = {
      id: `th-${Date.now()}`,
      date: new Date().toLocaleString(),
      ...result
    };
    setTypingHistory((prev) => [entry, ...prev]);
    showToast(`Typing test saved! Speed: ${result.wpm} WPM (${result.accuracy}% Acc)`, "success");
  };

  // Admin Course CRUD
  const addCourse = (newCourse) => {
    const item = {
      ...newCourse,
      id: `course-${Date.now()}`,
      enrolledStudents: 0,
      rating: 5.0,
      reviewsCount: 1,
      totalLectures: Number(newCourse.totalLectures) || 0,
      price: Number(newCourse.price) || 999,
      originalPrice: Number(newCourse.originalPrice) || 2999
    };
    setCourses((prev) => [item, ...prev]);
    showToast(`Course "${item.title}" added successfully!`, "success");
  };

  const updateCourse = (id, updatedFields) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c)));
    showToast("Course details updated successfully!", "success");
  };

  const deleteCourse = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    showToast("Course deleted from catalogue.", "info");
  };

  // Admin Lecture CRUD
  const addLecture = (newLecture) => {
    const item = {
      ...newLecture,
      id: `lec-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0],
      views: 0
    };
    setLectures((prev) => [item, ...prev]);
    showToast(`Lecture "${item.title}" uploaded successfully!`, "success");
  };

  const updateLecture = (id, updatedFields) => {
    setLectures((prev) => prev.map((l) => (l.id === id ? { ...l, ...updatedFields } : l)));
    showToast("Lecture updated successfully!", "success");
  };

  const deleteLecture = (id) => {
    setLectures((prev) => prev.filter((l) => l.id !== id));
    showToast("Lecture deleted.", "info");
  };

  // Admin Material CRUD
  const addMaterial = (newMat) => {
    const item = {
      ...newMat,
      id: `mat-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0],
      downloadsCount: 0,
      rating: 5.0
    };
    setMaterials((prev) => [item, ...prev]);
    showToast(`Study material "${item.title}" uploaded!`, "success");
  };

  const deleteMaterial = (id) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
    showToast("Study material removed.", "info");
  };

  // Admin Vacancy CRUD
  const addVacancy = (newVac) => {
    const item = {
      ...newVac,
      id: `vac-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      applicantsCount: 0,
      status: "Active"
    };
    setVacancies((prev) => [item, ...prev]);
    showToast(`Vacancy "${item.title}" published!`, "success");
  };

  const updateVacancy = (id, updatedFields) => {
    setVacancies((prev) => prev.map((v) => (v.id === id ? { ...v, ...updatedFields } : v)));
    showToast("Vacancy updated successfully!", "success");
  };

  const deleteVacancy = (id) => {
    setVacancies((prev) => prev.filter((v) => v.id !== id));
    showToast("Vacancy deleted.", "info");
  };

  // Applications & Enquiries
  const submitApplication = (appData) => {
    const newApp = {
      id: `app-${Date.now()}`,
      appliedDate: new Date().toISOString().split('T')[0],
      status: "Under Review",
      ...appData
    };
    setApplications((prev) => [newApp, ...prev]);
    // Also increment applicant count on vacancy
    if (appData.vacancyId) {
      setVacancies((prev) => prev.map(v => v.id === appData.vacancyId ? { ...v, applicantsCount: (v.applicantsCount || 0) + 1 } : v));
    }
    showToast("Application submitted successfully! Our recruitment team will review it.", "success");
    return true;
  };

  const updateApplicationStatus = (id, newStatus) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
    showToast(`Application status updated to "${newStatus}"`, "success");
  };

  const submitEnquiry = (enquiryData) => {
    const newEnq = {
      id: `enq-${Date.now()}`,
      date: new Date().toLocaleString(),
      status: "New",
      ...enquiryData
    };
    setEnquiries((prev) => [newEnq, ...prev]);
    showToast("Thank you! Your enquiry has been received. Our counselor will contact you shortly.", "success");
    return true;
  };

  const updateEnquiryStatus = (id, newStatus) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e)));
    showToast(`Enquiry marked as "${newStatus}"`, "success");
  };

  const addAnnouncement = (newAnn) => {
    const item = {
      ...newAnn,
      id: `ann-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements((prev) => [item, ...prev]);
    showToast("Announcement published!", "success");
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    showToast("Announcement deleted.", "info");
  };

  // Video and PDF modal openers
  const playVideo = (lecture) => {
    setActiveVideo(lecture);
  };

  const closeVideo = () => {
    setActiveVideo(null);
  };

  const previewPdf = (material) => {
    setActivePdf(material);
  };

  const closePdf = () => {
    setActivePdf(null);
  };

  const openEnquiryModal = (courseName = "") => {
    setEnquiryModalCourse(courseName);
    setIsEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
    setEnquiryModalCourse("");
  };

  return (
    <AppContext.Provider
      value={{
        courses,
        lectures,
        materials,
        vacancies,
        faculty,
        students,
        enquiries,
        applications,
        announcements,
        enrolledCourses,
        completedLectures,
        bookmarkedMaterials,
        typingHistory,
        toasts,
        showToast,
        removeToast,
        enrollCourse,
        toggleCompleteLecture,
        toggleBookmarkMaterial,
        saveTypingResult,
        addCourse,
        updateCourse,
        deleteCourse,
        addLecture,
        updateLecture,
        deleteLecture,
        addMaterial,
        deleteMaterial,
        addVacancy,
        updateVacancy,
        deleteVacancy,
        submitApplication,
        updateApplicationStatus,
        submitEnquiry,
        updateEnquiryStatus,
        addAnnouncement,
        deleteAnnouncement,
        isSearchOpen,
        setIsSearchOpen,
        activeVideo,
        playVideo,
        closeVideo,
        activePdf,
        previewPdf,
        closePdf,
        isEnquiryModalOpen,
        openEnquiryModal,
        closeEnquiryModal,
        enquiryModalCourse
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
