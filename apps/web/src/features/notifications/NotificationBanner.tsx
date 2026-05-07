import React from 'react';

interface Session {
    id: string;
    studentName?: string;
    name?: string;
    date: string;
    topic: string;
    mode: 'video' | 'voice' | 'audio' | 'chat';
}

interface NotificationBannerProps {
    sessions: Session[];
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ sessions }) => {
    const upcomingSession = sessions.find(s => s.date === 'Today' || s.date === 'Now');

    if (!upcomingSession) return null;

    return (
        <div className="bg-blue-600 text-white px-4 py-2.5 flex items-center justify-between animate-in slide-in-from-top duration-300">
            <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                    <span className="material-symbols-outlined !text-[20px]">videocam</span>
                </div>
                <div>
                    <p className="text-xs md:text-sm font-bold">
                        Upcoming Session with {upcomingSession.studentName || upcomingSession.name}
                    </p>
                    <p className="text-[10px] md:text-xs text-blue-100">
                        Topic: {upcomingSession.topic} • Starts in 15 minutes
                    </p>
                </div>
            </div>
            <button className="px-4 py-1.5 bg-white text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg">
                Join Now
            </button>
        </div>
    );
};

export default NotificationBanner;
