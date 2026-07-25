import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';

const Shell = styled.div`
  min-height: 100vh;
  background: #121212;
  color: #f9fafb;
  font-family: 'Inter', system-ui, sans-serif;
`;

const Hero = styled.section`
  max-width: 720px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  text-align: center;
`;

const Brand = styled.h1`
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: clamp(2.5rem, 8vw, 3.5rem);
  margin: 0 0 0.75rem;
`;

const Tag = styled.p`
  color: #d1d5db;
  font-size: 1.15rem;
  margin: 0 0 2rem;
`;

const Cta = styled(Link)`
  display: inline-block;
  padding: 1rem 1.75rem;
  border-radius: 999px;
  background: #ff4d4f;
  color: #fff;
  text-decoration: none;
  font-family: 'IBM Plex Mono', monospace;
  margin: 0.35rem;

  &:hover {
    background: #ef4444;
  }
`;

const Ghost = styled(Link)`
  display: inline-block;
  padding: 1rem 1.75rem;
  border-radius: 999px;
  border: 2px solid #4f46e5;
  color: #c7d2fe;
  text-decoration: none;
  font-family: 'IBM Plex Mono', monospace;
  margin: 0.35rem;
`;

const Loading = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #121212;
  color: #9ca3af;
  font-family: 'IBM Plex Mono', monospace;
`;

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (isLoading) return;
    // Renaissance embed / returning users go straight into the product
    if (user?.profileComplete) {
      router.replace('/deck');
    } else if (user) {
      router.replace('/profile');
    }
  }, [user, isLoading, router]);

  if (isLoading || user) {
    return (
      <Loading>
        <Head>
          <title>0x2 Reject</title>
        </Head>
        Opening Drifter…
      </Loading>
    );
  }

  return (
    <Shell>
      <Head>
        <title>0x2 Reject — Drifter</title>
        <meta
          name="description"
          content="A dating card lead funnel for people who meet online through Renaissance."
        />
      </Head>
      <Hero>
        <Brand>0x2 Reject</Brand>
        <Tag>
          Love is awkward. We made it fun.
          <br />
          Swipe the Drifter deck — or share your card as an app.
        </Tag>
        <Cta href="/start">Get started</Cta>
        <Ghost href="/deck">Open deck</Ghost>
      </Hero>
    </Shell>
  );
}
