import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signup, loginWithGoogle } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        password: '',
        confirmPassword: '',
        institutionName: '',
        country: '',
        city: '',
        website: '',
        referralCode: ''
    });
    
    // Smart Signup States
    const [isGoogleSignup, setIsGoogleSignup] = useState(false);
    const [googleId, setGoogleId] = useState('');
    
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        if (e.target.name) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Register User
            await signup({ 
                ...formData, 
                role: 'student',
                googleId: googleId || undefined,
                mobile: formData.mobileNumber
            });

            const from = location.state?.from || '/feed';
            
            // Skip verification for Google signup
            if (googleId) {
                navigate(from);
            } else {
                navigate('/verification', { state: { from } });
            }
        } catch (err: any) {
            setError(err.message || "Signup failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignup = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const result = await loginWithGoogle(tokenResponse.access_token);
                
                // If it's a new user, pre-fill form
                if (result.isNewUser) {
                    setFormData(prev => ({
                        ...prev,
                        name: result.fullName || '',
                        email: result.email || ''
                    }));
                    setIsGoogleSignup(true);
                    setGoogleId(result.googleId);
                    
                    // Smooth scroll to form or just alert
                    console.log("Pre-filled from Google:", result);
                } else {
                    // Existing user logged in
                    navigate('/feed');
                }
            } catch (err: any) {
                console.error("Google Auth failed", err);
                // Show specific backend error if available
                setError(err.message || "Google authentication failed");
            }
        },
        onError: () => {
             setError("Google login was cancelled or failed");
        }
    });

    return (
        <div className="flex min-h-screen bg-white font-display overflow-hidden">
            {/* Left Side - Image */}
            <div className="hidden lg:block w-[50%] bg-[#0d6cf20a] relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop")`,
                    filter: 'grayscale(20%)'
                }}></div>
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
                        <p className="text-lg leading-relaxed font-medium mb-6">"Applying to universities abroad felt overwhelming until I found EAOverseas. The platform made the entire process simple and stress-free."</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/20 bg-cover bg-center border-2 border-white/50" style={{
                                backgroundImage: `url("https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop")`
                            }}></div>
                            <div>
                                <p className="font-bold text-white">Sarah Chen</p>
                                <p className="text-sm text-blue-200">Student, University of Toronto</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-8 overflow-y-auto">
                <div className="max-w-[400px] lg:max-w-[500px] w-full mx-auto transition-all duration-300">
                    {/* Logo (Static -> Clickable) */}
                    <Link to="/landing" className="flex items-center gap-2 mb-6 lg:mb-8 group cursor-pointer w-fit">
                        <div className="bg-[#0d6cf2]/10 rounded-lg flex items-center justify-center size-9 lg:size-10 text-[#0d6cf2] transition-colors group-hover:bg-[#0d6cf2]/20">
                            <span className="material-symbols-outlined text-[20px] lg:text-[24px]">school</span>
                        </div>
                        <span className="font-bold text-slate-900 text-lg lg:text-xl group-hover:text-[#0d6cf2] transition-colors">EAOverseas</span>
                    </Link>

                    {/* Header */}
                    <div className="mb-6 lg:mb-8">
                        <h1 className="text-2xl lg:text-3xl font-black text-slate-900 mb-2 text-left">
                            Create Account
                        </h1>
                        <p className="text-slate-500 text-sm lg:text-base">
                            Join thousands of students achieving their dreams.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-4 lg:space-y-5">
                        {!isGoogleSignup && (
                            <>
                                <div className="flex justify-center">
                                    <button 
                                        type="button" 
                                        onClick={() => handleGoogleSignup()}
                                        className="w-full flex items-center justify-center gap-2 h-10 lg:h-12 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-slate-700 text-sm lg:text-base mb-2 px-4 whitespace-nowrap"
                                    >
                                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                                        <span className="">Continue with Google</span>
                                    </button>
                                </div>

                                <div className="relative flex py-1 items-center">
                                    <div className="flex-grow border-t border-gray-200"></div>
                                    <span className="flex-shrink-0 mx-3 text-gray-400 text-[10px] lg:text-xs uppercase font-bold tracking-wider">Or sign up with Email</span>
                                    <div className="flex-grow border-t border-gray-200"></div>
                                </div>
                            </>
                        )}

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium animate-shake">
                                {error}
                            </div>
                        )}

                        <form className="space-y-4 lg:space-y-5" onSubmit={handleSignup}>

                            {/* Student Form */}
                            <div className="space-y-3 lg:space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full h-10 lg:h-12 px-3 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400"
                                        placeholder="e.g. John Doe"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={isGoogleSignup}
                                        className={`w-full h-10 lg:h-12 px-3 rounded-lg border focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-sm lg:text-base font-medium placeholder:text-gray-400 ${isGoogleSignup ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-50 border-gray-200 focus:bg-white focus:border-[#0d6cf2] text-slate-900'}`}
                                        placeholder="Enter your email"
                                        required
                                    />
                                    {isGoogleSignup && <p className="text-[10px] text-blue-600 font-bold mt-1 ml-1">Verified via Google</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        className="w-full h-10 lg:h-12 px-3 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400"
                                        placeholder="Enter your mobile number"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-1 relative">
                                <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full h-10 lg:h-12 px-3 pr-10 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400"
                                        placeholder="Create a password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                                    >
                                        <span className="material-symbols-outlined text-[18px] lg:text-[20px]">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Referral Code <span className="text-slate-400 font-normal">(Optional)</span></label>
                                <input
                                    type="text"
                                    name="referralCode"
                                    value={formData.referralCode}
                                    onChange={handleChange}
                                    className="w-full h-10 lg:h-12 px-3 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400"
                                    placeholder="Enter referral code"
                                />
                            </div>
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full h-10 lg:h-12 bg-[#0d6cf2] hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/20 text-white text-sm lg:text-base font-bold rounded-lg transition-all mt-2 lg:mt-4 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Saving Account...</span>
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </form>
                    </div>

                    {!isGoogleSignup && (
                        <div className="text-center pt-2">
                            <p className="text-slate-500 text-xs lg:text-sm">Already have an account? <Link to="/login" className="text-[#0d6cf2] font-bold hover:underline">Sign in</Link></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signup;
