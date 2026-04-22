import React from 'react';

const NotificationBanner = ({ sessions }) => {
    const [lastSeenCount, setLastSeenCount] = React.useState(0);
    const [showNotification, setShowNotification] = React.useState(false);
    const [newSession, setNewSession] = React.useState(null);

    React.useEffect(() => {
        // Load last seen count from localStorage
        const saved = localStorage.getItem('counsellor_last_seen_count');
        if (saved) {
            setLastSeenCount(parseInt(saved));
        }
    }, []);

    React.useEffect(() => {
        if (sessions.length > lastSeenCount && lastSeenCount > 0) {
            // New session detected
            const latest = sessions[sessions.length - 1];
            setNewSession(latest);
            setShowNotification(true);

            // Auto-dismiss after 5 seconds
            setTimeout(() => {
                setShowNotification(false);
            }, 5000);
        }

        // Update last seen count
        if (sessions.length > 0) {
            setLastSeenCount(sessions.length);
            localStorage.setItem('counsellor_last_seen_count', sessions.length.toString());
        }
    }, [sessions]);

    if (!showNotification || !newSession) return null;

    return (
        <div className="fixed top-4 right-4 z-[100] max-w-sm animate-slide-in">
            <div className="bg-white border-l-4 border-blue-600 rounded-lg shadow-lg p-4 flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-blue-600 text-xl">notifications_active</span>
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">New Session Scheduled</h4>
                    <p className="text-xs text-gray-600 mt-1">
                        <span className="font-medium">{newSession.studentName}</span> on {newSession.dateLabel}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{newSession.topic}</p>
                </div>
                <button
                    onClick={() => setShowNotification(false)}
                    className="flex-shrink-0 text-gray-400 hover:text-gray-600"
                >
                    <span className="material-symbols-outlined text-sm">close</span>
                </button>
            </div>
        </div>
    );
};

export default NotificationBanner;
