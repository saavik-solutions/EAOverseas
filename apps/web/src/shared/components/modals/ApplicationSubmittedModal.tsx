import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ApplicationSubmittedModal = ({ isOpen, onClose, data }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setCountdown(3);
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

    return createPortal(
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

            {/* Modal Content */}
            <div className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center text-center transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>

                {/* Success Icon */}
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 animate-bounce-short">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-green-600 text-3xl font-bold">check</span>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>

                <p className="text-gray-500 mb-6 text-sm">
                    Your loan application with <span className="font-bold text-gray-900">{data?.name || 'Selected Lender'}</span> has been initiated successfully.
                </p>

                {/* Redirecting Prompt */}
                <div className="flex flex-col items-center justify-center bg-blue-50/50 rounded-xl p-4 w-full border border-blue-100">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm font-semibold text-blue-700">Redirecting to Timeline</span>
                    </div>
                    <p className="text-xs text-blue-400">Please wait a moment...</p>
                </div>

            </div>
        </div>,
        document.body
    );
};

export default ApplicationSubmittedModal;
