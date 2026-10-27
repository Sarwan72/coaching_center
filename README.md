# coaching_center

# BrightPath Academy — Coaching Institute Website UI (React + Tailwind CSS)

A complete, modern, professional, responsive website UI for a coaching institute that manages and showcases courses, recorded lectures, PDF notes, interactive typing practice, job vacancies, and student resources.

## 🚀 Live Demo & Features

- **Public Website**: Hero section, Course listings, Recorded Lecture library, PDF Study Materials, Interactive Typing Practice, Careers & Vacancies, Faculty Profiles, About Us, Contact & Multi-campus Directory.
- **Student Dashboard**: Fictional student profile (Rahul Sharma), enrolled courses progress, continue learning lesson widget, upcoming mock test schedule, bookmarked study notes, and typing performance history.
- **Admin / Coaching Owner Portal**:
  - Overview KPI cards & charts (Monthly Enrollment & Course Distribution with Recharts).
  - Manage Courses (Add, Edit, Delete).
  - Upload Recorded Lectures with simulated video encoding progress bar (0% -> 100%).
  - Study Material Management with simulated PDF upload and instant preview modal.
  - Job Vacancy Management with status switcher (`Active`, `Closed`) and candidate applicant inspection.
  - Student Roster with attendance and test performance cards.
  - Faculty directory and assigned subjects.
  - Lead Inquiries with inline status updates (`New`, `Contacted`, `Converted`).
  - Job Applications with candidate resume viewing.
  - Broadcast Announcements noticeboard.
  - Institute branding & settings.
- **Global Search**: Press `⌘K` or click search anywhere to search across courses, lectures, materials, and jobs.
- **Interactive Typing Practice**: Real-time Gross WPM and Accuracy tracker for English and Hindi Unicode passages with 1, 3, 5, 10-minute timers and performance scorecards.
- **LocalStorage Sync**: All CRUD interactions (enrolling, marking lectures complete, submitting job applications, saving typing tests, updating inquiries) persist in `localStorage`.

## 🛠️ Technology Stack

- **React.js** with **Vite**
- **Tailwind CSS v4**
- **React Router DOM**
- **Lucide React** (Icons)
- **Recharts** (Analytics charts)

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Production Build
```bash
npm run build
```
