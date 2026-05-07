import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Application {
    id: string;
    studentName: string;
    studentInitials: string;
    studentColor: string;
    type: 'Program' | 'Scholarship' | 'University';
    targetName: string;
    institution: string;
    status: 'Pending' | 'Accepted' | 'Rejected';
    dateApplied: string;
    studentCountry: string;
    priority: 'High' | 'Medium' | 'Low' | 'Urgent';
    mobileNumber: string;
    email: string;
    courseMajor: string;
    gpa: string;
    achievements: string;
    statement: string;
    // Type-specific details
    ieltsScore?: string;
    greScore?: string;
    workExperience?: string;
    extraCurriculars?: string;
    documents?: {
        transcript?: string;
        idCopy?: string;
        sop?: string;
        lor?: string;
        cv?: string;
        passport?: string;
        degreeCertificate?: string;
    };
}

interface ApplicationsContextType {
    applications: Application[];
    submitApplication: (application: Application) => void;
    updateApplicationStatus: (id: string, newStatus: 'Accepted' | 'Rejected' | 'Pending') => void;
    deleteApplication: (id: string) => void;
}

const INITIAL_POOL: Application[] = [
    {
        id: 'APP-8821',
        studentName: 'Alex Johnson',
        studentInitials: 'AJ',
        studentColor: 'blue',
        type: 'Program',
        targetName: 'M.Sc. Data Science',
        institution: 'University of Toronto',
        status: 'Pending',
        dateApplied: '2024-03-10',
        studentCountry: 'India',
        priority: 'High',
        mobileNumber: '+1 416-555-0123',
        email: 'alex.j@example.com',
        courseMajor: 'Computer Science',
        gpa: '3.92',
        achievements: 'Dean\'s list for 3 consecutive years; Winner of University Hackathon 2023.',
        statement: 'I am highly motivated to pursue Data Science at the University of Toronto to leverage my background in CS for advanced analytics.',
        ieltsScore: '8.0',
        greScore: '325',
        workExperience: '12 months as Junior Dev at TechCorp.',
        documents: { transcript: 'Alex_Transcript.pdf', idCopy: 'Alex_ID.png', sop: 'Alex_SOP.pdf', cv: 'Alex_Resume.pdf' }
    },
    {
        id: 'SCH-1029',
        studentName: 'Sarah Smith',
        studentInitials: 'SS',
        studentColor: 'purple',
        type: 'Scholarship',
        targetName: 'Global Excellence Scholarship',
        institution: 'University of British Columbia',
        status: 'Pending',
        dateApplied: '2024-03-12',
        studentCountry: 'United Kingdom',
        priority: 'Medium',
        mobileNumber: '+1 604-555-0456',
        email: 'sarah.smith@example.com',
        courseMajor: 'International Relations',
        gpa: '3.88',
        achievements: 'Model UN Delegate; Volunteer at local community center for 2 years.',
        statement: 'This scholarship will enable me to focus on my studies and continue my advocacy work in international development.',
        documents: { transcript: 'Sarah_Transcript.pdf', idCopy: 'Sarah_ID.jpg' }
    },
    {
        id: 'APP-7634',
        studentName: 'Michael Chen',
        studentInitials: 'MC',
        studentColor: 'teal',
        type: 'Program',
        targetName: 'B.Eng. Software Engineering',
        institution: 'McGill University',
        status: 'Accepted',
        dateApplied: '2024-03-05',
        studentCountry: 'China',
        priority: 'Low',
        mobileNumber: '+1 514-555-0789',
        email: 'm.chen@example.com',
        courseMajor: 'Physics',
        gpa: '3.75',
        achievements: 'National Physics Olympiad Runner-up; Lead Developer for high school robotics team.',
        statement: 'I wish to transition into software engineering to build tools that solve complex mathematical problems.',
        ieltsScore: '7.5',
        documents: { transcript: 'Michael_Academic_Record.pdf', lor: 'Michael_LOR.pdf', sop: 'Michael_SOP.pdf' }
    },
    {
        id: 'APP-9901',
        studentName: 'Emma Wilson',
        studentInitials: 'EW',
        studentColor: 'orange',
        type: 'Program',
        targetName: 'MBA International Business',
        institution: 'York University',
        status: 'Pending',
        dateApplied: '2024-03-08',
        studentCountry: 'Canada',
        priority: 'Urgent',
        mobileNumber: '+1 416-555-0999',
        email: 'e.wilson@example.com',
        courseMajor: 'Business',
        gpa: '3.80',
        achievements: 'Founder of a small eco-friendly startup; 3 years project management experience.',
        statement: 'Pursuing an MBA at York will help me scale my sustainable business initiatives globally.',
        workExperience: '36 months in Project Management.',
        greScore: '318',
        documents: { idCopy: 'Emma_Identity.png', cv: 'Emma_CV_MBA.pdf' }
    },
    {
        id: 'SCH-3342',
        studentName: 'David Miller',
        studentInitials: 'DM',
        studentColor: 'blue',
        type: 'Scholarship',
        targetName: 'STEM Innovation Grant',
        institution: 'University of Toronto',
        status: 'Rejected',
        dateApplied: '2024-03-01',
        studentCountry: 'United States',
        priority: 'Low',
        mobileNumber: '+1 416-555-0111',
        email: 'd.miller@example.com',
        courseMajor: 'Mathematics',
        gpa: '3.65',
        achievements: 'Math tutor for underprivileged students; Member of the Chess Club.',
        statement: 'I am applying for this grant to support my research into computational number theory.',
        documents: { transcript: 'David_Grades.pdf', idCopy: 'David_Passport.pdf' }
    },
    {
        id: 'UNI-4451',
        studentName: 'Olivia Brown',
        studentInitials: 'OB',
        studentColor: 'teal',
        type: 'University',
        targetName: 'General Admission',
        institution: 'University of Waterloo',
        status: 'Pending',
        dateApplied: '2024-03-14',
        studentCountry: 'Nigeria',
        priority: 'High',
        mobileNumber: '+1 519-555-0222',
        email: 'o.brown@example.com',
        courseMajor: 'Economics',
        gpa: '3.95',
        achievements: 'Top of class in Economics; Published 2 articles in student journal.',
        statement: 'Waterloo is my top choice for Economics due to its strong coop program and academic reputation.',
        extraCurriculars: 'Debate Captain, Varsity Soccer player.',
        documents: { transcript: 'Olivia_Economics_Transcript.pdf', passport: 'Olivia_Passport.png' }
    }
];

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined);

export const ApplicationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [applications, setApplications] = useState<Application[]>(() => {
        try {
            const saved = localStorage.getItem('eaoverseas_applications');
            return saved ? JSON.parse(saved) : INITIAL_POOL;
        } catch (err) {
            console.error('Error loading applications:', err);
            return INITIAL_POOL;
        }
    });

    const channelRef = React.useRef<BroadcastChannel | null>(null);
    const isInternalUpdate = React.useRef(false);

    useEffect(() => {
        const channel = new BroadcastChannel('eaoverseas_applications_channel');
        channelRef.current = channel;

        channel.onmessage = (event) => {
            if (event.data?.type === 'SYNC_APPLICATIONS') {
                isInternalUpdate.current = true;
                setApplications(event.data.payload);
            }
        };

        return () => channel.close();
    }, []);

    useEffect(() => {
        localStorage.setItem('eaoverseas_applications', JSON.stringify(applications));

        if (isInternalUpdate.current) {
            isInternalUpdate.current = false;
            return;
        }

        if (channelRef.current) {
            channelRef.current.postMessage({ type: 'SYNC_APPLICATIONS', payload: applications });
        }
    }, [applications]);

    const submitApplication = (application: Application) => {
        setApplications(prev => [application, ...prev]);
    };

    const updateApplicationStatus = (id: string, newStatus: 'Accepted' | 'Rejected' | 'Pending') => {
        setApplications(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    };

    const deleteApplication = (id: string) => {
        setApplications(prev => prev.filter(app => app.id !== id));
    };

    return (
        <ApplicationsContext.Provider value={{ applications, submitApplication, updateApplicationStatus, deleteApplication }}>
            {children}
        </ApplicationsContext.Provider>
    );
};

export const useApplications = () => {
    const context = useContext(ApplicationsContext);
    if (context === undefined) {
        throw new Error('useApplications must be used within an ApplicationsProvider');
    }
    return context;
};
