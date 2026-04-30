import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';

const ConsultantTasks = () => {
    // State
    const [activeTab, setActiveTab] = useState('pending');
    const [filters, setFilters] = useState({
        priority: 'All',
        due: 'All',
        type: 'All'
    });
    const [openDropdown, setOpenDropdown] = useState(null); // 'priority', 'due', 'type', 'action-{id}'
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Helper to toggle dropdowns
    const toggleDropdown = (name) => {
        if (openDropdown === name) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(name);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setOpenDropdown(null);
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setFilters({ priority: 'All', due: 'All', type: 'All' });
        setOpenDropdown(null);
        setCurrentPage(1);
    };

    // Data State
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Review SOP Draft v2',
            subtitle: 'Application for University of Toronto',
            student: 'Arjun Mehta',
            studentInitials: 'AM',
            deadline: 'Overdue (2h)',
            deadlineColor: 'bg-red-100 text-red-600',
            priority: 'High',
            priorityColor: 'text-red-500',
            priorityDot: 'bg-red-500',
            type: 'Review',
            status: 'pending'
        },
        {
            id: 2,
            title: 'Financial Document Follow-up',
            subtitle: 'Bank statements and affidavit missing',
            student: 'Sarah Wong',
            studentInitials: 'SW',
            deadline: 'Today, 4 PM',
            deadlineColor: 'bg-orange-100 text-orange-600',
            priority: 'Medium',
            priorityColor: 'text-orange-400',
            priorityDot: 'bg-orange-400',
            type: 'Follow-up',
            status: 'pending'
        },
        {
            id: 3,
            title: 'Schedule Mock Interview',
            subtitle: "Visa preparation for King's College",
            student: 'David Kumar',
            studentInitials: 'DK',
            deadline: 'Tomorrow',
            deadlineColor: 'bg-gray-100 text-gray-500',
            priority: 'Low',
            priorityColor: 'text-gray-400',
            priorityDot: 'bg-gray-300',
            type: 'Meeting',
            status: 'pending'
        },
        {
            id: 4,
            title: 'Call Student: Application Fee',
            subtitle: 'Northeastern Univ payment pending',
            student: 'Elena Petrov',
            studentInitials: 'EP',
            deadline: 'Overdue (5h)',
            deadlineColor: 'bg-red-100 text-red-600',
            priority: 'High',
            priorityColor: 'text-red-500',
            priorityDot: 'bg-red-500',
            type: 'Call',
            status: 'pending'
        },
        {
            id: 5,
            title: 'Update Profile Details',
            subtitle: 'Missing passport information',
            student: 'Raj Patel',
            studentInitials: 'RP',
            deadline: 'In 2 days',
            deadlineColor: 'bg-blue-50 text-blue-600',
            priority: 'Medium',
            priorityColor: 'text-orange-400',
            priorityDot: 'bg-orange-400',
            type: 'Follow-up',
            status: 'pending'
        },
        {
            id: 6,
            title: 'Submit Visa Application',
            subtitle: 'Final review complete',
            student: 'Ananya Gupta',
            studentInitials: 'AG',
            deadline: 'Today',
            deadlineColor: 'bg-orange-100 text-orange-600',
            priority: 'High',
            priorityColor: 'text-red-500',
            priorityDot: 'bg-red-500',
            type: 'Submission',
            status: 'completed'
        }
    ]);

    // Handlers
    const toggleTaskStatus = (id) => {
        setTasks(prevTasks => prevTasks.map(task => {
            if (task.id === id) {
                return { ...task, status: task.status === 'pending' ? 'completed' : 'pending' };
            }
            return task;
        }));
    };

    // Filter Logic
    const filteredTasks = tasks.filter(task => {
        // Tab Filter
        if (activeTab === 'pending' && task.status !== 'pending') return false;
        if (activeTab === 'completed' && task.status !== 'completed') return false;

        // Dropdown Filters
        if (filters.priority !== 'All' && task.priority !== filters.priority) return false;
        if (filters.due !== 'All') {
            if (filters.due === 'Overdue' && !task.deadline.includes('Overdue')) return false;
            if (filters.due === 'Today' && !task.deadline.includes('Today')) return false;
        }
        if (filters.type !== 'All' && task.type !== filters.type) return false;

        return true;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
    const paginatedTasks = filteredTasks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-gray-50/50">
            <PageHeader
                title="My Tasks & Follow-ups"
            // actions removed as requested
            />

            <main className="flex-1 overflow-y-auto p-4 lg:p-6 scroll-smooth">
                {/* WIDER LAYOUT: Removed max-w-6xl, used w-full and minimized padding to ensure it's "visible more from left" */}
                <div className="w-full px-2 lg:px-4 mx-0">

                    {/* Page Heading Subtitle - Removed as per request */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    </div>

                    {/* Tabs */}
                    <div className="mb-6 border-b border-gray-200">
                        <nav className="flex gap-8">
                            {['all', 'pending', 'completed'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-4 border-b-2 text-sm font-semibold capitalize transition-all ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
                                >
                                    {tab === 'all' ? 'All Tasks' : tab}
                                    {tab === 'all' && <span className="ml-2 bg-blue-600/10 px-2 py-0.5 rounded-full text-[10px] text-blue-600">{tasks.length}</span>}
                                    {tab === 'pending' && <span className="ml-2 bg-blue-600/10 px-2 py-0.5 rounded-full text-[10px] text-blue-600">{tasks.filter(t => t.status === 'pending').length}</span>}
                                    {tab === 'completed' && <span className="ml-2 bg-blue-600/10 px-2 py-0.5 rounded-full text-[10px] text-blue-600">{tasks.filter(t => t.status === 'completed').length}</span>}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Filter Chips */}
                    <div className="flex flex-wrap gap-3 mb-6 relative z-20">
                        {/* Priority Filter */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown('priority')}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm text-gray-700"
                            >
                                Priority: {filters.priority} <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                            </button>
                            {openDropdown === 'priority' && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                                    {['All', 'High', 'Medium', 'Low'].map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => handleFilterChange('priority', opt)}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${filters.priority === opt ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Due Date Filter */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown('due')}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm text-gray-700"
                            >
                                Due: {filters.due} <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                            </button>
                            {openDropdown === 'due' && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                                    {['All', 'Today', 'Overdue'].map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => handleFilterChange('due', opt)}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${filters.due === opt ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Type Filter */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown('type')}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm text-gray-700"
                            >
                                Type: {filters.type} <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                            </button>
                            {openDropdown === 'type' && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                                    {['All', 'Follow-up', 'Review', 'Meeting', 'Call', 'Submission'].map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => handleFilterChange('type', opt)}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${filters.type === opt ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex-1"></div>
                        <button
                            onClick={clearFilters}
                            className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline"
                        >
                            <span className="material-symbols-outlined text-sm">filter_list</span>
                            Clear Filters
                        </button>
                    </div>

                    {/* Main Content Layout (Table + Sidebar) */}
                    <div className="flex flex-col xl:flex-row gap-6 items-start">

                        {/* Left Column: Tasks Table */}
                        <div className="flex-1 bg-white rounded-2xl border border-gray-200 overflow-visible shadow-sm w-full">
                            {/* Table */}
                            <div className="overflow-x-auto min-h-[400px]">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="py-4 px-6 w-12 text-gray-500 font-bold text-xs uppercase tracking-wider"></th>
                                            <th className="py-4 px-2 text-gray-500 font-bold text-xs uppercase tracking-wider">Task Title</th>
                                            <th className="py-4 px-4 text-gray-500 font-bold text-xs uppercase tracking-wider">Student Name</th>
                                            <th className="py-4 px-4 text-gray-500 font-bold text-xs uppercase tracking-wider text-center">Deadline</th>
                                            <th className="py-4 px-4 text-gray-500 font-bold text-xs uppercase tracking-wider text-center">Priority</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {paginatedTasks.length > 0 ? (
                                            paginatedTasks.map((task) => (
                                                <tr key={task.id} className={`hover:bg-gray-50 transition-colors group relative ${task.status === 'completed' ? 'bg-gray-50/50' : ''}`}>
                                                    <td className="py-5 px-6">
                                                        <input
                                                            className="size-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer accent-blue-600"
                                                            type="checkbox"
                                                            checked={task.status === 'completed'}
                                                            onChange={() => toggleTaskStatus(task.id)}
                                                        />
                                                    </td>
                                                    <td className="py-5 px-2">
                                                        <p className={`text-sm font-bold ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{task.title}</p>
                                                        <p className="text-xs text-gray-500 mt-1">{task.subtitle}</p>
                                                    </td>
                                                    <td className="py-5 px-4">
                                                        <div className={`flex items-center gap-2 ${task.status === 'completed' ? 'opacity-50' : ''}`}>
                                                            <div className="size-7 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 font-bold text-xs">{task.studentInitials}</div>
                                                            <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">{task.student}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-5 px-4 text-center">
                                                        <span className={`px-3 py-1 ${task.status === 'completed' ? 'bg-gray-100 text-gray-400' : task.deadlineColor} text-xs font-bold rounded-lg`}>
                                                            {task.status === 'completed' ? 'Completed' : task.deadline}
                                                        </span>
                                                    </td>
                                                    <td className="py-5 px-4 text-center">
                                                        <div className={`flex items-center justify-center gap-1.5 ${task.status === 'completed' ? 'opacity-50' : ''}`}>
                                                            <span className={`size-2 rounded-full ${task.priorityDot}`}></span>
                                                            <span className={`text-xs font-bold ${task.priorityColor}`}>{task.priority}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="py-10 text-center text-gray-500">
                                                    No tasks found matching your filters.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="p-4 bg-gray-50 flex items-center justify-between border-t border-gray-200">
                                <p className="text-xs text-gray-500 font-medium">
                                    Showing {paginatedTasks.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredTasks.length)} of {filteredTasks.length} tasks
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        className="size-8 rounded border border-gray-200 flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                                    </button>
                                    <span className="text-xs font-bold mx-2 text-gray-900">Page {currentPage} of {totalPages || 1}</span>
                                    <button
                                        disabled={currentPage === totalPages || totalPages === 0}
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        className="size-8 rounded border border-gray-200 flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Summary Cards */}
                        <div className="flex flex-col w-full xl:w-80 gap-6 shrink-0">
                            <div className="bg-blue-600/5 p-6 rounded-2xl border border-blue-600/10">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="material-symbols-outlined text-blue-600">notifications_active</span>
                                    <h4 className="font-bold text-sm text-gray-900">Action Required</h4>
                                </div>
                                <p className="text-2xl font-extrabold text-gray-900">03</p>
                                <p className="text-xs text-gray-500 mt-1">Tasks past due deadline</p>
                            </div>
                            <div className="bg-green-500/5 p-6 rounded-2xl border border-green-500/10">
                                <div className="flex items-center gap-3 mb-2 text-green-600">
                                    <span className="material-symbols-outlined">verified</span>
                                    <h4 className="font-bold text-sm text-gray-900">Productivity</h4>
                                </div>
                                <p className="text-2xl font-extrabold text-gray-900">88%</p>
                                <p className="text-xs text-gray-500 mt-1">Completion rate this week</p>
                            </div>
                            <div className="bg-orange-500/5 p-6 rounded-2xl border border-orange-500/10">
                                <div className="flex items-center gap-3 mb-2 text-orange-600">
                                    <span className="material-symbols-outlined">schedule</span>
                                    <h4 className="font-bold text-sm text-gray-900">Upcoming</h4>
                                </div>
                                <p className="text-2xl font-extrabold text-gray-900">24</p>
                                <p className="text-xs text-gray-500 mt-1">Tasks scheduled for next 7 days</p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ConsultantTasks;
