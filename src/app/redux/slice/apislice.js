import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.18.73:8000/api/countries/', // Backend URL
  }),
  endpoints: (builder) => ({
    fetchCountries: builder.query({
      query: () => '', // Adjust endpoint if needed
      transformResponse: (response) => {
        // Save the fetched data in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('countries', JSON.stringify(response));
        }
        return response;
      },
    }),
  }),
});

export const { useFetchCountriesQuery } = apiSlice;
export default apiSlice;
