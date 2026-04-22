const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface UniversityData {
    _id?: string;
    university_id: string;
    name: string;
    website: string;
    country: string;
    city: string;
    logoUrl?: string;
    bannerUrl?: string;
    ranking?: string;
    language?: string;
    description?: string;
    universityType?: 'Public' | 'Private' | 'Research' | 'Technical';
    establishedYear?: number;
    totalStudents?: number;
    campusSize?: string;
    globalRanking?: string;
    facilities?: string[];
    socialLinks?: {
        linkedin?: string;
        twitter?: string;
        facebook?: string;
        instagram?: string;
    };
    [key: string]: any;
}

export const universityService = {
    getAll: async (search?: string, country?: string) => {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (country && country !== 'All') params.append('country', country);

        const res = await fetch(`${API_BASE}/api/universities?${params.toString()}`);
        return handleResponse(res, 'Failed to fetch universities');
    },

    getById: async (id: string) => {
        const res = await fetch(`${API_BASE}/api/universities/${id}`);
        return handleResponse(res, 'Failed to fetch university details');
    },

    create: async (data: UniversityData) => {
        const res = await fetch(`${API_BASE}/api/universities`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return handleResponse(res, 'Failed to onboard university');
    },

    update: async (id: string, data: Partial<UniversityData>) => {
        const res = await fetch(`${API_BASE}/api/universities/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return handleResponse(res, 'Failed to update university');
    },

    delete: async (id: string) => {
        const res = await fetch(`${API_BASE}/api/universities/${id}`, {
            method: 'DELETE'
        });
        return handleResponse(res, 'Failed to remove university record');
    },

    uploadImage: async (file: File): Promise<{ url: string }> => {
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch(`${API_BASE}/api/upload/image`, {
            method: 'POST',
            body: formData
        });
        return handleResponse(res, 'Failed to upload image');
    }
};


/**
 * Handle API response safely checking for JSON content-type
 */
async function handleResponse(res: Response, fallbackError: string) {
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || data.message || fallbackError);
        }
        return data;
    } else {
        const text = await res.text();
        console.error('Non-JSON response received:', text);
        if (!res.ok) {
            throw new Error(`${fallbackError} (Server returned ${res.status} ${res.statusText})`);
        }
        return { message: text }; // Fallback for unexpected success text
    }
}
