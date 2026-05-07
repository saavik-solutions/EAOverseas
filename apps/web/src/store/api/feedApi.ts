import { apiSlice } from './apiSlice';

export interface FeedPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  coverImageUrl?: string;
  likeCount: number;
  publishedAt: string;
}

export const feedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeed: builder.query<FeedPost[], void>({
      query: () => '/api/feed',
      providesTags: ['Post'],
    }),
    getPostBySlug: builder.query<FeedPost, string>({
      query: (slug) => `/api/feed/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Post', id: slug }],
    }),
    likePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/feed/${id}/like`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
  }),
});

export const { useGetFeedQuery, useGetPostBySlugQuery, useLikePostMutation } = feedApi;
