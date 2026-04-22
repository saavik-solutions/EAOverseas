import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import BookingModal from '../components/ConsultationBookingModal';
import ConsultationSuccessModal from '../components/ConsultationSuccessModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAuthAction } from '../hooks/useAuthAction';
import LoginModal from '../components/LoginModal';

const Consultant = () => {
    // State for form interaction (basic mock state)
    const [consultationType, setConsultationType] = useState('shortlisting');
    const [mode, setMode] = useState('video');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isChatActive, setIsChatActive] = useState(false);
    const [bookedSlot, setBookedSlot] = useState(() => {
        // Initialize from localStorage to persist booking across navigation
        const saved = localStorage.getItem('consultation_booking');
        return saved ? JSON.parse(saved) : null;
    });
    const { user } = useAuth(); // Get real user
    const { executeAction, isLoginModalOpen, closeLoginModal } = useAuthAction();
    const navigate = useNavigate();

    // Check if chat should be active based on time and handle expiry
    useEffect(() => {
        if (!bookedSlot) return;

        const checkStatus = () => {
            const now = Date.now();

            // Check for expiry (10 minutes = 600000 ms)
            if (bookedSlot.createdAt) {
                const elapsed = now - bookedSlot.createdAt;
                if (elapsed > 10 * 60 * 1000) {
                    setBookedSlot(null);
                    localStorage.removeItem('consultation_booking');
                    return;
                }
            }

            // Existing logic for strictly equal time (kept for reference, but simpler now)
            // ... (omitted for brevity as we are defaulting to Active)
            setIsChatActive(true);
        };

        const interval = setInterval(checkStatus, 1000); // Check every second
        return () => clearInterval(interval);
    }, [bookedSlot]);

    const handleRequestConsultation = () => {
        executeAction(() => {
            // Direct Success for all modes as per new requirement
            triggerSuccessModal();
        });
    };

    const triggerSuccessModal = () => {
        setIsModalOpen(true);

        // Create immediate booking details so the "Start Chat" button appears
        const now = new Date();

        // Calculate session date (defaulting to today now that selection is removed)
        const sessionDate = now;

        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const currentTimeStr = `${formattedHours}:${formattedMinutes} ${ampm}`;

        const typeTitles = {
            'shortlisting': 'University Shortlisting',
            'scholarships': 'Scholarships & Finance',
            'loan_visa': 'Loan & Visa Readiness',
            'end_to_end': 'End-to-End Guidance'
        };

        // GENERATE DYNAMIC STUDENT ID IF NOT EXISTS
        // For guests/demo, generate a random ID. For logged in, use their stable mapping if possible.
        const studentId = user?.id || `#EAS-${Math.floor(1000 + Math.random() * 9000)}`;

        const newSession = {
            id: `session_${Date.now()}`,
            studentName: user?.name || 'Alex', // Fallback to 'Alex' for demo clarity
            studentId: studentId,
            studentEmail: user?.email || 'alex@example.com',
            date: sessionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            dateLabel: 'Today',
            time: currentTimeStr,
            topic: typeTitles[consultationType],
            mode: mode,
            status: 'scheduled',
            createdAt: Date.now()
        };

        // Add to scheduled sessions array
        const existingSessions = JSON.parse(localStorage.getItem('scheduled_sessions') || '[]');
        existingSessions.push(newSession);
        localStorage.setItem('scheduled_sessions', JSON.stringify(existingSessions));

        // Keep old booking logic for backward compatibility
        setBookedSlot(newSession);
        localStorage.setItem('consultation_booking', JSON.stringify(newSession));

        // Simulate redirect after showing modal for a bit
        setTimeout(() => {
            setIsModalOpen(false);
            // No navigation, stay on page
        }, 5000);
    };

    return (
        <div className="flex flex-col flex-1 h-full bg-[#f8f9fc] overflow-hidden font-sans">
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
            <div className="hidden lg:block">
                <PageHeader title="Counsellor" />
            </div>

            <main className="flex-1 overflow-y-auto no-scrollbar">
                <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-12 flex flex-col gap-6 md:gap-12">

                    {/* Upcoming Consultation Card - Only for Chat Mode */}
                    {bookedSlot && bookedSlot.mode === 'async' && (
                        <div className="bg-white rounded-2xl p-4 md:p-6 border border-blue-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 mb-2 animate-fade-in">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                                    <span className="material-symbols-outlined text-[20px] md:text-[24px]">event_available</span>
                                </div>
                                <div>
                                    <h3 className="text-base md:text-lg font-bold text-gray-900">Consultation Scheduled</h3>
                                    <p className="text-gray-500 text-xs md:text-sm">
                                        {bookedSlot.date} at <span className="font-semibold text-gray-900">{bookedSlot.time}</span>
                                    </p>
                                    <p className="text-[10px] md:text-xs text-blue-600 mt-0.5 font-medium">
                                        Note: You will get a notification when the counsellor is available.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <button
                                    onClick={() => navigate('/consultation-waiting-room', { state: { bookingDetails: bookedSlot } })}
                                    className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 md:py-3 px-4 md:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 animate-fade-in text-sm md:text-base"
                                >
                                    <span className="material-symbols-outlined text-[18px] md:text-[24px]">chat</span>
                                    <span>Start Chat</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Hero Section */}
                    <header className="flex flex-col gap-2 md:gap-3 text-center mb-2 md:mb-4">
                        <div className="w-10 h-10 md:w-16 md:h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-1 md:mb-2 border border-blue-200 shadow-sm">
                            <span className="material-symbols-outlined text-2xl md:text-4xl">support_agent</span>
                        </div>
                        <h1 className="text-lg md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">Talk to an Overseas Education Expert</h1>
                        <p className="text-gray-500 text-xs md:text-lg max-w-xl mx-auto leading-relaxed">Get personalized guidance and clear next steps based on your unique profile and goals.</p>
                    </header>

                    <form className="flex flex-col gap-6 md:gap-8" onSubmit={(e) => { e.preventDefault(); handleRequestConsultation(); }}>

                        {/* 1. Consultation Type */}
                        <section className="flex flex-col gap-3 md:gap-5">
                            <h2 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">1. Select Consultation Type</h2>
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                {[
                                    { id: 'shortlisting', icon: 'school', title: 'University Shortlisting', desc: 'Find the best fit universities for your profile' },
                                    { id: 'scholarships', icon: 'payments', title: 'Scholarships & Finance', desc: 'Explore funding options and financial planning' },
                                    { id: 'loan_visa', icon: 'airplane_ticket', title: 'Loan & Visa Readiness', desc: 'Prepare for your visa interview and loan process' },
                                    { id: 'end_to_end', icon: 'rocket_launch', title: 'End-to-End Guidance', desc: 'Complete assistance from application to departure' }
                                ].map((type) => (
                                    <label key={type.id} className="relative cursor-pointer group">
                                        <input
                                            className="peer sr-only"
                                            name="consultation_type"
                                            type="radio"
                                            value={type.id}
                                            checked={consultationType === type.id}
                                            onChange={() => setConsultationType(type.id)}
                                        />
                                        <div className="h-full p-3 md:p-5 rounded-xl border md:border-2 border-gray-100 bg-white hover:border-blue-200 hover:shadow-md peer-checked:border-blue-600 peer-checked:bg-blue-50/30 peer-checked:shadow-sm transition-all duration-200 flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-2 md:gap-4">
                                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${consultationType === type.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                                                <span className="material-symbols-outlined text-[18px] md:text-[22px]">{type.icon}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={`text-xs md:text-base font-bold transition-colors ${consultationType === type.id ? 'text-blue-900' : 'text-gray-900'}`}>{type.title}</span>
                                                <span className="text-[10px] md:text-sm text-gray-500 mt-0.5 leading-snug hidden md:block">{type.desc}</span>
                                            </div>
                                            <div className={`absolute top-2 right-2 md:top-5 md:right-5 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center transition-all ${consultationType === type.id ? 'border-blue-600 bg-blue-600 scale-100' : 'border-gray-200 scale-90 opacity-0 group-hover:opacity-50'}`}>
                                                <span className="material-symbols-outlined text-white text-[10px] md:text-[14px] font-bold">check</span>
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </section>

                        {/* 2. Consultation Mode */}
                        <section className="flex flex-col gap-3 md:gap-5">
                            <div className="flex items-center justify-between ml-1">
                                <h2 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider">2. Consultation Mode</h2>
                                <span className="text-[10px] md:text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-medium">✨ Expert responds in 24hrs</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3 md:gap-4">
                                {[
                                    { id: 'video', icon: 'videocam', label: 'Video Call' },
                                    { id: 'audio', icon: 'call', label: 'Audio Call' },
                                    { id: 'async', icon: 'chat', label: 'Chat' }
                                ].map((option) => {
                                    const isDisabled = false; // logic removed as per request
                                    return (
                                        <label key={option.id} className={`relative group ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
                                            <input
                                                className="peer sr-only"
                                                name="mode"
                                                type="radio"
                                                value={option.id}
                                                checked={mode === option.id}
                                                onChange={() => !isDisabled && setMode(option.id)}
                                                disabled={isDisabled}
                                            />
                                            <div className="py-2 px-1 md:py-4 md:px-2 rounded-xl border md:border-2 border-gray-100 bg-white hover:border-blue-600 hover:text-blue-600 peer-checked:border-blue-600 peer-checked:bg-white peer-checked:text-blue-600 peer-checked:shadow-sm peer-checked:scale-[1.02] flex flex-col items-center gap-1 md:gap-2 shadow-sm transition-all duration-200">
                                                <span className={`material-symbols-outlined text-[18px] md:text-[26px] group-hover:text-blue-600 ${mode === option.id ? 'text-blue-600' : 'text-gray-400'}`}>{option.icon}</span>
                                                <span className={`text-[10px] md:text-sm font-semibold group-hover:text-blue-600 ${mode === option.id ? 'text-blue-600' : 'text-gray-600'}`}>
                                                    {option.label}
                                                </span>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </section>



                        {/* CTA Section */}
                        <section className="pt-2 md:pt-4 mt-2 md:mt-4">
                            <div className="bg-white rounded-2xl p-4 md:p-8 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 relative overflow-hidden group">

                                <div className="flex flex-col gap-1 md:gap-2 relative z-10 w-full md:w-auto text-center md:text-left">
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900">Ready to connect?</h3>
                                    <p className="text-gray-500 text-sm md:text-base">Requesting <span className="font-semibold text-gray-900 border-b border-gray-300 pb-0.5">{mode === 'video' ? 'Video Call' : mode === 'audio' ? 'Audio Call' : 'Chat'}</span> for <span className="font-semibold text-gray-900 border-b border-gray-300 pb-0.5">{consultationType === 'shortlisting' ? 'Shortlisting' : consultationType === 'scholarships' ? 'Scholarships' : consultationType === 'loan_visa' ? 'Visa Help' : 'Full Guidance'}</span></p>
                                </div>
                                <div className="flex items-center gap-4 w-full md:w-auto z-10">
                                    <button
                                        type="submit"
                                        className="bg-white border-2 border-transparent hover:border-blue-600 hover:text-blue-600 text-blue-600 font-bold text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-xl shadow-sm hover:shadow-none w-full md:w-auto flex items-center justify-center gap-2 transition-all duration-200"
                                    >
                                        <span>Request Consultation</span>
                                        <span className="material-symbols-outlined text-[18px] md:text-[20px]">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        </section>
                    </form>
                    <div className="pb-10"></div>
                </div>
            </main>

            <ConsultationSuccessModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={{ consultationType, mode }}
            />

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                onConfirm={(details) => {
                    // Logic to handle booking details
                    const typeTitles = {
                        'shortlisting': 'University Shortlisting',
                        'scholarships': 'Scholarships & Finance',
                        'loan_visa': 'Loan & Visa Readiness',
                        'end_to_end': 'End-to-End Guidance'
                    };

                    // GENERATE DYNAMIC STUDENT ID IF NOT EXISTS (same logic as main flow)
                    const studentId = user?.id || `#EAS-${Math.floor(1000 + Math.random() * 9000)}`;

                    const newDetails = {
                        ...details,
                        topic: typeTitles[consultationType],
                        studentName: user?.name || 'Alex',
                        studentId: studentId,
                        studentEmail: user?.email || 'alex@example.com'
                    };

                    // Add to scheduled sessions array for Dashboard visibility
                    const existingSessions = JSON.parse(localStorage.getItem('scheduled_sessions') || '[]');
                    existingSessions.push(newDetails);
                    localStorage.setItem('scheduled_sessions', JSON.stringify(existingSessions));

                    setBookedSlot(newDetails);
                    localStorage.setItem('consultation_booking', JSON.stringify(newDetails));
                    setMode('video'); // Reset to default allowed mode
                    setIsBookingModalOpen(false);
                    // No success modal trigger, just close
                }}
            />
        </div>
    );
};

export default Consultant;
