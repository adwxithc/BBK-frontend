import {
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';


const BASE_URL = process.env.BASE_URL_BE

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' });



export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['admin'],

    endpoints: () => ({}),
});



