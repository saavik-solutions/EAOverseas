import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/AuthContext';

const Verification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { verifyOTP, resendOTP } = useAuth();

    const [otp, setOtp] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            await verifyOTP(otp);
            setSuccessMessage('Email verified successfully!');
            setTimeout(() => {
                const from = location.state?.from || '/feed';
                navigate(from);
            }, 1500);
        } catch (err: any) {
            setError(err.message || 'Invalid verification code');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResend = async () => {
        setError('');
        setResending(true);
        try {
            await resendOTP();
            setSuccessMessage('New verification code sent to your email');
            setTimeout(() => setSuccessMessage(''), 5000);
        } catch (err: any) {
            setError(err.message || 'Failed to resend code');
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white font-display overflow-hidden">
            {/* Left Side - Image */}
            <div className="hidden lg:block w-[50%] bg-[#0d6cf20a] relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop")', filter: 'grayscale(20%)' }}></div>
                <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-16 text-white z-10">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                        <div className="flex gap-2 text-yellow-400 mb-4">
                            <span className="material-symbols-outlined fill-current">star</span>
                            <span className="material-symbols-outlined fill-current">star</span>
                            <span className="material-symbols-outlined fill-current">star</span>
                            <span className="material-symbols-outlined fill-current">star</span>
                            <span className="material-symbols-outlined fill-current">star_half</span>
                        </div>
                        <p className="text-lg leading-relaxed font-medium mb-6">"Secure your future with EAOverseas. We ensure your application process is safe, verified, and successful."</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-20 lg:px-24 py-12 overflow-y-auto">
                <div className="max-w-[440px] w-full mx-auto">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 mb-10 group">
                        <div className="bg-[#0d6cf2]/10 rounded-lg flex items-center justify-center size-10 text-[#0d6cf2] group-hover:bg-[#0d6cf2] group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[24px]">school</span>
                        </div>
                        <span className="font-bold text-slate-900 text-xl">EAOverseas</span>
                    </Link>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-slate-900 mb-3 text-left">Verify Your Email</h1>
                        <p className="text-slate-500">We've sent a verification code to your email address. Please enter it below.</p>
                    </div>

                    {/* Messages */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium animate-shake">
                            {error}
                        </div>
                    )}
                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-600 rounded-xl text-sm font-medium animate-fade-in">
                            {successMessage}
                        </div>
                    )}

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleVerify}>
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-900 ml-1">Verification Code</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className="w-full h-12 px-4 rounded-xl bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-4 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 font-bold placeholder:text-gray-400 tracking-[0.5em] text-center text-xl"
                                placeholder="••••••"
                                maxLength={6}
                                required
                            />
                        </div>

                        <button 
                            disabled={isSubmitting || otp.length < 6}
                            className={`w-full h-12 bg-[#0d6cf2] hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${isSubmitting || otp.length < 6 ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                'Verify Email'
                            )}
                        </button>

                        <div className="text-center pt-2">
                            <p className="text-slate-500 text-sm">
                                Didn't receive code? 
                                <button 
                                    type="button" 
                                    onClick={handleResend}
                                    disabled={resending}
                                    className="ml-1 text-[#0d6cf2] font-bold hover:underline bg-transparent border-none cursor-pointer disabled:opacity-50"
                                >
                                    {resending ? 'Sending...' : 'Resend'}
                                </button>
                            </p>
                        </div>
                        <div className="text-center">
                            <Link to="/signup" className="text-slate-400 text-sm font-medium hover:text-slate-600 transition-colors flex items-center justify-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                Back to Signup
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Verification;
