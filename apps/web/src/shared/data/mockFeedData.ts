export const postsData = {
    'daad': {
        id: 'daad',
        label: 'Scholarship',
        labelColor: 'text-blue-700 border-blue-100 bg-blue-50',
        banner: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=2000&auto=format&fit=crop',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_Rmzt3binRkT7Z5nyfJoMYpxPN7cjfZnI3TLgP9IEOI7GytkZN5_7PxkPtG8Ulri18LdtuglOl6jntqjo-rlYw5XdnQcrm6Atna9muAezaoNcrk29F1l2oWira77-SQk48EjeQuyiF_Z1VQqfjXbSNu06d-m2-U4zITnlOSeAYIrRkTn-FAmNA0oDQ9QxpPYevooTrqgK18TnGny5j0HyvHWN9ZLUyoO338wGttL2bARVFxLHsIIyWS29CNIs2Fejyz6Fo24WBrnK',
        title: 'Fully Funded Master’s Scholarship – All Fields 2025',
        institution: 'DAAD - German Academic Exchange',
        location: 'Berlin, Germany',
        verified: true,
        tags: ['#FullyFunded', '#Masters', '#NoTuition'],
        applyLink: '/application',
        grid: [
            { label: 'Deadline', value: 'Jan 02, 2026', alert: true },
            { label: 'Duration', value: '12 - 24 Months' },
            { label: 'Start Date', value: 'Sep 2025' },
            { label: 'Funding', value: 'Full + Stipend', color: 'text-green-600' }
        ],
        about: '<p>The DAAD scholarship offers full financial support including a monthly stipend of €934, health insurance, and travel allowance for international students pursuing postgraduate studies at state-recognized German universities.</p>'
    },
    'stanford': {
        id: 'stanford',
        label: 'Admission Open',
        labelColor: 'text-green-700 border-green-100 bg-green-50',
        banner: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Siegel_Stanford_University.svg/1200px-Siegel_Stanford_University.svg.png',
        title: 'Fall 2025 Graduate Admissions - School of Engineering',
        institution: 'Stanford University',
        location: 'Stanford, CA, USA',
        verified: true,
        tags: ['#STEM', '#USA', '#Fall2025'],
        applyLink: '/colleges',
        grid: [
            { label: 'Applications Open', value: 'Sep 01, 2024' },
            { label: 'Deadline', value: 'Dec 03, 2024' },
            { label: 'Term Starts', value: 'Sep 2025' },
            { label: 'GRE', value: 'Optional', color: 'text-green-600' }
        ],
        about: '<p>Stanford University School of Engineering is accepting applications for MS and PhD programs for the Fall 2025 intake. The school is known for its entrepreneurial spirit and cutting-edge research facilities.</p>'
    },
    'uk_psw': {
        id: 'uk_psw',
        label: 'Policy Update',
        labelColor: 'text-purple-700 border-purple-100 bg-purple-50',
        banner: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2000&auto=format&fit=crop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Royal_Coat_of_Arms_of_the_United_Kingdom.svg/1200px-Royal_Coat_of_Arms_of_the_United_Kingdom.svg.png',
        title: 'Important Update on Graduate Route Visa (PSW)',
        institution: 'Home Office UK',
        location: 'London, UK',
        verified: true,
        tags: ['#VisaUpdate', '#WorkInUK', '#PSW'],
        applyLink: '#',
        grid: [
            { label: 'Effective Date', value: 'Immediate' },
            { label: 'Duration', value: '2 Years' },
            { label: 'Sponsorship', value: 'Not Required', color: 'text-green-600' },
            { label: 'Status', value: 'Confirmed', color: 'text-green-600' }
        ],
        about: '<p>The UK government has recently completed its review of the Graduate Route visa and has confirmed that it will remain in place. This visa allows international students who have successfully completed an eligible course in the UK to stay and work for two years.</p>'
    },
    'harvard_mba': {
        id: 'harvard_mba',
        label: 'Admission Open',
        labelColor: 'text-green-700 border-green-100 bg-green-50',
        banner: 'https://images.unsplash.com/photo-1559136555-9303d0631e89?q=80&w=2000&auto=format&fit=crop',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1200px-Harvard_shield_wreath.svg.png',
        title: 'MBA Class of 2027 Application Cycle',
        institution: 'Harvard Business School',
        location: 'Boston, MA, USA',
        verified: true,
        tags: ['#MBA', '#Business', '#Leadership'],
        applyLink: '/colleges',
        grid: [
            { label: 'Round 1 Deadline', value: 'Sep 04, 2024', alert: true },
            { label: 'Round 2 Deadline', value: 'Jan 03, 2025' },
            { label: 'GMAT/GRE', value: 'Required' },
            { label: 'Experience', value: 'Avg 4-5 Years' }
        ],
        about: '<p>Harvard Business School is looking for candidates with varied backgrounds and experiences. The case method curriculum challenges students to think on their feet and make difficult decisions under pressure.</p>'
    },
    'chevening': {
        id: 'chevening',
        label: 'Scholarship',
        labelColor: 'text-blue-700 border-blue-100 bg-blue-50',
        banner: 'https://images.unsplash.com/photo-1526304640573-d295e381ebd5?q=80&w=2000&auto=format&fit=crop',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Chevening_Scholarship_Logo.jpg/220px-Chevening_Scholarship_Logo.jpg',
        title: 'Chevening Scholarships 2025/26',
        institution: 'UK Foreign, Commonwealth and Development Office',
        location: 'United Kingdom',
        verified: true,
        tags: ['#FullyFunded', '#Leadership', '#UK'],
        applyLink: '/application',
        grid: [
            { label: 'Applications Close', value: 'Nov 05, 2024', alert: true },
            { label: 'Coverage', value: 'Full Tuition + Living' },
            { label: 'Course', value: 'One-year Master\'s' },
            { label: 'Network', value: '50k+ Alumni' }
        ],
        about: '<p>Chevening is the UK government’s international awards programme aimed at developing global leaders. Funded by the Foreign, Commonwealth and Development Office (FCDO) and partner organisations, Chevening offers a unique opportunity for future leaders to study in the UK.</p>'
    },
    'canada_housing': {
        id: 'canada_housing',
        label: 'Accomodation',
        labelColor: 'text-orange-700 border-orange-100 bg-orange-50',
        banner: 'https://images.unsplash.com/photo-1560448204-e897c00547f8?q=80&w=2000&auto=format&fit=crop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1200px-Flag_of_Canada_%28Pantone%29.svg.png',
        title: 'New Student Housing Guidelines for Fall 2025',
        institution: 'Government of Canada',
        location: 'Canada',
        verified: true,
        tags: ['#Housing', '#Canada', '#StudentLife'],
        applyLink: '#',
        grid: [
            { label: 'Cap Effect', value: 'Housing Guaranteed' },
            { label: 'Region', value: 'Ontario & BC' },
            { label: 'Cost', value: 'Subsidized Options' },
            { label: 'Update', value: 'Major City Focus' }
        ],
        about: '<p>In response to the recent cap on study permits, major provinces have announced new guarantees for on-campus housing for first-year international students to ensure safe and affordable living conditions.</p>'
    },
    'mit_data': {
        id: 'mit_data',
        label: 'Admission Open',
        labelColor: 'text-green-700 border-green-100 bg-green-50',
        banner: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=2000&auto=format&fit=crop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1200px-MIT_logo.svg.png',
        title: 'Master of Business Analytics (MBAn) - 2025',
        institution: 'MIT Sloan',
        location: 'Cambridge, MA, USA',
        verified: true,
        tags: ['#Analytics', '#DataScience', '#STEM'],
        applyLink: '/colleges',
        grid: [
            { label: 'Deadline', value: 'Jan 08, 2025', alert: true },
            { label: 'Duration', value: '12 Months' },
            { label: 'Placement', value: '100% Rate' },
            { label: 'Avg Salary', value: '$130k+' }
        ],
        about: '<p>The 12-month specialized Master of Business Analytics program is tailored for current students or recent college graduates who plan to pursue a career in the data science industry, as well as those seeking a career change or career advancement.</p>'
    },
    'fulbright': {
        id: 'fulbright',
        label: 'Scholarship',
        labelColor: 'text-blue-700 border-blue-100 bg-blue-50',
        banner: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Fulbright_Program_logo.svg/1200px-Fulbright_Program_logo.svg.png',
        title: 'Fulbright Foreign Student Program',
        institution: 'US Department of State',
        location: 'All US Universities',
        verified: true,
        tags: ['#USA', '#Prestigious', '#Research'],
        applyLink: '/application',
        grid: [
            { label: 'Applications', value: 'Varies by Country' },
            { label: 'Funding', value: 'Full Funding' },
            { label: 'Level', value: 'Masters / PhD' },
            { label: 'J1 Visa', value: 'Required' }
        ],
        about: '<p>The Fulbright Foreign Student Program enables graduate students, young professionals and artists from abroad to study and conduct research in the United States. The Fulbright Foreign Student Program operates in more than 160 countries.</p>'
    },
    'aus_parttime': {
        id: 'aus_parttime',
        label: 'Visas',
        labelColor: 'text-purple-700 border-purple-100 bg-purple-50',
        banner: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2000&auto=format&fit=crop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Coat_of_arms_of_Australia.svg/1200px-Coat_of_arms_of_Australia.svg.png',
        title: 'Work Hour Limits for Student Visa Holders',
        institution: 'Australian Dept of Home Affairs',
        location: 'Australia',
        verified: true,
        tags: ['#WorkRights', '#Australia', '#Policy'],
        applyLink: '#',
        grid: [
            { label: 'Limit', value: '48 hrs/fortnight' },
            { label: 'During Break', value: 'Unlimited' },
            { label: 'Masters Research', value: 'Unlimited' },
            { label: 'PhD', value: 'Unlimited' }
        ],
        about: '<p>From 1 July 2023, work restrictions for student visa holders were reintroduced and capped at 48 hours per fortnight. This ensures that student visa holders are able to focus on obtaining a quality Australian education and qualification.</p>'
    },
    'career_cv': {
        id: 'career_cv',
        label: 'Career Advice',
        labelColor: 'text-teal-700 border-teal-100 bg-teal-50',
        banner: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2000&auto=format&fit=crop',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTTkOWBBs14BDjyomcFOZrSqTFNsIKq1hGK41JYb45t_iVLVGNb_T9TdqRb1Y6SagUz_gZhagIczn35zHA-noKYcYq6DUANRbm46AL9woslklLLfbNQPVGHHUfsFTCzAsH2pQKQDpkFWk2pA4IclpFL0jJHkkUlEuy6Fnble8cGPq7kvYS9UeISnbFwa4jX73NlzII9653Lim3eGqwAjNKkWosAmVux3UeERBKgKvCcdjyw7QSAtcnOEPCZqVnH2nxClKsycqO8SB_',
        title: 'Crafting the Perfect Resume for US Tech Internships',
        institution: 'Career Services',
        location: 'Online',
        verified: true,
        tags: ['#Resume', '#Internship', '#Tech'],
        applyLink: '#',
        grid: [
            { label: 'Format', value: 'ATS Friendly' },
            { label: 'Length', value: '1 Page Max' },
            { label: 'Focus', value: 'Projects & Impact' },
            { label: 'Keywords', value: 'Crucial' }
        ],
        about: '<p>Learn how to structure your resume to get past the Applicant Tracking Systems (ATS) used by FAANG and other top tech companies. Focus on quantifiable metrics and action verbs.</p>'
    },
    'eth_zurich': {
        id: 'eth_zurich',
        label: 'Admission Open',
        labelColor: 'text-green-700 border-green-100 bg-green-50',
        banner: 'https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?q=80&w=2000&auto=format&fit=crop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/ETH_Z%C3%BCrich_Logo_black.svg/1200px-ETH_Z%C3%BCrich_Logo_black.svg.png',
        title: 'Master Programmes Application Period 2025',
        institution: 'ETH Zurich',
        location: 'Zurich, Switzerland',
        verified: true,
        tags: ['#Europe', '#Engineering', '#PublicUni'],
        applyLink: '/colleges',
        grid: [
            { label: 'Application Window', value: 'Nov 01 - Dec 15', alert: true },
            { label: 'Tuition', value: 'Low (~Wait)' },
            { label: 'Language', value: 'English (mostly)' },
            { label: 'Ranking', value: 'Top 10 Global' }
        ],
        about: '<p>ETH Zurich is one of the world\'s leading universities for science and technology and is known for its cutting-edge research and innovation. The first application window for international students is critical.</p>'
    },
    'erasmus': {
        id: 'erasmus',
        label: 'Scholarship',
        labelColor: 'text-blue-700 border-blue-100 bg-blue-50',
        banner: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=2000&auto=format&fit=crop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Europe.svg/1200px-Flag_of_Europe.svg.png',
        title: 'Erasmus Mundus Joint Masters',
        institution: 'European Commission',
        location: 'Multiple Countries',
        verified: true,
        tags: ['#Europe', '#JointDegree', '#FullyFunded'],
        applyLink: '/application',
        grid: [
            { label: 'Mobility', value: 'Min 2 Countries' },
            { label: 'Catalog', value: 'Oct 2024' },
            { label: 'Allowance', value: '€1000 - €1400/mo' },
            { label: 'Deadline', value: 'Jan/Feb 2025' }
        ],
        about: '<p>Erasmus Mundus Joint Masters are high-level integrated study programmes at master level. The programme is designed and delivered by an international partnership of higher education institutions.</p>'
    },
    'toronto_housing': {
        id: 'toronto_housing',
        label: 'Accomodation',
        labelColor: 'text-orange-700 border-orange-100 bg-orange-50',
        banner: 'https://images.unsplash.com/photo-1580041065738-e72023775cdc?q=80&w=2000&auto=format&fit=crop',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/1200px-Utoronto_coa.svg.png',
        title: 'UofT Residence Guarantee for First Years',
        institution: 'University of Toronto',
        location: 'Toronto, Canada',
        verified: true,
        tags: ['#Housing', '#Dorms', '#Freshers'],
        applyLink: '#',
        grid: [
            { label: 'Deadline', value: 'Mar 31, 2025', alert: true },
            { label: 'Deposit', value: 'Required' },
            { label: 'Placement', value: 'Random/Ranked' },
            { label: 'Type', value: 'Single/Double' }
        ],
        about: '<p>University of Toronto officially guarantees residence to all new full-time students entering their first year of university in an undergraduate program for the first time, provided they meet the deadlines.</p>'
    },
    'ielts_update': {
        id: 'ielts_update',
        label: 'Routine',
        labelColor: 'text-gray-700 border-gray-100 bg-gray-50',
        banner: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2000&auto=format&fit=crop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/IELTS_logo.svg/1200px-IELTS_logo.svg.png',
        title: 'IELTS One Skill Retake Now Global',
        institution: 'IDP / British Council',
        location: 'Global',
        verified: true,
        tags: ['#Exams', '#IELTS', '#English'],
        applyLink: '#',
        grid: [
            { label: 'Retake', value: 'One Module' },
            { label: 'Window', value: 'Within 60 Days' },
            { label: 'Acceptance', value: 'Growing' },
            { label: 'Cost', value: 'Lower than Full' }
        ],
        about: '<p>Test takers who didn\'t show their full potential in one of the four skills (Listening, Reading, Writing, or Speaking) can now retake just that one skill. This is available at eligible test centres globally.</p>'
    },
    'prodigy_finance': {
        id: 'prodigy_finance',
        label: 'Scholarship',
        labelColor: 'text-blue-700 border-blue-100 bg-blue-50',
        banner: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop',
        logo: 'https://dashboard.prodigyfinance.com/assets/prodigy_logo_blue-3e6f9661d9a341071279.svg',
        title: 'Prodigy Finance Scholarship 2025',
        institution: 'Prodigy Finance',
        location: 'Global',
        verified: true,
        tags: ['#Loan', '#Merit', '#Global'],
        applyLink: '#',
        grid: [
            { label: 'Value', value: '$5000' },
            { label: 'Type', value: 'Merit Based' },
            { label: 'Round', value: 'Bi-Annual' },
            { label: 'Eligibility', value: 'Borrowers' }
        ],
        about: '<p>Prodigy Finance offers scholarships to its borrowers. Candidates need to submit a short essay on how they intend to make a positive impact in the world given the opportunity of their postgraduate degree.</p>'
    }
};
