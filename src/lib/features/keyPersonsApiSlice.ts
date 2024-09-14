import { apiSlice } from '@/lib/api/apiSlice';

const keyPersonsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createPersonality: builder.mutation({
      query: body => ({
        url: '/key-person/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['KeyPerson'],
    }),

    getKeyPersons: builder.query({
      query: (id: string) => `/key-person/funeral/${id}`,
      providesTags: ['KeyPerson'],
    }),
    getKeyPersonsPublic: builder.query({
      query: (id: string) => `/key-persons/public/${id}`,
      providesTags: ['KeyPerson'],
    }),
  }),
});

export const {
  useCreatePersonalityMutation,
  useGetKeyPersonsQuery,
  useGetKeyPersonsPublicQuery,
} = keyPersonsApiSlice;
