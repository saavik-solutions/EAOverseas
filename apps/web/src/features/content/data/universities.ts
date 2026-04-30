export interface Scholarship {
    title: string;
    amount: string;
    deadline: string;
    description: string;
    type: 'Fully Funded' | 'Partial' | 'Merit-based';
}

export interface AdmissionStep {
    step: number;
    title: string;
    description: string;
}

export interface University {
    id: number;
    name: string;
    country: string;
    city: string;
    type: string;
    globalRanking: number;
    coursesCount: string;
    avgTuition: string; // Dynamic tuition string like "$45k"
    livingExpense: string;
    intakes: string;
    partTimeRights: string;
    overview: string;
    course: string;
    courseType: string;
    tuitionValue: number; // Numeric for filtering
    livingCostValue: number;
    intakeType: string;
    budget: 'Premium' | 'Moderate' | 'Budget';
    admissionSteps: AdmissionStep[];
    scholarships: Scholarship[];
    testRequirements: {
        label: string;
        value: string;
    }[];
    deadlineFall: string;
    deadlineWinter: string;
    visaType: string;
    processingTime: string;
    loanInterestRate: string;
}

export const universitiesData: University[] = [
    {
        id: 1,
        name: 'Oxford University',
        country: 'UK',
        city: 'Oxford',
        type: 'Collegiate Research',
        globalRanking: 1,
        coursesCount: '250+',
        avgTuition: '£30,000',
        livingExpense: '£1,200',
        intakes: 'Michaelmas / Hilary / Trinity',
        partTimeRights: '20 hrs/week',
        overview: 'The University of Oxford is a collegiate research university in Oxford, England. There is evidence of teaching as early as 1096, making it the oldest university in the English-speaking world.',
        course: 'Computer Science',
        courseType: 'Postgraduate',
        tuitionValue: 45000,
        livingCostValue: 15000,
        intakeType: 'September',
        budget: 'Premium',
        admissionSteps: [
            { step: 1, title: 'UCAS Application', description: 'Submit your application through UCAS by October 15.' },
            { step: 2, title: 'Admission Tests', description: 'Most courses require a subject-specific test.' },
            { step: 3, title: 'Written Work', description: 'Submit samples of your academic writing.' },
            { step: 4, title: 'Interviews', description: 'Shortlisted candidates are invited for interviews in December.' },
            { step: 5, title: 'Decision', description: 'Final decisions are sent out in mid-January.' }
        ],
        scholarships: [
            { title: 'Clarendon Fund', amount: 'Full Tuition + Stipend', deadline: 'Jan 10', description: 'Major graduate scholarship scheme at the University of Oxford.', type: 'Fully Funded' },
            { title: 'Rhodes Scholarship', amount: 'Full Funding', deadline: 'Oct 1', description: 'The oldest and perhaps most prestigious international scholarship.', type: 'Fully Funded' }
        ],
        testRequirements: [
            { label: 'IELTS Academic', value: '7.5 (min 7.0 in all bands)' },
            { label: 'TOEFL iBT', value: '110 (22+ L, 24+ R, 25+ W, 25+ S)' },
            { label: 'Minimum GPA', value: 'First-class Honours degree' }
        ],
        deadlineFall: 'Oct 15',
        deadlineWinter: 'No Winter Intake',
        visaType: 'Student Visa (Tier 4)',
        processingTime: '3-8 Weeks',
        loanInterestRate: '6.5% - 8.5%'
    },
    {
        id: 2,
        name: 'Stanford University',
        country: 'USA',
        city: 'Stanford, California',
        type: 'Private Research',
        globalRanking: 2,
        coursesCount: '200+',
        avgTuition: '$55,000',
        livingExpense: '$2,000',
        intakes: 'Fall / Winter / Spring / Summer',
        partTimeRights: '20 hrs/week (On-campus)',
        overview: 'Stanford University is one of the world\'s leading teaching and research institutions, located in the heart of Silicon Valley.',
        course: 'Data Science',
        courseType: 'Postgraduate',
        tuitionValue: 55000,
        livingCostValue: 20000,
        intakeType: 'September',
        budget: 'Premium',
        admissionSteps: [
            { step: 1, title: 'Application Submission', description: 'Submit the Stanford Graduate Application.' },
            { step: 2, title: 'Standardized Tests', description: 'GRE scores are required for most programs.' },
            { step: 3, title: 'LORs & SOP', description: 'Submit 3 letters of recommendation and a statement of purpose.' },
            { step: 4, title: 'Departmental Review', description: 'Faculty committees review applications.' },
            { step: 5, title: 'Offer Letter', description: 'Admission decisions are released in early Spring.' }
        ],
        scholarships: [
            { title: 'Knight-Hennessy Scholars', amount: 'Full Funding', deadline: 'Oct 12', description: 'The largest fully endowed graduate fellowship in the world.', type: 'Fully Funded' },
            { title: 'Stanford Graduate Fellowship', amount: 'Stipend + Tuition', deadline: 'Varies', description: 'Supporting doctoral students in the sciences and engineering.', type: 'Fully Funded' }
        ],
        testRequirements: [
            { label: 'IELTS Academic', value: '7.0 (Not preferred, check dept)' },
            { label: 'TOEFL iBT', value: '100+' },
            { label: 'Minimum GPA', value: '3.8/4.0 Scale' }
        ],
        deadlineFall: 'Dec 15',
        deadlineWinter: 'Varies',
        visaType: 'F-1 Student Visa',
        processingTime: '2-4 Months',
        loanInterestRate: '7.5% - 9.5%'
    },
    {
        id: 3,
        name: 'University of Toronto',
        country: 'Canada',
        city: 'Toronto',
        type: 'Public Research',
        globalRanking: 21,
        coursesCount: '100+',
        avgTuition: '$45,000',
        livingExpense: '$1,500',
        intakes: 'Fall / Winter / Summer',
        partTimeRights: '20 hrs/week',
        overview: 'A global leader in research and teaching, the University of Toronto offers a wide range of academic programs in a vibrant city.',
        course: 'Engineering',
        courseType: 'Undergraduate',
        tuitionValue: 35000,
        livingCostValue: 12000,
        intakeType: 'Fall',
        budget: 'Moderate',
        admissionSteps: [
            { step: 1, title: 'Shortlisting', description: 'Review your profile against course requirements.' },
            { step: 2, title: 'Application', description: 'Apply via the university portal.' },
            { step: 3, title: 'Document Verification', description: 'Verification of transcripts and language scores.' },
            { step: 4, title: 'Offer Letter', description: 'Receive your conditional or unconditional offer.' },
            { step: 5, title: 'Enrollment', description: 'Secure your seat by paying the tuition deposit.' }
        ],
        scholarships: [
            { title: 'Lester B. Pearson', amount: 'Fully Funded', deadline: 'Jan 15', description: 'Prestige award for exceptional achievement.', type: 'Fully Funded' },
            { title: 'International Scholar Award', amount: 'Partial', deadline: 'Feb 1', description: 'Merit-based entrance award.', type: 'Partial' }
        ],
        testRequirements: [
            { label: 'IELTS Academic', value: '6.5 (min 6.0 in all bands)' },
            { label: 'TOEFL iBT', value: '90 (min 22 in Writing)' },
            { label: 'Minimum GPA', value: '85% or 3.7/4.0 scale' }
        ],
        deadlineFall: 'Jan 15',
        deadlineWinter: 'Sept 30',
        visaType: 'Student Visa (Study Permit)',
        processingTime: '3-4 Months',
        loanInterestRate: '9.5% - 11.5%'
    },
    {
        id: 4,
        name: 'Technical University of Munich',
        country: 'Germany',
        city: 'Munich',
        type: 'Technical University',
        globalRanking: 50,
        coursesCount: '170+',
        avgTuition: 'FREE',
        livingExpense: '$1,000',
        intakes: 'Winter / Summer',
        partTimeRights: '120 Full Days/year',
        overview: 'TUM is one of Europe\'s top universities. It is dedicated to the study of science and technology, and the education of researchers.',
        course: 'AI & Robotics',
        courseType: 'Postgraduate',
        tuitionValue: 0,
        livingCostValue: 10000,
        intakeType: 'Winter',
        budget: 'Budget',
        admissionSteps: [
            { step: 1, title: 'Online Application', description: 'Submit via TUMonline portal.' },
            { step: 2, title: 'Aptitude Assessment', description: 'Multi-stage process including score calculation.' },
            { step: 3, title: 'Interview', description: 'Possible interview for specific programs.' },
            { step: 4, title: 'Admission Notice', description: 'Letter of admission sent via portal.' },
            { step: 5, title: 'Enrollment', description: 'Submitting physical documents for enrollment.' }
        ],
        scholarships: [
            { title: 'DAAD Scholarship', amount: 'Monthly Stipend', deadline: 'Varies', description: 'Major funding organization for international students in Germany.', type: 'Fully Funded' },
            { title: 'Deutschlandstipendium', amount: '€300 / Month', deadline: 'July', description: 'Support for high-achieving students from all over the world.', type: 'Merit-based' }
        ],
        testRequirements: [
            { label: 'IELTS Academic', value: '6.5+' },
            { label: 'TOEFL iBT', value: '88+' },
            { label: 'VPD (uni-assist)', value: 'Required for International Students' }
        ],
        deadlineFall: 'May 31 (Winter)',
        deadlineWinter: 'Jan 15 (Summer)',
        visaType: 'National Visa (Type D)',
        processingTime: '4-12 Weeks',
        loanInterestRate: '3.5% - 5.5%'
    },
    {
        id: 5,
        name: 'National University of Singapore',
        country: 'Singapore',
        city: 'Singapore',
        type: 'Public Research',
        globalRanking: 11,
        coursesCount: '150+',
        avgTuition: '$40,000',
        livingExpense: '$1,500',
        intakes: 'August / January',
        partTimeRights: '16 hrs/week',
        overview: 'National University of Singapore is the flagship tertiary institution of Singapore, which offers a global approach to education and research.',
        course: 'Business Management',
        courseType: 'Undergraduate',
        tuitionValue: 40000,
        livingCostValue: 15000,
        intakeType: 'August',
        budget: 'Premium',
        admissionSteps: [
            { step: 1, title: 'Submit Application', description: 'Online application with academic history.' },
            { step: 2, title: 'Supporting Documents', description: 'Upload transcripts and personal statements.' },
            { step: 3, title: 'Selection Tests', description: 'For specific competitive courses.' },
            { step: 4, title: 'Application Outcome', description: 'Results released via online portal.' },
            { step: 5, title: 'Matrix & Registration', description: 'Registration for selected modules.' }
        ],
        scholarships: [
            { title: 'ASEAN Undergrad', amount: 'Full Tuition + Allowance', deadline: 'Varies', description: 'For high-achieving students from ASEAN countries.', type: 'Fully Funded' },
            { title: 'Science & Tech Scholarship', amount: 'Full Funding', deadline: 'Jan', description: 'For Asian students in science and engineering.', type: 'Fully Funded' }
        ],
        testRequirements: [
            { label: 'IELTS Academic', value: '6.5' },
            { label: 'SAT/ACT', value: 'Required for some applicants' },
            { label: 'Minimum GPA', value: 'Excellent Academic Records' }
        ],
        deadlineFall: 'Mar 19 (Aug Intake)',
        deadlineWinter: 'July 15 (Jan Intake)',
        visaType: 'Student Pass',
        processingTime: '2-4 Weeks',
        loanInterestRate: '4.5% - 6.5%'
    },
    {
        id: 6,
        name: 'University of Melbourne',
        country: 'Australia',
        city: 'Melbourne',
        type: 'Public Research',
        globalRanking: 33,
        coursesCount: '300+',
        avgTuition: '$32,000',
        livingExpense: '$1,400',
        intakes: 'February / July',
        partTimeRights: '48 hrs/fortnight',
        overview: 'The University of Melbourne is a public research university in Melbourne, Australia. Founded in 1853, it is Australia\'s second oldest university.',
        course: 'Commerce',
        courseType: 'Postgraduate',
        tuitionValue: 32000,
        livingCostValue: 14000,
        intakeType: 'February',
        budget: 'Moderate',
        admissionSteps: [
            { step: 1, title: 'Course Selection', description: 'Select your preferred course and check entry requirements.' },
            { step: 2, title: 'Apply Online', description: 'Submit application via the university portal or agent.' },
            { step: 3, title: 'GTE Assessment', description: 'Genuine Temporary Entrant assessment for visa purposes.' },
            { step: 4, title: 'Accept Offer', description: 'Sign the offer letter and pay the initial deposit.' },
            { step: 5, title: 'CoE Issuance', description: 'Receive your Confirmation of Enrolment (CoE).' }
        ],
        scholarships: [
            { title: 'Melbourne Graduate Scholarship', amount: 'Partial Fee Waiver', deadline: 'Auto-considered', description: 'Merit-based scholarship for high-achieving students.', type: 'Partial' },
            { title: 'Global Graduate Grant', amount: '$5,000', deadline: 'Varies', description: 'One-off grant for international students.', type: 'Partial' }
        ],
        testRequirements: [
            { label: 'IELTS Academic', value: '7.0 (min 6.5 in all bands)' },
            { label: 'TOEFL iBT', value: '94 (W: 27, S: 23, R: 13, L: 13)' },
            { label: 'Minimum GPA', value: '70% in previous studies' }
        ],
        deadlineFall: 'Oct 31 (Feb Intake)',
        deadlineWinter: 'May 31 (July Intake)',
        visaType: 'Student Visa (Subclass 500)',
        processingTime: '4-8 Weeks',
        loanInterestRate: '8.5% - 10.5%'
    },
    {
        id: 7,
        name: 'ETH Zurich',
        country: 'Switzerland',
        city: 'Zurich',
        type: 'Public Research',
        globalRanking: 9,
        coursesCount: '50+',
        avgTuition: 'CHF 1,500',
        livingExpense: 'CHF 2,000',
        intakes: 'Autumn',
        partTimeRights: '15 hrs/week',
        overview: 'ETH Zurich is a public research university in the city of Zürich, Switzerland. It focuses primarily on science, technology, engineering, and mathematics.',
        course: 'Architecture',
        courseType: 'Postgraduate',
        tuitionValue: 1500,
        livingCostValue: 22000,
        intakeType: 'September',
        budget: 'Budget',
        admissionSteps: [
            { step: 1, title: 'Check Prerequisites', description: 'Ensure your previous degree is recognized.' },
            { step: 2, title: 'Online Portal', description: 'Create an account and fill the application form.' },
            { step: 3, title: 'Document Upload', description: 'Upload CV, transcripts, and portfolios.' },
            { step: 4, title: 'Application Review', description: 'Review by the departmental admission committee.' },
            { step: 5, title: 'Matriculation', description: 'Confirm enrollment and pay the semester fees.' }
        ],
        scholarships: [
            { title: 'Excellence Scholarship (ESOP)', amount: 'Full Tuition + Stipind', deadline: 'Dec 15', description: 'Supports students with a full scholarship and matriculation fee waiver.', type: 'Fully Funded' },
            { title: 'Master Scholarship', amount: 'Partial', deadline: 'Dec 15', description: 'Stipend and fee waiver for outstanding students.', type: 'Partial' }
        ],
        testRequirements: [
            { label: 'IELTS Academic', value: '7.0' },
            { label: 'TOEFL iBT', value: '100' },
            { label: 'GRE', value: 'Recommended for Engineering' }
        ],
        deadlineFall: 'Dec 15',
        deadlineWinter: 'No Winter Intake',
        visaType: 'National Visa D',
        processingTime: '8-12 Weeks',
        loanInterestRate: '4.5% - 6.5%'
    },
    {
        id: 8,
        name: 'Imperial College London',
        country: 'UK',
        city: 'London',
        type: 'Public Research',
        globalRanking: 6,
        coursesCount: '150+',
        avgTuition: '£35,000',
        livingExpense: '£1,500',
        intakes: 'Autumn',
        partTimeRights: '20 hrs/week',
        overview: 'Imperial College London is a world-class university with a mission to benefit society through excellence in science, engineering, medicine, and business.',
        course: 'Medicine',
        courseType: 'Postgraduate',
        tuitionValue: 48000,
        livingCostValue: 16000,
        intakeType: 'October',
        budget: 'Premium',
        admissionSteps: [
            { step: 1, title: 'Find a Course', description: 'Research programs and specific entry requirements.' },
            { step: 2, title: 'Online Application', description: 'Apply directly through the Imperial portal.' },
            { step: 3, title: 'Interviews', description: 'MNC and MMIs for medical and science programs.' },
            { step: 4, title: 'Conditions', description: 'Meet all academic and English language conditions.' },
            { step: 5, title: 'CAS Issuance', description: 'Receive your Confirmation of Acceptance for Studies.' }
        ],
        scholarships: [
            { title: 'Imperial Open Day', amount: 'Partial', deadline: 'Varies', description: 'Scholarships for students attending open days.', type: 'Partial' },
            { title: 'President\'s Scholar', amount: 'Full Tuition', deadline: 'Jan', description: 'Most prestigious award for undergraduate and postgrad students.', type: 'Fully Funded' }
        ],
        testRequirements: [
            { label: 'IELTS Academic', value: '7.0 (min 6.5 in all bands)' },
            { label: 'TOEFL iBT', value: '100 (min 22 in all elements)' },
            { label: 'BMAT', value: 'Required for Medicine' }
        ],
        deadlineFall: 'Jan 15',
        deadlineWinter: 'No Winter Intake',
        visaType: 'Student Visa (Tier 4)',
        processingTime: '3-8 Weeks',
        loanInterestRate: '7.0% - 9.0%'
    },
    {
        id: 9,
        name: 'Tsinghua University',
        country: 'China',
        city: 'Beijing',
        type: 'Public Research',
        globalRanking: 12,
        coursesCount: '100+',
        avgTuition: 'CNY 30,000',
        livingExpense: 'CNY 4,000',
        intakes: 'September',
        partTimeRights: 'Limited (Internships only)',
        overview: 'Tsinghua University is a major research university in Beijing and a member of the C9 League of Chinese universities.',
        course: 'Civil Engineering',
        courseType: 'Undergraduate',
        tuitionValue: 5000,
        livingCostValue: 8000,
        intakeType: 'September',
        budget: 'Budget',
        admissionSteps: [
            { step: 1, title: 'Application Portal', description: 'Complete the Tsinghua international student application.' },
            { step: 2, title: 'HSK Test', description: 'Chinese proficiency test (usually HSK 5 or 6).' },
            { step: 3, title: 'Written Exam', description: 'Tsinghua specific entrance exam for some majors.' },
            { step: 4, title: 'Interview', description: 'Video or in-person interview for finalists.' },
            { step: 5, title: 'Visa Form (JW202)', description: 'Receive your official university documents for visa.' }
        ],
        scholarships: [
            { title: 'CGS Scholarship', amount: 'Full Funding', deadline: 'April', description: 'Chinese Government Scholarship for international students.', type: 'Fully Funded' },
            { title: 'Beijing Govt Scholarship', amount: 'Partial', deadline: 'May', description: 'Tuition support for outstanding students in Beijing.', type: 'Partial' }
        ],
        testRequirements: [
            { label: 'HSK (Chinese)', value: 'Level 5 (min 210) or Level 6' },
            { label: 'IELTS Academic', value: '6.5 (for English-taught programs)' },
            { label: 'Minimum GPA', value: 'Top 10% of high school batch' }
        ],
        deadlineFall: 'Mar 31',
        deadlineWinter: 'No Winter Intake',
        visaType: 'X1 (Long term) or X2 Visa',
        processingTime: '2-4 Weeks',
        loanInterestRate: '5.0% - 7.0%'
    },
    {
        id: 10,
        name: 'McGill University',
        country: 'Canada',
        city: 'Montreal',
        type: 'Public Research',
        globalRanking: 30,
        coursesCount: '300+',
        avgTuition: '$28,000',
        livingExpense: '$1,300',
        intakes: 'Fall / Winter',
        partTimeRights: '20 hrs/week',
        overview: 'McGill University is a public research university in Montreal, Quebec, Canada. It is one of Canada\'s most prestigious institutions.',
        course: 'Law',
        courseType: 'Postgraduate',
        tuitionValue: 28000,
        livingCostValue: 11000,
        intakeType: 'Fall',
        budget: 'Moderate',
        admissionSteps: [
            { step: 1, title: 'Check Deadlines', description: 'McGill has very strict and early deadlines.' },
            { step: 2, title: 'Submission', description: 'Submit the McGill Online Application.' },
            { step: 3, title: 'Loris / Minerva', description: 'Upload all letters and documents via Minerva portal.' },
            { step: 4, title: 'Selection', description: 'Wait for the official decision letter.' },
            { step: 5, title: 'CAQ Application', description: 'Apply for the Quebec Acceptance Certificate (CAQ).' }
        ],
        scholarships: [
            { title: 'Entrance Bursary', amount: 'Varies', deadline: 'June 30', description: 'Based on financial need and academic standing.', type: 'Partial' },
            { title: 'McCall MacBain', amount: 'Full Funding', deadline: 'Aug 24', description: 'The McCall MacBain Scholarships for future leaders.', type: 'Fully Funded' }
        ],
        testRequirements: [
            { label: 'IELTS Academic', value: '6.5 (no component under 6.0)' },
            { label: 'TOEFL iBT', value: '86 (no component under 20)' },
            { label: 'LSAT', value: 'Required for Law' }
        ],
        deadlineFall: 'Jan 15',
        deadlineWinter: 'Sept 1',
        visaType: 'Study Permit + CAQ',
        processingTime: '3-5 Months',
        loanInterestRate: '9.0% - 11.0%'
    }
];
