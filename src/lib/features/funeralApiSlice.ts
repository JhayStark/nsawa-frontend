import { apiSlice } from '@/lib/api/apiSlice';

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
      query: () => `/funeral/all-funerals`,
    }),
    getFuneral: builder.query({
      query: (id: string) => `/funeral/${id}`,
    }),
  }),
});

export const { useCreateMutation, useGetFuneralQuery, useGetFuneralsQuery } =
  funeralApiSlice;
