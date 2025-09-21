import { useCheckAuthMutation } from '@/redux/features/adminApiSlice';
import { setCredentials, logout } from '@/redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '@/redux/store';

export const useAuthCheck = () => {
    const [checkAuth] = useCheckAuthMutation();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        // Only check if not already authenticated
        if (!isAuthenticated) {
            const verifyAuth = async () => {
                try {
                    const response = await checkAuth().unwrap();
                    if (response.success && response.data) {
                        dispatch(setCredentials({
                            name: response.data.name,
                            email: response.data.email
                        }));
                    }
                } catch (error) {
                    // User is not authenticated, clear any existing auth state
                    dispatch(logout());
                    console.log('User not authenticated:', error);
                }
            };

            verifyAuth();
        }
    }, [checkAuth, dispatch, isAuthenticated]);
};