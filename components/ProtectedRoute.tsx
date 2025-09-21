'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import { useAuthCheck } from '@/hooks/useAuthCheck';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const router = useRouter();
    
    // Use the auth check hook
    useAuthCheck();

    useEffect(() => {
        // Give some time for the auth check to complete
        const timer = setTimeout(() => {
            setIsCheckingAuth(false);
        }, 1000); // Wait 1 second for auth check

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Only redirect after auth check is complete
        if (!isCheckingAuth && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, isCheckingAuth, router]);

    // Show loading while checking authentication
    if (isCheckingAuth || (!isAuthenticated && isCheckingAuth)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Show loading while not authenticated (about to redirect)
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return <>{children}</>;
}