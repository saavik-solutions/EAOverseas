import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ConsultantSidebar from '../components/ConsultantSidebar';
import logo from '../assets/logo.jpg';
import { useAuth } from '../context/AuthContext';

const ConsultantLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user } = useAuth() || {};

    return (
        <div className="flex h-screen w-full bg-background-light font-display text-[#111827] overflow-hidden flex-col lg:flex-row">

            {/* Mobile Header - Same as MainLayout */}
            <div className="lg:hidden bg-white px-4 py-3 flex items-center justify-between z-30 shrink-0">
                <img src={logo} alt="EAOverseas" className="h-8 w-auto object-contain" />
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </div>

            <ConsultantSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} user={user} />

            {/* Main Content Area */}
            <Outlet />
        </div>
    );
};

export default ConsultantLayout;
