import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from '@/contexts/UserContext';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #121212;
  color: #f9fafb;
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  font-family: 'Space Grotesk', sans-serif;
`;

const Subtext = styled.p`
  font-size: 1.1rem;
  color: #9ca3af;
  text-align: center;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  max-width: 360px;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  border: 2px solid #2a2a2a;
  background: #1c1c1c;
  color: #f9fafb;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1rem;
  box-sizing: border-box;
`;

const AuthButton = styled.button`
  width: 100%;
  max-width: 360px;
  padding: 1rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 8px;
  font-size: 1.05rem;
  cursor: pointer;
  font-family: 'IBM Plex Mono', monospace;
  background: #4f46e5;
  color: #fff;

  &:disabled {
    background: #374151;
  }
`;

const Hint = styled.p`
  font-size: 0.85rem;
  color: #6b7280;
  text-align: center;
  margin-top: 1.5rem;
  max-width: 360px;
`;

const Err = styled.p`
  color: #ef4444;
  font-size: 0.9rem;
`;

export default function Start() {
  const router = useRouter();
  const { user, isLoading, setUser } = useUser();
  const next = typeof router.query.next === 'string' ? router.query.next : '/deck';
  const [name, setName] = useState('john');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (user?.profileComplete) {
      router.replace(next.startsWith('/') ? next : '/deck');
    } else if (user) {
      router.replace('/profile');
    }
  }, [user, isLoading, router, next]);

  const handleDevLogin = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/dev-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: name, displayName: name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      setUser(data.user);
      router.push(data.user.profileComplete ? next : '/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Head>
        <title>Start | 0x2 Reject</title>
      </Head>

      <Title>0x2 Reject</Title>
      <Subtext>Build your Drifter card. Get rejected (twice). Stay in the loop.</Subtext>

      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="username"
      />
      {error && <Err>{error}</Err>}
      <AuthButton type="button" disabled={submitting || !name.trim()} onClick={() => void handleDevLogin()}>
        {submitting ? 'Signing in…' : 'Continue (local)'}
      </AuthButton>

      <Hint>
        From Renaissance, you&apos;re signed in automatically via the mini app. Locally, use the
        button above (`USE_LOCAL=true`).
      </Hint>
    </Container>
  );
}
