import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import { useUserProfile } from '@/features/profile/context/UserProfileContext';
import ConnectionsPopup from '@/features/profile/components/ConnectionsPopup';

const MyProfile = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isReadOnly = searchParams.get('readonly') === 'true';

    // Data Constants
    const COUNTRY_DATA = [
        { name: 'United Kingdom', flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBI_E9U1jS_gp4xuG0ui6rokVHjy15fnzeSWfGlrVPSqNx5r6LN5rMdLuHnkFATSQHiO_cKJGJ2cIME4HHEnK391uxJtMAIXfHrUZ-3d_oJYw9Jpv_U2hyCNkDJNqwjWOZ72hvw-6qGBaBpFJHPzMSnPkABt4J2C0WHD797UfNXxJNkOsShlVBhHIIEdIiUcKrxY3-1GcZJWdLww1nNQArimy4t_iDd0hSLbLnUKl14ED7qXtyMCPsx6Mn_fw9dpnUc16OEYCA-zGI' },
        { name: 'Canada', flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdP77qqKZ_YAR8ltxSVrLctAcKD2d9EwcxLDQc1aQb5Fkjnb56ttvHi-xrwzDW5UaSIDfiM5sGiAenUbF0WLFPYvN7l3IOk5-fg1ovx8WXRAwZCO10cR02xNJAukIm6o5ymr1wR1Q9reteqc4Ei7Fi4v1injK_7sDV81tagbw5DSscsxl2_PNlT61L9wjTq3pQDmnyxvVmqJosC0EXahVOguuNPFBeUkRsnZHpGcvqntlnWE0RNLvbuuk1BwgS6NxIqSxGRz2X0_k' },
        { name: 'Germany', flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsZdBcA1kidBExiurXcdOSONyxpYd-KAB4qfloWK5MEJRo10MX07AU_TZWGFl_knIoKix1xORC29Jy9qDPvFlHLQjJ1D14NlQbWlpLeNehAVdG7R4RYzQmD2UZYLNdb6zV1Y5IF5v0ugTIsm1wOtoCqj_VMOk-Y58yzQHGKAHs-7ycoqi0nf429nvnDJUfZW7EzmFj4AdV18YXBtnQMrfDjYI2NZDC28P9GcvSGZ8NtROYeerwfnEaT69eGszhzc-WoUSspIpVhd4' },
        { name: 'USA', flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg' },
        { name: 'Australia', flag: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg' },
        { name: 'Ireland', flag: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg' },
        { name: 'New Zealand', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg' },
    ];

    const INTAKE_OPTIONS = ['Fall 2024', 'Spring 2025', 'Fall 2025', 'Spring 2026'];

    // Context
    const { userProfile, updatePreferences, updateIdentity, getConnectionDetails } = useUserProfile();
    const { preferences, identity, academics, readiness } = userProfile;

    // State
    const [isEditingPreferences, setIsEditingPreferences] = useState(false);
    const [showConnections, setShowConnections] = useState(false);

    // Modal State
    const [showCountryModal, setShowCountryModal] = useState(false);
    const [tempSelectedCountries, setTempSelectedCountries] = useState([]);

    // Handlers
    const toggleEditMode = () => {
        if (isEditingPreferences) {
            // Save logic is handled by updatePreferences calls directly in handlers or could be batched here
            setIsEditingPreferences(false);
        } else {
            setIsEditingPreferences(true);
        }
    };

    const openCountryModal = () => {
        setTempSelectedCountries([...(preferences.countries || [])]);
        setShowCountryModal(true);
    };

    const toggleCountrySelection = (countryName) => {
        if (tempSelectedCountries.includes(countryName)) {
            setTempSelectedCountries(prev => prev.filter(c => c !== countryName));
        } else {
            setTempSelectedCountries(prev => [...prev, countryName]);
        }
    };

    const saveCountries = () => {
        updatePreferences({ ...preferences, countries: tempSelectedCountries });
        setShowCountryModal(false);
    };

    const toggleIntake = (intake) => {
        if (!isEditingPreferences) return;

        const current = preferences.intakes || [];
        let newIntakes;
        if (current.includes(intake)) {
            newIntakes = current.filter(i => i !== intake);
        } else {
            newIntakes = [...current, intake];
        }
        updatePreferences({ ...preferences, intakes: newIntakes });
    };


    // Image Upload State
    // Prioritize user profile image, fallback to context default or placeholder
    const [profileImage, setProfileImage] = useState(identity.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwOf0s3pAzKqObTWJ9nRCMKaHDRDwvbDhO9sFXL0JQPG24TX6Z_QyJf55dIzkQoAgus8p8gE38nhnMt-PtfxoIMmzdNxhbDqCbPOz3cJuQoDrXO3I2wPvGsHzn8GfsBCJjHLcJR6SWs04u4ihpPaW9VUI-XlrPhYvmL9DsG3dAwc-Z__Zgxhq892QgjQtEKSwUpVnOD_0jhVBEl-K53XBePLsXdfX5R9f-sto6ECHWwMTa-erfA_QfrmenNf9BKHj7OrZp-7cdMZ4');
    const [bannerImage, setBannerImage] = useState(identity.banner || null);

    const profileInputRef = React.useRef(null);
    const bannerInputRef = React.useRef(null);

    const handleImageUpload = (e, setCbk, field) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCbk(imageUrl);
            // Update context
            updateIdentity({ [field]: imageUrl });
        }
    };

    // Calculate Progress Circle Dash Array
    const profileStrength = identity.profileStrength || 0;
    const progressValue = `${profileStrength}, 100`;

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f8f9fc]">
            {/* Header */}
            <div className="hidden lg:block">
                <PageHeader title="My Profile" />
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
                {/* Page Title & Last Updated */}
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h1 className="text-[#111418] tracking-tight text-2xl md:text-[32px] font-bold leading-tight">My Profile</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Identity & Navigation */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Identity Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-6 flex flex-col items-center relative group/banner">
                            <div
                                className="absolute top-0 left-0 w-full h-20 md:h-24 z-0 bg-cover bg-center transition-all rounded-t-xl"
                                style={{
                                    backgroundImage: bannerImage ? `url("${bannerImage}")` : 'none',
                                    backgroundColor: bannerImage ? 'transparent' : ''
                                }}
                            >
                                {!bannerImage && <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50"></div>}
                                {!isReadOnly && (
                                    <button
                                        onClick={() => bannerInputRef.current.click()}
                                        className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm backdrop-blur-sm text-gray-600 hover:text-blue-600 transition-all opacity-0 group-hover/banner:opacity-100"
                                        title="Change Banner"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">add_a_photo</span>
                                    </button>
                                )}
                                <input
                                    type="file"
                                    ref={bannerInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, setBannerImage, 'banner')}
                                />
                            </div>

                            {/* Profile Image Section */}
                            <div className={`relative z-10 mt-4 mb-3 md:mb-4 group ${!isReadOnly ? 'cursor-pointer' : ''}`} onClick={!isReadOnly ? () => profileInputRef.current.click() : undefined}>
                                <div
                                    className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-white shadow-md bg-center bg-cover transition-all"
                                    style={{ backgroundImage: `url("${profileImage}")` }}
                                ></div>
                                {!isReadOnly && (
                                    <div className="absolute bottom-1 right-1 bg-white rounded-full p-1.5 shadow-sm border border-gray-100 flex items-center justify-center transition-transform group-hover:scale-110">
                                        <span className="material-symbols-outlined text-[16px] text-blue-600">edit</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={profileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, setProfileImage, 'image')}
                                />
                            </div>

                            <div className="text-center z-10 mb-5 md:mb-6 w-full relative">
                                <h2 className="text-[#111418] text-lg md:text-xl font-bold mb-0.5 md:mb-1 truncate px-4" title={identity.name}>{identity.name || 'Set Your Name'}</h2>
                                <p className="text-[#60728a] text-xs md:text-sm font-normal truncate px-4 mb-1" title={identity.email}>{identity.email || 'No email provided'}</p>
                                
                                {identity.studentId && (
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
                                        <span className="material-symbols-outlined text-[14px] md:text-[16px]">id_card</span>
                                        <span>ID: {identity.studentId}</span>
                                    </div>
                                )}

                                <div className="relative inline-block">
                                    <button
                                        onClick={() => setShowConnections(!showConnections)}
                                        className="text-blue-600 text-sm font-medium hover:underline cursor-pointer focus:outline-none"
                                    >
                                        {Object.values(userProfile.connections || {}).filter(s => s === 'connected').length} Connections
                                    </button>

                                    <ConnectionsPopup
                                        isOpen={showConnections}
                                        onClose={() => setShowConnections(false)}
                                        connections={getConnectionDetails()}
                                    />
                                </div>
                            </div>
                            {/* Circular Progress */}
                            <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6 w-full justify-center">
                                <div className="relative size-14 md:size-16">
                                    <svg className="circular-chart text-blue-600" viewBox="0 0 36 36">
                                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                                        <path className="circle stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeDasharray={progressValue}></path>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xs font-bold text-blue-600">{profileStrength}%</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-[#111418]">Profile Strength</span>
                                    <span className="text-xs text-[#60728a]">{profileStrength < 100 ? 'Almost there! Add activity.' : 'Excellent! Profile complete.'}</span>
                                </div>
                            </div>
                            {!isReadOnly && (
                                <button
                                    onClick={() => navigate('/profile/edit')}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 md:py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                                >
                                    <span>Edit Profile</span>
                                </button>
                            )}
                        </div>
                        {/* Quick Profile Sections */}
                        {!isReadOnly && (
                            <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
                                <div className="p-4 border-b border-[#f0f2f5]">
                                    <h3 className="font-bold text-[#111418]">Quick Access</h3>
                                </div>
                                <div className="flex flex-col">
                                    {/* Item 1 */}
                                    <Link to="/referrals" className="group flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-[#f0f2f5] last:border-0">
                                        <div className="flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0 size-10">
                                            <span className="material-symbols-outlined text-[20px]">group_add</span>
                                        </div>
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <p className="text-[#111418] text-sm font-bold leading-normal truncate">Referrals</p>
                                            <p className="text-[#60728a] text-xs font-normal leading-normal truncate">Invite friends & earn</p>
                                        </div>
                                        <span className="material-symbols-outlined text-[#60728a] text-[20px] group-hover:translate-x-1 transition-transform">chevron_right</span>
                                    </Link>

                                    {/* Item 3 */}
                                    <Link to="/saved-colleges" className="group flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-[#f0f2f5] last:border-0">
                                        <div className="flex items-center justify-center rounded-lg bg-purple-50 text-purple-600 shrink-0 size-10">
                                            <span className="material-symbols-outlined text-[20px]">account_balance</span>
                                        </div>
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <p className="text-[#111418] text-sm font-bold leading-normal truncate">Saved Colleges</p>
                                            <p className="text-[#60728a] text-xs font-normal leading-normal truncate">View shortlisted universities</p>
                                        </div>
                                        <span className="material-symbols-outlined text-[#60728a] text-[20px] group-hover:translate-x-1 transition-transform">chevron_right</span>
                                    </Link>
                                    {/* Item 4 */}
                                    <Link to="/saved-courses" className="group flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-[#f0f2f5] last:border-0">
                                        <div className="flex items-center justify-center rounded-lg bg-orange-50 text-orange-600 shrink-0 size-10">
                                            <span className="material-symbols-outlined text-[20px]">bookmarks</span>
                                        </div>
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <p className="text-[#111418] text-sm font-bold leading-normal truncate">Saved Courses</p>
                                            <p className="text-[#60728a] text-xs font-normal leading-normal truncate">Manage bookmarked programs</p>
                                        </div>
                                        <span className="material-symbols-outlined text-[#60728a] text-[20px] group-hover:translate-x-1 transition-transform">chevron_right</span>
                                    </Link>
                                    {/* Item 5 */}
                                    <Link to="/saved-accommodations" className="group flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors last:border-0">
                                        <div className="flex items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 shrink-0 size-10">
                                            <span className="material-symbols-outlined text-[20px]">holiday_village</span>
                                        </div>
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <p className="text-[#111418] text-sm font-bold leading-normal truncate">Saved Accommodations</p>
                                            <p className="text-[#60728a] text-xs font-normal leading-normal truncate">View shortlisted housing</p>
                                        </div>
                                        <span className="material-symbols-outlined text-[#60728a] text-[20px] group-hover:translate-x-1 transition-transform">chevron_right</span>
                                    </Link>

                                    {/* Item 6: Saved Posts */}
                                    <Link to="/saved-posts" className="group flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors last:border-0">
                                        <div className="flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0 size-10">
                                            <span className="material-symbols-outlined text-[20px]">dynamic_feed</span>
                                        </div>
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <p className="text-[#111418] text-sm font-bold leading-normal truncate">Saved Posts</p>
                                            <p className="text-[#60728a] text-xs font-normal leading-normal truncate">View saved articles</p>
                                        </div>
                                        <span className="material-symbols-outlined text-[#60728a] text-[20px] group-hover:translate-x-1 transition-transform">chevron_right</span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Right Column: Profile Highlights */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Academic Snapshot */}
                        <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                        <span className="material-symbols-outlined">analytics</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#111418]">Academic Snapshot</h3>
                                </div>
                                {!isReadOnly && (
                                    <button onClick={() => navigate('/profile/academic-snapshot')} className="text-sm font-medium text-blue-600 hover:text-blue-700">View Details</button>
                                )}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="flex flex-col gap-1 p-4 rounded-lg bg-[#f5f7f8]">
                                    <span className="text-xs font-medium text-[#60728a] uppercase tracking-wider">GPA</span>
                                    <span className="text-2xl font-bold text-[#111418]">{academics.gpa || '--'}</span>
                                    <span className="text-xs text-green-600 flex items-center gap-1">
                                        {academics.gpa ? <><span className="material-symbols-outlined text-[14px]">trending_up</span> Good</> : <span className="text-gray-400">Add Score</span>}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1 p-4 rounded-lg bg-[#f5f7f8]">
                                    <span className="text-xs font-medium text-[#60728a] uppercase tracking-wider">IELTS</span>
                                    <span className="text-2xl font-bold text-[#111418]">{academics.ielts || '--'}</span>
                                    <span className="text-xs text-[#60728a]">Band Score</span>
                                </div>
                                <div className="flex flex-col gap-1 p-4 rounded-lg bg-[#f5f7f8]">
                                    <span className="text-xs font-medium text-[#60728a] uppercase tracking-wider">GRE</span>
                                    <span className="text-2xl font-bold text-[#111418]">{academics.gre || '--'}</span>
                                    <span className="text-xs text-[#60728a]">Verbal: --</span>
                                </div>
                                <div className="flex flex-col gap-1 p-4 rounded-lg bg-[#f5f7f8]">
                                    <span className="text-xs font-medium text-[#60728a] uppercase tracking-wider">Degree</span>
                                    <span className="text-lg font-bold text-[#111418] truncate" title={academics.degree}>{academics.degree || '--'}</span>
                                    <span className="text-xs text-[#60728a] truncate" title={academics.major}>{academics.major || 'Major'}</span>
                                </div>
                            </div>
                        </div>
                        {/* Target & Preferences */}
                        <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                        <span className="material-symbols-outlined">travel_explore</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#111418]">Targets & Preferences</h3>
                                </div>
                                {!isReadOnly && (
                                    <button
                                        onClick={toggleEditMode}
                                        className={`text-sm font-medium ${isEditingPreferences ? 'text-green-600 hover:text-green-700 bg-green-50 px-3 py-1 rounded-lg' : 'text-blue-600 hover:text-blue-700'}`}
                                    >
                                        {isEditingPreferences ? 'Save Changes' : 'Edit'}
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-col gap-6">
                                {/* Countries */}
                                <div>
                                    <p className="text-xs font-bold text-[#60728a] uppercase tracking-wider mb-3">Target Countries</p>
                                    <div className="flex flex-wrap gap-2">
                                        {(preferences.countries || []).map(countryName => {
                                            const country = COUNTRY_DATA.find(c => c.name === countryName) || { name: countryName, flag: '' };
                                            return (
                                                <div
                                                    key={countryName}
                                                    className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border shadow-sm text-sm font-medium animate-fadeIn transition-colors ${isEditingPreferences
                                                        ? 'bg-red-50 border-red-100 text-red-700 cursor-pointer hover:bg-red-100 hover:border-red-200 group'
                                                        : 'bg-white border-gray-200 text-gray-700'
                                                        }`}
                                                    onClick={() => {
                                                        if (isEditingPreferences) {
                                                            const newCountries = (preferences.countries || []).filter(c => c !== countryName);
                                                            updatePreferences({ ...preferences, countries: newCountries });
                                                        }
                                                    }}
                                                    title={isEditingPreferences ? "Click to remove" : ""}
                                                >
                                                    <div className="w-5 h-5 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${country.flag}')` }}></div>
                                                    {country.name}
                                                    {isEditingPreferences && (
                                                        <span className="material-symbols-outlined text-[16px] ml-1 group-hover:scale-110 transition-transform">close</span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                        {(!preferences.countries || preferences.countries.length === 0) && !isEditingPreferences && (
                                            <span className="text-sm text-gray-400 italic">No countries selected</span>
                                        )}

                                        {isEditingPreferences && (
                                            <button
                                                onClick={openCountryModal}
                                                className="flex items-center justify-center size-8 rounded-full border border-dashed border-gray-300 text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-colors bg-gray-50 hover:bg-white"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">add</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {/* Intake */}
                                <div>
                                    <p className="text-xs font-bold text-[#60728a] uppercase tracking-wider mb-3">Preferred Intake</p>
                                    <div className="flex flex-wrap gap-2">
                                        {(isEditingPreferences ? INTAKE_OPTIONS : (preferences.intakes || [])).map(intake => {
                                            const isSelected = (preferences.intakes || []).includes(intake);

                                            if (!isEditingPreferences && !isSelected) return null;

                                            return (
                                                <button
                                                    key={intake}
                                                    onClick={() => toggleIntake(intake)}
                                                    disabled={!isEditingPreferences}
                                                    className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${isSelected
                                                        ? 'bg-blue-50 text-blue-600 border-blue-100 shadow-sm'
                                                        : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                                                        } ${isEditingPreferences ? 'cursor-pointer hover:shadow-md' : 'cursor-default'}`}
                                                >
                                                    {intake}
                                                </button>
                                            );
                                        })}
                                        {(!preferences.intakes || preferences.intakes.length === 0) && !isEditingPreferences && (
                                            <span className="text-sm text-gray-400 italic">No intake preferences set</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Country Selection Modal */}
                        {showCountryModal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
                                <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-scaleIn">
                                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-gray-900">Select Countries</h3>
                                        <button onClick={() => setShowCountryModal(false)} className="text-gray-400 hover:text-gray-600">
                                            <span className="material-symbols-outlined">close</span>
                                        </button>
                                    </div>
                                    <div className="p-4 max-h-[60vh] overflow-y-auto">
                                        <div className="grid grid-cols-1 gap-2">
                                            {COUNTRY_DATA.map(country => (
                                                <button
                                                    key={country.name}
                                                    onClick={() => toggleCountrySelection(country.name)}
                                                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${tempSelectedCountries.includes(country.name)
                                                        ? 'bg-blue-50 border-blue-200 shadow-sm'
                                                        : 'bg-white border-gray-100 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${tempSelectedCountries.includes(country.name)
                                                        ? 'bg-blue-600 border-blue-600'
                                                        : 'bg-white border-gray-300'
                                                        }`}>
                                                        {tempSelectedCountries.includes(country.name) && (
                                                            <span className="material-symbols-outlined text-white text-[14px]">check</span>
                                                        )}
                                                    </div>
                                                    <div className="w-6 h-6 rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${country.flag}')` }}></div>
                                                    <span className={`text-sm font-medium ${tempSelectedCountries.includes(country.name) ? 'text-gray-900' : 'text-gray-600'
                                                        }`}>{country.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                                        <button
                                            onClick={() => setShowCountryModal(false)}
                                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={saveCountries}
                                            className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm"
                                        >
                                            Save Selected
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Readiness Summary */}
                        <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                                    <span className="material-symbols-outlined">verified_user</span>
                                </div>
                                <h3 className="text-lg font-bold text-[#111418]">Readiness Summary</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Card 1 */}
                                <div className="p-4 rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-[64px] text-green-500">airplane_ticket</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium text-[#60728a]">Visa Status</p>
                                        <p className="text-lg font-bold text-green-600 mt-1">{readiness.visaStatus || 'Not Started'}</p>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                        <div className={`h-1.5 rounded-full ${readiness.visaStatus === 'On Track' ? 'bg-green-500 w-[85%]' : 'bg-gray-300 w-0'}`}></div>
                                    </div>
                                </div>
                                {/* Card 2 */}
                                <div className="p-4 rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-[64px] text-blue-600">description</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium text-[#60728a]">Applications</p>
                                        <p className="text-lg font-bold text-blue-600 mt-1">{readiness.applicationsDraft || 0} Drafts</p>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                        <div className={`h-1.5 rounded-full ${readiness.applicationsDraft > 0 ? 'bg-blue-600 w-[40%]' : 'bg-gray-300 w-0'}`}></div>
                                    </div>
                                </div>
                                {/* Card 3 */}
                                <div className="p-4 rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-[64px] text-orange-500">currency_pound</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium text-[#60728a]">Education Loan</p>
                                        <p className="text-lg font-bold text-orange-600 mt-1">{readiness.loanStatus || 'Not Started'}</p>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                        <div className={`h-1.5 rounded-full ${readiness.loanStatus === 'Pre-Approved' ? 'bg-orange-500 w-[75%]' : 'bg-gray-300 w-0'}`}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MyProfile;
