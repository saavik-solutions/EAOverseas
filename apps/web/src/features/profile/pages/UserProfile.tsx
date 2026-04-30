import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useUserProfile } from '@/features/profile/context/UserProfileContext';

const UserProfile = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { userProfile, sendConnectionRequest, acceptConnectionRequest, removeConnection } = useUserProfile();

    // Determine if we are viewing our own profile
    // Simple check: if no username param or username matches logged in user's name (simplified)
    const isOwnProfile = !username || (user && user.name === username);

    // Use auth user data if available and matching, otherwise fallback or empty
    const displayUser = isOwnProfile ? user : { name: username, isDemo: true }; // Fallback for public viewing

    // Mock Data for Demo/Admin User
    const demoData = {
        name: displayUser?.name || "User Profile",
        email: displayUser?.email || "user@example.com",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDchVeb3pnQlG7miYN4K2qZ3FvzJ_BraFfz7fnE81y6daVb93_nRvdtmIe5JhDRWYUdniaxDtf5aOMeFEmMH_uKnO3jaGZcMIiV1OOqhbDuBV6iZMmHNro2d4fd1I_yoys75ES60YwCpQFin-dgLs6XN1pmJKBT70K1ONBeTAzsRG_HEHX5AC6ICuZkdmV5cHJyejbkmy13_hZS_EZFXELG3W2x0JXa01xdub5lXyGmShDjpaGpE5ehLI9I3fJvA-46_b0sixf8Fdg",
        role: "Student",
        strength: 85,
        gpa: "3.8",
        ielts: "7.5",
        gre: "320",
        degree: "B.Tech",
        major: "Comp Sci.",
        preferences: {
            countries: ['United Kingdom', 'Canada'],
            intakes: ['Fall 2024']
        }
    };

    // Empty State for Fresh Users
    const freshData = {
        name: displayUser?.name || "New User",
        email: displayUser?.email || "",
        avatar: "https://ui-avatars.com/api/?name=" + (displayUser?.name || "User") + "&background=0D8ABC&color=fff",
        role: "Student",
        strength: 0,
        gpa: "--",
        ielts: "--",
        gre: "--",
        degree: "--",
        major: "--",
        preferences: {
            countries: [],
            intakes: []
        }
    };

    // Select data source based on isDemo flag
    const profileData = (displayUser?.isDemo) ? demoData : freshData;

    const COUNTRY_DATA = [
        { name: 'United Kingdom', flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBI_E9U1jS_gp4xuG0ui6rokVHjy15fnzeSWfGlrVPSqNx5r6LN5rMdLuHnkFATSQHiO_cKJGJ2cIME4HHEnK391uxJtMAIXfHrUZ-3d_oJYw9Jpv_U2hyCNkDJNqwjWOZ72hvw-6qGBaBpFJHPzMSnPkABt4J2C0WHD797UfNXxJNkOsShlVBhHIIEdIiUcKrxY3-1GcZJWdLww1nNQArimy4t_iDd0hSLbLnUKl14ED7qXtyMCPsx6Mn_fw9dpnUc16OEYCA-zGI' },
        { name: 'Canada', flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdP77qqKZ_YAR8ltxSVrLctAcKD2d9EwcxLDQc1aQb5Fkjnb56ttvHi-xrwzDW5UaSIDfiM5sGiAenUbF0WLFPYvN7l3IOk5-fg1ovx8WXRAwZCO10cR02xNJAukIm6o5ymr1wR1Q9reteqc4Ei7Fi4v1injK_7sDV81tagbw5DSscsxl2_PNlT61L9wjTq3pQDmnyxvVmqJosC0EXahVOguuNPFBeUkRsnZHpGcvqntlnWE0RNLvbuuk1BwgS6NxIqSxGRz2X0_k' },
    ];

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f8f9fc]">
            {/* Header Removed as requested */}

            {/* Scrollable Content */}
            <div className="flex-1 w-full max-w-[1280px] mx-auto px-4 py-6 overflow-y-auto">
                {/* Back Button */}
                <div onClick={() => navigate('/community-feed')} className="flex items-center gap-1 text-gray-500 hover:text-gray-900 mb-4 cursor-pointer w-fit transition-colors">
                    <span className="material-symbols-outlined top-px relative text-[20px]">arrow_back</span>
                    <span className="text-sm font-medium">Back to Community</span>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-[#111418] tracking-tight text-2xl font-bold leading-tight">Public Profile</h1>
                    {!displayUser?.isDemo && (
                        <span className="bg-yellow-100 text-yellow-800 text-[10px] font-medium px-2 py-0.5 rounded border border-yellow-200">Incomplete Profile</span>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Column: Identity */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-4 flex flex-col items-center relative overflow-hidden">
                            {/* Small Banner */}
                            <div className="absolute top-0 left-0 w-full h-20 z-0 bg-gradient-to-r from-blue-50 to-indigo-50"></div>

                            <div className="relative z-10 mt-2 mb-3">
                                <div
                                    className="size-24 rounded-full border-4 border-white shadow-md bg-center bg-cover"
                                    style={{ backgroundImage: `url("${profileData.avatar}")` }}
                                ></div>
                            </div>

                            <div className="text-center z-10 mb-4">
                                <h2 className="text-[#111418] text-lg font-bold mb-0.5">{profileData.name}</h2>
                                <p className="text-[#60728a] text-xs font-normal mb-1.5">{profileData.role}</p>

                                {/* Connection Count */}
                                {(() => {
                                    // Calculate connections (simulated for verified profiles or public view)
                                    // For simplicity: if viewing own profile, show actual count. If public, show 1 if connected, else 0 or random
                                    const isConnected = userProfile.connections?.[profileData.name] === 'connected';
                                    const count = isOwnProfile ? Object.values(userProfile.connections || {}).filter(s => s === 'connected').length : (isConnected ? 1 : 0);

                                    return (
                                        <p className="text-blue-600 text-xs font-medium hover:underline cursor-pointer">
                                            {count} {count === 1 ? 'Connection' : 'Connections'}
                                        </p>
                                    );
                                })()}
                            </div>

                            {/* Connect Button */}
                            {!isOwnProfile && (
                                (() => {
                                    const status = userProfile.connections?.[profileData.name]; // undefined, 'pending', 'connected'

                                    const handleConnect = () => {
                                        sendConnectionRequest(profileData.name);

                                        // Simulate acceptance after 3 seconds for demo
                                        setTimeout(() => {
                                            acceptConnectionRequest(profileData.name);
                                        }, 3000);
                                    };

                                    if (status === 'connected') {
                                        return (
                                            <div className="w-full flex items-center gap-1 group">
                                                <button disabled className="flex-1 bg-green-50 border border-green-200 text-green-700 font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 cursor-default text-sm">
                                                    <span className="material-symbols-outlined text-[18px]">check</span>
                                                    <span>Connected</span>
                                                </button>
                                                <button
                                                    onClick={() => removeConnection(profileData.name)}
                                                    className="w-10 py-2 bg-gray-50 border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors"
                                                    title="Disconnect"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">person_remove</span>
                                                </button>
                                            </div>
                                        );
                                    }

                                    if (status === 'pending') {
                                        return (
                                            <button disabled className="w-full bg-gray-100 text-gray-500 font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 cursor-not-allowed text-sm">
                                                <span className="material-symbols-outlined text-[18px]">pending</span>
                                                <span>Pending</span>
                                            </button>
                                        );
                                    }

                                    return (
                                        <button
                                            onClick={handleConnect}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 text-sm"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">person_add</span>
                                            <span>Connect</span>
                                        </button>
                                    );
                                })()
                            )}
                            {isOwnProfile && !displayUser?.isDemo && (
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 text-sm">
                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                    <span>Edit Profile</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Profile Highlights */}
                    <div className="lg:col-span-8 flex flex-col gap-4">
                        {/* Academic Snapshot */}
                        <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                                    <span className="material-symbols-outlined !text-[20px]">analytics</span>
                                </div>
                                <h3 className="text-base font-bold text-[#111418]">Academic Snapshot</h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="flex flex-col gap-0.5 p-3 rounded-lg bg-[#f5f7f8]">
                                    <span className="text-[10px] font-bold text-[#60728a] uppercase tracking-wider">GPA</span>
                                    <span className="text-lg font-bold text-[#111418]">{profileData.gpa}</span>
                                </div>
                                <div className="flex flex-col gap-0.5 p-3 rounded-lg bg-[#f5f7f8]">
                                    <span className="text-[10px] font-bold text-[#60728a] uppercase tracking-wider">IELTS</span>
                                    <span className="text-lg font-bold text-[#111418]">{profileData.ielts}</span>
                                </div>
                                <div className="flex flex-col gap-0.5 p-3 rounded-lg bg-[#f5f7f8]">
                                    <span className="text-[10px] font-bold text-[#60728a] uppercase tracking-wider">GRE</span>
                                    <span className="text-lg font-bold text-[#111418]">{profileData.gre}</span>
                                </div>
                                <div className="flex flex-col gap-0.5 p-3 rounded-lg bg-[#f5f7f8]">
                                    <span className="text-[10px] font-bold text-[#60728a] uppercase tracking-wider">Degree</span>
                                    <span className="text-lg font-bold text-[#111418] line-clamp-1">{profileData.degree}</span>
                                </div>
                            </div>
                        </div>

                        {/* Target & Preferences (Read Only) */}
                        <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600">
                                    <span className="material-symbols-outlined !text-[20px]">travel_explore</span>
                                </div>
                                <h3 className="text-base font-bold text-[#111418]">Targets & Preferences</h3>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <p className="text-[10px] font-bold text-[#60728a] uppercase tracking-wider mb-2">Target Countries</p>
                                    {profileData.preferences.countries.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {profileData.preferences.countries.map(countryName => {
                                                const country = COUNTRY_DATA.find(c => c.name === countryName) || { name: countryName, flag: '' };
                                                return (
                                                    <div key={countryName} className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-medium text-gray-700">
                                                        <div className="size-4 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${country.flag}')` }}></div>
                                                        {country.name}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-400 italic">No preferences set</p>
                                    )}
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-[#60728a] uppercase tracking-wider mb-2">Preferred Intake</p>
                                    {profileData.preferences.intakes.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {profileData.preferences.intakes.map(intake => (
                                                <span key={intake} className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white text-gray-600 border border-gray-200">
                                                    {intake}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-400 italic">No preferences set</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
