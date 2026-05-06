import { University, universitiesData as staticUniversities } from '../data/universities';

export interface AdminUniversity {
    id: number;
    name: string;
    country: string;
    city?: string;
    location?: string;
    ranking?: string;
    acceptanceRate?: string;
    tuition?: string;
    logo?: string;
    admissionChance?: string;
    status: string;
    courses: any;
    students: number;
    rating: number;
    about?: string;
    totalStudents?: string;
    intlStudents?: string;
    campusSize?: string;
    employability?: string;
}

export const getCombinedUniversities = (): University[] => {
    const saved = localStorage.getItem('ea_universities');
    let dynamicUnis: University[] = [];
    
    if (saved) {
        try {
            const adminUnis: AdminUniversity[] = JSON.parse(saved);
            dynamicUnis = adminUnis.map(uni => {
                const tuitionStr = uni.tuition || "$30k - $45k";
                const tuitionVal = parseInt(tuitionStr.split('-')[0].replace(/[^0-9]/g, '')) * 1000 || 35000;
                
                return {
                    id: 1000 + uni.id, 
                    name: uni.name,
                    country: uni.country,
                    city: uni.city || 'Campus',
                    type: 'Partner University',
                    globalRanking: parseInt(uni.ranking?.replace(/[^0-9]/g, '')) || 100,
                    coursesCount: uni.courses?.toString() || '0',
                    avgTuition: tuitionStr,
                    livingExpense: '$1,500',
                    intakes: 'Fall / Winter',
                    partTimeRights: '20 hrs/week',
                    overview: uni.about || 'Institutional overview pending...',
                    course: 'General Studies',
                    courseType: 'Undergraduate',
                    tuitionValue: tuitionVal,
                    livingCostValue: 15000,
                    intakeType: 'September',
                    budget: tuitionVal > 50000 ? 'Premium' : tuitionVal > 30000 ? 'Moderate' : 'Budget',
                    admissionSteps: [
                        { step: 1, title: 'Profile Evaluation', description: 'Review your academic profile against university standards.' },
                        { step: 2, title: 'Application Submission', description: 'Complete the official university application form.' },
                        { step: 3, title: 'Interview', description: 'Possible interview with the admission committee.' }
                    ],
                    scholarships: [],
                    testRequirements: [
                        { label: 'IELTS', value: '6.5+' },
                        { label: 'TOEFL', value: '90+' }
                    ],
                    deadlineFall: 'June 30',
                    deadlineWinter: 'Nov 15',
                    visaType: 'Student Visa',
                    processingTime: '4-8 Weeks',
                    loanInterestRate: 'N/A',
                    image: uni.logo || "",
                    acceptanceRate: uni.acceptanceRate || "85%",
                    rankingQS: uni.ranking || "#100 QS",
                    studentsCount: uni.totalStudents || uni.students?.toString() || "Updates Soon",
                    internationalStudents: uni.intlStudents || "Updates Soon",
                    campusSize: uni.campusSize || "Updates Soon",
                    employability: uni.employability || "Updates Soon",
                    tags: [
                        { icon: "trophy", text: `${uni.ranking || '#100 QS'}`, color: "text-primary" },
                        { icon: "payments", text: `${tuitionStr} / year`, color: "text-gray-400" },
                        { icon: "analytics", text: `${uni.acceptanceRate || '85%'} Acceptance`, color: "text-gray-400" }
                    ]
                } as University;
            });
        } catch (e) {
            console.error("Failed to parse dynamic universities", e);
        }
    }

    return [...staticUniversities, ...dynamicUnis];
};
