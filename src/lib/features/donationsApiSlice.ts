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
    addDonationPublic: builder.mutation({
      query: body => ({
        url: '/donations/public/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Donation'],
    }),

    getDonations: builder.query({
      query: ({ id, search, pageSize, pageNumber, paymentMethod = '' }) => {
        const method = paymentMethod == 'all' ? '' : paymentMethod;
        return `/donation/${id}?search=${search}&pageSize=${pageSize}&pageNumber=${pageNumber}&paymentMethod=${method}`;
      },
      providesTags: ['Donation'],
    }),
    getDonationStats: builder.query({
      query: (id: string) => `/donation/stats/${id}`,
      providesTags: ['Donation'],
    }),
    sendThankYouMessage: builder.mutation({
      query: body => ({
        url: '/donation/thank-you-message',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Funeral'],
    }),
  }),
});

export const {
  useAddDonationMutation,
  useGetDonationsQuery,
  useGetDonationStatsQuery,
  useAddDonationPublicMutation,
  useSendThankYouMessageMutation,
} = donationsApiSlice;
