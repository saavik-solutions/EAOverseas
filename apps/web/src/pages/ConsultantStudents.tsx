import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

interface Student {
    name: string;
    id: string;
    country: string;
    stage: string;
    priority: string;
    lastInteraction: string;
    detail: string;
    initials: string;
    color: string;
}

const ConsultantStudents = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = React.useState('');
    // Load completed students from localStorage on mount
    const [completedStudents, setCompletedStudents] = React.useState<string[]>(() => {
        const saved = localStorage.getItem('completedStudents');
        return saved ? JSON.parse(saved) : [];
    });
    const [filters, setFilters] = React.useState({
        country: 'All',
        stage: 'All',
        urgency: 'All'
    });

    // Save to localStorage whenever completedStudents changes
    React.useEffect(() => {
        localStorage.setItem('completedStudents', JSON.stringify(completedStudents));
    }, [completedStudents]);

    const [studentData, setStudentData] = React.useState<Student[]>([]);

    // Load and update students from scheduled sessions
    React.useEffect(() => {
        const loadDynamicStudents = () => {
            const savedSessions = localStorage.getItem('scheduled_sessions');
            if (savedSessions) {
                const parsedSessions = JSON.parse(savedSessions);

                // Map unique students from sessions
                const dynamicStudents: Student[] = [];
                const seenIds = new Set<string>();

                parsedSessions.forEach(session => {
                    const studentId = session.studentId;
                    if (!studentId || seenIds.has(studentId)) return;

                    // Create a student object from session data
                    const initials = session.studentName
                        ? session.studentName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                        : 'GU';

                    // Derive country and stage from session data if available, or use defaults
                    // For demo purposes we can map certain topics to stages
                    let stage = 'Initial Consultation';
                    if (session.topic?.toLowerCase().includes('visa')) stage = 'Visa Processing';
                    else if (session.topic?.toLowerCase().includes('ielts') || session.topic?.toLowerCase().includes('test')) stage = 'Test Prep';

                    dynamicStudents.push({
                        name: session.studentName,
                        id: studentId,
                        country: session.country || 'Unassigned',
                        stage: stage,
                        priority: session.priority || 'Medium',
                        lastInteraction: session.dateLabel || 'Just now',
                        detail: session.topic || 'Consultation',
                        initials: initials,
                        color: ['blue', 'orange', 'purple', 'teal'][Math.floor(Math.random() * 4)]
                    });
                    seenIds.add(studentId);
                });

                setStudentData(dynamicStudents);
            }
        };

        loadDynamicStudents();
        // Check for updates every few seconds in case a new session is booked
        const interval = setInterval(loadDynamicStudents, 5000);
        return () => clearInterval(interval);
    }, []);

    // Unique options for filters
    const countries = ['All', ...new Set(studentData.map(s => s.country))];
    const stages = ['All', ...new Set(studentData.map(s => s.stage))];
    const priorities = ['All', ...new Set(studentData.map(s => s.priority))];

    const filteredStudents = studentData.filter(student => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.id.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCountry = filters.country === 'All' || student.country === filters.country;
        const matchesStage = filters.stage === 'All' || student.stage === filters.stage;
        const matchesUrgency = filters.urgency === 'All' || student.priority === filters.urgency;

        return matchesSearch && matchesCountry && matchesStage && matchesUrgency;
    });

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({ country: 'All', stage: 'All', urgency: 'All' });
        setSearchQuery('');
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-gray-50/50">
            {/* Header with breadcrumbs */}
            <PageHeader
                title="My Students"
            />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
                <div className="max-w-[95%] mx-auto space-y-6 pb-10">

                    {/* Header Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                        <div>
                            <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight">Student Management</h2>
                            <p className="text-xs md:text-sm text-gray-500 mt-0.5">Manage and track student progress.</p>
                        </div>
                        {/* Add New Student button removed */}
                    </div>

                    {/* Filters Bar */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-wrap items-center gap-3 shadow-sm">

                        {/* Country Filter */}
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg text-xs md:text-sm text-gray-700 border border-gray-200 hover:border-blue-400 transition-colors">
                            <span className="font-medium text-gray-500">Country:</span>
                            <select
                                value={filters.country}
                                onChange={(e) => handleFilterChange('country', e.target.value)}
                                className="bg-transparent font-medium text-gray-900 outline-none cursor-pointer"
                            >
                                {countries.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        {/* Stage Filter */}
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg text-xs md:text-sm text-gray-700 border border-gray-200 hover:border-blue-400 transition-colors">
                            <span className="font-medium text-gray-500">Stage:</span>
                            <select
                                value={filters.stage}
                                onChange={(e) => handleFilterChange('stage', e.target.value)}
                                className="bg-transparent font-medium text-gray-900 outline-none cursor-pointer"
                            >
                                {stages.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        {/* Urgency Filter */}
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg text-xs md:text-sm text-gray-700 border border-gray-200 hover:border-blue-400 transition-colors">
                            <span className="font-medium text-gray-500">Urgency:</span>
                            <select
                                value={filters.urgency}
                                onChange={(e) => handleFilterChange('urgency', e.target.value)}
                                className="bg-transparent font-medium text-gray-900 outline-none cursor-pointer"
                            >
                                {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>

                        <div className="hidden md:block h-6 w-[1px] bg-gray-200 mx-2"></div>
                        <button onClick={clearFilters} className="text-sm font-medium text-blue-600 hover:underline">Clear Filters</button>

                        <div className="ml-auto flex items-center gap-2 w-full md:w-auto">
                            <div className="relative group/search flex-1 md:flex-none">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg group-focus-within/search:text-blue-500 transition-colors">search</span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-1.5 text-xs md:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none w-full md:w-64 transition-all"
                                />
                            </div>
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shrink-0">
                                <button className="p-1.5 bg-blue-50 text-blue-600">
                                    <span className="material-symbols-outlined text-lg">view_list</span>
                                </button>
                                <button className="p-1.5 text-gray-400 hover:bg-gray-50">
                                    <span className="material-symbols-outlined text-lg">grid_view</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-2 py-3 md:px-6 md:py-4 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider w-8 md:w-12 text-center">
                                            <span className="md:hidden">OK</span>
                                            <span className="hidden md:inline">COMPLETED</span>
                                        </th>
                                        <th className="px-2 py-3 md:px-6 md:py-4 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">NAME</th>
                                        <th className="px-4 py-3 md:px-6 md:py-4 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell">TARGET COUNTRY</th>
                                        <th className="px-2 py-3 md:px-6 md:py-4 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">STAGE</th>
                                        <th className="px-4 py-3 md:px-6 md:py-4 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">PRIORITY</th>
                                        <th className="px-4 py-3 md:px-6 md:py-4 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">LAST INTERACTION</th>
                                        <th className="px-2 py-3 md:px-6 md:py-4 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider text-right">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredStudents.length > 0 ? (
                                        filteredStudents.map((student, idx) => (
                                            <tr key={idx} className="hover:bg-blue-50/30 transition-colors group text-sm">
                                                <td className="px-2 py-3 md:px-6 md:py-4 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={completedStudents.includes(student.id)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setCompletedStudents([...completedStudents, student.id]);
                                                            } else {
                                                                setCompletedStudents(completedStudents.filter(id => id !== student.id));
                                                            }
                                                        }}
                                                        className="size-3.5 md:w-4 md:h-4 accent-green-600 cursor-pointer"
                                                    />
                                                </td>
                                                <td className="px-2 py-3 md:px-6 md:py-4">
                                                    <div className="flex items-center gap-1.5 md:gap-3">
                                                        <div className={`size-7 md:size-9 rounded-full bg-${student.color}-100 flex items-center justify-center text-${student.color}-600 font-bold text-[9px] md:text-sm shrink-0 uppercase`}>
                                                            {student.initials}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-[11px] md:text-sm font-bold text-gray-900 truncate leading-tight">{student.name}</p>
                                                            <p className="text-[9px] text-gray-500 leading-none">#{student.id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 md:px-6 md:py-4 hidden sm:table-cell">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined text-gray-400 text-sm">public</span>
                                                        <span className="text-xs md:text-sm text-gray-600">{student.country}</span>
                                                    </div>
                                                </td>
                                                <td className="px-2 py-3 md:px-6 md:py-4">
                                                    <span className={`text-[9px] md:text-xs font-semibold px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-full border leading-none block w-fit ${student.stage === 'Visa Processing' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                        student.stage === 'App. Submitted' ? 'bg-green-50 text-green-600 border-green-100' :
                                                            'bg-yellow-50 text-yellow-700 border-yellow-100'
                                                        }`}>
                                                        {student.stage}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 md:px-6 md:py-4 hidden md:table-cell">
                                                    <div className={`flex items-center gap-1.5 font-semibold text-[10px] md:text-xs px-2 py-0.5 md:py-1 rounded-lg w-fit ${student.priority === 'Urgent' ? 'text-red-600 bg-red-50' :
                                                        student.priority === 'High' ? 'text-orange-600 bg-orange-50' :
                                                            'text-blue-600 bg-blue-50'
                                                        }`}>
                                                        <span className={`size-1.5 rounded-full ${student.priority === 'Urgent' ? 'bg-red-600 animate-pulse' :
                                                            student.priority === 'High' ? 'bg-orange-600' :
                                                                'bg-blue-600'
                                                            }`}></span>
                                                        {student.priority}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 md:px-6 md:py-4 hidden lg:table-cell">
                                                    <p className="text-xs md:text-sm text-gray-600">{student.lastInteraction}</p>
                                                    <p className="text-[10px] text-gray-400 italic truncate max-w-[120px]">{student.detail}</p>
                                                </td>
                                                <td className="px-2 py-3 md:px-6 md:py-4 text-right">
                                                    <button
                                                        onClick={() => navigate('/counsellor-student-profile?readonly=true')}
                                                        className="text-blue-600 text-[11px] md:text-sm font-bold hover:bg-blue-50 px-2 md:px-4 py-1 md:py-2 rounded-lg transition-colors whitespace-nowrap"
                                                    >
                                                        Profile
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                                No students found matching your filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Table Footer / Pagination */}
                        <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
                            <p className="text-sm text-gray-500">Showing <span className="font-semibold text-gray-900">{filteredStudents.length > 0 ? `1-${filteredStudents.length}` : '0'}</span> of <span className="font-semibold text-gray-900">{studentData.length}</span> students</p>
                            <div className="flex items-center gap-2">
                                <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
                                    <span className="material-symbols-outlined text-lg">chevron_left</span>
                                </button>
                                <button className="size-9 flex items-center justify-center bg-blue-600 text-white rounded-lg font-bold text-sm shadow-sm shadow-blue-600/20">1</button>

                                <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ConsultantStudents;
