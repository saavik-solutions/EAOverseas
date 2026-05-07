import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './shared/components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import LandingPage from './website/landing/LandingPage';
import TermsAndConditions from './website/legal/TermsAndConditions';
import CookiePolicy from './website/legal/CookiePolicyPage';
import PrivacyPolicy from './website/legal/PrivacyPolicyPage';
import AboutUs from './website/about-us/AboutUs';
import Team from './website/team/Team';
import ExpertProfile from './website/experts/ExpertProfile';
import Countries from './website/destinations/Countries';
import AllDestinations from './pages/AllDestinations';
import Blogs from './website/blogs/Blogs';
import BlogDetails from './website/blogs/BlogDetails';
import Testimonials from './website/testimonials/Testimonials';
import StudentStory from './website/testimonials/StudentStory';
import HomeDashboard from './roles/student/dashboard/HomeDashboard';
import Courses from './website/courses/Courses';
import Scholarships from './website/scholarships/Scholarships';
import ScholarshipDetails from './website/scholarships/ScholarshipDetails';
import SavedScholarships from './roles/student/saved/SavedScholarships';
import Feed from './website/feed/Feed';
import CommunityFeed from './website/community/CommunityFeed';
import ApplicationDashboard from './roles/student/application/ApplicationDashboard';
import DocumentsDashboard from './roles/student/documents/DocumentsDashboard';
import CollegeFinder from './website/college-finder/CollegeFinder';
import CollegeDetails from './website/college-finder/CollegeDetails';
import CourseDetails from './website/courses/CourseDetails';
import ApplicationLayout from './roles/student/application/wizard/ApplicationLayout';
import PersonalDetails from './roles/student/application/wizard/PersonalDetails';
import AcademicDetails from './roles/student/application/wizard/AcademicDetails';
import Documents from './roles/student/application/wizard/Documents';
import Review from './roles/student/application/wizard/Review';

import ApplicationSubmitted from './roles/student/application/wizard/ApplicationSubmitted';
import ApplicationStart from './roles/student/application/wizard/ApplicationStart';
import InitiateApplication from './roles/student/application/wizard/InitiateApplication';

import FeedDetails from './website/feed/FeedDetails';
import Accommodation from './website/accommodation/Accommodation';
import AccommodationDetails from './website/accommodation/AccommodationDetails';

import MyProfile from './roles/student/profile/MyProfile';
import UserProfile from './website/user-profile/UserProfile';
import UniversityProfile from './website/universities/UniversityProfile';
import EditProfile from './roles/student/profile/EditProfile';
import Consultant from './website/consultants/Consultant';
import ConsultationWaitingRoom from './roles/student/counselling/ConsultationWaitingRoom';
import AccountSettings from './roles/student/settings/AccountSettings';
import NotificationPreferences from './roles/student/settings/NotificationPreferences';
import PrivacySecurity from './roles/student/settings/PrivacySecurity';
import AcademicSnapshotDetails from './roles/super-admin/student-management/AcademicSnapshotDetails';
import Referrals from './roles/student/referrals/Referrals';
import SavedColleges from './roles/student/saved/SavedColleges';
import SavedCourses from './roles/student/saved/SavedCourses';
import SavedAccommodations from './roles/student/saved/SavedAccommodations';
import SavedPosts from './roles/student/saved/SavedPosts';
import VisaPrep from './roles/student/visa/VisaPrep';
import LoanRequirements from './roles/student/loans/LoanRequirements';
import LoanEligibility from './roles/student/loans/LoanEligibility';
import LoanDocuments from './roles/student/loans/LoanDocuments';
import LenderSelection from './roles/student/loans/LenderSelection';
import LoanApplicationTimeline from './roles/student/loans/LoanApplicationTimeline';
import ConfirmAdmission from './roles/student/application/ConfirmAdmission';
import VisaDocumentUpload from './roles/student/visa/VisaDocumentUpload';
import AskAI from './website/ai-assistant/AskAI';
import TestPrep from './roles/student/test-prep/TestPrep';
import TestOverview from './roles/student/test-prep/TestOverview';
import ListeningTest from './roles/student/test-prep/listening/ListeningTest';
import SpeakingTest from './roles/student/test-prep/speaking/SpeakingTest';
import ReadingTestInstructions from './roles/student/test-prep/reading/ReadingTestInstructions';
import ReadingTest from './roles/student/test-prep/reading/ReadingTest';
import ReadingTestResult from './roles/student/test-prep/reading/ReadingTestResult';
import ReadingTestSubmitted from './roles/student/test-prep/reading/ReadingTestSubmitted';
import WritingTestInstructions from './roles/student/test-prep/writing/WritingTestInstructions';
import WritingTest from './roles/student/test-prep/writing/WritingTest';
import ConsultantDashboard from './roles/consultant/dashboard/ConsultantDashboard';
import ConsultantStudents from './roles/consultant/students/ConsultantStudents';
import ConsultantSchedule from './roles/consultant/schedule/ConsultantSchedule';
import ConsultantTasks from './roles/consultant/tasks/ConsultantTasks';
import ConsultantLayout from './layouts/ConsultantLayout';
import CounsellorApplications from './roles/student/counselling/CounsellorApplications';
import CounsellorApplicationDetails from './roles/student/counselling/CounsellorApplicationDetails';
import UniversityDirectory from './website/universities/UniversityDirectory';
import UniversityDetails from './website/universities/UniversityDetails';
import CounsellorProfile from './website/consultants/CounsellorProfile';
import CounsellingChat from './roles/student/counselling/CounsellingChat';
import PerformanceRatingOverview from './roles/student/performance/PerformanceRatingOverview';
import AssignedStudents from './roles/consultant/students/AssignedStudents';
import Superadmin from './roles/super-admin/dashboard/Superadmin';
import SuperAdminUniversityManagement from './roles/super-admin/university-management/SuperAdminUniversityManagement';
import SuperAdminUniversityProfile from './roles/super-admin/university-management/SuperAdminUniversityProfile';
import UniversityPostCenter from './roles/university/posts/UniversityPostCenter';
import UniversityNewPost from './roles/university/posts/UniversityNewPost';
import UniversityAdmissions from './roles/university/admissions/UniversityAdmissions';
import UniversityPostDetails from './roles/university/posts/UniversityPostDetails';
import SuperAdminPostFeedDashboard from './roles/super-admin/feed-management/SuperAdminPostFeedDashboard';
import SuperAdminNewPost from './roles/super-admin/feed-management/SuperAdminNewPost';
import SuperAdminPostDetails from './roles/super-admin/feed-management/SuperAdminPostDetails';
import SuperAdminHolidayManagement from './roles/super-admin/holiday-management/SuperAdminHolidayManagement';
import SuperAdminHolidayDetails from './roles/super-admin/holiday-management/SuperAdminHolidayDetails';
import SuperAdminActivePartners from './roles/super-admin/university-management/SuperAdminActivePartners';
import SuperAdminStudentUniversities from './roles/super-admin/student-management/SuperAdminStudentUniversities';
import SuperAdminStudentCourses from './roles/super-admin/student-management/SuperAdminStudentCourses';
import SuperAdminStudentAccommodation from './roles/super-admin/student-management/SuperAdminStudentAccommodation';
import SuperAdminApplicationDetails from './roles/super-admin/student-management/SuperAdminApplicationDetails';
import SuperAdminSuspendedUniversities from './roles/super-admin/university-management/SuperAdminSuspendedUniversities';
import UniversityDashboard from './roles/university/dashboard/UniversityDashboard';
import UniversityCourses from './roles/university/courses/UniversityCourses';
import UniversityImpressions from './roles/university/analytics/UniversityImpressions';
import UniversityLeads from './roles/university/leads/UniversityLeads';
import UniversityConversion from './roles/university/analytics/UniversityConversion';
import UniversityTotalCourses from './roles/university/courses/UniversityTotalCourses';
import UniversityPanelProfile from './roles/university/profile/UniversityPanelProfile';
import UniversityScholarships from './website/universities/UniversityScholarships';
import UniversityScholarshipDetail from './roles/university/scholarships/UniversityScholarshipDetail';
import UniversityScholarshipList from './roles/university/scholarships/UniversityScholarshipList';

// Profile Pages
import ProfileLayout from './roles/student/profile/setup/ProfileLayout';
import BasicInfo from './roles/student/profile/setup/BasicInfo';
import Education from './roles/student/profile/setup/Education';
import Goals from './roles/student/profile/setup/Goals';
import ProfileCompleted from './roles/student/profile/setup/ProfileCompleted';
import Login from './roles/auth/login/Login';
import Signup from './roles/auth/signup/Signup';
import ForgotPassword from './roles/auth/forgot-password/ForgotPassword';
import Verification from './roles/auth/verification/Verification';
import UniversityVerification from './roles/university/posts/UniversityVerification';
import UniversityPendingVerification from './roles/university/posts/UniversityPendingVerification';
import SuperAdminUserManagement from './roles/super-admin/user-management/SuperAdminUserManagement';
import SuperAdminVerifications from './roles/super-admin/verifications/SuperAdminVerifications';
import SuperAdminConsultantManagement from './roles/super-admin/consultant-management/SuperAdminConsultantManagement';
import SuperAdminConsultantDirectory from './roles/super-admin/consultant-management/SuperAdminConsultantDirectory';
import SuperAdminConsultantDetails from './roles/super-admin/consultant-management/SuperAdminConsultantDetails';
import SuperAdminConsultantRatings from './roles/super-admin/consultant-management/SuperAdminConsultantRatings';

import { SavedItemsProvider } from './shared/contexts/SavedItemsContext';
import { UserProfileProvider } from './shared/contexts/UserProfileContext';
import { NotificationProvider } from './shared/contexts/NotificationContext';
import { useAuth } from './shared/contexts/AuthContext';
import { PostsProvider } from './shared/contexts/PostsContext';
import ProtectedRoute from './shared/components/ProtectedRoute';

const HomeRoute = () => {
    // Redirect ALL users to Landing Page first
    return <Navigate to="/landing" replace />;
};

import CountryDetails from './website/destinations/CountryDetails';

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
