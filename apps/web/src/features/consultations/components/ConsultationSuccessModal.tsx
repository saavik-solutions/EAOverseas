import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ConsultationSuccessModal = ({ isOpen, onClose, data }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setCountdown(5); // Reset countdown
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible) return null;

    // Mapping IDs to readable text
    const getConsultationTitle = (id) => {
        const map = {
            'shortlisting': 'University Shortlisting',
            'scholarships': 'Scholarships & Finance',
            'loan_visa': 'Loan & Visa Readiness',
            'end_to_end': 'End-to-End Guidance'
        };
        return map[id] || 'Consultation';
    };

    const getModeLabel = (id) => {
        const map = {
            'video': 'Video Call',
            'audio': 'Audio Call',
            'async': 'Chat'
        };
        return map[id] || 'Consultation';
    };

    return createPortal(
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 flex flex-col items-center text-center transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                {/* Success Icon */}
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 animate-bounce-short">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-green-600 text-3xl font-bold">check</span>
                    </div>
                </div>

                {/* Title & specific text */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">All set!</h2>
                <h3 className="text-xl font-bold text-blue-600 mb-4">We've got your enquiry.</h3>

                <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                    Thanks, your intention for <span className="font-semibold text-gray-900">{getConsultationTitle(data?.consultationType)}</span> is noted.
                    <br />
                    <span className="font-medium text-gray-700 mt-2 block">Our expert will call you back within 24 hrs.</span>
                </p>

                {/* Details Card */}
                <div className="w-full flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 mb-8">
                    {/* Topic Icon */}
                    <div className="w-full bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow flex-1">
                        <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-blue-600 text-2xl">
                                {data?.consultationType === 'shortlisting' ? 'school' :
                                    data?.consultationType === 'scholarships' ? 'payments' :
                                        data?.consultationType === 'loan_visa' ? 'airplane_ticket' : 'rocket_launch'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <h4 className="font-bold text-gray-900 text-sm truncate">{getConsultationTitle(data?.consultationType)}</h4>
                            <div className="inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                {getModeLabel(data?.mode)}
                            </div>
                        </div>
                    </div>

                    {/* Expert Assigned */}
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 shrink-0 flex md:flex-col items-center justify-start md:justify-center gap-3 md:gap-0 w-full md:w-28 text-left md:text-center shadow-inner">
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="Expert"
                            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm md:mb-2"
                        />
                        <div>
                            <span className="text-[10px] font-bold text-gray-900 leading-tight block">Expert Assigned</span>
                            <span className="text-[9px] text-gray-500 block">Sarah Jen</span>
                            <div className="flex items-center justify-center md:justify-center gap-1 mt-1">
                                <span className="material-symbols-outlined text-yellow-500 text-[12px] icon-filled">star</span>
                                <span className="text-[10px] font-bold text-gray-900">4.8</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Countdown Indicator */}
                <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-3xl font-bold text-blue-600 tabular-nums">{countdown}</span>
                    <span className="text-xs text-gray-400 font-medium tracking-wide">Closing in seconds</span>
                </div>

            </div>
        </div>,
        document.body
    );
};

export default ConsultationSuccessModal;
