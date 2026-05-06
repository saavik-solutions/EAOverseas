import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';

interface UserIdentity {
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
    dob: string;
    nationality: string;
    address: string;
    currentCountry: string;
    country?: string;
    image: string | null;
    banner: string | null;
    profileStrength: number;
    studentId?: string;
}

interface GuardianInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    relationship: string;
    nationality: string;
    country: string;
    state: string;
    city: string;
    address: string;
    postalCode: string;
}

interface AcademicInfo {
    gpa: string;
    ielts: string;
    gre: string;
    degree: string;
    major: string;
    institution: string;
    universityBoard: string;
    gradYear: string;
}

interface UserPreferences {
    countries: string[];
    intakes: string[];
    programType?: string;
    budget?: string;
    timeline?: string;
    factors?: string[];
}

interface UserReadiness {
    visaStatus: string;
    applicationsDraft: number;
    loanStatus: string;
}

interface DocumentInfo {
    id: number;
    name: string;
    date: string;
    size: string;
    type: string;
    error?: string;
}

interface UserDocuments {
    academic: DocumentInfo[];
    financial: DocumentInfo[];
    identity: DocumentInfo[];
}

interface UserApplicationSummary {
    id: number;
    university: string;
    status: string;
}

interface UserProfile {
    identity: UserIdentity;
    guardian: GuardianInfo;
    academics: AcademicInfo;
    preferences: UserPreferences;
    readiness: UserReadiness;
    documents: UserDocuments;
    applications: UserApplicationSummary[];
    connections: Record<string, string>;
}

interface UserProfileContextType {
    userProfile: UserProfile;
    updatePreferences: (newPreferences: Partial<UserPreferences>) => void;
    updateIdentity: (newIdentity: Partial<UserIdentity>) => void;
    updateDocuments: (section: keyof UserDocuments, newDocs: DocumentInfo[]) => void;
    updateAcademics: (newAcademics: Partial<AcademicInfo>) => void;
    updateGuardian: (newGuardian: Partial<GuardianInfo>) => void;
    sendConnectionRequest: (targetUsername: string) => void;
    acceptConnectionRequest: (targetUsername: string) => void;
    removeConnection: (targetUsername: string) => void;
    getConnectionDetails: () => any[];
    setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const UserProfileContext = createContext<UserProfileContextType | null>(null);

export const useUserProfile = () => {
    const context = useContext(UserProfileContext);
    if (!context) {
        throw new Error('useUserProfile must be used within a UserProfileProvider');
    }
    return context;
};

const MOCK_USERS_DB = [
    { username: 'chamia', name: 'Chamia', email: 'chamia@k.com', image: 'https://ui-avatars.com/api/?name=Chamia&background=0D8ABC&color=fff', role: 'Student' },
    { username: 'emily_r', name: 'Emily Rose', email: 'emily.r@example.com', image: 'https://ui-avatars.com/api/?name=Emily+Rose&background=random', role: 'Alumni' },
    { username: 'david_k', name: 'David Kim', email: 'david.k@example.com', image: 'https://ui-avatars.com/api/?name=David+Kim&background=random', role: 'Student' },
    { username: 'sarah_m', name: 'Sarah Miller', email: 'sarah.m@example.com', image: 'https://ui-avatars.com/api/?name=Sarah+Miller&background=random', role: 'Mentor' },
    { username: 'michael_b', name: 'Michael Brown', email: 'michael.b@example.com', image: 'https://ui-avatars.com/api/?name=Michael+Brown&background=random', role: 'Student' }
];

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();

    // Factory function to ensure fresh object references every time
    const getEmptyProfile = (): UserProfile => ({
        identity: {
            name: '',
            email: '',
            phone: '',
            whatsapp: '',
            dob: '',
            nationality: '',
            address: '',
            currentCountry: '',
            image: null,
            banner: null,
            profileStrength: 0
        },
        guardian: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            relationship: '',
            nationality: '',
            country: '',
            state: '',
            city: '',
            address: '',
            postalCode: ''
        },
        academics: {
            gpa: '',
            ielts: '',
            gre: '',
            degree: '',
            major: '',
            institution: '',
            universityBoard: '',
            gradYear: ''
        },
        preferences: {
            countries: [],
            intakes: []
        },
        readiness: {
            visaStatus: 'Not Started',
            applicationsDraft: 0,
            loanStatus: 'Not Started'
        },
        documents: {
            academic: [],
            financial: [],
            identity: []
        },
        applications: [],
        connections: {}
    });

    const mockProfile: UserProfile = {
        identity: {
            name: 'Alex Johnson',
            email: 'alex.j@example.com',
            phone: '+1 (555) 123-4567',
            whatsapp: '+1 (555) 987-6543',
            dob: '1999-05-15',
            nationality: 'Indian',
            address: '123 Main St, Apt 4B',
            currentCountry: 'India',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwOf0s3pAzKqObTWJ9nRCMKaHDRDwvbDhO9sFXL0JQPG24TX6Z_QyJf55dIzkQoAgus8p8gE38nhnMt-PtfxoIMmzdNxhbDqCbPOz3cJuQoDrXO3I2wPvGsHzn8GfsBCJjHLcJR6SWs04u4ihpPaW9VUI-XlrPhYvmL9DsG3dAwc-Z__Zgxhq892QgjQtEKSwUpVnOD_0jhVBEl-K53XBePLsXdfX5R9f-sto6ECHWwMTa-erfA_QfrmenNf9BKHj7OrZp-7cdMZ4',
            banner: null,
            profileStrength: 85
        },
        guardian: {
            firstName: 'Robert',
            lastName: 'Johnson',
            email: 'robert.j@example.com',
            phone: '+91 9876543210',
            relationship: 'Father',
            nationality: 'Indian',
            country: 'India',
            state: 'Maharashtra',
            city: 'Mumbai',
            address: '456 Parent Lane',
            postalCode: '400001'
        },
        academics: {
            gpa: '3.8',
            ielts: '7.5',
            gre: '320',
            degree: 'B.Tech',
            major: 'Comp Sci.',
            institution: 'IIT Bombay',
            universityBoard: 'Mumbai University',
            gradYear: '2024'
        },
        preferences: {
            countries: ['United Kingdom', 'Canada', 'Germany'],
            intakes: ['Fall 2024', 'Spring 2025']
        },
        readiness: {
            visaStatus: 'On Track',
            applicationsDraft: 2,
            loanStatus: 'Pre-Approved'
        },
        documents: {
            academic: [
                { id: 1, name: "Undergraduate Transcript.pdf", date: "Oct 10, 2023", size: "2.4 MB", type: "pdf" },
                { id: 2, name: "Statement of Purpose (Draft v2).docx", date: "Oct 14, 2023", size: "1.1 MB", type: "doc" },
                { id: 3, name: "Letter of Recommendation 1.pdf", date: "Sep 28, 2023", size: "540 KB", type: "pdf" }
            ],
            financial: [
                { id: 4, name: "Bank Statement (Last 6 Months).pdf", date: "Oct 20, 2023", size: "4.2 MB", type: "pdf", error: "Please re-upload a cleaner copy. The current scan is blurry." },
                { id: 5, name: "Affidavit of Support.pdf", date: "Oct 19, 2023", size: "1.8 MB", type: "pdf" }
            ],
            identity: [
                { id: 6, name: "Passport Front Page.jpg", date: "Aug 15, 2023", size: "2.1 MB", type: "image" },
                { id: 7, name: "Passport Back Page.jpg", date: "Aug 15, 2023", size: "1.9 MB", type: "image" }
            ],
        },
        applications: [
            { id: 1, university: "Arizona State University", status: "In Progress" },
            { id: 2, university: "University of Toronto", status: "Submitted" }
        ],
        connections: {
            'chamia': 'connected',
            'emily_r': 'connected',
            'sarah_m': 'connected'
        }
    };

    const [userProfile, setUserProfile] = useState<UserProfile>(getEmptyProfile());

    // Calculate Profile Strength
    const calculateStrength = (profile: UserProfile) => {
        let score = 0;

        // 1. Basic Identity (30%)
        const identityFields: (keyof UserIdentity)[] = ['name', 'email', 'phone', 'dob', 'nationality', 'address', 'currentCountry'];
        const filledIdentity = identityFields.filter(f => profile.identity?.[f] && String(profile.identity[f]).trim() !== '').length;
        score += (filledIdentity / identityFields.length) * 30;

        // 2. Academics (30%)
        const academicFields: (keyof AcademicInfo)[] = ['institution', 'degree', 'major', 'gradYear'];
        const filledAcademics = academicFields.filter(f => profile.academics?.[f] && String(profile.academics[f]).trim() !== '').length;
        score += (filledAcademics / academicFields.length) * 30;

        // 3. Guardian (20%)
        const guardianFields: (keyof GuardianInfo)[] = ['firstName', 'lastName', 'phone', 'relationship'];
        const filledGuardian = guardianFields.filter(f => profile.guardian?.[f] && String(profile.guardian[f]).trim() !== '').length;
        score += (filledGuardian / guardianFields.length) * 20;

        // 4. Preferences (10%)
        if (profile.preferences?.countries?.length > 0) score += 5;
        if (profile.preferences?.intakes?.length > 0) score += 5;

        // 5. Image (10%)
        if (profile.identity?.image && !profile.identity.image.includes('ui-avatars.com')) score += 10; // Only count REAL uploads, not default avatars

        return Math.min(Math.round(score), 100);
    };

    // Auto-calculate strength when profile changes
    useEffect(() => {
        if (!userProfile) return;

        const newStrength = calculateStrength(userProfile);
        if (newStrength !== userProfile.identity.profileStrength) {
            setUserProfile(prev => ({
                ...prev,
                identity: { ...prev.identity, profileStrength: newStrength }
            }));
        }
    }, [
        userProfile.identity?.name, userProfile.identity?.email, userProfile.identity?.phone,
        userProfile.identity?.dob, userProfile.identity?.nationality, userProfile.identity?.address,
        userProfile.identity?.image,
        userProfile.academics,
        userProfile.guardian,
        userProfile.preferences
    ]);

    useEffect(() => {
        // Only run this initialization if we have a user and checking for a fresh login/change
        if (user) {
            if (user.isDemo) {
                setUserProfile(mockProfile);
            } else {
                setUserProfile(prev => {
                    // 1. Try to load from LocalStorage first
                    const savedProfile = localStorage.getItem(`user_profile_${user.email}`);
                    if (savedProfile) {
                        try {
                            const parsed = JSON.parse(savedProfile);
                            if (parsed.identity?.email === user.email) {
                                // POLLUTION CHECK: Detect if this profile has leaked Mock Data
                                // The mock profile has Guardian named 'Robert'. Real users won't have this default.
                                const isPolluted = !user.isDemo && parsed.guardian?.firstName === 'Robert' && parsed.guardian?.lastName === 'Johnson';

                                if (isPolluted) {
                                    console.warn("Detected Pollution in Saved Profile. Resetting to Fresh State.");
                                    // Don't return parsed; fall through to fresh initialization
                                } else {
                                    // Valid clean profile found
                                    return { ...getEmptyProfile(), ...parsed, connections: parsed.connections || {} };
                                }
                            }
                        } catch (e) {
                            console.error("Failed to parse saved profile", e);
                        }
                    }

                    // 2. If in-memory state exists and matches (session persistence), keep it
                    if (prev.identity?.email === user.email) {
                        return prev;
                    }

                    // 3. Fallback: Initialize fresh
                    const freshProfile = getEmptyProfile();
                    return {
                        ...freshProfile,
                        identity: {
                            ...freshProfile.identity,
                            name: user.name,
                            email: user.email,
                            image: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=random'
                        }
                    };
                });
            }
        }
    }, [user?.email]);

    // Save to LocalStorage whenever profile changes (if it's a real user)
    useEffect(() => {
        if (user && !user.isDemo && userProfile.identity?.email) {
            localStorage.setItem(`user_profile_${user.email}`, JSON.stringify(userProfile));
        }
    }, [userProfile, user]);

    const updateDocuments = (section: keyof UserDocuments, newDocs: DocumentInfo[]) => {
        setUserProfile(prev => ({
            ...prev,
            documents: { ...prev.documents, [section]: newDocs }
        }));
    };

    const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
        setUserProfile(prev => ({
            ...prev,
            preferences: { ...prev.preferences, ...newPreferences }
        }));
    };

    const updateAcademics = (newAcademics: Partial<AcademicInfo>) => {
        setUserProfile(prev => ({
            ...prev,
            academics: { ...prev.academics, ...newAcademics }
        }));
    };

    const updateIdentity = (newIdentity: Partial<UserIdentity>) => {
        setUserProfile(prev => ({ ...prev, identity: { ...prev.identity, ...newIdentity } }));
    };

    const updateGuardian = (newGuardian: Partial<GuardianInfo>) => {
        setUserProfile(prev => ({ ...prev, guardian: { ...prev.guardian, ...newGuardian } }));
    };

    const sendConnectionRequest = (targetUsername: string) => {
        setUserProfile(prev => ({
            ...prev,
            connections: { ...prev.connections, [targetUsername]: 'pending' }
        }));
    };

    const acceptConnectionRequest = (targetUsername: string) => {
        setUserProfile(prev => ({
            ...prev,
            connections: { ...prev.connections, [targetUsername]: 'connected' }
        }));
    };

    const removeConnection = (targetUsername: string) => {
        setUserProfile(prev => {
            const newConnections = { ...prev.connections };
            delete newConnections[targetUsername];
            return {
                ...prev,
                connections: newConnections
            };
        });
    };

    const getConnectionDetails = () => {
        const connectedUsernames = Object.entries(userProfile.connections || {})
            .filter(([_, status]) => status === 'connected')
            .map(([username]) => username);

        // Return details from DB or generate a placeholder if not found
        return connectedUsernames.map(username => {
            const user = MOCK_USERS_DB.find(u => u.username === username);
            return user || {
                username,
                name: username, // Fallback
                email: 'hidden',
                image: `https://ui-avatars.com/api/?name=${username}&background=random`,
                role: 'User'
            };
        });
    };

    return (
        <UserProfileContext.Provider value={{
            userProfile,
            updatePreferences,
            updateIdentity,
            updateDocuments,
            updateAcademics,
            updateGuardian,
            sendConnectionRequest,
            acceptConnectionRequest,
            removeConnection,
            getConnectionDetails,
            setUserProfile
        }}>
            {children}
        </UserProfileContext.Provider>
    );
};
