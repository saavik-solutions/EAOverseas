import React, { useState, useRef, useEffect } from 'react';
import UniversityLayout from '@/layouts/UniversityLayout';
import { useAuth } from '@/shared/contexts/AuthContext';

const UniversityManagementProfile = () => {
    const { user } = useAuth();
    const [universityName, setUniversityName] = useState('Loading Institution...');
    const [establishedYear, setEstablishedYear] = useState('2024');
    const [universityType, setUniversityType] = useState('Partner University');
    const [websiteUrl, setWebsiteUrl] = useState('www.university.edu');
    const [about, setAbout] = useState('A world-leading institution dedicated to academic excellence, innovative research, and fostering a diverse global community. We empower students with the tools and mentorship needed to shape the future through high-impact learning experiences.');
    const [status, setStatus] = useState('ACTIVE');
    const [location, setLocation] = useState('UK');
    const [joinedDate, setJoinedDate] = useState('Joined Just Now');
    const [socialLink, setSocialLink] = useState('n/a');
    const [isEditing, setIsEditing] = useState(false);
    const [logoUrl, setLogoUrl] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuD1_1UnJ_RAFQAv3uqQsl5aBqyV11D-wqgZhFyUuKoeZH_tRdVYpVpdqnJf0s4gZrLUWg4N-ryjpdCj-sz39H4iLjdSAPjOjeALq436wUm5XpBU7Z_wPtyv222JWakvoL_CduonIZdb5zJeCo-pnEI8mKJGnRXYfsWEh6EyWxTP_Sd4ymmHcDlTpthkGIbXDT5eORXPDhnq370mrnBfUh-UmWMFCGxlSaPIN8pkr71i1QhGOE___2kEkEHkjVsU8of-54VdP5VQY-k");

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Social Presence States
    const [socials, setSocials] = useState({
        linkedin: '',
        instagram: '',
        youtube: ''
    });

    const isValidUrl = (url: string, platform: string) => {
        try {
            const normalizedUrl = url.toLowerCase();
            const hasProtocol = normalizedUrl.startsWith('http');
            const urlObj = new URL(hasProtocol ? normalizedUrl : `https://${normalizedUrl}`);

            // Basic domain check
            const domainMatch = urlObj.hostname.includes(platform.toLowerCase());
            return domainMatch && url.includes('.');
        } catch (_) {
            return false;
        }
    };

    const handleVisitLink = (url: string) => {
        const fullUrl = url.startsWith('http') ? url : `https://${url}`;
        window.open(fullUrl, '_blank', 'noopener,noreferrer');
    };

    // Primary Contact Fields
    const [contactPerson, setContactPerson] = useState('Dr. Sarah Mitchell');
    const [contactEmail, setContactEmail] = useState('admissions@university.edu');
    const [contactPhone, setContactPhone] = useState('+1 (555) 000-0000');

    // Sample Programs Data
    const samplePrograms = [
        { name: 'Computer Science', level: 'Undergraduate', duration: '3 Years', icon: 'computer' },
        { name: 'International Relations', level: 'Postgraduate', duration: '1 Year', icon: 'public' },
        { name: 'Biomedical Science', level: 'Undergraduate', duration: '3 Years', icon: 'biotech' },
        { name: 'Philosophy', level: 'Undergraduate', duration: '3 Years', icon: 'auto_stories' }
    ];

    useEffect(() => {
        if (user?.university) {
            setUniversityName(user.university);

            // Try to find more details from storage
            try {
                const savedUnis = JSON.parse(localStorage.getItem('eaoverseas_universities') || '[]');
                const myUni = savedUnis.find((u: any) => u.name === user.university);
                if (myUni) {
                    setWebsiteUrl(myUni.email ? `www.${myUni.email.split('@')[1]}` : 'www.university.edu');
                    // about and other fields could be mapped here if they existed in the university object
                }
            } catch (e) {
                console.error("Failed to load university details", e);
            }
        }
    }, [user]);


    // File input refs
    const logoInputRef = useRef<HTMLInputElement>(null);

    return (
        <UniversityLayout title="University Profile">
            {/* Main Content Area with Page Background Fix */}
            <div className="min-h-screen bg-[#f8fafc]/50 p-8">
                <div className="max-w-7xl mx-auto w-full space-y-12 font-['Public_Sans']">

                    {/* Custom Header within Page for Actions */}
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Profile Management</h2>
                            <p className="text-slate-500 font-medium text-sm">Manage how your university appears to students across the platform.</p>
                        </div>
                    </header>

                    {/* Consolidated Profile Overview Card */}
                    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden font-['Public_Sans']">
                        {/* Header Header */}
                        <div className="p-8 pb-6 flex flex-col md:flex-row items-start justify-between gap-6 border-b border-slate-50">
                            <div className="flex items-start gap-6 flex-1">
                                <div className="w-24 h-24 bg-blue-50/50 rounded-2xl flex items-center justify-center border border-blue-100/50 relative shrink-0 overflow-hidden shadow-inner">
                                    <div className="absolute inset-0 flex items-center justify-center text-4xl font-light text-blue-300/60 opacity-20 select-none">{universityName.charAt(0)}</div>
                                    <img
                                        className="w-16 h-16 object-contain relative z-10"
                                        src={logoUrl}
                                        alt="Logo"
                                    />
                                    <div
                                        onClick={() => logoInputRef.current?.click()}
                                        className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer backdrop-blur-[2px] z-20"
                                    >
                                        <span className="material-symbols-outlined text-white text-2xl">add_a_photo</span>
                                    </div>
                                    <input
                                        type="file"
                                        ref={logoInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleLogoChange}
                                    />
                                </div>

                                <div className="flex-1 pt-1">
                                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={universityName}
                                                onChange={(e) => setUniversityName(e.target.value)}
                                                className="text-3xl font-black text-[#1e293b] leading-none bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all"
                                            />
                                        ) : (
                                            <h1 className="text-3xl font-black text-[#1e293b] leading-none">{universityName}</h1>
                                        )}
                                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-500 text-[10px] font-black rounded-lg uppercase tracking-wider border border-emerald-100/50 shadow-sm shadow-emerald-50">
                                            {status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-slate-400 font-bold text-sm">
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-lg leading-none">location_on</span>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={location}
                                                    onChange={(e) => setLocation(e.target.value)}
                                                    className="mt-0.5 bg-slate-50 border border-slate-200 rounded px-2 py-0.5 outline-none focus:border-blue-500 transition-all"
                                                />
                                            ) : (
                                                <span className="mt-0.5">, {location}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-lg leading-none">history</span>
                                            {isEditing ? (
                                                <div className="flex items-center gap-1">
                                                    <span className="mt-0.5">Est.</span>
                                                    <input
                                                        type="text"
                                                        value={establishedYear}
                                                        onChange={(e) => setEstablishedYear(e.target.value)}
                                                        className="w-16 bg-slate-50 border border-slate-200 rounded px-2 py-0.5 outline-none focus:border-blue-500 transition-all"
                                                    />
                                                </div>
                                            ) : (
                                                <span className="mt-0.5">Est. {establishedYear}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-slate-300">
                                            <span className="material-symbols-outlined text-lg leading-none">calendar_today</span>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={joinedDate}
                                                    onChange={(e) => setJoinedDate(e.target.value)}
                                                    className="mt-0.5 bg-slate-50 border border-slate-200 rounded px-2 py-0.5 outline-none focus:border-blue-500 transition-all"
                                                />
                                            ) : (
                                                <span className="mt-0.5">{joinedDate}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-lg leading-none">link</span>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={socialLink}
                                                    onChange={(e) => setSocialLink(e.target.value)}
                                                    className="mt-0.5 lowercase bg-slate-50 border border-slate-200 rounded px-2 py-0.5 outline-none focus:border-blue-500 transition-all"
                                                />
                                            ) : (
                                                <span className="mt-0.5 lowercase">{socialLink}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`px-5 py-2.5 border rounded-xl text-xs font-black transition-all shadow-sm border-b-2 active:border-b-0 active:translate-y-[1px] tracking-wide ${isEditing
                                    ? "bg-[#1E63F3] border-blue-700 text-white hover:bg-blue-600"
                                    : "bg-white border-slate-200 text-[#475569] hover:bg-slate-50"
                                    }`}
                            >
                                {isEditing ? "Save Changes" : "Edit Profile"}
                            </button>
                        </div>

                        {/* About University Header */}
                        <div className="px-8 pt-8 pb-4">
                            <h4 className="text-xl font-black text-[#1e293b] tracking-tight mb-4">About University</h4>
                            {isEditing ? (
                                <textarea
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    className="w-full text-[#475569] text-sm font-medium leading-[1.65] bg-slate-50 border border-slate-200 rounded-xl p-4 min-h-[120px] outline-none focus:border-blue-500 transition-all"
                                />
                            ) : (
                                <p className="text-[#475569] text-sm font-medium leading-[1.65] max-w-4xl">{about}</p>
                            )}
                        </div>

                        {/* Badges Section */}
                        <div className="px-8 pb-8 flex items-center gap-4 mt-2">
                            <div className="bg-[#f8fafc] border border-slate-100/50 rounded-xl p-3 px-5 flex flex-col gap-1 shadow-sm min-w-[140px]">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em] leading-none">UNIVERSITY TYPE</span>
                                {isEditing ? (
                                    <select
                                        value={universityType}
                                        onChange={(e) => setUniversityType(e.target.value)}
                                        className="text-sm font-black text-[#334155] bg-transparent outline-none cursor-pointer"
                                    >
                                        <option>Partner University</option>
                                        <option>Public Research University</option>
                                        <option>Private Institution</option>
                                        <option>Community College</option>
                                    </select>
                                ) : (
                                    <span className="text-sm font-black text-[#334155]">{universityType}</span>
                                )}
                            </div>
                        </div>

                        {/* Primary Contact Section (Light separator style) */}
                        <div className="mx-8 mb-8 pt-8 border-t border-slate-100/80">
                            <div className="flex items-center gap-2.5 mb-8">
                                <span className="material-symbols-outlined text-[#1E63F3] text-2xl font-black">contact_page</span>
                                <h4 className="text-lg font-black text-[#1e293b] tracking-tight">Primary Contact</h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-1">
                                <div className="space-y-2">
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] block">CONTACT PERSON</span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={contactPerson}
                                            onChange={(e) => setContactPerson(e.target.value)}
                                            className="text-sm font-black text-[#334155] bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none focus:border-blue-500 transition-all w-full"
                                        />
                                    ) : (
                                        <p className="text-sm font-black text-[#334155]">{contactPerson}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] block">EMAIL ADDRESS</span>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={contactEmail}
                                            onChange={(e) => setContactEmail(e.target.value)}
                                            className="text-sm font-black text-[#3b82f6] bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none focus:border-blue-500 transition-all w-full"
                                        />
                                    ) : (
                                        <p className="text-sm font-black text-[#3b82f6] underline decoration-[#3b82f6]/20 underline-offset-4">{contactEmail}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] block">PHONE NUMBER</span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={contactPhone}
                                            onChange={(e) => setContactPhone(e.target.value)}
                                            className="text-sm font-black text-[#334155] bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none focus:border-blue-500 transition-all w-full"
                                        />
                                    ) : (
                                        <p className="text-sm font-black text-[#334155]">{contactPhone}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Summary Row */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            { label: 'Total Programs', value: samplePrograms.length.toString(), icon: 'school' },
                            { label: 'Total Students', value: '15,000+', icon: 'group' },
                            { label: 'Scholarships', value: '12', icon: 'payments' }
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm shadow-slate-200/50 hover:shadow-md transition-all flex flex-col gap-2">
                                <div className="size-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
                                    <span className="material-symbols-outlined text-lg">{stat.icon}</span>
                                </div>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                                <p className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-3 space-y-10">
                            {/* Social Presence */}
                            <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm shadow-slate-200/50 p-8">
                                <h4 className="text-xl font-bold text-slate-900 tracking-tight mb-8 px-1">Social Presence</h4>
                                <div className="space-y-5">
                                    {[
                                        { key: 'linkedin', placeholder: 'LinkedIn Profile URL', icon: 'share', color: 'text-blue-500', platform: 'linkedin' },
                                        { key: 'instagram', placeholder: 'Instagram Profile URL', icon: 'photo_camera', color: 'text-pink-500', platform: 'instagram' },
                                        { key: 'youtube', placeholder: 'YouTube Channel URL', icon: 'play_circle', color: 'text-red-500', platform: 'youtube' }
                                    ].map((social) => {
                                        const value = socials[social.key as keyof typeof socials];
                                        const isUrlValid = isValidUrl(value, social.platform);
                                        const hasText = value.trim().length > 0;
                                        const isWrongPlatform = hasText && !isUrlValid && value.includes('.');

                                        return (
                                            <div key={social.key} className="space-y-1.5 ">
                                                <div className="relative group">
                                                    <span className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:${social.color} transition-colors font-bold`}>{social.icon}</span>
                                                    <input
                                                        className={`w-full pl-12 pr-24 bg-slate-50 border rounded-2xl text-sm py-4 font-medium transition-all placeholder:text-slate-400 outline-none
                                                            ${isWrongPlatform ? 'border-red-300 ring-2 ring-red-50' : 'border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-[#1E63F3]'}
                                                        `}
                                                        placeholder={social.placeholder}
                                                        type="text"
                                                        value={value}
                                                        onChange={(e) => setSocials(prev => ({ ...prev, [social.key]: e.target.value }))}
                                                    />
                                                    {isUrlValid && (
                                                        <button
                                                            onClick={() => handleVisitLink(value)}
                                                            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-blue-100"
                                                        >
                                                            Visit
                                                            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                                                        </button>
                                                    )}
                                                </div>
                                                {isWrongPlatform && (
                                                    <div className="flex items-center gap-1.5 px-4 text-[10px] font-black text-red-500 uppercase tracking-widest animate-in fade-in slide-in-from-top-1">
                                                        <span className="material-symbols-outlined text-[14px]">warning</span>
                                                        Please enter a valid {social.platform} link
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Featured Programs Summary - Full Width */}
                    <div className="space-y-8 pt-4">
                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-xl bg-blue-50 text-[#1E63F3] flex items-center justify-center">
                                    <span className="material-symbols-outlined font-black">school</span>
                                </div>
                                <h4 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Programs Offered</h4>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {samplePrograms.map((program) => (
                                <div key={program.name} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm shadow-slate-100/50 hover:shadow-lg hover:shadow-blue-900/5 hover:-translate-y-1 transition-all group cursor-pointer">
                                    <div className="size-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mb-6 group-hover:bg-blue-50 group-hover:text-[#1E63F3] transition-colors">
                                        <span className="material-symbols-outlined text-2xl leading-none">{program.icon}</span>
                                    </div>
                                    <div className="space-y-1.5 mb-6">
                                        <h5 className="text-lg font-black text-slate-900 leading-tight group-hover:text-[#1E63F3] transition-colors">{program.name}</h5>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-black rounded-md uppercase tracking-wider">{program.level}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                        <div className="flex items-center gap-1.5 text-slate-400">
                                            <span className="material-symbols-outlined text-sm">schedule</span>
                                            <span className="text-[10px] font-bold">{program.duration}</span>
                                        </div>
                                        <span className="material-symbols-outlined text-slate-300 group-hover:text-[#1E63F3] group-hover:translate-x-1 transition-all">arrow_forward</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </UniversityLayout>
    );
};

export default UniversityManagementProfile;
