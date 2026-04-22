import React from 'react';

const ReadingSubmitModal = ({ isOpen, onClose, onConfirm, summary }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all scale-100 opacity-100">
                <div className="p-8 text-center">
                    {/* Icon */}
                    <div className="mx-auto mb-6 w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-blue-600 text-3xl">fact_check</span>
                    </div>

                    {/* Breadcrumb / Label */}
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        IELTS Practice / Reading Test Section 3
                    </p>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        Submit Reading Test?
                    </h2>

                    {/* Statistics Grid */}
                    {summary && (
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total</p>
                                <p className="text-xl font-bold text-slate-900">{summary.total}</p>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                                <p className="text-xs text-blue-600 uppercase font-bold tracking-wider mb-1">Answered</p>
                                <p className="text-xl font-bold text-blue-700">{summary.answered}</p>
                            </div>
                            <div className={`p-3 rounded-xl border ${summary.unanswered > 0 ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
                                <p className={`text-xs uppercase font-bold tracking-wider mb-1 ${summary.unanswered > 0 ? 'text-red-600' : 'text-slate-500'}`}>Unanswered</p>
                                <p className={`text-xl font-bold ${summary.unanswered > 0 ? 'text-red-700' : 'text-slate-900'}`}>{summary.unanswered}</p>
                            </div>
                            <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                                <p className="text-xs text-orange-600 uppercase font-bold tracking-wider mb-1">Marked</p>
                                <p className="text-xl font-bold text-orange-700">{summary.marked}</p>
                            </div>
                        </div>
                    )}

                    {/* Warning Message if Unanswered > 0 */}
                    {summary?.unanswered > 0 && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-xs font-medium text-red-600 text-left">
                            <span className="material-symbols-outlined text-base">warning</span>
                            You have {summary.unanswered} unanswered question{summary.unanswered !== 1 ? 's' : ''}.
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-6 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
                        >
                            Keep Working
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            Submit Test
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
                    <span className="material-symbols-outlined text-sm">lock</span>
                    Your progress is automatically saved to the EAOverseas cloud.
                </div>
            </div>
        </div>
    );
};

export default ReadingSubmitModal;
