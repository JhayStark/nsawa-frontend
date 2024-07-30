import { apiSlice } from '@/lib/api/apiSlice';

const keyPersonsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createPersonality: builder.mutation({
      query: body => ({
        url: '/key-person/create',
        method: 'POST',
        body,
      }),
    }),

    getKeyPersons: builder.query({
      query: (id: string) => `/key-person/funeral/${id}`,
    }),
  }),
});

export const { useCreatePersonalityMutation, useGetKeyPersonsQuery } =
  keyPersonsApiSlice;
