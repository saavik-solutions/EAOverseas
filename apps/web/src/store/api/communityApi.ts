import { apiSlice } from './apiSlice';

export interface CommunityPost {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

export const communityApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommunityFeed: builder.query<CommunityPost[], { page?: number; limit?: number }>({
      query: (params) => ({
        url: '/api/community/feed',
        params,
      }),
      providesTags: ['CommunityPost'],
    }),
    createCommunityPost: builder.mutation<CommunityPost, { content: string }>({
      query: (body) => ({
        url: '/api/community/posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CommunityPost'],
    }),
    likeCommunityPost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/community/posts/${id}/like`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'CommunityPost', id }],
    }),
  }),
});

export const { 
  useGetCommunityFeedQuery, 
  useCreateCommunityPostMutation, 
  useLikeCommunityPostMutation 
} = communityApi;
