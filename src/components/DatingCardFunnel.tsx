import styled, { keyframes, css } from 'styled-components';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { activityLabel } from '@/lib/activities';

export type DatingCardData = {
  id: string;
  full_name: string | null;
  username: string | null;
  slug: string | null;
  vibe: string | null;
  age?: number | null;
  photo_url: string | null;
  secondary_photo_url?: string | null;
  package_hint?: string | null;
  text_phone?: string | null;
  activities: string[];
};

type Step = 'card' | 'taste' | 'lead' | 'heart' | 'left-bait' | 'honesty' | 'sure' | 'activities';

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
`;

const pulseHeart = keyframes`
  0% { transform: scale(0.4); opacity: 0; }
  40% { transform: scale(1.2); opacity: 1; }
  70% { transform: scale(0.95); }
  100% { transform: scale(1); opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const floatDevil = keyframes`
  0%, 100% { transform: translateY(0) rotate(-6deg); }
  50% { transform: translateY(-10px) rotate(6deg); }
`;

const Root = styled.div`
  max-width: 420px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 1.25rem;
  background: #121212;
  color: #f9fafb;
  font-family: 'IBM Plex Mono', 'SF Mono', ui-monospace, monospace;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Stage = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${fadeIn} 0.35s ease;
`;

const CardShell = styled.div<{ $dragX?: number; $dragging?: boolean }>`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: #1c1c1c;
  border: 2px solid #2a2a2a;
  aspect-ratio: 3 / 4.2;
  user-select: none;
  touch-action: none;
  transform: translateX(${(p) => p.$dragX || 0}px)
    rotate(${(p) => ((p.$dragX || 0) / 30).toFixed(2)}deg);
  transition: ${(p) => (p.$dragging ? 'none' : 'transform 0.25s ease')};
`;

const Photo = styled.div<{ $src?: string | null }>`
  position: absolute;
  inset: 0;
  background: ${(p) =>
    p.$src
      ? `center/cover no-repeat url(${p.$src})`
      : '#1c1c1c'};
`;

const CardGradient = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    transparent 55%,
    rgba(0, 0, 0, 0.18) 78%,
    rgba(0, 0, 0, 0.38) 100%
  );
`;

const CardMeta = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.5rem;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.65);
`;

const Name = styled.h1`
  margin: 0 0 0.35rem;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 1.85rem;
  font-weight: 700;
`;

const Vibe = styled.p`
  margin: 0;
  color: #d1d5db;
  font-size: 1rem;
  line-height: 1.4;
`;

const Stamp = styled.div<{ $kind: 'swipe' | 'nope' }>`
  position: absolute;
  top: 1.5rem;
  /* Opposite the swipe direction so the stamp stays on-screen as the card moves */
  ${(p) => (p.$kind === 'swipe' ? 'left: 1.25rem;' : 'right: 1.25rem;')}
  padding: 0.35rem 0.75rem;
  border: 3px solid ${(p) => (p.$kind === 'swipe' ? '#10b981' : '#ff4d4f')};
  color: ${(p) => (p.$kind === 'swipe' ? '#10b981' : '#ff4d4f')};
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: 6px;
  transform: rotate(${(p) => (p.$kind === 'swipe' ? '-12deg' : '12deg')});
  opacity: 0.9;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  margin-top: 1.25rem;
`;

const SwipeRightBtn = styled.button`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  background: none;
  border: none;
  color: #f9fafb;
  cursor: pointer;
  font-family: 'IBM Plex Mono', monospace;
  padding: 0.5rem 1rem;
  transition: transform 0.15s ease, color 0.15s ease;

  &:hover {
    transform: translateX(4px);
    color: #c7d2fe;
  }
`;

const SwipeLabel = styled.span`
  font-size: 1rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const SwipeArrow = styled.span`
  font-size: 1.75rem;
  line-height: 1;
  color: #4f46e5;
`;

const Headline = styled.h2`
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 1.75rem;
  text-align: center;
  margin: 0 0 0.75rem;
`;

const Sub = styled.p`
  text-align: center;
  color: #9ca3af;
  margin: 0 0 1.5rem;
  line-height: 1.45;
`;

const PhoneInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid #4f46e5;
  background: #1a1a1a;
  color: #f9fafb;
  font-size: 1.1rem;
  font-family: inherit;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #10b981;
  }
`;

const PrimaryBtn = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  background: #4f46e5;
  color: #fff;
  font-size: 1.05rem;
  font-family: inherit;
  cursor: pointer;
  margin-bottom: 0.75rem;

  &:disabled {
    background: #374151;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #4338ca;
  }
`;

const SkipBtn = styled.button`
  display: block;
  margin: 0 auto;
  background: none;
  border: none;
  color: #6b7280;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: #9ca3af;
  }
`;

const Heart = styled.div`
  font-size: 5rem;
  text-align: center;
  animation: ${pulseHeart} 0.7s ease forwards;
`;

const Devil = styled.div<{ $shake?: boolean }>`
  font-size: 5rem;
  text-align: center;
  margin-bottom: 1rem;
  animation: ${floatDevil} 1.4s ease-in-out infinite;
  ${(p) =>
    p.$shake &&
    css`
      animation: ${shake} 0.45s ease;
    `}
`;

const ChoiceRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ChoiceBtn = styled.button<{ $tone?: 'yes' | 'no' }>`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid ${(p) => (p.$tone === 'no' ? '#6b7280' : '#ff4d4f')};
  background: ${(p) => (p.$tone === 'no' ? '#1a1a1a' : '#2a1515')};
  color: #f9fafb;
  font-size: 1.05rem;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;

const ActivityGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;

const ActivityTile = styled.div`
  padding: 1rem 0.75rem;
  border-radius: 12px;
  background: #1c1c1c;
  border: 1px solid #2a2a2a;
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.35;
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.85rem;
  text-align: center;
  margin: 0 0 0.75rem;
`;

const TasteScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 5.5rem;
  animation: ${fadeIn} 0.35s ease;
`;

const TastePhoto = styled.div<{ $src?: string | null }>`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  margin: 1.25rem 0 1rem;
  background: ${(p) =>
    p.$src
      ? `center/cover no-repeat url(${p.$src}), #1c1c1c`
      : 'linear-gradient(160deg, #333, #111)'};
  border: 2px solid #2a2a2a;
`;

const PackageHint = styled.p`
  text-align: left;
  color: #d1d5db;
  font-size: 1.05rem;
  line-height: 1.45;
  margin: 0 0 1.5rem;
  font-style: italic;
`;

const AboutLetter = styled.div`
  color: #d1d5db;
  line-height: 1.55;
  font-size: 1rem;
  margin: 0 0 1.5rem;
  padding-top: 0.25rem;
  border-top: 1px solid #2a2a2a;

  p {
    margin: 1rem 0 0;
  }
`;

const AboutLink = styled(Link)`
  color: #a5b4fc;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: #c7d2fe;
  }
`;

const ExploreList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 0.5rem;
`;

const ExploreLink = styled.a`
  display: block;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  border: 1px solid #2a2a2a;
  background: #1c1c1c;
  color: #e5e7eb;
  text-decoration: none;
  font-size: 0.95rem;
  text-align: left;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: #4f46e5;
    background: #1e1b4b;
  }
`;

const FixedCtaBar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.85rem 1.25rem calc(0.85rem + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, transparent 0%, #121212 55%);
  display: flex;
  justify-content: center;
  z-index: 20;
`;

const TextJohnBtn = styled.a`
  display: inline-block;
  padding: 0.55rem 1.15rem;
  border-radius: 8px;
  border: 1px solid #4f46e5;
  background: #1a1a1a;
  color: #c7d2fe;
  font-size: 0.85rem;
  font-family: 'IBM Plex Mono', monospace;
  text-decoration: none;
  letter-spacing: 0.02em;

  &:hover {
    background: #4f46e5;
    color: #fff;
  }
`;

type Props = {
  card: DatingCardData;
  source: 'deck' | 'share';
  initialStep?: Step;
  exploreBasePath?: string;
  /** Altered vibe shown on the main card (e.g. after license-to-shag) */
  vibeOverride?: string | null;
  onFinished?: () => void;
  onSwipeRecorded?: (direction: 'left' | 'right') => void;
};

export function DatingCardFunnel({
  card,
  source,
  initialStep = 'card',
  exploreBasePath,
  vibeOverride,
  onFinished,
  onSwipeRecorded,
}: Props) {
  const router = useRouter();
  const [step, setStep] = useState<Step>(initialStep);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);

  useEffect(() => {
    if (initialStep) setStep(initialStep);
  }, [initialStep]);

  const displayName = card.full_name || card.username || 'Mystery';
  const nameLine = card.age ? `${displayName}, ${card.age}` : displayName;
  const vibeText = vibeOverride || card.vibe || 'No vibe listed… yet.';
  const packageHintText =
    !card.package_hint ||
    card.package_hint === 'Yes, this cute little girl is included in the package'
      ? '... and yes, this cute little girl is included in the package'
      : card.package_hint;
  const smsBody = encodeURIComponent("Hey, I think you and your cat are pretty cute. Let's ...");
  const smsHref = card.text_phone
    ? `sms:${card.text_phone.replace(/[^\d+]/g, '')}?&body=${smsBody}`
    : null;

  const licensePath = exploreBasePath
    ? `${exploreBasePath}/license-to-shag`
    : null;

  const pushToLicense = useCallback(() => {
    if (licensePath) {
      void router.push(licensePath);
      return;
    }
    setStep('taste');
  }, [licensePath, router]);

  const recordSwipe = useCallback(
    async (direction: 'left' | 'right') => {
      onSwipeRecorded?.(direction);
      try {
        await fetch('/api/swipes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ profileId: card.id, direction }),
        });
      } catch {
        /* non-blocking */
      }
    },
    [card.id, onSwipeRecorded]
  );

  const goRight = async () => {
    await recordSwipe('right');
    setStep('taste');
  };

  const goLeft = async () => {
    await recordSwipe('left');
    setStep('left-bait');
  };

  const onDaddyIssuesYes = () => {
    setStep('honesty');
    setTimeout(() => pushToLicense(), 1400);
  };

  const onDaddyIssuesNo = () => {
    setStep('sure');
    setTimeout(() => pushToLicense(), 1200);
  };

  const submitLead = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ profileId: card.id, phone, source }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      setStep('heart');
      setTimeout(() => setStep('activities'), 1100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const finishActivities = () => {
    onFinished?.();
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (step !== 'card') return;
    startX.current = e.clientX;
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || step !== 'card') return;
    setDragX(e.clientX - startX.current);
  };

  const onPointerUp = () => {
    if (!dragging || step !== 'card') return;
    setDragging(false);
    if (dragX > 100) {
      setDragX(0);
      void goRight();
    } else if (dragX < -100) {
      setDragX(0);
      void goLeft();
    } else {
      setDragX(0);
    }
  };

  return (
    <Root>
      {step === 'card' && (
        <Stage>
          <CardShell
            $dragX={dragX}
            $dragging={dragging}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <Photo $src={card.photo_url} />
            <CardGradient />
            {dragX > 40 && <Stamp $kind="swipe">Swipe</Stamp>}
            {dragX < -40 && <Stamp $kind="nope">Nope</Stamp>}
            <CardMeta>
              <Name>{nameLine}</Name>
              <Vibe>{vibeText}</Vibe>
            </CardMeta>
          </CardShell>
          <Actions>
            <SwipeRightBtn type="button" onClick={() => void goRight()} aria-label="Swipe right">
              <SwipeLabel>Swipe Right</SwipeLabel>
              <SwipeArrow aria-hidden>→</SwipeArrow>
            </SwipeRightBtn>
          </Actions>
        </Stage>
      )}

      {step === 'taste' && (
        <>
          <TasteScroll>
            {vibeOverride ? (
              <Headline>We can get those issues straightened out.</Headline>
            ) : (
              <Headline>You&apos;ve got taste.</Headline>
            )}
            {(card.secondary_photo_url || card.photo_url) && (
              <TastePhoto $src={card.secondary_photo_url || card.photo_url} />
            )}
            {exploreBasePath ? (
              <>
                <AboutLetter>
                  <p>
                    I&apos;m the guy who grills the steaks. Talk is cheap — from
                    plan to action.
                  </p>
                  <p>
                    Home base is couch negotiations with{' '}
                    <AboutLink href={`${exploreBasePath}/cats`}>Sash</AboutLink>
                    . Out in the world:{' '}
                    <AboutLink href={`${exploreBasePath}/travel`}>
                      trips with receipts
                    </AboutLink>{' '}
                    — boards, boats, elephants, murals.
                  </p>
                  <p>
                    If you&apos;re curious, say hi. Just a conversation — and
                    maybe the next adventure.
                    </p>
                    <p>
                    <i>{packageHintText}</i>
                    </p>
                </AboutLetter>
                <ExploreList>
                  <ExploreLink href={`${exploreBasePath}/cats`}>
                    Take me to cat photos →
                  </ExploreLink>
                  <ExploreLink href={`${exploreBasePath}/travel`}>
                    Where has {displayName} been? →
                  </ExploreLink>
                </ExploreList>
              </>
            ) : (
              <PackageHint>{packageHintText}</PackageHint>
            )}
          </TasteScroll>
          {smsHref ? (
            <FixedCtaBar>
              <TextJohnBtn href={smsHref}>Text {displayName}</TextJohnBtn>
            </FixedCtaBar>
          ) : (
            <FixedCtaBar>
              <TextJohnBtn href="#" onClick={(e) => { e.preventDefault(); setStep('lead'); }}>
                Stay in the loop
              </TextJohnBtn>
            </FixedCtaBar>
          )}
        </>
      )}

      {step === 'lead' && (
        <Stage>
          <Headline>Stay in the loop?</Headline>
          <Sub>Want to stay in the loop? Drop your number.</Sub>
          {error && <ErrorText>{error}</ErrorText>}
          <PhoneInput
            type="tel"
            inputMode="tel"
            placeholder="(555) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoFocus
          />
          <PrimaryBtn type="button" disabled={submitting} onClick={() => void submitLead()}>
            {submitting ? 'Sending…' : 'Send it 💘'}
          </PrimaryBtn>
          <SkipBtn type="button" onClick={() => setStep('activities')}>
            Skip
          </SkipBtn>
        </Stage>
      )}

      {step === 'heart' && (
        <Stage>
          <Heart>❤️</Heart>
          <Sub>You&apos;re on the list.</Sub>
        </Stage>
      )}

      {step === 'left-bait' && (
        <Stage>
          <Devil $shake>😈</Devil>
          <Headline>Bad girl.</Headline>
          <Sub>Do you have daddy issues?</Sub>
          <ChoiceRow>
            <ChoiceBtn $tone="yes" type="button" onClick={onDaddyIssuesYes}>
              Yes 😇
            </ChoiceBtn>
            <ChoiceBtn $tone="no" type="button" onClick={onDaddyIssuesNo}>
              No 🙄
            </ChoiceBtn>
          </ChoiceRow>
        </Stage>
      )}

      {step === 'honesty' && (
        <Stage>
          <Headline>I appreciate your honesty.</Headline>
        </Stage>
      )}

      {step === 'sure' && (
        <Stage>
          <Headline>Sure you don&apos;t.</Headline>
        </Stage>
      )}

      {step === 'activities' && (
        <Stage>
          <Headline>Here&apos;s what I&apos;m into</Headline>
          <Sub>{displayName}&apos;s world</Sub>
          <ActivityGrid>
            {(card.activities?.length
              ? card.activities
              : ['pinball', 'crypto', 'travel', 'building', 'events']
            ).map((id) => (
              <ActivityTile key={id}>{activityLabel(id)}</ActivityTile>
            ))}
          </ActivityGrid>
          {onFinished && (
            <PrimaryBtn type="button" style={{ marginTop: '1.5rem' }} onClick={finishActivities}>
              Next card →
            </PrimaryBtn>
          )}
        </Stage>
      )}
    </Root>
  );
}
