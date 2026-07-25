import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DatingCardFunnel, DatingCardData } from '@/components/DatingCardFunnel';

const Center = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #121212;
  color: #9ca3af;
  font-family: 'IBM Plex Mono', monospace;
  padding: 2rem;
  text-align: center;
`;

export default function ShareCardPage() {
  const router = useRouter();
  const { slug, step: stepQuery, mode } = router.query;
  const [card, setCard] = useState<DatingCardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);

  const initialStep =
    stepQuery === 'taste' ||
    stepQuery === 'lead' ||
    stepQuery === 'activities' ||
    stepQuery === 'card'
      ? stepQuery
      : 'card';

  const exploreBasePath =
    typeof slug === 'string' && slug === 'john' ? '/john' : undefined;

  const vibeOverride =
    mode === 'bad-girl'
      ? 'Licensed to shag. Bad girls already knew.'
      : null;

  useEffect(() => {
    if (!slug || typeof slug !== 'string') return;

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/profiles/${encodeURIComponent(slug)}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Not found');
        setCard(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Not found');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [slug]);

  if (loading) {
    return (
      <Center>
        <Head>
          <title>Loading… | 0x2 Reject</title>
        </Head>
        Loading card…
      </Center>
    );
  }

  if (error || !card) {
    return (
      <Center>
        <Head>
          <title>Not found | 0x2 Reject</title>
        </Head>
        {error || 'This card isn\'t public (or doesn\'t exist).'}
      </Center>
    );
  }

  if (done) {
    return (
      <Center>
        <Head>
          <title>{card.full_name || card.username} | 0x2 Reject</title>
        </Head>
        <div>
          <h2 style={{ color: '#f9fafb', fontFamily: 'Space Grotesk, sans-serif' }}>
            That&apos;s the vibe.
          </h2>
          <p>Build your own card in Renaissance · 0x2 Reject.</p>
        </div>
      </Center>
    );
  }

  return (
    <>
      <Head>
        <title>
          {card.full_name || card.username || 'Drifter'} | 0x2 Reject
        </title>
      </Head>
      <DatingCardFunnel
        key={`${card.id}-${initialStep}-${mode || 'default'}`}
        card={card}
        source="share"
        initialStep={initialStep}
        exploreBasePath={exploreBasePath}
        vibeOverride={vibeOverride}
        onFinished={() => setDone(true)}
      />
    </>
  );
}
