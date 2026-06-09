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

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">

            <form
                onSubmit={handleLogin}
                className="w-full max-w-md rounded-lg bg-white p-8 shadow text-black"
            >

                <h1 className="mb-6 text-center text-2xl font-bold">
                    SIMADES Admin
                </h1>

                {error && (
                    <div className="mb-4 rounded bg-red-100 p-3 text-red-600">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="mb-2 block">
                        Username
                    </label>

                    <input
                        type="text"
                        value={username}
                        onChange={(e) =>
                            setUsername(
                                e.target.value,
                            )
                        }
                        className="w-full rounded border p-3"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="mb-2 block">
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value,
                            )
                        }
                        className="w-full rounded border p-3"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded bg-blue-600 p-3 text-white"
                >
                    {loading
                        ? 'Loading...'
                        : 'Login'}
                </button>

            </form>

        </div>
    );
}
