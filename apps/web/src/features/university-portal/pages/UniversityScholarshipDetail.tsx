import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UniversityLayout from '@/layouts/UniversityLayout';

const DEFAULT_SCHOLARSHIPS = [
    {
        id: 1,
        title: 'Global Excellence STEM Award',
        amount: '$45,000',
        level: 'UG',
        type: 'International',
        applied: 45,
        total: 100,
        deadline: 'Dec 31, 2024',
        status: 'Active',
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=GE',
        description: 'Recognizing outstanding international students pursuing advanced degrees in Science, Technology, Engineering, and Mathematics at top-tier partner institutions.',
        eligibility: [
            { title: 'Minimum GPA', value: '3.8 / 4.0 or equivalent', icon: 'grade' },
            { title: 'Degree Level', value: 'Master\'s or Ph.D. Applicants', icon: 'school' },
            { title: 'Regional Eligibility', value: 'Open to International Students', icon: 'public' },
            { title: 'Disciplines', value: 'Physics, Engineering, Computer Science, Biology', icon: 'biotech' }
        ],
        slots: '100'
    },
    {
        id: 2,
        title: 'Future Leaders Fellowship',
        amount: '$12,000',
        level: 'PG',
        type: 'Domestic',
        applied: 82,
        total: 150,
        deadline: 'Nov 30, 2024',
        status: 'Active',
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=FL',
        description: 'Supporting the next generation of social innovators and community leaders.',
        eligibility: [
            { title: 'Social Work', value: 'Proven background', icon: 'grade' },
            { title: 'Degree Level', value: 'PG Level', icon: 'school' }
        ],
        slots: '150'
    },
    {
        id: 3,
        title: 'Sustainability Impact Grant',
        amount: 'Full Tuition',
        level: 'Research',
        type: 'Any',
        applied: 12,
        total: 20,
        deadline: 'Oct 08, 2024',
        status: 'Active',
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=SI',
        description: 'Funding for research projects focused on climate change and renewable energy.',
        eligibility: [
            { title: 'Proposal', value: 'Required', icon: 'grade' }
        ],
        slots: '20'
    }
];

const UniversityScholarshipDetail = () => {
    const { universityName, id: urlId } = useParams<{ universityName: string, id: string }>();
    const navigate = useNavigate();
    const id = urlId || window.location.pathname.split('/').pop() || "";

    const [scholarship, setScholarship] = useState<any>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [applicants, setApplicants] = useState([
        { id: 1, name: 'Elena Rodriguez', major: 'M.S. Robotics', gpa: '3.94', test: '328 GRE', status: 'Reviewing' },
        { id: 2, name: 'Jameson Doe', major: 'Ph.D. Quantum Physics', gpa: '3.82', test: '334 GRE', status: 'Pending Docs' },
        { id: 3, name: 'Aisha Kahn', major: 'B.S. Computer Science', gpa: '4.00', test: '1580 SAT', status: 'Approved' },
        { id: 4, name: 'Marcus Chen', major: 'M.Eng Civil Engineering', gpa: '3.75', test: '315 GRE', status: 'In-Review' },
        { id: 5, name: 'Sarah Miller', major: 'Ph.D. Data Science', gpa: '3.91', test: '331 GRE', status: 'Under Interview' },
        { id: 6, name: 'Ivan Petrov', major: 'M.S. Cybersecurity', gpa: '3.68', test: '310 GRE', status: 'Shortlisted' },
        { id: 7, name: 'Lia Williams', major: 'B.A. Architecture', gpa: '3.88', test: '1490 SAT', status: 'Denied' }
    ]);
    const [formData, setFormData] = useState<any>({
        title: '',
        amount: '',
        description: '',
        deadline: '',
        slots: '',
        eligibility: []
    });

    useEffect(() => {
        const savedRaw = localStorage.getItem('university_scholarships');
        const savedList = savedRaw ? JSON.parse(savedRaw) : [];
        const targetId = id?.trim();
        
        const normalizedSaved = Array.isArray(savedList) ? savedList : [];
        let found = normalizedSaved.find((s: any) => String(s.id).trim() === targetId);
        
        if (!found) {
            found = DEFAULT_SCHOLARSHIPS.find((s: any) => String(s.id).trim() === targetId);
        }

        if (found) {
            setScholarship(found);
            setFormData({
                title: found.title,
                amount: found.amount,
                description: found.description,
                deadline: found.deadline,
                slots: found.slots || found.total,
                eligibility: Array.isArray(found.eligibility) ? found.eligibility : []
            });
        }
    }, [id]);

    const handleUpdate = () => {
        const savedRaw = localStorage.getItem('university_scholarships');
        let savedList = savedRaw ? JSON.parse(savedRaw) : [...DEFAULT_SCHOLARSHIPS];
        
        const updatedList = savedList.map((s: any) => {
            if (String(s.id).trim() === String(scholarship.id).trim()) {
                return { 
                    ...s, 
                    ...formData,
                    total: parseInt(formData.slots) || s.total
                };
            }
            return s;
        });

        localStorage.setItem('university_scholarships', JSON.stringify(updatedList));
        setScholarship({ ...scholarship, ...formData, total: parseInt(formData.slots) || scholarship.total });
        setIsEditModalOpen(false);
    };

    const handleStatusChange = (applicantId: number, newStatus: string) => {
        setApplicants(prev => prev.map(a => a.id === applicantId ? { ...a, status: newStatus } : a));
    };

    const handleToggleApplication = () => {
        const savedRaw = localStorage.getItem('university_scholarships');
        let savedList = savedRaw ? JSON.parse(savedRaw) : [...DEFAULT_SCHOLARSHIPS];
        
        const newStatus = scholarship.status === 'Active' ? 'Expired' : 'Active';
        
        const updatedList = savedList.map((s: any) => {
            if (String(s.id).trim() === String(scholarship.id).trim()) {
                return { ...s, status: newStatus };
            }
            return s;
        });

        localStorage.setItem('university_scholarships', JSON.stringify(updatedList));
        setScholarship({ ...scholarship, status: newStatus });
    };

    const displayName = (universityName || 'University')
        .split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    if (!scholarship) {
        return (
            <UniversityLayout universityName={displayName} pageTitle="Not Found">
                <div className="p-20 text-center">
                    <h2 className="text-2xl font-black text-slate-900">Scholarship Not Found</h2>
                    <button onClick={() => navigate(-1)} className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-xl">Go Back</button>
                </div>
            </UniversityLayout>
        );
    }

    const eligibilityList = Array.isArray(scholarship.eligibility) ? scholarship.eligibility.map((item: any) => {
        if (typeof item === 'string') return { title: 'Criteria', value: item, icon: 'check_circle' };
        return item;
    }) : [];

    return (
        <UniversityLayout universityName={displayName} pageTitle="Scholarship Details">
            <div className="p-6 max-w-[1280px] mx-auto font-['Public_Sans']">
                <div className="bg-white rounded-[20px] border border-slate-100 p-5 shadow-sm mb-4 relative overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`px-2.5 py-1 text-[10px] font-black rounded-lg uppercase tracking-[0.15em] ${scholarship.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-rose-50 text-error font-extrabold border border-rose-100'}`}>
                                    {scholarship.status === 'Active' ? 'Active' : 'Closed'}
                                </span>
                                <span className="text-[12px] text-slate-400 font-bold flex items-center gap-1 uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                                    {scholarship.status === 'Active' ? `Expires ${scholarship.deadline}` : `Closed ${scholarship.deadline}`}
                                </span>
                            </div>
                            <h2 className="text-xl text-slate-900 font-black mb-1 tracking-tight">{scholarship.title}</h2>
                            <p className="text-[11px] text-slate-500 max-w-2xl mb-3 leading-relaxed font-medium">{scholarship.description}</p>
                            
                            <div className="flex flex-wrap gap-3 mb-2">
                                <div className="bg-slate-50/50 px-4 py-3 rounded-xl border border-slate-100 min-w-[140px] shadow-sm">
                                    <p className="text-[8px] text-slate-400 mb-0.5 uppercase font-black tracking-widest">Annual Award</p>
                                    <p className="text-lg text-[#0053cd] font-black">{scholarship.amount}<span className="text-[10px] text-slate-400">/Yr</span></p>
                                </div>
                                <div className="bg-slate-50/50 px-4 py-3 rounded-xl border border-slate-100 min-w-[140px] shadow-sm">
                                    <p className="text-[8px] text-slate-400 mb-0.5 uppercase font-black tracking-widest">Total Slots</p>
                                    <p className="text-lg text-slate-900 font-black">{scholarship.slots || scholarship.total}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 w-full md:w-auto self-start">
                            <button 
                                onClick={() => setIsEditModalOpen(true)}
                                className="bg-[#0053cd] text-white font-black px-8 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 text-[10px] uppercase tracking-widest"
                            >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                Edit Details
                            </button>
                            <button 
                                onClick={handleToggleApplication}
                                className={`font-black px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-[10px] uppercase tracking-widest border ${scholarship.status === 'Active' ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50' : 'bg-green-50 border-green-200 text-green-600 hover:bg-green-100'}`}
                            >
                                <span className="material-symbols-outlined text-[18px]">{scholarship.status === 'Active' ? 'block' : 'undo'}</span>
                                {scholarship.status === 'Active' ? 'Close Applications' : 'Re-open Application'}
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-50">
                        <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Eligibility Criteria</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                            {eligibilityList.map((item: any, index: number) => (
                                <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 transition-colors">
                                    <div className="size-8 rounded-lg bg-white flex items-center justify-center text-blue-600 shadow-sm">
                                        <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{item.title}</p>
                                        <p className="text-[10px] font-bold text-slate-800">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                            <h3 className="text-md font-black text-slate-900 mb-8">Application Trends</h3>
                            <div className="relative h-40">
                                {/* Grid Lines */}
                                <div className="absolute inset-0 flex flex-col justify-between pt-1">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-full border-t border-slate-50 border-dashed"></div>
                                    ))}
                                </div>
                                {/* Bar Chart */}
                                <div className="absolute inset-0 flex items-end justify-between gap-3 px-2">
                                    {[35, 52, 85, 98, 70, 42, 28].map((h, i) => (
                                        <div key={i} className="flex-1 group relative flex flex-col items-center h-full justify-end">
                                            {/* Data Bar */}
                                            <div 
                                                className="w-full bg-gradient-to-t from-[#0053cd] to-[#4c84ff] rounded-t-xl transition-all duration-1000 ease-out group-hover:from-[#2b6cee] group-hover:to-blue-200 relative shadow-[0_0_20px_rgba(43,108,238,0.1)] group-hover:shadow-[0_0_30px_rgba(43,108,238,0.3)] group-hover:-translate-y-1" 
                                                style={{ height: `${h}%` }}
                                            >
                                                {/* Tooltip Overlay */}
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 whitespace-nowrap z-20 pointer-events-none flex flex-col items-center">
                                                    <span className="text-white/60 text-[7px] uppercase tracking-widest">{['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i]}</span>
                                                    <span className="text-[11px]">{h} Applied</span>
                                                    <div className="absolute bottom-[-4px] border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                                                </div>
                                            </div>
                                            <span className="absolute -bottom-7 text-[9px] font-black text-slate-300 uppercase tracking-tighter transition-colors group-hover:text-blue-500">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-8 border-t border-slate-50 pt-4 flex items-center justify-between">
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1.5 cursor-help" title="Active student intake">
                                        <div className="size-2 rounded-full bg-[#2b6cee]"></div>
                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Active Intake</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 cursor-help" title="Weekly target">
                                        <div className="size-2 rounded-full bg-slate-100"></div>
                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Weekly Goal</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black text-green-600 bg-green-50 px-2.5 py-1 rounded-lg uppercase tracking-widest border border-green-100/50">
                                        +18.4% Growth
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                                <h3 className="text-md font-black text-slate-900">Recent Applicants</h3>
                                <button 
                                    onClick={() => setIsViewAllModalOpen(true)}
                                    className="text-[9px] font-black text-[#0053cd] uppercase tracking-widest hover:underline"
                                >
                                    View All
                                </button>
                            </div>
                            <table className="w-full text-left">
                                <tbody className="divide-y divide-slate-50">
                                    {[
                                        { name: 'Elena Rodriguez', major: 'M.S. Robotics', score: 98, status: 'Reviewing' },
                                        { name: 'Jameson Doe', major: 'Ph.D. Quantum Physics', score: 92, status: 'Pending Docs' }
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-50">
                                            <td className="px-6 py-4">
                                                <p className="text-xs font-black text-slate-900">{row.name}</p>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{row.major}</p>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-xs font-black bg-blue-50 text-[#0053cd] px-2 py-1 rounded-lg">{row.score}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right pr-8">
                                                <span className="px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-blue-50 text-[#0053cd]">{row.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-[24px] w-full max-w-xl p-8 shadow-2xl">
                        <h2 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">Edit Scholarship</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
                                <input 
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold"
                                    value={formData.title}
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Grant Amount</label>
                                    <input 
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl font-bold"
                                        value={formData.amount}
                                        onChange={e => setFormData({...formData, amount: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Total Slots</label>
                                    <input 
                                        type="number"
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl font-bold"
                                        value={formData.slots}
                                        onChange={e => setFormData({...formData, slots: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                                <textarea 
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl font-medium text-sm min-h-[80px]"
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                />
                            </div>
                            <div className="pt-4 border-t border-slate-50">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Institutional Criteria</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {formData.eligibility.map((item: any, idx: number) => (
                                        <div key={idx}>
                                            <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest ml-1">{item.title}</label>
                                            <input 
                                                className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-[11px] font-bold"
                                                value={item.value}
                                                onChange={e => {
                                                    const newEl = [...formData.eligibility];
                                                    newEl[idx].value = e.target.value;
                                                    setFormData({...formData, eligibility: newEl});
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end gap-3">
                            <button onClick={() => setIsEditModalOpen(false)} className="px-6 py-2 text-slate-400 font-bold text-xs uppercase tracking-widest">Cancel</button>
                            <button onClick={handleUpdate} className="px-8 py-2 bg-[#0053cd] text-white font-black rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-blue-100">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* View All Modal */}
            {isViewAllModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-[24px] w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Scholarship Applicants</h2>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Total: {scholarship.applied || 0} Registered Candidates</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                                    <input 
                                        placeholder="Search by Name or Major..."
                                        className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <button onClick={() => setIsViewAllModalOpen(false)} className="size-10 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-50">
                                        <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Student Information</th>
                                        <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">GPA</th>
                                        <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Validation</th>
                                        <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Eligibility Result</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {applicants.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.major.toLowerCase().includes(searchQuery.toLowerCase())).map((row) => (
                                        <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4 text-xs">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center font-black text-[10px] text-slate-500 uppercase">
                                                        {row.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-slate-900 group-hover:text-[#0053cd] transition-colors">{row.name}</p>
                                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{row.major}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-[11px] font-black bg-blue-50 text-[#0053cd] px-2 py-1 rounded-lg border border-blue-100/50">{row.gpa}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${parseFloat(row.gpa) >= 3.8 ? 'text-green-600 bg-green-50' : 'text-rose-600 bg-rose-50'}`}>
                                                        {parseFloat(row.gpa) >= 3.8 ? 'Criteria Met' : 'Low GPA'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right pr-6">
                                                <div className="flex items-center justify-end">
                                                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all shadow-sm ${
                                                        parseFloat(row.gpa) >= 3.8 ? 'bg-green-50 text-green-600 border-green-100 shadow-green-50' : 
                                                        'bg-rose-50 text-rose-600 border-rose-100 shadow-rose-50'
                                                    }`}>
                                                        {parseFloat(row.gpa) >= 3.8 ? 'Qualified' : 'Ineligible'}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between rounded-b-[24px]">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Showing verified applicant data records</p>
                            <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-all">
                                <span className="material-symbols-outlined text-[18px]">download</span>
                                Export Full Spreadsheet
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </UniversityLayout>
    );
};

export default UniversityScholarshipDetail;
