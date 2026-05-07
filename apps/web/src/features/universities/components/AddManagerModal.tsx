import React, { useState, useEffect } from 'react';

interface AddManagerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (manager: { id: string; name: string; email: string; password: string }) => void;
    universityName: string;
    universityEmail: string;
}

const AddManagerModal: React.FC<AddManagerModalProps> = ({ isOpen, onClose, onAdd, universityName, universityEmail }) => {
    const [managerName, setManagerName] = useState('');
    const [generatedId, setGeneratedId] = useState('');
    const [generatedPassword, setGeneratedPassword] = useState('');

    useEffect(() => {
        if (isOpen) {
            // Auto-generate ID and Password when modal opens
            const randomId = `MGR-${Math.floor(1000 + Math.random() * 9000)}`;
            const randomPass = Math.random().toString(36).slice(-8).toUpperCase() + '@2024';
            setGeneratedId(randomId);
            setGeneratedPassword(randomPass);
            setManagerName('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (!managerName.trim()) return;
        onAdd({
            id: generatedId,
            name: managerName,
            email: universityEmail,
            password: generatedPassword
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-slate-100">
                {/* Header */}
                <div className="p-6 text-center border-b border-slate-50 bg-slate-50/30">
                    <div className="size-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <span className="material-symbols-outlined text-2xl">person_add</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">Add University Manager</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{universityName}</p>
                </div>

                {/* Form Content */}
                <div className="p-6 flex flex-col gap-6">
                    {/* Personal Detail */}
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                            <input
                                autoFocus
                                type="text"
                                value={managerName}
                                onChange={(e) => setManagerName(e.target.value)}
                                placeholder="Enter manager's name"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Personal Manager ID</label>
                            <div className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 flex items-center justify-between">
                                {generatedId}
                                <span className="bg-emerald-100 text-emerald-600 text-[8px] px-1.5 py-0.5 rounded font-bold">AUTO-GENERATED</span>
                            </div>
                        </div>
                    </div>

                    {/* Shared Login Credentials */}
                    <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-3">
                        <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] text-center border-b border-indigo-100 pb-2">University Login Credentials</p>

                        <div className="space-y-1">
                            <label className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest pl-1">Shared Email</label>
                            <div className="px-3 py-2 bg-white rounded-lg text-xs font-medium text-slate-600 truncate border border-indigo-50">
                                {universityEmail}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest pl-1">Personal Password</label>
                            <div className="px-3 py-2 bg-indigo-600 rounded-lg text-xs font-bold text-white font-mono flex justify-between items-center shadow-sm">
                                {generatedPassword}
                                <span className="material-symbols-outlined text-[14px]">lock</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-6 pt-2 grid grid-cols-2 gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!managerName.trim()}
                        className="px-4 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[18px]">save</span>
                        Save Manager
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddManagerModal;

