import {
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';


const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' });



export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['admin'],

    endpoints: () => ({}),
});



