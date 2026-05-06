import React from 'react';

const Header = ({ title }) => {
    return (
        <header className="h-16 flex items-center justify-between px-8 border-b border-slate-200 bg-white shrink-0 z-10">
            <div>
                <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            </div>
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-500 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>notifications</span>
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
