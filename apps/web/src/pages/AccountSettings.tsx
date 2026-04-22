import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useUserProfile } from '../context/UserProfileContext';
import { useAuth } from '../context/AuthContext';

const AccountSettings = () => {
    const navigate = useNavigate();
    const { userProfile, updateIdentity } = useUserProfile();
    const { user, logout } = useAuth();

    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [email, setEmail] = useState("alex.student@university.edu");

    // Password States
    const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Active Sessions State
    const [activeSessions, setActiveSessions] = useState([
        { id: 1, device: 'Macbook Pro 14"', location: 'London, UK', lastActive: 'Just now', current: true, icon: 'laptop_mac' },
        { id: 2, device: 'iPhone 13', location: 'London, UK', lastActive: '2 days ago', current: false, icon: 'phone_iphone' },
        { id: 3, device: 'Windows PC', location: 'Manchester, UK', lastActive: '5 days ago', current: false, icon: 'desktop_windows' }
    ]);
    const [showLogoutToast, setShowLogoutToast] = useState(false);

    // Delete Account State
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showDeletePassword, setShowDeletePassword] = useState(false);
    const [deletePassword, setDeletePassword] = useState("");
    const [deleteError, setDeleteError] = useState("");

    const emailInputRef = useRef(null);

    const handleDeleteFinal = () => {
        // Mock password check
        if (deletePassword === 'password123' || deletePassword.length > 0) {

            // 1. Remove user from "Database" if it's a real user
            if (user && user.email !== 'alex.j@example.com') {
                const registeredUsers = JSON.parse(localStorage.getItem('eaoverseas_registered_users') || '[]');
                const updatedUsers = registeredUsers.filter(u => u.email !== user.email);
                localStorage.setItem('eaoverseas_registered_users', JSON.stringify(updatedUsers));
            }

            // 2. Clear Session
            logout();

            // 3. Clear other local storage items if needed, but NOT all if we want to preserve other users (though in this mock app, clearing all might be safer for "fresh start")
            // For this specific request "fix it properly", we should probably just clear the session and let logout handle the rest. 
            // However, to ensure "permanently delete" experience for the user:
            localStorage.removeItem('eaoverseas_user'); // Double check

            // 4. Redirect
            navigate('/login');
        } else {
            setDeleteError("Incorrect password");
        }
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f6f6f8] dark:bg-[#111621] relative">

            {/* Toasts */}
            <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-3 shadow-lg transition-all duration-300 ease-out ${showPasswordSuccess ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
                <div className="flex bg-green-500 rounded-full p-0.5"><span className="material-symbols-outlined text-white text-[16px] font-bold">check</span></div>
                <span className="text-sm font-medium text-green-700">Password is updated</span>
            </div>

            <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-3 shadow-lg transition-all duration-300 ease-out ${showLogoutToast ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
                <div className="flex bg-green-500 rounded-full p-0.5"><span className="material-symbols-outlined text-white text-[16px] font-bold">check</span></div>
                <span className="text-sm font-medium text-green-700">All other devices logged out</span>
            </div>

            <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 shadow-lg transition-all duration-300 ease-out ${showErrorToast ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
                <div className="flex bg-red-500 rounded-full p-0.5"><span className="material-symbols-outlined text-white text-[16px] font-bold">close</span></div>
                <span className="text-sm font-medium text-red-700">Confirm password not matched</span>
            </div>

            <PageHeader title={
                <div className="flex items-center gap-2 text-xs md:text-sm">
                    <Link to="/profile" className="md:hidden text-slate-500 hover:text-blue-600 mr-1 flex items-center">
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    </Link>
                    <Link to="/dashboard" className="hidden md:flex items-center text-gray-400 hover:text-blue-600 transition-colors"><span className="material-symbols-outlined text-[18px] md:text-[20px]">home</span></Link>
                    <span className="hidden md:block material-symbols-outlined text-[14px] md:text-[16px] text-gray-300">chevron_right</span>
                    <Link to="/profile" className="hidden md:block text-gray-500 font-normal hover:text-blue-600 transition-colors">Settings</Link>
                    <span className="hidden md:block material-symbols-outlined text-[14px] md:text-[16px] text-gray-300">chevron_right</span>
                    <span className="text-[#111418] font-semibold">Account Settings</span>
                </div>
            } />

            <main className="flex-1 overflow-y-auto">
                <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-8 px-4 py-6 md:px-8 md:py-10">

                    {/* Header */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-black tracking-tight text-[#0e121b] dark:text-white">Account Settings</h1>
                        <p className="text-[#4d6599] dark:text-slate-400">Manage your account credentials, security, and session activity.</p>
                    </div>

                    <div className="flex flex-col gap-6">

                        {/* 1. Email Preferences */}
                        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#1a202c]">
                            <div className="flex items-start justify-between gap-6">
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-lg font-bold text-[#0e121b] dark:text-white">Email Preferences</h2>
                                    <p className="text-sm text-[#4d6599] dark:text-slate-400">Your email is used for login and important application notifications.</p>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end">
                                <div className="flex-1">
                                    <label className="mb-1.5 block text-sm font-medium text-[#0e121b] dark:text-slate-200">Email Address</label>
                                    <div className="relative flex items-center">
                                        <span className="material-symbols-outlined absolute left-3 text-[20px] text-slate-400">mail</span>
                                        <input
                                            ref={emailInputRef}
                                            className={`w-full rounded-lg border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-blue-600 focus:ring-blue-600 dark:border-slate-700 dark:text-slate-300 transition-colors ${isEditingEmail ? 'bg-white text-[#0e121b] ring-2 ring-blue-100 dark:bg-[#111621]' : 'bg-slate-50 text-slate-500 cursor-not-allowed dark:bg-slate-800'}`}
                                            readOnly={!isEditingEmail}
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button onClick={handleEmailToggle} className={`flex h-[42px] items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${isEditingEmail ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700' : 'border-slate-200 bg-white text-[#0e121b] hover:bg-slate-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700'}`}>
                                    <span className="material-symbols-outlined text-[18px]">{isEditingEmail ? 'check' : 'edit'}</span>
                                    {isEditingEmail ? 'Save Changes' : 'Change Email'}
                                </button>
                            </div>
                        </div>

                        {/* 2. SECURITY (Password) */}
                        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#1a202c]">
                            {/* ... Password UI kept similar, just condensed for brevity in replace block ... */}
                            <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">lock</span>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-lg font-bold text-[#0e121b] dark:text-white">Password & Security</h2>
                                    <p className="text-xs text-[#4d6599]">Last changed 3 months ago</p>
                                </div>
                            </div>
                            <form className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 max-w-2xl">
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="mb-1.5 block text-sm font-medium text-[#0e121b] dark:text-slate-200">Current Password</label>
                                        <input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full rounded-lg border-slate-200 bg-white py-2.5 px-3 text-sm" placeholder="••••••••••••" type="password" />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="mb-1.5 block text-sm font-medium text-[#0e121b] dark:text-slate-200">New Password</label>
                                        <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full rounded-lg border-slate-200 bg-white py-2.5 px-3 text-sm" placeholder="Min. 8 characters" type="password" />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="mb-1.5 block text-sm font-medium text-[#0e121b] dark:text-slate-200">Confirm Password</label>
                                        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full rounded-lg border-slate-200 bg-white py-2.5 px-3 text-sm" placeholder="Repeat new password" type="password" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <button onClick={handleUpdatePassword} className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700" type="button">Update Password</button>
                                </div>
                            </form>
                        </div>

                        {/* 3. ACTIVE SESSIONS (NEW) */}
                        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#1a202c]">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-slate-800">
                                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">devices</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-bold text-[#0e121b] dark:text-white">Active Sessions</h2>
                                        <p className="text-xs text-[#4d6599]">Manage devices logged into your account</p>
                                    </div>
                                </div>
                                <button onClick={handleLogoutAll} className="text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                                    Log out of all other devices
                                </button>
                            </div>

                            <div className="rounded-lg border border-slate-100 divide-y divide-slate-100 overflow-hidden dark:border-slate-700 dark:divide-slate-700">
                                <div className="bg-slate-50 px-4 py-2 grid grid-cols-12 gap-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:bg-slate-800 dark:text-slate-400">
                                    <div className="col-span-6 md:col-span-4">Device</div>
                                    <div className="col-span-4 md:col-span-4">Location</div>
                                    <div className="col-span-2 md:col-span-3 text-right md:text-left">Last Active</div>
                                    <div className="hidden md:block md:col-span-1 text-center">Action</div>
                                </div>
                                {activeSessions.map((session) => (
                                    <div key={session.id} className="px-4 py-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50/50 transition-colors">
                                        <div className="col-span-6 md:col-span-4 flex items-center gap-3">
                                            <span className="material-symbols-outlined text-slate-400 text-2xl">{session.icon}</span>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{session.device}</p>
                                                {session.current ? (
                                                    <span className="text-[10px] items-center flex gap-1 text-green-600 font-medium">Current Session</span>
                                                ) : (
                                                    <span className="text-[10px] text-slate-400 md:hidden">Tap to manage</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-span-4 md:col-span-4 flex items-center gap-2 text-sm text-slate-600">
                                            <span className="w-2 h-2 rounded-full bg-slate-300 md:hidden"></span> {/* Dot for mobile layout mostly hidden by grid */}
                                            {session.location}
                                        </div>
                                        <div className="col-span-2 md:col-span-3 text-right md:text-left text-sm text-slate-500">
                                            {session.lastActive}
                                        </div>
                                        <div className="col-span-12 md:col-span-1 flex justify-center mt-2 md:mt-0">
                                            {!session.current && (
                                                <button
                                                    onClick={() => handleRemoveDevice(session.id)}
                                                    className="text-xs font-medium text-slate-500 hover:text-red-600 hover:underline"
                                                >
                                                    Remove device
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {activeSessions.length === 0 && <div className="p-4 text-center text-sm text-slate-400">No active sessions found.</div>}
                            </div>
                        </div>

                        {/* 4. DANGER ZONE (Delete Account) */}
                        <div className="rounded-lg border border-red-100 bg-red-50/30 p-6 dark:border-red-900/30 dark:bg-red-900/10">
                            <h2 className="text-lg font-bold text-red-500">Danger Zone</h2>
                            <p className="mt-1 text-sm text-[#4d6599] dark:text-slate-400">Permanently delete your account and all associated data. This action cannot be undone.</p>

                            <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-lg border border-red-200 bg-white p-4 sm:flex-row dark:border-red-900/30 dark:bg-[#1a202c]">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold text-[#0e121b] dark:text-white">Delete Account</span>
                                    <span className="text-xs text-[#4d6599]">Once you delete your account, there is no going back. Please be certain.</span>
                                </div>
                                <button
                                    onClick={handleDeleteInitialClick}
                                    className="whitespace-nowrap rounded-lg border border-red-500/30 bg-white px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 focus:outline-none dark:bg-transparent"
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-800">
                        <p className="text-center text-xs text-slate-400">© 2026 EAOverseas. All rights reserved.</p>
                    </div>
                </div>
            </main>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 animate-fade-in-up">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 mx-auto">
                            <span className="material-symbols-outlined text-red-600 text-2xl">warning</span>
                        </div>
                        <h3 className="text-xl font-bold text-center text-slate-900 mb-2">Delete Account?</h3>
                        <p className="text-center text-slate-500 text-sm mb-6">
                            Are you sure you want to delete your account? This action is permanent and cannot be undone. All your data will be lost.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition">
                                Cancel
                            </button>
                            <button onClick={handleDeleteConfirmYes} className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-lg shadow-red-500/20">
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Password Verification Modal */}
            {showDeletePassword && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 animate-fade-in-up">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-slate-900">Verify Password</h3>
                            <button onClick={() => { setShowDeletePassword(false); setDeletePassword(""); setDeleteError(""); }} className="p-1 hover:bg-slate-100 rounded-full"><span className="material-symbols-outlined text-slate-400">close</span></button>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">Please enter your password to confirm account deletion.</p>

                        <input
                            type="password"
                            className="w-full rounded-xl border-slate-200 py-3 px-4 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 mb-2"
                            placeholder="Enter your password"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                        />
                        {deleteError && <p className="text-xs text-red-500 mb-4 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">error</span>{deleteError}</p>}

                        <button onClick={handleDeleteFinal} className="w-full py-3 mt-2 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition shadow-lg shadow-red-500/20">
                            Confirm Deletion
                        </button>
                    </div>
                </div>
            )}

        </div>
    );

};

export default AccountSettings;
