import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/shared/contexts/AuthContext';

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signup, sendOtp, verifyOtp } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        password: '',
        referralCode: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // OTP Flow
    const [step, setStep] = useState<'form' | 'otp'>('form');
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpSending, setOtpSending] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await signup({ ...formData, role: 'Student', phone: formData.mobileNumber });

            // After successful registration, send OTP
            setOtpSending(true);
            await sendOtp(formData.email);
            setOtpSending(false);
            setStep('otp');
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
            setOtpSending(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setOtpError('');
        setOtpLoading(true);

        try {
            await verifyOtp(formData.email, otp);
            // Email verified! Navigate to login with state to trigger profile redirect after login
            navigate('/login', {
                state: {
                    from: location.state?.from,
                    verified: true,
                    email: formData.email
                }
            });
        } catch (err: any) {
            setOtpError(err.message || 'Invalid OTP. Please try again.');
        } finally {
            setOtpLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setOtpError('');
        setOtpSending(true);
        try {
            await sendOtp(formData.email);
            setOtpError(''); // Clear old errors
        } catch (err: any) {
            setOtpError(err.message || 'Failed to resend OTP.');
        } finally {
            setOtpSending(false);
        }
    };

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
                    {/* Logo */}
                    <Link to="/landing" className="flex items-center gap-2 mb-6 lg:mb-8 group cursor-pointer w-fit">
                        <div className="bg-[#0d6cf2]/10 rounded-lg flex items-center justify-center size-9 lg:size-10 text-[#0d6cf2] transition-colors group-hover:bg-[#0d6cf2]/20">
                            <span className="material-symbols-outlined text-[20px] lg:text-[24px]">school</span>
                        </div>
                        <span className="font-bold text-slate-900 text-lg lg:text-xl group-hover:text-[#0d6cf2] transition-colors">EAOverseas</span>
                    </Link>

                    {step === 'form' ? (
                        <>
                            {/* Header */}
                            <div className="mb-6 lg:mb-8">
                                <h1 className="text-2xl lg:text-3xl font-black text-slate-900 mb-2 text-left">Create Account</h1>
                                <p className="text-slate-500 text-sm lg:text-base">Join thousands of students achieving their dreams.</p>
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-600 text-xs lg:text-sm p-2.5 rounded-lg border border-red-100 flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-[16px]">error</span>
                                    {error}
                                </div>
                            )}

                            {/* Form */}
                            <form className="space-y-4 lg:space-y-5" onSubmit={handleSignup}>
                                <div className="space-y-3 lg:space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Full Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full h-10 lg:h-12 px-3 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400" placeholder="e.g. John Doe" required />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Email Address</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full h-10 lg:h-12 px-3 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400" placeholder="Enter your email" required />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Mobile Number</label>
                                        <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="w-full h-10 lg:h-12 px-3 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400" placeholder="Enter your mobile number" required />
                                    </div>
                                </div>
                                <div className="space-y-1 relative">
                                    <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Password</label>
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className="w-full h-10 lg:h-12 px-3 pr-10 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400" placeholder="Min 8 chars, upper, lower, number, special" required />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
                                            <span className="material-symbols-outlined text-[18px] lg:text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-1 ml-1">8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Referral Code <span className="text-slate-400 font-normal">(Optional)</span></label>
                                    <input type="text" name="referralCode" value={formData.referralCode} onChange={handleChange} className="w-full h-10 lg:h-12 px-3 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400" placeholder="Enter referral code" />
                                </div>
                                <button disabled={isLoading} className="w-full h-10 lg:h-12 bg-[#0d6cf2] hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/20 text-white text-sm lg:text-base font-bold rounded-lg transition-all mt-2 lg:mt-4 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                    {isLoading ? (
                                        <><span className="material-symbols-outlined animate-spin text-lg">progress_activity</span> Creating Account...</>
                                    ) : 'Create Account'}
                                </button>

                                <div className="relative flex py-1 items-center">
                                    <div className="flex-grow border-t border-gray-200"></div>
                                    <span className="flex-shrink-0 mx-3 text-gray-400 text-[10px] lg:text-xs uppercase font-bold tracking-wider">Or sign up with</span>
                                    <div className="flex-grow border-t border-gray-200"></div>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    <button type="button" className="flex items-center justify-center gap-2 h-9 lg:h-11 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-slate-700 text-xs lg:text-sm">
                                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                                        <span className="hidden lg:inline">Google</span>
                                    </button>
                                    <button type="button" className="flex items-center justify-center gap-2 h-9 lg:h-11 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-slate-700 text-xs lg:text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#1877F2" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" /></svg>
                                        <span className="hidden lg:inline">Facebook</span>
                                    </button>
                                    <button type="button" className="flex items-center justify-center gap-2 h-9 lg:h-11 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-slate-700 text-xs lg:text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0077b5" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" /></svg>
                                        <span className="hidden lg:inline">LinkedIn</span>
                                    </button>
                                </div>

                                <div className="text-center pt-2">
                                    <p className="text-slate-500 text-xs lg:text-sm">Already have an account? <Link to="/login" className="text-[#0d6cf2] font-bold hover:underline">Sign in</Link></p>
                                </div>
                            </form>
                        </>
                    ) : (
                        /* ── OTP Verification Step ─────────────────────────── */
                        <>
                            <div className="mb-6 lg:mb-8">
                                <div className="inline-flex items-center justify-center size-14 rounded-xl bg-emerald-50 text-emerald-600 mb-4">
                                    <span className="material-symbols-outlined text-3xl">mail</span>
                                </div>
                                <h1 className="text-2xl lg:text-3xl font-black text-slate-900 mb-2">Verify Your Email</h1>
                                <p className="text-slate-500 text-sm lg:text-base">
                                    We've sent a 6-digit OTP to <strong className="text-slate-800">{formData.email}</strong>
                                </p>
                            </div>

                            {otpError && (
                                <div className="bg-red-50 text-red-600 text-xs lg:text-sm p-2.5 rounded-lg border border-red-100 flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-[16px]">error</span>
                                    {otpError}
                                </div>
                            )}

                            <form className="space-y-5" onSubmit={handleVerifyOtp}>
                                <div className="space-y-1">
                                    <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Enter OTP</label>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        className="w-full h-14 px-4 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-2xl font-bold tracking-[12px] text-center placeholder:text-gray-300 placeholder:tracking-[12px]"
                                        placeholder="000000"
                                        maxLength={6}
                                        required
                                        autoFocus
                                    />
                                </div>

                                <button disabled={otpLoading || otp.length !== 6} className="w-full h-10 lg:h-12 bg-[#0d6cf2] hover:bg-blue-700 text-white text-sm lg:text-base font-bold rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                    {otpLoading ? (
                                        <><span className="material-symbols-outlined animate-spin text-lg">progress_activity</span> Verifying...</>
                                    ) : 'Verify Email'}
                                </button>

                                <div className="text-center">
                                    <p className="text-slate-500 text-xs lg:text-sm">
                                        Didn't receive the code?{' '}
                                        <button type="button" onClick={handleResendOtp} disabled={otpSending} className="text-[#0d6cf2] font-bold hover:underline disabled:opacity-50">
                                            {otpSending ? 'Sending...' : 'Resend OTP'}
                                        </button>
                                    </p>
                                </div>

                                <button type="button" onClick={() => setStep('form')} className="w-full text-sm text-slate-400 hover:text-slate-600 transition-colors">
                                    ← Back to registration
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signup;
