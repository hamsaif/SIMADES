'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { login } from '@/services/auth.service';

export default function LoginPage() {

    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

}