import { IResponse, IAdmin, ISigninRequest } from '../../types/data';
import { apiSlice } from '../apiSlice';

const ADMIN_URL = '/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IResponse<IAdmin>, ISigninRequest>({
            query: (data) => ({
                url: `${ADMIN_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        checkAuth: builder.mutation<IResponse<IAdmin>, void>({
            query: () => ({
                url: `${ADMIN_URL}/check-auth`,
                method: 'GET',
            }),
        }),
        logout: builder.mutation<IResponse<null>, void>({
            query: () => ({
                url: `${ADMIN_URL}/logout`,
                method: 'POST',
            }),
        }),
    }),
});

export const { useLoginMutation, useCheckAuthMutation, useLogoutMutation } = adminApiSlice;
