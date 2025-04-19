import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.18.73:8000/api/countries/', 
  }),
  endpoints: (builder) => ({
    fetchCountries: builder.query({
      query: () => '', 
      transformResponse: (response) => {
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
