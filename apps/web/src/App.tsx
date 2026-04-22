import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import TermsAndConditions from './pages/TermsAndConditions';
import CookiePolicy from './pages/CookiePolicyPage';
import PrivacyPolicy from './pages/PrivacyPolicyPage';
import AboutUs from './pages/AboutUs';
import Team from './pages/Team';
import ExpertProfile from './pages/ExpertProfile';
import Countries from './pages/Countries';
import AllDestinations from './pages/AllDestinations';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import Testimonials from './pages/Testimonials';
import StudentStory from './pages/StudentStory';
import HomeDashboard from './pages/HomeDashboard';
import Courses from './pages/Courses';
import Feed from './pages/Feed';
import CommunityFeed from './pages/CommunityFeed';
import ApplicationDashboard from './pages/ApplicationDashboard';
import DocumentsDashboard from './pages/DocumentsDashboard';
import CollegeFinder from './pages/CollegeFinder';
import CollegeDetails from './pages/CollegeDetails';
import CourseDetails from './pages/CourseDetails';
import ApplicationLayout from './pages/application/ApplicationLayout';
import PersonalDetails from './pages/application/PersonalDetails';
import AcademicDetails from './pages/application/AcademicDetails';
import Documents from './pages/application/Documents';
import Payment from './pages/application/Payment';
import Review from './pages/application/Review';

import ApplicationSubmitted from './pages/application/ApplicationSubmitted';
import ApplicationStart from './pages/application/ApplicationStart';
import InitiateApplication from './pages/application/InitiateApplication';

import FeedDetails from './pages/FeedDetails';
import Accommodation from './pages/Accommodation';
import AccommodationDetails from './pages/AccommodationDetails';

import MyProfile from './pages/MyProfile';
import UserProfile from './pages/UserProfile';
import UniversityProfile from './pages/UniversityProfile';
import EditProfile from './pages/EditProfile';
import Consultant from './pages/Consultant';
import ConsultationWaitingRoom from './pages/ConsultationWaitingRoom';
import AccountSettings from './pages/AccountSettings';
import NotificationPreferences from './pages/NotificationPreferences';
import PrivacySecurity from './pages/PrivacySecurity';
import AcademicSnapshotDetails from './pages/AcademicSnapshotDetails';
import Referrals from './pages/Referrals';
import SavedColleges from './pages/SavedColleges';
import SavedCourses from './pages/SavedCourses';
import SavedAccommodations from './pages/SavedAccommodations';
import SavedPosts from './pages/SavedPosts';
import VisaPrep from './pages/VisaPrep';
import LoanRequirements from './pages/LoanRequirements';
import LoanEligibility from './pages/LoanEligibility';
import LoanDocuments from './pages/LoanDocuments';
import LenderSelection from './pages/LenderSelection';
import LoanApplicationTimeline from './pages/LoanApplicationTimeline';
import ConfirmAdmission from './pages/ConfirmAdmission';
import VisaDocumentUpload from './pages/VisaDocumentUpload';
import AskAI from './pages/AskAI';
import TestPrep from './pages/TestPrep';
import TestOverview from './pages/TestOverview';
import ListeningTest from './pages/ListeningTest';
import SpeakingTest from './pages/SpeakingTest';
import ReadingTestInstructions from './pages/ReadingTestInstructions';
import ReadingTest from './pages/ReadingTest';
import ReadingTestResult from './pages/ReadingTestResult';
import ReadingTestSubmitted from './pages/ReadingTestSubmitted';
import WritingTestInstructions from './pages/WritingTestInstructions';
import WritingTest from './pages/WritingTest';
import ConsultantDashboard from './pages/ConsultantDashboard';
import ConsultantStudents from './pages/ConsultantStudents';
import ConsultantSchedule from './pages/ConsultantSchedule';
import ConsultantTasks from './pages/ConsultantTasks';
import ConsultantLayout from './layouts/ConsultantLayout';
import UniversityDirectory from './pages/UniversityDirectory';
import UniversityDetails from './pages/UniversityDetails';
import CounsellorProfile from './pages/CounsellorProfile';
import CounsellingChat from './pages/CounsellingChat';
import PerformanceRatingOverview from './pages/PerformanceRatingOverview';
import AssignedStudents from './pages/AssignedStudents';
import Superadmin from './pages/Superadmin';
import SuperAdminUniversityManagement from './pages/SuperAdminUniversityManagement';
import SuperAdminUniversityProfile from './pages/SuperAdminUniversityProfile';
import SuperAdminPostFeedDashboard from './pages/SuperAdminPostFeedDashboard';
import SuperAdminNewPost from './pages/SuperAdminNewPost';
import SuperAdminPostDetails from './pages/SuperAdminPostDetails';
import UniversityDashboard from './pages/UniversityDashboard';

// Profile Pages
import ProfileLayout from './pages/profile/ProfileLayout';
import BasicInfo from './pages/profile/BasicInfo';
import Education from './pages/profile/Education';
import Goals from './pages/profile/Goals';
import ProfileCompleted from './pages/profile/ProfileCompleted';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Verification from './pages/Verification';
import UniversityVerification from './pages/UniversityVerification';
import UniversityPendingVerification from './pages/UniversityPendingVerification';
import SuperAdminUserManagement from './pages/SuperAdminUserManagement';

import { SavedItemsProvider } from './context/SavedItemsContext';
import { UserProfileProvider } from './context/UserProfileContext';
import { NotificationProvider } from './context/NotificationContext';
import { useAuth } from './context/AuthContext';
import { PostsProvider } from './shared/contexts/PostsContext';
import ProtectedRoute from './components/ProtectedRoute';

const HomeRoute = () => {
    // Redirect ALL users to Landing Page first
    return <Navigate to="/landing" replace />;
};

import CountryDetails from './pages/CountryDetails';

function App() {
    return (
        <NotificationProvider>
            <SavedItemsProvider>
                <UserProfileProvider>
                    <PostsProvider>
                        <BrowserRouter>
                        <ScrollToTop />
                        <Routes>
                            <Route path="/landing" element={<LandingPage />} />
                            <Route path="/test" element={<div className="p-20 text-4xl bg-red-500 text-white">TEST PAGE WORKING</div>} />
                            <Route path="/terms" element={<TermsAndConditions />} />
                            <Route path="/cookie-policy" element={<CookiePolicy />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
                            <Route path="/" element={<MainLayout />}>
                                <Route index element={<HomeRoute />} />
                                <Route path="dashboard" element={<ProtectedRoute><HomeDashboard /></ProtectedRoute>} />
                                <Route path="courses" element={<Courses />} />
                                <Route path="feed" element={<Feed />} />
                                <Route path="community-feed" element={<CommunityFeed />} />
                                <Route path="feed-details/:id" element={<FeedDetails />} /> {/* Feed Details Route */}
                                <Route path="colleges" element={<CollegeFinder />} />
                                <Route path="college-details" element={<CollegeDetails />} />
                                <Route path="course-details" element={<CourseDetails />} /> {/* Course Details Route */}

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

                                {/* Guest Specific Routes */}
                                <Route path="explore/feed" element={<Feed />} />
                                <Route path="explore/community" element={<CommunityFeed />} />
                                <Route path="explore/courses" element={<Courses />} />
                                <Route path="explore/colleges" element={<CollegeFinder />} />
                                <Route path="explore/dashboard" element={<HomeDashboard />} />
                                <Route path="explore/test-prep" element={<TestPrep />} />
                                <Route path="explore/accommodation" element={<Accommodation />} />
                            </Route>

                            {/* Test Prep Routes (Standalone - No Layout) */}
                            <Route path="/test-prep/listening" element={<ListeningTest />} />
                            <Route path="/test-prep/reading" element={<ReadingTest />} />
                            <Route path="/test-prep/reading/result" element={<ReadingTestResult />} />
                            <Route path="/test-prep/speaking" element={<SpeakingTest />} />

                            {/* Profile Wizard Routes */}
                             <Route path="/profile-setup" element={<ProtectedRoute><ProfileLayout /></ProtectedRoute>}>
                                 <Route index element={<Navigate to="basic" replace />} />
                                 <Route path="basic" element={<BasicInfo />} />
                                 <Route path="education" element={<Education />} />
                                 <Route path="goals" element={<Goals />} />
                                 <Route path="completed" element={<ProfileCompleted />} />
                             </Route>

                            {/* Application Layout Routes */}
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

                            {/* Consultant Resources */}

                            {/* Auth Routes */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/verification" element={<Verification />} />
                            <Route path="/university-verification" element={<UniversityVerification />} />
                            <Route path="/university-pending-verification" element={<UniversityPendingVerification />} />
                             <Route path="/superadmin" element={<Superadmin />} />
                             <Route path="/superadmin/users" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminUserManagement /></ProtectedRoute>} />
                             <Route path="/superadmin/universities" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminUniversityManagement /></ProtectedRoute>} />
                             <Route path="/superadmin/university/:id" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminUniversityProfile /></ProtectedRoute>} />
                             <Route path="/superadmin/university-portal/posts-feed" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminPostFeedDashboard /></ProtectedRoute>} />
                             <Route path="/superadmin/university-portal/posts-feed/new" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminNewPost /></ProtectedRoute>} />
                             <Route path="/superadmin/university-portal/posts-feed/:id" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminPostDetails /></ProtectedRoute>} />

                            {/* University Portal Routes */}
                            <Route path="/university-panel/:universityName" element={<UniversityDashboard />} />
                        </Routes>
                    </BrowserRouter>
                    </PostsProvider>
                </UserProfileProvider >
            </SavedItemsProvider >
        </NotificationProvider >
    );
}

export default App;
