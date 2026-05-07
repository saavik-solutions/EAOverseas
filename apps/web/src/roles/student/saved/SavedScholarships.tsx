import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { useSavedItems } from '../../../shared/contexts/SavedItemsContext';

const SavedScholarships = () => {
    const navigate = useNavigate();
    const { savedScholarships, toggleScholarship, isScholarshipSaved } = useSavedItems();

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <PageHeader 
                title="Saved Scholarships" 
                breadcrumbs={[
                    { label: 'Explore', link: '/scholarships' },
                    { label: 'Saved', link: '/saved-scholarships' }
                ]}
            />

            <div className="p-6 lg:p-10 max-w-[1600px] mx-auto">
                {savedScholarships.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                        <div className="size-20 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-slate-300 text-4xl">bookmark</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No Saved Scholarships</h3>
                        <p className="text-slate-500 mb-8 max-w-sm text-center font-medium">You haven't bookmarked any scholarships yet. Explore our directory to find funding opportunities for your studies.</p>
                        <button 
                            onClick={() => navigate('/scholarships')}
                            className="px-8 py-3 bg-[#0053cd] text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                        >
                            Explore Scholarships
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {savedScholarships.map((scholarship) => (
                            <div key={scholarship.id} className="group bg-white rounded-[40px] border border-[#dbdfe6] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col relative h-[600px]">
                                {/* Card Header / Image */}
                                <div className="h-44 w-full relative overflow-hidden">
                                    <img alt={scholarship.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={scholarship.image} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase text-white shadow-lg backdrop-blur-md ${
                                            scholarship.status === 'Open' ? 'bg-[#10b981]/80' : 
                                            scholarship.status === 'Applied' ? 'bg-blue-500/80' :
                                            scholarship.status === 'Closing Soon' ? 'bg-orange-500/80' :
                                            'bg-slate-600/80'
                                        }`}>
                                            {scholarship.status}
                                        </span>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleScholarship(scholarship);
                                            }}
                                            className="bg-[#0053cd] text-white shadow-blue-200 backdrop-blur-md p-2 rounded-xl transition-all shadow-lg border border-white/20 active:scale-90"
                                        >
                                            <span className="material-symbols-outlined text-[18px] fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                bookmark
                                            </span>
                                        </button>
                                    </div>
                                    <div className="absolute bottom-4 left-5">
                                        <div className="flex items-center gap-2">
                                            <div className="size-8 rounded-lg bg-white p-1 flex items-center justify-center border border-white/20 shrink-0">
                                                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${scholarship.provider}`} alt="Logo" className="w-full h-full object-contain rounded" />
                                            </div>
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest truncate max-w-[120px]">{scholarship.provider}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#0053cd] transition-colors leading-tight h-14 line-clamp-2">
                                        {scholarship.title}
                                    </h3>
                                    <p className="text-[13px] text-slate-500 mb-8 line-clamp-3 leading-relaxed font-medium">
                                        {scholarship.description}
                                    </p>

                                    {/* Quick Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="bg-slate-50 rounded-2xl p-4 transition-colors group-hover:bg-blue-50/50">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Scholarship Amt</p>
                                            <p className="text-sm font-black text-[#0053cd]">{scholarship.amount}</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-2xl p-4 transition-colors group-hover:bg-blue-50/50">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Eligibility</p>
                                            <p className="text-sm font-black text-slate-900">{scholarship.eligibility}</p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between transition-colors group-hover:bg-blue-50/50 mb-8">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Closing</p>
                                        <p className={`text-sm font-black ${scholarship.deadline.includes('Hours') ? 'text-red-500' : 'text-slate-900'}`}>
                                            {scholarship.deadline}
                                        </p>
                                    </div>

                                    <div className="flex gap-2 mt-auto">
                                        <button 
                                            onClick={() => navigate(`/scholarship-details/${scholarship.id}`)}
                                            className="flex-1 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-black transition-all text-[11px] uppercase tracking-widest shadow-xl shadow-slate-200"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedScholarships;
