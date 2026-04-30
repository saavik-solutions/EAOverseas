import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import NotificationBanner from '@/components/feedback/NotificationBanner';
import { getDailyCount } from '@/utils/dailyCounter';

const ConsultantDashboard = () => {
    // State for dynamically loaded sessions
    const [sessions, setSessions] = React.useState([]);
    const [assignedStudentsCount, setAssignedStudentsCount] = React.useState(24);
    const [dailyActiveCount, setDailyActiveCount] = React.useState(0);

    // Load sessions and assigned count
    const loadData = () => {
        // Load sessions
        const savedSessions = localStorage.getItem('scheduled_sessions');
        if (savedSessions) {
            const parsedSessions = JSON.parse(savedSessions);
            const scheduledSessions = parsedSessions.filter(s => {
                const name = s.studentName || s.name || '';
                const isBadData = /student\s*user|guest\s*user/i.test(name);
                return s.status === 'scheduled' && !isBadData;
            });
            if (scheduledSessions.length < parsedSessions.length) {
                localStorage.setItem('scheduled_sessions', JSON.stringify(scheduledSessions));
            }
            setSessions(scheduledSessions);
        } else {
            // Auto-generate two demo sessions if none exist
            const demoSessions = [
                {
                    id: 'demo-1',
                    studentName: 'Priya Sharma',
                    studentId: '#EAS-2045',
                    date: 'Today',
                    dateLabel: 'Today',
                    topic: 'University Selection & Application Strategy',
                    mode: 'video',
                    university: 'University of Toronto',
                    status: 'scheduled'
                },
                {
                    id: 'demo-2',
                    studentName: 'Rahul Patel',
                    studentId: '#EAS-2046',
                    date: 'Tomorrow',
                    dateLabel: 'Tomorrow',
                    topic: 'Visa Interview Preparation',
                    mode: 'voice',
                    university: 'Imperial College London',
                    status: 'scheduled'
                }
            ];
            localStorage.setItem('scheduled_sessions', JSON.stringify(demoSessions));
            setSessions(demoSessions);
        }

        // Load dynamic assigned students count
        const savedAssigned = localStorage.getItem('assigned_students_list');
        if (savedAssigned) {
            const dynamicList = JSON.parse(savedAssigned);
            // Count unique ones that aren't in the base 24 (matching the logic in AssignedStudents.tsx)
            // For simplicity, we just add the dynamic list length if we assume they are unique
            setAssignedStudentsCount(24 + dynamicList.length);
        }

        // Set active count to number of scheduled sessions
        setDailyActiveCount(savedSessions ? JSON.parse(savedSessions).filter(s => {
            const name = s.studentName || s.name || '';
            const isBadData = /student\s*user|guest\s*user/i.test(name);
            return s.status === 'scheduled' && !isBadData;
        }).length : 2); // Default to 2 for demo sessions
    };

    // Load on mount and refresh
    React.useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 5000);
        return () => clearInterval(interval);
    }, []);

    // Function to mark student as completed when session starts and add to assigned list
    const handleSessionAction = (session) => {
        const studentName = session.studentName || session.name || session;
        const studentId = session.studentId || `#EAS-${Math.floor(Math.random() * 1000) + 2000}`; // Fallback ID
        const university = session.university || session.targetUni || 'Target University Pending';

        // 1. Mark as completed (for existing logic)
        const savedCompleted = localStorage.getItem('completedStudents');
        const completedStudents = savedCompleted ? JSON.parse(savedCompleted) : [];

        if (!completedStudents.includes(studentId)) {
            completedStudents.push(studentId);
            localStorage.setItem('completedStudents', JSON.stringify(completedStudents));
        }

        // 2. Add to Assigned Students for the new directory
        const savedAssigned = localStorage.getItem('assigned_students_list');
        const assignedStudents = savedAssigned ? JSON.parse(savedAssigned) : [];

        // Check if student already exists in assigned list
        const exists = assignedStudents.some(s => s.id === studentId || s.name === studentName);

        if (!exists) {
            const newStudent = {
                id: studentId,
                name: studentName,
                university: university,
                status: 'Successful',
                color: ['blue', 'orange', 'purple', 'green'][Math.floor(Math.random() * 4)]
            };
            const updatedList = [...assignedStudents, newStudent];
            localStorage.setItem('assigned_students_list', JSON.stringify(updatedList));
            setAssignedStudentsCount(24 + updatedList.length);
        }
    };
    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-gray-50/50">
            {/* Notification Banner */}
            <NotificationBanner sessions={sessions} />

            {/* Header with Sign Out button, properly aligned like Student Dashboard */}
            <PageHeader title="Counsellor Dashboard" />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-8 pb-10">

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
                        {/* Card 1 */}
                        <Link to="/counsellor-assigned-students" className="bg-white p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group flex flex-col">
                            <div className="flex items-start justify-between mb-3 md:mb-4">
                                <div className="p-1.5 md:p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                                    <span className="material-symbols-outlined icon-filled !text-[20px] md:!text-[24px]">person</span>
                                </div>
                                <span className="text-[10px] md:text-xs font-medium px-2 py-0.5 md:py-1 rounded-full bg-green-50 text-green-600">+1 new</span>
                            </div>
                            <p className="text-gray-500 text-xs md:text-sm font-medium">Assigned Students</p>
                            <div className="flex items-end justify-between">
                                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-0.5 md:mt-1">{assignedStudentsCount} <span className="text-[10px] md:text-sm font-normal text-gray-500">total</span></p>
                                <span className="material-symbols-outlined text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward_ios</span>
                            </div>
                        </Link>
                        {/* Card 2 */}
                        <Link to="/counsellor-students" className="bg-white p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group flex flex-col">
                            <div className="flex items-start justify-between mb-3 md:mb-4">
                                <div className="p-1.5 md:p-2 bg-purple-50 rounded-lg text-purple-600 group-hover:bg-purple-100 transition-colors">
                                    <span className="material-symbols-outlined icon-filled !text-[20px] md:!text-[24px]">school</span>
                                </div>
                                <span className="material-symbols-outlined text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward_ios</span>
                            </div>
                            <p className="text-gray-500 text-xs md:text-sm font-medium">Active Cases</p>
                            <p className="text-xl md:text-2xl font-bold text-gray-900 mt-0.5 md:mt-1">{dailyActiveCount} <span className="text-[10px] md:text-sm font-normal text-gray-500">active today</span></p>
                        </Link>
                        {/* Card 3 */}
                        <Link to="/counsellor-performance" className="bg-white p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-blue-200 hover:bg-blue-50/10 cursor-pointer group">
                            <div className="flex items-start justify-between mb-3 md:mb-4">
                                <div className="p-1.5 md:p-2 bg-yellow-50 rounded-lg text-yellow-600 group-hover:bg-yellow-100 transition-colors">
                                    <span className="material-symbols-outlined icon-filled !text-[20px] md:!text-[24px]">star</span>
                                </div>
                                <span className="material-symbols-outlined text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward_ios</span>
                            </div>
                            <p className="text-gray-500 text-xs md:text-sm font-medium">Avg. Rating</p>
                            <p className="text-xl md:text-2xl font-bold text-gray-900 mt-0.5 md:mt-1">4.8 <span className="text-[10px] md:text-sm font-normal text-gray-500">stars</span></p>
                        </Link>
                    </div>



                    {/* Main Content: Upcoming Sessions List */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Upcoming Sessions</h3>
                        </div>
                        <div className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm divide-y divide-gray-100 overflow-hidden">
                            {sessions.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    <span className="material-symbols-outlined text-4xl mb-2 text-gray-300">event_busy</span>
                                    <p className="text-sm">No sessions scheduled yet</p>
                                    <p className="text-xs mt-1">New bookings will appear here automatically</p>
                                </div>
                            ) : (
                                sessions.map((session) => (
                                    <div key={session.id} className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3 md:gap-4 flex-1">
                                            <div className="flex flex-col items-center justify-center size-12 md:size-16 rounded-xl shrink-0 bg-blue-50 text-blue-600">
                                                <span className="text-[10px] md:text-xs font-bold uppercase leading-tight">{session.dateLabel || session.date}</span>
                                            </div>
                                            <div className="flex flex-col gap-0.5 md:gap-1 min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h4 className="font-semibold text-gray-900 text-sm md:text-base truncate">{session.studentName || session.name}</h4>
                                                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] md:text-[10px] font-bold border uppercase tracking-wider ${session.mode === 'video' ? 'bg-purple-50 text-purple-700 border-purple-100' : (session.mode === 'voice' || session.mode === 'audio' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-orange-50 text-orange-700 border-orange-100')}`}>
                                                        <span className="material-symbols-outlined !text-[10px] md:!text-[12px]">{session.mode === 'video' ? 'videocam' : (session.mode === 'voice' || session.mode === 'audio' ? 'phone' : 'chat')}</span>
                                                        <span>{session.mode === 'video' ? 'VIDEO' : (session.mode === 'voice' || session.mode === 'audio' ? 'VOICE' : 'CHAT')}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs md:text-sm text-gray-500">
                                                    <span className="material-symbols-outlined !text-[14px] md:!text-[16px]">topic</span>
                                                    <span className="truncate">{session.topic}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sm:self-center self-start w-full sm:w-auto">
                                            <button
                                                onClick={() => handleSessionAction(session)}
                                                className="w-full sm:w-auto px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-bold transition-colors bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/30">
                                                Start Session
                                            </button>
                                        </div>
                                    </div>
                                )))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ConsultantDashboard;
