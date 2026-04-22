import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProfileCompleted = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [countdown, setCountdown] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        const redirect = setTimeout(() => {
            navigate('/feed');
        }, 10000);

        return () => {
            clearInterval(timer);
            clearTimeout(redirect);
        };
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center flex-1 py-10">
            <div className="w-full max-w-lg bg-white rounded-xl border border-gray-200 p-8 md:p-12 shadow-sm flex flex-col items-center text-center">
                <div className="mb-6 rounded-full bg-blue-50 p-4 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#0d6cf2]" style={{ fontSize: '48px', fontVariationSettings: "'wght' 300" }}>check_circle</span>
                </div>
                <h2 className="text-slate-900 text-2xl font-bold tracking-tight mb-3">
                    You are all set, {user?.name?.split(' ')[0] || 'Student'}
                </h2>
                <p className="text-slate-500 text-base leading-relaxed mb-4 max-w-sm">
                    Your AI consultant is ready to assist you. Start by exploring recommended universities based on your profile.
                </p>
                <p className="text-sm text-slate-400 mb-8">
                    Redirecting to Global Feed in {countdown}s...
                </p>
                <div className="flex flex-col w-full gap-4 items-center">
                    <Link to="/feed"
                        className="w-full max-w-xs h-11 bg-[#0d6cf2] hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2">
                        <span>Go to Global Feed</span>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                    </Link>
                    <Link to="/profile/basic"
                        className="text-sm font-medium text-slate-500 hover:text-[#0d6cf2] underline decoration-slate-300 hover:decoration-[#0d6cf2] underline-offset-4 transition-all">
                        Edit Profile Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileCompleted;
