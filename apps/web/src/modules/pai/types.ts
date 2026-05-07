export interface UnifiedStudentProfile {
    personal: {
        name: string;
        location: string;
        nationality: string;
        languages: string[];
    };
    academic: Array<{
        degree: string;
        major: string;
        university: string;
        gpa: number;
        graduationYear: number;
    }>;
    testScores: {
        ielts?: number;
        toefl?: number;
        gre?: number;
        gmat?: number;
    };
    experience: Array<{
        role: string;
        company: string;
        duration: string;
        isInternship: boolean;
    }>;
    skills: string[];
    careerGoals: {
        targetCountry: string;
        targetIndustry: string;
        preferredRole: string;
    };
}
