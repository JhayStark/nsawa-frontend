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
      query: ({
        id,
        search = '',
        pageSize = 10,
        pageNumber = 1,
        paymentMethod = '',
        startDate,
        endDate,
      }) => {
        const params = new URLSearchParams();

        // Add common parameters
        params.append('search', search);
        params.append('pageSize', pageSize);
        params.append('pageNumber', pageNumber);
        if (paymentMethod !== 'all') {
          params.append('paymentMethod', paymentMethod);
        }

        // Conditionally add startDate and endDate
        if (startDate) {
          params.append('startDate', startDate);
        }
        if (endDate) {
          params.append('endDate', endDate);
        }

        return `/donation/${id}?${params.toString()}`;
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
    getDonationStatus: builder.query({
      query: (id: string) => `/donations/public/status/${id}`,
    }),
  }),
});

export const {
  useAddDonationMutation,
  useGetDonationsQuery,
  useGetDonationStatsQuery,
  useAddDonationPublicMutation,
  useSendThankYouMessageMutation,
  useGetDonationStatusQuery,
} = donationsApiSlice;
