import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const SavedItemsContext = createContext();

export const useSavedItems = () => useContext(SavedItemsContext);

export const SavedItemsProvider = ({ children }) => {
    const { user } = useAuth();
    const userEmail = user?.email || 'guest';

    // State initialization
    const [savedColleges, setSavedColleges] = useState([]);
    const [savedCourses, setSavedCourses] = useState([]);
    const [savedAccommodations, setSavedAccommodations] = useState([]);
    const [myApplications, setMyApplications] = useState([]);

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
            localStorage.setItem(`myApplications_${user.email}`, JSON.stringify(myApplications));
        }
    }, [myApplications, user?.email]);

    // Helper to generate a consistent ID from college data if one doesn't exist
    const getCollegeId = (college) => {
        return college.id || college.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    };

    const getCourseId = (course) => {
        return course.id || (course.title + course.university).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    const getAccommodationId = (acc) => {
        return acc.id || acc.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    const withdrawApplication = (id) => {
        setMyApplications(prev => prev.filter(app => app.id !== id));
    };

    const submitApplication = (appData) => {
        const newApp = {
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


    const toggleCollege = (college) => {
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

    const toggleCourse = (course) => {
        const id = getCourseId(course);
        setSavedCourses(prev => {
            if (prev.find(c => getCourseId(c) === id)) {
                return prev.filter(c => getCourseId(c) !== id);
            } else {
                return [...prev, { ...course, id }];
            }
        });
    };

    const toggleAccommodation = (acc) => {
        const id = getAccommodationId(acc);
        setSavedAccommodations(prev => {
            if (prev.find(a => getAccommodationId(a) === id)) {
                return prev.filter(a => getAccommodationId(a) !== id);
            } else {
                return [...prev, { ...acc, id }];
            }
        });
    };

    const isCollegeSaved = (college) => {
        const id = getCollegeId(college);
        return savedColleges.some(c => getCollegeId(c) === id);
    };

    const isCourseSaved = (course) => {
        const id = getCourseId(course);
        return savedCourses.some(c => getCourseId(c) === id);
    };

    const isAccommodationSaved = (acc) => {
        const id = getAccommodationId(acc);
        return savedAccommodations.some(a => getAccommodationId(a) === id);
    };


    // Mock User Profile Data
    const [userProfile] = useState({
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

    const [profileDocuments] = useState([
        { name: 'Passport_Copy.pdf', size: '2.4 MB', type: 'passport' },
        { name: 'Photo.jpg', size: '1.2 MB', type: 'photo' },
        { name: 'BSc_Transcripts.pdf', size: '5.8 MB', type: 'transcripts' },
        { name: 'SOP_DataScience.pdf', size: '0.8 MB', type: 'sop' },
        { name: 'LOR_Professor_Smith.pdf', size: '1.5 MB', type: 'lor' }
    ]);

    return (
        <SavedItemsContext.Provider value={{
            savedColleges,
            savedCourses,
            toggleCollege,
            toggleCourse,
            toggleAccommodation,
            isCollegeSaved,
            isCourseSaved,
            isAccommodationSaved,
            savedAccommodations,
            myApplications,
            withdrawApplication,
            submitApplication,
            userProfile,
            profileDocuments
        }}>
            {children}
        </SavedItemsContext.Provider>
    );
};
