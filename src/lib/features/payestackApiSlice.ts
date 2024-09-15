import { apiSlice } from '@/lib/api/apiSlice';

const paystackApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAccountInfo: builder.mutation({
      query: body => ({
        url: '/pub/confirm-payment-account',
        method: 'POST',
        body,
      }),
    }),
    getBanksList: builder.query({
      query: ({ type = '' }) => `/pub/get-banks?type=${type}`,
    }),
    // Add other endpoints as needed
  }),
});

export const { useGetAccountInfoMutation, useGetBanksListQuery } =
  paystackApiSlice;
