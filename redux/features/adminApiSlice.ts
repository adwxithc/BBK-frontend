import { IResponse, ISigninRequest, IAdmin } from '../../types/data';
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
    }),
});

export const { useLoginMutation } = adminApiSlice;
