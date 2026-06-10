'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { login } from '@/services/auth.service';
import styles from './login.module.css';

export default function LoginPage() {

  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const repose = await login(username, password);
      localStorage.setItem('token', repose.access_token);
      router.push('/dashboard');
    } catch {
      setError('Username atau password salah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      {/* Login Card */}
      <div className={styles.loginContainer}>
        {/* Logo area */}
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <h1 className={styles.title}>
            SIMADES Admin
          </h1>
          <p className={styles.subtitle}>
            Masuk untuk mengelola panel admin
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleLogin}
          className={styles.loginCard}
        >
          {error && (
            <div className={styles.errorBanner}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {/* Username */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              required
              className={styles.inputControl}
            />
          </div>

          {/* Password */}
          <div className={styles.formGroupLast}>
            <label className={styles.label}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
              className={styles.inputControl}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={styles.submitBtn}
          >
            {loading ? 'Masuk...' : 'Masuk'}
          </button>
        </form>

        <p className={styles.footerText}>
          © 2026 SIMADES.
        </p>
      </div>
    </div>
  );
}
