import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useUser } from '@/contexts/UserContext';
import { DatingCardFunnel, DatingCardData } from '@/components/DatingCardFunnel';
import Link from 'next/link';

const Shell = styled.div`
  min-height: 100vh;
  background: #121212;
  color: #f9fafb;
`;

const TopBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid #2a2a2a;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.85rem;
`;

const Brand = styled.span`
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-weight: 700;
  letter-spacing: 0.02em;
`;

const NavLink = styled(Link)`
  color: #a5b4fc;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Center = styled.div`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  font-family: 'IBM Plex Mono', monospace;
  color: #9ca3af;
`;

const Title = styled.h1`
  font-family: 'Space Grotesk', system-ui, sans-serif;
  color: #f9fafb;
  margin-bottom: 0.75rem;
`;

export default function DeckPage() {
  const router = useRouter();
  const { user, isLoading, accessToken, authHeaders } = useUser();
  const [cards, setCards] = useState<DatingCardData[]>([]);
  const [index, setIndex] = useState(0);
  const [loadingDeck, setLoadingDeck] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace('/start?next=/deck');
      return;
    }
    if (!user.profileComplete) {
      router.replace('/profile');
      return;
    }

    const load = async () => {
      setLoadingDeck(true);
      try {
        const res = await fetch('/api/deck', { headers: authHeaders() });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load deck');
        setCards(data.cards || []);
        setIndex(0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load');
      } finally {
        setLoadingDeck(false);
      }
    };

    void load();
  }, [user, isLoading, router, authHeaders]);

  const current = cards[index];

  return (
    <Shell>
      <Head>
        <title>Drifter Deck | 0x2 Reject</title>
      </Head>
      <TopBar>
        <Brand>0x2 Reject · Drifter</Brand>
        <NavLink href="/profile">My card</NavLink>
      </TopBar>

      {isLoading || loadingDeck ? (
        <Center>Loading the deck…</Center>
      ) : error ? (
        <Center>
          <Title>Couldn&apos;t load</Title>
          <p>{error}</p>
        </Center>
      ) : !current ? (
        <Center>
          <Title>Deck&apos;s empty</Title>
          <p>No more public cards right now. Share yours and invite friends.</p>
          <NavLink href="/profile" style={{ marginTop: '1rem' }}>
            Edit / share my card →
          </NavLink>
        </Center>
      ) : (
        <DatingCardFunnel
          key={current.id}
          card={current}
          source="deck"
          accessToken={accessToken}
          onFinished={() => setIndex((i) => i + 1)}
        />
      )}
    </Shell>
  );
}
