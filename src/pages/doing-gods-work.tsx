import Head from 'next/head';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';

const emberPulse = keyframes`
  0%, 100% { opacity: 0.35; transform: scale(1); }
  50% { opacity: 0.55; transform: scale(1.06); }
`;

const riseIn = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
`;

const markGlow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 18px rgba(212, 175, 55, 0.25)); }
  50% { filter: drop-shadow(0 0 32px rgba(212, 175, 55, 0.45)); }
`;

const Page = styled.div`
  --bg: #0a0908;
  --ink: #f3ead7;
  --muted: #b6a68c;
  --gold: #d4af37;
  --gold-bright: #f0d78c;
  --ember: #c45a12;

  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
  font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif;
  position: relative;
  overflow: hidden;
`;

const Atmosphere = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 70% 50% at 15% 10%, rgba(196, 90, 18, 0.28), transparent 55%),
    radial-gradient(ellipse 60% 45% at 90% 85%, rgba(196, 90, 18, 0.22), transparent 50%),
    radial-gradient(ellipse 80% 60% at 50% 40%, #14110e, var(--bg));

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(
        118deg,
        transparent 0 14px,
        rgba(0, 0, 0, 0.14) 14px 15px
      );
    opacity: 0.45;
  }
`;

const Ember = styled.div<{ $top?: string; $left?: string; $right?: string; $bottom?: string }>`
  position: absolute;
  width: min(42vw, 280px);
  height: min(42vw, 220px);
  border-radius: 50%;
  background: var(--ember);
  filter: blur(64px);
  animation: ${emberPulse} 7s ease-in-out infinite;
  top: ${(p) => p.$top ?? 'auto'};
  left: ${(p) => p.$left ?? 'auto'};
  right: ${(p) => p.$right ?? 'auto'};
  bottom: ${(p) => p.$bottom ?? 'auto'};
`;

const Shell = styled.main`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(1.5rem, 5vw, 3.5rem);
  max-width: 920px;
  margin: 0 auto;
`;

const Brand = styled.p`
  margin: 0 0 1.25rem;
  font-family: 'Syne', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(2.5rem, 9vw, 5.5rem);
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: var(--gold-bright);
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.45);
  animation: ${riseIn} 0.8s ease-out both, ${markGlow} 5s ease-in-out infinite;
`;

const Headline = styled.h1`
  margin: 0 0 1rem;
  font-family: 'Syne', system-ui, sans-serif;
  font-weight: 600;
  font-size: clamp(1.35rem, 3.5vw, 2rem);
  line-height: 1.25;
  max-width: 18ch;
  color: var(--ink);
  animation: ${riseIn} 0.8s ease-out 0.12s both;
`;

const Lead = styled.p`
  margin: 0 0 2rem;
  max-width: 34ch;
  font-size: clamp(1.05rem, 2.2vw, 1.25rem);
  line-height: 1.5;
  color: var(--muted);
  animation: ${riseIn} 0.8s ease-out 0.22s both;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  animation: ${riseIn} 0.8s ease-out 0.32s both;
`;

const Primary = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.85rem 1.35rem;
  border-radius: 999px;
  background: linear-gradient(145deg, var(--gold-bright), var(--gold));
  color: #1a1208;
  font-family: 'Syne', system-ui, sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: transform 0.2s ease, filter 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.05);
  }
`;

const Secondary = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.85rem 1.35rem;
  border-radius: 999px;
  border: 1px solid rgba(212, 175, 55, 0.45);
  background: rgba(20, 16, 12, 0.55);
  color: var(--gold-bright);
  font-family: 'Syne', system-ui, sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: var(--gold);
    background: rgba(40, 30, 16, 0.75);
  }
`;

const Foot = styled.p`
  margin: 3rem 0 0;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(182, 166, 140, 0.65);
  animation: ${riseIn} 0.8s ease-out 0.42s both;
`;

export default function DoingGodsWorkPage() {
  return (
    <Page>
      <Head>
        <title>doing gods work</title>
        <meta
          name="description"
          content="doing gods work — experiments, stories, and the next adventure."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=Syne:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Atmosphere aria-hidden>
        <Ember $top="-4%" $left="-6%" />
        <Ember $bottom="8%" $right="-4%" />
      </Atmosphere>

      <Shell>
        <Brand>doing gods work</Brand>
        <Headline>Ask better questions. Ship stranger answers.</Headline>
        <Lead>
          A home for experiments, travel receipts, and whatever we&apos;re
          building next — under one slightly divine domain.
        </Lead>
        <Actions>
          <Primary href="/john">Meet John</Primary>
          <Secondary href="/start">0x2 Reject</Secondary>
        </Actions>
        <Foot>gods.work</Foot>
      </Shell>
    </Page>
  );
}
