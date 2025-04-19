'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useSelector} from 'react-redux';
import {RootState} from '@/app/redux/store';

export default function AuthGuard({children}: { children: React.ReactNode }) {
    const router = useRouter();
    const {token} = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!token) {
            const storedToken = localStorage.getItem('token');

            if (!storedToken) {
                router.push('/login');
            }
        }
    }, [token, router]);

    return <>{children}</>;
}