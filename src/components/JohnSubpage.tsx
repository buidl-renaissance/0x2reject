import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

const Page = styled.div`
  max-width: 420px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 1.25rem 1.25rem 2.5rem;
  background: #121212;
  color: #f9fafb;
  font-family: 'IBM Plex Mono', 'SF Mono', ui-monospace, monospace;
  box-sizing: border-box;
`;

const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #a5b4fc;
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;

  &:hover {
    color: #c7d2fe;
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 1.75rem;
  margin: 0 0 0.5rem;
`;

const Lead = styled.p`
  color: #9ca3af;
  margin: 0 0 1.5rem;
  line-height: 1.45;
`;

type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
  /** Where back goes — defaults to tastes step on John's card */
  backHref?: string;
  backLabel?: string;
};

export function JohnSubpage({
  title,
  description,
  children,
  backHref = '/john?step=taste',
  backLabel = '← Back to tastes',
}: Props) {
  return (
    <Page>
      <Head>
        <title>{title ? `${title} | John · 0x2 Reject` : 'John · 0x2 Reject'}</title>
      </Head>
      <Back href={backHref}>{backLabel}</Back>
      {title && <Title>{title}</Title>}
      {description && <Lead>{description}</Lead>}
      {children}
    </Page>
  );
}

export const CtaBlock = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #2a2a2a;
  text-align: center;
`;

export const TextJohnBtn = styled.a`
  display: inline-block;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  border: 1px solid #4f46e5;
  background: #1a1a1a;
  color: #c7d2fe;
  font-size: 0.95rem;
  text-decoration: none;
  letter-spacing: 0.02em;

  &:hover {
    background: #4f46e5;
    color: #fff;
  }
`;

export const CtaLead = styled.p`
  margin: 0 0 1rem;
  color: #d1d5db;
  font-size: 0.95rem;
  line-height: 1.45;
`;

export const PhotoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ShotContainer = styled.div<{ $wide?: boolean }>`
  width: 100%;
  aspect-ratio: ${(p) => (p.$wide ? '4 / 3' : '3 / 4')};
  border-radius: 16px;
  border: 2px solid #2a2a2a;
  overflow: hidden;
`;

const ShotImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export function Shot({ $src }: { $src: string }) {
  return (
    <ShotContainer>
      <ShotImage src={$src} alt="" />
    </ShotContainer>
  );
}

export function WideShot({ $src }: { $src: string }) {
  return (
    <ShotContainer $wide>
      <ShotImage src={$src} alt="" />
    </ShotContainer>
  );
}

/** Full image, natural aspect — no crop (good for mixed portrait/landscape) */
const FitShotImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border-radius: 16px;
  border: 2px solid #2a2a2a;
`;

export function FitShot({
  $src,
  alt = '',
}: {
  $src: string;
  alt?: string;
}) {
  return <FitShotImage src={$src} alt={alt} />;
}

export const Body = styled.div`
  color: #d1d5db;
  line-height: 1.55;
  font-size: 1rem;

  p {
    margin: 0 0 1rem;
  }

  strong {
    color: #f9fafb;
  }
`;

export const TagList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.25rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

export const Tag = styled.li`
  padding: 0.85rem 1rem;
  border-radius: 10px;
  background: #1c1c1c;
  border: 1px solid #2a2a2a;
  color: #e5e7eb;
`;

export const Caption = styled.p`
  color: #9ca3af;
  font-size: 0.9rem;
  font-style: italic;
  margin: 0.5rem 0 1rem;
  line-height: 1.4;
`;

export const PhotoWithCaption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;
