import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import { useSavedItems } from '@/features/saved-items/context/SavedItemsContext';

const SavedAccommodations = () => {
    const navigate = useNavigate();
    const { savedAccommodations, toggleAccommodation } = useSavedItems();

    const handleRemove = (id) => {
        const accToRemove = savedAccommodations.find(a => (a.id || a.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-')) === id);
        if (accToRemove) {
            toggleAccommodation(accToRemove);
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
                    <span className="text-[#111418] font-semibold">Saved Accommodations</span>
                </div>
            } />

            <div className="flex-1 overflow-y-auto w-full p-4 md:p-8 flex justify-center">
                <div className="w-full max-w-[1000px] flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-[#111418]">Saved Accommodations ({savedAccommodations.length})</h1>
                        <button onClick={() => navigate('/accommodation')} className="text-blue-600 text-sm font-semibold hover:bg-blue-50 px-3 py-1.5 rounded transition-colors">
                            Explore More
                        </button>
                    </div>

                    {savedAccommodations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {savedAccommodations.map((acc) => (
                                <div key={acc.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group relative flex flex-col">
                                    <div className="h-48 bg-gray-100 relative shrink-0">
                                        <img src={acc.image || "https://via.placeholder.com/400x300?text=Accommodation"} alt={acc.title} className="w-full h-full object-cover" />
                                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-[#111418]">
                                            {acc.type || "Student Housing"}
                                        </div>
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        <div className="flex justify-between items-start gap-2 mb-2">
                                            <h3 className="font-bold text-[#111418] text-lg leading-tight line-clamp-2">{acc.title}</h3>
                                        </div>

                                        <p className="text-slate-500 text-xs mb-3 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                                            {acc.location}
                                        </p>

                                        {/* Amenities Preview */}
                                        <div className="flex gap-2 mb-4 overflow-hidden">
                                            {acc.amenities && acc.amenities.slice(0, 4).map((amenity, idx) => (
                                                <div key={idx} className="size-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600" title={amenity}>
                                                    <span className="material-symbols-outlined text-[14px]">{amenity}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                                            <div>
                                                <span className="text-sm font-bold text-[#111418]">{acc.price}</span>
                                                <span className="text-xs text-gray-500 font-normal">{acc.period || '/month'}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex gap-2">
                                            <button
                                                onClick={() => navigate('/accommodation-details', { state: { accommodation: acc } })}
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-sm transition-colors"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => handleRemove(acc.id || acc.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
                                                className="p-2 border border-gray-200 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                title="Remove from saved"
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
                                <span className="material-symbols-outlined text-gray-400 text-4xl">holiday_village</span>
                            </div>
                            <h3 className="text-lg font-bold text-[#111418] mb-1">No accommodations saved yet</h3>
                            <p className="text-slate-500 text-sm mb-6">Find your perfect home near campus.</p>
                            <Link to="/accommodation" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                                Browse Accommodations
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SavedAccommodations;
