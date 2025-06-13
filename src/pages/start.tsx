import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #1A1A1A;
  color: #F9FAFB;
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  font-family: 'Space Grotesk', sans-serif;
`;

const Subtext = styled.p`
  font-size: 1.2rem;
  color: #9CA3AF;
  text-align: center;
  margin-bottom: 2rem;
`;

const AuthButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  font-family: 'IBM Plex Mono', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const PhoneButton = styled(AuthButton)`
  background: #4F46E5;
  color: #F9FAFB;
`;

const EmailButton = styled(AuthButton)`
  background: #10B981;
  color: #F9FAFB;
`;

const SocialButton = styled(AuthButton)`
  background: #2A2A2A;
  color: #F9FAFB;
  border: 2px solid #4F46E5;
`;

const LegalText = styled.p`
  font-size: 0.8rem;
  color: #6B7280;
  text-align: center;
  margin-top: 2rem;
  
  a {
    color: #4F46E5;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Start() {
  const router = useRouter();

  const handlePhoneAuth = async () => {
    // TODO: Implement phone authentication
    router.push('/profile/basics');
  };

  const handleEmailAuth = async () => {
    // TODO: Implement email authentication
    router.push('/profile/basics');
  };

  const handleSocialAuth = async (provider: 'google' | 'apple') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/profile/basics`
      }
    });

    if (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <Container>
      <Head>
        <title>Welcome to Epicurious</title>
        <meta name="description" content="Let's build your rejection-worthy profile" />
      </Head>

      <Title>Welcome to Epicurious</Title>
      <Subtext>Let&apos;s build your rejection-worthy profile</Subtext>

      <PhoneButton onClick={handlePhoneAuth}>
        📱 Continue with Phone
      </PhoneButton>

      <EmailButton onClick={handleEmailAuth}>
        ✉️ Continue with Email
      </EmailButton>

      <SocialButton onClick={() => handleSocialAuth('google')}>
        <img src="/google-icon.svg" alt="Google" width="20" height="20" />
        Continue with Google
      </SocialButton>

      <SocialButton onClick={() => handleSocialAuth('apple')}>
        <img src="/apple-icon.svg" alt="Apple" width="20" height="20" />
        Continue with Apple
      </SocialButton>

      <LegalText>
        By continuing, you agree to{' '}
        <a href="/terms">get rejected twice</a>
      </LegalText>
    </Container>
  );
} 