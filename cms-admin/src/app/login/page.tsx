'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { login } from '@/services/auth.service';

export default function LoginPage() {

    const router = useRouter();

    const [username, setUsername] =
        useState('');

    const [password, setPassword] =
        useState('');

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState('');

    const handleLogin = async (
        e: React.FormEvent,
    ) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');

            const repose =
                await login(
                    username,
                    password,
                );
            
            localStorage.setItem(
                'token',
                repose.access_token,
            );

            router.push('/dashboard');
        } catch (err) {
            setError(
                'Username atau password salah',
            );
        } finally {
            setLoading(false);
        }
    };
}