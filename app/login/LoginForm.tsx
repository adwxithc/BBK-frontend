'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/Input';
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label htmlFor="email">Email</label>
                <Input
                    className="mt-2"
                    id="email"
                    placeholder="sample@example.com"
                    {...register('email')}
                    error={errors.email?.message}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password">Password</label>
                <Input
                    className="mt-2"
                    id="password"
                    type="password"
                    placeholder="enter your password.."
                    {...register('password')}
                    error={errors.password?.message}
                />
            </div>
            <div className="flex mb-3 justify-center">
                <Button loading={isLoading} type="submit">
                    Login
                </Button>
            </div>
        </form>
    );
}
