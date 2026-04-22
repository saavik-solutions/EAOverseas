import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useSavedItems } from '../context/SavedItemsContext';

const SavedColleges = () => {
    const navigate = useNavigate();
    const { savedColleges, toggleCollege } = useSavedItems();

    const handleRemove = (id) => {
        const collegeToRemove = savedColleges.find(c => (c.id || c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')) === id);
        if (collegeToRemove) {
            toggleCollege(collegeToRemove);
        }
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f8f9fc]">
            <PageHeader title={
                <div className="flex items-center gap-2 text-xs md:text-sm">
                    <Link to="/profile" className="md:hidden text-slate-500 hover:text-blue-600 mr-1 flex items-center">
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    </Link>
                    <Link to="/profile" className="hidden md:flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                        <span className="material-symbols-outlined text-[18px] md:text-[20px]">home</span>
                    </Link>
                    <span className="hidden md:block material-symbols-outlined text-[14px] md:text-[16px] text-gray-300">chevron_right</span>
                    <Link to="/profile" className="hidden md:block text-gray-500 hover:text-blue-600 transition-colors">
                        Profile
                    </Link>
                    <span className="hidden md:block material-symbols-outlined text-[14px] md:text-[16px] text-gray-300">chevron_right</span>
                    <span className="text-[#111418] font-semibold">Saved Colleges</span>
                </div>
            } />

            <div className="flex-1 overflow-y-auto w-full p-4 md:p-8 flex justify-center">
                <div className="w-full max-w-[1000px] flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-[#111418]">Saved Colleges ({savedColleges.length})</h1>
                        <button className="text-blue-600 text-sm font-semibold hover:bg-blue-50 px-3 py-1.5 rounded transition-colors">
                            Explore More
                        </button>
                    </div>

                    {savedColleges.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {savedColleges.map((college) => (
                                <div key={college.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group relative">
                                    <div className="h-32 bg-gray-100 relative">
                                        {/* Fallback pattern if no image */}
                                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:16px_16px]"></div>
                                        <div className="absolute -bottom-6 left-6 p-1 bg-white rounded-lg border border-gray-100 shadow-sm">
                                            <img src={college.logo} alt={college.name} className="size-12 object-contain" />
                                        </div>
                                    </div>
                                    <div className="pt-8 px-6 pb-6">
                                        <h3 className="font-bold text-[#111418] text-lg mb-1 leading-tight">{college.name}</h3>
                                        <p className="text-slate-500 text-xs mb-4 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                                            {college.location}
                                        </p>

                                        <div className="flex items-center justify-between text-xs font-medium text-slate-600 bg-slate-50 rounded-lg p-2 mb-4">
                                            <div className="flex flex-col items-center flex-1 border-r border-slate-200 last:border-0">
                                                <span className="text-slate-400 text-[10px] uppercase">Ranking</span>
                                                <span className="text-[#111418]">{college.ranking}</span>
                                            </div>
                                            <div className="flex flex-col items-center flex-1">
                                                <span className="text-slate-400 text-[10px] uppercase">Avg Fees</span>
                                                <span className="text-[#111418]">{college.fees}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => navigate(`/college-details?name=${encodeURIComponent(college.name)}`, { state: { college } })}
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-sm transition-colors"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => handleRemove(college.id)}
                                                className="p-2 border border-gray-200 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">bookmark_remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                            <div className="p-4 bg-gray-50 rounded-full mb-4">
                                <span className="material-symbols-outlined text-gray-400 text-4xl">account_balance</span>
                            </div>
                            <h3 className="text-lg font-bold text-[#111418] mb-1">No colleges saved yet</h3>
                            <p className="text-slate-500 text-sm mb-6">Start exploring universities and bookmark your favorites.</p>
                            <Link to="/college-finder" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                                Explore Colleges
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SavedColleges;
