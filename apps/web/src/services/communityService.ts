const API_BASE = (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
  ? 'http://localhost:4000/api/community'
  : 'https://eaoverseas-v1.onrender.com/api/community';

const getAuthHeaders = () => {
  const token = localStorage.getItem('eaoverseas_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export interface CommunityPost {
  id: string;
  title: string;
  content?: string;
  imageUrl?: string;
  category: string;
  tags: string[];
  isQuestion: boolean;
  isAnonymous: boolean;
  isPinned: boolean;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  createdAt: string;
  author: {
    id: string;
    fullName: string;
    avatarUrl?: string;
    role: string;
  };
  userVote: 'like' | 'dislike' | null;
}

export interface CommunityComment {
  id: string;
  text: string;
  isAnswer: boolean;
  isBest: boolean;
  likeCount: number;
  dislikeCount: number;
  createdAt: string;
  author: {
    id: string;
    fullName: string;
    avatarUrl?: string;
    role: string;
  };
  userVote: 'like' | 'dislike' | null;
  replies: CommunityComment[];
}

// ── Posts ──────────────────────────────────────────────────────────────────────

export const communityService = {
  async getFeed(params?: { category?: string; search?: string; limit?: number }): Promise<CommunityPost[]> {
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'All Topics') {
      query.set('category', params.category.toLowerCase().replace(/ /g, '_'));
    }
    if (params?.search) query.set('search', params.search);
    if (params?.limit) query.set('limit', String(params.limit));

    const res = await fetch(`${API_BASE}/posts?${query.toString()}`, {
      headers: { ...getAuthHeaders() } as Record<string, string>,
    });
    if (!res.ok) throw new Error('Failed to fetch community feed');
    return res.json();
  },

  async createPost(data: {
    title: string;
    content?: string;
    imageUrl?: string;
    category?: string;
    tags?: string[];
    isQuestion?: boolean;
    isAnonymous?: boolean;
  }): Promise<CommunityPost> {
    const res = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      } as Record<string, string>,
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create post');
    return res.json();
  },

  async deletePost(postId: string): Promise<void> {
    const res = await fetch(`${API_BASE}/posts/${postId}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() } as Record<string, string>,
    });
    if (!res.ok) throw new Error('Failed to delete post');
  },

  async votePost(postId: string, value: 'like' | 'dislike'): Promise<{ action: string; value: string | null }> {
    const res = await fetch(`${API_BASE}/posts/${postId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      } as Record<string, string>,
      body: JSON.stringify({ value }),
    });
    if (!res.ok) throw new Error('Failed to vote on post');
    return res.json();
  },

  // ── Comments ───────────────────────────────────────────────────────────────────

  async getComments(postId: string): Promise<CommunityComment[]> {
    const res = await fetch(`${API_BASE}/posts/${postId}/comments`, {
      headers: { ...getAuthHeaders() } as Record<string, string>,
    });
    if (!res.ok) throw new Error('Failed to fetch comments');
    return res.json();
  },

  async addComment(data: {
    postId: string;
    text: string;
    parentId?: string;
    isAnswer?: boolean;
  }): Promise<CommunityComment> {
    const res = await fetch(`${API_BASE}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      } as Record<string, string>,
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      let errMsg = 'Failed to add comment';
      try {
        const errBody = await res.json();
        errMsg = errBody.message || errBody.error || errMsg;
      } catch {}
      throw new Error(`${errMsg} (status ${res.status})`);
    }
    return res.json();
  },

  async voteComment(commentId: string, value: 'like' | 'dislike'): Promise<{ action: string; value: string | null }> {
    const res = await fetch(`${API_BASE}/comments/${commentId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      } as Record<string, string>,
      body: JSON.stringify({ value }),
    });
    if (!res.ok) throw new Error('Failed to vote on comment');
    return res.json();
  },

  async deleteComment(commentId: string): Promise<void> {
    const res = await fetch(`${API_BASE}/comments/${commentId}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() } as Record<string, string>,
    });
    if (!res.ok) throw new Error('Failed to delete comment');
  },
};
