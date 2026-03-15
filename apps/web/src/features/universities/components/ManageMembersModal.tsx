import React, { useState } from 'react';

interface Member {
    id: string;
    name: string;
    university: string;
    startDate: string;
    endDate: string;
    progress: number;
    status: 'Current' | 'Past';
    avatar?: string;
    isBlocked?: boolean;
    loginEmail: string;
    loginPassword: string;
    country?: string;
}

interface ManageMembersModalProps {
    isOpen: boolean;
    onClose: () => void;
    members: Member[];
    onToggleBlock: (id: string) => void;
}

// Internal mock data removed to use props from parent

const ManageMembersModal: React.FC<ManageMembersModalProps> = ({ isOpen, onClose, members, onToggleBlock }) => {
    const [openTooltipId, setOpenTooltipId] = useState<string | null>(null);
    const [openAccessMenu, setOpenAccessMenu] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<'Current' | 'Past'>('Current');
    const [activeCredentialId, setActiveCredentialId] = useState<string | null>(null);

    if (!isOpen) return null;

    // Filtering logic updated to use members prop
    const filteredMembers = (members || []).filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.university.toLowerCase().includes(searchQuery.toLowerCase());

        // Any blocked member or past member goes to 'Past Members' tab
        if (activeFilter === 'Past') {
            return (member.status === 'Past' || member.isBlocked) && matchesSearch;
        }
        return (member.status === 'Current' && !member.isBlocked) && matchesSearch;
    });

    // Grouping filtered members by university
    const groupedMembers = filteredMembers.reduce((acc, member) => {
        const key = member.university;
        if (!acc[key]) acc[key] = [];
        acc[key].push(member);
        return acc;
    }, {} as Record<string, Member[]>);

    const groupedEntries = Object.entries(groupedMembers);

    const toggleBlockStatus = (id: string) => {
        onToggleBlock(id);
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-slate-100">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">University Member Management</h3>
                        <p className="text-xs text-slate-500 mt-1">Track and manage student progress across institutions</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {/* Toolbar */}
                <div className="p-4 border-b border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
                    <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
                        <button
                            onClick={() => setActiveFilter('Current')}
                            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeFilter === 'Current' ? 'bg-white text-[#2b6cee] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Current Members
                        </button>
                        <button
                            onClick={() => setActiveFilter('Past')}
                            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeFilter === 'Past' ? 'bg-white text-[#2b6cee] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Past Members
                        </button>
                    </div>

                    <div className="relative w-full sm:w-64">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                        <input
                            type="text"
                            placeholder="Search members..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-0">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className="sticky top-0 bg-slate-50/80 backdrop-blur-md z-10 shadow-sm">
                            <tr>
                                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Member Name</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">University</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Start Date</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">End Date</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Access</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 border-b border-slate-50">
                            {groupedEntries.length > 0 ? (
                                groupedEntries.map(([universityName, team]) => (
                                    <tr key={universityName} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                {/* Stacked Avatars */}
                                                <div className="flex -space-x-3 items-center">
                                                    {team.map((member, idx) => (
                                                        <div
                                                            key={member.id}
                                                            className={`size-9 rounded-full ${member.isBlocked ? 'bg-slate-200 text-slate-500' : 'bg-indigo-600 text-white'} flex items-center justify-center font-bold text-sm ring-2 ring-white shadow-sm border border-indigo-200 transition-transform hover:scale-110 hover:z-10`}
                                                            style={{ zIndex: team.length - idx }}
                                                        >
                                                            {member.name.charAt(0)}
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Names with Click tooltips */}
                                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 max-w-[200px]">
                                                    {team.map((member, idx) => (
                                                        <div key={member.id} className="flex items-center gap-1 relative">
                                                            <div
                                                                className="cursor-pointer group/name relative flex items-center gap-1"
                                                                onClick={() => setActiveCredentialId(activeCredentialId === member.id ? null : member.id)}
                                                            >
                                                                <span className={`text-[13px] font-bold ${member.isBlocked ? 'text-slate-400' : 'text-slate-900'} hover:text-[#2b6cee] transition-colors whitespace-nowrap`}>
                                                                    {member.name}
                                                                </span>
                                                                {idx < team.length - 1 && <span className="text-slate-300 font-medium">&</span>}

                                                                {/* Minimal Tooltip (Click to View) */}
                                                                {activeCredentialId === member.id && (
                                                                    <div
                                                                        className="absolute left-0 top-full mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[150] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                    >
                                                                        {/* Name Header */}
                                                                        <div className="bg-slate-50/50 p-3 border-b border-slate-50 flex items-center justify-between">
                                                                            <div className="flex flex-col">
                                                                                <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight leading-none">{member.name}</span>
                                                                                <span className="text-[8px] font-bold text-[#2b6cee] font-mono mt-0.5">{member.id}</span>
                                                                            </div>
                                                                            <button onClick={() => setActiveCredentialId(null)} className="text-slate-300 hover:text-slate-500 transition-colors">
                                                                                <span className="material-symbols-outlined text-[16px]">close</span>
                                                                            </button>
                                                                        </div>

                                                                        {/* Credentials */}
                                                                        <div className="p-3 space-y-2.5">
                                                                            <div className="group/field">
                                                                                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Account Email</label>
                                                                                <div className="text-[10px] font-bold text-slate-600 truncate bg-slate-50/30 px-2.5 py-1.5 rounded-lg border border-slate-100 group-hover/field:border-indigo-100 transition-all">
                                                                                    {member.loginEmail}
                                                                                </div>
                                                                            </div>

                                                                            <div className="group/field">
                                                                                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Security Key</label>
                                                                                <div className="text-[10px] font-bold text-indigo-600 font-mono bg-indigo-50/20 px-2.5 py-1.5 rounded-lg border border-indigo-100/40 flex items-center justify-between group-hover/field:bg-indigo-50/40 transition-all">
                                                                                    {member.loginPassword}
                                                                                    <span className="material-symbols-outlined text-[14px] text-indigo-200">lock_outline</span>
                                                                                </div>
                                                                            </div>

                                                                            <button
                                                                                onClick={() => {
                                                                                    localStorage.setItem('ea_auto_fill', JSON.stringify({
                                                                                        email: member.loginEmail,
                                                                                        password: member.loginPassword,
                                                                                        role: 'University',
                                                                                        university: member.university,
                                                                                        country: member.country
                                                                                    }));
                                                                                    window.open('/login', '_blank');
                                                                                }}
                                                                                className="w-full h-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-100 active:scale-95"
                                                                            >
                                                                                <span className="material-symbols-outlined text-[14px]">rocket_launch</span>
                                                                                Launch System
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-[13px] text-slate-600 font-bold">{universityName}</span>
                                        </td>
                                        <td className="px-6 py-5 focus-within:z-20">
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-bold text-slate-700 font-mono tracking-tight">{team[0].startDate}</span>
                                                <span className="text-[9px] text-slate-400 font-medium uppercase tracking-tighter">Group Joined</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                {team.every(m => m.status === 'Current' && !m.isBlocked) ? (
                                                    <div className="flex items-center">
                                                        <span className="text-emerald-500 font-black bg-emerald-50/50 px-2 py-0.5 rounded-lg border border-emerald-100 uppercase tracking-widest text-[9px] shadow-sm">Present</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <span className="text-[11px] font-bold text-slate-500 font-mono tracking-tight">{team[0].endDate}</span>
                                                        <span className="text-[9px] text-slate-400 font-medium uppercase tracking-tighter tracking-tighter">Completed</span>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center relative">
                                                {team.length > 1 ? (
                                                    <>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setOpenAccessMenu(openAccessMenu === universityName ? null : universityName);
                                                            }}
                                                            className={`size-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md border ${team.some(m => m.isBlocked)
                                                                ? 'bg-amber-50 text-amber-500 border-amber-100 group-hover:scale-110'
                                                                : 'bg-emerald-50 text-emerald-500 border-emerald-100 hover:bg-emerald-100 hover:scale-110 active:scale-95'
                                                                }`}
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">
                                                                {team.every(m => m.isBlocked) ? 'lock' : team.some(m => m.isBlocked) ? 'lock_open' : 'verified_user'}
                                                            </span>
                                                            <div className="absolute -top-1 -right-1 size-4 bg-indigo-600 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white">
                                                                {team.length}
                                                            </div>
                                                        </button>

                                                        {openAccessMenu === universityName && (
                                                            <>
                                                                <div className="fixed inset-0 z-40" onClick={() => setOpenAccessMenu(null)}></div>
                                                                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                                                    <div className="p-3 border-b border-slate-50 bg-slate-50/50">
                                                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] text-center">Manage Group Access</p>
                                                                    </div>
                                                                    <div className="p-2 space-y-1">
                                                                        {team.map(member => (
                                                                            <button
                                                                                key={member.id}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    toggleBlockStatus(member.id);
                                                                                }}
                                                                                className={`w-full flex items-center justify-between p-2 rounded-xl transition-all ${member.isBlocked ? 'bg-rose-50/50 text-rose-500' : 'hover:bg-slate-50 text-slate-700'}`}
                                                                            >
                                                                                <div className="flex items-center gap-2">
                                                                                    <div className={`size-6 rounded-lg ${member.isBlocked ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'} flex items-center justify-center text-[10px] font-bold`}>
                                                                                        {member.name.charAt(0)}
                                                                                    </div>
                                                                                    <span className="text-xs font-bold truncate max-w-[120px]">{member.name}</span>
                                                                                </div>
                                                                                <span className="material-symbols-outlined text-[16px]">
                                                                                    {member.isBlocked ? 'lock_reset' : 'verified_user'}
                                                                                </span>
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    team.map(member => (
                                                        <button
                                                            key={member.id}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleBlockStatus(member.id);
                                                            }}
                                                            className={`size-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border ${member.isBlocked
                                                                ? 'bg-rose-50 text-rose-500 border-rose-100 scale-95'
                                                                : 'bg-emerald-50 text-emerald-500 border-emerald-100 hover:bg-emerald-100 hover:scale-110 active:scale-95'
                                                                }`}
                                                            title={`${member.isBlocked ? 'Unlock' : 'Block'} ${member.name}`}
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">
                                                                {member.isBlocked ? 'lock_reset' : 'verified_user'}
                                                            </span>
                                                        </button>
                                                    ))
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border ${team.some(m => m.isBlocked)
                                                ? 'bg-rose-50 text-rose-500 border-rose-100'
                                                : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                }`}>
                                                {team.some(m => m.isBlocked) ? 'Blocked' : team[0].status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="size-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                                                <span className="material-symbols-outlined text-3xl">search_off</span>
                                            </div>
                                            <p className="text-sm font-bold text-slate-400">No managers found matching your search</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-[0.1em] hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                    >
                        Close Portal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageMembersModal;
