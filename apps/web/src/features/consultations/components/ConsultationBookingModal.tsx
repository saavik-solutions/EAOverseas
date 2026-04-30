import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import logo from '@/assets/logo.jpg';

const ConsultationBookingModal = ({ isOpen, onClose, onConfirm }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [view, setView] = useState('calendar'); // 'calendar' | 'form'
    const [currentDate, setCurrentDate] = useState(new Date()); // For month navigation
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        topic: '', // Optional: Pre-fill if passed from parent
        notes: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailError, setEmailError] = useState('');

    // Email validation function
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setFormData({ ...formData, email });

        // Validate email on change
        if (email && !isValidEmail(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setView('calendar');
            setSelectedDate(null);
            setSelectedTime(null);
            setFormData({ name: '', email: '', topic: '', notes: '' });
            setIsSubmitting(false);
            setEmailError('');
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible) return null;

    // Calendar Helpers
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const renderCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);

        const days = [];
        // Empty slots for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isPast = date < today;
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
            const isToday = date.toDateString() === today.toDateString();

            days.push(
                <div
                    key={day}
                    role="button"
                    onClick={() => {
                        if (!isPast) {
                            setSelectedDate(date as any);
                            setSelectedTime(null);
                        }
                    }}
                    style={{
                        transform: 'none',
                        rotate: '0deg',
                        scale: '1',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: isPast ? 'not-allowed' : 'pointer',
                        padding: 0,
                        margin: 0,
                        // Inline styles for 'Today' to avoid class conflicts
                        border: 'none',
                    }}
                    className={`text-sm transition-colors
                        ${isSelected ? 'bg-blue-600 text-white shadow-md' : ''}
                        ${!isSelected && !isPast ? 'hover:bg-blue-50 text-gray-700 hover:text-blue-600' : ''}
                        ${isPast ? 'text-gray-300' : ''}
                    `}
                >
                    <span style={{ transform: 'none', display: 'inline-block' }}>{day}</span>
                </div>
            );
        }
        return days;
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handlePrevMonth = () => {
        const today = new Date();
        // Prevent going back past current month if it's the current real month
        if (currentDate.getMonth() > today.getMonth() || currentDate.getFullYear() > today.getFullYear()) {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        }
    };

    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
        '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
    ];

    const getSlotClass = (slot) => {
        // Keeping this for reference/revert if needed, but not using it currently
        return '';
    };
    const handleConfirmBooking = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setView('success');

        // Auto-close after 1.5 seconds
        setTimeout(() => {
            if (onConfirm) onConfirm({
                date: selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
                time: selectedTime,
                ...formData
            });
            onClose();
        }, 1500);
    };

    // Check if form is valid
    const isFormValid = formData.name.trim() && formData.email.trim() && isValidEmail(formData.email);

    return createPortal(
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>

            <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-auto md:h-[600px] max-h-[90vh] overflow-hidden flex flex-col md:flex-row transform transition-all duration-300 ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'}`}>

                {/* Close Button Mobile */}
                <button onClick={onClose} className="absolute top-4 right-4 md:hidden z-10 p-2 bg-gray-100 rounded-full">
                    <span className="material-symbols-outlined text-gray-500">close</span>
                </button>

                {/* Left Side: Summary / Branding */}
                <div className="w-full md:w-1/3 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100 p-6 md:p-8 flex flex-col shrink-0">
                    <div className="mb-6">
                        <img src={logo} alt="EA Overseas" className="h-8 md:h-10 w-auto object-contain mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mt-1">Discovery Call</h2>
                        <div className="flex items-center gap-2 mt-4 text-gray-500 text-sm font-medium">
                            <span className="material-symbols-outlined !text-[20px]">schedule</span>
                            <span>30 Minutes</span>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 leading-relaxed mb-auto hidden md:block">
                        Book a free consultation with our experts to discuss your study abroad plans, university options, and visa requirements.
                    </p>

                    {/* Selected Summary */}
                    {(selectedDate && selectedTime) && (
                        <div className="mt-6 md:mt-0 p-4 bg-green-50 border border-green-100 rounded-xl animate-fade-in">
                            <h4 className="text-xs font-bold text-green-700 uppercase mb-1">Selected Slot</h4>
                            <div className="font-semibold text-gray-900 text-sm">
                                {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </div>
                            <div className="text-green-700 font-bold text-base">
                                {selectedTime}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side: Step Interface */}
                <div className="bg-white flex-1 flex flex-col h-full overflow-hidden relative">
                    {/* Close Desktop */}
                    <button onClick={onClose} className="hidden md:flex absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-20">
                        <span className="material-symbols-outlined text-gray-400">close</span>
                    </button>

                    <div className="flex-1 overflow-y-auto p-6 md:p-8">
                        {view === 'calendar' ? (
                            <div className="flex flex-col h-full">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Select a Date & Time</h3>

                                <div className="flex flex-col md:flex-row gap-6 md:gap-8 h-full">
                                    {/* Calendar */}
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-lg font-semibold text-gray-800">
                                                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                            </h4>
                                            <div className="flex gap-1">
                                                <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded-full">
                                                    <span className="material-symbols-outlined">chevron_left</span>
                                                </button>
                                                <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-full">
                                                    <span className="material-symbols-outlined">chevron_right</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                                                <div key={d} className="text-xs font-bold text-gray-400 uppercase py-1">{d}</div>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-7 gap-1 place-items-center">
                                            {renderCalendarDays()}
                                        </div>
                                    </div>

                                    {/* Time Slots */}
                                    <div className={`md:w-48 flex flex-col gap-2 transition-all duration-300 ${selectedDate ? 'opacity-100 translate-x-0' : 'opacity-30 pointer-events-none translate-x-4'}`}>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                            {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) : 'Select a date'}
                                        </h4>
                                        <div className="flex-1 overflow-y-auto pr-2 space-y-2 max-h-[300px] scrollbar-thin scrollbar-thumb-gray-200">
                                            {timeSlots.map(time => (
                                                <div
                                                    key={time}
                                                    role="button"
                                                    onClick={() => setSelectedTime(time)}
                                                    style={{
                                                        // Explicit inline styles to prevent global conflicts
                                                        width: '100%',
                                                        padding: '10px 12px',
                                                        borderRadius: '8px',
                                                        border: selectedTime === time ? '1px solid #1F2937' : '1px solid #BFDBFE',
                                                        backgroundColor: selectedTime === time ? '#1F2937' : '#FFFFFF',
                                                        color: selectedTime === time ? '#FFFFFF' : '#2563EB',
                                                        cursor: 'pointer',
                                                        textAlign: 'center',
                                                        fontSize: '14px',
                                                        fontWeight: '500',
                                                        marginBottom: '8px',
                                                        transition: 'all 0.2s',
                                                        display: 'block'
                                                    }}
                                                    className={`transition-all hover:shadow-md ${selectedTime === time ? 'shadow-lg scale-[1.02]' : 'hover:border-blue-600'}`}
                                                >
                                                    {time}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Next Button */}
                                <div className="mt-auto pt-6 flex justify-end">
                                    <button
                                        disabled={!selectedDate || !selectedTime}
                                        onClick={() => setView('form')}
                                        className="bg-blue-600 disabled:bg-gray-300 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:shadow-none flex items-center gap-2"
                                    >
                                        Next Details
                                        <span className="material-symbols-outlined !text-[20px]">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ) : view === 'form' ? (
                            <div className="flex flex-col h-full animate-fade-in-right">
                                <button
                                    onClick={() => setView('calendar')}
                                    className="self-start text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-6 font-medium"
                                >
                                    <span className="material-symbols-outlined !text-[18px]">arrow_back</span>
                                    Back to Calendar
                                </button>

                                <h3 className="text-xl font-bold text-gray-900 mb-6">Enter Details</h3>

                                <div className="space-y-4 flex-1">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name *</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                                            placeholder="Eg. John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address *</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={handleEmailChange}
                                            className={`w-full px-4 py-3 rounded-lg border ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-600'} focus:border-transparent outline-none transition-all`}
                                            placeholder="john@example.com"
                                        />
                                        {emailError && (
                                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                                <span className="material-symbols-outlined !text-[16px]">error</span>
                                                {emailError}
                                            </p>
                                        )}
                                        <p className="mt-1 text-xs text-gray-500">
                                            📧 You'll receive a confirmation email at this address
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Additional Notes</label>
                                        <textarea
                                            value={formData.notes}
                                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none h-24"
                                            placeholder="Any specific questions or topics you'd like to discuss?"
                                        ></textarea>
                                    </div>
                                </div>

                                <button
                                    onClick={handleConfirmBooking}
                                    disabled={!isFormValid || isSubmitting}
                                    className="w-full bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all mt-6 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            Scheduling...
                                        </>
                                    ) : (
                                        'Schedule Event'
                                    )}
                                </button>
                            </div>
                        ) : (
                            // Success View
                            <div className="flex flex-col h-full items-center justify-center text-center animate-fade-in-right p-4">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-short">
                                    <span className="material-symbols-outlined text-4xl text-green-600">check_circle</span>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Meeting Scheduled!</h3>
                                <p className="text-gray-500 text-lg mb-8 max-w-sm">
                                    We have received your request. Our team will reach out to you soon!
                                </p>

                                <div className="bg-gray-50 rounded-xl p-4 w-full max-w-xs border border-gray-100 mb-8 text-left">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="material-symbols-outlined text-gray-400">event</span>
                                        <span className="text-gray-900 font-medium">
                                            {selectedDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-gray-400">schedule</span>
                                        <span className="text-gray-900 font-medium">{selectedTime}</span>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >,
        document.body
    );
};

export default ConsultationBookingModal;
