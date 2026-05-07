import React, { createContext, useContext, useState, ReactNode } from 'react';
import { postsData } from '@workspace/common';

// Define the Post type based on the structure used in mockFeedData and PostCenter
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
    // Additional fields for PostCenter and Feed compatibility
    category?: string;
    status?: 'Published' | 'Draft' | 'Archived';
    isPinned?: boolean;
    image?: string;
    expiry?: string;
    hashtags?: string;
    duration?: string;
    startDate?: string;
    funding?: string;
    openDate?: string;
    requiredTest?: string;
    policyCategory?: string;
    effectiveDate?: string;
    eventType?: string;
    eventDate?: string;
    eventDuration?: string;
    eventHost?: string;
    eventLink?: string;
    eventVenue?: string;
    eligibility?: string[];
    benefits?: { icon: string; title: string; desc: string; text: string; bg: string }[];
}

interface PostsContextType {
    posts: Post[];
    addPost: (post: Post) => void;
    updatePost: (id: string | number, updatedPost: Post) => void;
    deletePost: (id: string | number) => void;
    clearAllPosts: () => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize from localStorage or empty array with error handling
    const [posts, setPosts] = React.useState<Post[]>(() => {
        try {
            const savedPosts = localStorage.getItem('university_posts');
            if (!savedPosts) return Object.values(postsData) as Post[];

            const parsedSaved = JSON.parse(savedPosts);
            const migratedSaved = parsedSaved.map((post: any) => {
                const updatedPost = { ...post };
                updatedPost.grid = post.grid?.map((item: any) =>
                    item.label === 'Term Starts' ? { label: 'Course Level', value: 'Postgraduate' } : item
                );
                if (!updatedPost.applyLink || updatedPost.applyLink === '#') {
                    if (updatedPost.category === 'Scholarship') updatedPost.applyLink = '/application';
                    else if (updatedPost.category === 'Admissions') updatedPost.applyLink = '/colleges';
                }
                return updatedPost;
            });

            const mockPosts = Object.values(postsData) as Post[];
            const savedIds = new Set(migratedSaved.map((p: any) => p.id));
            const uniqueMockPosts = mockPosts.filter(p => !savedIds.has(p.id));
            return [...migratedSaved, ...uniqueMockPosts];
        } catch (err) {
            console.error('Error loading posts:', err);
            return Object.values(postsData) as Post[];
        }
    });

    const isInitialMount = React.useRef(true);
    const channelRef = React.useRef<BroadcastChannel | null>(null);

    // Synchronous persistence helper
    const persistPosts = (updatedPosts: Post[]) => {
        try {
            const data = JSON.stringify(updatedPosts);
            // Defensive size check (roughly 4.5MB limit)
            if (data.length > 4.5 * 1024 * 1024) {
                const msg = 'Post data (likely images) is too large for storage. Try a smaller image.';
                console.warn(msg);
                alert(msg);
                return false;
            }
            localStorage.setItem('university_posts', data);

            // Broadcast to other tabs immediately
            if (channelRef.current) {
                channelRef.current.postMessage({ type: 'SYNC_POSTS', payload: updatedPosts });
            }
            return true;
        } catch (err) {
            console.error('Failed to persist posts:', err);
            if (err instanceof Error && err.name === 'QuotaExceededError') {
                alert('Storage full! Please use the "Clear All" button in the Post Center or "Reset Feed" in SuperAdmin to free up space.');
            }
            return false;
        }
    };

    // Initialize BroadcastChannel
    React.useEffect(() => {
        const channel = new BroadcastChannel('eaoverseas_posts_channel');
        channelRef.current = channel;

        channel.onmessage = (event) => {
            if (event.data?.type === 'SYNC_POSTS') {
                setPosts(prev => {
                    const newValueString = JSON.stringify(event.data.payload);
                    if (JSON.stringify(prev) === newValueString) return prev;
                    return event.data.payload;
                });
            }
        };

        return () => {
            channel.close();
        };
    }, []);

    // Backup persistence for background updates
    React.useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        localStorage.setItem('university_posts', JSON.stringify(posts));
    }, [posts]);

    // Listen for storage events (legacy backup)
    React.useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'university_posts' && e.newValue) {
                try {
                    const updatedPosts = JSON.parse(e.newValue);
                    setPosts(prev => {
                        if (JSON.stringify(prev) === e.newValue) return prev;
                        return updatedPosts;
                    });
                } catch (err) {
                    console.error('Error parsing cross-tab storage update:', err);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const addPost = (post: Post) => {
        setPosts(prev => {
            const next = [post, ...prev];
            // Schedule persistence outside of the pure updater function
            setTimeout(() => persistPosts(next), 0);
            return next;
        });
    };

    const updatePost = (id: string | number, updatedPost: Post) => {
        setPosts(prev => {
            const next = prev.map(post => post.id.toString() === id.toString() ? updatedPost : post);
            setTimeout(() => persistPosts(next), 0);
            return next;
        });
    };

    const deletePost = (id: string | number) => {
        setPosts(prev => {
            const next = prev.filter(post => post.id.toString() !== id.toString());
            setTimeout(() => persistPosts(next), 0);
            return next;
        });
    };

    const clearAllPosts = () => {
        if (window.confirm('This will delete all university posts from this browser. Are you sure?')) {
            const resetData = Object.values(postsData) as Post[];
            setPosts(resetData);
            localStorage.removeItem('university_posts');
            if (channelRef.current) {
                channelRef.current.postMessage({ type: 'SYNC_POSTS', payload: resetData });
            }
        }
    };

    return (
        <PostsContext.Provider value={{ posts, addPost, updatePost, deletePost, clearAllPosts }}>
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
