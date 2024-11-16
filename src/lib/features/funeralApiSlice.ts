import { apiSlice } from '@/lib/api/apiSlice';
import { verify } from 'crypto';

const funeralApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    create: builder.mutation({
      query: body => ({
        url: '/funeral/create',
        method: 'POST',
        body,
      }),
    }),
    getFunerals: builder.query({
      query: ({ search = 1, pageSize = 10, pageNumber = 1 }) =>
        `/funeral/all-funerals?search=${search}&pageSize=${pageSize}&pageNumber=${pageNumber} `,
    }),
    getFuneral: builder.query({
      query: (id: string) => `/funeral/${id}`,
    }),
    getPublicFuneral: builder.query({
      query: (id: string) => `/funerals/public/${id}`,
    }),
    getWithdrawalOtp: builder.mutation({
      query: (id: string) => ({
        url: `/funeral/withdraw-otp?funeralId=${id}`,
        method: 'GET',
      }),
    }),
    verifyWithdrawalOtp: builder.mutation({
      query: (body: any) => ({
        url: `/funeral/verify-otp`,
        method: 'POST',
        body,
      }),
    }),
    confirmDonationOtp: builder.mutation({
      query: (body: any) => ({
        url: `/pub/confirm-otp`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useCreateMutation,
  useGetFuneralQuery,
  useGetFuneralsQuery,
  useGetPublicFuneralQuery,
  useGetWithdrawalOtpMutation,
  useVerifyWithdrawalOtpMutation,
  useConfirmDonationOtpMutation,
} = funeralApiSlice;
