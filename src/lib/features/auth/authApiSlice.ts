import { apiSlice } from '@/lib/api/apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: credentials => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    sendResetOtp: builder.mutation({
      query: credentials => ({
        url: '/auth/send-reset-password-otp',
        method: 'POST',
        body: credentials,
      }),
    }),
    verifyResetOtp: builder.mutation({
      query: credentials => ({
        url: '/auth/verify-reset-password-otp',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendResetOtpMutation,
  useVerifyResetOtpMutation,
} = authApiSlice;
