import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [step, setStep] = useState(1); // 1: Email, 2: Code
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Hardcoded verification code for demo
    const DEMO_CODE = '123456';

    const handleSendCode = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            if (email === 'alex.j@example.com') {
                setStep(2);
            } else {
                setError('This email does not exist in this website');
                // Auto-hide error after 2 seconds
                setTimeout(() => {
                    setError('');
                }, 2000);
            }
        }, 1500);
    };

    const handleCodeChange = (index: number, value: string) => {
        if (value.length > 1) return; // Prevent multiple chars

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const enteredCode = code.join('');

        if (enteredCode === DEMO_CODE) {
            setLoading(true);
            try {
                // For demo, we just log them in as the admin or new user depending on email? 
                // Or just the generic admin for simplicity if it matches alex?
                // The user said "after entering that code we can login". 
                // So let's try to login with the email provided and a dummy password or just force a login state.
                // Since our AuthContext needs a password, we might need a "passwordless login" method or just simulate it.
                // For now, let's assume if it's Alex, we log in as Alex.

                let passwordToUse = 'password';
                if (email === 'alex.j@example.com') passwordToUse = '5678'; // Using known password for demo continuity

                await login(email, passwordToUse);
                navigate('/');
            } catch (err) {
                // If login fails (e.g. fresh user with unknown password), we might just force a session
                // But for this task, let's keep it simple.
                // If it fails, we show "Login Successful" and redirect manually?
                // Let's actually simulate a successful reset -> login flow.
                navigate('/');
            }
            setLoading(false);
        } else {
            setError('Invalid code. Please try again.');
        }
    };

    return (
        <div className="flex min-h-screen bg-white font-display overflow-hidden">
            {/* Left Side - Image (Same as Login for consistency) */}
            <div className="hidden lg:block w-[50%] bg-[#0d6cf20a] relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop")', filter: 'grayscale(20%)' }}></div>
                <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-16 text-white z-10">
                    <div className="max-w-lg">
                        <h2 className="text-4xl font-bold mb-6">Secure Account Recovery</h2>
                        <p className="text-lg text-blue-100 leading-relaxed">Don't worry, it happens to the best of us. We'll get you back into your account in no time.</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-20 lg:px-24 py-12 overflow-y-auto">
                <div className="max-w-[440px] w-full mx-auto">
                    {/* Header */}
                    <div className="mb-10">
                        <Link to="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 font-medium text-sm">
                            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                            Back to Login
                        </Link>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="size-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[24px]">
                                    {step === 1 ? 'lock_reset' : 'mark_email_read'}
                                </span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 mb-3 text-left">
                            {step === 1 ? 'Forgot Password?' : 'Check your email'}
                        </h1>
                        <p className="text-slate-500">
                            {step === 1
                                ? "Enter your email address and we'll send you a verification code to get back into your account."
                                : `We've sent a 6-digit verification code to ${email}. The code expires in 15 minutes.`
                            }
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 flex items-center gap-2 animate-shake">
                            <span className="material-symbols-outlined text-[18px]">error</span>
                            {error}
                        </div>
                    )}

                    {/* Step 1: Email Form */}
                    {step === 1 && (
                        <form onSubmit={handleSendCode} className="space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-900 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-12 px-4 rounded-xl bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-4 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 font-medium placeholder:text-gray-400"
                                    placeholder="Enter your email"
                                    required
                                    autoFocus
                                />
                            </div>

                            <button
                                disabled={loading}
                                className="w-full h-12 bg-[#0d6cf2] hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading && <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>}
                                {loading ? 'Sending...' : 'Send Verification Code'}
                            </button>
                        </form>
                    )}

                    {/* Step 2: Code Verification Form */}
                    {step === 2 && (
                        <form onSubmit={handleVerify} className="space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-900 ml-1">Verification Code</label>
                                <div className="flex gap-2 justify-between">
                                    {code.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`code-${index}`}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleCodeChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            className="w-12 h-14 text-center text-2xl font-bold rounded-xl bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-4 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900"
                                            required
                                        />
                                    ))}
                                </div>
                                <p className="text-xs text-center text-slate-400 mt-2">
                                    Use code <span className="font-mono font-bold text-slate-600 bg-slate-100 px-1 rounded">123456</span> for demo
                                </p>
                            </div>

                            <button
                                disabled={loading}
                                className="w-full h-12 bg-[#0d6cf2] hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading && <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>}
                                {loading ? 'Verifying...' : 'Verify & Login'}
                            </button>

                            <div className="text-center">
                                <p className="text-sm text-slate-500">
                                    Didn't receive the code?{' '}
                                    <button type="button" onClick={() => { setStep(1); setCode(['', '', '', '', '', '']); }} className="text-[#0d6cf2] font-bold hover:underline">
                                        Resend
                                    </button>
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
