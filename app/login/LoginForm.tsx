'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import TextField from '@/components/ui/TextField';
import Button from '@/components/ui/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginMutation } from '@/redux/features/adminApiSlice'; 
import { setCredentials } from '@/redux/features/authSlice';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(20).required(),
});

type LoginInput = yup.InferType<typeof schema>;

export default function LoginForm() {
    const [login, { isLoading }] = useLoginMutation();
    const [apiError, setApiError] = useState<string>('');
    const dispatch = useDispatch();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: LoginInput) => {
        try {
            setApiError(''); // Clear previous errors
            const res = await login(data).unwrap();
            
            if (res.success && res.data) {
                // Store user credentials in Redux state
                dispatch(setCredentials({
                    name: res.data.name,
                    email: res.data.email
                }));
                
                // Redirect to admin dashboard
                router.push('/admin');
            }
        } catch (err: any) {
            // Handle API errors according to your error format
            if (err?.data?.errors && Array.isArray(err.data.errors)) {
                const errorMessages = err.data.errors.map((error: { message: string }) => error.message);
                setApiError(errorMessages.join(', '));
            } else {
                setApiError('Login failed. Please try again.');
            }
            console.error('Login error:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {apiError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {apiError}
                </div>
            )}
            
            <TextField
                label="Email Address"
                placeholder="Enter your email"
                {...register('email')}
                error={errors.email?.message}
            />
            
            <TextField
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register('password')}
                error={errors.password?.message}
            />
            
            <div className="pt-2">
                <Button 
                    loading={isLoading} 
                    type="submit" 
                    className="w-full"
                    variant="contained"
                    color="primary"
                    size="lg"
                >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
            </div>
        </form>
    );
}
