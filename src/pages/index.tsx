import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';

const Page = styled.div`
  min-height: 100vh;
  background: #1a1a1a;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #1a1a1a;
  color: #f9fafb;
  font-family: 'Inter', sans-serif;
`;

const Hero = styled.section`
  text-align: center;
  padding: 4rem 0;

  h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: bold;
    font-size: clamp(2.25rem, 6vw, 3.5rem);
    margin-bottom: 1rem;
  }

  p {
    font-family: 'Inter', sans-serif;
    color: #d1d5db;
    font-size: 1.2rem;
  }
`;

const Section = styled.section`
  margin: 4rem 0;
`;

const Title = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-weight: bold;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  margin-bottom: 2rem;
  text-align: center;
  color: #f9fafb;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const Step = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  background: #1a1a1a;
  text-align: center;
  border: 1px solid #d1d5db;

  h3 {
    font-family: 'IBM Plex Mono', monospace;
    color: #4f46e5;
    margin-bottom: 0.5rem;
  }

  p {
    color: #d1d5db;
  }
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
`;

const Benefit = styled.li`
  margin: 1rem 0;
  padding-left: 2rem;
  position: relative;
  color: #f9fafb;

  &:before {
    content: '💔';
    position: absolute;
    left: 0;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: #ff4d4f;
  color: #f9fafb;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  margin: 1rem;
  font-family: 'IBM Plex Mono', monospace;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    background: #ffc2d1;
    transform: translateY(-2px);
    color: #1a1a1a;
  }
`;

const GhostButton = styled.a`
  display: inline-block;
  background: transparent;
  color: #f9fafb;
  border: 2px solid #4f46e5;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  margin: 1rem;
  font-family: 'IBM Plex Mono', monospace;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    background: #4f46e5;
    transform: translateY(-2px);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Faq = styled.div`
  max-width: 640px;
  margin: 0 auto;
  text-align: center;

  h3 {
    font-family: 'Space Grotesk', sans-serif;
    margin-bottom: 1rem;
  }

  p {
    color: #d1d5db;
    margin: 0.75rem 0;
  }
`;

export default function Home() {
  return (
    <Page>
      <Container>
        <Head>
          <title>0x2 Reject</title>
          <meta
            name="description"
            content="0x2 Reject is the only app where rejection is part of the game. Love is awkward. We made it fun."
          />
          <meta
            name="keywords"
            content="0x2 Reject, rejection, dating, app, fun, awkward, love, Drifter"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>

        <Hero>
          <h1>Love is awkward. We made it fun.</h1>
          <p>Two rejections. One last chance. Rejection has never felt so right.</p>
          <ButtonGroup>
            <CTAButton href="/start">Get started</CTAButton>
            <GhostButton href="#how-it-works">Watch How It Works</GhostButton>
          </ButtonGroup>
        </Hero>

        <Section id="how-it-works">
          <Title>The Only App Where Rejection is Part of the Game</Title>
          <StepsGrid>
            <Step>
              <h3>Match</h3>
              <p>You&apos;re both curious.</p>
            </Step>
            <Step>
              <h3>Reject</h3>
              <p>Twice. Gently, brutally, or playfully.</p>
            </Step>
            <Step>
              <h3>Redeem</h3>
              <p>Make a comeback with style.</p>
            </Step>
            <Step>
              <h3>Decide</h3>
              <p>Ghost, go deeper, or let curiosity simmer.</p>
            </Step>
          </StepsGrid>
        </Section>

        <Section>
          <Title>Swiping is Boring. Rejection is Human.</Title>
          <BenefitsList>
            <Benefit>Turns ghosting into gameplay</Benefit>
            <Benefit>Makes rejection low-stakes and funny</Benefit>
            <Benefit>Encourages better conversations through playful tension</Benefit>
            <Benefit>Empowers people to try again (but only once 😉)</Benefit>
            <Benefit>Built for emotionally self-aware degenerates</Benefit>
          </BenefitsList>
        </Section>

        <Section>
          <Title>They Rejected Me Twice. We&apos;re Getting Married Next Fall.</Title>
        </Section>

        <Section>
          <Title>What You&apos;ll Love (Even If You Hate Love)</Title>
        </Section>

        <Section>
          <Title>Is This App a Joke?</Title>
          <Faq>
            <h3>Yes. But also no.</h3>
            <p>Ghosting is real. Let&apos;s give it some structure.</p>
            <p>No one is emotionally well. That&apos;s why we made this.</p>
          </Faq>
        </Section>

        <Section>
          <Title>Ready to get rejected like it&apos;s your love language?</Title>
          <ButtonGroup>
            <CTAButton href="/start">Get 0x2 Reject Now</CTAButton>
            <GhostButton href="/deck">Open the deck</GhostButton>
          </ButtonGroup>
        </Section>
      </Container>
    </Page>
  );
}
