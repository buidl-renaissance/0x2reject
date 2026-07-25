import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
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
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const SocialButton = styled(AuthButton)`
  background: #2a2a2a;
  color: #f9fafb;
  border: 2px solid #4f46e5;
`;

const Hint = styled.p`
  font-size: 0.85rem;
  color: #6b7280;
  text-align: center;
  margin-top: 1.5rem;
  max-width: 360px;
`;

export default function Start() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const next = typeof router.query.next === 'string' ? router.query.next : '/deck';

  useEffect(() => {
    if (isLoading) return;
    if (user?.profileComplete) {
      router.replace(next.startsWith('/') ? next : '/deck');
    } else if (user) {
      router.replace('/profile');
    }
  }, [user, isLoading, router, next]);

  const handleSocialAuth = async (provider: 'google' | 'apple') => {
    const redirectTo = `${window.location.origin}/profile`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    });
    if (error) console.error('Auth error:', error);
  };

  return (
    <Container>
      <Head>
        <title>Start | 0x2 Reject</title>
      </Head>

      <Title>0x2 Reject</Title>
      <Subtext>Build your Drifter card. Get rejected (twice). Stay in the loop.</Subtext>

      <SocialButton type="button" onClick={() => void handleSocialAuth('google')}>
        Continue with Google
      </SocialButton>
      <SocialButton type="button" onClick={() => void handleSocialAuth('apple')}>
        Continue with Apple
      </SocialButton>

      <Hint>
        Opening from Renaissance? You should already be signed in via the mini app. If not, use
        Google/Apple above.
      </Hint>
    </Container>
  );
}
