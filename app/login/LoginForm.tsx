'use client';

import { useForm } from 'react-hook-form';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginMutation } from '@/redux/features/adminApiSlice'; 
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(20).required(),
});

type LoginInput = yup.InferType<typeof schema>;

export default function LoginForm() {
    const [login, { isLoading }] = useLoginMutation();
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
            const res = await login(data).unwrap();
            console.log(res.message);
            router.push('/dashboard'); // redirect on success
        } catch (err: any) {
            console.error(err?.data?.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
                label="Email Address"
                placeholder="Enter your email"
                {...register('email')}
                error={errors.email?.message}
            />
            
            <Input
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
                    variant="primary"
                    size="lg"
                >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
            </div>
        </form>
    );
}
