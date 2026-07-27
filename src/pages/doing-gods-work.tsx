import Head from 'next/head';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';

const driftA = keyframes`
  0%, 100% { transform: translate(-2%, -1%) rotate(0deg) scale(1); }
  50% { transform: translate(3%, 2%) rotate(8deg) scale(1.05); }
`;

const driftB = keyframes`
  0%, 100% { transform: translate(2%, 1%) rotate(0deg) scale(1.02); }
  50% { transform: translate(-3%, -2%) rotate(-6deg) scale(1); }
`;

const riseIn = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Page = styled.div`
  --ink: #0c1a2e;
  --ink-soft: #1a3354;
  --muted: #2a4a6e;
  --yellow: #ffe14a;
  --yellow-deep: #f5c400;
  --cyan: #3ec6ff;
  --blue: #1e6fff;
  --blue-deep: #0b3d99;
  --white: #f7fbff;
  --green-blend: #7fd9a8;

  min-height: 100vh;
  background: var(--white);
  color: var(--ink);
  font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif;
  position: relative;
  overflow: hidden;
`;

const Atmosphere = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  background: #e8f6ff;
`;

/** Shirt-true spiral: cyan / royal / yellow / white — less washed-out */
const DyeLayer = styled.div<{ $variant: 'a' | 'b' }>`
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(
      circle at 45% 42%,
      #ffffff 0%,
      #ffffff 6%,
      #5ec8ff 14%,
      #2a7bff 26%,
      #1e5fe0 36%,
      #ffe34d 48%,
      #ffd000 58%,
      #8fd9b0 68%,
      #3aa0ff 82%,
      #1550c0 100%
    ),
    conic-gradient(
      from ${(p) => (p.$variant === 'a' ? '200deg' : '30deg')} at 48% 44%,
      #1e6fff 0deg,
      #4db8ff 50deg,
      #ffffff 90deg,
      #ffe14a 140deg,
      #f0c000 190deg,
      #6fcf9a 240deg,
      #3ec6ff 300deg,
      #1e6fff 360deg
    );
  mix-blend-mode: ${(p) => (p.$variant === 'a' ? 'normal' : 'multiply')};
  opacity: ${(p) => (p.$variant === 'a' ? 1 : 0.28)};
  filter: blur(${(p) => (p.$variant === 'a' ? '14px' : '36px')});
  animation: ${(p) => (p.$variant === 'a' ? driftA : driftB)} 22s ease-in-out
    infinite;
`;

const DyeVeil = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.18) 0%,
    rgba(255, 255, 255, 0.42) 45%,
    rgba(232, 246, 255, 0.55) 100%
  );
`;

const Shell = styled.main`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  padding: clamp(1.5rem, 5vw, 3.5rem);
  max-width: 920px;
  margin: 0 auto;
`;

const Headline = styled.h1`
  margin: 0;
  font-family: 'Syne', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.75rem, 6vw, 3.25rem);
  line-height: 1.1;
  white-space: nowrap;
  color: var(--ink);
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.35);
  animation: ${riseIn} 0.8s ease-out both;
`;

const Lead = styled.p`
  margin: 0;
  max-width: 46ch;
  font-size: clamp(1.5rem, 3.7vw, 1.8rem);
  line-height: 1.45;
  color: var(--muted);
  animation: ${riseIn} 0.8s ease-out 0.1s both;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 0.25rem;
  animation: ${riseIn} 0.8s ease-out 0.18s both;
`;

const Primary = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.85rem 1.35rem;
  border-radius: 999px;
  background: linear-gradient(145deg, var(--yellow), var(--yellow-deep));
  color: var(--ink);
  font-family: 'Syne', system-ui, sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(30, 111, 255, 0.18);
  transition: transform 0.2s ease, filter 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.03);
  }
`;

export default function DoingGodsWorkPage() {
  return (
    <Page>
      <Head>
        <title>doing gods work</title>
        <meta
          name="description"
          content="Hey, you showed up. If you're open to a connection, so am I."
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
        <DyeLayer $variant="a" />
        <DyeLayer $variant="b" />
        <DyeVeil />
      </Atmosphere>

      <Shell>
        <Headline>Hey, you showed up.</Headline>
        <Lead>
          If you&apos;re open to a connection, so am I — a conversation, a plan,
          or just seeing where curiosity wants to go.
        </Lead>
        <Actions>
          <Primary href="/john">Meet John</Primary>
        </Actions>
      </Shell>
    </Page>
  );
}
