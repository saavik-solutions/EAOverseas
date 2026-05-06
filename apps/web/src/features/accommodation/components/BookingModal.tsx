import React, { useState, useMemo } from 'react';
import AccommodationApplicationForm from './AccommodationApplicationForm';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    accommodation: any;
    selectedRoom: any;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, accommodation, selectedRoom }) => {
    // 1. Defaults
    const defaultImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuBDv2ChOaSFAN9rwtOZ5ljePS-MA8Bx8UT-0oKP7ftWjLAcxjPe87VNeurUAsc_VjfioKzwfoBFuk6prMQqFz6Ddsw3kFA1tiHrCrsz_yKdoHFtjZHeL23LG--yTvod0N9GH-6MGqybvV8Q33YiItYMhhGEhV4jMuVYkKVASBT8ws2WDH8bh1DuJcahzPAv3w4lLHHMyBdTr2r1DcKXz9GSdVLxKy-ZfDI1fjMa5nXA4mr5W3ojBBz2JHbY221EWjoBQE5psJlF068";

    // 2. Safe Property Access
    const roomImage = (accommodation && accommodation.image)
        ? accommodation.image
        : ((accommodation && accommodation.images && accommodation.images[0]) || defaultImage);

    // 3. State
    const [durationWeeks, setDurationWeeks] = useState(51);
    const [moveInDate, setMoveInDate] = useState("2026-09-17");
    const [showApplicationForm, setShowApplicationForm] = useState(false);

    // 4. Logic
    // Safe check for 'selectedRoom' and 'period'
    const rawPrice = (selectedRoom && selectedRoom.price) ? selectedRoom.price : 650;
    const isMonthly = (accommodation && accommodation.period === '/month');

    
    // 5. Helpers
    const calculateMoveOutDate = (startDate: string, weeks: number): string => {
        if (!startDate) return "Invalid Date";
        try {
            const result = new Date(startDate);
            result.setDate(result.getDate() + (weeks * 7));
            return result.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        } catch (e) {
            return "Invalid Date";
        }
    };

    const moveOutDate = useMemo(() => calculateMoveOutDate(moveInDate, durationWeeks), [moveInDate, durationWeeks]);

    // 6. Calculation
    let calculatedTotal = 0;
    if (isMonthly) {
        calculatedTotal = Math.round((rawPrice * 12 / 52) * durationWeeks);
    } else {
        calculatedTotal = rawPrice * durationWeeks;
    }

    const totalCost = calculatedTotal.toLocaleString('en-US');
    const displayRate = rawPrice;
    const displayPeriod = isMonthly ? '/month' : '/week';

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-[900px] shadow-2xl animate-in fade-in zoom-in duration-200 flex overflow-hidden h-[600px] md:h-auto">
                {/* Left Side - Image */}
                <div className="w-[35%] hidden md:block bg-cover bg-center transition-all duration-500" style={{ backgroundImage: `url("${roomImage}")` }}>
                    <div className="h-full w-full bg-black/10 backdrop-brightness-95"></div>
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                    {showApplicationForm ? (
                        <AccommodationApplicationForm
                            onClose={() => {
                                setShowApplicationForm(false);
                                onClose();
                            }}
                            accommodation={accommodation}
                        />
                    ) : (
                        <>
                            {/* Header */}
                            <div className="flex items-start justify-between p-5 border-b border-gray-100">
                                <div className="flex gap-3">
                                    <div className="bg-blue-50 p-2.5 rounded-xl shrink-0">
                                        <span className="material-symbols-outlined text-[#0d6cf2] text-[24px]">calendar_month</span>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-[#111418]">Plan Your Stay</h2>
                                        <p className="text-xs text-[#60728a] mt-0.5">Select dates to estimate costs for your shortlist.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                                    className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1"
                                    aria-label="Close modal"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-6 overflow-y-auto">
                                {/* Stay Duration & Date */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-[#60728a] uppercase tracking-wider">Stay Duration</label>
                                        <div className="flex gap-2">
                                            <select
                                                value={durationWeeks}
                                                onChange={(e) => setDurationWeeks(Number(e.target.value))}
                                                className="flex-1 bg-gray-50 border border-gray-200 text-[#111418] text-sm rounded-lg focus:ring-2 focus:ring-[#0d6cf2] focus:border-transparent p-2.5 outline-none font-medium"
                                            >
                                                <option value={51}>Full Year (51 Weeks)</option>
                                                <option value={44}>Academic Year (44 Weeks)</option>
                                                <option value={18}>Semester 1 (18 Weeks)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-[#60728a] uppercase tracking-wider">Move-in Date</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-2.5 text-gray-400 material-symbols-outlined text-[18px]">calendar_today</span>
                                            <input
                                                type="date"
                                                value={moveInDate}
                                                onChange={(e) => setMoveInDate(e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-200 text-[#111418] text-sm rounded-lg focus:ring-2 focus:ring-[#0d6cf2] focus:border-transparent pl-9 pr-2 py-2.5 outline-none font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Cost Summary Box */}
                                <div className="bg-white border border-dashed border-[#0d6cf2]/30 rounded-xl p-4 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0d6cf2] to-[#00c6ff]"></div>
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div className="space-y-0.5 text-center md:text-left">
                                            <p className="text-[10px] font-bold text-[#60728a] uppercase">Move-out Date (Calc)</p>
                                            <div className="flex items-center gap-1.5 justify-center md:justify-start">
                                                <span className="material-symbols-outlined text-[#0d6cf2] text-[18px]">event_repeat</span>
                                                <span className="text-base font-bold text-[#111418]">{moveOutDate}</span>
                                            </div>
                                        </div>

                                        <div className="h-px w-full md:w-px md:h-10 bg-gray-200"></div>

                                        <div className="space-y-0.5 text-center md:text-left">
                                            <p className="text-[10px] font-bold text-[#60728a] uppercase">Est. {isMonthly ? 'Monthly' : 'Weekly'} Price</p>
                                            <p className="text-base font-bold text-[#111418]">${displayRate}<span className="text-xs font-normal text-gray-500">{displayPeriod}</span></p>
                                        </div>

                                        <div className="h-px w-full md:w-px md:h-10 bg-gray-200"></div>

                                        <div className="space-y-0.5 text-center md:text-right">
                                            <p className="text-[10px] font-bold text-[#60728a] uppercase">Est. Total Cost</p>
                                            <p className="text-xl font-black text-[#0d6cf2]">${totalCost}</p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-3 text-center italic">* Costs are estimated based on 2026 rates. Final pricing subject to confirmation at booking.</p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-5 border-t border-gray-100 flex justify-end gap-3 mt-auto">
                                <button
                                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                                    className="px-5 py-2 rounded-lg text-sm font-bold text-[#60728a] hover:bg-gray-50 transition-colors cursor-pointer"
                                    aria-label="Cancel booking"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setShowApplicationForm(true)}
                                    className="px-6 py-2 rounded-lg text-sm font-bold bg-[#0d6cf2] text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2 cursor-pointer"
                                    aria-label="Start reservation"
                                >
                                    Reserve Now
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
