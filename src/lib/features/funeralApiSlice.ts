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
      query: ({ search = 1, pageSize = 10, pageNumber = 1 }) =>
        `/funeral/all-funerals?search=${search}&pageSize=${pageSize}&pageNumber=${pageNumber} `,
    }),
    getFuneral: builder.query({
      query: (id: string) => `/funeral/${id}`,
    }),
    getPublicFuneral: builder.query({
      query: (id: string) => `/funerals/public/${id}`,
    }),
  }),
});

export const {
  useCreateMutation,
  useGetFuneralQuery,
  useGetFuneralsQuery,
  useGetPublicFuneralQuery,
} = funeralApiSlice;
