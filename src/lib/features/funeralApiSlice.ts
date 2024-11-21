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
      providesTags: ['Funeral'],
    }),
    getFuneral: builder.query({
      query: (id: string) => `/funeral/${id}`,
      providesTags: ['Funeral'],
    }),
    getPublicFuneral: builder.query({
      query: (id: string) => `/funerals/public/${id}`,
      providesTags: ['Funeral'],
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
    intitateSubscriptionPayment: builder.mutation({
      query: (body: any) => ({
        url: `/pub/initiate-payment`,
        method: 'POST',
        body,
      }),
    }),
    addSmsToFuneral: builder.mutation({
      query: (body: any) => ({
        url: `/funeral/subscribe`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Funeral'],
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
  useIntitateSubscriptionPaymentMutation,
  useAddSmsToFuneralMutation,
} = funeralApiSlice;
