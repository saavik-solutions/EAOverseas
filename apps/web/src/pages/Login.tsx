import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, loginWithGoogle } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [selectedRole, setSelectedRole] = useState('Student');
    const [showRoleDropdown, setShowRoleDropdown] = useState(false);

    const demoCredentials = {
        'Student': { email: 'alex.j@example.com', pass: '5678' },
        'University': { email: 'admin@university.edu', pass: 'UNIV2026' },
        'Counsellor': { email: 'partner@counsellor.com', pass: 'COUNSELLOR2026' },
        'Vendors': { email: 'vendor@services.com', pass: 'VENDOR2026' },
        'Chief Counsel': { email: 'chief@counsel.com', pass: 'CHIEF2026' }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setError('');
            try {
                await loginWithGoogle(tokenResponse.access_token);
                // Redirect based on role or previous location
                const from = location.state?.from || '/feed';
                navigate(from, { replace: true });
            } catch (err: any) {
                setError(err.message || 'Google authentication failed');
            }
        },
        onError: () => {
            setError('Google authentication failed');
        }
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Institutional Fast-Login Logic for University Admins
        if (selectedRole === 'University' && email.endsWith('@eaoverseas.com')) {
            const institutionalId = email.split('@')[0]; // e.g., 'toronto'
            // Construct the path dynamically based on the email prefix
            const universitySlug = institutionalId === 'toronto' 
                ? 'university-of-toronto' 
                : institutionalId === 'melbourne'
                    ? 'university-of-melbourne'
                    : institutionalId.includes('-') ? institutionalId : `university-of-${institutionalId}`;
            
            navigate(`/university-panel/${universitySlug}/courses`);
            return;
        }

        try {
            const user = await login(email, password);
            
            // Redirect based strictly on the DB role assigned to the user
            if (user.role === 'super_admin' || user.role === 'admin') {
                navigate('/superadmin');
            } else if (user.role === 'counsellor') {
                navigate('/counsellor-dashboard');
            } else if (user.role === 'vendor') {
                navigate(`/university-panel/${user.id}`); 
            } else {
                const from = location.state?.from || '/feed';
                navigate(from, { replace: true });
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex min-h-screen bg-white font-display overflow-hidden">
            {/* Left Side - Image */}
            <div className="hidden lg:block w-[50%] bg-[#0d6cf20a] relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{
                    backgroundImage: `url("${selectedRole === 'University'
                        ? 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2686&auto=format&fit=crop'
                        : selectedRole === 'Counsellor'
                            ? 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop'
                            : selectedRole === 'Vendors'
                                ? 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2687&auto=format&fit=crop'
                                : selectedRole === 'Chief Counsel'
                                    ? 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop'
                                    : 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop'
                        }")`,
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
                            <span className="material-symbols-outlined fill-current">star</span>
                        </div>
                        <p className="text-lg leading-relaxed font-medium mb-6">"
                            {selectedRole === 'University'
                                ? "Our international student intake has increased by 40% since using EAOverseas. The verification tools save us countless hours of administrative work."
                                : selectedRole === 'Counsellor'
                                    ? "Client satisfaction has never been higher. The transparency regarding application status allows us to manage expectations and deliver results."
                                    : selectedRole === 'Vendors'
                                        ? "Partnering with EAOverseas has opened new revenue streams. The platform's vendor management system is intuitive and helps us reach thousands of students."
                                        : selectedRole === 'Chief Counsel'
                                            ? "The oversight tools and analytics dashboard give me complete visibility into operations. Managing compliance and counsellor performance has never been easier."
                                            : "EAOverseas helped me find the perfect university program and guided me through every step of the visa process. I couldn't have done it without them!"
                            }"</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/20 bg-cover bg-center border-2 border-white/50" style={{
                                backgroundImage: `url("${selectedRole === 'University'
                                    ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop'
                                    : selectedRole === 'Counsellor'
                                        ? 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop'
                                        : selectedRole === 'Vendors'
                                            ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop'
                                            : selectedRole === 'Chief Counsel'
                                                ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop'
                                                : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyofmbE6BQ1oKD_K5rKFIejNVdgeqUiSyrolvHkNfCE26ZnAXiT-oINCudT0C-fT3MCmy9redQzfVamIOAnrhXrylTrlJkbQPzWlxG7hTppX9A53giOaN0dXM6Yg3W2IXnmrCIHAK7jp5hyFYv-ptAImCikMurQL6guj1jZaXnZbloJ3SOSTuzhdxZ0Nnj6dAjTODFzyzL_gA8HM3MX7QjAv3pDPx-BL07xUcB4uKUW_dao5sgRNXIJtrcbyIivxNSWhyQOVL-cK4'
                                    }")`
                            }}></div>
                            <div>
                                <p className="font-bold text-white">{
                                    selectedRole === 'University' ? 'Prof. David Lee' :
                                        selectedRole === 'Counsellor' ? 'Dr. Alex Morgan' :
                                            selectedRole === 'Vendors' ? 'Michael Chen' :
                                                selectedRole === 'Chief Counsel' ? 'Sarah Williams' :
                                                    'James Anderson'
                                }</p>
                                <p className="text-sm text-blue-200">{
                                    selectedRole === 'University' ? 'Department Head, Oxford Brookes' :
                                        selectedRole === 'Counsellor' ? 'Senior Counsellor, EAOverseas' :
                                            selectedRole === 'Vendors' ? 'Partner, Global Services Ltd' :
                                                selectedRole === 'Chief Counsel' ? 'Chief Counsel, EAOverseas' :
                                                    "Student, King's College London"
                                }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 py-8 overflow-y-auto">
                <div className="max-w-[380px] lg:max-w-[480px] w-full mx-auto transition-all duration-300">
                    {/* Logo */}
                    <Link to="/landing" className="flex items-center gap-2 mb-6 lg:mb-8 group cursor-pointer w-fit">
                        <div className="bg-[#0d6cf2]/10 rounded-lg flex items-center justify-center size-9 lg:size-10 text-[#0d6cf2] transition-colors group-hover:bg-[#0d6cf2]/20">
                            <span className="material-symbols-outlined text-[20px] lg:text-[24px]">school</span>
                        </div>
                        <span className="font-bold text-slate-900 text-lg lg:text-xl group-hover:text-[#0d6cf2] transition-colors">EAOverseas</span>
                    </Link>

                    {/* Header */}
                    <div className="mb-6 lg:mb-8">
                        <h1 className="text-2xl lg:text-3xl font-black text-slate-900 mb-2 text-left">Welcome back</h1>
                        <p className="text-slate-500 text-sm lg:text-base">Please enter your details to sign in.</p>
                    </div>

                    {/* Form */}
                    <form className="space-y-4 lg:space-y-5" onSubmit={handleLogin}>


                        {/* Role Selection Tabs with Dropdown */}
                        <div className="flex gap-2">
                            <div className="bg-gray-100 p-1 rounded-lg flex gap-1 flex-1">
                                {['Student', 'University', 'Counsellor'].map((role) => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => setSelectedRole(role)}
                                        className={`flex-1 py-1.5 lg:py-2 text-xs lg:text-sm font-bold rounded-md transition-all ${selectedRole === role
                                            ? 'bg-white text-gray-900 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>

                            {/* Dropdown Button */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                                    className="bg-gray-100 hover:bg-gray-200 p-1 rounded-lg h-full px-3 transition-all flex items-center justify-center"
                                >
                                    <span className="material-symbols-outlined text-gray-600 text-[20px]">
                                        {showRoleDropdown ? 'expand_less' : 'expand_more'}
                                    </span>
                                </button>

                                {/* Dropdown Menu */}
                                {showRoleDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedRole('Vendors');
                                                setShowRoleDropdown(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Vendors
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedRole('Chief Counsel');
                                                setShowRoleDropdown(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Chief Counsel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Role Description */}
                        <div className="flex gap-2 p-1">
                            <div className="w-0.5 self-stretch bg-[#0d6cf2] rounded-full"></div>
                            <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                                {selectedRole === 'Student' && "Access your applications, universities, loans, and visa process."}
                                {selectedRole === 'University' && "Manage your institution profile, courses, and incoming applications."}
                                {selectedRole === 'Counsellor' && "Connect with students, manage appointments, and guide applications."}
                                {selectedRole === 'Vendors' && "Manage vendor services, partnerships, and service offerings."}
                                {selectedRole === 'Chief Counsel' && "Oversee legal compliance, counsellor operations, and strategic decisions."}
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 text-xs lg:text-sm p-2.5 rounded-lg border border-red-100 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px] lg:text-[18px]">error</span>
                                {error}
                            </div>
                        )}

                        <div className="space-y-3 lg:space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    name={`email_${selectedRole.toLowerCase()}`}
                                    id={`email_${selectedRole.toLowerCase()}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-10 lg:h-12 px-3 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400"
                                    placeholder={demoCredentials[selectedRole].email}
                                    required
                                    autoComplete="username"
                                />
                            </div>
                            <div className="space-y-1 relative">
                                <label className="text-xs lg:text-sm font-bold text-slate-900 ml-1">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-10 lg:h-12 px-3 pr-10 rounded-lg bg-gray-50 border-gray-200 border focus:bg-white focus:border-[#0d6cf2] focus:ring-2 focus:ring-[#0d6cf2]/10 transition-all outline-none text-slate-900 text-sm lg:text-base font-medium placeholder:text-gray-400"
                                        placeholder="••••••••"
                                        required
                                        autoComplete="current-password"
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
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-3.5 h-3.5 lg:w-4 lg:h-4 rounded border-gray-300 text-[#0d6cf2] focus:ring-[#0d6cf2] accent-[#0d6cf2]" />
                                <span className="text-xs lg:text-sm font-medium text-slate-500 group-hover:text-slate-700">Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="text-xs lg:text-sm font-bold text-[#0d6cf2] hover:text-blue-700">Forgot password?</Link>
                        </div>

                        <button className="w-full h-10 lg:h-12 bg-[#0d6cf2] hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/20 text-white text-sm lg:text-base font-bold rounded-lg transition-all">
                            Sign in
                        </button>

                        <div className="relative flex py-1 items-center">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink-0 mx-3 text-gray-400 text-[10px] lg:text-xs uppercase font-bold tracking-wider">Or continue with</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>



                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-2">
                            <button 
                                type="button" 
                                onClick={handleGoogleLogin}
                                className="flex items-center justify-center gap-2 h-9 lg:h-11 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-xs lg:text-sm font-bold text-slate-700"
                            >
                                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                                <span className="hidden sm:inline">Google</span>
                            </button>
                            <button type="button" className="flex items-center justify-center gap-2 h-9 lg:h-11 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-xs lg:text-sm font-bold text-slate-700">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0077b5" viewBox="0 0 16 16">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                                </svg>
                                <span className="hidden sm:inline">LinkedIn</span>
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate('/explore/feed')}
                            className="w-full mt-2 h-10 lg:h-12 border-2 border-[#0d6cf2] text-[#0d6cf2] hover:bg-[#0d6cf2] hover:text-white text-sm lg:text-base font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                        >
                            Continue as Guest
                        </button>

                        <div className="p-2.5 lg:p-4 bg-blue-50 rounded-lg border border-blue-100 text-center transition-all">
                            <p className="text-[10px] lg:text-xs text-blue-600 font-bold uppercase tracking-wider mb-0 lg:mb-1">Demo Access</p>
                            <div className="flex justify-center gap-2 lg:gap-4 mt-1 lg:mt-2">
                                <span className="text-[10px] lg:text-xs text-slate-600">Email: <span className="font-mono font-bold">{demoCredentials[selectedRole].email}</span></span>
                                <span className="text-[10px] lg:text-xs text-slate-600">Pass: <span className="font-mono font-bold">{demoCredentials[selectedRole].pass}</span></span>
                            </div>
                        </div>

                        <p className="text-center text-xs lg:text-sm font-medium text-slate-600">
                            Don't have an account? <Link to="/signup" className="text-[#0d6cf2] font-bold hover:underline">Create account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
