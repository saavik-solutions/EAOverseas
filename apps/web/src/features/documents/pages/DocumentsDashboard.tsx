import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/features/profile/context/UserProfileContext';

const DocumentsDashboard = () => {
    const navigate = useNavigate();
    const { userProfile, updateDocuments } = useUserProfile();
    const { documents } = userProfile;

    // Derived state for easier access (read-only for rendering)
    const academicDocs = documents.academic;
    const financialDocs = documents.financial;
    const identityDocs = documents.identity;

    // Calculate Stats
    const allDocs = [...academicDocs, ...financialDocs, ...identityDocs];
    const totalFiles = allDocs.length;
    const needsAttention = allDocs.filter(d => d.error).length;
    const verified = 0; // No 'verified' status in data yet
    const pendingReview = totalFiles - needsAttention - verified;

    // Wrappers to update context instead of local state
    const setAcademicDocs = (valOrFn) => {
        const newVal = typeof valOrFn === 'function' ? valOrFn(documents.academic) : valOrFn;
        updateDocuments('academic', newVal);
    };
    const setFinancialDocs = (valOrFn) => {
        const newVal = typeof valOrFn === 'function' ? valOrFn(documents.financial) : valOrFn;
        updateDocuments('financial', newVal);
    };
    const setIdentityDocs = (valOrFn) => {
        const newVal = typeof valOrFn === 'function' ? valOrFn(documents.identity) : valOrFn;
        updateDocuments('identity', newVal);
    };

    // Refs for file inputs
    const academicInputRef = useRef(null);
    const financialInputRef = useRef(null);
    const identityInputRef = useRef(null);

    // State to track re-uploading item
    const [reuploadingId, setReuploadingId] = useState(null);
    const [reuploadingSection, setReuploadingSection] = useState(null);

    // File Icon Helper
    const getFileIcon = (type, section) => {
        if (type === 'pdf') return { icon: 'picture_as_pdf', color: 'text-red-500', bg: 'bg-red-50' };
        if (type === 'image') return { icon: 'image', color: 'text-green-600', bg: 'bg-green-50' };
        if (type === 'doc') return { icon: 'description', color: 'text-blue-500', bg: 'bg-blue-50' };
        // Default based on section
        if (section === 'academic') return { icon: 'school', color: 'text-blue-500', bg: 'bg-blue-50' };
        if (section === 'identity') return { icon: 'badge', color: 'text-green-600', bg: 'bg-green-50' };
        return { icon: 'description', color: 'text-gray-500', bg: 'bg-gray-50' };
    };

    // Delete Confirmation State
    const [deleteConfirm, setDeleteConfirm] = useState({
        isOpen: false,
        id: null,
        section: null
    });

    const initiateDelete = (id, section) => {
        setDeleteConfirm({ isOpen: true, id, section });
    };

    const confirmDelete = () => {
        const { id, section } = deleteConfirm;
        if (section === 'academic') setAcademicDocs(prev => prev.filter(d => d.id !== id));
        if (section === 'financial') setFinancialDocs(prev => prev.filter(d => d.id !== id));
        if (section === 'identity') setIdentityDocs(prev => prev.filter(d => d.id !== id));
        setDeleteConfirm({ isOpen: false, id: null, section: null });
    };

    const cancelDelete = () => {
        setDeleteConfirm({ isOpen: false, id: null, section: null });
    };

    // ... (rest of helper functions like triggerUpload, handleUpload remain same)

    const triggerUpload = (section, id = null) => {
        setReuploadingId(id);
        setReuploadingSection(id ? section : null); // If id is present, we are reuploading

        if (section === 'academic') academicInputRef.current?.click();
        if (section === 'financial') financialInputRef.current?.click();
        if (section === 'identity') identityInputRef.current?.click();
    };

    const handleUpload = (e, section) => {
        const file = e.target.files[0];
        if (!file) return;

        const newDoc = {
            id: reuploadingId || Date.now(),
            name: file.name,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
            type: file.name.split('.').pop().toLowerCase().includes('pdf') ? 'pdf' :
                file.name.split('.').pop().toLowerCase().includes('doc') ? 'doc' :
                    file.name.split('.').pop().toLowerCase().match(/jpg|jpeg|png/) ? 'image' : 'doc'
        };

        const updateState = (setter) => {
            setter(prev => {
                if (reuploadingId) {
                    return prev.map(d => d.id === reuploadingId ? newDoc : d);
                }
                return [...prev, newDoc];
            });
        };

        if (section === 'academic') updateState(setAcademicDocs);
        if (section === 'financial') updateState(setFinancialDocs);
        if (section === 'identity') updateState(setIdentityDocs);

        // Reset
        e.target.value = '';
        setReuploadingId(null);
        setReuploadingSection(null);
    };

    const renderDocItem = (doc, section) => {
        const style = getFileIcon(doc.type, section);
        const isError = doc.error;

        return (
            <div key={doc.id} className={`p-4 hover:bg-gray-50 transition-colors flex items-start justify-between group ${isError ? 'bg-red-50/30 hover:bg-red-50/50' : ''}`}>
                <div className="flex items-start gap-4">
                    <div className={`size-10 rounded ${style.bg} ${style.color} flex items-center justify-center shrink-0`}>
                        <span className="material-symbols-outlined">{style.icon}</span>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-gray-900">{doc.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                            <span>Uploaded on {doc.date}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                        </div>
                        {isError && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-red-600 font-medium">
                                <span className="material-symbols-outlined !text-[14px]">error</span>
                                {doc.error}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => initiateDelete(doc.id, section)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                        title="Delete Document">
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                    <button
                        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-gray-600 transition-all">
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f8f9fc]">
            {/* ... Existing JSX ... */}

            <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0 z-10">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-900 font-medium">Documents Manager</span>
                </div>
                {/* ... Header Right ... */}
                <div className="flex items-center gap-4">
                    <div className="relative hidden lg:block">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 !text-[20px]">search</span>
                        <input
                            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-64 placeholder-gray-400"
                            placeholder="Search documents..." type="text" />
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

            <main className="flex-1 overflow-y-auto bg-[#f8f9fc] p-6 text-left">
                <div className="max-w-7xl mx-auto flex flex-col gap-6">

                    {/* Title & Action */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">My Documents</h2>
                            <p className="text-gray-500 text-sm mt-1">Manage and organize all your study abroad application files safely.</p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                            <div className="size-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                <span className="material-symbols-outlined">folder</span>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500">Total Files</p>
                                <p className="text-xl font-bold text-gray-900">{totalFiles}</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                            <div className="size-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                                <span className="material-symbols-outlined">check_circle</span>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500">Verified</p>
                                <p className="text-xl font-bold text-gray-900">{verified}</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                            <div className="size-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                                <span className="material-symbols-outlined">pending</span>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500">Pending Review</p>
                                <p className="text-xl font-bold text-gray-900">{pendingReview}</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                            <div className="size-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                                <span className="material-symbols-outlined">error</span>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500">Needs Attention</p>
                                <p className="text-xl font-bold text-gray-900">{needsAttention}</p>
                            </div>
                        </div>
                    </div>

                    {/* Academic Documents Section */}
                    <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-gray-400">school</span>
                                <h3 className="font-semibold text-gray-900">Academic Documents</h3>
                            </div>
                            <button onClick={() => triggerUpload('academic')} className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded text-gray-700 font-medium hover:bg-gray-50 flex items-center gap-1 shadow-sm transition-colors cursor-pointer">
                                <span className="material-symbols-outlined !text-[16px]">upload</span> Upload
                            </button>
                            <input type="file" hidden ref={academicInputRef} onChange={(e) => handleUpload(e, 'academic')} />
                        </div>
                        <div className="divide-y divide-gray-100">
                            {academicDocs.map(doc => renderDocItem(doc, 'academic'))}
                        </div>
                    </section>

                    {/* Financial Documents Section */}
                    <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-gray-400">account_balance</span>
                                <h3 className="font-semibold text-gray-900">Financial Documents</h3>
                            </div>
                            <button onClick={() => triggerUpload('financial')} className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded text-gray-700 font-medium hover:bg-gray-50 flex items-center gap-1 shadow-sm transition-colors cursor-pointer">
                                <span className="material-symbols-outlined !text-[16px]">upload</span> Upload
                            </button>
                            <input type="file" hidden ref={financialInputRef} onChange={(e) => handleUpload(e, 'financial')} />
                        </div>
                        <div className="divide-y divide-gray-100">
                            {financialDocs.map(doc => renderDocItem(doc, 'financial'))}
                        </div>
                    </section>

                    {/* Identity Documents Section */}
                    <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-gray-400">badge</span>
                                <h3 className="font-semibold text-gray-900">Identity Documents</h3>
                            </div>
                            <button onClick={() => triggerUpload('identity')} className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded text-gray-700 font-medium hover:bg-gray-50 flex items-center gap-1 shadow-sm transition-colors cursor-pointer">
                                <span className="material-symbols-outlined !text-[16px]">upload</span> Upload
                            </button>
                            <input type="file" hidden ref={identityInputRef} onChange={(e) => handleUpload(e, 'identity')} />
                        </div>
                        <div className="divide-y divide-gray-100">
                            {identityDocs.map(doc => renderDocItem(doc, 'identity'))}
                        </div>
                    </section>

                </div>
            </main>

            {/* Custom Delete Confirmation Modal */}
            {deleteConfirm.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 transform transition-all scale-100 opacity-100" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="size-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                                <span className="material-symbols-outlined !text-[28px]">delete</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Delete Document?</h3>
                                <p className="text-gray-500 text-sm mt-1">Are you sure you want to delete this document? This action cannot be undone.</p>
                            </div>
                            <div className="flex items-center gap-3 w-full mt-2">
                                <button
                                    onClick={cancelDelete}
                                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium shadow-md shadow-red-500/20 transition-colors cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentsDashboard;
