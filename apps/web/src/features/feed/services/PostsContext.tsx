/**
 * @deprecated This context is a legacy layer for mock data and fallback state.
 * It is being phased out in favor of direct feedService API calls.
 * Do not use for new features.
 */
import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { feedService } from '@/features/feed/services/feedService';

export interface Post {
    id: string;
    label: string;
    labelColor?: string;
    banner: string;
    logo: string;
    title: string;
    institution: string;
    location: string;
    verified?: boolean;
    tags: string[];
    applyLink?: string;
    grid: { label: string; value: string; alert?: boolean; color?: string }[];
    about: string;
    category?: string;
    status?: 'Published' | 'Draft' | 'Archived';
    isPinned?: boolean;
    universityId?: string;
    // Additional fields for details and admin
    image?: string;
    eligibility?: string[];
    benefits?: { icon: string; title: string; desc: string; bg: string; text: string }[];
    eventDate?: string;
    eventLink?: string;
    eventVenue?: string;
    expiry?: string;
    hashtags?: string;
}

interface PostsContextType {
    posts: Post[];
    loading: boolean;
    error: string | null;
    refreshPosts: () => Promise<void>;
    addPost: (post: any) => Promise<void>;
    updatePost: (id: string, post: any) => Promise<void>;
    deletePost: (id: string) => Promise<void>;
    clearAllPosts: () => Promise<void>;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const mapBackendToPost = (p: any): Post => ({
        id: p._id,
        label: p.category || 'Article',
        labelColor: p.category === 'Scholarship' ? 'bg-orange-50 text-orange-700 border-orange-100' :
            p.category === 'Program' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100',
        banner: p.banner || (p.mediaUrls && p.mediaUrls[0]) || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
        logo: p.universityLogo || 'https://via.placeholder.com/100',
        title: p.title,
        institution: p.universityName || 'Global Update',
        location: p.location || 'Global',
        tags: p.tags || [],
        about: p.content,
        category: p.category,
        status: 'Published',
        universityId: p.universityId,
        image: p.mediaUrls?.[0],
        eligibility: p.eligibility || [],
        benefits: p.benefits || [],
        eventDate: p.eventDate,
        eventLink: p.eventLink,
        eventVenue: p.eventVenue,
        expiry: p.expiry,
        hashtags: p.hashtags,
        grid: [
            ...(p.category === 'Program' ? [
                { label: 'Tuition', value: p.tuitionFee || 'Contact Uni' },
                { label: 'Duration', value: p.programDuration || 'N/A' },
                { label: 'Intakes', value: p.intakes || 'Fall/Spring' }
            ] : []),
            ...(p.category === 'Scholarship' ? [
                { label: 'Funding', value: p.funding || 'Partial' },
                { label: 'Deadline', value: p.expiry || 'Open', alert: true }
            ] : []),
            ...(p.category !== 'Program' && p.category !== 'Scholarship' ? [
                { label: 'Type', value: p.category || 'Information' },
                { label: 'Updated', value: new Date(p.updatedAt).toLocaleDateString() }
            ] : [])
        ]
    });

    const DEFAULT_POSTS: Post[] = [
        {
            id: 'mock-1',
            label: 'Scholarship',
            labelColor: 'bg-orange-50 text-orange-700 border-orange-100',
            banner: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
            logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=100&auto=format&fit=crop',
            title: 'Global Excellence Scholarship 2026',
            institution: 'University of Oxford',
            location: 'United Kingdom',
            verified: true,
            tags: ['Scholarship', 'Oxford', 'UK', 'Excellence'],
            about: 'The Global Excellence Scholarship is designed to support high-achieving international students pursuing graduate studies at the University of Oxford. Covers full tuition and living expenses.',
            eligibility: [
                'International student with outstanding academic record',
                'Holding an offer for a full-time graduate degree at Oxford',
                'Demonstrated leadership potential'
            ],
            benefits: [
                { icon: 'payments', title: 'Full Funding', desc: 'Tuition + Monthly Stipend', bg: 'bg-green-50', text: 'text-green-600' },
                { icon: 'flight', title: 'Travel Grant', desc: 'Annual round-trip airfare', bg: 'bg-blue-50', text: 'text-blue-600' }
            ],
            grid: [
                { label: 'Funding', value: 'Full Tuition + Stipend' },
                { label: 'Deadline', value: 'Dec 15, 2026', alert: true }
            ]
        },
        {
            id: 'mock-2',
            label: 'Program',
            labelColor: 'bg-purple-50 text-purple-700 border-purple-100',
            banner: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
            logo: 'https://images.unsplash.com/photo-1599305090598-fe1757dfc6c2?q=80&w=100&auto=format&fit=crop',
            title: 'M.Sc. in Data Science & AI',
            institution: 'Technical University of Munich',
            location: 'Germany',
            verified: true,
            tags: ['Masters', 'Data Science', 'AI', 'Germany'],
            about: 'Join one of Europe\'s leading technical universities for a specialized program in Data Science and Artificial Intelligence. No tuition fees for international students.',
            grid: [
                { label: 'Tuition', value: '€0 (No Fees)' },
                { label: 'Duration', value: '2 Years' },
                { label: 'Intakes', value: 'Winter/Summer' }
            ]
        },
        {
            id: 'mock-3',
            label: 'Policy Update',
            labelColor: 'bg-blue-50 text-blue-700 border-blue-100',
            banner: 'https://images.unsplash.com/photo-1589262804704-c5aa9e6f1013?q=80&w=800&auto=format&fit=crop',
            logo: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=100&auto=format&fit=crop',
            title: 'New Post-Study Work Visa Regulation',
            institution: 'Australian Government',
            location: 'Australia',
            verified: true,
            tags: ['Visa', 'Australia', 'WorkPermit', '#Fall2026'],
            about: 'The Australian government has announced an extension for post-study work rights for international graduates in selected fields of study including Engineering and IT.',
            grid: [
                { label: 'Type', value: 'Policy Update' },
                { label: 'Effective', value: 'July 2026' }
            ]
        },
        {
            id: 'mock-4',
            label: 'Admission',
            labelColor: 'bg-purple-50 text-purple-700 border-purple-100',
            banner: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
            logo: 'https://logo.clearbit.com/hbs.edu',
            title: 'MBA Admissions Open for Fall 2026',
            institution: 'Harvard Business School',
            location: 'USA',
            verified: true,
            tags: ['#MBA', 'Business', 'Harvard', '#Fall2026'],
            about: 'Harvard Business School is now accepting applications for the MBA Class of 2028. Join a global community of leaders.',
            grid: [
                { label: 'Deadline', value: 'Sep 04, 2026', alert: true },
                { label: 'GMAT', value: 'Required' }
            ]
        },
        {
            id: 'mock-5',
            label: 'Scholarship',
            labelColor: 'bg-orange-50 text-orange-700 border-orange-100',
            banner: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
            logo: 'https://logo.clearbit.com/daad.de',
            title: 'DAAD EPOS Scholarship - No IELTS Required',
            institution: 'DAAD Germany',
            location: 'Germany',
            verified: true,
            tags: ['#GermanyScholarships', '#NoIELTS', '#FullyFunded'],
            about: 'The DAAD EPOS program offers fully funded scholarships for professionals from developing countries. English proficiency can be proven via MOI.',
            grid: [
                { label: 'Funding', value: 'Full + Stipend' },
                { label: 'Status', value: '#NoIELTS Friendly' }
            ]
        },
        {
            id: 'mock-6',
            label: 'Program',
            labelColor: 'bg-green-50 text-green-700 border-green-100',
            banner: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
            logo: 'https://logo.clearbit.com/tum.de',
            title: 'Masters in AI & Robotics - Full Funding available',
            institution: 'TU Munich',
            location: 'Germany',
            verified: true,
            tags: ['#GermanyScholarships', '#FullyFunded', 'AI'],
            about: 'Exceptional masters program with zero tuition fees and various stipends for international students.',
            grid: [
                { label: 'Tuition', value: '€0/Sem' },
                { label: 'Deadline', value: 'May 31, 2026', alert: true }
            ]
        },
        {
            id: 'mock-7',
            label: 'Guide',
            labelColor: 'bg-blue-50 text-blue-700 border-blue-100',
            banner: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
            logo: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=100&auto=format&fit=crop',
            title: 'How to apply without IELTS in Europe',
            institution: 'EduExperts',
            location: 'Europe',
            verified: true,
            tags: ['#NoIELTS', 'Guide', 'Europe'],
            about: 'Complete guide on universities in Germany, France and Italy that accept Medium of Instruction (MOI) certificates.',
            grid: [
                { label: 'Complexity', value: 'Low' },
                { label: 'Success Rate', value: 'High' }
            ]
        },
        {
            id: 'mock-8',
            label: 'Scholarship',
            labelColor: 'bg-orange-50 text-orange-700 border-orange-100',
            banner: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
            logo: 'https://logo.clearbit.com/ox.ac.uk',
            title: 'Clarendon Fund Scholarships 2026',
            institution: 'University of Oxford',
            location: 'United Kingdom',
            verified: true,
            tags: ['#FullyFunded', '#Scholarship', 'Oxford'],
            about: 'The Clarendon Fund offers around 150 new, fully-funded scholarships each year to outstanding graduate students from around the world.',
            grid: [
                { label: 'Funding', value: 'Full + Stipend' },
                { label: 'Deadline', value: 'Jan 22, 2026', alert: true }
            ]
        },
        {
            id: 'mock-9',
            label: 'Admission',
            labelColor: 'bg-purple-50 text-purple-700 border-purple-100',
            banner: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=800&auto=format&fit=crop',
            logo: 'https://logo.clearbit.com/stanford.edu',
            title: 'Graduate Engineering Admissions #Fall2026',
            institution: 'Stanford University',
            location: 'USA',
            verified: true,
            tags: ['#Fall2026', '#STEM', 'Engineering'],
            about: 'Stanford Engineering is looking for the next generation of innovators. Applications for Autumn 2026 are now open.',
            grid: [
                { label: 'Application', value: 'Online' },
                { label: 'Deadline', value: 'Dec 05, 2026' }
            ]
        },
        {
            id: 'mock-10',
            label: 'Program',
            labelColor: 'bg-green-50 text-green-700 border-green-100',
            banner: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
            logo: 'https://logo.clearbit.com/insead.edu',
            title: 'Global Executive MBA 2026 Intake',
            institution: 'INSEAD Business School',
            location: 'France/Singapore',
            verified: true,
            tags: ['#MBA', 'Business', '#Fall2026'],
            about: 'The INSEAD GEMBA offers an unparalleled experience in international business education across three continents.',
            grid: [
                { label: 'Duration', value: '14-17 Months' },
                { label: 'Experience', value: 'Read' }
            ]
        },
        {
            id: 'mock-11',
            label: 'Policy Update',
            labelColor: 'bg-blue-50 text-blue-700 border-blue-100',
            banner: 'https://images.unsplash.com/photo-1544650039-228803bb444c?q=80&w=800&auto=format&fit=crop',
            logo: 'https://logo.clearbit.com/daad.de',
            title: 'Germany Extends Student Work Rights',
            institution: 'DAAD Germany',
            location: 'Germany',
            verified: true,
            tags: ['#GermanyScholarships', 'WorkPermit', 'Policy'],
            about: 'International students in Germany are now eligible to work 140 full days per year, up from 120, to help with living costs.',
            grid: [
                { label: 'Days/Year', value: '140 Days' },
                { label: 'Effective', value: 'June 2026' }
            ]
        },
        {
            id: 'mock-12',
            label: 'Scholarship',
            labelColor: 'bg-orange-50 text-orange-700 border-orange-100',
            banner: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop',
            logo: 'https://logo.clearbit.com/unimelb.edu.au',
            title: 'Melbourne Research Scholarship (Full Funding)',
            institution: 'University of Melbourne',
            location: 'Australia',
            verified: true,
            tags: ['#FullyFunded', '#Scholarship', 'Australia'],
            about: 'Awarded to high-achieving domestic and international students undertaking a graduate research degree.',
            grid: [
                { label: 'Value', value: '$37,000 p.a.' },
                { label: 'Deadline', value: 'Oct 31, 2026', alert: true }
            ]
        },
        {
            id: 'mock-13',
            label: 'Admission',
            labelColor: 'bg-purple-50 text-purple-700 border-purple-100',
            banner: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800&auto=format&fit=crop',
            logo: 'https://logo.clearbit.com/berkeley.edu',
            title: 'UC Berkeley Data Science #Fall2026',
            institution: 'UC Berkeley',
            location: 'USA',
            verified: true,
            tags: ['#Fall2026', '#STEM', '#NoIELTS'],
            about: 'The School of Information at UC Berkeley is accepting applications for the MIDS program for the 2026 term.',
            grid: [
                { label: 'Admission', value: 'Online Only' },
                { label: 'GRE', value: 'Optional' }
            ]
        },
        {
            id: 'mock-14',
            label: 'Program',
            labelColor: 'bg-green-50 text-green-700 border-green-100',
            banner: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
            logo: 'https://logo.clearbit.com/mit.edu',
            title: 'MIT Professional Education - Digital Leadership',
            institution: 'MIT',
            location: 'USA',
            verified: true,
            tags: ['#MBA', 'Leadership', 'STEM'],
            about: 'Hybrid program designed for mid-career professionals looking to lead in the digital age.',
            grid: [
                { label: 'Duration', value: '6 Months' },
                { label: 'Fee', value: '$12,000' }
            ]
        },
        {
            id: 'mock-15',
            label: 'Scholarship',
            labelColor: 'bg-orange-50 text-orange-700 border-orange-100',
            banner: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
            logo: 'https://logo.clearbit.com/cam.ac.uk',
            title: 'Gates Cambridge Scholarship #Fall2026',
            institution: 'University of Cambridge',
            location: 'United Kingdom',
            verified: true,
            tags: ['#FullyFunded', '#Scholarship', '#Fall2026'],
            about: 'The Gates Cambridge Scholarship program offers full-cost scholarships to outstanding applicants from countries outside the UK.',
            grid: [
                { label: 'Funding', value: 'Full Cost' },
                { label: 'Apps Close', value: 'Dec 02, 2026', alert: true }
            ]
        }
    ];

    const refreshPosts = async () => {
        setLoading(true);
        try {
            const data = await feedService.getAll();
            if (data && data.length > 0) {
                const mapped = data.map(mapBackendToPost);
                setPosts(mapped);
            } else {
                setPosts(DEFAULT_POSTS);
            }
            setError(null);
        } catch (err) {
            console.error('Failed to sync feed:', err);
            // Fallback to mock data on error
            setPosts(DEFAULT_POSTS);
            setError(null); // Clear error since we have mock data
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshPosts();
    }, []);

    const addPost = async (postData: any) => {
        await feedService.create(postData);
        await refreshPosts();
    };

    const updatePost = async (id: string, postData: any) => {
        // Mock implementation since service might not have it yet
        // In real app: await feedService.update(id, postData);
        await refreshPosts();
    };

    const deletePost = async (id: string) => {
        // Implementation for delete would go here if service supported it
        // For now we just refresh to show the source of truth
        await refreshPosts();
    };

    const clearAllPosts = async () => {
        // Mock implementation
        setPosts([]);
    };

    return (
        <PostsContext.Provider value={{ posts, loading, error, refreshPosts, addPost, updatePost, deletePost, clearAllPosts }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => {
    const context = useContext(PostsContext);
    if (context === undefined) {
        throw new Error('usePosts must be used within a PostsProvider');
    }
    return context;
};
