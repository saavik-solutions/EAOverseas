const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface UniversityData {
    _id?: string;
    university_id?: string;
    name: string;
    website?: string;
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

        try {
            const res = await fetch(`${API_BASE}/api/universities?${params.toString()}`);
            if (res.ok) return await res.json();
            throw new Error('API failed');
        } catch (err) {
            console.warn('[universityService] Fetch failed, using local fallback');
            const saved = localStorage.getItem('ea_universities');
            const unis = saved ? JSON.parse(saved) : [];
            const filtered = unis.filter((u: any) => {
                if (search && !u.name.toLowerCase().includes(search.toLowerCase())) return false;
                if (country && country !== 'All' && u.country !== country) return false;
                return true;
            });
            return { universities: filtered, total: filtered.length };
        }
    },

    getById: async (id: string) => {
        try {
            const res = await fetch(`${API_BASE}/api/universities/${id}`);
            if (res.ok) return await res.json();
            throw new Error('API failed');
        } catch (err) {
            console.warn('[universityService] Fetch failed, using local fallback');
            const saved = localStorage.getItem('ea_universities');
            const unis = saved ? JSON.parse(saved) : [];
            const uni = unis.find((u: any) => u.id === id || u.id === Number(id) || u._id === id);
            if (uni) return uni;
            throw new Error('University not found');
        }
    },

    create: async (data: UniversityData) => {
        const token = localStorage.getItem('eaoverseas_token');
        const res = await fetch(`${API_BASE}/api/universities`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: JSON.stringify(data)
        });
        return handleResponse(res, 'Failed to onboard university');
    },

    update: async (id: string, data: Partial<UniversityData>) => {
        const token = localStorage.getItem('eaoverseas_token');
        const res = await fetch(`${API_BASE}/api/universities/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: JSON.stringify(data)
        });
        return handleResponse(res, 'Failed to update university');
    },

    delete: async (id: string) => {
        const token = localStorage.getItem('eaoverseas_token');
        const res = await fetch(`${API_BASE}/api/universities/${id}`, {
            method: 'DELETE',
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
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
