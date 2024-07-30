import { apiSlice } from '@/lib/api/apiSlice';

const donationsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addDonation: builder.mutation({
      query: body => ({
        url: '/donation/create',
        method: 'POST',
        body,
      }),
    }),

    getDonations: builder.query({
      query: (id: string) => `/donation/${id}`,
    }),
    getDonationStats: builder.query({
      query: (id: string) => `/donation/stats/${id}`,
    }),
  }),
});

export const {
  useAddDonationMutation,
  useGetDonationsQuery,
  useGetDonationStatsQuery,
} = donationsApiSlice;
