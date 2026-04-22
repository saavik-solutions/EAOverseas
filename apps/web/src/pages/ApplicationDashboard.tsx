import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSavedItems } from '../context/SavedItemsContext';

const ApplicationDashboard = () => {
    const navigate = useNavigate();
    const { myApplications, withdrawApplication } = useSavedItems();
    const [activeTab, setActiveTab] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortOption, setSortOption] = useState('Recent');

    const filteredApplications = useMemo(() => {
        if (!myApplications) return [];
        let result = [...myApplications];

        if (activeTab === 'Ongoing') {
            result = result.filter(app => ['Submitted', 'Pending Decision', 'Draft'].includes(app.status));
        } else if (activeTab === 'Past') {
            result = result.filter(app => ['Accepted', 'Rejected'].includes(app.status));
        }

        if (statusFilter !== 'All') {
            result = result.filter(app => app.status.includes(statusFilter) || (statusFilter === 'Pending' && app.status === 'Pending Decision'));
        }

        result.sort((a, b) => {
            if (sortOption === 'Priority') {
                const priorityMap = { 'High': 3, 'Medium': 2, 'Low': 1 };
                return priorityMap[b.priority] - priorityMap[a.priority];
            } else if (sortOption === 'Intake') {
                return a.intake.localeCompare(b.intake);
            }
            return b.id - a.id;
        });

        return result;
    }, [activeTab, statusFilter, sortOption, myApplications]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Submitted': return 'bg-blue-50 text-blue-700 border-blue-100';
            case 'Accepted': return 'bg-green-50 text-green-700 border-green-100';
            case 'Pending Decision': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
            case 'Draft': return 'bg-gray-100 text-gray-600 border-gray-200';
            default: return 'bg-gray-50 text-gray-600';
        }
    };

    const getStatusDot = (status) => {
        switch (status) {
            case 'Submitted': return 'bg-blue-600';
            case 'Accepted': return 'bg-green-600';
            case 'Pending Decision': return 'bg-yellow-600';
            case 'Draft': return 'bg-gray-400';
            default: return 'bg-gray-400';
        }
    };

    const getPriorityIcon = (priority) => {
        if (priority === 'High') return <span className="material-symbols-outlined text-red-500 !text-[16px]">priority_high</span>;
        if (priority === 'Medium') return <span className="material-symbols-outlined text-orange-400 !text-[16px]">remove</span>;
        return <span className="material-symbols-outlined text-green-500 !text-[16px]">arrow_downward</span>;
    };

    const [appToWithdraw, setAppToWithdraw] = useState(null);

    const handleWithdrawClick = (id) => {
        setAppToWithdraw(id);
    };

    const confirmWithdraw = () => {
        if (appToWithdraw) {
            withdrawApplication(appToWithdraw);
            setAppToWithdraw(null);
        }
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f8f9fc]">
            {/* Specific Header for Application Dashboard */}
            <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0 z-10">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-900 font-medium">Applications</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative hidden lg:block">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 !text-[20px]">search</span>
                        <input className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-64 placeholder-gray-400" placeholder="Search applications..." type="text" />
                    </div>
                    <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors lg:hidden">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto bg-[#f8f9fc] p-6">
                <div className="max-w-7xl mx-auto flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>
                            <p className="text-sm text-gray-500">Track and manage your university applications in one place.</p>
                        </div>
                    </div>

                    {/* Filters Toolbar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                            {['All', 'Ongoing', 'Past'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${activeTab === tab
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900'
                                        }`}
                                >
                                    {tab === 'All' ? 'All Applications' : tab}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <div className="relative w-full sm:w-auto">
                                <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 !text-[18px]">filter_list</span>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full sm:w-40 pl-9 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
                                >
                                    <option value="All">Status: All</option>
                                    <option value="Submitted">Submitted</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Pending">Pending Decision</option>
                                    <option value="Draft">Draft</option>
                                </select>
                            </div>
                            <div className="relative w-full sm:w-auto">
                                <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 !text-[18px]">sort</span>
                                <select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    className="w-full sm:w-40 pl-9 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
                                >
                                    <option value="Recent">Sort by: Recent</option>
                                    <option value="Priority">Priority: High</option>
                                    <option value="Intake">Intake Date</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Applications Table */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                                        <th className="px-6 py-4 font-semibold">College</th>
                                        <th className="px-6 py-4 font-semibold">Course</th>
                                        <th className="px-6 py-4 font-semibold">Country</th>
                                        <th className="px-6 py-4 font-semibold">Intake</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold">Priority</th>
                                        <th className="px-6 py-4 text-right font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredApplications.map((app) => (
                                        <tr key={app.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`size-10 rounded border border-gray-200 p-1 flex items-center justify-center ${app.logo ? 'bg-white' : 'bg-gray-50'}`}>
                                                        {app.logo ? (
                                                            <div className="size-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url('${app.logo}')` }}></div>
                                                        ) : (
                                                            <span className="material-symbols-outlined text-gray-400">account_balance</span>
                                                        )}
                                                    </div>
                                                    <span className="font-semibold text-sm text-gray-900">{app.university}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-600">{app.course}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {app.flag ? (
                                                        <div className="size-5 rounded-full bg-gray-200 bg-cover bg-center" style={{ backgroundImage: `url('${app.flag}')` }}></div>
                                                    ) : (
                                                        <div className="size-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">DE</div>
                                                    )}
                                                    <span className="text-sm text-gray-600">{app.location.split(', ').pop()}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-600">{app.intake}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(app.status)}`}>
                                                    <span className={`size-1.5 rounded-full ${getStatusDot(app.status)}`}></span>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {getPriorityIcon(app.priority)}
                                                    <span className="text-sm font-medium text-gray-700">{app.priority}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleWithdrawClick(app.id)}
                                                    className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded hover:bg-red-50 hover:border-red-300 transition-colors shadow-sm"
                                                >
                                                    Withdraw
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="border-t border-gray-200 p-4 bg-gray-50/30 flex items-center justify-between">
                            <span className="text-sm text-gray-500">Showing {filteredApplications.length} of {myApplications?.length || 0} applications</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Custom Withdraw Confirmation Modal */}
            {appToWithdraw && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="size-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-red-600 text-2xl">warning</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Withdraw Application</h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Are you sure want to withdraw application? This action cannot be undone.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setAppToWithdraw(null)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmWithdraw}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors"
                                >
                                    Withdraw Application
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationDashboard;
