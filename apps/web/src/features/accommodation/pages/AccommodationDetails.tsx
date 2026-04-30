import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookingModal from '@/features/accommodation/components/BookingModal';
import EnquireModal from '@/features/university-portal/components/EnquireModal';
import { useSavedItems } from '@/features/saved-items/context/SavedItemsContext';

const ShareModal = ({ isOpen, onClose, title }) => {
    if (!isOpen) return null;

    const shareUrl = window.location.href;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white rounded-xl shadow-xl w-full max-w-sm relative z-10 animate-in zoom-in-95 duration-200 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-[#111418]">Share Accommodation</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">Share <span className="font-semibold">{title}</span> with your friends.</p>

                <div className="flex gap-4 justify-center mb-6">
                    <button className="flex flex-col items-center gap-2 text-gray-600 hover:text-[#0d6cf2] transition-colors">
                        <div className="size-12 rounded-full bg-blue-50 flex items-center justify-center">
                            <span className="material-symbols-outlined text-blue-600">content_copy</span>
                        </div>
                        <span className="text-xs font-medium">Copy Link</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 text-gray-600 hover:text-[#25D366] transition-colors">
                        <div className="size-12 rounded-full bg-green-50 flex items-center justify-center">
                            <span className="material-symbols-outlined text-green-600">chat</span>
                        </div>
                        <span className="text-xs font-medium">WhatsApp</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 text-gray-600 hover:text-[#1DA1F2] transition-colors">
                        <div className="size-12 rounded-full bg-sky-50 flex items-center justify-center">
                            <span className="material-symbols-outlined text-sky-600">send</span>
                        </div>
                        <span className="text-xs font-medium">Twitter</span>
                    </button>
                </div>

                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-xs text-gray-500 truncate flex-1">{shareUrl}</span>
                    <button onClick={handleCopy} className="text-xs font-bold text-[#0d6cf2] hover:underline">Copy</button>
                </div>
            </div>
        </div>
    );
};

const AccommodationDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const accommodation = location.state?.accommodation;
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isEnquireModalOpen, setIsEnquireModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const { toggleAccommodation, isAccommodationSaved } = useSavedItems();

    if (!accommodation) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500">
                <p>Accommodation details not found.</p>
                <button onClick={() => navigate('/accommodation')} className="mt-4 text-[#0d6cf2] underline font-medium">Back to Search</button>
            </div>
        );
    }

    const { title, location: accLocation, type, description, images = [], amenityDetails = [], roomTypes = [], locationDetails = {}, inclusions = [], price, period, header } = accommodation;
    const isSaved = isAccommodationSaved(accommodation);

    // Default Images if missing
    const displayImages = images.length > 0 ? images : [
        accommodation.image,
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBDv2ChOaSFAN9rwtOZ5ljePS-MA8Bx8UT-0oKP7ftWjLAcxjPe87VNeurUAsc_VjfioKzwfoBFuk6prMQqFz6Ddsw3kFA1tiHrCrsz_yKdoHFtjZHeL23LG--yTvod0N9GH-6MGqybvV8Q33YiItYMhhGEhV4jMuVYkKVASBT8ws2WDH8bh1DuJcahzPAv3w4lLHHMyBdTr2r1DcKXz9GSdVLxKy-ZfDI1fjMa5nXA4mr5W3ojBBz2JHbY221EWjoBQE5psJlF068",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDMHGLiWfEzHxwduuRijdI_51Lipb4jS-4sQck6SZwb2aeFUL0voE5ZXbsXXqWrrPIfDQHMk8oaH4PMD6L0JrDLy8cKQjdyLYBiYYGujezrUZRJEIkueRD1zU0Vn46e7BvjDRm8U9fiUhDuoTqiGeic7dtVVfeVBux6Vo0uGlvhVak1FEe37grUuI8mTCqVbUm0mp-zs0m9kF4-T1pxLtfHmWGr7IPBixxjAc_gd6Xk59n5vmzZeOjK2fxNGbNGcoRd_PCM1NJTW98",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAyofmbE6BQ1oKD_K5rKFIejNVdgeqUiSyrolvHkNfCE26ZnAXiT-oINCudT0C-fT3MCmy9redQzfVamIOAnrhXrylTrlJkbQPzWlxG7hTppX9A53giOaN0dXM6Yg3W2IXnmrCIHAK7jp5hyFYv-ptAImCikMurQL6guj1jZaXnZbloJ3SOSTuzhdxZ0Nnj6dAjTODFzyzL_gA8HM3MX7QjAv3pDPx-BL07xUcB4uKUW_dao5sgRNXIJtrcbyIivxNSWhyQOVL-cK4",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBDrpME1J2iVUCssM-A9nZgN1AcCrdBwUWiMXBZjY375SQTHf_TORB_9tOjaEErl-uR1dzn336mgKvG3t04OtYH2fOY1LmjwBVhxkjm_5u6L4761fpDJGmAemULDPhL7sT-tdw6niOB4iv7f8lfu7_woOaJ-TAMdsU9Dc4Wyv8oeflni4eQ1HUJfKuhD-zA0RL7EoXq_rJgEST9FVHHz2WwBK_WkA15Hs2ctkPPnWwemXJwhPbD83HKWxspd8v7vQ0-qu-xM_6DLjo"
    ];

    return (
        <div className="relative flex flex-col flex-1 h-full bg-[#f5f7f8] overflow-y-auto font-display">
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                accommodation={accommodation}
                selectedRoom={location.state?.selectedRoom}
            />
            <EnquireModal
                isOpen={isEnquireModalOpen}
                onClose={() => setIsEnquireModalOpen(false)}
                accommodation={accommodation}
            />
            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                title={title}
            />

            <div className="flex flex-1 justify-center py-5 px-4 md:px-10">
                <div className="layout-content-container flex flex-col max-w-[1120px] flex-1 w-full">
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap gap-2 py-4 items-center">
                        <button onClick={() => navigate(-1)} className="text-[#60728a] hover:text-[#0d6cf2] text-sm font-medium leading-normal flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        </button>
                        <span className="text-[#60728a] text-sm font-medium leading-normal">Accommodation</span>
                        <span className="text-[#60728a] text-sm font-medium leading-normal">/</span>
                        <span className="text-[#111418] text-sm font-semibold leading-normal">{title}</span>
                    </div>

                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row justify-between gap-6 py-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[#111418] text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">{title}</h1>
                            <div className="flex items-center gap-2 text-[#60728a]">
                                <span className="bg-blue-100 text-[#0d6cf2] px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">{type}</span>
                                <span className="text-sm">•</span>
                                <span className="text-sm font-medium">{accLocation}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsShareModalOpen(true)}
                                className="flex items-center gap-2 bg-white border border-[#e5e7eb] text-[#111418] px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">ios_share</span>
                                Share
                            </button>
                            <button
                                onClick={() => toggleAccommodation(accommodation)}
                                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-sm shadow-md transition-all ${isSaved ? 'bg-[#0d6cf2] text-white hover:bg-blue-700' : 'bg-white text-[#111418] border border-[#e5e7eb] hover:bg-gray-50'}`}
                            >
                                <span className="material-symbols-outlined text-[20px]">{isSaved ? 'bookmark' : 'bookmark_border'}</span>
                                {isSaved ? 'Saved' : 'Save to List'}
                            </button>
                        </div>
                    </div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 py-4 h-[300px] md:h-[400px]">
                        <div className="col-span-1 md:col-span-2 h-full">
                            <div className="w-full h-full bg-center bg-no-repeat bg-cover rounded-xl" style={{ backgroundImage: `url("${displayImages[0]}")` }}></div>
                        </div>
                        <div className="col-span-1 md:col-span-1 flex flex-col gap-3 h-full">
                            <div className="w-full flex-1 bg-center bg-no-repeat bg-cover rounded-xl" style={{ backgroundImage: `url("${displayImages[1]}")` }}></div>
                            <div className="w-full flex-1 bg-center bg-no-repeat bg-cover rounded-xl" style={{ backgroundImage: `url("${displayImages[2]}")` }}></div>
                        </div>
                        <div className="col-span-1 md:col-span-1 flex flex-col gap-3 h-full relative">
                            <div className="w-full flex-1 bg-center bg-no-repeat bg-cover rounded-xl" style={{ backgroundImage: `url("${displayImages[3]}")` }}></div>
                            <div className="w-full flex-1 bg-center bg-no-repeat bg-cover rounded-xl relative overflow-hidden group cursor-pointer">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url("${displayImages[4]}")` }}></div>
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="text-white font-medium flex items-center gap-1">
                                        <span className="material-symbols-outlined">grid_view</span>
                                        View all photos
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
                        {/* Left Column: Details */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Overview */}
                            <section className="bg-white rounded-xl p-6 border border-[#e5e7eb] space-y-8">
                                <h3 className="text-[#111418] text-xl font-bold mb-4">Overview</h3>
                                <p className="text-[#60728a] text-base leading-relaxed">
                                    {description || "Experience comfortable student living close to your university. This property offers modern amenities and a vibrant community."}
                                </p>

                                {/* Amenities Sections */}
                                {accommodation.categorizedAmenities ? (
                                    Object.entries(accommodation.categorizedAmenities).map(([category, items], catIdx) => (
                                        <div key={catIdx}>
                                            <h4 className="text-[#111418] text-lg font-bold mb-4">{category}</h4>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4">
                                                {items.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-3 text-[#60728a]">
                                                        <span className="material-symbols-outlined text-[22px] shrink-0">{item.icon}</span>
                                                        <span className="text-sm font-medium">{item.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    // Fallback for legacy data structure (if any)
                                    amenityDetails.length > 0 && (
                                        <div>
                                            <h4 className="text-[#111418] text-lg font-bold mb-4">Amenities</h4>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {amenityDetails.map((amenity, idx) => (
                                                    <div key={idx} className="flex flex-col gap-1">
                                                        <span className="material-symbols-outlined text-[#0d6cf2] text-[24px]">{amenity.icon}</span>
                                                        <span className="text-sm font-medium text-[#111418]">{amenity.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                )}
                            </section>

                            {/* Room Types */}
                            {roomTypes.length > 0 && (
                                <section>
                                    <h3 className="text-[#111418] text-xl font-bold mb-4 px-1">Room Configurations</h3>
                                    <div className="space-y-4">
                                        {roomTypes.map((room, idx) => (
                                            <div key={idx} className="bg-white rounded-xl p-0 border border-[#e5e7eb] overflow-hidden flex flex-col md:flex-row">
                                                <div className="w-full md:w-48 h-48 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url("${room.image}")` }}></div>
                                                <div className="p-5 flex-1 flex flex-col justify-center">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h4 className="text-lg font-bold text-[#111418]">{room.title}</h4>
                                                            <p className="text-sm text-[#60728a]">{room.subtitle}</p>
                                                        </div>
                                                        <div className="flex flex-col items-end gap-2">
                                                            {room.price && <span className="text-xl font-bold text-[#0d6cf2]">£{room.price}<span className="text-xs font-normal text-gray-500">{accommodation.period || '/month'}</span></span>}
                                                            <button
                                                                onClick={() => {
                                                                    navigate(location.pathname, { state: { ...location.state, selectedRoom: room } });
                                                                    setIsBookingModalOpen(true);
                                                                }}
                                                                className="bg-[#0d6cf2] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">
                                                                Book Now
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {room.tags && room.tags.map((tag, tIdx) => (
                                                            <span key={tIdx} className="px-2 py-1 bg-[#f0f2f5] rounded text-xs font-medium text-[#60728a]">{tag}</span>
                                                        ))}
                                                    </div>
                                                    <p className="text-sm text-[#60728a]">{room.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Location */}
                            <section>
                                <div className="flex items-center justify-between mb-4 px-1">
                                    <h3 className="text-[#111418] text-xl font-bold">Location & Commute</h3>
                                    <span className="text-sm text-[#0d6cf2] font-medium flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[18px]">directions_walk</span>
                                        {accommodation.distance}
                                    </span>
                                </div>
                                <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
                                    <div className="p-4 border-b border-[#e5e7eb]">
                                        <p className="text-[#111418] font-medium">{locationDetails.address || accLocation}</p>
                                    </div>
                                    <div className="w-full h-64 bg-cover bg-center relative" style={{ backgroundImage: `url("${locationDetails.mapImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuAZkRCLW9CMzndcvvvCFGLwERTU5NS0voqzIQY5HdeFIA_xuW_PuHjFmUO4EPcCIGWlSg1fRBRlGlRwsgDpDUtrMR1-Xph7Vpz8nY5nw-QFDtt3ijbvV5SF2O6Zx8SFQ0y837_-K_FCtL-_MZ1M2yMjJ6wZ8bgkGAk3x_McWGFeNBpJEFYfaJ-o6u_o9udhXAIPSIJ67QNZzzPhtf0swDI7EbhA1RCR0l122cdC2MZch9Vh7MwZ_iMQhmll-vLYNTNXgW_s3heWmNI"}")` }}>
                                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                            <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[#0d6cf2]">location_on</span>
                                                <span className="text-sm font-bold text-[#111418]">View on Map</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Notes */}
                            <section className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                                <span className="material-symbols-outlined text-amber-600 shrink-0">info</span>
                                <div>
                                    <h4 className="text-amber-900 font-bold text-sm mb-1">Important Consideration</h4>
                                    <p className="text-amber-800 text-sm">This residence has limited availability for upcoming intakes. It is recommended to shortlist early. Female-only floors are available upon request.</p>
                                </div>
                            </section>
                        </div>

                        {/* Right Column: Sticky Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                {/* Cost Card */}
                                <div className="bg-white rounded-xl p-6 border border-[#e5e7eb] shadow-sm">
                                    <h3 className="text-sm font-medium text-[#60728a] uppercase tracking-wider mb-2">Estimated Cost</h3>
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-3xl font-black text-[#111418]">{price}</span>
                                        <span className="text-[#60728a] font-medium">{period || "/month"}</span>
                                    </div>
                                    {inclusions.length > 0 && (
                                        <div className="border-t border-[#e5e7eb] my-4 pt-4">
                                            <h4 className="text-sm font-bold text-[#111418] mb-3">what's included?</h4>
                                            <ul className="space-y-2">
                                                {inclusions.map((item, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-sm text-[#60728a]">
                                                        <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-3 mt-6">

                                        <button
                                            onClick={() => setIsEnquireModalOpen(true)}
                                            className="w-full bg-transparent hover:bg-gray-50 text-[#0d6cf2] font-medium py-3 px-4 rounded-lg border border-[#0d6cf2] transition-colors flex justify-center items-center gap-2"
                                        >
                                            <span className="material-symbols-outlined">chat_bubble_outline</span>
                                            Enquire Now
                                        </button>
                                    </div>
                                </div>

                                {/* Support Card */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccommodationDetails;
