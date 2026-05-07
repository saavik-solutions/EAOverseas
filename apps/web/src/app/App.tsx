import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from '@/shared/components/ui/ScrollToTop';
import MainLayout from '@/layouts/MainLayout';
import LandingPage from '@/features/explore/pages/LandingPage';
import TermsAndConditions from '@/features/content/pages/TermsAndConditions';
import CookiePolicy from '@/features/content/pages/CookiePolicyPage';
import PrivacyPolicy from '@/features/content/pages/PrivacyPolicyPage';
import AboutUs from '@/features/content/pages/AboutUs';
import Team from '@/features/content/pages/Team';
import ExpertProfile from '@/features/content/pages/ExpertProfile';
import Countries from '@/features/explore/pages/Countries';
import AllDestinations from '@/features/explore/pages/AllDestinations';
import Blogs from '@/features/content/pages/Blogs';
import BlogDetails from '@/features/content/pages/BlogDetails';
import Testimonials from '@/features/content/pages/Testimonials';
import StudentStory from '@/features/content/pages/StudentStory';
import HomeDashboard from '@/features/dashboard/pages/HomeDashboard';
import Courses from '@/features/courses/pages/Courses';
import Scholarships from '@/features/scholarships/pages/Scholarships';
import ScholarshipDetails from '@/features/scholarships/pages/ScholarshipDetails';
import SavedScholarships from '@/features/scholarships/pages/SavedScholarships';
import Feed from '@/features/feed/pages/Feed';
import CommunityFeed from '@/features/community/pages/CommunityFeed';
import ApplicationDashboard from '@/features/applications/pages/ApplicationDashboard';
import DocumentsDashboard from '@/features/documents/pages/DocumentsDashboard';
import CollegeFinder from '@/features/colleges/pages/CollegeFinder';
import CollegeDetails from '@/features/colleges/pages/CollegeDetails';
import CourseDetails from '@/features/courses/pages/CourseDetails';
import ApplicationLayout from '@/features/applications/wizard/ApplicationLayout';
import PersonalDetails from '@/features/applications/wizard/PersonalDetails';
import AcademicDetails from '@/features/applications/wizard/AcademicDetails';
import Documents from '@/features/applications/wizard/Documents';
import Review from '@/features/applications/wizard/Review';

import ApplicationSubmitted from '@/features/applications/wizard/ApplicationSubmitted';
import ApplicationStart from '@/features/applications/wizard/ApplicationStart';
import InitiateApplication from '@/features/applications/wizard/InitiateApplication';

import FeedDetails from '@/features/feed/pages/FeedDetails';
import Accommodation from '@/features/accommodation/pages/Accommodation';
import AccommodationDetails from '@/features/accommodation/pages/AccommodationDetails';

import MyProfile from '@/features/profile/pages/MyProfile';
import UserProfile from '@/features/profile/pages/UserProfile';
import UniversityProfile from '@/features/university-portal/pages/UniversityProfile';
import EditProfile from '@/features/profile/pages/EditProfile';
import Consultant from '@/features/consultations/pages/Consultant';
import ConsultationWaitingRoom from '@/features/consultations/pages/ConsultationWaitingRoom';
import AccountSettings from '@/features/profile/pages/AccountSettings';
import NotificationPreferences from '@/features/profile/pages/NotificationPreferences';
import PrivacySecurity from '@/features/profile/pages/PrivacySecurity';
import AcademicSnapshotDetails from '@/features/profile/pages/AcademicSnapshotDetails';
import Referrals from '@/features/explore/pages/Referrals';
import SavedColleges from '@/features/saved-items/pages/SavedColleges';
import SavedCourses from '@/features/saved-items/pages/SavedCourses';
import SavedAccommodations from '@/features/saved-items/pages/SavedAccommodations';
import SavedPosts from '@/features/saved-items/pages/SavedPosts';
import VisaPrep from '@/features/visa/pages/VisaPrep';
import LoanRequirements from '@/features/loans/pages/LoanRequirements';
import LoanEligibility from '@/features/loans/pages/LoanEligibility';
import LoanDocuments from '@/features/loans/pages/LoanDocuments';
import LenderSelection from '@/features/loans/pages/LenderSelection';
import LoanApplicationTimeline from '@/features/loans/pages/LoanApplicationTimeline';
import ConfirmAdmission from '@/features/visa/pages/ConfirmAdmission';
import VisaDocumentUpload from '@/features/visa/pages/VisaDocumentUpload';
import AskAI from '@/features/ai-assistant/pages/AskAI';
import TestPrep from '@/features/test-prep/pages/TestPrep';
import TestOverview from '@/features/test-prep/pages/TestOverview';
import ListeningTest from '@/features/test-prep/pages/ListeningTest';
import SpeakingTest from '@/features/test-prep/pages/SpeakingTest';
import ReadingTestInstructions from '@/features/test-prep/pages/ReadingTestInstructions';
import ReadingTest from '@/features/test-prep/pages/ReadingTest';
import ReadingTestResult from '@/features/test-prep/pages/ReadingTestResult';
import ReadingTestSubmitted from '@/features/test-prep/pages/ReadingTestSubmitted';
import WritingTestInstructions from '@/features/test-prep/pages/WritingTestInstructions';
import WritingTest from '@/features/test-prep/pages/WritingTest';
import ConsultantDashboard from '@/features/counsellor-portal/pages/ConsultantDashboard';
import ConsultantStudents from '@/features/counsellor-portal/pages/ConsultantStudents';
import ConsultantSchedule from '@/features/counsellor-portal/pages/ConsultantSchedule';
import ConsultantTasks from '@/features/counsellor-portal/pages/ConsultantTasks';
import ConsultantLayout from '@/layouts/ConsultantLayout';
import CounsellorApplications from '@/features/counsellor-portal/pages/CounsellorApplications';
import CounsellorApplicationDetails from '@/features/counsellor-portal/pages/CounsellorApplicationDetails';
import UniversityDirectory from '@/features/colleges/pages/UniversityDirectory';
import UniversityDetails from '@/features/colleges/pages/UniversityDetails';
import CounsellorProfile from '@/features/counsellor-portal/pages/CounsellorProfile';
import CounsellingChat from '@/features/counsellor-portal/pages/CounsellingChat';
import PerformanceRatingOverview from '@/features/counsellor-portal/pages/PerformanceRatingOverview';
import AssignedStudents from '@/features/counsellor-portal/pages/AssignedStudents';
import Superadmin from '@/features/superadmin/pages/Superadmin';
import SuperAdminUniversityManagement from '@/features/superadmin/pages/SuperAdminUniversityManagement';
import SuperAdminUniversityProfile from '@/features/superadmin/pages/SuperAdminUniversityProfile';
import UniversityPostCenter from '@/features/university-portal/pages/UniversityPostCenter';
import UniversityNewPost from '@/features/university-portal/pages/UniversityNewPost';
import UniversityAdmissions from '@/features/university-portal/pages/UniversityAdmissions';
import UniversityPostDetails from '@/features/university-portal/pages/UniversityPostDetails';
import SuperAdminPostFeedDashboard from '@/features/superadmin/pages/SuperAdminPostFeedDashboard';
import SuperAdminNewPost from '@/features/superadmin/pages/SuperAdminNewPost';
import SuperAdminPostDetails from '@/features/superadmin/pages/SuperAdminPostDetails';
import SuperAdminHolidayManagement from '@/features/superadmin/pages/SuperAdminHolidayManagement';
import SuperAdminHolidayDetails from '@/features/superadmin/pages/SuperAdminHolidayDetails';
import SuperAdminActivePartners from '@/features/superadmin/pages/SuperAdminActivePartners';
import SuperAdminStudentUniversities from '@/features/superadmin/pages/SuperAdminStudentUniversities';
import SuperAdminStudentCourses from '@/features/superadmin/pages/SuperAdminStudentCourses';
import SuperAdminStudentAccommodation from '@/features/superadmin/pages/SuperAdminStudentAccommodation';
import SuperAdminApplicationDetails from '@/features/superadmin/pages/SuperAdminApplicationDetails';
import SuperAdminSuspendedUniversities from '@/features/superadmin/pages/SuperAdminSuspendedUniversities';
import UniversityDashboard from '@/features/university-portal/pages/UniversityDashboard';
import UniversityCourses from '@/features/university-portal/pages/UniversityCourses';
import UniversityImpressions from '@/features/university-portal/pages/UniversityImpressions';
import UniversityLeads from '@/features/university-portal/pages/UniversityLeads';
import UniversityConversion from '@/features/university-portal/pages/UniversityConversion';
import UniversityTotalCourses from '@/features/university-portal/pages/UniversityTotalCourses';
import UniversityPanelProfile from '@/features/university-portal/pages/UniversityPanelProfile';
import UniversityScholarships from '@/features/university-portal/pages/scholarships/UniversityScholarships';
import UniversityScholarshipDetail from '@/features/university-portal/pages/UniversityScholarshipDetail';
import UniversityScholarshipList from '@/features/university-portal/pages/UniversityScholarshipList';

// Profile Pages
import ProfileLayout from '@/features/profile/wizard/ProfileLayout';
import BasicInfo from '@/features/profile/wizard/BasicInfo';
import Education from '@/features/profile/wizard/Education';
import Goals from '@/features/profile/wizard/Goals';
import ProfileCompleted from '@/features/profile/wizard/ProfileCompleted';
import Login from '@/features/auth/pages/Login';
import Signup from '@/features/auth/pages/Signup';
import ForgotPassword from '@/features/auth/pages/ForgotPassword';
import Verification from '@/features/auth/pages/Verification';
import UniversityVerification from '@/features/university-portal/pages/UniversityVerification';
import UniversityPendingVerification from '@/features/university-portal/pages/UniversityPendingVerification';
import SuperAdminUserManagement from '@/features/superadmin/pages/SuperAdminUserManagement';
import SuperAdminVerifications from '@/features/superadmin/pages/SuperAdminVerifications';
import SuperAdminConsultantManagement from '@/features/superadmin/pages/SuperAdminConsultantManagement';
import SuperAdminConsultantDirectory from '@/features/superadmin/pages/SuperAdminConsultantDirectory';
import SuperAdminConsultantDetails from '@/features/superadmin/pages/SuperAdminConsultantDetails';
import SuperAdminConsultantRatings from '@/features/superadmin/pages/SuperAdminConsultantRatings';

import { SavedItemsProvider } from '@/features/saved-items/context/SavedItemsContext';
import { UserProfileProvider } from '@/features/profile/context/UserProfileContext';
import { NotificationProvider } from '@/features/notifications/context/NotificationContext';
import { useAuth } from '@/features/auth';
import { PostsProvider } from '@/features/feed/services/PostsContext';
import ProtectedRoute from '@/shared/components/ProtectedRoute';

const HomeRoute = () => {
    // Redirect ALL users to Landing Page first
    return <Navigate to="/landing" replace />;
};

import CountryDetails from '@/features/explore/pages/CountryDetails';

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
                                <Route path="scholarships" element={<Scholarships />} />
                                <Route path="scholarship-details/:id" element={<ScholarshipDetails />} />
                                <Route path="saved-scholarships" element={<SavedScholarships />} />
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
                                 <Route path="review" element={<Review />} />
                                 <Route path="payment" element={<Navigate to="../review" replace />} />
                             </Route>

                            <Route path="/application/start" element={<ApplicationStart />} />
                            <Route path="/application/initiate" element={<InitiateApplication />} />
                            <Route path="/application/submitted" element={<ApplicationSubmitted />} />

                             <Route element={<ProtectedRoute allowedRoles={['counsellor', 'admin', 'super_admin']}><ConsultantLayout /></ProtectedRoute>}>
                                 <Route path="/counsellor-dashboard" element={<ConsultantDashboard />} />
                                 <Route path="/counsellor/applications" element={<CounsellorApplications />} />
                                 <Route path="/counsellor/applications/:id" element={<CounsellorApplicationDetails />} />
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
                             <Route path="/superadmin/student-activity/universities" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminStudentUniversities /></ProtectedRoute>} />
                             <Route path="/superadmin/student-activity/courses" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminStudentCourses /></ProtectedRoute>} />
                             <Route path="/superadmin/student-activity/accommodation" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminStudentAccommodation /></ProtectedRoute>} />
                             <Route path="/superadmin/application/:id" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminApplicationDetails /></ProtectedRoute>} />
                             <Route path="/superadmin/verifications" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminVerifications /></ProtectedRoute>} />
                             <Route path="/superadmin/users" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminUserManagement /></ProtectedRoute>} />
                             <Route path="/superadmin/universities" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminUniversityManagement /></ProtectedRoute>} />
                             <Route path="/superadmin/universities/active" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminActivePartners /></ProtectedRoute>} />
                             <Route path="/superadmin/universities/suspended" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminSuspendedUniversities /></ProtectedRoute>} />
                             <Route path="/superadmin/consultants" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminConsultantManagement /></ProtectedRoute>} />
                             <Route path="/superadmin/consultants/directory" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminConsultantDirectory /></ProtectedRoute>} />
                             <Route path="/superadmin/consultant/profile/:id" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminConsultantDetails /></ProtectedRoute>} />
                             <Route path="/superadmin/consultant/ratings/:id" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminConsultantRatings /></ProtectedRoute>} />
                             <Route path="/superadmin/university/:id" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminUniversityProfile /></ProtectedRoute>} />
                             <Route path="/superadmin/university-portal/posts-feed" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminPostFeedDashboard /></ProtectedRoute>} />
                             <Route path="/superadmin/university-portal/posts-feed/new" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminNewPost /></ProtectedRoute>} />
                             <Route path="/superadmin/university-portal/posts-feed/:id" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminPostDetails /></ProtectedRoute>} />
                             <Route path="/superadmin/consultants/holidays" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminHolidayManagement /></ProtectedRoute>} />
                             <Route path="/superadmin/consultants/holidays/:id" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><SuperAdminHolidayDetails /></ProtectedRoute>} />

                            {/* University Portal Routes */}
                            <Route path="/university-panel/:universityName" element={<UniversityDashboard />} />
                            <Route path="/university-panel/:universityName/courses" element={<UniversityCourses />} />
                            <Route path="/university-panel/:universityName/admissions" element={<UniversityAdmissions />} />
                            <Route path="/university-panel/:universityName/analytics" element={<UniversityImpressions />} />
                            <Route path="/university-panel/:universityName/leads" element={<UniversityLeads />} />
                            <Route path="/university-panel/:universityName/total-courses" element={<UniversityTotalCourses />} />
                            <Route path="/university-panel/:universityName/conversion" element={<UniversityConversion />} />
                             <Route path="/university-panel/:universityName/university-profile" element={<UniversityPanelProfile />} />
                             <Route path="/university-panel/:universityName/scholarships" element={<UniversityScholarships />} />
                            <Route path="/university-panel/:universityName/scholarships/list" element={<UniversityScholarshipList />} />
                            <Route path="/university-panel/:universityName/scholarships/:scholarshipId" element={<UniversityScholarshipDetail />} />
                            <Route path="/university-panel/:universityName/post-center" element={<UniversityPostCenter />} />
                            <Route path="/university-panel/:universityName/post-center/new" element={<UniversityNewPost />} />
                            <Route path="/university-panel/:universityName/post-center/:postId" element={<UniversityPostDetails />} />
                            <Route path="/university-panel/:universityName/post-center/edit/:postId" element={<UniversityNewPost />} />
                        </Routes>
                    </BrowserRouter>
                    </PostsProvider>
                </UserProfileProvider >
            </SavedItemsProvider >
        </NotificationProvider >
    );
}

export default App;
