import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the comprehensive Scholarship type
export interface Scholarship {
    id: string;
    title: string;
    status: string;
    statusColor: string;
    coverage: string;
    requirement: string;
    deadline: string;
    applicants: number;
    avgGpa: string;
    maxAvailable: string;
    avatars: string[];
    extraApplicants: string;
    analyticsData: any[];
    // Student-facing specific fields (can be mapped or added)
    description?: string;
    faculty?: string;
    image?: string;
    icon?: string;
    course?: string;
    level?: string;
    institution?: string;
    logo?: string;
    type?: string;
}

interface ScholarshipsContextType {
    scholarships: Scholarship[];
    addScholarship: (scholarship: Scholarship) => void;
    updateScholarship: (id: string, updatedScholarship: Scholarship) => void;
    deleteScholarship: (id: string) => void;
    clearAllScholarships: () => void;
}

const DEFAULT_SCHOLARSHIPS: Scholarship[] = [
    {
        id: '1',
        title: 'STEM Excellence Grant',
        status: 'Active',
        statusColor: 'bg-emerald-100 text-emerald-700',
        coverage: '100% Tuition + $5k',
        requirement: 'GPA: 3.8+ Min.',
        deadline: 'Oct 15, 2024',
        applicants: 452,
        avgGpa: '3.92',
        maxAvailable: '150',
        avatars: [
            'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?w=100&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60'
        ],
        extraApplicants: '+42',
        analyticsData: [],
        institution: 'University of Toronto',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/1200px-Utoronto_coa.svg.png'
    },
    {
        id: '4',
        title: 'Global Leadership Award',
        status: 'Active',
        statusColor: 'bg-emerald-100 text-emerald-700',
        coverage: '$25,000 Total',
        requirement: 'GPA: 3.5+ Min.',
        deadline: 'Nov 30, 2024',
        applicants: 188,
        avgGpa: '3.75',
        maxAvailable: '100',
        avatars: [
            'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=60'
        ],
        extraApplicants: '+15',
        analyticsData: [],
        institution: "King's College London",
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/King%27s_College_London_logo.svg/1200px-King%27s_College_London_logo.svg.png'
    },
    {
        id: '5',
        title: 'Arts & Humanities Award',
        status: 'Draft',
        statusColor: 'bg-slate-100 text-slate-600',
        coverage: '$10,000 One-time',
        requirement: 'Portfolio required',
        deadline: 'Not Set',
        applicants: 0,
        avgGpa: '0.0',
        maxAvailable: '20',
        avatars: [],
        extraApplicants: '0 Applicants',
        analyticsData: [],
        institution: 'University of Melbourne',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/University_of_Melbourne_logo.svg/1200px-University_of_Melbourne_logo.svg.png'
    }
];

const ScholarshipsContext = createContext<ScholarshipsContextType | undefined>(undefined);

export const ScholarshipsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [scholarships, setScholarships] = useState<Scholarship[]>(() => {
        try {
            const saved = localStorage.getItem('university_scholarships');
            return saved ? JSON.parse(saved) : DEFAULT_SCHOLARSHIPS;
        } catch (err) {
            console.error('Error loading scholarships:', err);
            return DEFAULT_SCHOLARSHIPS;
        }
    });

    const channelRef = React.useRef<BroadcastChannel | null>(null);
    const isInternalUpdate = React.useRef(false);

    useEffect(() => {
        const channel = new BroadcastChannel('eaoverseas_scholarships_channel');
        channelRef.current = channel;

        channel.onmessage = (event) => {
            if (event.data?.type === 'SYNC_SCHOLARSHIPS') {
                isInternalUpdate.current = true;
                setScholarships(event.data.payload);
            }
        };

        return () => channel.close();
    }, []);

    useEffect(() => {
        localStorage.setItem('university_scholarships', JSON.stringify(scholarships));

        if (isInternalUpdate.current) {
            isInternalUpdate.current = false;
            return;
        }

        if (channelRef.current) {
            channelRef.current.postMessage({ type: 'SYNC_SCHOLARSHIPS', payload: scholarships });
        }
    }, [scholarships]);

    const addScholarship = (scholarship: Scholarship) => {
        setScholarships(prev => [scholarship, ...prev]);
    };

    const updateScholarship = (id: string, updatedScholarship: Scholarship) => {
        setScholarships(prev => prev.map(s => s.id === id ? updatedScholarship : s));
    };

    const deleteScholarship = (id: string) => {
        setScholarships(prev => prev.filter(s => s.id !== id));
    };

    const clearAllScholarships = () => {
        if (window.confirm('Delete all scholarships?')) {
            setScholarships(DEFAULT_SCHOLARSHIPS);
        }
    };

    return (
        <ScholarshipsContext.Provider value={{ scholarships, addScholarship, updateScholarship, deleteScholarship, clearAllScholarships }}>
            {children}
        </ScholarshipsContext.Provider>
    );
};

export const useScholarships = () => {
    const context = useContext(ScholarshipsContext);
    if (context === undefined) {
        throw new Error('useScholarships must be used within a ScholarshipsProvider');
    }
    return context;
};
