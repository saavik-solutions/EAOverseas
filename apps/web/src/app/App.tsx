import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from '@workspace/ui';
import MainLayout from '@/layouts/MainLayout';
import LandingPage from '@/pages/LandingPage';
import TermsAndConditions from '@/pages/TermsAndConditions';
import CookiePolicy from '@/pages/CookiePolicyPage';
import PrivacyPolicy from '@/pages/PrivacyPolicyPage';
import AboutUs from '@/pages/AboutUs';
import Team from '@/pages/Team';
import ExpertProfile from '@/pages/ExpertProfile';
import Countries from '@/pages/Countries';
import AllDestinations from '@/pages/AllDestinations';
import Blogs from '@/pages/Blogs';
import BlogDetails from '@/pages/BlogDetails';
import Testimonials from '@/pages/Testimonials';
import StudentStory from '@/pages/StudentStory';
import HomeDashboard from '@/pages/HomeDashboard';
import Courses from '@/pages/Courses';
import Feed from '@/pages/Feed';
import CommunityFeed from '@/pages/CommunityFeed';
import ApplicationDashboard from '@/pages/ApplicationDashboard';
import DocumentsDashboard from '@/pages/DocumentsDashboard';
import CollegeFinder from '@/pages/CollegeFinder';
import CollegeDetails from '@/pages/CollegeDetails';
import CourseDetails from '@/pages/CourseDetails';
import ApplicationLayout from '@/pages/application/ApplicationLayout';
import PersonalDetails from '@/pages/application/PersonalDetails';
import AcademicDetails from '@/pages/application/AcademicDetails';
import Documents from '@/pages/application/Documents';
import Review from '@/pages/application/Review';

import ApplicationSubmitted from '@/pages/application/ApplicationSubmitted';
import ApplicationStart from '@/pages/application/ApplicationStart';
import InitiateApplication from '@/pages/application/InitiateApplication';

import FeedDetails from '@/pages/FeedDetails';
import Accommodation from '@/pages/Accommodation';
import AccommodationDetails from '@/pages/AccommodationDetails';

import MyProfile from '@/pages/MyProfile';
import UserProfile from '@/pages/UserProfile';
import UniversityProfile from '@/pages/UniversityProfile';
import EditProfile from '@/pages/EditProfile';
import Consultant from '@/pages/Consultant';
import ConsultationWaitingRoom from '@/pages/ConsultationWaitingRoom';
import AccountSettings from '@/pages/AccountSettings';
import NotificationPreferences from '@/pages/NotificationPreferences';
import PrivacySecurity from '@/pages/PrivacySecurity';
import AcademicSnapshotDetails from '@/pages/AcademicSnapshotDetails';
import Referrals from '@/pages/Referrals';
import SavedColleges from '@/pages/SavedColleges';
import SavedCourses from '@/pages/SavedCourses';
import SavedAccommodations from '@/pages/SavedAccommodations';
import SavedPosts from '@/pages/SavedPosts';
import VisaPrep from '@/pages/VisaPrep';
import LoanRequirements from '@/pages/LoanRequirements';
import LoanEligibility from '@/pages/LoanEligibility';
import LoanDocuments from '@/pages/LoanDocuments';
import LenderSelection from '@/pages/LenderSelection';
import LoanApplicationTimeline from '@/pages/LoanApplicationTimeline';
import ConfirmAdmission from '@/pages/ConfirmAdmission';
import VisaDocumentUpload from '@/pages/VisaDocumentUpload';
import AskAI from '@/pages/AskAI';
import TestPrep from '@/pages/TestPrep';
import TestOverview from '@/pages/TestOverview';
import ListeningTest from '@/pages/ListeningTest';
import SpeakingTest from '@/pages/SpeakingTest';
import ReadingTestInstructions from '@/pages/ReadingTestInstructions';
import ReadingTest from '@/pages/ReadingTest';
import ReadingTestResult from '@/pages/ReadingTestResult';
import ReadingTestSubmitted from '@/pages/ReadingTestSubmitted';
import WritingTestInstructions from '@/pages/WritingTestInstructions';
import WritingTest from '@/pages/WritingTest';
import ConsultantDashboard from '@/pages/ConsultantDashboard';
import ConsultantStudents from '@/pages/ConsultantStudents';
import ConsultantSchedule from '@/pages/ConsultantSchedule';
import ConsultantTasks from '@/pages/ConsultantTasks';
import ConsultantLayout from '@/layouts/ConsultantLayout';
import UniversityDirectory from '@/pages/UniversityDirectory';
import UniversityDetails from '@/pages/UniversityDetails';
import CounsellorProfile from '@/pages/CounsellorProfile';
import CounsellingChat from '@/pages/CounsellingChat';
import PerformanceRatingOverview from '@/pages/PerformanceRatingOverview';
import AssignedStudents from '@/pages/AssignedStudents';
import Superadmin from '@/pages/Superadmin';
import SuperAdminUniversityManagement from '@/pages/SuperAdminUniversityManagement';
import SuperAdminUniversityProfile from '@/pages/SuperAdminUniversityProfile';
import ActivePartnersPage from '@/pages/ActivePartnersPage';
import TopPerformersPage from '@/pages/TopPerformersPage';
import ApplicationsAnalyticsPage from '@/pages/ApplicationsAnalyticsPage';
import AllApplicationsPage from '@/pages/AllApplicationsPage';
import SuperAdminConsultantManagement from '@/pages/SuperAdminConsultantManagement';
import UniversityDashboard from '@/pages/UniversityDashboard';
import PostCenter from '@/pages/PostCenter';
import UniversityManagementProfile from '@/pages/UniversityManagementProfile';
import UniversityScholarship from '@/pages/UniversityScholarship';
import ScholarshipAnalytics from '@/pages/ScholarshipAnalytics';
import UniversityPrograms from '@/pages/UniversityPrograms';
import Scholarships from '@/pages/Scholarships';
import ScholarshipDetails from '@/pages/ScholarshipDetails';
import MyScholarshipApplications from '@/pages/MyScholarshipApplications';
import ConsultantApplications from '@/pages/ConsultantApplications.tsx';
import SuperAdminAvailableCounsellors from '@/pages/SuperAdminAvailableCounsellors';
import SuperAdminActiveTodayCounsellors from '@/pages/SuperAdminActiveTodayCounsellors';
import UniversityScraper from '@/pages/UniversityScraper';


import UniversityApplications from '@/pages/UniversityApplications';
import UniversityPublishedPosts from '@/pages/UniversityPublishedPosts';

// PAI Module
import ProfileForm from '@/modules/pai/pages/ProfileForm';
import ResumeUpload from '@/modules/pai/pages/ResumeUpload';
import LinkedInImport from '@/modules/pai/pages/LinkedInImport';
import PAILanding from '@/modules/pai/pages/PAILanding';
import GitHubAnalysis from '@/modules/pai/pages/GitHubAnalysis';
import PortfolioAnalysis from '@/modules/pai/pages/PortfolioAnalysis';
import PAILoadingScreen from '@/modules/pai/pages/PAILoadingScreen';
import ProfileIntelligenceReport from '@/modules/pai/pages/ProfileIntelligenceReport';


// Profile Pages
import ProfileLayout from '@/pages/profile/ProfileLayout';
import BasicInfo from '@/pages/profile/BasicInfo';
import Education from '@/pages/profile/Education';
import Goals from '@/pages/profile/Goals';
import ProfileCompleted from '@/pages/profile/ProfileCompleted';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ForgotPassword from '@/pages/ForgotPassword';
import Verification from '@/pages/Verification';
import UniversityVerification from '@/pages/UniversityVerification';
import UniversityPendingVerification from '@/pages/UniversityPendingVerification';

import { SavedItemsProvider } from '@/shared/contexts/SavedItemsContext';
import { UserProfileProvider } from '@/shared/contexts/UserProfileContext';
import { NotificationProvider } from '@/shared/contexts/NotificationContext';
import { PostsProvider } from '@/shared/contexts/PostsContext';
import { ScholarshipsProvider } from '@/shared/contexts/ScholarshipsContext';
import { ApplicationsProvider } from '@/shared/contexts/ApplicationsContext';
import { useAuth } from '@/shared/contexts/AuthContext';
import ProtectedRoute from '@/shared/components/ProtectedRoute';

import CountryDetails from '@/pages/CountryDetails';

const HomeRoute = () => {
    const { user } = useAuth();
    if (user) {
        return <Navigate to="/dashboard" replace />;
    }
    return <LandingPage />;
};

function App() {
    return (
        <NotificationProvider>
            <SavedItemsProvider>
                <UserProfileProvider>
                    <PostsProvider>
                        <ScholarshipsProvider>
                            <ApplicationsProvider>
                                <BrowserRouter>
                                    <ScrollToTop />
                                    <Routes>
                                        <Route path="/" element={<HomeRoute />} />
                                        <Route path="/landing" element={<Navigate to="/" replace />} />
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

                                        {/* Auth Routes */}
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/signup" element={<Signup />} />
                                        <Route path="/forgot-password" element={<ForgotPassword />} />
                                        <Route path="/verification" element={<Verification />} />
                                        <Route path="/university-verification" element={<UniversityVerification />} />
                                        <Route path="/university-pending-verification" element={<UniversityPendingVerification />} />

                                        {/* Gated Student Portal */}
                                        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                                            <Route path="/dashboard" element={<HomeDashboard />} />
                                            <Route path="/courses" element={<Courses />} />
                                            <Route path="/feed" element={<Feed />} />
                                            <Route path="/community-feed" element={<CommunityFeed />} />
                                            <Route path="feed-details/:id" element={<FeedDetails />} />
                                            <Route path="colleges" element={<CollegeFinder />} />
                                            <Route path="college-details" element={<CollegeDetails />} />
                                            <Route path="course-details" element={<CourseDetails />} />
                                            <Route path="scholarships" element={<Scholarships />} />
                                            <Route path="scholarship-details/:id" element={<ScholarshipDetails />} />
                                            <Route path="scholarship-applications" element={<MyScholarshipApplications />} />

                                            <Route path="test-prep" element={<TestPrep />} />
                                            <Route path="test-prep/overview" element={<TestOverview />} />
                                            <Route path="accommodation" element={<Accommodation />} />
                                            <Route path="accommodation-details" element={<AccommodationDetails />} />
                                            <Route path="applications" element={<ApplicationDashboard />} />
                                            <Route path="documents" element={<DocumentsDashboard />} />
                                            <Route path="profile" element={<MyProfile />} />
                                            <Route path="profile/edit" element={<EditProfile />} />
                                            <Route path="account-settings" element={<AccountSettings />} />
                                            <Route path="notification-preferences" element={<NotificationPreferences />} />
                                            <Route path="privacy-security" element={<PrivacySecurity />} />
                                            <Route path="profile/academic-snapshot" element={<AcademicSnapshotDetails />} />
                                            <Route path="referrals" element={<Referrals />} />
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
                                            <Route path="ai-profile" element={<AskAI />} />
                                            <Route path="test-prep/reading-instructions" element={<ReadingTestInstructions />} />
                                            <Route path="test-prep/reading/submitted" element={<ReadingTestSubmitted />} />
                                            <Route path="test-prep/writing-instructions" element={<WritingTestInstructions />} />
                                            <Route path="test-prep/writing" element={<WritingTest />} />

                                            <Route path="explore/feed" element={<Feed />} />
                                            <Route path="explore/community" element={<CommunityFeed />} />
                                            <Route path="explore/courses" element={<Courses />} />
                                            <Route path="explore/colleges" element={<CollegeFinder />} />
                                            <Route path="explore/dashboard" element={<HomeDashboard />} />
                                            <Route path="explore/test-prep" element={<TestPrep />} />
                                            <Route path="explore/accommodation" element={<Accommodation />} />

                                            {/* PAI Module Routes */}
                                            <Route path="pai">
                                                <Route index element={<PAILanding />} />
                                                <Route path="landing" element={<PAILanding />} />
                                                <Route path="profile-form" element={<ProfileForm />} />
                                                <Route path="resume-upload" element={<ResumeUpload />} />
                                                <Route path="linkedin-import" element={<LinkedInImport />} />
                                                <Route path="github-analysis" element={<GitHubAnalysis />} />
                                                <Route path="portfolio-analysis" element={<PortfolioAnalysis />} />
                                                <Route path="loading" element={<PAILoadingScreen />} />
                                                <Route path="intelligence-report" element={<ProfileIntelligenceReport />} />
                                            </Route>
                                        </Route>

                                        <Route path="/test-prep/listening" element={<ListeningTest />} />
                                        <Route path="/test-prep/reading" element={<ReadingTest />} />
                                        <Route path="/test-prep/reading/result" element={<ReadingTestResult />} />
                                        <Route path="/test-prep/speaking" element={<SpeakingTest />} />

                                        <Route path="/profile-setup" element={<ProtectedRoute><ProfileLayout /></ProtectedRoute>}>
                                            <Route index element={<Navigate to="basic" replace />} />
                                            <Route path="basic" element={<BasicInfo />} />
                                            <Route path="education" element={<Education />} />
                                            <Route path="goals" element={<Goals />} />
                                            <Route path="completed" element={<ProfileCompleted />} />
                                        </Route>

                                        <Route path="/application" element={<ProtectedRoute><ApplicationLayout /></ProtectedRoute>}>
                                            <Route index element={<Navigate to="details" replace />} />
                                            <Route path="details" element={<PersonalDetails />} />
                                            <Route path="academic" element={<AcademicDetails />} />
                                            <Route path="documents" element={<Documents />} />
                                            <Route path="review" element={<Review />} />
                                        </Route>

                                        <Route path="/application/start" element={<ApplicationStart />} />
                                        <Route path="/application/initiate" element={<InitiateApplication />} />
                                        <Route path="/application/submitted" element={<ApplicationSubmitted />} />

                                        <Route element={<ProtectedRoute requiredRoles={['counsellor']}><ConsultantLayout /></ProtectedRoute>}>
                                            <Route path="/counsellor-dashboard" element={<ConsultantDashboard />} />
                                            <Route path="/counsellor-students" element={<ConsultantStudents />} />
                                            <Route path="/counsellor-applications" element={<ConsultantApplications />} />
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

                                        <Route path="/login" element={<Login />} />
                                        <Route path="/signup" element={<Signup />} />
                                        <Route path="/forgot-password" element={<ForgotPassword />} />
                                        <Route path="/verification" element={<Verification />} />
                                        <Route path="/university-verification" element={<UniversityVerification />} />
                                        <Route path="/university-pending-verification" element={<UniversityPendingVerification />} />
                                        <Route path="/Superadmin" element={<ProtectedRoute requiredRoles={['admin']}><Superadmin /></ProtectedRoute>} />
                                        <Route path="/Superadmin/universities" element={<SuperAdminUniversityManagement />} />
                                        <Route path="/Superadmin/consultants" element={<SuperAdminConsultantManagement />} />
                                        <Route path="/Superadmin/counsellors" element={<SuperAdminAvailableCounsellors />} />
                                        <Route path="/Superadmin/active-today" element={<SuperAdminActiveTodayCounsellors />} />
                                        <Route path="/Superadmin/scraper" element={<UniversityScraper />} />
                                        <Route path="/Superadmin/active-partners" element={<ActivePartnersPage />} />
                                        <Route path="/Superadmin/top-performers" element={<TopPerformersPage />} />
                                        <Route path="/Superadmin/applications" element={<ApplicationsAnalyticsPage />} />
                                        <Route path="/Superadmin/applications/all" element={<AllApplicationsPage />} />
                                        <Route path="/Superadmin/university/:id" element={<SuperAdminUniversityProfile />} />
                                        <Route path="/university/dashboard" element={<ProtectedRoute requiredRoles={['university']}><UniversityDashboard /></ProtectedRoute>} />
                                        <Route path="/university/applications" element={<UniversityApplications />} />
                                        <Route path="/university/published-posts" element={<UniversityPublishedPosts />} />
                                        <Route path="/university/management" element={<UniversityScholarship />} />
                                        <Route path="/university/post-center" element={<PostCenter />} />
                                        <Route path="/university/scholarship-analytics" element={<ScholarshipAnalytics />} />
                                        <Route path="/university/programs" element={<UniversityPrograms />} />
                                        <Route path="/university/profile" element={<UniversityManagementProfile />} />
                                    </Routes>
                                </BrowserRouter>
                            </ApplicationsProvider>
                        </ScholarshipsProvider>
                    </PostsProvider>
                </UserProfileProvider>
            </SavedItemsProvider>
        </NotificationProvider>
    );
}


export default App;

