import { API_BASE_URL } from '@/config/api.config';

const API_BASE = API_BASE_URL;

export interface PostResponse {
    id: string;
    title: string;
    content: string;
    slug: string;
    author: {
        fullName: string;
        avatarUrl?: string;
    };
    university?: {
        id: string;
        name: string;
        slug: string;
        logoUrl?: string;
    };
    category: string;
    tags: string[];
    coverImageUrl?: string;
    likeCount: number;
    dislikeCount: number;
    viewCount: number;
    bookmarkCount: number;
    metadata?: any;
    userInteractions?: string[]; // liked, disliked, bookmarked
    createdAt: string;
    updatedAt: string;
}

export const feedService = {
    getAll: async (params?: { category?: string; search?: string; universityId?: string; status?: string }) => {
        const token = localStorage.getItem('eaoverseas_token');
        const query = new URLSearchParams();
        if (params?.category) query.append('category', params.category);
        if (params?.search) query.append('search', params.search);
        if (params?.universityId) query.append('universityId', params.universityId);
        if (params?.status) query.append('status', params.status);

        const res = await fetch(`${API_BASE}/api/feed?${query.toString()}`, {
            headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (!res.ok) throw new Error('Failed to fetch feed');
        return await res.json();
    },

    getById: async (slug: string) => {
        const token = localStorage.getItem('eaoverseas_token');
        const res = await fetch(`${API_BASE}/api/feed/${slug}`, {
            headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (!res.ok) throw new Error('Failed to fetch post details');
        return res.json();
    },

    create: async (data: any) => {
        const token = localStorage.getItem('eaoverseas_token');
        const res = await fetch(`${API_BASE}/api/feed`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || 'Failed to create post');
        }
        return res.json();
    },

    toggleLike: async (id: string) => {
        const token = localStorage.getItem('eaoverseas_token');
        const res = await fetch(`${API_BASE}/api/feed/${id}/like`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to toggle like');
        return res.json();
    },


    toggleBookmark: async (id: string) => {
        const token = localStorage.getItem('eaoverseas_token');
        const res = await fetch(`${API_BASE}/api/feed/${id}/bookmark`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to toggle bookmark');
        return res.json();
    },

    updateStatus: async (id: string, status: string) => {
        const token = localStorage.getItem('eaoverseas_token');
        const res = await fetch(`${API_BASE}/api/feed/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || 'Failed to update post status');
        }
        return res.json();
    },

    delete: async (id: string) => {
        const token = localStorage.getItem('eaoverseas_token');
        const res = await fetch(`${API_BASE}/api/feed/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || 'Failed to delete post');
        }
        return res.json();
    },

    update: async (id: string, data: any) => {
        const token = localStorage.getItem('eaoverseas_token');
        const res = await fetch(`${API_BASE}/api/feed/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || 'Failed to update post');
        }
        return res.json();
    },

    getComments: async (id: string) => {
        const res = await fetch(`${API_BASE}/api/feed/${id}/comments`);
        if (!res.ok) throw new Error('Failed to fetch comments');
        return res.json();
    },

    addComment: async (id: string, content: string) => {
        const token = localStorage.getItem('eaoverseas_token');
        const res = await fetch(`${API_BASE}/api/feed/${id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ content })
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || 'Failed to add comment');
        }
        return res.json();
    }
};
