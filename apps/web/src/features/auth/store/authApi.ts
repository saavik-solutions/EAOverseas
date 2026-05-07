import { apiSlice } from '@/store/api/apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/api/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    googleLogin: builder.mutation({
      query: (token) => ({
        url: '/api/auth/google',
        method: 'POST',
        body: { token },
      }),
    }),
    verifyOTP: builder.mutation({
      query: (otp) => ({
        url: '/api/auth/verify-otp',
        method: 'POST',
        body: { otp },
      }),
    }),
    resendOTP: builder.mutation({
      query: () => ({
        url: '/api/auth/resend-otp',
        method: 'POST',
      }),
    }),
    getMe: builder.query({
      query: () => '/api/auth/me',
      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGoogleLoginMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useGetMeQuery,
} = authApi;
