import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EnquireModal = ({ isOpen, onClose, accommodation }) => {
    const [step, setStep] = useState('form'); // 'form' | 'success'
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Reset state when opening
    useEffect(() => {
        if (isOpen) {
            setStep('form');
            setIsLoading(false);
        }
    }, [isOpen]);

    // Auto-redirect on success
    useEffect(() => {
        if (step === 'success') {
            const timer = setTimeout(() => {
                navigate('/accommodation');
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [step, navigate, onClose]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setStep('success');
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all">
            <div className={`bg-white rounded-3xl w-full ${step === 'success' ? 'max-w-3xl' : 'max-w-4xl'} shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden relative flex flex-col h-[90vh] md:h-auto md:max-h-[90vh]`}>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-10 p-2 bg-white/80 hover:bg-white rounded-full text-gray-500 hover:text-red-500 transition-all shadow-sm backdrop-blur-sm"
                >
                    <span className="material-symbols-outlined text-[20px] block">close</span>
                </button>

                {step === 'form' && (
                    <div className="flex flex-col md:flex-row h-full overflow-hidden">
                        {/* Left Side - Visual (Desktop Only) */}
                        <div className="hidden md:block w-1/3 bg-[#f8fafc] border-r border-gray-100 p-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0d6cf2] to-[#00c6ff]"></div>
                            <h3 className="text-2xl font-bold text-[#111418] mb-4">You're one step<br />closer to your<br />perfect stay!</h3>
                            <p className="text-gray-500 mb-8 text-sm leading-relaxed">Fill out the form to get personalized assistance from our accommodation experts.</p>

                            {accommodation && (
                                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                                    <div className="h-32 rounded-lg bg-cover bg-center mb-3" style={{ backgroundImage: `url("${accommodation.image}")` }}></div>
                                    <h4 className="font-bold text-[#111418] leading-tight mb-1">{accommodation.title}</h4>
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                                        {accommodation.location}
                                    </p>
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                                        <span className="text-xs font-semibold text-[#60728a] uppercase">From</span>
                                        <span className="text-[#0d6cf2] font-bold">{accommodation.price}<span className="text-xs font-medium text-gray-400">{accommodation.period}</span></span>
                                    </div>
                                </div>
                            )}

                            {/* Trust Badges */}
                            <div className="absolute bottom-8 left-8 right-8 flex gap-3 text-xs text-gray-400 font-medium">
                                <div className="flex items-center gap-1"><span className="material-symbols-outlined text-green-500 text-[16px]">verified_user</span> 100% Verified</div>
                                <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[#0d6cf2] text-[16px]">support_agent</span> 24/7 Support</div>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="flex-1 p-8 overflow-y-auto">
                            <div className="text-center md:text-left mb-8">
                                <h2 className="text-2xl font-bold text-[#111418] mb-2 flex items-center justify-center md:justify-start gap-2">
                                    Enquire Now
                                    <span className="material-symbols-outlined text-[#0d6cf2]">rocket_launch</span>
                                </h2>
                                <span className="inline-block bg-blue-50 text-[#0d6cf2] text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
                                    ⚡ Answered within 24 hours
                                </span>
                            </div>

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5 text-left">
                                        <label className="text-xs font-bold text-[#60728a] uppercase tracking-wider ml-1">Full Name <span className="text-red-500">*</span></label>
                                        <input type="text" required placeholder="Enter your full name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0d6cf2] focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-medium hover:bg-white focus:bg-white" />
                                    </div>
                                    <div className="space-y-1.5 text-left">
                                        <label className="text-xs font-bold text-[#60728a] uppercase tracking-wider ml-1">Email <span className="text-red-500">*</span></label>
                                        <input type="email" required placeholder="your.email@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0d6cf2] focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-medium hover:bg-white focus:bg-white" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5 text-left">
                                        <label className="text-xs font-bold text-[#60728a] uppercase tracking-wider ml-1">Phone Number <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <input type="tel" required placeholder="+1 (555) 000-0000" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0d6cf2] focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-medium hover:bg-white focus:bg-white" />
                                            <span className="material-symbols-outlined absolute right-3 top-3 text-gray-400 text-[20px]">call</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5 text-left">
                                        <label className="text-xs font-bold text-[#60728a] uppercase tracking-wider ml-1">Nationality <span className="text-red-500">*</span></label>
                                        <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0d6cf2] focus:border-transparent outline-none transition-all font-medium text-[#111418] hover:bg-white focus:bg-white">
                                            <option value="" disabled selected>Select Nationality</option>
                                            <option>Indian</option>
                                            <option>American</option>
                                            <option>British</option>
                                            <option>Canadian</option>
                                            <option>Australian</option>
                                            <option>Chinese</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5 text-left">
                                        <label className="text-xs font-bold text-[#60728a] uppercase tracking-wider ml-1">University <span className="text-red-500">*</span></label>
                                        <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0d6cf2] focus:border-transparent outline-none transition-all font-medium text-[#111418] hover:bg-white focus:bg-white">
                                            <option value="" disabled selected>Select University</option>
                                            <option>University College London (UCL)</option>
                                            <option>King's College London</option>
                                            <option>Imperial College London</option>
                                            <option>University of Toronto</option>
                                            <option>Manchester Metropolitan</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5 text-left">
                                        <label className="text-xs font-bold text-[#60728a] uppercase tracking-wider ml-1">Best Platform</label>
                                        <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0d6cf2] focus:border-transparent outline-none transition-all font-medium text-[#111418] hover:bg-white focus:bg-white">
                                            <option value="" disabled selected>Select Platform</option>
                                            <option>WhatsApp</option>
                                            <option>Email</option>
                                            <option>Phone Call</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1.5 text-left">
                                    <label className="text-xs font-bold text-[#60728a] uppercase tracking-wider ml-1">Message</label>
                                    <textarea rows={3} placeholder="Any specific questions regarding this property?" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0d6cf2] focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-medium resize-none hover:bg-white focus:bg-white"></textarea>
                                </div>

                                <button
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-[#0d6cf2] to-[#0099ff] hover:to-[#007acc] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/30 mt-4 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    ) : (
                                        <>
                                            Submit Enquiry
                                            <span className="material-symbols-outlined text-[20px]">send</span>
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-[11px] text-gray-400">
                                    By submitting, you agree to our <span className="cursor-pointer hover:text-[#0d6cf2] border-b border-dashed border-gray-300">Terms</span> and <span className="cursor-pointer hover:text-[#0d6cf2] border-b border-dashed border-gray-300">Privacy Policy</span>.
                                </p>
                            </form>
                        </div>
                    </div>
                )}

                {step === 'success' && (
                    <div className="p-12 flex flex-col items-center justify-center text-center animate-in slide-in-from-right duration-500">
                        {/* Success Animation */}
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                            <span className="material-symbols-outlined text-green-600 text-[48px]">check_circle</span>
                        </div>

                        <h2 className="text-3xl font-black text-[#111418] mb-2">All set!</h2>
                        <h3 className="text-xl font-bold text-[#0d6cf2] mb-4">We've got your enquiry.</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-10 leading-relaxed">
                            Thanks, your intention for <span className="font-bold text-[#111418]">{accommodation?.title}</span> is noted. Our team is already on it!
                        </p>

                        {/* Summary Card */}
                        {accommodation && (
                            <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-100 shadow-xl p-4 flex flex-col md:flex-row gap-6 items-center text-left mb-10 transform hover:scale-[1.02] transition-transform duration-300">
                                <div className="w-full md:w-48 h-36 rounded-xl bg-cover bg-center shrink-0 shadow-md" style={{ backgroundImage: `url("${accommodation.image}")` }}></div>
                                <div className="flex-1 w-full">
                                    <h4 className="text-xl font-bold text-[#111418] mb-1">{accommodation.title}</h4>
                                    <p className="text-sm text-gray-500 mb-3">{accommodation.locationDetails?.address || accommodation.location}</p>

                                    <div className="flex items-center gap-3">
                                        <span className="bg-blue-50 text-[#0d6cf2] px-3 py-1 rounded-lg text-xs font-bold uppercase">{accommodation.type}</span>
                                        <div className="h-4 w-px bg-gray-200"></div>
                                        <span className="text-[#111418] font-bold">{accommodation.price} <span className="text-gray-400 font-normal">{accommodation.period}</span></span>
                                    </div>
                                </div>

                                {/* Expert Profile Mockup */}
                                <div className="hidden md:flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl min-w-[140px] border border-gray-100">
                                    <div className="w-12 h-12 rounded-full bg-gray-300 bg-cover bg-center border-2 border-white shadow-sm" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=11")' }}></div>
                                    <div className="text-center">
                                        <p className="text-xs font-bold text-[#111418]">Expert Assigned</p>
                                        <p className="text-[10px] text-gray-500 leading-tight">Will contact shortly</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col items-center gap-2 mt-6">
                            <div className="w-8 h-8 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
                            <p className="text-sm text-gray-400">Redirecting to accommodations in 5s...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnquireModal;
