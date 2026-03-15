import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Verification = () => {
    const navigate = useNavigate();
    const location = useLocation();

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

                    {/* Form */}
                    <form className="space-y-6" onSubmit={(e) => {
                        e.preventDefault();
                        const from = location.state?.from || '/profile-setup';
                        navigate(from);
                    }}>
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-900 ml-1">Verification Code</label>
                            <input
                                type="text"
                                className="w-full h-12 px-4 rounded-xl bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-4 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 font-medium placeholder:text-gray-400 tracking-widest text-center text-lg"
                                placeholder="• • • • • •"
                                maxLength={6}
                                required
                            />
                        </div>

                        <button className="w-full h-12 bg-[#0d6cf2] hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 text-white font-bold rounded-xl transition-all">
                            Verify Email
                        </button>

                        <div className="text-center pt-2">
                            <p className="text-slate-500 text-sm">Didn't receive code? <button type="button" className="text-[#0d6cf2] font-bold hover:underline bg-transparent border-none cursor-pointer">Resend</button></p>
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

