import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import { useUserProfile } from '@/features/profile/context/UserProfileContext';

const EditProfile = () => {
    const navigate = useNavigate();
    const { userProfile, updateIdentity, updateGuardian } = useUserProfile();
    const { identity, guardian = {} } = userProfile;

    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const emailInputRef = useRef(null);

    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        nationality: '',
        currentAddress: '',
        email: '',
        phone: '',
        whatsapp: '',
        country: '',

        // Guardian Details
        guardianFirstName: '',
        guardianLastName: '',
        guardianEmail: '',
        guardianPhone: '+91 ',
        guardianRelationship: '',
        guardianNationality: '',
        guardianCountry: '',
        guardianState: '',
        guardianCity: '',
        guardianAddress: '',
        guardianPostalCode: ''
    });

    useEffect(() => {
        if (userProfile) {
            setFormData(prev => ({
                ...prev,
                // Identity
                fullName: identity.name || '',
                email: identity.email || '',
                phone: identity.phone || '',
                whatsapp: identity.whatsapp || '',
                dob: identity.dob || '',
                nationality: identity.nationality || '',
                currentAddress: identity.address || '',
                country: identity.currentCountry || '',

                // Guardian
                guardianFirstName: guardian.firstName || '',
                guardianLastName: guardian.lastName || '',
                guardianEmail: guardian.email || '',
                guardianPhone: guardian.phone || '+91 ',
                guardianRelationship: guardian.relationship || '',
                guardianNationality: guardian.nationality || '',
                guardianCountry: guardian.country || '',
                guardianState: guardian.state || '',
                guardianCity: guardian.city || '',
                guardianAddress: guardian.address || '',
                guardianPostalCode: guardian.postalCode || ''
            }));
        }
    }, [userProfile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Update Identity
        updateIdentity({
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            whatsapp: formData.whatsapp,
            dob: formData.dob,
            nationality: formData.nationality,
            address: formData.currentAddress,
            currentCountry: formData.country
        });

        // Update Guardian
        updateGuardian({
            firstName: formData.guardianFirstName,
            lastName: formData.guardianLastName,
            email: formData.guardianEmail,
            phone: formData.guardianPhone,
            relationship: formData.guardianRelationship,
            nationality: formData.guardianNationality,
            country: formData.guardianCountry,
            state: formData.guardianState,
            city: formData.guardianCity,
            address: formData.guardianAddress,
            postalCode: formData.guardianPostalCode
        });

        navigate('/profile');
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-white font-display">
            {/* Header */}
            <PageHeader title="Edit Profile" />

            {/* Scrollable Content */}
            <main className="flex-1 overflow-y-auto py-4 px-4 md:py-8 md:px-8">
                <div className="flex w-full max-w-[800px] flex-col gap-4 md:gap-6 mx-auto">

                    {/* Page Heading & Breadcrumb */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm text-[#60728a]">
                            <span onClick={() => navigate('/profile')} className="cursor-pointer hover:text-[#0d6cf2] transition-colors">Profile</span>
                            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            <span className="font-medium text-[#111418]">Edit Details</span>
                        </div>
                        <h1 className="text-2xl md:text-[32px] font-bold leading-tight tracking-tight text-[#111418]">Edit Personal Details</h1>
                        <p className="text-sm font-normal leading-normal text-[#60728a]">Update your personal information as needed. This information helps us tailor your study abroad recommendations.</p>
                    </div>

                    {/* Form Container */}
                    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>

                        {/* Section 1: Basic Information */}
                        <section className="flex flex-col overflow-hidden rounded-xl border border-[#dbdfe6] bg-white shadow-sm">
                            <div className="border-b border-blue-100 bg-blue-50/50 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                        <span className="material-symbols-outlined">person</span>
                                    </div>
                                    <h3 className="text-lg font-bold leading-tight text-blue-900">Basic Information</h3>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium leading-normal text-[#111418]">Full Name</span>
                                    <input
                                        className="h-12 w-full rounded-lg border border-[#dbdfe6] bg-white px-4 text-base text-[#111418] placeholder:text-[#60728a] focus:border-[#0d6cf2] focus:outline-none focus:ring-1 focus:ring-[#0d6cf2]"
                                        placeholder="Enter your full name"
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium leading-normal text-[#111418]">Date of Birth</span>
                                    <div className="relative">
                                        <input
                                            className="h-12 w-full rounded-lg border border-[#dbdfe6] bg-white px-4 text-base text-[#111418] placeholder:text-[#60728a] focus:border-[#0d6cf2] focus:outline-none focus:ring-1 focus:ring-[#0d6cf2]"
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </label>
                                <label className="flex flex-col gap-2 md:col-span-2">
                                    <span className="text-sm font-medium leading-normal text-[#111418]">Nationality</span>
                                    <select
                                        className="h-12 w-full rounded-lg border border-[#dbdfe6] bg-white px-4 text-base text-[#111418] focus:border-[#0d6cf2] focus:outline-none focus:ring-1 focus:ring-[#0d6cf2]"
                                        name="nationality"
                                        value={formData.nationality}
                                        onChange={handleChange}
                                    >
                                        <option disabled value="">Select Nationality</option>
                                        <option value="us">United States</option>
                                        <option value="uk">United Kingdom</option>
                                        <option value="ca">Canada</option>
                                        <option value="in">India</option>
                                        <option value="au">Australia</option>
                                    </select>
                                </label>
                                <label className="flex flex-col gap-2 md:col-span-2">
                                    <span className="text-sm font-medium leading-normal text-[#111418]">Current Address</span>
                                    <input
                                        className="h-12 w-full rounded-lg border border-[#dbdfe6] bg-white px-4 text-base text-[#111418] placeholder:text-[#60728a] focus:border-[#0d6cf2] focus:outline-none focus:ring-1 focus:ring-[#0d6cf2]"
                                        placeholder="Enter your current address"
                                        type="text"
                                        name="currentAddress"
                                        value={formData.currentAddress}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        </section>

                        {/* Section 2: Contact Details */}
                        <section className="flex flex-col overflow-hidden rounded-xl border border-[#dbdfe6] bg-white shadow-sm">
                            <div className="border-b border-blue-100 bg-blue-50/50 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                        <span className="material-symbols-outlined">contact_mail</span>
                                    </div>
                                    <h3 className="text-lg font-bold leading-tight text-blue-900">Contact Details</h3>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                                <label className="flex flex-col gap-2 md:col-span-2">
                                    <span className="text-sm font-medium leading-normal text-[#111418]">Email Address</span>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#60728a] material-symbols-outlined text-[20px]">mail</span>
                                        <input
                                            ref={emailInputRef}
                                            className={`h-12 w-full rounded-lg border border-[#dbdfe6] px-4 pl-11 text-base focus:border-[#0d6cf2] focus:outline-none focus:ring-1 focus:ring-[#0d6cf2] transition-colors ${isEmailEditable ? 'bg-white text-[#111418]' : 'bg-gray-50 text-[#60728a]'}`}
                                            placeholder="your@email.com"
                                            readOnly={!isEmailEditable}
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsEmailEditable(!isEmailEditable);
                                                if (!isEmailEditable) {
                                                    setTimeout(() => emailInputRef.current?.focus(), 0);
                                                }
                                            }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#60728a] hover:text-[#0d6cf2] transition-colors p-1"
                                            title={isEmailEditable ? "Save Email" : "Edit Email"}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">
                                                {isEmailEditable ? 'check' : 'edit'}
                                            </span>
                                        </button>
                                    </div>
                                    <span className="text-xs text-[#60728a]">
                                        {isEmailEditable ? 'Click check icon to save.' : 'Click edit icon to change email.'}
                                    </span>
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium leading-normal text-[#111418]">Mobile Number</span>
                                    <input
                                        className="h-12 w-full rounded-lg border border-[#dbdfe6] bg-white px-4 text-base text-[#111418] placeholder:text-[#60728a] focus:border-[#0d6cf2] focus:outline-none focus:ring-1 focus:ring-[#0d6cf2]"
                                        placeholder="+1 (555) 000-0000"
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium leading-normal text-[#111418]">WhatsApp Number</span>
                                    <input
                                        className="h-12 w-full rounded-lg border border-[#dbdfe6] bg-white px-4 text-base text-[#111418] placeholder:text-[#60728a] focus:border-[#0d6cf2] focus:outline-none focus:ring-1 focus:ring-[#0d6cf2]"
                                        placeholder="+1 (555) 000-0000"
                                        type="tel"
                                        name="whatsapp"
                                        value={formData.whatsapp}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium leading-normal text-[#111418]">Current Country of Residence</span>
                                    <select
                                        className="h-12 w-full rounded-lg border border-[#dbdfe6] bg-white px-4 text-base text-[#111418] focus:border-[#0d6cf2] focus:outline-none focus:ring-1 focus:ring-[#0d6cf2]"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                    >
                                        <option disabled value="">Select Country</option>
                                        <option value="us">United States</option>
                                        <option value="uk">United Kingdom</option>
                                        <option value="ca">Canada</option>
                                    </select>
                                </label>
                            </div>
                        </section>





                        {/* Section 5: Guardian Detail */}
                        <section className="flex flex-col overflow-hidden rounded-xl border border-[#dbdfe6] bg-white shadow-sm">
                            <div className="border-b border-blue-100 bg-blue-50/50 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                        <span className="material-symbols-outlined">family_restroom</span>
                                    </div>
                                    <h3 className="text-lg font-bold leading-tight text-blue-900">Guardian Detail</h3>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium leading-normal text-[#111418]">First name <span className="text-red-500">*</span></span>
                                    <input
                                        className="h-12 w-full rounded-lg border border-[#dbdfe6] bg-white px-4 text-base text-[#111418] placeholder:text-[#60728a] focus:border-[#0d6cf2] focus:outline-none focus:ring-1 focus:ring-[#0d6cf2]"
                                        type="text"
                                        name="guardianFirstName"
                                        value={formData.guardianFirstName}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium leading-normal text-[#111418]">Last Name <span className="text-red-500">*</span></span>
                                    <input
                                        className="h-12 w-full rounded-lg border border-[#dbdfe6] bg-white px-4 text-base text-[#111418] placeholder:text-[#60728a] focus:border-[#0d6cf2] focus:outline-none focus:ring-1 focus:ring-[#0d6cf2]"
                                        type="text"
                                        name="guardianLastName"
                                        value={formData.guardianLastName}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium leading-normal text-[#111418]">Email</span>
                                    <input
                                        className="h-12 w-full rounded-lg border border-[#dbdfe6] bg-white px-4 text-base text-[#111418] placeholder:text-[#60728a] focus:border-[#0d6cf2] focus:outline-none focus:ring-1 focus:ring-[#0d6cf2]"
                                        type="email"
                                        name="guardianEmail"
                                        value={formData.guardianEmail}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium leading-normal text-[#111418]">Phone Number <span className="text-red-500">*</span></span>
                                    <div className="flex">
                                        <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-[#dbdfe6] bg-gray-50 text-gray-500 sm:text-sm">
                                            🇮🇳 +91
                                        </span>
                                        <input
                                            className="h-12 w-full rounded-r-lg border border-[#dbdfe6] bg-white px-4 text-base text-[#111418] placeholder:text-[#60728a] focus:border-[#0d6cf2] focus:outline-none focus:ring-1 focus:ring-[#0d6cf2]"
                                            type="tel"
                                            name="guardianPhone"
                                            value={formData.guardianPhone.replace('+91 ', '')}
                                            onChange={(e) => handleChange({ target: { name: 'guardianPhone', value: '+91 ' + e.target.value } })}
                                        />
                                    </div>
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium leading-normal text-[#111418]">Relationship to applicant <span className="text-red-500">*</span></span>
                                    <input
                                        className="h-12 w-full rounded-lg border border-[#dbdfe6] bg-white px-4 text-base text-[#111418] placeholder:text-[#60728a] focus:border-[#0d6cf2] focus:outline-none focus:ring-1 focus:ring-[#0d6cf2]"
                                        type="text"
                                        name="guardianRelationship"
                                        value={formData.guardianRelationship}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium leading-normal text-[#111418]">Nationality <span className="text-red-500">*</span></span>
                                    <select
                                        className="h-12 w-full rounded-lg border border-[#dbdfe6] bg-white px-4 text-base text-[#111418] focus:border-[#0d6cf2] focus:outline-none focus:ring-1 focus:ring-[#0d6cf2]"
                                        name="guardianNationality"
                                        value={formData.guardianNationality}
                                        onChange={handleChange}
                                    >
                                        <option disabled value="">Select Nationality</option>
                                        <option value="Andorran">Andorran</option>
                                        <option value="Indian">Indian</option>
                                        <option value="American">American</option>
                                    </select>
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium leading-normal text-[#111418]">Country <span className="text-red-500">*</span></span>
                                    <select
                                        className="h-12 w-full rounded-lg border border-[#dbdfe6] bg-white px-4 text-base text-[#111418] focus:border-[#0d6cf2] focus:outline-none focus:ring-1 focus:ring-[#0d6cf2]"
                                        name="guardianCountry"
                                        value={formData.guardianCountry}
                                        onChange={handleChange}
                                    >
                                        <option disabled value="">Select Country</option>
                                        <option value="Armenia">Armenia</option>
                                        <option value="India">India</option>
                                        <option value="USA">USA</option>
                                    </select>
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium leading-normal text-[#111418]">State <span className="text-red-500">*</span></span>
                                    <select
                                        className="h-12 w-full rounded-lg border border-[#dbdfe6] bg-white px-4 text-base text-[#111418] focus:border-[#0d6cf2] focus:outline-none focus:ring-1 focus:ring-[#0d6cf2]"
                                        name="guardianState"
                                        value={formData.guardianState}
                                        onChange={handleChange}
                                    >
                                        <option disabled value="">Select State</option>
                                        <option value="Vayots Dzor Region">Vayots Dzor Region</option>
                                    </select>
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium leading-normal text-[#111418]">City <span className="text-red-500">*</span></span>
                                    <select
                                        className="h-12 w-full rounded-lg border border-[#dbdfe6] bg-white px-4 text-base text-[#111418] focus:border-[#0d6cf2] focus:outline-none focus:ring-1 focus:ring-[#0d6cf2]"
                                        name="guardianCity"
                                        value={formData.guardianCity}
                                        onChange={handleChange}
                                    >
                                        <option disabled value="">Select City</option>
                                        <option value="Zarrit'ap'">Zarrit'ap'</option>
                                    </select>
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium leading-normal text-[#111418]">Address <span className="text-red-500">*</span></span>
                                    <input
                                        className="h-12 w-full rounded-lg border border-[#dbdfe6] bg-white px-4 text-base text-[#111418] placeholder:text-[#60728a] focus:border-[#0d6cf2] focus:outline-none focus:ring-1 focus:ring-[#0d6cf2]"
                                        type="text"
                                        name="guardianAddress"
                                        value={formData.guardianAddress}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium leading-normal text-[#111418]">Postal Code <span className="text-red-500">*</span></span>
                                    <input
                                        className="h-12 w-full rounded-lg border border-[#dbdfe6] bg-white px-4 text-base text-[#111418] placeholder:text-[#60728a] focus:border-[#0d6cf2] focus:outline-none focus:ring-1 focus:ring-[#0d6cf2]"
                                        type="text"
                                        name="guardianPostalCode"
                                        value={formData.guardianPostalCode}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        </section>

                        {/* Action Buttons */}
                        <div className="mt-4 flex flex-col-reverse items-center justify-end gap-4 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => navigate('/profile')}
                                className="h-12 w-full min-w-[140px] rounded-lg border border-transparent px-6 text-base font-bold text-[#60728a] transition-colors hover:bg-gray-100 hover:text-[#111418] focus:outline-none focus:ring-2 focus:ring-gray-300 sm:w-auto"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleSave}
                                className="h-12 w-full min-w-[140px] rounded-lg bg-[#0d6cf2] px-6 text-base font-bold text-white shadow-md transition-all hover:bg-[#0b5ed7] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0d6cf2] focus:ring-offset-2 sm:w-auto"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default EditProfile;
