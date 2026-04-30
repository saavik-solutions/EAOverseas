import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            onClose(); // Close modal on success
            // Optional: Reload or just let state update reflect logged in status
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    const handleCreateAccount = () => {
        onClose();
        navigate('/signup');
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-[360px] lg:max-w-[480px] p-6 lg:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200 scale-100 transition-all">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 lg:top-4 lg:right-4 p-1.5 lg:p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <span className="material-symbols-outlined text-xl lg:text-2xl">close</span>
                </button>

                <div className="text-center mb-5 lg:mb-8">
                    <div className="inline-flex items-center justify-center size-10 lg:size-14 rounded-xl bg-blue-50 text-blue-600 mb-3 lg:mb-4 transition-all">
                        <span className="material-symbols-outlined text-xl lg:text-3xl">lock</span>
                    </div>
                    <h2 className="text-xl lg:text-3xl font-bold font-display text-slate-900 mb-1 lg:mb-2">Welcome back</h2>
                    <p className="text-slate-500 text-xs lg:text-base text-center px-4">Sign in to continue to EAOverseas.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-5">
                    <div className="space-y-1">
                        <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-10 lg:h-12 px-3 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400"
                            placeholder="name@example.com"
                            required
                            autoComplete="username"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-10 lg:h-12 px-3 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400"
                            placeholder="Enter password"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    {error && <p className="text-red-500 text-xs lg:text-sm font-medium text-center">{error}</p>}

                    <button type="submit" className="w-full h-10 lg:h-12 bg-[#0d6cf2] hover:bg-blue-700 text-white text-sm lg:text-base font-bold rounded-lg transition-all shadow-md shadow-blue-500/20 mt-1 lg:mt-2">
                        Sign In
                    </button>

                    <div className="relative flex py-1 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink-0 mx-3 text-gray-400 text-[10px] uppercase font-bold tracking-wider">Or</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <button type="button" className="flex items-center justify-center gap-2 h-9 lg:h-11 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-slate-700 text-xs lg:text-sm">
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                            <span className="hidden lg:inline">Google</span>
                        </button>
                        <button type="button" className="flex items-center justify-center gap-2 h-9 lg:h-11 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-slate-700 text-xs lg:text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0077b5" viewBox="0 0 16 16">
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                            </svg>
                            <span className="hidden lg:inline">LinkedIn</span>
                        </button>
                    </div>
                </form>

                <div className="mt-4 lg:mt-6 p-2.5 lg:p-4 bg-blue-50/50 rounded-lg border border-blue-100 text-center transition-all">
                    <p className="text-[10px] lg:text-xs text-blue-600 font-bold uppercase tracking-wider mb-1 lg:mb-2">Demo Access</p>
                    <div className="flex justify-center gap-3 text-[11px] lg:text-xs text-slate-600">
                        <span className="font-mono bg-white px-2 py-0.5 rounded border border-blue-100">alex.j@example.com</span>
                        <span className="font-mono bg-white px-2 py-0.5 rounded border border-blue-100">5678</span>
                    </div>
                </div>

                <div className="mt-4 lg:mt-6 text-center">
                    <p className="text-slate-500 text-xs lg:text-sm">
                        New to EAOverseas?{' '}
                        <button onClick={handleCreateAccount} className="text-[#0d6cf2] font-bold hover:underline">
                            Create Account
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
