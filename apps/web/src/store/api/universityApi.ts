import { apiSlice } from './apiSlice';

export interface University {
  id: string;
  name: string;
  slug: string;
  country: string;
  city?: string;
  qsRanking?: number;
  logoUrl?: string;
  bannerUrl?: string;
  description?: string;
}

export const universityApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUniversities: builder.query<University[], void>({
      query: () => '/api/universities',
      providesTags: ['University'],
    }),
    getUniversityBySlug: builder.query<University, string>({
      query: (slug) => `/api/universities/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'University', id: slug }],
    }),
  }),
});

export const { useGetUniversitiesQuery, useGetUniversityBySlugQuery } = universityApi;
