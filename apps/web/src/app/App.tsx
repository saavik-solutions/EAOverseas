/**
 * App.tsx — Master Router
 * 
 * This file defines all application routes, organized by role/feature.
 * All page imports come from feature barrel exports for clean dependency management.
 */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// ── App Shell ──
import AppProviders from './providers/AppProviders';
import ScrollToTop from '../components/layout/ScrollToTop';
import ProtectedRoute from '../components/guards/ProtectedRoute';

// ── Layouts ──
import MainLayout from '@/layouts/MainLayout';
import ConsultantLayout from '@/layouts/ConsultantLayout';

// ── Feature: Auth ──
import { Login, Signup, ForgotPassword, Verification } from '../features/auth';

// ── Feature: Explore (Public pages) ──
import { LandingPage, Countries, CountryDetails, AllDestinations, Referrals } from '../features/explore';

// ── Feature: Content (Static pages) ──
import { 
  AboutUs, Team, ExpertProfile, Blogs, BlogDetails, 
  Testimonials, StudentStory, TermsAndConditions, 
  PrivacyPolicyPage, CookiePolicyPage 
} from '../features/content';

// ── Feature: Dashboard ──
import { HomeDashboard } from '../features/dashboard';

// ── Feature: Feed ──
import { Feed, FeedDetails } from '../features/feed';

// ── Feature: Community ──
import { CommunityFeed } from '../features/community';

// ── Feature: Colleges ──
import { CollegeFinder, CollegeDetails, UniversityDirectory, UniversityDetails } from '../features/colleges';

// ── Feature: Courses ──
import { Courses, CourseDetails } from '../features/courses';

// ── Feature: Profile ──
import { 
  MyProfile, EditProfile, UserProfile, AccountSettings,
  NotificationPreferences, PrivacySecurity, AcademicSnapshotDetails,
  ProfileLayout, BasicInfo, Education, Goals, ProfileCompleted
} from '../features/profile';

// ── Feature: Applications ──
import { 
  ApplicationDashboard, ApplicationLayout, ApplicationStart,
  InitiateApplication, PersonalDetails, AcademicDetails,
  Documents, Payment, Review, ApplicationSubmitted
} from '../features/applications';

// ── Feature: Documents ──
import { DocumentsDashboard } from '../features/documents';

// ── Feature: Saved Items ──
import { SavedColleges, SavedCourses, SavedAccommodations, SavedPosts } from '../features/saved-items';

// ── Feature: Accommodation ──
import { Accommodation, AccommodationDetails } from '../features/accommodation';

// ── Feature: Visa ──
import { VisaPrep, ConfirmAdmission, VisaDocumentUpload } from '../features/visa';

// ── Feature: Loans ──
import { 
  LoanRequirements, LoanEligibility, LoanDocuments, 
  LenderSelection, LoanApplicationTimeline 
} from '../features/loans';

// ── Feature: AI Assistant ──
import { AskAI } from '../features/ai-assistant';

// ── Feature: Test Prep ──
import { 
  TestPrep, TestOverview, ListeningTest, SpeakingTest,
  ReadingTestInstructions, ReadingTest, ReadingTestResult,
  ReadingTestSubmitted, WritingTestInstructions, WritingTest
} from '../features/test-prep';

// ── Feature: Consultations ──
import { Consultant, ConsultationWaitingRoom } from '../features/consultations';

// ── Feature: Counsellor Portal ──
import { 
  ConsultantDashboard, ConsultantStudents, ConsultantSchedule,
  ConsultantTasks, CounsellorProfile, CounsellingChat,
  PerformanceRatingOverview, AssignedStudents
} from '../features/counsellor-portal';

// ── Feature: SuperAdmin ──
import { 
  Superadmin, SuperAdminUserManagement, SuperAdminUniversityManagement,
  SuperAdminUniversityProfile, SuperAdminPostFeedDashboard,
  SuperAdminNewPost, SuperAdminPostDetails
} from '../features/superadmin';

// ── Feature: University Portal ──
import { 
  UniversityDashboard, UniversityProfile, 
  UniversityVerification, UniversityPendingVerification
} from '../features/university-portal';

// ── Home Redirect ──
const HomeRoute = () => <Navigate to="/landing" replace />;

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* ═══════════════════════════════════════════════════════════════
              PUBLIC ROUTES — No login required
          ═══════════════════════════════════════════════════════════════ */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/team" element={<Team />} />
          <Route path="/expert-profile" element={<Navigate to="/team" replace />} />
          <Route path="/expert-profile/:expertId" element={<ExpertProfile />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/country/:countryCode" element={<CountryDetails />} />
          <Route path="/all-destinations" element={<AllDestinations />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/testimonials/:id" element={<StudentStory />} />

          {/* ═══════════════════════════════════════════════════════════════
              AUTH ROUTES — Login, Signup, Verification
          ═══════════════════════════════════════════════════════════════ */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/university-verification" element={<UniversityVerification />} />
          <Route path="/university-pending-verification" element={<UniversityPendingVerification />} />

          {/* ═══════════════════════════════════════════════════════════════
              STUDENT DASHBOARD — MainLayout with Sidebar
          ═══════════════════════════════════════════════════════════════ */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomeRoute />} />
            <Route path="dashboard" element={<ProtectedRoute><HomeDashboard /></ProtectedRoute>} />
            <Route path="courses" element={<Courses />} />
            <Route path="feed" element={<Feed />} />
            <Route path="community-feed" element={<CommunityFeed />} />
            <Route path="feed-details/:id" element={<FeedDetails />} />
            <Route path="colleges" element={<CollegeFinder />} />
            <Route path="college-details" element={<CollegeDetails />} />
            <Route path="course-details" element={<CourseDetails />} />
            <Route path="test-prep" element={<TestPrep />} />
            <Route path="test-prep/overview" element={<TestOverview />} />
            <Route path="accommodation" element={<Accommodation />} />
            <Route path="accommodation-details" element={<AccommodationDetails />} />
            <Route path="applications" element={<ProtectedRoute><ApplicationDashboard /></ProtectedRoute>} />
            <Route path="documents" element={<ProtectedRoute><DocumentsDashboard /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
            <Route path="profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route path="account-settings" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
            <Route path="notification-preferences" element={<ProtectedRoute><NotificationPreferences /></ProtectedRoute>} />
            <Route path="privacy-security" element={<ProtectedRoute><PrivacySecurity /></ProtectedRoute>} />
            <Route path="profile/academic-snapshot" element={<ProtectedRoute><AcademicSnapshotDetails /></ProtectedRoute>} />
            <Route path="referrals" element={<ProtectedRoute><Referrals /></ProtectedRoute>} />
            <Route path="saved-colleges" element={<SavedColleges />} />
            <Route path="saved-courses" element={<SavedCourses />} />
            <Route path="saved-accommodations" element={<SavedAccommodations />} />
            <Route path="saved-posts" element={<SavedPosts />} />
            <Route path="profile/:username" element={<UserProfile />} />
            <Route path="institution/:name" element={<UniversityProfile />} />
            <Route path="consultant" element={<Consultant />} />
            <Route path="consultation-waiting-room" element={<ConsultationWaitingRoom />} />
            <Route path="visas" element={<VisaPrep />} />
            <Route path="loans" element={<LoanRequirements />} />
            <Route path="loan-eligibility" element={<LoanEligibility />} />
            <Route path="loan-documents" element={<LoanDocuments />} />
            <Route path="lender-selection" element={<LenderSelection />} />
            <Route path="loan-application-timeline" element={<LoanApplicationTimeline />} />
            <Route path="/visa-application/confirm" element={<ConfirmAdmission />} />
            <Route path="/visa-application/documents" element={<VisaDocumentUpload />} />
            <Route path="ai-profile" element={<ProtectedRoute><AskAI /></ProtectedRoute>} />
            <Route path="test-prep/reading-instructions" element={<ReadingTestInstructions />} />
            <Route path="test-prep/reading/submitted" element={<ReadingTestSubmitted />} />
            <Route path="test-prep/writing-instructions" element={<WritingTestInstructions />} />
            <Route path="test-prep/writing" element={<WritingTest />} />

            {/* Guest Explore Routes */}
            <Route path="explore/feed" element={<Feed />} />
            <Route path="explore/community" element={<CommunityFeed />} />
            <Route path="explore/courses" element={<Courses />} />
            <Route path="explore/colleges" element={<CollegeFinder />} />
            <Route path="explore/dashboard" element={<HomeDashboard />} />
            <Route path="explore/test-prep" element={<TestPrep />} />
            <Route path="explore/accommodation" element={<Accommodation />} />
          </Route>

          {/* ═══════════════════════════════════════════════════════════════
              TEST PREP — Standalone (No Layout)
          ═══════════════════════════════════════════════════════════════ */}
          <Route path="/test-prep/listening" element={<ListeningTest />} />
          <Route path="/test-prep/reading" element={<ReadingTest />} />
          <Route path="/test-prep/reading/result" element={<ReadingTestResult />} />
          <Route path="/test-prep/speaking" element={<SpeakingTest />} />

          {/* ═══════════════════════════════════════════════════════════════
              PROFILE SETUP WIZARD
          ═══════════════════════════════════════════════════════════════ */}
          <Route path="/profile-setup" element={<ProtectedRoute><ProfileLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="basic" replace />} />
            <Route path="basic" element={<BasicInfo />} />
            <Route path="education" element={<Education />} />
            <Route path="goals" element={<Goals />} />
            <Route path="completed" element={<ProfileCompleted />} />
          </Route>

          {/* ═══════════════════════════════════════════════════════════════
              APPLICATION WIZARD
          ═══════════════════════════════════════════════════════════════ */}
          <Route path="/application" element={<ProtectedRoute><ApplicationLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="details" replace />} />
            <Route path="details" element={<PersonalDetails />} />
            <Route path="academic" element={<AcademicDetails />} />
            <Route path="documents" element={<Documents />} />
            <Route path="payment" element={<Payment />} />
            <Route path="review" element={<Review />} />
          </Route>
          <Route path="/application/start" element={<ApplicationStart />} />
          <Route path="/application/initiate" element={<InitiateApplication />} />
          <Route path="/application/submitted" element={<ApplicationSubmitted />} />

          {/* ═══════════════════════════════════════════════════════════════
              COUNSELLOR PORTAL — Role-restricted
          ═══════════════════════════════════════════════════════════════ */}
          <Route element={<ProtectedRoute allowedRoles={['counsellor', 'admin', 'super_admin']}><ConsultantLayout /></ProtectedRoute>}>
            <Route path="/counsellor-dashboard" element={<ConsultantDashboard />} />
            <Route path="/counsellor-students" element={<ConsultantStudents />} />
            <Route path="/counsellor-schedule" element={<ConsultantSchedule />} />
            <Route path="/counsellor-tasks" element={<ConsultantTasks />} />
            <Route path="/consultant/university-directory" element={<UniversityDirectory />} />
            <Route path="/consultant/university-details/:id" element={<UniversityDetails />} />
            <Route path="/counsellor-documents" element={<CounsellingChat />} />
            <Route path="/counsellor-profile" element={<CounsellorProfile />} />
            <Route path="/counsellor-performance" element={<PerformanceRatingOverview />} />
            <Route path="/counsellor-assigned-students" element={<AssignedStudents />} />
            <Route path="/counsellor-student-profile" element={<MyProfile />} />
          </Route>

          {/* ═══════════════════════════════════════════════════════════════
              SUPERADMIN PORTAL — Admin/SuperAdmin only
          ═══════════════════════════════════════════════════════════════ */}
          <Route path="/Superadmin" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><Superadmin /></ProtectedRoute>} />
          <Route path="/Superadmin/users" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminUserManagement /></ProtectedRoute>} />
          <Route path="/Superadmin/universities" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminUniversityManagement /></ProtectedRoute>} />
          <Route path="/Superadmin/university/:id" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminUniversityProfile /></ProtectedRoute>} />
          <Route path="/Superadmin/university-portal/posts-feed" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminPostFeedDashboard /></ProtectedRoute>} />
          <Route path="/Superadmin/university-portal/posts-feed/new" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminNewPost /></ProtectedRoute>} />
          <Route path="/Superadmin/university-portal/posts-feed/:id" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminPostDetails /></ProtectedRoute>} />

          {/* ═══════════════════════════════════════════════════════════════
              UNIVERSITY PORTAL
          ═══════════════════════════════════════════════════════════════ */}
          <Route path="/university-panel/:universityName" element={<UniversityDashboard />} />
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
