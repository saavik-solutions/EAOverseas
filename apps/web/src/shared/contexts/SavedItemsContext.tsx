import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

<<<<<<< HEAD
export interface College {
    id?: string;
=======
interface College {
    id: string;
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
    name: string;
    [key: string]: any;
}

<<<<<<< HEAD
export interface Course {
    id?: string;
=======
interface Course {
    id: string;
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
    title: string;
    university: string;
    [key: string]: any;
}

<<<<<<< HEAD
export interface SavedPost {
    id?: string;
=======
interface SavedPost {
    id: string;
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
    title: string;
    [key: string]: any;
}

<<<<<<< HEAD
export interface Accommodation {
    id?: string;
=======
interface Accommodation {
    id: string;
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
    title: string;
    [key: string]: any;
}

<<<<<<< HEAD
export interface Application {
=======
interface Scholarship {
    id: string | number;
    title: string;
    [key: string]: any;
}

interface Application {
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
    id: number;
    university: string;
    location: string;
    course: string;
    intake: string;
    status: string;
    priority: string;
    flag?: string;
    logo?: string;
    [key: string]: any;
}

interface UserProfile {
    fullName: string;
    email: string;
    phone: string;
    dob: string;
    nationality: string;
    residence: string;
    education: {
        level: string;
        institution: string;
        major: string;
        gradDate: string;
        gpa: string;
    };
}

interface ProfileDocument {
    name: string;
    size: string;
    type: string;
<<<<<<< HEAD
=======
    base64?: string;
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
}

interface SavedItemsContextType {
    savedColleges: College[];
    savedCourses: Course[];
    toggleCollege: (college: College) => void;
    toggleCourse: (course: Course) => void;
    toggleAccommodation: (acc: Accommodation) => void;
    togglePost: (post: SavedPost) => void;
    isCollegeSaved: (college: College) => boolean;
    isCourseSaved: (course: Course) => boolean;
    isAccommodationSaved: (acc: Accommodation) => boolean;
    isPostSaved: (post: SavedPost) => boolean;
<<<<<<< HEAD
    savedAccommodations: Accommodation[];
    savedPosts: SavedPost[];
    myApplications: Application[];
    withdrawApplication: (id: number) => void;
    submitApplication: (appData: any) => void;
    userProfile: UserProfile;
    profileDocuments: ProfileDocument[];
=======
    isScholarshipSaved: (sch: Scholarship) => boolean;
    savedAccommodations: Accommodation[];
    savedPosts: SavedPost[];
    savedScholarships: Scholarship[];
    myApplications: Application[];
    withdrawApplication: (id: number) => void;
    submitApplication: (appData: any) => void;
    toggleScholarship: (sch: Scholarship) => void;
    userProfile: UserProfile | null;
    profileDocuments: ProfileDocument[];
    updateUserProfile: (profile: Partial<UserProfile>) => void;
    updateProfileDocuments: (docs: ProfileDocument[]) => void;
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
}

const SavedItemsContext = createContext<SavedItemsContextType | null>(null);

export const useSavedItems = () => {
    const context = useContext(SavedItemsContext);
    if (!context) {
        throw new Error('useSavedItems must be used within a SavedItemsProvider');
    }
    return context;
};

export const SavedItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();

    // State initialization
    const [savedColleges, setSavedColleges] = useState<College[]>([]);
    const [savedCourses, setSavedCourses] = useState<Course[]>([]);
    const [savedAccommodations, setSavedAccommodations] = useState<Accommodation[]>([]);
    const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);
<<<<<<< HEAD
=======
    const [savedScholarships, setSavedScholarships] = useState<Scholarship[]>([]);
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
    const [myApplications, setMyApplications] = useState<Application[]>([]);

    // Load data when user changes
    useEffect(() => {
        const loadUserData = () => {
            if (!user) {
                // Reset or load guest data
                setSavedColleges([]);
                setSavedCourses([]);
                setSavedAccommodations([]);
                setMyApplications([]);
                return;
            }

            const colleges = localStorage.getItem(`savedColleges_${user.email}`);
            setSavedColleges(colleges ? JSON.parse(colleges) : []);

            const courses = localStorage.getItem(`savedCourses_${user.email}`);
            setSavedCourses(courses ? JSON.parse(courses) : []);

            const accommodations = localStorage.getItem(`savedAccommodations_${user.email}`);
            setSavedAccommodations(accommodations ? JSON.parse(accommodations) : []);

            const posts = localStorage.getItem(`savedPosts_${user.email}`);
            setSavedPosts(posts ? JSON.parse(posts) : []);

<<<<<<< HEAD
=======
            const scholarships = localStorage.getItem(`savedScholarships_${user.email}`);
            setSavedScholarships(scholarships ? JSON.parse(scholarships) : []);

>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
            const applications = localStorage.getItem(`myApplications_${user.email}`);
            setMyApplications(applications ? JSON.parse(applications) : []);
        };

        loadUserData();
    }, [user?.email]);

    // Save data when state changes (only if we have a user)
    useEffect(() => {
        if (user?.email) {
            localStorage.setItem(`savedColleges_${user.email}`, JSON.stringify(savedColleges));
        }
    }, [savedColleges, user?.email]);

    useEffect(() => {
        if (user?.email) {
            localStorage.setItem(`savedCourses_${user.email}`, JSON.stringify(savedCourses));
        }
    }, [savedCourses, user?.email]);

    useEffect(() => {
        if (user?.email) {
            localStorage.setItem(`savedAccommodations_${user.email}`, JSON.stringify(savedAccommodations));
        }
    }, [savedAccommodations, user?.email]);

    useEffect(() => {
        if (user?.email) {
            localStorage.setItem(`savedPosts_${user.email}`, JSON.stringify(savedPosts));
        }
    }, [savedPosts, user?.email]);

    useEffect(() => {
        if (user?.email) {
<<<<<<< HEAD
=======
            localStorage.setItem(`savedScholarships_${user.email}`, JSON.stringify(savedScholarships));
        }
    }, [savedScholarships, user?.email]);

    useEffect(() => {
        if (user?.email) {
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
            localStorage.setItem(`myApplications_${user.email}`, JSON.stringify(myApplications));
        }
    }, [myApplications, user?.email]);

    // Helper to generate a consistent ID from college data if one doesn't exist
    const getCollegeId = (college: College) => {
        return college.id || college.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    };

    const getCourseId = (course: Course) => {
        return course.id || (course.title + course.university).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    const getAccommodationId = (acc: Accommodation) => {
        return acc.id || acc.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    const getPostId = (post: SavedPost) => {
        return post.id || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

<<<<<<< HEAD
=======
    const getScholarshipId = (sch: Scholarship) => {
        return String(sch.id) || sch.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
    const withdrawApplication = (id: number) => {
        setMyApplications(prev => prev.filter(app => app.id !== id));
    };

    const submitApplication = (appData: any) => {
        const newApp: Application = {
            id: Date.now(), // Generate a unique ID
            university: appData.universityName || "Unknown University",
            location: appData.location || "Unknown Location",
            course: appData.courseName || "Unknown Course",
            intake: appData.intake || "Fall 2024",
            status: "Submitted",
            priority: "High", // Default priority
            flag: appData.flag || "",
            logo: appData.logo || ""
        };
        setMyApplications(prev => [newApp, ...prev]);
    };


    const toggleCollege = (college: College) => {
        const id = getCollegeId(college);
        setSavedColleges(prev => {
            if (prev.find(c => getCollegeId(c) === id)) {
                return prev.filter(c => getCollegeId(c) !== id);
            } else {
                // Ensure the object has the ID for future reference
                return [...prev, { ...college, id }];
            }
        });
    };

    const toggleCourse = (course: Course) => {
        const id = getCourseId(course);
        setSavedCourses(prev => {
            if (prev.find(c => getCourseId(c) === id)) {
                return prev.filter(c => getCourseId(c) !== id);
            } else {
                return [...prev, { ...course, id }];
            }
        });
    };

    const toggleAccommodation = (acc: Accommodation) => {
        const id = getAccommodationId(acc);
        setSavedAccommodations(prev => {
            if (prev.find(a => getAccommodationId(a) === id)) {
                return prev.filter(a => getAccommodationId(a) !== id);
            } else {
                return [...prev, { ...acc, id }];
            }
        });
    };

    const togglePost = (post: SavedPost) => {
        const id = getPostId(post);
        setSavedPosts(prev => {
            if (prev.find(p => getPostId(p) === id)) {
                return prev.filter(p => getPostId(p) !== id);
            } else {
                return [...prev, { ...post, id }];
            }
        });
    };

<<<<<<< HEAD
=======
    const toggleScholarship = (sch: Scholarship) => {
        const id = getScholarshipId(sch);
        setSavedScholarships(prev => {
            if (prev.find(s => getScholarshipId(s) === id)) {
                return prev.filter(s => getScholarshipId(s) !== id);
            } else {
                return [...prev, { ...sch, id }];
            }
        });
    };

>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
    const isCollegeSaved = (college: College) => {
        const id = getCollegeId(college);
        return savedColleges.some(c => getCollegeId(c) === id);
    };

    const isCourseSaved = (course: Course) => {
        const id = getCourseId(course);
        return savedCourses.some(c => getCourseId(c) === id);
    };

    const isAccommodationSaved = (acc: Accommodation) => {
        const id = getAccommodationId(acc);
        return savedAccommodations.some(a => getAccommodationId(a) === id);
    };

    const isPostSaved = (post: SavedPost) => {
        const id = getPostId(post);
        return savedPosts.some(p => getPostId(p) === id);
    };
<<<<<<< HEAD


    // Mock User Profile Data
    const [userProfile] = useState<UserProfile>({
        fullName: "Alex Morgan",
        email: "alex.morgan@example.com",
        phone: "+1 (555) 123-4567",
        dob: "1999-08-12",
        nationality: "American",
        residence: "United States",
        education: {
            level: "Bachelor's Degree",
            institution: "University of California, Berkeley",
            major: "Computer Science",
            gradDate: "2021-05-30",
            gpa: "3.8"
        }
    });

    const [profileDocuments] = useState<ProfileDocument[]>([
        { name: 'Passport_Copy.pdf', size: '2.4 MB', type: 'passport' },
        { name: 'Photo.jpg', size: '1.2 MB', type: 'photo' },
        { name: 'BSc_Transcripts.pdf', size: '5.8 MB', type: 'transcripts' },
        { name: 'SOP_DataScience.pdf', size: '0.8 MB', type: 'sop' },
        { name: 'LOR_Professor_Smith.pdf', size: '1.5 MB', type: 'lor' }
    ]);
=======

    const isScholarshipSaved = (sch: Scholarship) => {
        const id = getScholarshipId(sch);
        return savedScholarships.some(s => getScholarshipId(s) === id);
    };


    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [profileDocuments, setProfileDocuments] = useState<ProfileDocument[]>([]);

    const updateUserProfile = (profile: Partial<UserProfile>) => {
        setUserProfile(prev => prev ? { ...prev, ...profile } : profile as UserProfile);
    };

    const updateProfileDocuments = (docs: ProfileDocument[]) => {
        setProfileDocuments(docs);
    };
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508

    return (
        <SavedItemsContext.Provider value={{
            savedColleges,
            savedCourses,
            toggleCollege,
            toggleCourse,
            toggleAccommodation,
            togglePost,
            isCollegeSaved,
            isCourseSaved,
            isAccommodationSaved,
            isPostSaved,
<<<<<<< HEAD
            savedAccommodations,
            savedPosts,
=======
            isScholarshipSaved,
            savedAccommodations,
            savedPosts,
            savedScholarships,
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
            myApplications,
            withdrawApplication,
            submitApplication,
            toggleScholarship,
            userProfile,
            profileDocuments,
            updateUserProfile,
            updateProfileDocuments
        }}>
            {children}
        </SavedItemsContext.Provider>
    );
};

