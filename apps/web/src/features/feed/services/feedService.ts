const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PostResponse {
    id: string;
    title: string;
    content: string;
    slug: string;
    excerpt?: string;
    coverImageUrl?: string;
    category: string;
    tags: string[];
    likeCount: number;
    dislikeCount: number;
    viewCount: number;
    bookmarkCount: number;
    userInteractions?: string[]; // e.g. ['like', 'bookmark']
    metadata?: {
        location?: string;
        universityName?: string;
        universityLogo?: string;
        tuitionFee?: string;
        programDuration?: string;
        deadline?: string;
        applyLink?: string;
        eligibility?: string[];
        benefits?: { icon: string; title: string; desc: string; bg: string; text: string }[];
        [key: string]: any;
    };
    university?: {
        id: string;
        name: string;
        slug: string;
        logoUrl?: string;
        country?: string;
    };
    author?: {
        fullName: string;
        avatarUrl?: string;
    };
    createdAt: string;
    updatedAt: string;
}

// ─── Mock Fallback Data ───────────────────────────────────────────────────────
// Used when the backend is unreachable (Railway DB outage, etc.)

export const MOCK_POSTS: PostResponse[] = [
    {
        id: 'mock-1',
        title: 'Global Excellence Scholarship 2026 – University of Oxford',
        slug: 'global-excellence-scholarship-oxford-2026',
        content: '<p>The <strong>Global Excellence Scholarship</strong> is designed to support high-achieving international students pursuing graduate studies at the University of Oxford. This prestigious award covers full tuition fees plus a generous monthly stipend, allowing you to focus entirely on your studies.</p><p>Applicants must demonstrate outstanding academic achievement, leadership potential, and a commitment to making a positive impact in their home countries.</p>',
        excerpt: 'Full tuition + stipend for outstanding international graduates at Oxford.',
        coverImageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
        category: 'scholarships',
        tags: ['#FullyFunded', '#Oxford', '#UK', '#Excellence'],
        likeCount: 342,
        dislikeCount: 0,
        viewCount: 5800,
        bookmarkCount: 128,
        metadata: {
            location: 'United Kingdom',
            universityName: 'University of Oxford',
            universityLogo: 'https://logo.clearbit.com/ox.ac.uk',
            tuitionFee: 'Full Coverage',
            deadline: 'Dec 15, 2026',
            applyLink: 'https://www.ox.ac.uk/admissions/graduate/fees-and-funding/scholarships',
            eligibility: [
                'International student with outstanding academic record (First class or equivalent)',
                'Holding an offer for a full-time graduate degree at Oxford',
                'Demonstrated leadership potential',
                'Not previously held a full scholarship at Oxford'
            ],
            benefits: [
                { icon: 'payments', title: 'Full Tuition', desc: 'Complete tuition fee coverage', bg: 'bg-green-50', text: 'text-green-600' },
                { icon: 'attach_money', title: 'Monthly Stipend', desc: '£1,500/month living allowance', bg: 'bg-blue-50', text: 'text-blue-600' },
                { icon: 'flight', title: 'Travel Grant', desc: 'Annual round-trip airfare', bg: 'bg-purple-50', text: 'text-purple-600' }
            ]
        },
        university: { id: 'u1', name: 'University of Oxford', slug: 'oxford', logoUrl: 'https://logo.clearbit.com/ox.ac.uk', country: 'United Kingdom' },
        author: { fullName: 'EA Overseas Team', avatarUrl: undefined },
        createdAt: '2026-04-01T10:00:00Z',
        updatedAt: '2026-04-10T10:00:00Z',
    },
    {
        id: 'mock-2',
        title: 'M.Sc. Data Science & AI – Zero Tuition at TU Munich',
        slug: 'msc-data-science-ai-tum-2026',
        content: '<p>Join one of Europe\'s leading technical universities for a world-class program in <strong>Data Science and Artificial Intelligence</strong>. The Technical University of Munich charges <em>no tuition fees</em> for international students, making it one of the most accessible elite programs globally.</p><p>The program combines rigorous theoretical foundations with hands-on industry projects, preparing graduates for top roles in tech, research, and consulting.</p>',
        excerpt: 'No tuition fees for international students at one of Europe\'s top STEM universities.',
        coverImageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
        category: 'admissions',
        tags: ['#Germany', '#STEM', '#NoFees', '#Masters', '#DataScience'],
        likeCount: 512,
        dislikeCount: 0,
        viewCount: 9200,
        bookmarkCount: 204,
        metadata: {
            location: 'Germany',
            universityName: 'Technical University of Munich',
            universityLogo: 'https://logo.clearbit.com/tum.de',
            tuitionFee: '€0 / Semester',
            programDuration: '2 Years',
            deadline: 'May 31, 2026',
            applyLink: 'https://www.tum.de/en/studies/application',
            eligibility: [
                'Bachelor\'s degree in Computer Science, Mathematics, or related field',
                'Strong background in statistics and programming',
                'English proficiency (IELTS 6.5 or equivalent)',
                'GRE recommended but not mandatory'
            ],
            benefits: [
                { icon: 'money_off', title: 'Zero Tuition', desc: 'No tuition fees for any student', bg: 'bg-green-50', text: 'text-green-600' },
                { icon: 'work', title: 'Industry Links', desc: 'Direct hiring pipeline from BMW, Siemens', bg: 'bg-blue-50', text: 'text-blue-600' }
            ]
        },
        university: { id: 'u2', name: 'Technical University of Munich', slug: 'tum', logoUrl: 'https://logo.clearbit.com/tum.de', country: 'Germany' },
        author: { fullName: 'EA Overseas Team' },
        createdAt: '2026-04-05T10:00:00Z',
        updatedAt: '2026-04-12T10:00:00Z',
    },
    {
        id: 'mock-3',
        title: 'Australia Extends Post-Study Work Rights for Graduates',
        slug: 'australia-post-study-work-rights-2026',
        content: '<p>The Australian Government has announced a significant <strong>extension of post-study work rights</strong> for international graduates in selected STEM and care economy fields.</p><p>Engineering, IT, and Healthcare graduates will now be eligible for <strong>up to 4 years</strong> of post-study work visas, up from the previous 2 years. This policy change aims to address critical skills shortages across the country.</p>',
        excerpt: 'STEM graduates can now stay for up to 4 years post-graduation under new visa rules.',
        coverImageUrl: 'https://images.unsplash.com/photo-1589262804704-c5aa9e6f1013?q=80&w=1200&auto=format&fit=crop',
        category: 'visa',
        tags: ['#Australia', '#Visa', '#WorkPermit', '#STEM', '#PolicyUpdate'],
        likeCount: 287,
        dislikeCount: 0,
        viewCount: 4100,
        bookmarkCount: 95,
        metadata: {
            location: 'Australia',
            universityName: 'Australian Government',
            universityLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/200px-Flag_of_Australia_%28converted%29.svg.png',
            applyLink: 'https://immi.homeaffairs.gov.au/',
        },
        author: { fullName: 'EA Overseas Team' },
        createdAt: '2026-04-08T10:00:00Z',
        updatedAt: '2026-04-08T10:00:00Z',
    },
    {
        id: 'mock-4',
        title: 'Harvard Business School – MBA Admissions Open for Class of 2028',
        slug: 'hbs-mba-admissions-fall-2026',
        content: '<p><strong>Harvard Business School</strong> is now accepting applications for the MBA Class of 2028. Join a global community of leaders, innovators, and entrepreneurs who are shaping industries worldwide.</p><p>The HBS MBA is a two-year, full-time residential program. The case method remains central to the experience, with students engaged in daily discussion of real business situations.</p>',
        excerpt: 'Applications open for the world\'s most renowned MBA program – deadline Sep 4, 2026.',
        coverImageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop',
        category: 'admissions',
        tags: ['#MBA', '#Harvard', '#USA', '#Fall2026', '#Business'],
        likeCount: 621,
        dislikeCount: 0,
        viewCount: 12000,
        bookmarkCount: 312,
        metadata: {
            location: 'USA',
            universityName: 'Harvard Business School',
            universityLogo: 'https://logo.clearbit.com/hbs.edu',
            deadline: 'Sep 04, 2026',
            applyLink: 'https://www.hbs.edu/mba/admissions/',
            eligibility: [
                'Bachelor\'s degree from accredited institution',
                'GMAT or GRE score required',
                'Minimum 2 years of professional work experience',
                'Strong leadership and interpersonal skills'
            ]
        },
        university: { id: 'u4', name: 'Harvard Business School', slug: 'hbs', logoUrl: 'https://logo.clearbit.com/hbs.edu', country: 'USA' },
        author: { fullName: 'EA Overseas Team' },
        createdAt: '2026-04-10T10:00:00Z',
        updatedAt: '2026-04-10T10:00:00Z',
    },
    {
        id: 'mock-5',
        title: 'DAAD EPOS Scholarship – Fully Funded, No IELTS Required',
        slug: 'daad-epos-scholarship-2026',
        content: '<p>The <strong>DAAD EPOS (Exceed) scholarship</strong> offers fully funded opportunities for professionals from developing countries to pursue postgraduate studies in Germany. Crucially, English proficiency can be demonstrated through a <em>Medium of Instruction (MOI)</em> certificate, eliminating the IELTS barrier.</p><p>The scholarship covers tuition, a monthly stipend of €934, travel allowance, health insurance, and more.</p>',
        excerpt: 'Fully funded German scholarship accepting MOI instead of IELTS for developing country applicants.',
        coverImageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
        category: 'scholarships',
        tags: ['#GermanyScholarships', '#NoIELTS', '#FullyFunded', '#DAAD', '#Developing'],
        likeCount: 890,
        dislikeCount: 0,
        viewCount: 18500,
        bookmarkCount: 445,
        metadata: {
            location: 'Germany',
            universityName: 'DAAD Germany',
            universityLogo: 'https://logo.clearbit.com/daad.de',
            tuitionFee: 'Fully Covered',
            deadline: 'Oct 31, 2026',
            applyLink: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/',
            eligibility: [
                'From a developing country (DAC list)',
                'Bachelor\'s degree with min. 2 years professional experience',
                'English proficiency via MOI certificate acceptable',
                'Below 36 years of age at time of application'
            ],
            benefits: [
                { icon: 'payments', title: 'Monthly Stipend', desc: '€934/month', bg: 'bg-green-50', text: 'text-green-600' },
                { icon: 'health_and_safety', title: 'Health Insurance', desc: 'Full health coverage', bg: 'bg-blue-50', text: 'text-blue-600' },
                { icon: 'flight', title: 'Travel Allowance', desc: 'Round-trip flight covered', bg: 'bg-purple-50', text: 'text-purple-600' }
            ]
        },
        author: { fullName: 'EA Overseas Team' },
        createdAt: '2026-04-12T10:00:00Z',
        updatedAt: '2026-04-12T10:00:00Z',
    },
    {
        id: 'mock-6',
        title: 'Gates Cambridge Scholarship 2027 – Full Cost Award',
        slug: 'gates-cambridge-scholarship-2027',
        content: '<p>The <strong>Gates Cambridge Scholarship</strong> programme offers full-cost scholarships to outstanding applicants from countries outside the UK to pursue a postgraduate degree at the University of Cambridge. Around 80 scholarships are awarded annually across all subject areas.</p><p>Selection criteria include outstanding intellectual ability, leadership potential, a commitment to improving the lives of others, and a good fit with Cambridge.</p>',
        excerpt: 'One of the world\'s most prestigious scholarships – full cost, any discipline at Cambridge.',
        coverImageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
        category: 'scholarships',
        tags: ['#FullyFunded', '#Cambridge', '#UK', '#GatesCambridge', '#Fall2026'],
        likeCount: 1204,
        dislikeCount: 0,
        viewCount: 28000,
        bookmarkCount: 680,
        metadata: {
            location: 'United Kingdom',
            universityName: 'University of Cambridge',
            universityLogo: 'https://logo.clearbit.com/cam.ac.uk',
            tuitionFee: 'Full Cost (Tuition + Living)',
            deadline: 'Dec 02, 2026',
            applyLink: 'https://www.gatescambridge.org/apply/',
            eligibility: [
                'Outstanding academic record in any discipline',
                'Citizens of any country outside the UK',
                'Apply simultaneously to Cambridge for a graduate degree',
                'Leadership potential and commitment to improving others\' lives'
            ]
        },
        university: { id: 'u6', name: 'University of Cambridge', slug: 'cambridge', logoUrl: 'https://logo.clearbit.com/cam.ac.uk', country: 'United Kingdom' },
        author: { fullName: 'EA Overseas Team' },
        createdAt: '2026-04-15T10:00:00Z',
        updatedAt: '2026-04-15T10:00:00Z',
    },
    {
        id: 'mock-7',
        title: 'How to Apply to European Universities Without IELTS',
        slug: 'how-to-apply-europe-without-ielts',
        content: '<p>Many top universities in <strong>Germany, France, the Netherlands, and Italy</strong> accept applications without an IELTS score. Instead, they accept a <em>Medium of Instruction (MOI) certificate</em> from your previous institution, or proof of your bachelor\'s degree being in English.</p><h3>Countries with flexible English requirements:</h3><ul><li><strong>Germany</strong> – Most public universities accept MOI</li><li><strong>Netherlands</strong> – Many programs accept Duolingo English Test</li><li><strong>France</strong> – DELF/DALF for French-taught, MOI for English-taught</li><li><strong>Italy</strong> – MOI widely accepted at major universities</li></ul>',
        excerpt: 'Complete guide to studying in Europe without needing IELTS – countries, universities, and documents.',
        coverImageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
        category: 'news',
        tags: ['#NoIELTS', '#Europe', '#Guide', '#Germany', '#Netherlands'],
        likeCount: 756,
        dislikeCount: 0,
        viewCount: 14200,
        bookmarkCount: 389,
        metadata: {
            location: 'Europe',
            universityName: 'EAOverseas',
            universityLogo: '/logo.png',
        },
        author: { fullName: 'EA Overseas Team' },
        createdAt: '2026-04-18T10:00:00Z',
        updatedAt: '2026-04-18T10:00:00Z',
    },
    {
        id: 'mock-8',
        title: 'Stanford Engineering Graduate Admissions – Fall 2026',
        slug: 'stanford-engineering-admissions-fall-2026',
        content: '<p><strong>Stanford University School of Engineering</strong> is now accepting applications for its graduate programs for the Autumn 2026 intake. Stanford Engineering is consistently ranked #1 globally and offers world-class research opportunities across all engineering disciplines.</p><p>The school offers over 40 graduate programs in areas including AI, Bioengineering, Civil Engineering, Computer Science, and Electrical Engineering.</p>',
        excerpt: 'Stanford Engineering applications open for Fall 2026 – ranked #1 globally.',
        coverImageUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=1200&auto=format&fit=crop',
        category: 'admissions',
        tags: ['#Stanford', '#USA', '#STEM', '#Engineering', '#Fall2026'],
        likeCount: 445,
        dislikeCount: 0,
        viewCount: 8900,
        bookmarkCount: 210,
        metadata: {
            location: 'USA',
            universityName: 'Stanford University',
            universityLogo: 'https://logo.clearbit.com/stanford.edu',
            deadline: 'Dec 05, 2026',
            applyLink: 'https://gradadmissions.stanford.edu/',
        },
        university: { id: 'u8', name: 'Stanford University', slug: 'stanford', logoUrl: 'https://logo.clearbit.com/stanford.edu', country: 'USA' },
        author: { fullName: 'EA Overseas Team' },
        createdAt: '2026-04-20T10:00:00Z',
        updatedAt: '2026-04-20T10:00:00Z',
    },
];

// ─── Helper: check if value is an error response ──────────────────────────────
function isApiError(res: Response): boolean {
    return !res.ok;
}

// ─── Feed Service ─────────────────────────────────────────────────────────────

export const feedService = {
    getAll: async (params?: { category?: string; search?: string; universityId?: string }): Promise<PostResponse[]> => {
        const token = localStorage.getItem('eaoverseas_token');
        const query = new URLSearchParams();
        if (params?.category) query.append('category', params.category);
        if (params?.search) query.append('search', params.search);
        if (params?.universityId) query.append('universityId', params.universityId);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

            const res = await fetch(`${API_BASE}/api/feed?${query.toString()}`, {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {},
                signal: controller.signal,
            });
            clearTimeout(timeoutId);

            if (!res.ok) {
                console.warn('[feedService] API returned error, using mock data');
                return filterMockPosts(MOCK_POSTS, params);
            }

            const data = await res.json();
            // If backend returns empty array, fallback to mock data
            if (Array.isArray(data) && data.length === 0) {
                return filterMockPosts(MOCK_POSTS, params);
            }
            return Array.isArray(data) ? data : MOCK_POSTS;
        } catch (err: any) {
            console.warn('[feedService] Fetch failed (DB unreachable?), using mock data:', err?.message);
            return filterMockPosts(MOCK_POSTS, params);
        }
    },

    getById: async (slugOrId: string): Promise<PostResponse> => {
        const token = localStorage.getItem('eaoverseas_token');

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const res = await fetch(`${API_BASE}/api/feed/${slugOrId}`, {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {},
                signal: controller.signal,
            });
            clearTimeout(timeoutId);

            if (!res.ok) {
                const mockPost = MOCK_POSTS.find(p => p.slug === slugOrId || p.id === slugOrId);
                if (mockPost) return mockPost;
                throw new Error('Post not found');
            }

            return res.json();
        } catch (err: any) {
            // Fallback to mock data
            const mockPost = MOCK_POSTS.find(p => p.slug === slugOrId || p.id === slugOrId);
            if (mockPost) return mockPost;
            throw new Error('Post not found');
        }
    },

    create: async (data: any): Promise<PostResponse> => {
        const token = localStorage.getItem('eaoverseas_token');
        const res = await fetch(`${API_BASE}/api/feed`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const error = await res.json().catch(() => ({ error: 'Failed to create post' }));
            throw new Error(error.error || 'Failed to create post');
        }
        return res.json();
    },

    update: async (id: string, data: any): Promise<PostResponse> => {
        const token = localStorage.getItem('eaoverseas_token');
        const res = await fetch(`${API_BASE}/api/feed/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const error = await res.json().catch(() => ({ error: 'Failed to update post' }));
            throw new Error(error.error || 'Failed to update post');
        }
        return res.json();
    },

    delete: async (id: string): Promise<void> => {
        const token = localStorage.getItem('eaoverseas_token');
        const res = await fetch(`${API_BASE}/api/feed/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) {
            const error = await res.json().catch(() => ({ error: 'Failed to delete post' }));
            throw new Error(error.error || 'Failed to delete post');
        }
    },

    toggleLike: async (id: string): Promise<{ action: string; type: string }> => {
        const token = localStorage.getItem('eaoverseas_token');
        try {
            const res = await fetch(`${API_BASE}/api/feed/${id}/like`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!res.ok) throw new Error('Failed to toggle like');
            return res.json();
        } catch (err) {
            // Optimistic mock response when offline
            return { action: 'added', type: 'like' };
        }
    },

    toggleBookmark: async (id: string): Promise<{ action: string; type: string }> => {
        const token = localStorage.getItem('eaoverseas_token');
        try {
            const res = await fetch(`${API_BASE}/api/feed/${id}/bookmark`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!res.ok) throw new Error('Failed to toggle bookmark');
            return res.json();
        } catch (err) {
            return { action: 'added', type: 'bookmark' };
        }
    },
};

// ─── Local filter helper for mock data ───────────────────────────────────────

function filterMockPosts(posts: PostResponse[], params?: { category?: string; search?: string; universityId?: string }): PostResponse[] {
    if (!params) return posts;
    return posts.filter(p => {
        if (params.category && p.category !== params.category) return false;
        if (params.search) {
            const q = params.search.toLowerCase();
            const inTitle = p.title.toLowerCase().includes(q);
            const inContent = p.content.toLowerCase().includes(q);
            const inTags = p.tags.some(t => t.toLowerCase().includes(q));
            if (!inTitle && !inContent && !inTags) return false;
        }
        return true;
    });
}
