import { University } from '../data/universities';

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
}

export const getCombinedUniversities = (): University[] => {
    const saved = localStorage.getItem('ea_universities');
    if (!saved) return [];

    const adminUnis: AdminUniversity[] = JSON.parse(saved);
    
    return adminUnis.map(uni => {
        const tuitionStr = uni.tuition || "$30k - $45k";
        const tuitionVal = parseInt(tuitionStr.replace(/[^0-9]/g, '')) * 1000 || 35000;
        
        // Map Admin structure to the central University interface
        return {
            id: 1000 + uni.id, // Offset to avoid ID collision
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
            admissionSteps: [],
            scholarships: [],
            testRequirements: [],
            deadlineFall: 'Varies',
            deadlineWinter: 'Varies',
            visaType: 'Student Visa',
            processingTime: 'Varies',
            loanInterestRate: 'N/A',
            image: uni.logo || "",
            acceptanceRate: uni.acceptanceRate || "85%",
            rankingQS: uni.ranking || "#100 QS",
            tags: [
                { icon: "trophy", text: `${uni.ranking || '#100 QS'}`, color: "text-primary" },
                { icon: "payments", text: `${tuitionStr} / year`, color: "text-gray-400" },
                { icon: "analytics", text: `${uni.acceptanceRate || '85%'} Acceptance`, color: "text-gray-400" }
            ]
        } as University;
    });
};
