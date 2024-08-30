import { apiSlice } from '@/lib/api/apiSlice';

const donationsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addDonation: builder.mutation({
      query: body => ({
        url: '/donation/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Donation'],
    }),

    getDonations: builder.query({
      query: (id: string) => `/donation/${id}`,
      providesTags: ['Donation'],
    }),
    getDonationStats: builder.query({
      query: (id: string) => `/donation/stats/${id}`,
      providesTags: ['Donation'],
    }),
  }),
});

export const {
  useAddDonationMutation,
  useGetDonationsQuery,
  useGetDonationStatsQuery,
} = donationsApiSlice;
